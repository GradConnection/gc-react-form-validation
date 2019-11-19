import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import { GCIcon } from 'ui'
import { isEmpty, getDateFromString } from 'utils'
import Calendar from 'rc-calendar';
import moment from 'moment';

import DatePicker from 'rc-calendar/lib/Picker';

import TimePickerPanel from 'rc-time-picker/lib/Panel';
class GCDatePicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      format: props.showTime ? 'YYYY-MM-DD HH:mm Z' : 'YYYY-MM-DD',
    }

  }

  render () {
    const { placeholder = 'Select date', disabled = false, showTime, min, max, value, disableConstraints} = this.props
    const { open } = this.state
    const dateClasses = classNames('gc-input__el', 'gc-input__el--no-padding', {
            'gc-input__el--active': open
          })

    const timePickerElement = <TimePickerPanel showSecond={false} defaultValue={moment('00:00:00', 'HH:mm:ss')} />;

    const onChange = value => {
      console.log('onChange value', value);
      this.setState({
        value,
      });
      const val = value ? value.format(this.state.format) : '';
      this.props.onInputChange(val)
    }
    // const disableDates = (current) => {
    //   const currentDateObj = new Date(current)
    //   if (min && max) {
    //        return (currentDateObj < this.state.min || currentDateObj > this.state.max)
    //      }
    //      else if (min) {
    //        return currentDateObj < this.state.min // cannot select days before min
    //      } 
    //      else if (max) {
    //        return currentDateObj > this.state.max // cannot select days after max
    //      }
    //      else false;
    //   }
    console.log('this.props', this.props)
    return (
      <DatePicker
      animation="slide-up"
      value={this.props.value ? moment(this.props.value) : ''}
      onChange={onChange}
      onOpenChange={(openstate) => {this.setState({open: openstate})}}
      // disabled={disabled}
      calendar={<Calendar
        format={this.state.format}
        timePicker={showTime ? timePickerElement : null}
      />}
    >
      {
        ({ value }) => {
          return (
            <div className={dateClasses} >
              <div role="button" className="gc-drop-down__value">
                <input
                  placeholder={placeholder}
                  disabled={disabled}
                  readOnly
                  type="text"
                  value={value ? moment(new Date(value)).format(this.state.format) : ''}
                  className='gc-drop-down__value__text gc-drop-down__value__text--input'
                />
                 <GCIcon kind='calendarIcon' extendedClassNames='gc-drop-down__caret' />
                </div>  
                </div>
          );
        }
      }
    </DatePicker>
    )
  }
}

GCDatePicker.propTypes = {
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  defaultValue: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  handleInputValidation: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired
}

GCDatePicker.defaultProps = {
  defaultValue: ''
}

export {GCDatePicker}
