import React from 'react'

import { monthNameArray } from 'utils'

const MonthView = ({ selectedMonth, onMonthClick }) => (
    <div className='gc-calendar__body'>
      {monthNameArray.map((month, index) => <button className={`gc-calendar__body__cell gc-calendar__body__cell--btn gc-calendar__body__cell--month ${index === selectedMonth ? 'gc-calendar__body__cell--active' : ''}`} key={`${index}__month--${month}`} onClick={e => onMonthClick(e,index)}>{month}</button>)}
    </div>
  )

export { MonthView }
