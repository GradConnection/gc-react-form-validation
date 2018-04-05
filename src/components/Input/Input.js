import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GCInputRenderer from './GCInputRenderer';
import GCInputLabel from './GCInputLabel';
import GCTooltip from './GCTooltip';

import validateInput from '../validateInput';

import ReactHtmlParser from 'react-html-parser';
import has from 'lodash/has';

class Input extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      validationMessage: null,
      touchedByParent: props.touchedByParent,
      activeInput: false,
      tooltip: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.touchedByParent &&
      this.props.touchedByParent !== nextProps.touchedByParent
    ) {
      this.setState({ touchedByParent: true }, () => {
        this.validateInput();
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.value !== this.props.value ||
      nextProps.touchedByParent !== this.props.touchedByParent ||
      nextProps.isVisible != this.props.isVisible ||
      nextState.validationMessage !== this.state.validationMessage ||
      nextProps.options !== this.props.options ||
      this.state.tooltip !== nextState.tooltip
    );
  }

  componentDidUpdate() {
    if (
      (!this.props.touchedByParent && this.props.type === 'checkbox') ||
      (!this.props.touchedByParent && this.props.type === 'radio')
    ) {
      this.validateInput();
    }
  }

  validateInput(open) {
    const validationState = validateInput({
      ...this.props,
      open: open,
      touchedByParent: this.state.touchedByParent
    });
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
    const errorMsgClass =
      this.props.type === 'checkbox' ? 'gc-input__error-msg--checkbox' : '';
    if (this.props.isVisible && !this.props.hidden) {
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
              validateInput={open => this.validateInput(open)}
              handleChange={v => this.handleChange(v)}
              validationMessage={this.state.validationMessage}
              disabled={this.props.loading || this.props.disabled}
              autocomplete={this.props.type}
              activeInput={this.state.activeInput}
              {...this.props}
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
    PropTypes.array
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
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  customRegex: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  customErrorMessage: PropTypes.string,
  touchedByParent: PropTypes.bool,
  sendResultsToForm: PropTypes.func,
  options: PropTypes.array,
  required: PropTypes.bool,
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
  tooltip: PropTypes.string
};

Input.defaultProps = {
  extendedClassNames: '',
  value: null,
  defaultValue: null,
  disabled: false,
  name: '',
  placeholder: '',
  to: null,
  from: null,
  max: null,
  min: null,
  customRegex: null,
  customErrorMessage: null,
  touchedByParent: false,
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
  autocomplete: '',
  loading: false,
  hidden: false,
  tooltip: ''
};

export default Input;
