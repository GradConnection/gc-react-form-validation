import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

import validateInput from './validateInput'

import GCLabel from './GCLabel'
import GCDescription from './GCDescription'
import GCMappedInput from './GCMappedInput'
import GCTooltip from './GCTooltip'
import GCErrorMessage from './GCErrorMessage'

class Input extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      validationMessage: null,
      showTooltip: false,
      showValidationMessage: false
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      nextState.validationMessage !== this.state.validationMessage ||
      nextState.tooltip !== this.state.tooltip ||
      nextProps.value !== this.props.value ||
      nextProps.hidden !== this.props.hidden ||
      nextProps.options !== this.props.options ||
      nextProps.formSubmitted !== this.props.formSubmitted ||
      nextProps.disabled !== this.props.disabled
    )
  }

  componentDidUpdate (prevProps) {
    if (
      (prevProps.value !== this.props.value && this.props.hidden) ||
      (prevProps.value !== this.props.value && this.props.customUI) ||
      (prevProps.value !== this.props.value && this.props.type === 'radio') ||
      (!prevProps.formSubmitted && this.props.formSubmitted) ||
      prevProps.required !== this.props.required
    ) {
      this.handleInputValidation()
    }
  }

  async handleInputValidation (open) {
    const { onInputValidationFailure, onInputValidationSuccess } = this.props
    const validationMessage = await validateInput({
      open: open,
      ...this.props
    })
    const isValid = !!validationMessage
    this.setState(
      {
        validationMessage: validationMessage,
        showValidationMessage: isValid
      },
      () => {
        isValid
          ? onInputValidationSuccess()
          : onInputValidationFailure(validationMessage)
      }
    )
  }

  handleInputChange (v) {
    if (!this.props.disabled || !this.props.loading) {
      this.props.onChange(v, this.props.stateName)
    }
  }

  toggleTooltip (active) {
    this.setState({ tooltip: active })
  }

  getValue () {
    if (
      this.props.defaultAll &&
      this.props.multi &&
      this.props.type === 'select'
    ) {
      if (
        (Array.isArray(this.props.value) && this.props.value.length === 0) ||
        this.props.value === ''
      ) {
        return this.props.options.map(o => o.value)
      }
    }

    return this.props.value
  }

  render () {
    const {
      type,
      extendedClassNames,
      description,
      isVisible,
      disabled,
      hidden,
      title,
      name
    } = this.props
    const {
      validationMessage,
      showValidationMessage,
      showTooltip
    } = this.state

    const inputClasses = classnames('gc-input', `gc-input--${type}`, {
      'gc-input--invalid': showValidationMessage,
      'gc-input--disabled': disabled,
      [extendedClassNames]: extendedClassNames
    })

    if (!hidden || isVisible) {
      return (
        <div className={inputClasses}>
          {label && <GCLabel title={title} htmlFor={name} />}
          {description && <GCDescription text={description} />}
          <GCMappedInput
            handleInputValidation={open => this.handleInputValidation(open)}
            handleInputChange={v => this.handleInputChange(v)}
            {...this.props}
          />
          {showValidationMessage && (
            <GCErrorMessage msg={validationMessage} />
          )}
          {showTooltip && (
            <GCTooltip
              content={this.props.tooltip}
              name={this.props.name}
              active={this.state.tooltip}
              toggleTooltip={active => this.toggleTooltip(active)}
            />
          )}
        </div>
      )
    }
    return null
  }
}

Input.propTypes = {
  description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  extendedClassNames: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array
  ]),
  stateName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  to: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.string
  ]),
  from: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.string
  ]),
  max: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.string
  ]),
  min: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.string
  ]),
  onChange: PropTypes.func.isRequired,
  customRegex: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  customErrorMessage: PropTypes.string,
  sendResultsToForm: PropTypes.func,
  options: PropTypes.array,
  required: PropTypes.bool,
  inForm: PropTypes.bool,
  size: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.object,
  formTemplate: PropTypes.func,
  isVisible: PropTypes.bool,
  multi: PropTypes.bool,
  search: PropTypes.bool,
  tooltip: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  autocomplete: PropTypes.string,
  loading: PropTypes.bool,
  hidden: PropTypes.bool,
  tooltip: PropTypes.string,
  customUI: PropTypes.bool,
  formSubmitted: PropTypes.bool,
  customComponent: PropTypes.func,
  defaultAll: PropTypes.bool,
  defaultText: PropTypes.string
}

Input.defaultProps = {
  description: '',
  extendedClassNames: '',
  value: '',
  defaultValue: null,
  disabled: false,
  name: '',
  placeholder: '',
  to: null,
  from: null,
  max: null,
  min: null,
  customRegex: null,
  inForm: false,
  customErrorMessage: null,
  sendResultsToForm: null,
  options: [],
  required: false,
  size: 'medium',
  title: null,
  data: null,
  formTemplate: null,
  isVisible: true,
  multi: false,
  search: true,
  tooltip: null,
  autocomplete: 'off',
  loading: false,
  hidden: false,
  tooltip: '',
  customUI: false,
  formSubmitted: false,
  customComponent: null,
  defaultText: 'All Options',
  defaultAll: false,
  allowAll: false
}

export default Input
