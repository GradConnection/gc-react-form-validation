'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateInput = async function validateInput(_ref) {
  var open = _ref.open,
      type = _ref.type,
      name = _ref.name,
      value = _ref.value,
      _ref$isVisible = _ref.isVisible,
      isVisible = _ref$isVisible === undefined ? true : _ref$isVisible,
      _ref$required = _ref.required,
      required = _ref$required === undefined ? false : _ref$required,
      _ref$from = _ref.from,
      from = _ref$from === undefined ? null : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === undefined ? null : _ref$to,
      _ref$customRegex = _ref.customRegex,
      customRegex = _ref$customRegex === undefined ? null : _ref$customRegex,
      _ref$customErrorMessa = _ref.customErrorMessage,
      customErrorMessage = _ref$customErrorMessa === undefined ? null : _ref$customErrorMessa,
      _ref$max = _ref.max,
      max = _ref$max === undefined ? null : _ref$max,
      _ref$min = _ref.min,
      min = _ref$min === undefined ? null : _ref$min,
      _ref$multi = _ref.multi,
      multi = _ref$multi === undefined ? null : _ref$multi,
      _ref$options = _ref.options,
      options = _ref$options === undefined ? [] : _ref$options,
      _ref$inForm = _ref.inForm,
      inForm = _ref$inForm === undefined ? false : _ref$inForm,
      _ref$sendResultsToFor = _ref.sendResultsToForm,
      sendResultsToForm = _ref$sendResultsToFor === undefined ? null : _ref$sendResultsToFor;

  var isEmpty = function isEmpty(v) {
    return v === null || v === undefined || typeof v === 'string' && v !== '' || (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object' && v.length > 0 || typeof v === 'boolean' && v && required;
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
    var pattern = handleRegExp('');
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
      res = handleErrorMessage(false, 'Number must be higher than ' + min + '.');
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

  var getErrorMessage = function getErrorMessage() {
    if (isEmpty(value) && isVisible) {
      switch (type) {
        case 'email':
          return validateEmail();
          break;
        case 'password':
          return validatePassword();
          break;
        case 'name':
          return validateName();
          break;
        case 'custom':
        case 'text':
          return validateText();
          break;
        case 'date':
          return validateDate();
          break;
        case 'number':
          return validateNumber();
          break;
        case 'textarea':
          return validateTextarea();

        case 'checkbox':
          return validateCheckbox();
          break;
        case 'url':
          return validateUrl();
          break;
        case 'select':
          return validateSelect();
        case 'range':
        default:
          return null;
          break;
      }
    } else if (required && isVisible) {
      return 'This field is required';
    } else {
      return null;
    }
  };

  var error = await getErrorMessage();

  if (inForm) {
    sendResultsToForm(name, error);
  }

  return {
    validationMessage: error,
    activeInput: open
  };
};

exports.default = validateInput;