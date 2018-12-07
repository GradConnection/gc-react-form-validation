import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'

import { GCIcon, GCCalendar } from 'ui'
import { isEmpty } from 'utils'

class GCDateRangePicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isActive: false
    }

    this.datePicker = React.createRef()

    this.onDropDownClick = this.onDropDownClick.bind(this)
    this.onEndDateChange = this.onEndDateChange.bind(this)
    this.onStartDateChange = this.onStartDateChange.bind(this)

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

  onEndDateChange (newValue) {
    // Must receive date obj
    console.log('end date changed')
    this.props.onInputChange({
      start: newValue, end: this.props.value.end
    })
  }

  onStartDateChange (newValue) {
    console.log('start date changed')
    this.props.onInputChange({
      end: newValue, start: this.props.value.start
    })
  }

  onDropDownClick (e) {
    e.preventDefault()
    this.setState(state => ({ isActive: !state.isActive }))
  }

  formatDate (date) {
    if (isEmpty(date)) {
      return ''
    }
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  }

  render () {
    const { placeholder = 'Select Date', value, defaultValue } = this.props
    const { isActive } = this.state
    console.log(isEmpty(value.end))
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
          >
          <input
            className='gc-drop-down__value__text gc-drop-down__value__text--input'
            type='text'
            defaultValue={isEmpty(value) ? '' : this.formatDate(value.start)}
            placeholder={placeholder}
            readOnly
            onFocus={this.handleOnFocusEffect}
            onBlur={this.handleOnBlurEffect} />
          <input
            className='gc-drop-down__value__text gc-drop-down__value__text--input'
            type='text'
            defaultValue={isEmpty(value) ? '' : this.formatDate(value.end)}
            placeholder={placeholder}
            readOnly
            onFocus={this.handleOnFocusEffect}
            onBlur={this.handleOnBlurEffect} />
          <button onClick={this.onDropDownClick}>
            <GCIcon kind='caretIcon' extendedClassNames='gc-drop-down__caret' />
          </button>

        </div>
        {isActive && (
          <div className='gc-calendar gc-calendar--range gc-drop-down__el'>
            <GCCalendar
              value={value.start}
              defaultValue={defaultValue}
              type='range'
              onStartDateChange={this.onStartDateChange}
              onEndDateChange={this.onEndDateChange}
            />
          </div>
        )}
      </div>
    )
  }
}

GCDateRangePicker.propTypes = {
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.obj,
  defaultValue: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  handleInputValidation: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired
}

GCDateRangePicker.defaultProps = {
  placeholder: 'Select Date',
  defaultValue: ''
}

export {GCDateRangePicker}
