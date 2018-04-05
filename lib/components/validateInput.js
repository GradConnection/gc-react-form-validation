'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validationInput = function validationInput(_ref) {
  var open = _ref.open,
      type = _ref.type,
      name = _ref.name,
      value = _ref.value,
      isVisible = _ref.isVisible,
      required = _ref.required,
      _ref$touchedByParent = _ref.touchedByParent,
      touchedByParent = _ref$touchedByParent === undefined ? false : _ref$touchedByParent,
      from = _ref.from,
      to = _ref.to,
      customRegex = _ref.customRegex,
      customErrorMessage = _ref.customErrorMessage,
      max = _ref.max,
      min = _ref.min,
      multi = _ref.multi,
      options = _ref.options,
      sendResultsToForm = _ref.sendResultsToForm;

  var error = null;
  if (isEmpty(value) && isVisible) {
    switch (type) {
      case 'email':
        error = validateEmail();
        break;
      case 'password':
        error = validatePassword();
        break;
      case 'name':
        error = validateName();
        break;
      case 'custom':
      case 'text':
        error = validateText();
        break;
      case 'date':
        error = validateDate();
        break;
      case 'number':
        error = validateNumber();
        break;
      case 'textarea':
        error = validateTextarea();
      case 'checkbox':
        error = validateCheckbox();
        break;
      case 'url':
        error = validateUrl();
        break;
      case 'select':
        error = validateSelect();
      case 'range':
      default:
        error = null;
        break;
    }
  } else if (required && isVisible) {
    error = 'This field is required';
  }

  if (touchedByParent) {
    sendResultsToForm(name, error);
  }

  return {
    validationMessage: error,
    touchedByParent: false,
    activeInput: open
  };

  var validateEmail = function validateEmail() {
    var pattern = handleRegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var valid = pattern.test(value);
    return handleErrorMessage(valid, 'The email address you have entered is not valid');
  };

  var validateName = function validateName() {
    var pattern = handleRegExp(/\d/);
    var maxL = max;
    var valid = void 0;

    if (maxL && value.length < maxL || !maxL) {
      valid = pattern.test(value);
      if (!customRegex) {
        valid = !valid;
      }
      return handleErrorMessage(valid);
    } else {
      return handleErrorMessage(valid, 'May not contain more than ' + maxL + ' characters');
    }
  };

  var validateText = function validateText() {
    var pattern = undefined.handleRegExp('');
    var maxL = max;
    var valid = void 0;

    if (maxL && value.length < maxL || !maxL) {
      valid = pattern.test(value);
      return handleErrorMessage(valid);
    } else {
      return handleErrorMessage(valid, 'May not contain more than ' + maxL + ' characters');
    }
  };

  var validateUrl = function validateUrl() {
    var usableUrl = '';
    if (/^(https:\/\/|http:\/\/)/.test(value)) {
      usableUrl = value;
    } else {
      usableUrl = 'https:// ' + value;
    }
    var valid = /[.]+/.test(usableUrl);
    return handleErrorMessage(valid, 'Url is not valid');
  };

  var validateTextarea = function validateTextarea() {
    var pattern = handleRegExp('');
    var minL = min;
    var maxL = max;
    var valid = void 0;
    if (minL && value.length < minL) {
      return handleErrorMessage(valid, 'May not contain less than ' + minL + ' characters');
    } else if (maxL && value.length > maxL) {
      return handleErrorMessage(valid, 'May not contain more than ' + maxL + ' characters');
    } else {
      valid = pattern.test(value);
      return handleErrorMessage(valid);
    }
  };

  var validatePassword = function validatePassword() {
    var min = min && min !== 0 ? min : 8;
    var pattern = handleRegExp('');
    if (value.length < min) {
      return handleErrorMessage(false, 'Password needs to have more than ' + min + ' characters', true);
    } else if (!pattern.test(value)) {
      return handleErrorMessage(false);
    }
  };

  var validateDate = function validateDate() {
    var selectedDate = new Date(value);
    var min = void 0,
        max = void 0;

    if (to !== null && from !== null) {
      max = new Date(to);
      min = new Date(from);
      return handleErrorMessage(min <= selectedDate && max >= selectedDate, 'Please select a date between ' + min.toDateString() + ' and ' + max.toDateString());
    } else if (from !== null) {
      min = new Date(from);
      return handleErrorMessage(min <= selectedDate, 'Please select a date after ' + min.toDateString());
    } else if (to !== null) {
      max = new Date(to);
      return handleErrorMessage(max >= selectedDate, 'Please select a date before ' + max.toDateString());
    }
  };

  var validateNumber = function validateNumber() {
    var res = '';
    if (min && min > value) {
      res = undefined.handleErrorMessage(false, 'Number must be higher than ' + min + '.');
    } else if (max && max < value) {
      res = handleErrorMessage(false, 'Number must be lower than ' + max);
    }
    return res;
  };

  var validateSelect = function validateSelect() {
    if (multi) {
      return validateCheckbox(value);
    }
    return null;
  };

  var validateCheckbox = function validateCheckbox() {
    var res = null;

    if (options.length > 0) {
      var minL = min;
      var maxL = max;
      if (minL && minL > value.length) {
        res = 'Please select more than ' + minL + ' options';
      } else if (maxL && maxL < value.length) {
        res = 'Please select less than ' + maxL + ' options';
      }
    }
    return res;
  };

  var isEmpty = function isEmpty(v) {
    return v === null || v === undefined || typeof v === 'string' && v !== '' || (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object' && v.length > 0 || typeof v === 'boolean' && v && required;
  };

  var handleErrorMessage = function handleErrorMessage(v) {
    var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Invalid Input';
    var ignoreCustom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!v) {
      return customErrorMessage && !ignoreCustom ? customErrorMessage : msg;
    }
    return null;
  };

  var handleRegExp = function handleRegExp(regX) {
    if (customRegex) {
      var cleanPattern = customRegex;
      if (typeof customRegex === 'string' && customRegex.match(/^\//) && customRegex.match(/\/$/)) {
        cleanPattern = customRegex.slice(1, -1);
      }
      return new RegExp(cleanPattern);
    }
    return new RegExp(regX);
  };
};