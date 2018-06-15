import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GCInputRenderer from './GCInputRenderer';
import GCInputLabel from './GCInputLabel';
import GCTooltip from './GCTooltip';

import validateInput from './validateInput';

import ReactHtmlParser from 'react-html-parser';

class Input extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      validationMessage: null,
      activeInput: false,
      tooltip: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.value !== this.props.value ||
      nextProps.isVisible != this.props.isVisible ||
      nextState.validationMessage !== this.state.validationMessage ||
      nextProps.options !== this.props.options ||
      this.state.tooltip !== nextState.tooltip ||
      this.props.formSubmitted !== nextProps.formSubmitted
    );
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.value !== this.props.value && this.props.hidden) ||
      (prevProps.value !== this.props.value && this.props.customUI) ||
      (!prevProps.formSubmitted && this.props.formSubmitted)
    ) {
      this.handleInputValidation();
    }
  }

  async handleInputValidation(open) {
    const validationObj = Object.assign({ open: open }, this.props);
    const validationState = await validateInput(validationObj);
    this.setState(validationState);
  }

  handleChange(v) {
    if (!this.props.disabled || !this.props.loading) {
      this.props.onChange(v, this.props.stateName);
    }
  }

  toggleTooltip(active) {
    this.setState({ tooltip: active });
  }

  render() {
    const { autocomplete } = this.props;
    const errorMsgClass =
      this.props.type === 'checkbox' ? 'gc-input__error-msg--checkbox' : '';
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
              type="hidden"
              value={this.props.value}
              name={this.props.name}
            />
            {this.state.validationMessage && (
              <p className={`gc-input__error-msg ${errorMsgClass}`}>
                {ReactHtmlParser(this.state.validationMessage)}
              </p>
            )}
          </div>
        );
      } else {
        return (
          <div
            className={`gc-input gc-input--${this.props.type} ${
              this.props.extendedClassNames
            }`}
          >
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
            >
              <GCInputRenderer
                handleValidation={open => this.handleInputValidation(open)}
                handleChange={v => this.handleChange(v)}
                validationMessage={this.state.validationMessage}
                disabled={this.props.loading || this.props.disabled}
                activeInput={this.state.activeInput}
                {...this.props}
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

            {this.state.validationMessage && (
              <p className={`gc-input__error-msg ${errorMsgClass}`}>
                {ReactHtmlParser(this.state.validationMessage)}
              </p>
            )}
          </div>
        );
      }
    } else if (this.state.validationMessage && this.props.hidden) {
      return (
        <p className={`gc-input__error-msg ${errorMsgClass}`}>
          {ReactHtmlParser(this.state.validationMessage)}
        </p>
      );
    } else {
      return null;
    }
  }
}

Input.propTypes = {
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
  to: PropTypes.object,
  from: PropTypes.object,
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
  customComponent: PropTypes.func
};

Input.defaultProps = {
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
  search: false,
  tooltip: null,
  autocomplete: 'off',
  loading: false,
  hidden: false,
  tooltip: '',
  customUI: false,
  formSubmitted: false,
  customComponent: null
};

export default Input;
