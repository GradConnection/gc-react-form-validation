"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTranslation = void 0;
var translationDefaults = {
  invalidEmailAddress: function invalidEmailAddress() {
    return 'This email address is invalid';
  },
  maxCharLength: function maxCharLength(max) {
    return "May not contain more than ".concat(max, " characters");
  },
  minCharLength: function minCharLength(min) {
    return "May not contain less than ".concat(min, " characters");
  },
  invalidURL: function invalidURL() {
    return 'This URL is invalid';
  },
  minPasswordCharLength: function minPasswordCharLength(min) {
    return "Password may not contain less than ".concat(min, " characters");
  },
  dateRange: function dateRange(fromDate, toDate) {
    return "Choose a date between ".concat(fromDate.toDateString(), " and ").concat(toDate.toDateString());
  },
  maxDateRange: function maxDateRange(toDate) {
    return "Choose a date earlier than ".concat(toDate);
  },
  minDateRange: function minDateRange(fromDate) {
    return "Choose a date later than ".concat(fromDate);
  },
  maxNumber: function maxNumber(max) {
    return "Choose a number lower than ".concat(max);
  },
  minNumber: function minNumber(min) {
    return "Choose a number higher than ".concat(min);
  },
  maxSelectOptions: function maxSelectOptions(max) {
    return "May not select more than ".concat(max, " options");
  },
  minSelectOptions: function minSelectOptions(min) {
    return "May not select less than ".concat(min, " options");
  },
  requiredField: function requiredField() {
    return 'This is a required field';
  },
  defaultInvalidInput: function defaultInvalidInput() {
    return 'Invalid input';
  }
};

var getTranslation = function getTranslation(name, userTranslations) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  if (userTranslations[name] !== undefined) {
    return userTranslations[name].apply(userTranslations, args);
  }

  return translationDefaults[name].apply(translationDefaults, args);
};

exports.getTranslation = getTranslation;