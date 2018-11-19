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
  const { type, handleInputChange, handleInputValidation, inForm, sendResultsToForm, extendedClassNames, allowAll, defaultAll, formSubmitted, customRegex, customErrorMessage, formTemplate, isVisible, multi, search, autoComplete, defaultText, customComponent, customUI, loading, defaultValue, autocomplete, onInputValidationSuccess, onInputValidationFailure, onChange, ...xtra } = props
  const renderType = determineRenderType(type)
  // NOTE: From here on out the Input.props.type will be used for validation only

  switch (renderType) {
    case 'textarea':
      return <GCTextarea {...props} />
    case 'radio':
      return <GCRadio {...props} />
    case 'checkbox':
      return <GCCheckbox {...props} />
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
          {...xtra}
        />
      )
  }
}

export default GCMappedInput
