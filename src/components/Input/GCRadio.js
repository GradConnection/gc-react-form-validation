import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GCInput extends Component {
  renderRadioOpts() {
    const props = this.props;
    return props.options.map((opt) => {
      const d = new Date();
      const uid = d.getTime() * 2;
      return (
        <div>
          <input
            type="radio"
            value={opt.value}
            key={uid}
            name={props.name}
            title={props.title}
            checked={props.value === opt.value}
            onChange={e => this.handleChange(e)}
          />
          {opt.label}
        </div>
      );
    });
  }

  handleChange(e) {
    if(e.target.value === this.props.value && !this.props.required) {
      this.props.onChange("");
    } else {
      this.props.onChange(e.target.value);
    }
  }

  render() {
    // const invalidClass = this.state.validationMessage ? 'gc-input--invalid' : '';
    const disabledClass = this.props.disabled ? 'gc-input--disabled' : '';
    return (
      <div className={`${disabledClass} ${this.props.extendedClass}`}>
        {this.renderRadioOpts()}
      </div>
    );
  }
}

GCInput.propTypes = {
  extendedClass: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  stateName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  customErrorMessage: PropTypes.string,
  touchedByParent: PropTypes.bool,
  sendResultsToForm: PropTypes.func,
  options: PropTypes.array,
  title: PropTypes.string,
};

GCInput.defaultProps = {
  extendedClass: '',
  value: null,
  disabled: false,
  name: '',
  customRegex: null,
  customErrorMessage: null,
  touchedByParent: false,
  sendResultsToForm: null,
  options: [],
  title: null,
};

export default GCInput;
