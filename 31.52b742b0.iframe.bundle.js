(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{"./node_modules/core-js/modules/es.date.to-string.js":function(module,exports,__webpack_require__){var redefine=__webpack_require__("./node_modules/core-js/internals/redefine.js"),DatePrototype=Date.prototype,nativeDateToString=DatePrototype.toString,getTime=DatePrototype.getTime;"Invalid Date"!=String(new Date(NaN))&&redefine(DatePrototype,"toString",(function toString(){var value=getTime.call(this);return value==value?nativeDateToString.call(this):"Invalid Date"}))},"./packages/crayons-core/dist/esm-es5/format-date-util-cbbbafe3.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return formatDate}));__webpack_require__("./node_modules/core-js/modules/es.date.to-string.js");function formatDate(e){var t=void 0===e?{date:new Date,locale:[],options:{}}:e,o=t.date,a=t.locale,n=t.options,r=new Date(o);if(!isNaN(r.getMilliseconds()))return new Intl.DateTimeFormat(a||[],{weekday:n.weekday,year:n.year,month:n.month,day:n.day,hour:n.hour,minute:n.minute,second:n.second,timeZoneName:n.timeZoneName,timeZone:n.timeZone,hour12:n.hour12}).format(r)}},"./packages/crayons-core/dist/esm-es5/fw-format-date.entry.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"fw_format_date",(function(){return FormatDate}));__webpack_require__("./node_modules/core-js/modules/es.date.to-string.js");var _index_25bc21e4_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/crayons-core/dist/esm-es5/index-25bc21e4.js"),_format_date_util_cbbbafe3_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/crayons-core/dist/esm-es5/format-date-util-cbbbafe3.js"),FormatDate=function(){function t(t){Object(_index_25bc21e4_js__WEBPACK_IMPORTED_MODULE_1__.l)(this,t),this.date=new Date,this.hourFormat="auto"}return t.prototype.render=function(){var t=new Date(this.date),e="auto"===this.hourFormat?void 0:"12"===this.hourFormat;if(!isNaN(t.getMilliseconds()))return Object(_format_date_util_cbbbafe3_js__WEBPACK_IMPORTED_MODULE_2__.a)({date:t,locale:this.locale,options:{weekday:this.weekday,year:this.year,month:this.month,day:this.day,hour:this.hour,minute:this.minute,second:this.second,timeZoneName:this.timeZoneName,timeZone:this.timeZone,hour12:e}});console.error("Invalid date "+this.date)},t}()}}]);