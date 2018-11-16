import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

import validateInput from './validateInput'

import GCLabel from './GCLabel'
import GCDescription from './GCDescription'
import GCMappedInput from './GCMappedInput'
import GCTooltip from './GCTooltip'
import GCErrorMessage from './GCErrorMessage'
import GCHelperText from './GCHelperText'

class Input extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      validationMessage: null,
      showTooltip: false,
      showValidationMessage: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
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
    const validationResponse = await validateInput({
      open: open,
      ...this.props
    })
    const isValid = !validationResponse.validationMessage
    this.setState(
      {
        ...validationResponse,
        showValidationMessage: !isValid
      },
      () => {
        isValid
          ? onInputValidationSuccess()
          : onInputValidationFailure(validationResponse)
      }
    )
  }

  handleInputChange (v) {
    if (!this.props.disabled || !this.props.loading) {
      this.props.onChange(v, this.props.name)
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
      required,
      helperText,
      label = title,
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
          {label && <GCLabel label={label} htmlFor={name} required={required} />}
          {description && <GCDescription text={description} />}
          <GCMappedInput
            handleInputValidation={open => this.handleInputValidation(open)}
            handleInputChange={this.handleInputChange}
            {...this.props}
          />
          {showValidationMessage && (
            <GCErrorMessage text={validationMessage} />
          )}

          {helperText && (
            <GCHelperText text={helperText} />
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
  title: PropTypes.string,
  data: PropTypes.object,
  formTemplate: PropTypes.func,
  multi: PropTypes.bool,
  search: PropTypes.bool,
  tooltip: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  autocomplete: PropTypes.string,
  loading: PropTypes.bool,
  hidden: PropTypes.bool,
  tooltip: PropTypes.string,
  formSubmitted: PropTypes.bool,
  customComponent: PropTypes.func,
  defaultAll: PropTypes.bool,
  defaultText: PropTypes.string,
  onInputValidationSuccess: PropTypes.func,
  onInputValidationFailure: PropTypes.func
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
  title: null,
  data: null,
  multi: false,
  search: true,
  tooltip: null,
  autoComplete: 'off',
  loading: false,
  hidden: false,
  tooltip: '',
  formSubmitted: false,
  customComponent: null,
  defaultText: 'All Options',
  defaultAll: false,
  allowAll: false,
  onInputValidationSuccess: () => ({}),
  onInputValidationFailure: () => ({})
}

export default Input
