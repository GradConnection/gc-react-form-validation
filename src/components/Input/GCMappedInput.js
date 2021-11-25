import React from 'react';

import { determineRenderType } from '../../utils';

import {
  GCTextarea,
  GCRadio,
  GCPassword,
  GCCheckbox,
  GCMultiSelect,
  GCSelect,
  GCSelectExternalSearch,
  GCDatePicker,
  GCDatePickerFilter,
  GCDateTimePicker,
  GCDateRangePicker,
  GCRange,
  GCTimePicker,
  GCSelectFilter,
  GCMultiSelectFilter
} from './Variants';

const GCMappedInput = props => {
  const {
    helperText,
    type,
    handleInputChange,
    handleInputValidation,
    inForm,
    sendResultsToForm,
    extendedClassNames,
    extendedClass,
    customRegex,
    customErrorMessage,
    touchedByParent,
    allowAll,
    defaultAll,
    formSubmitted,
    formTemplate,
    isVisible,
    multi,
    search,
    onSearchInputFunction,
    defaultText,
    customComponent,
    customUI,
    loading,
    defaultValue,
    handleChange,
    onInputValidationSuccess,
    onInputValidationFailure,
    onChange,
    isFilter,
    ...xtra
  } = props;
  const renderType = determineRenderType(type);
  // NOTE: From here on out the Input.props.type will be used for validation only

  if ((isFilter || xtra.isFrontPageFilter) && renderType === 'select') {
    if (props.multi) {
      return (
        <GCMultiSelectFilter
          search={search}
          placeholder={xtra.placeholder}
          handleInputChange={handleInputChange}
          handleInputValidation={handleInputValidation}
          {...xtra}
        />
      );
    }
    return (
      <GCSelectFilter
        search={search}
        placeholder={xtra.placeholder}
        handleInputChange={handleInputChange}
        handleInputValidation={handleInputValidation}
        {...xtra}
      />
    );
  }

  if (isFilter && renderType === 'date') {
    return (
      <GCDatePickerFilter
        onInputChange={handleInputChange}
        handleInputValidation={handleInputValidation}
        {...xtra}
      />
    );
  }

  switch (renderType) {
    case 'textarea':
      return (
        <GCTextarea
          handleInputValidation={handleInputValidation}
          onInputChange={handleInputChange}
          {...xtra}
        />
      );
    case 'radio':
      return (
        <GCRadio
          onRadioBtnClick={handleInputChange}
          options={xtra.options}
          value={xtra.value}
          name={xtra.name}
          title={xtra.title}
          required={xtra.required}
        />
      );
    case 'checkbox':
      return (
        <GCCheckbox
          onInputChange={handleInputChange}
          handleInputValidation={handleInputValidation}
          {...xtra}
        />
      );
    case 'date':
      return (
        <GCDatePicker
          name={xtra.name}
          onInputChange={handleInputChange}
          handleInputValidation={handleInputValidation}
          {...xtra}
        />
      );
    case 'datetime':
      return (
        <GCDateTimePicker
          name={xtra.name}
          onInputChange={handleInputChange}
          handleInputValidation={handleInputValidation}
          {...xtra}
        />
      );
    case 'daterange':
      return (
        <GCDateRangePicker
          name={xtra.name}
          value={xtra.value}
          min={xtra.from}
          max={xtra.to}
          custom_time_zone={xtra.custom_time_zone}
          selection_type={xtra.selection_type}
          onInputChange={handleInputChange}
          handleInputValidation={handleInputValidation}
          {...xtra}
        />
      );
    case 'select':
      return props.multi ? (
        <GCMultiSelect
          name={xtra.name}
          value={xtra.value}
          options={xtra.options}
          search={search}
          placeholder={xtra.placeholder}
          handleInputChange={handleInputChange}
          handleInputValidation={handleInputValidation}
          persistSearch={xtra.persistSearch}
          {...xtra}
        />
      ) : typeof onSearchInputFunction === 'function' ? (
        <GCSelectExternalSearch
          name={xtra.name}
          value={xtra.value}
          options={xtra.options}
          search={search}
          onSearchInputFunction={onSearchInputFunction}
          disabled={xtra.disabled}
          placeholder={xtra.placeholder}
          handleInputChange={handleInputChange}
          handleInputValidation={handleInputValidation}
          {...xtra}
        />
      ) : (
        <GCSelect
          name={xtra.name}
          value={xtra.value}
          options={xtra.options}
          search={search}
          disabled={xtra.disabled}
          placeholder={xtra.placeholder}
          unselectable={xtra.unselectable}
          handleInputChange={handleInputChange}
          handleInputValidation={handleInputValidation}
          {...xtra}
        />
      );
    case 'password':
      return <GCPassword {...props} />;
    case 'range':
      return (
        <GCRange
          min={xtra.min}
          max={xtra.max}
          handleInputChange={handleInputChange}
          defaultValue={defaultValue}
          disabled={xtra.disabled}
          onClick={xtra.handleInputClick}
          allowCross={xtra.allowCross}
          pushable={xtra.pushable}
        />
      );
    case 'time':
      return (
        <GCTimePicker
          onInputChange={handleInputChange}
          handleInputValidation={handleInputValidation}
          name={xtra.name}
          value={xtra.value}
          defaultValue={xtra.defaultValue}
          disabled={xtra.disabled}
          format={xtra.format}
          disabledHours={xtra.disabledHours}
          disabledMinutes={xtra.disabledMinutes}
          minuteStep={xtra.minuteStep}
          {...xtra}
        />
      );
    default:
      return (
        <input
          id={xtra.name}
          className="gc-input__el"
          type={renderType}
          onBlur={e => handleInputValidation(e.target.value)}
          onChange={e => handleInputChange(e.target.value)}
          maxLength={props.max}
          minLength={props.min}
          autoComplete={xtra.autoComplete || xtra.name}
          aria-label={`input ${xtra.name}`}
          {...xtra}
        />
      );
  }
};

export default GCMappedInput;
