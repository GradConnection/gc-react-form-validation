import React, { Component } from 'react'

import classNames from 'classnames'

import { GCIcon, GCCalendar } from 'ui'
import { isEmpty } from 'utils'

class GCDatePicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isActive: false
    }

    this.datePicker = React.createRef()

    this.onDropDownClick = this.onDropDownClick.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
  }

  onDateChange (newValue) {
    // TODO: format date default dd.mm.yyyy
    // Must receive date obj
    this.props.onInputChange(newValue)
  }

  onDropDownClick () {
    console.log('hi setting active state.')
    this.setState(state => ({ isActive: !state.isActive }))
  }

  render () {
    const { placeholder = 'Select Date', value } = this.props
    const { isActive } = this.state

    const dateClasses = classNames('gc-input__el', 'gc-input__el--no-padding', {
      'gc-input__el--active': isActive
    })

    const cleanValue = new Date(value) || undefined

    return (
      <div
        className={dateClasses}
        ref={this.datePicker}>
        <div
          role='button'
          className='gc-drop-down__value'
          onClick={this.onDropDownClick}>
          <span className='gc-drop-down__value__text'>{isEmpty(value) ? placeholder : value}</span>
          <GCIcon kind='caretIcon' extendedClassNames='gc-drop-down__caret' />
        </div>
        {isActive && (
          <GCCalendar
            date={cleanValue}
            type='picker'
            onDateChange={this.onDateChange}
          />
        )}
      </div>
    )
  }
}

export {GCDatePicker}
