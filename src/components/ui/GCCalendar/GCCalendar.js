import React, { Component } from 'react'

import { CalendarHeader } from './Header'
import { CalendarBody } from './Body'
import { CalendarControls } from './Controls'

import { getPrevMonth, getNextMonth, monthNameArray, isEmpty } from 'utils'

class GCCalendar extends Component {
  constructor (props) {
    super(props)
    const { value, defaultValue, type } = props
    this.state = this.computeNewState(value, defaultValue, type)

    this.onLeftArrowBtnClick = this.onLeftArrowBtnClick.bind(this)
    this.onRightArrowBtnClick = this.onRightArrowBtnClick.bind(this)

    // picker
    this.onDateClick = this.onDateClick.bind(this)

    // range
    this.onStartDateClick = this.onStartDateClick.bind(this)
    this.onEndDateClick = this.onEndDateClick.bind(this)
  }

  computeNewState (value, defaultValue, type) {
    const date = this.getDisplayValues(value, defaultValue)
    return {
      displayValue: date,
      month: date.getMonth(),
      year: date.getFullYear()
    }
  }

  onLeftArrowBtnClick (e) {
    e.preventDefault()
    // picker
    const newDisplayDate = getPrevMonth(this.state.displayValue)
    this.setState(this.computeNewState(newDisplayDate, this.props.defaultValue, this.props.type))
  }

  onRightArrowBtnClick (e) {
    e.preventDefault()
    // picker
    const newDisplayDate = getNextMonth(this.state.displayValue)
    this.setState(this.computeNewState(newDisplayDate, this.props.defaultValue, this.props.type))
  }

  onDateClick (e, date) {
    e.preventDefault()
    const { year, month } = this.state
    const newValue = new Date(year, month, date)

    if (+this.props.value !== +newValue) {
      this.props.onDateChange(newValue)
    } else {
      this.props.onDateChange('')
    }
  }

  onStartDateClick (e, date) {
    e.preventDefault()
    const { year, month } = this.state
    const newValue = new Date(year, month, date)
    console.log('start:', date)
    if (+this.props.value !== +newValue) {
      this.props.onStartDateChange(newValue)
    } else {
      this.props.onStartDateChange('')
    }
  }

  onEndDateClick (e, date) {
    e.preventDefault()
    const { year, month } = this.state
    const newValue = new Date(year, month, date)
    console.log('end:', date)
    if (+this.props.value !== +newValue) {
      this.props.onEndDateChange(newValue)
    } else {
      this.props.onEndDateChange('')
    }
  }

  getDisplayValues (value, defaultValue) {
    const cleanDefaultValue = isEmpty(defaultValue) ? new Date() : new Date(defaultValue)
    const cleanValue = isEmpty(value) ? cleanDefaultValue : new Date(value)
    return cleanValue
  }

  render () {
    const { value, type } = this.props
    const { year, month, displayValue } = this.state
    if (type === 'picker') {
      return (
        <div className='gc-calendar__main'>
          <CalendarControls onLeftArrowBtnClick={this.onLeftArrowBtnClick}
            onRightArrowBtnClick={this.onRightArrowBtnClick}>
            <div className='gc-calendar__content'>
              <CalendarHeader
                month={monthNameArray[month]}
                year={year} />
              <CalendarBody
                displayDate={displayValue}
                valueDate={value}
                onDateClick={this.onDateClick} />
            </div>
          </CalendarControls>

        </div>
      )
    }

    const endDateView = getNextMonth(displayValue)
    return (
      <div className='gc-calendar__main gc-calendar__main--range'>
        <CalendarControls onLeftArrowBtnClick={this.onLeftArrowBtnClick}
          onRightArrowBtnClick={this.onRightArrowBtnClick}>
          <div className='gc-calendar__content'>
            <CalendarHeader
              month={monthNameArray[month]}
              year={year} />
            <CalendarBody
              displayDate={displayValue}
              valueDate={value}
              type='range-left'
              onDateClick={this.onStartDateClick} />
          </div>
          <div className='gc-calendar__content gc-calendar__content--right'>
            <CalendarHeader
              month={monthNameArray[endDateView.getMonth()]}
              year={endDateView.getFullYear()} />
            <CalendarBody
              displayDate={displayValue}
              valueDate={value}
              type='range-right'
              onDateClick={this.onEndDateClick} />
          </div>
        </CalendarControls>
      </div>
    )
  }
}

export { GCCalendar }
