import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// import GCStaticLabel from './Labels/GCStaticLabel'

const GCTextarea = ({
  name,
  value,
  size,
  min,
  max,
  handleInputValidation,
  onInputChange,
  rows,
  ...restProps
}) => (
  <textarea
    name={name}
    className={`gc-input__el gc-input__textarea--${size}`}
    onBlur={e => handleInputValidation(e.target.value)}
    onChange={e => onInputChange(e.target.value)}
    minLength={min}
    maxLength={max}
    rows={rows}
    defaultValue={value}
    {...restProps}
    />
)

GCTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  handleInputValidation: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  rows: PropTypes.number,
  size: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number
}

GCTextarea.defaultProps = {
  rows: 4,
  size: 'med',
  min: undefined,
  max: undefined
}

export { GCTextarea }
