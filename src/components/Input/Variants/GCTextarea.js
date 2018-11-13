import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// import GCStaticLabel from './Labels/GCStaticLabel'

const GCTextarea = ({ title, name, size, min, max, handleInputValidation, handleInputChange, ...restProps }) => (
  <textarea
    name={name}
    className={`gc-input__textarea gc-input__textarea--${size}`}
    onBlur={() => handleInputValidation()}
    onChange={e => handleInputChange(e.target.value)}
    minLength={min}
    maxLength={max}
    {...restProps}
    />
)

GCTextarea.propTypes = {
  extendedClass: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array
  ]),
  stateName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  customErrorMessage: PropTypes.string,
  touchedByParent: PropTypes.bool,
  sendResultsToForm: PropTypes.func,
  options: PropTypes.array,
  title: PropTypes.string,
  multiple: PropTypes.bool
}

GCTextarea.defaultProps = {
  extendedClass: '',
  value: null,
  disabled: false,
  name: '',
  customRegex: null,
  customErrorMessage: null,
  touchedByParent: false,
  sendResultsToForm: null,
  options: [],
  title: null,
  multiple: false
}

export { GCTextarea }
