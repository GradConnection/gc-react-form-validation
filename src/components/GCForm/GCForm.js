import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import mapValues from 'lodash/mapValues';

import GCInput from '../GCInput/GCInput';

// import './gc-form.css';

let GCFormCounter = 0;

class GCForm extends Component {
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
      (<GCInput
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
    }
  }

  submitForm(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ formSubmitted: true });

    setTimeout(() => {
      const dataKeys = Object.keys(this.props.data);
      if (GCFormCounter === dataKeys.length) {
        this.props.onSubmit();
      } else {
        this.setState({
          errorMessage: 'There seems to be trouble'
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
        className="gc-form"
        onSubmit={e => this.submitForm(e)}
      >
        {this.getErrorMessages()}
        {this.props.submissionErrorMessages}
        {this.props.children({ fields: this.getFields() })}
      </form>
    );
  }
}

GCForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submissionErrorMessages: PropTypes.array,
};

GCForm.defaultProps = {
  submissionErrorMessages: [],
}

export default GCForm;
