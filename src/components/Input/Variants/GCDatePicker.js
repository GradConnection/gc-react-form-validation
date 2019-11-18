import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import { GCIcon } from 'ui'
import { isEmpty, getDateFromString } from 'utils'
import Calendar from 'rc-calendar';
import moment from 'moment';

class GCDatePicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isActive: false,
      defaultValue: props.defaultValue && new Date(props.defaultValue),
      changeValue: '',
      value: props.value && new Date(props.value),
      min: props.min && new Date(new Date(props.min).setHours(0,0,0,0)),
      max: props.max && new Date(new Date(props.max).setHours(23,59,59,59))
    }


    this.datePicker = React.createRef()

    this.onDropDownClick = this.onDropDownClick.bind(this)
    this.handleActivateCalendar = this.handleActivateCalendar.bind(this)
    this.handleOnFocusEffect = this.handleOnFocusEffect.bind(this)
    this.handleOnBlurEffect = this.handleOnBlurEffect.bind(this)
  }

  componentDidMount () {
    if(document)
    {
      document.addEventListener('click', this.handleActivateCalendar)
    }
  }

  componentWillUnmount () {
    if(document)
    {
      document.removeEventListener('click', this.handleActivateCalendar)
    }
  }

  componentDidUpdate(prevProps) {
    if(!prevProps.disabled && this.props.disabled) {
      this.setState({ isActive: false })
    }
    if(prevProps.value !== this.props.value) {
      this.setState({ isActive: false })
    }
  }

  handleActivateCalendar (e) {
    if(this.datePicker.current) {
      const touchedMonth = e.target.classList.contains('rc-calendar-month-panel-month')
      const touchedYear = e.target.classList.contains('rc-calendar-year-panel-year')
      if (!this.datePicker.current.contains(e.target) && this.state.isActive && !touchedMonth && !touchedYear) {
        this.setState({ isActive: false }, () => this.props.handleInputValidation(this.props.value))
      }
    }
  }

  handleOnFocusEffect (e) {
    if(!this.props.disabled) {
      this.setState({ isActive: true })
    }
  }

  handleOnBlurEffect (e) {
    if (!this.datePicker.current.contains(e.target)) {
      this.setState({ isActive: false }, () => this.props.handleInputValidation(this.props.value))
    }
  }

  onDateSelect (value) {
    const valueFormatted = this.formatDate(value)
    this.setState({
      value: new Date(value),
    });
    this.props.onInputChange(valueFormatted)
  }

  onDropDownClick (e) {
    e.preventDefault()
    if(!this.props.disabled){
      this.setState(state => ({ isActive: !state.isActive }))
    }
  }

  formatDate (date) {
    const makeDateObj = new Date(date)
    const dateObj = getDateFromString(makeDateObj);
    const formatDayForSafari = dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate()
    const formatMonthForSafari = dateObj.getMonth() + 1 < 10 ? `0${dateObj.getMonth() + 1}` : dateObj.getMonth() + 1
    return `${dateObj.getFullYear()}-${formatMonthForSafari}-${formatDayForSafari}`
  }

  render () {
    const { placeholder = 'Select date', defaultValue, min, max, mode } = this.props
    const { isActive, value } = this.state
    const dateClasses = classNames('gc-input__el', 'gc-input__el--no-padding', {
      'gc-input__el--active': isActive
    })

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

    const onChange = (value) => {
      console.log('DatePicker change: ', (value && value));
      this.setState({
        changeValue: value,
      });
    }

    console.log('this.props', this.props)
    return (
      <div
        className={dateClasses}
        ref={this.datePicker}>
        <div
          role='button'
          className='gc-drop-down__value'
          onMouseDown={this.onDropDownClick}>
          <input
            className='gc-drop-down__value__text gc-drop-down__value__text--input'
            type='text'
            value={isEmpty(value) ? '' : this.formatDate(value)}
            placeholder={placeholder}
            readOnly
            onFocus={this.handleOnFocusEffect}
            onBlur={this.handleOnBlurEffect} />
          <GCIcon kind='calendarIcon' extendedClassNames='gc-drop-down__caret' />
        </div>
        {isActive && (
          <div className="gc-rc-calendar">
            <Calendar
              showDateInput={false}
              style={{ zIndex: 1000, width: "100%" }}
              format={'YYYY-MM-DD'}
              disabledDate={current => disableDates(current)}
              onChange={(v) => onChange(v)}
              onSelect={(v) => this.onDateSelect(v)}
              selectedValue={value ? moment(value) : ''}
              dateInputPlaceholder={placeholder}
              defaultValue={defaultValue && moment(defaultValue)}
              />
          </div>
        )}
      </div>
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
