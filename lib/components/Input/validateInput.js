'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _translations = require('../../translations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateInput = async function validateInput(_ref, userTranslations) {
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
      sendResultsToForm = _ref$sendResultsToFor === undefined ? null : _ref$sendResultsToFor,
      _ref$defaultAll = _ref.defaultAll,
      defaultAll = _ref$defaultAll === undefined ? false : _ref$defaultAll,
      _ref$allowAll = _ref.allowAll,
      allowAll = _ref$allowAll === undefined ? false : _ref$allowAll;

  var isEmpty = function isEmpty(v) {
    return v === null || v === undefined || typeof v === 'string' && v !== '' || (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object' && v !== {} || typeof v === 'boolean' && v && required;
  };

  var validateEmail = function validateEmail() {
    var pattern = handleRegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var valid = pattern.test(value);
    return handleErrorMessage(valid, (0, _translations.getTranslation)('invalidEmailAddress', userTranslations));
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
      return handleErrorMessage(valid, (0, _translations.getTranslation)('maxCharLength', userTranslations, maxL));
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
      return handleErrorMessage(valid, (0, _translations.getTranslation)('maxCharLength', userTranslations, maxL));
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
    return handleErrorMessage(valid, (0, _translations.getTranslation)('invalidURL', userTranslations));
  };

  var validateTextarea = function validateTextarea() {
    var pattern = handleRegExp('');
    var minL = min;
    var maxL = max;
    var valid = void 0;
    if (minL && value.length < minL) {
      return handleErrorMessage(valid, (0, _translations.getTranslation)('minCharLength', userTranslations, minL));
    } else if (maxL && value.length > maxL) {
      return handleErrorMessage(valid, (0, _translations.getTranslation)('maxCharLength', userTranslations, maxL));
    } else {
      valid = pattern.test(value);
      return handleErrorMessage(valid);
    }
  };

  var validatePassword = function validatePassword() {
    var minL = min && min !== 0 ? min : 8;
    var pattern = handleRegExp('');
    if (value.length < min) {
      return handleErrorMessage(false, (0, _translations.getTranslation)('minPasswordCharLength', userTranslations, minL), true);
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
      return handleErrorMessage(min <= selectedDate && max >= selectedDate, (0, _translations.getTranslation)('dateRange', userTranslations, min, max));
    } else if (from !== null) {
      min = new Date(from);
      return handleErrorMessage(min <= selectedDate, (0, _translations.getTranslation)('minDateRange', userTranslations, min));
    } else if (to !== null) {
      max = new Date(to);
      return handleErrorMessage(max >= selectedDate, (0, _translations.getTranslation)('maxDateRange', userTranslations, max));
    }
  };

  var validateNumber = function validateNumber() {
    var res = '';
    if (min && min > value) {
      res = handleErrorMessage(false, (0, _translations.getTranslation)('minNumber', userTranslations, min));
    } else if (max && max < value) {
      res = handleErrorMessage(false, (0, _translations.getTranslation)('maxNumber', userTranslations, max));
    }
    return res;
  };

  var validateSelect = function validateSelect() {
    if (multi && !defaultAll && !allowAll) {
      return validateCheckbox(value);
    } else if (multi && defaultAll || multi && allowAll) {
      if (value.length === options.length) {
        return null;
      } else {
        return validateCheckbox(value);
      }
    }
    return null;
  };

  var validateCheckbox = function validateCheckbox() {
    var res = null;
    if (options.length > 0) {
      var minL = min;
      var maxL = max;
      if (minL && minL > value.length) {
        res = (0, _translations.getTranslation)('minSelectOptions', userTranslations, minL);
      } else if (maxL && maxL < value.length) {
        res = (0, _translations.getTranslation)('maxSelectOptions', userTranslations, maxL);
      }
    }
    return res;
  };

  var handleErrorMessage = function handleErrorMessage(v) {
    var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _translations.getTranslation)('defaultInvalidInput', userTranslations);
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
          break;
        case 'array':
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
      return (0, _translations.getTranslation)('requiredField', userTranslations);
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