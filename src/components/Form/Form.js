import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import mapValues from 'lodash/mapValues';
import uniqueId from 'lodash/uniqueId';
import has from 'lodash/has';

import ReactHtmlParser from 'react-html-parser';

import Input from '../Input/Input';

let GCFormCounter = 0;
let GCFormErrorObjcen = {};

class Form extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      formSubmitted: false,
      errorMessage: ''
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.formSubmitted) {
      this.setState({ formSubmitted: false });
    }

    if (!prevState.formSubmitted && this.state.formSubmitted) {
      setTimeout(() => {
        if (
          Object.keys(GCFormErrorObjcen).length === 0 &&
          GCFormCounter === Object.keys(this.props.data).length
        ) {
          GCFormErrorObjcen = {};
          this.setState(
            {
              errorMessage: ''
            },
            () => this.props.onSubmit(GCFormErrorObjcen)
          );
        } else {
          this.setState({
            errorMessage:
              'Please make sure that you have filled in the fields correctly'
          });
        }
        GCFormCounter = 0;
      }, 700);
    }

    if (
      prevProps.submissionErrorMessages !== this.props.submissionErrorMessages
    ) {
      this.setState({ errorMessage: this.props.submissionErrorMessages });
    }
  }

  getFields() {
    return mapValues(this.props.data, d => (
      <Input
        {...d}
        autoComplete={d.autoComplete || d.type}
        onChange={this.props.handleInputChange}
        touchedByParent={this.state.formSubmitted}
        sendResultsToForm={(n, r) => this.validateForm(n, r)}
      />
    ));
  }

  getErrorMessages() {
    if (!isEmpty(this.state.errorMessage)) {
      return (
        <div className="gc-form__error-message">
          <p>{ReactHtmlParser(this.state.errorMessage)}</p>
        </div>
      );
    } else if (
      !isEmpty(this.props.submissionErrorMessages) &&
      this.state.displayErrorMessage
    ) {
      if (isArray(this.props.submissionErrorMessages)) {
        const errorList = this.props.submissionErrorMessages.map(err => {
          return <li key={uniqueId()}>{ReactHtmlParser(err)}</li>;
        });
        return <ul className="gc-form__error-message">{errorList}</ul>;
      }
    }
  }

  submitForm(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      formSubmitted: true,
      displayErrorMessage: true
    });
  }

  validateForm(name, results) {
    GCFormCounter = GCFormCounter + 1;
    if (!!results) {
      GCFormErrorObjcen[name] = results;
    } else if (!results && has(GCFormErrorObjcen, name)) {
      delete GCFormErrorObjcen[name];
    }
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
  ])
};

Form.defaultProps = {
  description: '',
  submissionErrorMessages: ''
};

export default Form;
