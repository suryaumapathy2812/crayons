(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{"./packages/crayons-core/dist/esm-es5/fw-toggle.entry.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"fw_toggle",(function(){return Toggle}));__webpack_require__("./node_modules/core-js/modules/es.function.name.js"),__webpack_require__("./node_modules/core-js/modules/es.array.includes.js"),__webpack_require__("./node_modules/core-js/modules/es.object.define-property.js");var _index_25bc21e4_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/crayons-core/dist/esm-es5/index-25bc21e4.js"),Toggle=function(){function e(e){var t=this;Object(_index_25bc21e4_js__WEBPACK_IMPORTED_MODULE_3__.l)(this,e),this.fwChange=Object(_index_25bc21e4_js__WEBPACK_IMPORTED_MODULE_3__.e)(this,"fwChange",7),this.checked=!1,this.size="medium",this.name="",this.disabled=!1,this.showIcon=!0,this.label="",this.toggle=function(){t.disabled||(t.checked=!t.checked)}}return e.prototype.handleKeyUp=function(e){"Space"!==e.code&&"Enter"!==e.code||this.toggle()},e.prototype.handleKeyDown=function(e){"Space"!==e.code&&"Enter"!==e.code||e.preventDefault()},e.prototype.watchHandler=function(e){this.fwChange.emit({checked:e})},e.prototype.render=function(){var e,t,i=this,s=["small","medium","large"].includes(this.size)?this.size:"medium";return Object(_index_25bc21e4_js__WEBPACK_IMPORTED_MODULE_3__.i)(_index_25bc21e4_js__WEBPACK_IMPORTED_MODULE_3__.f,{onClick:function onClick(){return i.toggle()},tabindex:"0",role:"switch","aria-disabled":this.disabled?"true":"false","aria-checked":this.checked?"true":"false","aria-label":this.label},Object(_index_25bc21e4_js__WEBPACK_IMPORTED_MODULE_3__.i)("div",{class:(e={"toggle-switch":!0},e[s]=!0,e)},Object(_index_25bc21e4_js__WEBPACK_IMPORTED_MODULE_3__.i)("input",{name:this.name,type:"checkbox",disabled:this.disabled,checked:this.checked,class:"checkboxClass"}),Object(_index_25bc21e4_js__WEBPACK_IMPORTED_MODULE_3__.i)("span",{class:(t={slider:!0},t[s]=!0,t)},Object(_index_25bc21e4_js__WEBPACK_IMPORTED_MODULE_3__.i)("span",{class:"before"},this.showIcon&&Object(_index_25bc21e4_js__WEBPACK_IMPORTED_MODULE_3__.i)("fw-icon",{color:this.checked?"#2c5cc5":"#647a8e",name:this.checked?"check":"cross",class:{checked:this.checked},library:"system"})))))},Object.defineProperty(e.prototype,"host",{get:function get(){return Object(_index_25bc21e4_js__WEBPACK_IMPORTED_MODULE_3__.j)(this)},enumerable:!1,configurable:!0}),Object.defineProperty(e,"watchers",{get:function get(){return{checked:["watchHandler"]}},enumerable:!1,configurable:!0}),e}();Toggle.style=':host{font-family:-apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}*,::after,::before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.toggle-switch{position:relative;display:inline-block}.toggle-switch.small{width:28px;height:12px}.toggle-switch.medium{width:36px;height:16px}.toggle-switch.large{width:44px;height:20px}@media screen and (prefers-reduced-motion: reduce){.toggle-switch .slider{-webkit-transition:none;transition:none}}.toggle-switch .slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;border-radius:34px;background:#647a8e}@media screen and (prefers-reduced-motion: reduce){.toggle-switch .before{-webkit-transition:none;transition:none}}.toggle-switch .before{position:absolute;content:"";left:0;bottom:-2px;border:solid 1px #647a8e;border-radius:50%;-webkit-box-shadow:0 1px 1px 0 rgba(0, 0, 0, 0.23);box-shadow:0 1px 1px 0 rgba(0, 0, 0, 0.23);background-color:#fff;-webkit-transition-property:transform;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform, -webkit-transform;-webkit-transition-timing-function:ease;transition-timing-function:ease;-webkit-transition-duration:0.2s;transition-duration:0.2s;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.toggle-switch .before:hover,.toggle-switch .before:focus{-webkit-box-shadow:0 0 4px 4px rgba(87, 108, 125, 0.3);box-shadow:0 0 4px 4px rgba(87, 108, 125, 0.3)}.toggle-switch .slider.small{width:28px;height:12px}.toggle-switch .slider.small .before{width:16px;height:16px}.toggle-switch .slider.small .before fw-icon{-webkit-transform:scale(0.375);transform:scale(0.375)}.toggle-switch .slider.small .before fw-icon.checked{-webkit-transform:scale(0.5);transform:scale(0.5)}.toggle-switch .slider.medium{width:36px;height:16px}.toggle-switch .slider.medium .before{width:20px;height:20px}.toggle-switch .slider.medium .before fw-icon{-webkit-transform:scale(0.5);transform:scale(0.5)}.toggle-switch .slider.medium .before fw-icon.checked{-webkit-transform:scale(0.66);transform:scale(0.66)}.toggle-switch .slider.large{width:44px;height:20px}.toggle-switch .slider.large .before{width:24px;height:24px}.toggle-switch .slider.large .before fw-icon{-webkit-transform:scale(0.66);transform:scale(0.66)}.toggle-switch .slider.large .before fw-icon.checked{-webkit-transform:scale(0.83);transform:scale(0.83)}.toggle-switch input{display:none}.toggle-switch input:checked+.slider{background-color:#2c5cc5}.toggle-switch input:checked+.slider .before{border:solid 1px #2c5cc5}.toggle-switch input:checked+.slider .before:hover,.toggle-switch input:checked+.slider .before:focus{-webkit-box-shadow:0 0 4px 4px rgba(40, 61, 165, 0.3);box-shadow:0 0 4px 4px rgba(40, 61, 165, 0.3)}.toggle-switch input:checked+.slider.small .before{-webkit-transform:translateX(12px);-ms-transform:translateX(12px);transform:translateX(12px)}.toggle-switch input:checked+.slider.medium .before{-webkit-transform:translateX(16px);-ms-transform:translateX(16px);transform:translateX(16px)}.toggle-switch input:checked+.slider.large .before{-webkit-transform:translateX(20px);-ms-transform:translateX(20px);transform:translateX(20px)}.toggle-switch input:disabled+.slider{opacity:0.4;cursor:not-allowed}'}}]);