import React from 'react'

import { determineRenderType } from '../../utils'

import {
  GCTextarea,
  GCRadio,
  GCPassword,
  GCCheckbox,
  GCMultiSelect,
  GCSelect,
  GCCustom
} from './Variants'

const GCMappedInput = props => {
  const { helperText, type, handleInputChange, handleInputValidation, inForm, sendResultsToForm, extendedClassNames, extendedClass, customRegex, customErrorMessage, touchedByParent, allowAll, defaultAll, formSubmitted, formTemplate, isVisible, multi, search, autoComplete, defaultText, customComponent, customUI, loading, defaultValue, onInputValidationSuccess, onInputValidationFailure, onChange, ...xtra } = props
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
        {...props} />
    case 'select':
      return props.multi ? (
        <GCMultiSelect {...props} />
      ) : (
        <GCSelect {...props} />
      )
    case 'password':
      return <GCPassword {...props} />
    case 'custom':
      return <GCCustom {...props} />
    default:
      return (
        <input
          className='gc-input__el'
          type={renderType}
          onBlur={() => handleInputValidation()}
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
