import React from 'react';

const GCLabel = ({
  htmlFor,
  label,
  activeShrink = false,
  required = false
}) => (
  <label
    className={`${activeShrink ? 'gc-label-active--shrink' : 'gc-label'}`}
    htmlFor={htmlFor}
  >
    <span
      className={`gc-label__text ${required ? 'gc-label__text--required' : ''}`}
    >
      {label}
    </span>
  </label>
);

export default GCLabel;
