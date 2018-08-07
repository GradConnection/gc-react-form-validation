import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactHtmlParser from 'react-html-parser';

const GCErrorMessage = ({ msg, extendedClassNames = '' }) => {
  return !!msg ? (
    <p className={`gc-input__error-msg ${extendedClassNames}`}>
      {ReactHtmlParser(msg)}{' '}
    </p>
  ) : null;
};

export default GCErrorMessage;
