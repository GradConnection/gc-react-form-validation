import React from 'react'

const CalendarHeader = ({
  month,
  year
}) => (
  <h6 className='gc-calendar__header'>{`${month} ${year}`}</h6>
)

export { CalendarHeader }
