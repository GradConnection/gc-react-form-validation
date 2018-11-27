import React, { Component } from 'react'

import { CalendarHeader } from './Header'
import { CalendarBody } from './Body'

class GCCalendar extends Component {
  render () {
    return (
      <div className='gc-calendar'>
        <CalendarHeader />
        <CalendarBody />
      </div>
    )
  }
}

export { GCCalendar }
