import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { GCStaticLabel } from '../Labels/GCStaticLabel'

const GCCustom = props => {
  const { title, name, value, customComponent } = props
  return (
    <Fragment>
      <GCStaticLabel title={title} htmlFor={name} />
      {customComponent(props)}
      <input
        type='hidden'
        value={value}
        name={name}
      />
    </Fragment>
  )
}

GCCustom.propTypes = {
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

GCCustom.defaultProps = {
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

export { GCCustom }
