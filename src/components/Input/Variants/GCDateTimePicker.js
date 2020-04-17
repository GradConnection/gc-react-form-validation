import React, { Component } from "react";
import PropTypes from "prop-types";

import classNames from "classnames";
import { GCIcon } from "ui";
import Calendar from "rc-calendar";
import moment from "moment";

import DatePicker from "rc-calendar/lib/Picker";

import TimePickerPanel from "rc-time-picker/lib/Panel";

class GCDateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: props.showTime ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD",
      // format: props.showTime ? 'YYYY-MM-DD HH:mm Z' : 'YYYY-MM-DD',
      open: false,
    };
  }

  render() {
    const {
      placeholder = "Select date",
      disabled = false,
      showTime,
      from,
      to,
    } = this.props;
    const { open } = this.state;
    const sanitisedFrom = from && new Date(new Date(from).setHours(0, 0, 0, 0));
    const sanitisedTo = to && new Date(new Date(to).setHours(23, 59, 59, 59));

    const dateClasses = classNames("gc-input__el", "gc-input__el--no-padding", {
      "gc-input__el--active": open,
    });

    const timePickerElement = (
      <TimePickerPanel
        showSecond={false}
        use12Hours
        format="h:mm a"
        defaultValue={moment("00:00:00", "HH:mm:ss")}
      />
    );
    // const timePickerElement = <span>extra footer</span>;

    const onChange = (value) => {
      const val = value ? value.format(this.state.format) : "";
      this.props.handleInputValidation(val);
      this.props.onInputChange(val);
    };

    const disableDates = current => {
      const currentDateObj = new Date(current);
      if (from && to) {
        return currentDateObj < sanitisedFrom || currentDateObj > sanitisedTo;
      } else if (from) {
        return currentDateObj < sanitisedFrom; // cannot select days before "from" date
      } else if (to) {
        return currentDateObj > sanitisedTo; // cannot select days after "to" date
      } else false;
    };

    return (
      <DatePicker
        animation="slide-up"
        value={this.props.value ? moment(this.props.value) : ""}
        onChange={onChange}
        onOpenChange={(openstate) => {
          this.setState({ open: openstate });
        }}
        disabled={disabled}
        // renderFooter={() => <span>extra footer</span>}
        calendar={
          <Calendar
            format={this.state.format}
            dateInputPlaceholder={placeholder}
            disabledDate={from || to ? disableDates : null}
            timePicker={showTime ? timePickerElement : null}
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
                      ? moment(new Date(value)).format(this.state.format)
                      : ""
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
    PropTypes.string,
  ]),
  handleInputValidation: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

GCDateTimePicker.defaultProps = {
  defaultValue: "",
};

export { GCDateTimePicker };
