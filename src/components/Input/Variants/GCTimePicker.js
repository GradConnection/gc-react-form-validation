import React, { Component } from 'react';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import PropTypes from 'prop-types'

class GCTimePicker extends Component {
  constructor(props) {
    super(props);

    this.getTimeFormat = this.getTimeFormat.bind(this);
    this.getMomentTime = this.getMomentTime.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handlePanelClose = this.handlePanelClose.bind(this);
  }

  getTimeFormat() {
    return this.props.format;
  }

  getMomentTime(value) {
    if (!value) return null;
    const format = this.getTimeFormat();
    return moment(value, format);
  }

  handleValueChange(newValue) {
    let formattedValue = '';
    const format = this.getTimeFormat();

    if (newValue) {
      formattedValue = newValue.format(format);
    }

    if (formattedValue !== this.props.value) {
      this.props.onInputChange(formattedValue);
    } else {
      this.props.onInputChange('');
    }
  }

  handlePanelClose() {
    this.props.handleInputValidation(this.props.value);
  }

  render() {
    return (
      <div className="gc-input__el gc-input__el--no-padding">
        <TimePicker
          prefixCls="gc-time-picker"
          className="gc-drop-down__value"
          inputReadOnly
          showSecond={false}
          format={this.getTimeFormat()}
          onChange={this.handleValueChange}
          onClose={this.handlePanelClose}
          name={this.props.name}
          value={this.getMomentTime(this.props.value)}
          defaultValue={this.getMomentTime(this.props.defaultValue)}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
        />
      </div>
    )
  }
};

GCTimePicker.propTypes = {
  onInputChange: PropTypes.func,
  handleInputValidation: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  format: PropTypes.string
};

GCTimePicker.defaultProps = {
  format: 'HH:mm'
};

export { GCTimePicker };
