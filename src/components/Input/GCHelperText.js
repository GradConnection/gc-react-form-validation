import React from 'react';
import PropTypes from 'prop-types';

import ReactHtmlParser from 'react-html-parser';

const GCHelperText = ({ text }) => (
  <p className="gc-helper-text">{ReactHtmlParser(text)} </p>
);

GCHelperText.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
};

export default GCHelperText;
