import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import validateInput from './validateInput';

import GCLabel from './GCLabel';
import GCDescription from './GCDescription';
import GCMappedInput from './GCMappedInput';
import { GCTooltip } from './GCTooltip';
import GCErrorMessage from './GCErrorMessage';
import GCHelperText from './GCHelperText';
import { GCIcon } from 'ui';

class Input extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      validationMessage: null,
      showTooltip: false,
      showValidationMessage: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputValidation = this.handleInputValidation.bind(this);
    this.onTooltipIconClick = this.onTooltipIconClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.validationMessage !== this.state.validationMessage ||
      nextState.showTooltip !== this.state.showTooltip ||
      nextProps.value !== this.props.value ||
      nextProps.hidden !== this.props.hidden ||
      nextProps.options !== this.props.options ||
      nextProps.label !== this.props.label ||
      nextProps.description !== this.props.description ||
      nextProps.helperText !== this.props.helperText ||
      nextProps.formSubmitted !== this.props.formSubmitted ||
      nextProps.disabled !== this.props.disabled ||
      nextProps.defaultValue !== this.props.defaultValue ||
      nextProps.lastUpdateStamp !== this.props.lastUpdateStamp
    );
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.value !== this.props.value && this.props.hidden) ||
      (prevProps.value !== this.props.value && this.props.customUI) ||
      (prevProps.value !== this.props.value && this.props.type === 'radio') ||
      (!prevProps.formSubmitted && this.props.formSubmitted) ||
      prevProps.required !== this.props.required ||
      prevProps.lastUpdateStamp !== this.props.lastUpdateStamp
    ) {
      this.handleInputValidation(this.props.value);
    }
  }

  async handleInputValidation(value, cb = () => {}) {
    const { onInputValidationFailure, onInputValidationSuccess } = this.props;
    const validationResponse = await validateInput({
      ...this.props,
      value
    });
    const isValid = !validationResponse.validationMessage;
    this.setState(
      {
        ...validationResponse,
        showValidationMessage: !isValid
      },
      () => {
        if (isValid) {
          onInputValidationSuccess();
          cb();
        } else {
          onInputValidationFailure(validationResponse);
        }
      }
    );
  }

  handleInputChange(v) {
    if (!this.props.disabled || !this.props.loading) {
      this.props.onChange(v, this.props.stateName || this.props.name);
    }
  }

  onTooltipIconClick(e) {
    e.preventDefault();
    this.toggleTooltip(!this.state.showTooltip);
  }

  toggleTooltip(active) {
    this.setState({ showTooltip: active });
  }

  getValue() {
    if (
      this.props.defaultAll &&
      this.props.multi &&
      this.props.type === 'select'
    ) {
      if (
        (Array.isArray(this.props.value) && this.props.value.length === 0) ||
        this.props.value === ''
      ) {
        return this.props.options.map(o => o.value);
      }
    }

    return this.props.value;
  }

  onInputClick(e, disabled) {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  render() {
    const {
      type,
      extendedClassNames,
      customComponent,
      description,
      disabled,
      hidden,
      required,
      helperText,
      tooltip,
      title,
      customUI = false,
      label = title,
      name,
      options,
      isFilter,
      isFrontPageFilter
    } = this.props;
    const { validationMessage, showValidationMessage, showTooltip } =
      this.state;
    const inputClasses = classnames(`gc-input--${type}`, {
      'gc-input': !(isFilter || isFrontPageFilter),
      'gc-filter': isFilter && !isFrontPageFilter,
      'gc-front-page-filter': isFrontPageFilter,
      'gc-input--invalid': showValidationMessage,
      'gc-input--disabled': disabled,
      [extendedClassNames]: extendedClassNames
    });

    const displayLabel =
      (!isFilter || isFrontPageFilter) &&
      ((label && type !== 'checkbox') ||
        (label && type === 'checkbox' && options.length > 0));

    if (!hidden || !customUI) {
      if (!customComponent()) {
        return (
          <div
            className={inputClasses}
            onClick={e => this.onInputClick(e, disabled)}
          >
            {displayLabel && (
              <GCLabel label={label} htmlFor={name} required={required} />
            )}

            {description && <GCDescription text={description} />}
            {tooltip && !isFilter && (
              <span
                className="gc-btn--icon gc-tooltip__icon"
                onClick={this.onTooltipIconClick}
                tabIndex={0}
                role="button"
                onKeyPress={e =>
                  e.key === 'Enter' && this.onTooltipIconClick(e)
                }
              >
                <GCIcon kind="infoIcon" />
              </span>
            )}

            <GCMappedInput
              handleInputValidation={this.handleInputValidation}
              handleInputChange={this.handleInputChange}
              {...this.props}
            />

            {showValidationMessage && (
              <GCErrorMessage text={validationMessage} />
            )}

            {helperText && <GCHelperText text={helperText} />}

            {showTooltip && (
              <GCTooltip
                content={this.props.tooltip}
                name={this.props.name}
                active={this.state.showTooltip}
                toggleTooltip={active => this.toggleTooltip(active)}
              />
            )}
          </div>
        );
      }
      return (
        <div
          className={inputClasses}
          onMouseDown={e => this.onInputClick(e, disabled)}
        >
          {displayLabel && (
            <GCLabel label={label} htmlFor={name} required={required} />
          )}

          {customComponent({
            ...this.props,
            isValid: !showValidationMessage,
            handleInputValidation: this.handleInputValidation,
            handleInputChange: this.handleInputChange
          })}

          {showValidationMessage && <GCErrorMessage text={validationMessage} />}

          {helperText && <GCHelperText text={helperText} />}
          {showTooltip && (
            <GCTooltip
              content={this.props.tooltip}
              name={this.props.name}
              active={this.state.showTooltip}
              toggleTooltip={active => this.toggleTooltip(active)}
            />
          )}
        </div>
      );
    }
    return null;
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
  selection_type: PropTypes.string,
  custom_time_zone: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  customRegex: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  customErrorMessage: PropTypes.string,
  options: PropTypes.array,
  required: PropTypes.bool,
  inForm: PropTypes.bool,
  title: PropTypes.string,
  data: PropTypes.object,
  formTemplate: PropTypes.func,
  multi: PropTypes.bool,
  search: PropTypes.bool,
  onSearchInputFunction: PropTypes.func,
  tooltip: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  loading: PropTypes.bool,
  hidden: PropTypes.bool,
  formSubmitted: PropTypes.bool,
  customComponent: PropTypes.func,
  defaultAll: PropTypes.bool,
  defaultText: PropTypes.string,
  onInputValidationSuccess: PropTypes.func,
  onInputValidationFailure: PropTypes.func,
  lastUpdateStamp: PropTypes.number,
  isFilter: PropTypes.bool,
  isFrontPageFilter: PropTypes.bool
};

Input.defaultProps = {
  description: '',
  extendedClassNames: '',
  value: '',
  defaultValue: null,
  disabled: false,
  name: '',
  to: null,
  from: null,
  max: null,
  min: null,
  selection_type: 'both',
  custom_time_zone: 'Australia/Sydney',
  customRegex: null,
  inForm: false,
  customErrorMessage: null,
  options: [],
  required: false,
  title: null,
  data: null,
  multi: false,
  search: true,
  onSearchInputFunction: null,
  tooltip: null,
  loading: false,
  hidden: false,
  formSubmitted: false,
  customComponent: () => false,
  defaultText: 'All Options',
  defaultAll: false,
  onInputValidationSuccess: () => ({}),
  onInputValidationFailure: () => ({})
};

export default Input;
