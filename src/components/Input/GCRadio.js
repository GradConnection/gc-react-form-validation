import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

class Input extends Component {
  renderRadioOpts() {
    const props = this.props;
    return props.options.map(opt => {
      return (
        <label
          key={uniqueId()}
          className="gc-radio__option"
          htmlFor={props.name}
        >
          <span
            className="gc-radio__btn"
            role="radio"
            onClick={e => this.handleChange(e, opt.value)}
          >
            <input
              className="gc-radio__btn-hidden"
              type="radio"
              value={opt.value}
              name={props.name}
              title={props.title}
              defaultChecked={props.value === opt.value}
            />
            <span className="gc-radio__btn-visible" />
          </span>

          <span className="gc-input__label gc-radio__label">{opt.label}</span>
        </label>
      );
    });
  }

  handleChange(e, value) {
    e.preventDefault();
    if (e.target.value === this.props.value && !this.props.required) {
      this.props.onChange('');
    } else {
      this.props.onChange(value);
    }
  }

  render() {
    const disabledClass = this.props.disabled ? 'gc-input--disabled' : '';
    return (
      <div className={`${disabledClass} ${this.props.extendedClass}`}>
        {this.renderRadioOpts()}
      </div>
    );
  }
}

Input.propTypes = {
  extendedClass: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  stateName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  customErrorMessage: PropTypes.string,
  touchedByParent: PropTypes.bool,
  sendResultsToForm: PropTypes.func,
  options: PropTypes.array,
  title: PropTypes.string
};

Input.defaultProps = {
  extendedClass: '',
  value: null,
  disabled: false,
  name: '',
  customRegex: null,
  customErrorMessage: null,
  touchedByParent: false,
  sendResultsToForm: null,
  options: [],
  title: null
};

export default Input;
