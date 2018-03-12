import React, { Component } from 'react';

import GCRadio from './GCRadio';
import GCCheckbox from './GCCheckbox';
import GCSelect from './GCSelect';
import GCMultiSelect from './GCMultiSelect';
import GCInputLabel from './GCInputLabel';

export default function GCInputRenderer(
  { validationMessage, validateInput, handleChange, activeInput },
  ...props
) {
  const hat = arguments[0];
  const {
    name,
    disabled,
    type,
    value,
    min,
    max,
    title,
    multi,
    size,
    autocomplete
  } = arguments[0];
  const determineType = type => {
    let inputType;
    switch (type) {
      case 'name':
        inputType = 'name';
        break;
      case 'text':
      case 'url':
        inputType = 'text';
        break;
      case 'email':
        inputType = 'email';
        break;
      case 'checkbox':
        inputType = 'checkbox';
        break;
      case 'password':
        inputType = 'password';
        break;
      case 'date':
        inputType = 'date';
        break;
      case 'range':
        inputType = 'range';
        break;
      case 'number':
        inputType = 'number';
        break;
      case 'textarea':
        inputType = 'textarea';
        break;
      case 'radio':
        inputType = 'radio';
        break;
      case 'select':
        inputType = 'select';
        break;
      case 'custom':
        inputType = 'hidden';
        break;
      default:
        inputType = 'text';
        break;
    }
    return inputType;
  };

  const invalidClass = validationMessage ? 'gc-input--invalid' : '';
  const disabledClass = disabled ? 'gc-input--disabled' : '';
  if (type === 'textarea') {
    const textareaClass = `gc-input__textarea--${size}`;
    return (
      <textarea
        className={`${invalidClass} ${disabledClass} ${textareaClass}`}
        disabled={disabled}
        name={name}
        defaultValue={value}
        onBlur={() => validateInput()}
        onChange={e => handleChange(e.target.value)}
        min={min}
        max={max}
        title={title}
        autoComplete={autocomplete}
      />
    );
  } else if (type === 'radio') {
    return <GCRadio {...arguments[0]} onChange={v => handleChange(v)} />;
  } else if (type === 'checkbox') {
    return (
      <GCCheckbox
        {...arguments[0]}
        invalidClass={`${invalidClass}`}
        onChange={v => handleChange(v)}
      />
    );
  } else if (type === 'select' && multi) {
    return (
      <GCMultiSelect
        {...arguments[0]}
        onChange={v => handleChange(v)}
        validateInput={open => validateInput(open)}
        activeInput={activeInput}
        dynamicClasses={`${invalidClass} ${disabledClass}`}
      />
    );
  } else if (type === 'select' && !multi) {
    return (
      <GCSelect
        {...arguments[0]}
        onChange={v => handleChange(v)}
        validateInput={() => validateInput()}
        dynamicClasses={`${invalidClass} ${disabledClass}`}
      />
    );
  } else if (type === 'number') {
    return (
      <input
        className={`${invalidClass} ${disabledClass}`}
        disabled={disabled}
        name={name}
        type={determineType(type)}
        onBlur={() => validateInput()}
        onChange={e => handleChange(e.target.value)}
        min={min}
        max={max}
        title={title}
        defaultValue={value}
        autoComplete={autocomplete}
      />
    );
  } else {
    return (
      <input
        className={`${invalidClass} ${disabledClass}`}
        disabled={disabled}
        name={name}
        type={determineType(type)}
        value={value}
        onBlur={() => validateInput()}
        onInput={e => handleChange(e.target.value)}
        onChange={e => handleChange(e.target.value)}
        maxLength={max}
        min={min}
        max={max}
        title={title}
        autoComplete={autocomplete}
      />
    );
  }
}
