import React from 'react'

import { determineRenderType } from '../../utils'

import {
  GCTextarea,
  GCRadio,
  GCPassword,
  GCCheckbox,
  GCMultiSelect,
  GCSelect,
  GCSelectExternalSearch,
  GCDatePicker,
  GCDateRangePicker,
  GCRange,
  GCTimePicker
} from './Variants'

const GCMappedInput = props => {
  const { helperText, type, handleInputChange, handleInputValidation, inForm, sendResultsToForm, extendedClassNames, extendedClass, customRegex, customErrorMessage, touchedByParent, allowAll, defaultAll, formSubmitted, formTemplate, isVisible, multi, search, onSearchInputFunction, autoComplete, defaultText, customComponent, customUI, loading, defaultValue,
    handleChange, onInputValidationSuccess, onInputValidationFailure, onChange, ...xtra } = props
  const renderType = determineRenderType(type)
  // NOTE: From here on out the Input.props.type will be used for validation only
  switch (renderType) {
    case 'textarea':
      return <GCTextarea
        handleInputValidation={handleInputValidation}
        onInputChange={handleInputChange}
        {...xtra} />
    case 'radio':
      return <GCRadio
        onRadioBtnClick={handleInputChange}
        options={xtra.options}
        value={xtra.value}
        name={xtra.name}
        title={xtra.title}
        required={xtra.required} />
    case 'checkbox':
      return <GCCheckbox
        onInputChange={handleInputChange}
        handleInputValidation={handleInputValidation}
        {...xtra} />
    case 'date':
      return <GCDatePicker
        onInputChange={handleInputChange}
        handleInputValidation={handleInputValidation}
        {...xtra}
        />
    case 'daterange':
      return <GCDateRangePicker value={xtra.value} min={xtra.from} max={xtra.to} selection_type={xtra.selection_type} onInputChange={handleInputChange} handleInputValidation={handleInputValidation} />
    case 'select':
      return props.multi ? (
        <GCMultiSelect
          name={xtra.name}
          value={xtra.value}
          options={xtra.options}
          search={search}
          placeholder={xtra.placeholder}
          handleInputChange={handleInputChange}
          handleInputValidation={handleInputValidation} />
      ) : (
          typeof onSearchInputFunction === "function"
            ? (<GCSelectExternalSearch
              name={xtra.name}
              value={xtra.value}
              options={xtra.options}
              search={search}
              onSearchInputFunction={onSearchInputFunction}
              disabled={xtra.disabled}
              placeholder={xtra.placeholder}
              handleInputChange={handleInputChange}
              handleInputValidation={handleInputValidation} />) :
            (<GCSelect
              name={xtra.name}
              value={xtra.value}
              options={xtra.options}
              search={search}
              disabled={xtra.disabled}
              placeholder={xtra.placeholder}
              unselectable={xtra.unselectable}
              handleInputChange={handleInputChange}
              handleInputValidation={handleInputValidation} />)
        )
    case 'password':
      return <GCPassword {...props} />
    case 'range':
      return <GCRange
        min={xtra.min}
        max={xtra.max}
        handleInputChange={handleInputChange}
        defaultValue={defaultValue}
      />
    case 'time':
      return <GCTimePicker
        onInputChange={handleInputChange}
        handleInputValidation={handleInputValidation}
        name={xtra.name}
        value={xtra.value}
        defaultValue={xtra.defaultValue}
        disabled={xtra.disabled}
        format={xtra.format}
      />
    default:
      return (
        <input
          className='gc-input__el'
          type={renderType}
          onBlur={e => handleInputValidation(e.target.value)}
          onChange={e => handleInputChange(e.target.value)}
          maxLength={props.max}
          minLength={props.min}
          autoComplete={xtra.autoComplete || xtra.name}
          {...xtra}
        />
      )
  }
}

export default GCMappedInput
