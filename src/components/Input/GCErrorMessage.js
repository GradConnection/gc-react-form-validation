import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ReactHtmlParser from 'react-html-parser'

const GCErrorMessage = ({ msg }) => (
  <p className='gc-input__error-msg'>{ReactHtmlParser(msg)} </p>
)

export default GCErrorMessage
