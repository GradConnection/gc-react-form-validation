'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var translationDefaults = {
  invalidEmailAddress: function invalidEmailAddress() {
    return 'This email address is invalid';
  },
  maxCharLength: function maxCharLength(max) {
    return 'May not contain more than ' + max + ' characters';
  },
  minCharLength: function minCharLength(min) {
    return 'May not contain less than ' + min + ' characters';
  },
  invalidURL: function invalidURL() {
    return 'This URL is invalid';
  },
  minPasswordCharLength: function minPasswordCharLength(min) {
    return 'Password may not contain less than ' + min + ' characters';
  },
  dateRange: function dateRange(fromDate, toDate) {
    return 'Choose a date between ' + fromDate.toDateString() + ' and ' + toDate.toDateString();
  },
  maxDateRange: function maxDateRange(toDate) {
    return 'Choose a date earlier than ' + toDate;
  },
  minDateRange: function minDateRange(fromDate) {
    return 'Choose a date later than ' + fromDate;
  },
  maxNumber: function maxNumber(max) {
    return 'Choose a number lower than ' + max;
  },
  minNumber: function minNumber(min) {
    return 'Choose a number higher than ' + min;
  },
  maxSelectOptions: function maxSelectOptions(max) {
    return 'May not select more than ' + max + ' options';
  },
  minSelectOptions: function minSelectOptions(min) {
    return 'May not select less than ' + min + ' options';
  },
  requiredField: function requiredField() {
    return 'This is a required field';
  },
  defaultInvalidInput: function defaultInvalidInput() {
    return 'Invalid input';
  }
};

var getTranslation = exports.getTranslation = function getTranslation(name, userTranslations) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  if (userTranslations[name] !== undefined) {
    return userTranslations[name].apply(userTranslations, args);
  }
  return translationDefaults[name].apply(translationDefaults, args);
};