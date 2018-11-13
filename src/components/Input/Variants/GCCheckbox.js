import React, { Component } from 'react'
import PropTypes from 'prop-types'

import uniqueId from 'lodash/uniqueId'
import ReactHtmlParser from 'react-html-parser'

class GCCheckbox extends Component {
  matchValues (arr, value) {
    if (this.props.options.length === 0) {
      return this.props.value
    }
    return arr.includes(value)
  }

  removeFromArray (arr, item) {
    const index = arr.findIndex(el => item === el)
    arr.splice(index, 1)
    return arr
  }

  convertToArray (str) {
    if (str === '') {
      return []
    } else if (str.includes(', ')) {
      return str.split(', ')
    } else {
      return [str]
    }
  }

  async handleChange (e, value) {
    e.preventDefault()
    const props = this.props
    if (props.options.length === 0) {
      await this.props.onChange(!props.value)
      this.props.validate()
    } else {
      const selectedValue = value
      const prevValue =
        typeof props.value === 'string'
          ? this.convertToArray(props.value)
          : props.value.map(i => i)
      let newArray = prevValue

      if (prevValue.includes(selectedValue)) {
        newArray = this.removeFromArray(prevValue, selectedValue)
      } else {
        newArray.push(selectedValue)
      }
      this.props.onChange(newArray)
    }
  }

  renderCheckboxOpts () {
    const props = this.props
    // TODO: Add disabledClass
    return props.options.map((opt, i) => {
      const activeClass = this.matchValues(props.value, opt.value)
        ? 'gc-form__checkbox--checked'
        : ''
      return (
        <div
          className='gc-form__checkbox'
          onClick={(e, v) => this.handleChange(e, opt.value)}
        >
          <input
            className={activeClass}
            type='checkbox'
            value={opt.value}
            key={uniqueId()}
            name={props.name}
            title={props.title}
            onChange={(e, v) => this.handleChange(e, opt.value)}
            checked={this.matchValues(props.value, opt.value)}
            disabled={this.props.disabled}
            readOnly
          />
          <label
            className={`gc-input__label gc-input__label--checkbox gc-input__label--checkbox-group`}
            htmlFor={props.name}
          >
            {ReactHtmlParser(opt.label)}
          </label>
        </div>
      )
    })
  }

  render () {
    const props = this.props
    const disabledClass = props.disabled ? 'gc-input--disabled' : ''
    if (props.options.length >= 1) {
      return (
        <div className={`${disabledClass} ${props.extendedClass}`}>
          {this.renderCheckboxOpts()}
        </div>
      )
    } else {
      const activeClass = props.value ? 'gc-form__checkbox--checked' : ''
      return (
        <div
          className='gc-form__checkbox'
          onClick={(e, v) => this.handleChange(e, !props.value)}
        >
          <input
            className={`${activeClass} ${disabledClass} ${
              props.extendedClass
            } ${this.props.invalidClass}`}
            type='checkbox'
            key={uniqueId()}
            name={props.name}
            title={props.title}
            checked={props.value}
            onClick={(e, v) => this.handleChange(e, !props.value)}
            disabled={this.props.disabled}
            readOnly
          />
        </div>
      )
    }
  }
}

GCCheckbox.propTypes = {
  extendedClass: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array
  ]),
  stateName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  customErrorMessage: PropTypes.string,
  touchedByParent: PropTypes.bool,
  sendResultsToForm: PropTypes.func,
  options: PropTypes.array,
  title: PropTypes.string,
  multiple: PropTypes.bool
}

GCCheckbox.defaultProps = {
  extendedClass: '',
  value: null,
  disabled: false,
  name: '',
  customRegex: null,
  customErrorMessage: null,
  touchedByParent: false,
  sendResultsToForm: null,
  options: [],
  title: null,
  multiple: false
}

export { GCCheckbox }
