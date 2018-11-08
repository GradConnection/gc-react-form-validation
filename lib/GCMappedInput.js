"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _utils = require("../../utils");

var _Variants = require("./Variants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var GCMappedInput = function GCMappedInput(props) {
  var type = props.type,
      handleInputChange = props.handleInputChange,
      handleInputValidation = props.handleInputValidation;
  var renderType = (0, _utils.determineRenderType)(type); // NOTE: From here on out the Input.props.type will be used for validation only

  if (props.hidden) {
    return null;
  }

  switch (renderType) {
    case 'textarea':
      return _react.default.createElement(_Variants.GCTextarea, props);

    case 'radio':
      return _react.default.createElement(_Variants.GCRadio, props);

    case 'checkbox':
      return _react.default.createElement(_Variants.GCCheckbox, props);

    case 'select':
      return props.multi ? _react.default.createElement(_Variants.GCMultiSelect, props) : _react.default.createElement(_Variants.GCSelect, props);

    case 'custom':
      return _react.default.createElement(_Variants.GCCustom, props);

    default:
      return _react.default.createElement("input", _extends({
        className: "gc-input__".concat(type),
        type: renderType,
        onBlur: function onBlur() {
          return handleInputValidation();
        },
        onInput: function onInput(e) {
          return handleInputChange(e.target.value);
        },
        onChange: function onChange(e) {
          return handleInputChange(e.target.value);
        },
        maxLength: props.max,
        minLength: props.min
      }, props));
  }
};

var _default = GCMappedInput;
exports.default = _default;