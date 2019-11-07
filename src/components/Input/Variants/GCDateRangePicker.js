import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import RangeCalendar from "rc-calendar/lib/RangeCalendar";
// import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from "rc-calendar/lib/locale/en_US";
import TimePickerPanel from "rc-time-picker/lib/Panel";
import moment from "moment";
import "moment/locale/zh-cn";
import "moment/locale/en-gb";

class GCDateRangePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formatStr: "YYYY-MM-DD HH:mm Z"
    };
    this.onStandaloneChange = this.onStandaloneChange.bind(this);
    // Default value
    if (!props.value[0] || !props.value[1]) {
      const defaultCalendarStart = moment();
      defaultCalendarStart.set({
        hour: '08',
        minute: '00',
        second: '00'
      });

      const defaultCalendarEnd = defaultCalendarStart.clone();
      defaultCalendarEnd.add(1, "month");
      defaultCalendarEnd.set({
        hour: "23",
        minute: "59",
        second: "59"
      });
      this.props.onInputChange([defaultCalendarStart, defaultCalendarEnd]);
    }
  }

  onStandaloneChange(value) {
    this.props.onInputChange([this.format(value[0]), this.format(value[1])]);
  }

  format(v) {
    return v ? v.format(this.state.formatStr) : "";
  }

  render() {
    const { value, min } = this.props;
    moment.locale("en-gb");

    const timePickerElement = (
      <TimePickerPanel
        showSecond={false}
        defaultValue={[
          moment("08:00:00", "HH:mm"),
          moment("23:59:59", "HH:mm")
        ]}
      />
    );

    const disableDates = (current) => {
        const date = min ;
        date.hour(0);
        date.minute(0);
        date.second(0);
        return current.isBefore(date); // cannot select days before min
      }

    return (
      <div className="gc-rangecalendar">
        <RangeCalendar
          showToday
          dateInputPlaceholder={["Select a start date", "Select an end date"]}
          locale={enUS}
          showOk={false}
          format={this.state.formatStr}
          disabledDate={current => disableDates(current)}
          onChange={this.onStandaloneChange}
          timePicker={timePickerElement}
          selectedValue={[
            value[0] ? moment(value[0]) : GCDateRangePicker.defaultCalendarStart,
            value[1] ? moment(value[1]) : GCDateRangePicker.defaultCalendarEnd
          ]}
          // renderFooter={() => <span>extra footer</span>}
        />
      </div>
    );
  }
}

GCDateRangePicker.propTypes = {
  value: PropTypes.any,
  onInputChange: PropTypes.func.isRequired
};

export { GCDateRangePicker };
