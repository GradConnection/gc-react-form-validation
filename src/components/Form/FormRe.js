import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray';
import mapValues from 'lodash/mapValues';
import uniqueId from 'lodash/uniqueId';
import has from 'lodash/has';
import get from 'lodash/get';

import ReactHtmlParser from 'react-html-parser';

import Input from '../Input/Input';

class Form extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      formSubmitted: false,
      errorMessage: '',
      errorObj: {}
    };
  }

  componentDidMount() {
    this.props.disableSubmitButton(this.hasRequiredFields(this.props.data));
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.submissionErrorMessages !== this.props.submissionErrorMessages
    ) {
      this.setState({ errorMessage: this.props.submissionErrorMessages });
    }
  }

  hasRequiredFields(
    data,
    condition = () => {
      return true;
    }
  ) {
    const requiredFields = Object.keys(data).filter(d => {
      return (
        (has(data[d], 'required') &&
          get(data[d], 'required') &&
          has(data[d], 'isVisible') &&
          get(data[d], 'isVisible') &&
          condition(d)) ||
        (has(data[d], 'required') &&
          get(data[d], 'required') &&
          !has(data[d], 'isVisible') &&
          condition(d))
      );
    });
    return requiredFields.length > 0;
  }

  validateRequiredFields(data) {
    return !this.hasRequiredFields(data, d => {
      if (data[d].type === 'checkbox' && data[d].options === undefined) {
        return !data[d].value;
      } else {
        return this.isEmpty(data[d].value);
      }
    });
  }

  allowSubmission(errorObj, data) {
    return (
      Object.keys(errorObj).length === 0 && this.validateRequiredFields(data)
    );
  }

  isEmpty(v) {
    return v === '' || v === [] || v === {} || v === undefined || v === null;
  }

  getFields() {
    const renderTemplate = mapValues(this.props.data, d => {
      return (
        <Input
          {...d}
          autoComplete={d.autoComplete || d.type}
          onChange={this.props.handleInputChange}
          sendResultsToForm={(n, r) => this.validateForm(n, r)}
          inForm={true}
          formSubmitted={this.state.formSubmitted}
        />
      );
    });

    const hiddenInput = {};
    return renderTemplate;
  }

  getErrorMessages() {
    if (!this.state.errorMessage === '') {
      return (
        <div className="gc-form__error-message">
          <p>{ReactHtmlParser(this.state.errorMessage)}</p>
        </div>
      );
    } else if (
      !this.isEmpty(this.props.submissionErrorMessages) &&
      this.state.displayErrorMessage
    ) {
      if (isArray(this.props.submissionErrorMessages)) {
        const errorList = this.props.submissionErrorMessages.map(err => {
          return <li key={uniqueId()}>{ReactHtmlParser(err)}</li>;
        });
        return <ul className="gc-form__error-message">{errorList}</ul>;
      } else {
        return (
          <div className="gc-form__error-message">
            <p>{ReactHtmlParser(this.props.submissionErrorMessages)}</p>
          </div>
        );
      }
    }

    return null;
  }

  submitForm(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.allowSubmission(this.state.errorObj, this.props.data)) {
      this.setState(
        {
          formSubmitted: true,
          displayErrorMessage: true,
          errorMessage: '',
          errorObj: {}
        },
        () => this.props.onSubmit(this.state.errorObj)
      );
    } else {
      this.setState({
        formSubmitted: true,
        displayErrorMessage: true,
        errorMessage:
          'Please make sure that you have filled in the fields correctly'
      }, () => {
        if(this.props.onFormValidationFailure) {
          this.props.onSubmit(this.state.errorObj)
        }
      });
    }
  }

  validateForm(name, results) {
    const copiedObj = this.state.errorObj;
    if (!!results) {
      copiedObj[name] = results;
    } else if (!results && has(copiedObj, name)) {
      delete copiedObj[name];
    }
    this.setState({ errorObj: copiedObj }, () => {
      this.props.disableSubmitButton(
        !this.allowSubmission(this.state.errorObj, this.props.data)
      );
      this.props.handleFormErrors(this.state.errorObj);
    });
  }

  render() {
    return (
      <form
        ref={this.props.formRef}
        id={this.props.formId}
        className={`gc-form ${this.props.extendedClassNames}`}
        onSubmit={e => this.submitForm(e)}
      >
        {this.props.description !== '' && <p>{this.props.description}</p>}
        {this.getErrorMessages()}
        {this.props.children({ fields: this.getFields() })}
      </form>
    );
  }
}

Form.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  formRef: PropTypes.func,
  children: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  description: PropTypes.string,
  submissionErrorMessages: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]),
  disableSubmitButton: PropTypes.func,
  handleFormErrors: PropTypes.func,
  onFormValidationFailure: PropTypes.bool // For troubleshooting
};

Form.defaultProps = {
  description: '',
  submissionErrorMessages: '',
  disableSubmitButton: isDisabled => {
    return isDisabled;
  },
  handleFormErrors: () => {
    return {};
  },
  onFormValidationFailure: false
};

export default Form;
