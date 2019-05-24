import React, { Component } from 'react'

import { CalendarHeader } from './Header'
import { DateView, MonthView, YearView } from '../../UI/GCCalendar/Views'
import { CalendarControls } from '../../UI/GCCalendar/Controls'

import { getPrevMonth, getNextMonth, monthNameArray, isEmpty } from 'utils'

class GCCalendar extends Component {
  constructor (props) {
    super(props)
    const { value, defaultValue, type } = props
    this.state = {
      mode: 'date',
      ...this.computeNewState(value, defaultValue, type)
    }

    this.onLeftArrowBtnClick = this.onLeftArrowBtnClick.bind(this)
    this.onRightArrowBtnClick = this.onRightArrowBtnClick.bind(this)
    this.onHeaderBtnClick = this.onHeaderBtnClick.bind(this)

    // picker
    this.onDateClick = this.onDateClick.bind(this)
    this.onMonthClick = this.onMonthClick.bind(this)
    this.onYearClick = this.onYearClick.bind(this)

    // range
    this.onRangeDateClick = this.onRangeDateClick.bind(this)
  }

  computeNewState (value, defaultValue, type) {
    const date = this.getDisplayValues(value, defaultValue)
    return {
      displayValue: date,
      month: date.getMonth(),
      year: date.getFullYear()
    }
  }

  getDisplayValues (value, defaultValue) {
    // if (this.props.type === 'range') {
    //   const cleanDefaultValue = isEmpty(defaultValue) ? new Date() : new Date(defaultValue)
    //   const cleanValue = isEmpty(value) ? cleanDefaultValue : new Date(value)
    //   return cleanValue
    // }
    const cleanDefaultValue = isEmpty(defaultValue) ? new Date() : new Date(defaultValue)
    const cleanValue = isEmpty(value) ? cleanDefaultValue : new Date(value)
    return cleanValue
  }

  onLeftArrowBtnClick (e) {
    e.preventDefault()
    // picker
    if (this.state.mode !== 'year') {
      const newDisplayDate = getPrevMonth(this.state.displayValue)
      this.setState(this.computeNewState(newDisplayDate, this.props.defaultValue, this.props.type))
    } else {
      const { year, month, displayValue } = this.state
      const day = displayValue.getDate()
      const newDisplayDate = new Date(year-10, month, day)
      this.setState(this.computeNewState(newDisplayDate, this.props.defaultValue, this.props.type))
    }
  }

  onRightArrowBtnClick (e) {
    e.preventDefault()
    // picker
    if(this.state.mode !== 'year') {
      const newDisplayDate = getNextMonth(this.state.displayValue)
      this.setState(this.computeNewState(newDisplayDate, this.props.defaultValue, this.props.type))
    } else {
      const { year, month, displayValue } = this.state
      const day = displayValue.getDate()
      const newDisplayDate = new Date(year+10, month, day)
      this.setState(this.computeNewState(newDisplayDate, this.props.defaultValue, this.props.type))
    }

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

  onMonthClick (e, newMonth) {
    e.preventDefault()
    const { year, month, displayValue } = this.state
    const day = displayValue.getDate()
    if(newMonth !== month) {
      this.setState({ mode: 'date', month: newMonth, displayValue: new Date(year, newMonth, day) })
    }
  }

  onYearClick (e, newYear) {
    e.preventDefault()
    const { year, month, displayValue } = this.state
    const day = displayValue.getDate()
    if(newYear !== year) {
      this.setState({ mode: 'month', year: newYear, displayValue: new Date(newYear, month, day) })
    }
  }

  onRangeDateClick (event, day, month, year) {
    event.preventDefault()
    const { value } = this.props
    const newValue = new Date(year, month, day)
    const date = isEmpty(value) ? { start: undefined, end: undefined } : value
    const n = +newValue
    const s = +date.start
    const e = +date.end

    if (Number.isNaN(s) && Number.isNaN(e)) {
      date.start = newValue
      date.end = undefined
    } else if (!Number.isNaN(s) && Number.isNaN(e) && s < n) {
      date.end = newValue
    } else if ((!Number.isNaN(s) && Number.isNaN(e) && n < s) || n < s) {
      date.end = value.start
      date.start = newValue
    } else if (s < n) {
      date.end = newValue
      date.start = value.start
    } else if (n === s) {
      date.start = undefined
    } else if (e === s) {
      date.end = undefined
    }
    this.props.onDateChange(date)
  }

  onHeaderBtnClick(newMode) {
    this.setState({ mode: newMode })
  }

  render () {
    const { value, type } = this.props
    const { year, month, displayValue, mode } = this.state
    if (type === 'picker') {
      return (
        <div className='gc-calendar__main'>
          <CalendarControls
            view={mode}
            onLeftArrowBtnClick={this.onLeftArrowBtnClick}
            onRightArrowBtnClick={this.onRightArrowBtnClick}>
            <div className='gc-calendar__content'>
              <CalendarHeader
                month={monthNameArray[month]}
                year={year}
                onHeaderBtnClick={this.onHeaderBtnClick}
                />
              {mode === 'date' && (
                <DateView
                  displayDate={displayValue}
                  valueDate={value}
                  onDateClick={this.onDateClick} />
              )}
              {mode === 'month' && (
                <MonthView
                  selectedMonth={month}
                  onMonthClick={this.onMonthClick} />
              )}
              {mode === 'year' && (
                <YearView
                  selectedYear={year}
                  onYearClick={this.onYearClick} />
              )}
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
              onDateClick={this.onRangeDateClick} />
          </div>
          <div className='gc-calendar__content gc-calendar__content--right'>
            <CalendarHeader
              month={monthNameArray[endDateView.getMonth()]}
              year={endDateView.getFullYear()} />
            <CalendarBody
              displayDate={getNextMonth(displayValue)}
              valueDate={value}
              type='range-right'
              onDateClick={this.onRangeDateClick} />
          </div>
        </CalendarControls>
      </div>
    )
  }
}

export { GCCalendar }
