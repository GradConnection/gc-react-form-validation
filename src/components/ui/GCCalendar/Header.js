import React from 'react'

import { GCIcon } from 'ui'

const CalendarHeader = ({
  month,
  year,
  onRightArrowBtnClick,
  onLeftArrowBtnClick
}) => (
  <div className='gc-calendar__header'>
    <button
      className='gc-calendar__header__btn gc-calendar__header__btn--left'
      onClick={onLeftArrowBtnClick}><GCIcon kind='chevronIcon' /></button>
    <span className='gc-calendar__header__text'>{`${month} ${year}`}</span>
    <button
      className='gc-calendar__header__btn'
      onClick={onRightArrowBtnClick}><GCIcon kind='chevronIcon' /></button>
  </div>
)

export { CalendarHeader }
