import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
    this.handleOnFocusEffect = this.handleOnFocusEffect.bind(this)
    this.handleOnBlurEffect = this.handleOnBlurEffect.bind(this)
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

  handleOnFocusEffect (e) {
    this.setState({ isActive: true })
  }

  handleOnBlurEffect (e) {
    this.setState({ isActive: false }, () => this.props.handleInputValidation(this.props.value))
  }

  onDateChange (newValue) {
    // Must receive date obj
    this.props.onInputChange(newValue)
  }

  onDropDownClick (e) {
    e.preventDefault()
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
          onMouseDown={this.onDropDownClick}>
          <input
            className='gc-drop-down__value__text gc-drop-down__value__text--input'
            type='text'
            defaultValue={isEmpty(value) ? '' : this.formatDate(value)}
            placeholder={placeholder}
            readOnly
            onFocus={this.handleOnFocusEffect}
            onBlur={this.handleOnBlurEffect} />
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

GCDatePicker.propTypes = {
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  defaultValue: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  handleInputValidation: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired
}

GCDatePicker.defaultProps = {
  placeholder: 'Select Date',
  defaultValue: ''
}

export {GCDatePicker}
