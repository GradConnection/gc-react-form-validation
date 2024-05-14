import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { GCIcon } from 'ui';
import GCLabel from '../GCLabel';
import Calendar from 'rc-calendar';
import moment from 'moment';

import DatePicker from 'rc-calendar/lib/Picker';

import TimePickerPanel from 'rc-time-picker/lib/Panel';

class GCDatePickerFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
  }

  render() {
    const {
      placeholder = 'Select date',
      disabled = false,
      showTime,
      from,
      to,
      name,
      label,
      required
    } = this.props;
    const format = showTime ? 'YYYY-MM-DD HH:mm Z' : 'YYYY-MM-DD'
    const { isActive } = this.state;
    const sanitisedFrom = from && new Date(new Date(from).setHours(0, 0, 0, 0));
    const sanitisedTo = to && new Date(new Date(to).setHours(23, 59, 59, 59));

    const dateClasses = classNames('gc-input__el', {
      'gc-input__el--active': isActive
    });

    const timePickerElement = (
      <TimePickerPanel
        showSecond={false}
        defaultValue={moment('00:00:00', 'HH:mm:ss')}
      />
    );

    const onChange = value => {
      const val = value ? value.format(format) : null;
      this.props.handleInputValidation(val);
      this.props.onInputChange(val);
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
        value={this.props.value ? moment(this.props.value) : null}
        onChange={onChange}
        onOpenChange={openstate => {
          this.setState({ isActive: openstate });
        }}
        disabled={disabled}
        calendar={
          <Calendar
            format={format}
            dateInputPlaceholder={placeholder}
            disabledDate={from || to ? disableDates : null}
            timePicker={showTime ? timePickerElement : null}
            style={{ top: '68px' }}
          />
        }
      >
        {({ value }) => (
          <div className={dateClasses} tabIndex={0}>
            <div
              className={`${
                value ? 'gc-drop-down__value--shrink' : 'gc-drop-down__value'
              }`}
              aria-label={`input ${name}`}
            >
              <div className="gc-filter__label-wrapper">
                <GCLabel
                  label={label}
                  htmlFor={name}
                  required={required}
                  activeShrink={!!value}
                />
                {!!value && (
                  <p className="gc-filter--value">{moment(new Date(value)).format(format)}</p>
                )}
              </div>
              <GCIcon kind="calendarIcon" extendedClassNames="input-icon" />
            </div>
          </div>
        )}
      </DatePicker>
    );
  }
}

GCDatePickerFilter.propTypes = {
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  handleInputValidation: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  showTime: PropTypes.bool,
  from: PropTypes.string,
  to: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool
};

export { GCDatePickerFilter };
