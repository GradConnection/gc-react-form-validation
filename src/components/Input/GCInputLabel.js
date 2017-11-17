import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';

export default function GCInputLabel({title, required, name, value, type, exception, children}) {
  const inlineClass = isEmpty(value) ? 'gc-input__label--inline' : '';
  const requiredClass = required ? 'gc-input__label--required' : '';
  const selectClass = exception === 'select' ? 'gc-select__label' : '';
  const floatingLabel = type !== 'radio'
    && type !== 'date'
    && type !== 'range'
    && type !== 'select'
    && type !== 'textarea'
    && type !== 'checkbox';
  const staticLabel = type === 'date'
    || type === 'range'
    || type === 'textarea';

  if (!isEmpty(title) && type !== 'select') {
    if (staticLabel) {
      return (
        <div>
          <label
            className={`gc-input__label ${requiredClass} ${selectClass}`}
            htmlFor={name}>
            {title}
          </label>
          {children}
        </div>
      );
    } else if (floatingLabel) {
      return(
        <div>
          {children}
          <label
            className={`gc-input__label ${inlineClass} ${requiredClass}`}
            htmlFor={name}>
            {title}
          </label>
        </div>
      );
    } else if (type === 'checkbox') {
      return(
        <div>
          {children}
          <label
            className={`gc-input__label gc-input__label--checkbox ${requiredClass} ${selectClass}`}
            htmlFor={name}>
            {title}
          </label>
        </div>
      );
    }
  }
  return children;
};
