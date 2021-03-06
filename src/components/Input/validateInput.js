import { getTranslation } from 'translations';
import { toArray, isEmpty } from 'utils';
import moment from 'moment';

const validateInput = async (
  {
    open,
    type,
    customValidationType,
    name,
    value,
    endDateCanBePast,
    disabled = false,
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
    sendResultsToForm = null,
    defaultAll = false,
    allowAll = false,
    hidden = false
  },
  userTranslations
) => {
  const validateEmail = () => {
    const pattern = handleRegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const valid = pattern.test(value);
    return handleErrorMessage(
      valid,
      getTranslation('invalidEmailAddress', userTranslations)
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
    }
    return handleErrorMessage(
      valid,
      getTranslation('maxCharLength', userTranslations, maxL)
    );
  };

  const validateText = () => {
    const pattern = handleRegExp('');
    const maxL = max;
    let valid;

    if ((maxL && value.length < maxL) || !maxL) {
      valid = pattern.test(value);
      return handleErrorMessage(valid);
    }
    return handleErrorMessage(
      valid,
      getTranslation('maxCharLength', userTranslations, maxL)
    );
  };

  const validateUrl = () => {
    let usableUrl = '';
    if (/^(https:\/\/|http:\/\/)/.test(value)) {
      usableUrl = value;
    } else {
      usableUrl = `https:// ${value}`;
    }
    const valid = /[.]+/.test(usableUrl);
    return handleErrorMessage(
      valid,
      getTranslation('invalidURL', userTranslations)
    );
  };

  const validateTextarea = () => {
    const pattern = handleRegExp('');
    const minL = min;
    const maxL = max;
    let valid;
    if (minL && value.length < minL) {
      return handleErrorMessage(
        valid,
        getTranslation('minCharLength', userTranslations, minL)
      );
    }
    if (maxL && value.length > maxL) {
      return handleErrorMessage(
        valid,
        getTranslation('maxCharLength', userTranslations, maxL)
      );
    }
    valid = pattern.test(value);
    return handleErrorMessage(valid);
  };

  const validatePassword = () => {
    const minL = min && min !== 0 ? min : 8;
    const pattern = handleRegExp('');
    if (value.length < min) {
      return handleErrorMessage(
        false,
        getTranslation('minPasswordCharLength', userTranslations, minL),
        true
      );
    }
    if (!pattern.test(value)) {
      return handleErrorMessage(false);
    }
  };

  const validateDate = () => {
    const selectedDate = new Date(value);
    let min;
    let max;
    if (to !== null && from !== null) {
      max = new Date(to);
      min = new Date(from);
      return handleErrorMessage(
        min <= selectedDate && max >= selectedDate,
        getTranslation('dateRange', userTranslations, min, max)
      );
    }
    if (from !== null) {
      min = new Date(from);
      return handleErrorMessage(
        min <= selectedDate,
        getTranslation('minDate', userTranslations, min)
      );
    }
    if (to !== null) {
      max = new Date(to);
      return handleErrorMessage(
        max >= selectedDate,
        getTranslation('maxDate', userTranslations, max)
      );
    }
  };

  const validateDateRange = () => {
    const currentDate = moment();
    const endValue = value[1] ? moment(value[1]) : null;
    if (!endDateCanBePast) {
      return handleErrorMessage(
        endValue === null || endValue >= currentDate,
        getTranslation('dateRangeEnd', userTranslations)
      );
    }
  };

  const validateNumber = () => {
    let res = '';
    if (min && min > value) {
      res = handleErrorMessage(
        false,
        getTranslation('minNumber', userTranslations, min)
      );
    } else if (max && max < value) {
      res = handleErrorMessage(
        false,
        getTranslation('maxNumber', userTranslations, max)
      );
    }
    return res;
  };

  const validateSelect = () => {
    if (multi && !defaultAll && !allowAll) {
      return validateCheckbox(value);
    }
    if ((multi && defaultAll) || (multi && allowAll)) {
      if (value.length === options.length) {
        return null;
      }
      return validateCheckbox(value);
    }
    return null;
  };

  const validateCheckbox = () => {
    let res = null;
    if (options.length > 0) {
      const minL = min;
      const maxL = max;
      const valueArray = toArray(value);
      if (minL && minL > valueArray.length) {
        res = getTranslation('minSelectOptions', userTranslations, minL);
      } else if (maxL && maxL < valueArray.length) {
        res = getTranslation('maxSelectOptions', userTranslations, maxL);
      }
    } else if (!value && required) {
      res = res = getTranslation('requiredField', userTranslations);
    }
    return res;
  };

  const validateTime = () => {
    if (min && max && min.length && max.length) {
      return handleErrorMessage(
        min <= value && max >= value,
        getTranslation('timeRange', userTranslations, min, max)
      );
    }
    if (min !== null && min.length) {
      return handleErrorMessage(
        min <= value,
        getTranslation('minTime', userTranslations, min)
      );
    }
    if (max !== null && max.length) {
      return handleErrorMessage(
        max >= value,
        getTranslation('maxTime', userTranslations, max)
      );
    }
  };

  const handleErrorMessage = (
    v,
    msg = getTranslation('defaultInvalidInput', userTranslations),
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

  const getErrorMessage = (renderType, hidden, value, disabled) => {
    // if not empty and not hidden
    if (!isEmpty(value) && !hidden && !disabled) {
      switch (renderType) {
        case 'custom':
          return getErrorMessage(customValidationType, hidden, value, disabled);
        case 'email':
          return validateEmail();
        case 'password':
          return validatePassword();
        case 'name':
          return validateName();
        case 'text':
          return validateText();
        case 'date':
          return validateDate();
        case 'daterange':
          return validateDateRange();
        case 'number':
          return validateNumber();
        case 'textarea':
          return validateTextarea();
        case 'array':
        case 'checkbox':
          return validateCheckbox();
        case 'url':
          return validateUrl();
        case 'select':
          return validateSelect();
        case 'time':
          return validateTime();
        case 'range':
        default:
          return null;
      }
    } else if (required && !hidden) {
      return getTranslation('requiredField', userTranslations);
    } else {
      return null;
    }
  };

  const error = await getErrorMessage(type, hidden, value, disabled);

  if (inForm) {
    sendResultsToForm(name, error);
  }

  return {
    validationMessage: error,
    activeInput: open
  };
};

export default validateInput;
