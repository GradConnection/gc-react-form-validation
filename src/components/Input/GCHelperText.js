import React from 'react';
import PropTypes from 'prop-types';

import parse from 'html-react-parser';
const GCHelperText = ({ text }) => (
  <p className="gc-helper-text">{parse(text)} </p>
);

GCHelperText.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
};

export default GCHelperText;
