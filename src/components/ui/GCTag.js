import React from 'react';
import PropTypes from 'prop-types';

import { GCIcon } from 'ui';

const GCTag = ({ children, onCrossBtnClick }) => (
  <div className="gc-tag">
    <button
      type="button"
      className="gc-tag__btn gc-btn--icon-sml"
      onClick={onCrossBtnClick}
      aria-label="remove filter item"
    >
      <GCIcon kind="closeIcon" />
    </button>
    <span className="gc-tag__label">{children}</span>
  </div>
);

GCTag.propTypes = {
  children: PropTypes.node.isRequired,
  onCrossBtnClick: PropTypes.func.isRequired
};

export { GCTag };
