import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { GCIcon } from 'ui';
import Calendar from 'rc-calendar';
import moment from 'moment';
import 'moment-timezone';

import DatePicker from 'rc-calendar/lib/Picker';

import TimePickerPanel from 'rc-time-picker/lib/Panel';

class GCDateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: 'YYYY-MM-DD HH:mm Z',
      formatDisplayStr: 'YYYY-MM-DD HH:mm'
      // format: props.showTime ? 'YYYY-MM-DD HH:mm Z' : 'YYYY-MM-DD',
    };
  }

  render() {
    const {
      placeholder = 'Select date',
      disabled = false,
      from,
      to
    } = this.props;
    const sanitisedFrom = from && new Date(new Date(from).setHours(0, 0, 0, 0));
    const sanitisedTo = to && new Date(new Date(to).setHours(23, 59, 59, 59));

    const dateClasses = classNames(
      'gc-singledatetimepicker',
      'gc-input__el',
      'gc-input__el--no-padding'
    );

    // This is a hack to keep the calendar drop down open as it waits for the user to input a time
    const timePickerElement = <div />;

    const onChange = value => {
      const val = value ? value.format(this.state.format) : '';
      this.props.onInputChange(val);
    };
    const onTimeChange = value => {
      // Could also add validation for time, as in hours under 24, mins under 60
      // mainly this is extra support for Safari
      if (!value || value.length !== 5) {
        // in case they clear the value
        return null;
      }
      const currentDate = moment(this.props.value, this.state.format)
        .tz(this.props.custom_time_zone)
        .format('YYYY-MM-DD');
      const newTime = moment(`${currentDate}T${value}`).tz(
        this.props.custom_time_zone,
        true
      );
      onChange(newTime);
    };

    const disableDates = current => {
      const currentDateObj = new Date(current);
      if (from && to) {
        return currentDateObj < sanitisedFrom || currentDateObj > sanitisedTo;
      }
      if (from) {
        return currentDateObj < sanitisedFrom; // cannot select days before "from" date
      }
      if (to) {
        return currentDateObj > sanitisedTo; // cannot select days after "to" date
      }
      return false;
    };

    return (
      <DatePicker
        animation="slide-up"
        dropdownClassName="gc-single-date-time-picker"
        value={
          this.props.value
            ? moment(this.props.value, this.state.format).tz(
                this.props.custom_time_zone
              )
            : ''
        }
        onChange={onChange}
        disabled={disabled}
        calendar={
          <Calendar
            format={this.state.formatDisplayStr}
            dateInputPlaceholder={placeholder}
            disabledDate={from || to ? disableDates : null}
            timePicker={timePickerElement}
            showToday={false}
            showOk={false}
            renderFooter={() => (
              <div className="calendar-time-div">
                <GCIcon extendedClassNames="clock-footer-icon" kind="clock" />
                <input
                  id="calendar-time"
                  className="calendar-time"
                  type="time"
                  name="calendar-time"
                  defaultValue={
                    moment(this.props.value, this.state.format)
                      .tz(this.props.custom_time_zone)
                      .format('HH:mm') ||
                    this.props.defaultTime ||
                    '08:00'
                  }
                  pattern="[0-9]{2}:[0-9]{2}"
                  // onChange={value => onTimeChange(value)}
                  onChange={e => onTimeChange(e.target.value)}
                />
              </div>
            )}
          />
        }
      >
        {({ value }) => {
          return (
            <div className={dateClasses}>
              <div role="button" className="gc-drop-down__value">
                <input
                  placeholder={placeholder}
                  disabled={disabled}
                  readOnly
                  type="text"
                  value={
                    value
                      ? moment(value)
                          .tz(this.props.custom_time_zone)
                          .format(this.state.formatDisplayStr)
                      : ''
                  }
                  className="gc-drop-down__value__text gc-drop-down__value__text--input"
                />
                <GCIcon
                  kind="calendarIcon"
                  extendedClassNames="gc-drop-down__caret"
                />
              </div>
            </div>
          );
        }}
      </DatePicker>
    );
  }
}

GCDateTimePicker.propTypes = {
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]),
  handleInputValidation: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  custom_time_zone: PropTypes.string
};

GCDateTimePicker.defaultProps = {
  defaultValue: ''
};

export { GCDateTimePicker };
