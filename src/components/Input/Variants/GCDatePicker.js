import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import Calendar from 'rc-calendar';
import { GCIcon } from 'ui'
import { isEmpty, getDateFromString } from 'utils'
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

class GCDatePicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isActive: false
    }

    this.datePicker = React.createRef()

    this.onDropDownClick = this.onDropDownClick.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
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
  }

  handleActivateCalendar (e) {
    if(this.datePicker.current) {
      const touchedMonth = e.target.classList.contains('gc-calendar__body__cell--month')
      if (!this.datePicker.current.contains(e.target) && this.state.isActive && !touchedMonth) {
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
    console.log(e.target)
    if (!this.datePicker.current.contains(e.target)) {
      console.log('blur')
      this.setState({ isActive: false }, () => this.props.handleInputValidation(this.props.value))
    }
  }

  onDateChange (newValue) {
    // Must receive date obj
    const newValueFormatted = this.formatDate(newValue)
    if (newValueFormatted !== this.props.value) {
      this.props.onInputChange(newValueFormatted)
    } else {
      this.props.onInputChange('')
    }
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
    const { placeholder = 'Select Date', value, defaultValue } = this.props
    const { isActive } = this.state
    const dateClasses = classNames('gc-input__el', 'gc-input__el--no-padding', {
      'gc-input__el--active': isActive
    })

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
              dateInputPlaceholder={defaultValue}
              format={'YYYY-MM-DD'}
              onSelect={(value) => this.onDateSelect(value)}
              focusablePanel={true}
              // defaultValue={defaultValue}
              // value={moment(sanitisedValue)}
              // onChange={(value) => console.log('value change', value)}//this.onDateChange}
              // locale={cn ? zhCN : enUS}
              // disabledDate={disabledDate}
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
  placeholder: 'Select Date',
  defaultValue: ''
}

export {GCDatePicker}
