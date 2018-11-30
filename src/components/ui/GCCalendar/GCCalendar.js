import React, { Component, Fragment } from 'react'

import { CalendarHeader } from './Header'
import { CalendarBody } from './Body'

import { getPrevMonth, getNextMonth, getMonthName, monthNameArray, isEmpty } from 'utils'

class GCCalendar extends Component {
  constructor (props) {
    super(props)
    const { value, defaultValue, type } = props
    this.state = this.computeNewState(value, defaultValue, type)

    this.onLeftArrowBtnClick = this.onLeftArrowBtnClick.bind(this)
    this.onRightArrowBtnClick = this.onRightArrowBtnClick.bind(this)
    this.onDateClick = this.onDateClick.bind(this)
  }

  computeNewState (value, defaultValue, type) {
    const date = this.getDisplayValues(value, defaultValue)
    return {
      displayValue: date,
      month: type === 'picker' ? date.getMonth() : date.start.getMonth(),
      year: type === 'picker' ? date.getFullYear() : date.start.getFullYear()
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

  getDisplayValues (value, defaultValue) {
    const cleanDefaultValue = isEmpty(defaultValue) ? new Date() : new Date(defaultValue)
    const cleanValue = isEmpty(value) ? cleanDefaultValue : new Date(value)
    return cleanValue
  }

  render () {
    const { type = 'picker', value } = this.props
    const { year, month, displayValue } = this.state

    return (
      <div className='gc-calendar gc-drop-down__el'>
        { type === 'picker' && (
        <div className='gc-calendar__main'>
          <CalendarHeader
            month={monthNameArray[month]}
            year={year}
            onLeftArrowBtnClick={this.onLeftArrowBtnClick}
            onRightArrowBtnClick={this.onRightArrowBtnClick}
          />
          <CalendarBody
            displayDate={displayValue}
            valueDate={value}
            onDateClick={this.onDateClick} />
        </div>
        )}

        {type === 'range' && (
          <div className='gc-calendar__main gc-calendar--range'>
            <CalendarHeader />
            <CalendarBody />
          </div>
        )}

      </div>
    )
  }
}

export { GCCalendar }
