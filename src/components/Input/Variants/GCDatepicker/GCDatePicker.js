import React, { Component } from 'react'

import classNames from 'class-names'

import { GCIcon } from 'ui'

class GCDatePicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isActive: false
    }

    this.datePicker = React.createRef()
    this.onDateChange = this.onDateChange.bind(this)
  }

  onDateChange (newValue) {
    // TODO: format date default dd.mm.yyyy
    // Must receive date obj
    this.props.onInputChange(newValue)
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
        className={selectClasses}
        ref={this.datePicker}>

        <div
          role='button'
          className='gc-select__value'
          onClick={this.onInputClick}>
          <span className='gc-datepicker__value__text'>{isEmpty(value) ? placeholder : value}</span>
          <GCIcon kind='caretIcon' extendedClassNames='gc-datepicker__caret' />
        </div>
        {isActive && (
          <Calendar
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
