import React from 'react';
import TimePicker from 'rc-time-picker';
import PropTypes from 'prop-types';
import moment from 'moment';

const GCTimePicker = ({
  name,
  value,
  format = 'HH:mm',
  defaultValue,
  disabled,
  disabledHours,
  disabledMinutes,
  minuteStep,
  placeholder,
  readOnly,
  handleInputValidation,
  onInputChange
}) => {
  const getMomentTime = v => {
    // Takes in "2021-08-31T00:00:00Z" and returns in set format. Default format is: 14:00
    if (!v) return null;
    return moment(v);
  };

  const handleValueChange = newValue => {
    let formattedValue = '';

    if (newValue) {
      formattedValue = newValue;
    }

    if (formattedValue !== value) {
      onInputChange(formattedValue);
    } else {
      onInputChange('');
    }
  };

  const handlePanelClose = () => {
    handleInputValidation(value);
  };

  return (
    <div className="gc-input__el gc-input__el--no-padding">
      <TimePicker
        prefixCls="gc-time-picker"
        // className="gc-time-picker-panel"
        inputReadOnly={readOnly}
        showSecond={false}
        format={format}
        onChange={handleValueChange}
        onClose={handlePanelClose}
        name={name}
        value={getMomentTime(value)}
        defaultValue={getMomentTime(defaultValue)}
        disabled={disabled}
        disabledHours={disabledHours}
        disabledMinutes={disabledMinutes}
        minuteStep={minuteStep}
        placeholder={placeholder}
      />
    </div>
  );
};

GCTimePicker.propTypes = {
  onInputChange: PropTypes.func,
  handleInputValidation: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  format: PropTypes.string,
  disabledHours: PropTypes.func,
  disabledMinutes: PropTypes.func,
  minuteStep: PropTypes.number,
  placeholder: PropTypes.string
};

export { GCTimePicker };
