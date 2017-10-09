import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import mapValues from 'lodash/mapValues';
import uniqueId from 'lodash/uniqueId';

import Input from '../Input/Input';

let GCFormCounter = 0;

class Form extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      formSubmitted: false,
      errorMessage: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.formSubmitted) {
      this.setState({ formSubmitted: false });
    }
  }

  getFields() {
    return mapValues(this.props.data, d =>
      (<Input
        {...d}
        onChange={this.props.handleInputChange}
        touchedByParent={this.state.formSubmitted}
        sendResultsToForm={r => this.validateForm(r)}
      />));
  }

  getErrorMessages() {
    if(!isEmpty(this.state.errorMessage)) {
      return (
        <div className="gc-form__error-message">
          <p>{this.state.errorMessage}</p>
        </div>
      )
    } else if (!isEmpty(this.props.submissionErrorMessages) && this.state.displayErrorMessage) {

      if (isArray(this.props.submissionErrorMessages)) {
        const errorList = this.props.submissionErrorMessages.map( err => {
          return <li key={uniqueId()}>{err}</li>
        });
        return (
          <ul className="gc-form__error-message">
          {errorList}
          </ul>
        );
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

    setTimeout(() => {
      const dataKeys = Object.keys(this.props.data);
      if (GCFormCounter === dataKeys.length) {
        this.props.onSubmit();
        this.setState({
          errorMessage: "",
        });
      } else {
        this.setState({
          errorMessage: "Please make sure that you have filled in the fields correctly",
        });
      }
      GCFormCounter = 0;
    }, 500);
  }

  validateForm(results) {
    if (results) {
      GCFormCounter++;
    }
  }

  render() {
    return (
      <form
        className={`gc-form ${this.props.extendedClassNames}`}
        onSubmit={e => this.submitForm(e)}
      >
        {this.getErrorMessages()}
        {this.props.children({ fields: this.getFields() })}
      </form>
    );
  }
}

Form.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submissionErrorMessages: PropTypes.array,
};

Form.defaultProps = {
  submissionErrorMessages: [],
}

export default Form;
