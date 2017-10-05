import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GCCheckbox extends Component {
  matchValues(arr, value) {
    return arr.includes(value);
  }

  removeFromArray(arr, item) {
    const index = arr.findIndex(el => item === el);
    arr.splice(index, 1);
    return arr;
  }

  convertToArray(str) {
    if (str === '') {
      return [];
    } else if (str.includes(', ')) {
      return str.split(', ');
    } else {
      return [str];
    }
  }

  handleChange(e) {
    const props = this.props;
    if (props.options.length === 0) {
      this.props.onChange(!props.value);
    } else {
      const selectedValue = e.target.value;
      const prevValue = typeof props.value === 'string' ? this.convertToArray(props.value) : props.value.map(i => i);
      let newArray = prevValue;

      if (prevValue.includes(selectedValue)) {
        newArray = this.removeFromArray(prevValue, selectedValue);
      } else {
        newArray.push(selectedValue);
      }
      this.props.onChange(newArray);
    }
  }

  renderCheckboxOpts() {
    const props = this.props;
    return props.options.map((opt, i) => {
      const d = new Date();
      const uid = d.getTime() + i;
      return (
        <div>
          <input
            type="checkbox"
            value={opt.value}
            key={uid}
            name={props.name}
            title={props.title}
            onChange={e => this.handleChange(e)}
            checked={this.matchValues(props.value, opt.value)}
            disabled={this.props.disabled}
          />
          {opt.label}
        </div>
      );
    });
  }

  render() {
    const props = this.props;
    const disabledClass = props.disabled ? 'gc-input--disabled' : '';
    if(props.options.length >= 1) {
      return (
        <div className={`${disabledClass} ${props.extendedClass}`}>
          {this.renderCheckboxOpts()}
        </div>
      );
    } else {
      return (
        <input
          className={`${disabledClass} ${props.extendedClass}`}
          type="checkbox"
          name={props.name}
          title={props.title}
          onChange={e => this.handleChange(e)}
          checked={props.value}
          disabled={this.props.disabled}
        />);
    }
  }
}

GCCheckbox.propTypes = {
  extendedClass: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
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
  multiple: PropTypes.bool,
};

GCCheckbox.defaultProps = {
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
  multiple: false,
};

export default GCCheckbox;
