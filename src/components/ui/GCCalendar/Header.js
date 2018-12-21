import React from 'react'

const CalendarHeader = ({
  month,
  year,
  onHeaderBtnClick,
}) => (
  <h6 className='gc-calendar__header'>
  <button type='button' className='gc-calendar__header__btn' onClick={() => onHeaderBtnClick('month')} style={{marginRight: '5px'}}>{month}</button>
  <button type='button' className='gc-calendar__header__btn' onClick={() => onHeaderBtnClick('year')}>{year}</button></h6>
)

export { CalendarHeader }
