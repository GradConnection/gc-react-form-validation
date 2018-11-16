import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// import GCStaticLabel from './Labels/GCStaticLabel'

const GCTextarea = ({ name, value, size, min, max, handleInputValidation, handleInputChange, sendResultsToForm, rows = 4, ...restProps }) => (
  <textarea
    name={name}
    className={`gc-input__el gc-input__textarea--${size}`}
    onBlur={() => handleInputValidation()}
    onChange={e => handleInputChange(e.target.value)}
    minLength={min}
    maxLength={max}
    rows={rows}
    value={value}
    />
)

GCTextarea.propTypes = {
  extendedClass: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array
  ]),
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
