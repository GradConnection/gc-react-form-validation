import React from 'react'

import { determineRenderType } from '../../utils'

import {
  GCTextarea,
  GCRadio,
  GCCheckbox,
  GCMultiSelect,
  GCSelect,
  GCCustom
} from './Variants'

const GCMappedInput = props => {
  const { type, handleInputChange, handleInputValidation } = props
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
    case 'custom':
      return <GCCustom {...props} />
    default:
      return (
        <input
          className={`gc-input__${type}`}
          type={renderType}
          onBlur={() => handleInputValidation()}
          onInput={e => handleInputChange(e.target.value)}
          onChange={e => handleInputChange(e.target.value)}
          maxLength={props.max}
          minLength={props.min}
          {...props}
        />
      )
  }
}

export default GCMappedInput
