import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';

export default function GCInputLabel({title, required, name, value, type, exception, children}) {
  const inlineClass = isEmpty(value) ? 'gc-input__label--inline' : '';
  const requiredClass = required ? 'gc-input__label--required' : '';
  const selectClass = exception === 'select' ? 'gc-select__label' : '';
  const floatingLabel = type !== 'radio'
    && type !== 'date'
    && type !== 'range'
    && type !== 'select';
  const staticLabel = type === 'date'
    || type === 'range';

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
    }
  }
  return children;
};
