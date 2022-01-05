/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Prop, State, Element, h, Method } from '@stencil/core';
import {
  FormValues,
  FormTouched,
  FormErrors,
  FormUtils,
  FormProps,
  FormSubmit,
} from './form-declaration';
import {
  getElementValue,
  validateYupSchema,
  prepareDataForValidation,
  yupToFormErrors,
  generateDynamicInitialValues,
  generateDynamicValidationSchema,
} from './form-util';

@Component({
  tag: 'fw-form',
  shadow: true,
})
export class Form {
  @Element() el!: any;

  private controls: any;

  @Prop() initialValues?: any = {};
  @Prop() validate?: any;
  @Prop() formSchema?: any = {};
  @Prop() validationSchema?: any = {};

  /** Tells Form to validate the form on each input's onInput event */
  @Prop() validateOnInput? = true;
  /** Tells Form to validate the form on each input's onBlur event */
  @Prop() validateOnBlur? = true;

  @State() isValid = false;
  @State() isValidating = false;
  @State() isSubmitting = false;

  @State() focused: keyof FormValues = null;
  @State() values: FormValues = {} as any;
  @State() touched: FormTouched<FormValues> = {} as any;
  @State() errors: FormErrors<FormValues> = {} as any;

  @State() formValidationSchema;
  @State() formInitialValues;

  async componentWillLoad() {
    this.formValidationSchema =
      generateDynamicValidationSchema(this.formSchema, this.validationSchema) ||
      {};
    this.formInitialValues =
      generateDynamicInitialValues(this.formSchema, this.initialValues) || {};

    this.values = this.formInitialValues;

    const initialValuesKeys = Object.keys(this.initialValues);

    for (const field of Object.keys(this.formInitialValues)) {
      this.errors[field] = null;
      if (initialValuesKeys?.includes(field)) this.touched[field] = true;
      else this.touched[field] = false;
    }

    const validationErrors = await this.handleValidation();

    this.errors = { ...this.errors, ...validationErrors };
  }

  // get Form Controls and pass props to children
  componentDidLoad() {
    this.controls = this.getFormControls();
    this.passPropsToChildren(this.controls);
  }

  // pass props to form-control children
  componentWillUpdate() {
    if (!this.controls) {
      this.controls = this.getFormControls();
    }
    this.passPropsToChildren(this.controls);
  }

  setSubmitting = (value: boolean) => {
    this.isSubmitting = value;
  };

  handleSubmit = async (event: Event): Promise<FormSubmit> => {
    event?.preventDefault();
    event?.stopPropagation();

    this.isSubmitting = true;

    let isValid = false,
      touchedState = {};

    const validationErrors = await this.handleValidation();

    const keys = [
      ...Object.keys(this.values),
      ...Object.keys(validationErrors),
    ];

    keys.forEach(
      (k: string) => (touchedState = { ...touchedState, [k]: true })
    );
    // on clicking submit, mark all fields as touched
    this.touched = { ...this.touched, ...touchedState };

    isValid = !validationErrors || Object.keys(validationErrors).length === 0;

    console.log({ values: this.values, errors: this.errors, isValid });

    this.isSubmitting = false;

    return { values: this.values, errors: this.errors, isValid };
  };

  handleReset = async (event?: Event): Promise<void> => {
    event?.preventDefault();
    event?.stopPropagation();
    this.isSubmitting = false;
    this.values = this.formInitialValues;

    let touchedState = {};
    Object.keys(this.initialValues).forEach(
      (k: string) => (touchedState = { ...touchedState, [k]: true })
    );
    this.touched = touchedState;

    const validationErrors = await this.handleValidation();
    this.errors = validationErrors;

    this.focused = null;
  };

  handleValidation = async () => {
    this.isValidating = true;

    let validationErrors = {};

    // run validations against validationSchema if present
    if (
      this.formValidationSchema &&
      Object.keys(this.formValidationSchema).length
    ) {
      const pr = validateYupSchema(
        prepareDataForValidation(this.values),
        this.formValidationSchema
      );
      try {
        await pr;
        validationErrors = {}; // reset errors if no errors from validation
      } catch (err) {
        validationErrors = yupToFormErrors(err);
      }
    }

    // run validations with validate function if passed as prop and merge with the errors from the above step
    if (this.validate && typeof this.validate === 'function') {
      try {
        validationErrors = {
          ...validationErrors,
          ...((await this.validate(this.values)) || {}),
        };
      } catch (err) {
        console.error(`Error in calling validate function ${err.message}`);
        validationErrors = { ...validationErrors };
      }
    }

    this.errors = validationErrors;

    this.isValidating = false;
    return validationErrors;
  };

  handleInput =
    (field: string, inputType: string) =>
    async (event: Event, ref: any): Promise<void> => {
      const value = getElementValue(inputType, event, ref);

      this.values = { ...this.values, [field]: value };

      /** Validate, if user wants to validateOnInput */
      if (this.validateOnInput) {
        this.touched = { ...this.touched, [field]: true };
        await this.handleValidation();
      }
    };

  handleBlur =
    (field: string, inputType: string) => async (event: Event, ref: any) => {
      if (this.focused) this.focused = null;
      const value: any = getElementValue(inputType, event, ref);

      this.values = { ...this.values, [field]: value };

      /** Validate, if user wants to validateOnBlur */
      if (this.validateOnBlur) {
        this.touched = { ...this.touched, [field]: true };
        await this.handleValidation();
      }
    };

  handleFocus =
    (field: string, _inputType: string) => (_event: Event, _ref: any) => {
      this.focused = field;
    };

  private getFormControls() {
    let children = [];
    children = Array.from([
      ...this.el.shadowRoot.querySelectorAll('*'),
      ...this.el.querySelectorAll('*'),
    ]).filter((el: HTMLElement) =>
      ['fw-form-control'].includes(el.tagName.toLowerCase())
    );
    return children;
  }

  private passPropsToChildren(controls) {
    controls.forEach((control: any) => {
      this.passPropsToChild(control);
    });
  }

  private passPropsToChild(control: any) {
    const error = this.errors[control.name];
    const touched = this.touched[control.name];
    control.controlProps = this.composedUtils();
    control.error = error || '';
    control.touched = touched || false;
  }

  private composedUtils = (): FormUtils => {
    const inputProps = (field: string, inputType: string) => ({
      name: field,
      type: inputType,
      handleInput: this.handleInput(field, inputType),
      handleChange: this.handleInput(field, inputType),
      handleBlur: this.handleBlur(field, inputType),
      handleFocus: this.handleFocus(field, inputType),
      id: `input-${field}`,
      value: this.values[field],
    });

    const radioProps = (field: string, inputType: string) => ({
      ...inputProps(field, inputType),
      type: inputType,
      id: `input-${field}--radio-${this.values[field]}`,
      value: this.values[field],
    });

    const checkboxProps = (field: string, inputType: string) => ({
      ...inputProps(field, inputType),
      type: inputType,
      checked: !!this.values[field],
    });

    const selectProps = (field: string, inputType: string) => ({
      type: 'text',
      name: field,
      id: `input-${field}`,
      handleChange: this.handleInput(field, inputType),
      handleBlur: this.handleBlur(field, inputType),
      value:
        inputType === 'multi_select' // for multiselect pass Array
          ? this.values[field]?.map((v) => v.value || v) || []
          : Array.isArray(this.values[field]) // single select but the value is an array, pass 0th index
          ? this.values[field]?.map((v) => v.value || v)[0] || ''
          : this.values[field] || '',
    });

    const labelProps = (field: string, value: any) => ({
      htmlFor: !value ? `input-${field}` : `input-${field}--radio-${value}`,
    });

    const formProps: FormProps = {
      action: 'javascript:void(0);',
      onSubmit: this.handleSubmit,
      onReset: this.handleReset,
    };

    return {
      inputProps,
      selectProps,
      checkboxProps,
      radioProps,
      labelProps,
      formProps,
    };
  };

  @Method()
  async setFieldValue(
    field: string,
    value: any,
    shouldValidate = true
  ): Promise<void> {
    this.values = { ...this.values, [field]: value };

    if (shouldValidate) {
      this.touched = { ...this.touched, [field]: true };
      await this.handleValidation();
    }
  }

  @Method()
  async setFieldErrors(errorObj: FormErrors<FormValues>): Promise<void> {
    Object.entries(errorObj)?.forEach(([field, value]) => {
      this.errors = { ...this.errors, [field]: value as string };
      this.touched = { ...this.touched, [field]: true };
    });
  }

  @Method()
  async doSubmit(e) {
    return this.handleSubmit(e);
  }

  @Method()
  async doReset(e) {
    this.handleReset(e);
  }

  // renderCustomComponent(componentName: string, props: any) {
  //   let template: JSX.Element;
  //   if (window.customElements?.get(componentName)) {
  //     const CustomComponent = `${componentName}`;
  //     let slotText: JSX.Element;
  //     if (props.slotText) {
  //       slotText = props.slotText;
  //       delete props.slotText;
  //     }
  //     template = <CustomComponent {...props}>{slotText}</CustomComponent>;
  //   } else {
  //     template = null;
  //   }
  //   return template;
  // }

  render() {
    const utils: FormUtils = this.composedUtils();

    return (
      <form id='fw_form_wrapper' {...utils.formProps}>
        {this.formSchema && Object.keys(this.formSchema).length > 0 ? (
          this.formSchema?.fields
            ?.sort((a, b) => a.position - b.position)
            .map((field) => {
              return (
                <fw-form-control
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  label={field.label}
                  required={field.required}
                  hint={field.hint}
                  placeholder={field.placeholder}
                  choices={field.choices}
                  fieldProps={field}
                  controlProps={utils}
                >
                  {/* {field.component &&
                    this.renderCustomComponent(
                      field.component,
                      field.componentProps
                    )} */}
                </fw-form-control>
              );
            })
        ) : (
          <slot></slot>
        )}
      </form>
    );
  }
}