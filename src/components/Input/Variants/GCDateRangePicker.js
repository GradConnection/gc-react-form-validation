import React, { Component } from "react";
import PropTypes from "prop-types";

import RangeCalendar from "rc-calendar/lib/RangeCalendar";
// import zhCN from 'rc-calendar/lib/locale/zh_CN';
import Picker from 'rc-calendar/lib/Picker';
import enUS from "rc-calendar/lib/locale/en_US";
import TimePickerPanel from "rc-time-picker/lib/Panel";
import 'moment-timezone';
import moment from "moment";
import "moment/locale/zh-cn";
import "moment/locale/en-gb";

class GCDateRangePicker extends Component {
  constructor(props) {
    super(props);
    this.onStandaloneChange = this.onStandaloneChange.bind(this);
    this.state = {
      formatStr: 'YYYY-MM-DD HH:mm Z',
      formatDisplayStr: 'YYYY-MM-DD HH:mm',
      dateRange:[
        props.value[0] ? moment(props.value[0], 'YYYY-MM-DD HH:mm Z').tz(this.props.custom_time_zone) : moment().set({
          hour: '08',
          minute: '00',
          second: '00'
        }),
        props.value[1] ? moment(props.value[1], 'YYYY-MM-DD HH:mm Z').tz(this.props.custom_time_zone) : moment().add(1, "month").set({
          hour: "23",
          minute: "59",
          second: "59"
        })
      ]        
    }
    if (!props.value[0] || !props.value[1]) {
      this.props.onInputChange([this.state.dateRange[0], this.state.dateRange[1]]);
    }
  }

  componentDidMount() {
    if (this.props.value[1]) {
        this.props.handleInputValidation(this.props.value)
    }
  }

  onStandaloneChange(value) {
    this.props.onInputChange([value[0], value[1]]);
    this.setState({dateRange:[value[0], value[1]]});
  }
  // onPickerChange(value)  {
  //   console.log('onChange', value);
  // }
  render() {
    const min = this.props.min && new Date(new Date(this.props.min).setHours(0,0,0,0));
    const max = this.props.max && new Date(new Date(this.props.max).setHours(23,59,59,59));
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
      const currentDateObj = new Date(current)
      if (min && max) {
           return (currentDateObj < min || currentDateObj > max)
         }
         else if (min) {
           return currentDateObj < min // cannot select days before min
         } 
         else if (max) {
           return currentDateObj > max // cannot select days after max
         }
         else false;
      }

      const calendar = (
        <RangeCalendar
          showToday
          dateInputPlaceholder={["Select a start date", "Select an end date"]}
          locale={enUS}
          type={this.props.selection_type || 'both'}
          showOk={false}
          format={this.state.formatDisplayStr}
          disabledDate={current => disableDates(current)}
          onChange={this.onStandaloneChange}
          timePicker={timePickerElement}
          selectedValue={([
            this.state.dateRange[0],this.state.dateRange[1]
          ])
        }
          // renderFooter={() => <span>extra footer</span>}
        />
      );
    
    return (
      <div className="gc-input__el">
        <Picker
        value={this.state.dateRange}
        // onChange={value => this.onPickerChange(value)}
        animation="slide-up"
        calendar={calendar}
        >
        {
          ({ value }) => {
            return ( 
                <input
                  placeholder="please select"
                  style={{ width: '100%' }}
                  className="gc-drop-down__value__text--input"
                  // disabled={state.disabled}
                  readOnly
                  value={ `${moment(value[0], this.state.formatStr).format(this.state.formatDisplayStr)}  -  ${moment(value[1], this.state.formatStr).format(this.state.formatDisplayStr)}` || ''}
                />
                 );
          }
        }
      </Picker>
      </div>
    );
  }
}

GCDateRangePicker.propTypes = {
  value: PropTypes.any,
  onInputChange: PropTypes.func.isRequired
};

export { GCDateRangePicker };
