'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _GCRadio = require('./GCRadio');

var _GCRadio2 = _interopRequireDefault(_GCRadio);

var _GCCheckbox = require('./GCCheckbox');

var _GCCheckbox2 = _interopRequireDefault(_GCCheckbox);

var _GCSelect = require('./GCSelect');

var _GCSelect2 = _interopRequireDefault(_GCSelect);

var _GCMultiSelect = require('./GCMultiSelect');

var _GCMultiSelect2 = _interopRequireDefault(_GCMultiSelect);

var _GCInputLabel = require('./GCInputLabel');

var _GCInputLabel2 = _interopRequireDefault(_GCInputLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GCInputRenderer(_ref) {
  for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    props[_key - 1] = arguments[_key];
  }

  var validationMessage = _ref.validationMessage,
      _validateInput = _ref.validateInput,
      handleChange = _ref.handleChange;

  var hat = arguments[0];
  var _arguments$ = arguments[0],
      name = _arguments$.name,
      disabled = _arguments$.disabled,
      type = _arguments$.type,
      value = _arguments$.value,
      min = _arguments$.min,
      max = _arguments$.max,
      title = _arguments$.title,
      multi = _arguments$.multi,
      size = _arguments$.size;

  var determineType = function determineType(type) {
    var inputType = void 0;
    switch (type) {
      case 'name':
        inputType = 'name';
        break;
      case 'text':
      case 'url':
        inputType = 'text';
        break;
      case 'email':
        inputType = 'email';
        break;
      case 'checkbox':
        inputType = 'checkbox';
        break;
      case 'password':
        inputType = 'password';
        break;
      case 'date':
        inputType = 'date';
        break;
      case 'range':
        inputType = 'range';
        break;
      case 'number':
        inputType = 'number';
        break;
      case 'textarea':
        inputType = 'textarea';
        break;
      case 'radio':
        inputType = 'radio';
        break;
      case 'select':
        inputType = 'select';
        break;
      default:
        inputType = 'text';
        break;
    }
    return inputType;
  };

  var invalidClass = validationMessage ? 'gc-input--invalid' : '';
  var disabledClass = disabled ? 'gc-input--disabled' : '';

  if (type === 'textarea') {
    var textareaClass = 'gc-input__textarea--' + size;
    return _react2.default.createElement('textarea', {
      className: invalidClass + ' ' + disabledClass + ' ' + textareaClass,
      disabled: disabled,
      name: name,
      defaultValue: value,
      onBlur: function onBlur() {
        return _validateInput();
      },
      onChange: function onChange(e) {
        return handleChange(e.target.value);
      },
      min: min,
      max: max,
      title: title
    });
  } else if (type === 'radio') {
    return _react2.default.createElement(_GCRadio2.default, _extends({}, arguments[0], { onChange: function onChange(v) {
        return handleChange(v);
      } }));
  } else if (type === 'checkbox') {
    return _react2.default.createElement(_GCCheckbox2.default, _extends({}, arguments[0], {
      invalidClass: '' + invalidClass,
      onChange: function onChange(v) {
        return handleChange(v);
      }
    }));
  } else if (type === 'select' && multi) {
    return _react2.default.createElement(_GCMultiSelect2.default, _extends({}, arguments[0], {
      onChange: function onChange(v) {
        return handleChange(v);
      },
      validateInput: function validateInput() {
        return _validateInput();
      },
      dynamicClasses: invalidClass + ' ' + disabledClass
    }));
  } else if (type === 'select' && !multi) {
    return _react2.default.createElement(_GCSelect2.default, _extends({}, arguments[0], {
      onChange: function onChange(v) {
        return handleChange(v);
      },
      validateInput: function validateInput() {
        return _validateInput();
      },
      dynamicClasses: invalidClass + ' ' + disabledClass
    }));
  } else if (type === 'number') {
    return _react2.default.createElement('input', {
      className: invalidClass + ' ' + disabledClass,
      disabled: disabled,
      name: name,
      type: determineType(type),
      onBlur: function onBlur() {
        return _validateInput();
      },
      onChange: function onChange(e) {
        return handleChange(e.target.value);
      },
      min: min,
      max: max,
      title: title,
      defaultValue: value
    });
  } else {
    return _react2.default.createElement('input', {
      className: invalidClass + ' ' + disabledClass,
      disabled: disabled,
      name: name,
      type: determineType(type),
      value: value,
      onBlur: function onBlur() {
        return _validateInput();
      },
      onInput: function onInput(e) {
        return handleChange(e.target.value);
      },
      onChange: function onChange(e) {
        return handleChange(e.target.value);
      },
      maxLength: max,
      min: min,
      max: max,
      title: title
    });
  }
}
exports.default = GCInputRenderer;