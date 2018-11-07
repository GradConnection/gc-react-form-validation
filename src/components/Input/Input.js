import React, { Component } from 'react'
import PropTypes from 'prop-types'

import GCInputRenderer from './GCInputRenderer'
import GCInputLabel from './GCInputLabel'
import GCTooltip from './GCTooltip'
import GCErrorMessage from './GCErrorMessage'

import validateInput from './validateInput'

import ReactHtmlParser from 'react-html-parser'

class Input extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      validationMessage: null,
      activeInput: false,
      tooltip: false
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      nextProps.value !== this.props.value ||
      nextProps.isVisible != this.props.isVisible ||
      nextState.validationMessage !== this.state.validationMessage ||
      nextProps.options !== this.props.options ||
      this.state.tooltip !== nextState.tooltip ||
      this.props.formSubmitted !== nextProps.formSubmitted ||
      this.props.disabled !== nextProps.disabled ||
      this.props.translations !== nextProps.translations
    )
  }

  componentDidUpdate (prevProps) {
    if (
      (prevProps.value !== this.props.value && this.props.hidden) ||
      (prevProps.value !== this.props.value && this.props.customUI) ||
      (prevProps.value !== this.props.value && this.props.type === 'radio') ||
      (!prevProps.formSubmitted && this.props.formSubmitted) ||
      (prevProps.required !== this.props.required)
    ) {
      this.handleInputValidation()
    }
  }

  async handleInputValidation (open) {
    const validationObj = Object.assign({ open: open }, this.props)
    const validationState = await validateInput(validationObj, this.props.translations)
    this.setState(validationState)
  }

  handleChange (v) {
    if (!this.props.disabled || !this.props.loading) {
      this.props.onChange(v, this.props.stateName)
    }
  }

  toggleTooltip (active) {
    this.setState({ tooltip: active })
  }

  getValue () {
    if (this.props.defaultAll && this.props.multi && this.props.type === 'select') {
      if (Array.isArray(this.props.value) && this.props.value.length === 0 || this.props.value === '') {
        return this.props.options.map(o => o.value)
      }
    }

    return this.props.value
  }

  render () {
    const { autocomplete } = this.props
    const errorMsgClass =
      this.props.type === 'checkbox' ? 'gc-input__error-msg--checkbox' : ''
    if (this.props.isVisible) {
      if (this.props.customUI) {
        return (
          <div
            className={`gc-input--custom ${
              this.state.validationMessage ? 'gc-input--custom--disabled' : null
            } ${this.props.extendedClassNames}`}
          >
            {this.props.customComponent()}
            <input
              type='hidden'
              value={this.props.value}
              name={this.props.name}
            />

            <GCErrorMessage
              msg={this.state.validationMessage}
              extendedClassNames={errorMsgClass}
            />
          </div>
        )
      } else {
        const checkboxSingle =
          this.props.type === 'checkbox' && this.props.options.length === 0
        return (
          <div
            className={`gc-input gc-input--${this.props.type} ${
              this.props.extendedClassNames
            } ${checkboxSingle ? 'gc-input--checkbox-single' : ''} ${this.props.description !== '' ? 'gc-input--has-description' : ''}`}
          >
            {this.props.description !== '' && (
              <p className='gc-input__description'>{this.props.description}</p>
            )}
            <GCInputLabel
              title={this.props.title}
              value={this.props.value}
              name={this.props.name}
              type={this.props.type}
              required={this.props.required}
              disabled={this.props.loading || this.props.disabled}
              hidden={this.props.hidden}
              toggleTooltip={active => this.toggleTooltip(active)}
              hasTooltip={this.props.tooltip !== ''}
              toolTipActive={this.state.tooltip}
              options={this.props.options.length > 0}
            >
              <GCInputRenderer
                handleValidation={open => this.handleInputValidation(open)}
                handleChange={v => this.handleChange(v)}
                validationMessage={this.state.validationMessage}
                disabled={this.props.loading || this.props.disabled}
                activeInput={this.state.activeInput}
                {...this.props}
                value={this.getValue()}
                allowAll={this.props.allowAll || this.props.defaultAll}
                autocomplete={
                  autocomplete === 'off'
                    ? `section-blue ${this.props.type}`
                    : autocomplete
                }
              />
            </GCInputLabel>

            {this.state.tooltip && (
              <GCTooltip
                content={this.props.tooltip}
                name={this.props.name}
                active={this.state.tooltip}
                toggleTooltip={active => this.toggleTooltip(active)}
              />
            )}

            <GCErrorMessage msg={this.state.validationMessage} />
          </div>
        )
      }
    } else if (this.props.hidden) {
      return <GCErrorMessage msg={this.state.validationMessage} />
    } else {
      return null
    }
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
  defaultText: PropTypes.string,
  translations: PropTypes.object
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
  allowAll: false,
  translations: {}
}

export default Input
