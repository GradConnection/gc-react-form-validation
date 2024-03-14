import React from 'react';
import PropTypes from 'prop-types';

import parse from 'html-react-parser';

const GCErrorMessage = ({ text }) => <p className="gc-error">{parse(text)} </p>;

GCErrorMessage.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
};

export default GCErrorMessage;
