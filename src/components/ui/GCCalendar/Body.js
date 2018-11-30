import React, { Component } from 'react'

import { dayShortNameArray, getFirstDayOfMonth, getLastDayOfMonth, getMonthLength, getPrevMonth } from 'utils'

const CalendarBody = ({ displayDate, valueDate, onDateClick }) => {
  const firstDayI = getFirstDayOfMonth(displayDate)
  const lastDayI = getLastDayOfMonth(displayDate)
  const monthLength = getMonthLength(displayDate)
  const prevMonth = getPrevMonth(displayDate)
  const prevMonthLength = getMonthLength(prevMonth)
  const extraDays = firstDayI + 6 - lastDayI
  const numOfWeeks = (monthLength + extraDays) / 7

  let counter = 1
  const valueDateTested = new Date(valueDate)
  const selectedDate = valueDateTested.getDate()

  const calcRows = rowI => {
    const cells = []

    dayShortNameArray.forEach((d, cellI) => {
      if ((rowI === 0 && cellI < firstDayI) || counter > monthLength) {
        // prev and next month dates
        let date = 0
        if (rowI === 0 && cellI < firstDayI) {
          date = prevMonthLength - firstDayI + cellI + 1
        } else {
          date = cellI - lastDayI
        }
        cells.push(<div className='gc-calendar__body__cell gc-calendar__body__cell--disabled' >{date}</div>)
      } else if ((rowI === 0 && cellI >= firstDayI) || (rowI > 0 && counter <= monthLength)) {
        // Current month dates
        const num = counter
        const activeClass = selectedDate && num === selectedDate ? 'gc-calendar__body__cell--active' : ''
        cells.push(<button className={`gc-calendar__body__cell gc-calendar__body__cell--btn ${activeClass}`} onClick={e => onDateClick(e, num)}>{counter}</button>)
        counter++
      }
    })
    return cells
  }

  const grid = []
  for (var i = 0; i < numOfWeeks; i++) {
    grid.push(<div className='gc-calendar__body__row'>
      {calcRows(i)}
    </div>)
  }
  return (
    <div className='gc-calendar__body'>
      {grid}
    </div>
  )
}

export { CalendarBody }
