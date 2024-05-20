import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { isEmpty, isEmptyObject } from 'utils';

import Input from '../Input/Input';
import GCFormErrorMessage from './GCFormErrorMessage';

class Form extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      formSubmitted: false,
      displayErrorMessage: false,
      errorObj: {}
    };

    this.updateErrorObj = this.updateErrorObj.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.submissionErrorMessages !== this.props.submissionErrorMessages
    ) {
      this.setState({ displayErrorMessage: true });
    }

    if (!prevState.formSubmitted && this.state.formSubmitted) {
      this.resetForm();
    }

    if (prevState.formSubmitted && !this.state.formSubmitted) {
      setTimeout(() => {
        if (Object.keys(this.state.errorObj).length === 0) {
          this.onValidationSuccess();
        } else {
          this.onValidationFailure();
          this.onSubmissionFailure(this.state.errorObj);
        }
      }, 500);
    }
  }

  resetForm() {
    this.setState({
      formSubmitted: false
    });
  }

  getFields(data) {
    const { onInputChange, ref } = this.props;
    const { formSubmitted } = this.state;

    // const hiddenInput = {}
    return Object.entries(data).reduce((a, [name, d]) => {
      return {
        [name]: (
          <Input
            autoComplete={d.autoComplete || d.type}
            onChange={onInputChange}
            sendResultsToForm={this.updateErrorObj}
            inForm
            name={name}
            formSubmitted={formSubmitted}
            {...d}
          />
        ),
        ...a
      };
    }, {});
  }

  handleErrorMessageRender() {
    const { errorObj, displayErrorMessage } = this.state;
    const { submissionErrorMessages } = this.props;
    const errorMessage =
      'Please make sure that you have filled in all the fields correctly';

    if (
      displayErrorMessage &&
      !isEmpty(submissionErrorMessages) &&
      isEmptyObject(errorObj)
    ) {
      let submissionError = submissionErrorMessages;
      if (typeof submissionErrorMessages === 'object') {
        Object.keys(submissionErrorMessages).map(function (key, index) {
          console.log('submissionErrorMessages', submissionErrorMessages[key]);
          submissionError = submissionErrorMessages[key];
        });
      }
      return <GCFormErrorMessage error={submissionError} />;
    }

    if (displayErrorMessage && !isEmptyObject(errorObj)) {
      return <GCFormErrorMessage error={errorMessage} />;
    }
    return null;
  }

  onFormSubmission(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      formSubmitted: true,
      displayErrorMessage: false,
      errorObj: {}
    });
  }

  onValidationSuccess() {
    this.setState(
      {
        errorObj: {}
      },
      () => {
        console.log(
          '%c Form has been validated and thinks its okay to submit',
          'background: #bada55; color: #fff'
        );
        this.props.onSubmit();
        if (typeof onFormValidationSuccess === 'function') {
          this.props.onFormValidationSuccess();
        }
      }
    );
  }

  onValidationFailure() {
    this.setState({}, () => {
      console.log(
        '%c Form has been validated and its NOT okay to submit!!',
        'background: #a55; color: #fff'
      );
      if (typeof this.props.onFormValidationFailure === 'function') {
        this.props.onFormValidationFailure(this.state.errorObj);
      }
    });
  }

  onSubmissionFailure() {
    if (typeof this.props.onSubmissionFailure === 'function') {
      this.props.onSubmissionFailure(this.state.errorObj);
    }
  }

  updateErrorObj(name, results) {
    const copiedObj = this.state.errorObj;
    if (results !== this.state.errorObj) {
      if (results) {
        copiedObj[name] = results;
      } else if (!results && copiedObj.hasOwnProperty(name)) {
        delete copiedObj[name];
      }

      this.setState({ errorObj: copiedObj });
    }

    this.handleFormValidationCallbacks(isEmptyObject(copiedObj), copiedObj);
  }

  handleFormValidationCallbacks(isFormValid, errorObj) {
    if (
      isFormValid &&
      typeof this.props.onFormValidationSuccess === 'function'
    ) {
      this.props.onFormValidationSuccess();
    } else if (
      !isFormValid &&
      typeof this.props.onFormValidationFailure === 'function'
    ) {
      this.props.onFormValidationFailure(errorObj);
    }
  }

  render() {
    const { extendedClassNames, formRef, id, description, children, data } =
      this.props;

    const formClasses = classnames('gc-form', {
      [extendedClassNames]: extendedClassNames
    });

    return (
      <form
        ref={formRef}
        id={id}
        className={formClasses}
        onSubmit={e => this.onFormSubmission(e)}
        noValidate
      >
        {description !== '' && <p>{description}</p>}
        {this.handleErrorMessageRender()}
        {children({ fields: this.getFields(data) })}
      </form>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  onSubmissionFailure: PropTypes.func,
  formRef: PropTypes.object,
  description: PropTypes.string,
  submissionErrorMessages: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ])
};

Form.defaultProps = {
  description: '',
  submissionErrorMessages: '',
  handleFormErrors: () => ({})
};

export default Form;
