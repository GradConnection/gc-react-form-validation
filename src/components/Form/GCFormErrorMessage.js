import React from 'react';

import parse from 'html-react-parser';

const GCFormErrorMessage = ({ error }) => {
  if (Array.isArray(error) && error.length > 1) {
    return (
      <ul className="gc-form-error">
        {error.map(error => (
          <li>
            <p>{ReactHtmlParser(error)}</p>
          </li>
        ))}
      </ul>
    );
  }
  if (Array.isArray(error) && error.length === 1) {
    return (
      <div className="gc-form-error">
        <p>{parse(error[0])}</p>
      </div>
    );
  }
  return (
    <div className="gc-form-error">
      <p>{ReactHtmlParser(error)}</p>
    </div>
  );
};

export default GCFormErrorMessage;
