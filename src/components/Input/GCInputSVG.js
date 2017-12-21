import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GCInputSVG extends Component {
  render() {
    const { type, className } = this.props;
    switch (type) {
      case 'chevronDown':
        return (
          <svg
            id="layer_chevronDown"
            className={className}
            style={{ maxHeight: '50px' }}
            viewBox="0 0 50 50"
          >
            <title id={type}>{type}</title>

            <g id="chevronDown">
              <polygon
                className="gc-select__input-icon--fill"
                points="0 0 25 25 50 0 0 0"
              />
            </g>
          </svg>
        );
      case 'chevronUp':
        return (
          <svg
            id="layer_chevronUp"
            className={className}
            style={{ maxHeight: '50px' }}
            viewBox="0 0 50 50"
          >
            <title id={type}>{type}</title>

            <g id="chevronUp">
              <polygon
                className="gc-select__input-icon--fill"
                points="0 25 25 0 50 25 0 25"
              />
            </g>
          </svg>
        );
    }
  }
}

GCInputSVG.propTypes = {
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default GCInputSVG;
