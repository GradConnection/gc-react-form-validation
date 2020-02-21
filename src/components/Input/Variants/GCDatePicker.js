import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import { GCIcon } from 'ui'
import Calendar from 'rc-calendar';
import moment from 'moment';

import DatePicker from 'rc-calendar/lib/Picker';

import TimePickerPanel from 'rc-time-picker/lib/Panel';
class GCDatePicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      format: props.showTime ? 'YYYY-MM-DD HH:mm Z' : 'YYYY-MM-DD',
      open: false,
      min: props.min && new Date(new Date(props.min).setHours(0,0,0,0)),
      max: props.max && new Date(new Date(props.max).setHours(23,59,59,59))
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
      const val = value ? value.format(this.state.format) : '';
      this.props.handleInputValidation(val)
      this.props.onInputChange(val)
    }

    const disableDates = (current) => {
      const currentDateObj = new Date(current)
      if (min && max) {
           return (currentDateObj < this.state.min || currentDateObj > this.state.max)
         }
         else if (min) {
           return currentDateObj < this.state.min // cannot select days before min
         } 
         else if (max) {
           return currentDateObj > this.state.max // cannot select days after max
         }
         else false;
      }
// <<<<<<< HEAD
// =======
  //   }
  // }

  // handleOnFocusEffect (e) {
  //   if(!this.props.disabled) {
  //     this.setState({ isActive: true })
  //   }
  // }

  // handleOnBlurEffect (e) {    
  //   if (!this.datePicker.current.contains(e.target)) {      
  //     this.setState({ isActive: false }, () => this.props.handleInputValidation(this.props.value))
  //   }
  // }

  // onDateChange (newValue) {
  //   // Must receive date obj
  //   const newValueFormatted = this.formatDate(newValue)
  //   if (newValueFormatted !== this.props.value) {
  //     this.props.onInputChange(newValueFormatted)
  //   } else {
  //     this.props.onInputChange('')
  //   }
  // }

  // onDropDownClick (e) {
  //   e.preventDefault()
  //   if(!this.props.disabled){
  //     this.setState(state => ({ isActive: !state.isActive }))
  //   }
  // }

  // formatDate (date) {
  //   const dateObj = getDateFromString(date);
  //   const formatDayForSafari = dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate()
  //   const formatMonthForSafari = dateObj.getMonth() + 1 < 10 ? `0${dateObj.getMonth() + 1}` : dateObj.getMonth() + 1
  //   return `${dateObj.getFullYear()}-${formatMonthForSafari}-${formatDayForSafari}`
  // }

  // render () {
  //   const { placeholder = 'Select Date', value, defaultValue } = this.props
  //   const { isActive } = this.state
  //   const dateClasses = classNames('gc-input__el', 'gc-input__el--no-padding', {
  //     'gc-input__el--active': isActive
  //   })

// >>>>>>> master
    return (
      <DatePicker
      animation="slide-up"
      value={this.props.value ? moment(this.props.value) : ''}
      onChange={onChange}
      onOpenChange={(openstate) => {this.setState({open: openstate})}}
      disabled={disabled}
      calendar={<Calendar
        format={this.state.format}
        dateInputPlaceholder={placeholder}
        disabledDate={disableConstraints ? disableDates : null}
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
