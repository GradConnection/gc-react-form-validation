import React from 'react'
import PropTypes from 'prop-types'

import ReactHtmlParser from 'react-html-parser'

const GCErrorMessage = ({ msg }) => (
  <p className='gc-input__error-msg'>{ReactHtmlParser(msg)} </p>
)

GCErrorMessage.propTypes = {
  msg: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
}

export default GCErrorMessage
