import React from "react";
import PropTypes from "prop-types";

import ReactHtmlParser from "react-html-parser";

const GCErrorMessage = ({ text }) => (
  <p className="gc-error">{ReactHtmlParser(text)} </p>
);

GCErrorMessage.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default GCErrorMessage;
