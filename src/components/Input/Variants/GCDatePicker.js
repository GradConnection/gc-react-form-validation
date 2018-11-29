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
    this.handleActivateCalendar = this.handleActivateCalendar.bind(this)
  }

  componentDidMount () {
    window.addEventListener('click', this.handleActivateCalendar)
  }

  componentWillMount () {
    window.removeEventListener('click', this.handleActivateCalendar)
  }

  handleActivateCalendar (e) {
    if (!this.datePicker.current.contains(e.target)) {
      this.setState({ isActive: false })
    }
  }

  onDateChange (newValue) {
    // Must receive date obj
    this.props.onInputChange(newValue)
  }

  onDropDownClick () {
    this.setState(state => ({ isActive: !state.isActive }))
  }

  formatDate (date) {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  }

  render () {
    const { placeholder = 'Select Date', value, defaultValue } = this.props
    const { isActive } = this.state
    const dateClasses = classNames('gc-input__el', 'gc-input__el--no-padding', {
      'gc-input__el--active': isActive
    })

    return (
      <div
        className={dateClasses}
        ref={this.datePicker}>
        <div
          role='button'
          className='gc-drop-down__value'
          onClick={this.onDropDownClick}>
          <span className='gc-drop-down__value__text'>{isEmpty(value) ? placeholder : this.formatDate(value)}</span>
          <GCIcon kind='caretIcon' extendedClassNames='gc-drop-down__caret' />
        </div>
        {isActive && (
          <GCCalendar
            value={value}
            defaultValue={defaultValue}
            type='picker'
            onDateChange={this.onDateChange}
          />
        )}
      </div>
    )
  }
}

export {GCDatePicker}
