import React from "react";

const GCLabel = ({ htmlFor, label, required = false }) => (
  <label className="gc-label" htmlFor={htmlFor}>
    <span
      className={`gc-label__text ${required ? "gc-label__text--required" : ""}`}
    >
      {label}
    </span>
  </label>
);

export default GCLabel;
