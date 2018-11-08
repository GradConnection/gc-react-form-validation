"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _translations = require("../../translations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var validateInput =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref, userTranslations) {
    var open, type, name, value, _ref$isVisible, isVisible, _ref$required, required, _ref$from, from, _ref$to, to, _ref$customRegex, customRegex, _ref$customErrorMessa, customErrorMessage, _ref$max, max, _ref$min, min, _ref$multi, multi, _ref$options, options, _ref$inForm, inForm, _ref$sendResultsToFor, sendResultsToForm, _ref$defaultAll, defaultAll, _ref$allowAll, allowAll, isEmpty, validateEmail, validateName, validateText, validateUrl, validateTextarea, validatePassword, validateDate, validateNumber, validateSelect, validateCheckbox, handleErrorMessage, handleRegExp, getErrorMessage, error;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            open = _ref.open, type = _ref.type, name = _ref.name, value = _ref.value, _ref$isVisible = _ref.isVisible, isVisible = _ref$isVisible === void 0 ? true : _ref$isVisible, _ref$required = _ref.required, required = _ref$required === void 0 ? false : _ref$required, _ref$from = _ref.from, from = _ref$from === void 0 ? null : _ref$from, _ref$to = _ref.to, to = _ref$to === void 0 ? null : _ref$to, _ref$customRegex = _ref.customRegex, customRegex = _ref$customRegex === void 0 ? null : _ref$customRegex, _ref$customErrorMessa = _ref.customErrorMessage, customErrorMessage = _ref$customErrorMessa === void 0 ? null : _ref$customErrorMessa, _ref$max = _ref.max, max = _ref$max === void 0 ? null : _ref$max, _ref$min = _ref.min, min = _ref$min === void 0 ? null : _ref$min, _ref$multi = _ref.multi, multi = _ref$multi === void 0 ? null : _ref$multi, _ref$options = _ref.options, options = _ref$options === void 0 ? [] : _ref$options, _ref$inForm = _ref.inForm, inForm = _ref$inForm === void 0 ? false : _ref$inForm, _ref$sendResultsToFor = _ref.sendResultsToForm, sendResultsToForm = _ref$sendResultsToFor === void 0 ? null : _ref$sendResultsToFor, _ref$defaultAll = _ref.defaultAll, defaultAll = _ref$defaultAll === void 0 ? false : _ref$defaultAll, _ref$allowAll = _ref.allowAll, allowAll = _ref$allowAll === void 0 ? false : _ref$allowAll;

            isEmpty = function isEmpty(v) {
              return v === null || v === undefined || typeof v === 'string' && v !== '' || _typeof(v) === 'object' && v !== {} || typeof v === 'boolean' && v && required;
            };

            validateEmail = function validateEmail() {
              var pattern = handleRegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
              var valid = pattern.test(value);
              return handleErrorMessage(valid, (0, _translations.getTranslation)('invalidEmailAddress', userTranslations));
            };

            validateName = function validateName() {
              var pattern = handleRegExp(/\d/);
              var maxL = max;
              var valid;

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

            validateText = function validateText() {
              var pattern = handleRegExp('');
              var maxL = max;
              var valid;

              if (maxL && value.length < maxL || !maxL) {
                valid = pattern.test(value);
                return handleErrorMessage(valid);
              } else {
                return handleErrorMessage(valid, (0, _translations.getTranslation)('maxCharLength', userTranslations, maxL));
              }
            };

            validateUrl = function validateUrl() {
              var usableUrl = '';

              if (/^(https:\/\/|http:\/\/)/.test(value)) {
                usableUrl = value;
              } else {
                usableUrl = "https:// ".concat(value);
              }

              var valid = /[.]+/.test(usableUrl);
              return handleErrorMessage(valid, (0, _translations.getTranslation)('invalidURL', userTranslations));
            };

            validateTextarea = function validateTextarea() {
              var pattern = handleRegExp('');
              var minL = min;
              var maxL = max;
              var valid;

              if (minL && value.length < minL) {
                return handleErrorMessage(valid, (0, _translations.getTranslation)('minCharLength', userTranslations, minL));
              } else if (maxL && value.length > maxL) {
                return handleErrorMessage(valid, (0, _translations.getTranslation)('maxCharLength', userTranslations, maxL));
              } else {
                valid = pattern.test(value);
                return handleErrorMessage(valid);
              }
            };

            validatePassword = function validatePassword() {
              var minL = min && min !== 0 ? min : 8;
              var pattern = handleRegExp('');

              if (value.length < min) {
                return handleErrorMessage(false, (0, _translations.getTranslation)('minPasswordCharLength', userTranslations, minL), true);
              } else if (!pattern.test(value)) {
                return handleErrorMessage(false);
              }
            };

            validateDate = function validateDate() {
              var selectedDate = new Date(value);
              var min, max;

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

            validateNumber = function validateNumber() {
              var res = '';

              if (min && min > value) {
                res = handleErrorMessage(false, (0, _translations.getTranslation)('minNumber', userTranslations, min));
              } else if (max && max < value) {
                res = handleErrorMessage(false, (0, _translations.getTranslation)('maxNumber', userTranslations, max));
              }

              return res;
            };

            validateSelect = function validateSelect() {
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

            validateCheckbox = function validateCheckbox() {
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

            handleErrorMessage = function handleErrorMessage(v) {
              var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _translations.getTranslation)('defaultInvalidInput', userTranslations);
              var ignoreCustom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

              if (!v) {
                return customErrorMessage && !ignoreCustom ? customErrorMessage : msg;
              }

              return null;
            };

            handleRegExp = function handleRegExp(regX) {
              if (customRegex) {
                var cleanPattern = customRegex;

                if (typeof customRegex === 'string' && customRegex.match(/^\//) && customRegex.match(/\/$/)) {
                  cleanPattern = customRegex.slice(1, -1);
                }

                return new RegExp(cleanPattern);
              }

              return new RegExp(regX);
            };

            getErrorMessage = function getErrorMessage() {
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

            _context.next = 17;
            return getErrorMessage();

          case 17:
            error = _context.sent;

            if (inForm) {
              sendResultsToForm(name, error);
            }

            return _context.abrupt("return", {
              validationMessage: error,
              activeInput: open
            });

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function validateInput(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = validateInput;
exports.default = _default;