import React from 'react';

const validateInput = async ({
  open,
  type,
  name,
  value,
  isVisible = true,
  required = false,
  from = null,
  to = null,
  customRegex = null,
  customErrorMessage = null,
  max = null,
  min = null,
  multi = null,
  options = [],
  inForm = false,
  sendResultsToForm = null
}) => {
  const isEmpty = v => {
    return (
      v === null ||
      v === undefined ||
      (typeof v === 'string' && v !== '') ||
      (typeof v === 'object' && v.length > 0) ||
      (typeof v === 'boolean' && v && required)
    );
  };

  const validateEmail = () => {
    const pattern = handleRegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const valid = pattern.test(value);
    return handleErrorMessage(
      valid,
      'The email address you have entered is not valid'
    );
  };

  const validateName = () => {
    const pattern = handleRegExp(/\d/);
    const maxL = max;
    let valid;

    if ((maxL && value.length < maxL) || !maxL) {
      valid = pattern.test(value);
      if (!customRegex) {
        valid = !valid;
      }
      return handleErrorMessage(valid);
    } else {
      return handleErrorMessage(
        valid,
        `May not contain more than ${maxL} characters`
      );
    }
  };

  const validateText = () => {
    const pattern = handleRegExp('');
    const maxL = max;
    let valid;

    if ((maxL && value.length < maxL) || !maxL) {
      valid = pattern.test(value);
      return handleErrorMessage(valid);
    } else {
      return handleErrorMessage(
        valid,
        `May not contain more than ${maxL} characters`
      );
    }
  };

  const validateUrl = () => {
    let usableUrl = '';
    if (/^(https:\/\/|http:\/\/)/.test(value)) {
      usableUrl = value;
    } else {
      usableUrl = `https:// ${value}`;
    }
    const valid = /[.]+/.test(usableUrl);
    return handleErrorMessage(valid, 'Url is not valid');
  };

  const validateTextarea = () => {
    const pattern = handleRegExp('');
    const minL = min;
    const maxL = max;
    let valid;
    if (minL && value.length < minL) {
      return handleErrorMessage(
        valid,
        `May not contain less than ${minL} characters`
      );
    } else if (maxL && value.length > maxL) {
      return handleErrorMessage(
        valid,
        `May not contain more than ${maxL} characters`
      );
    } else {
      valid = pattern.test(value);
      return handleErrorMessage(valid);
    }
  };

  const validatePassword = () => {
    const min = min && min !== 0 ? min : 8;
    const pattern = handleRegExp('');
    if (value.length < min) {
      return handleErrorMessage(
        false,
        `Password needs to have more than ${min} characters`,
        true
      );
    } else if (!pattern.test(value)) {
      return handleErrorMessage(false);
    }
  };

  const validateDate = () => {
    const selectedDate = new Date(value);
    let min, max;

    if (to !== null && from !== null) {
      max = new Date(to);
      min = new Date(from);
      return handleErrorMessage(
        min <= selectedDate && max >= selectedDate,
        `Please select a date between ${min.toDateString()} and ${max.toDateString()}`
      );
    } else if (from !== null) {
      min = new Date(from);
      return handleErrorMessage(
        min <= selectedDate,
        `Please select a date after ${min.toDateString()}`
      );
    } else if (to !== null) {
      max = new Date(to);
      return handleErrorMessage(
        max >= selectedDate,
        `Please select a date before ${max.toDateString()}`
      );
    }
  };

  const validateNumber = () => {
    let res = '';
    if (min && min > value) {
      res = handleErrorMessage(false, `Number must be higher than ${min}.`);
    } else if (max && max < value) {
      res = handleErrorMessage(false, `Number must be lower than ${max}`);
    }
    return res;
  };

  const validateSelect = () => {
    if (multi) {
      return validateCheckbox(value);
    }
    return null;
  };

  const validateCheckbox = () => {
    let res = null;

    if (options.length > 0) {
      const minL = min;
      const maxL = max;
      if (minL && minL > value.length) {
        res = `Please select more than ${minL} options`;
      } else if (maxL && maxL < value.length) {
        res = `Please select less than ${maxL} options`;
      }
    }
    return res;
  };

  const handleErrorMessage = (
    v,
    msg = 'Invalid Input',
    ignoreCustom = false
  ) => {
    if (!v) {
      return customErrorMessage && !ignoreCustom ? customErrorMessage : msg;
    }
    return null;
  };

  const handleRegExp = regX => {
    if (customRegex) {
      let cleanPattern = customRegex;
      if (
        typeof customRegex === 'string' &&
        customRegex.match(/^\//) &&
        customRegex.match(/\/$/)
      ) {
        cleanPattern = customRegex.slice(1, -1);
      }
      return new RegExp(cleanPattern);
    }
    return new RegExp(regX);
  };

  const getErrorMessage = () => {
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

  const error = await getErrorMessage();

  if (inForm) {
    sendResultsToForm(name, error);
  }

  return {
    validationMessage: error,
    activeInput: open
  };
};

export default validateInput;
