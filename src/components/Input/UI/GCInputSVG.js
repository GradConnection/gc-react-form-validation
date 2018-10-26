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
      case 'close':
        return (
          <svg
            id="layer_closeUp"
            className={className}
            style={{ maxHeight: '50px' }}
            viewBox="0 0 50 50"
          >
            <title id={type}>{type}</title>

            <g id="closeUp">
              <polygon
                className="gc-select__input-icon--fill"
                points="M26.074 25L49.778 1.297A.76.76 0 1 0 48.704.223L25 23.925 1.296.223A.76.76 0 1 0 .222 1.297L23.926 25 .222 48.703a.76.76 0 1 0 1.074 1.075L25 26.074l23.704 23.703a.756.756 0 0 0 1.074 0 .76.76 0 0 0 0-1.073L26.074 25z"
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
