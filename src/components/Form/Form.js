import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import isArray from 'lodash/isArray'
import uniqueId from 'lodash/uniqueId'
import has from 'lodash/has'
import get from 'lodash/get'

import ReactHtmlParser from 'react-html-parser'

import { isEmpty, isEmptyObject } from 'utils'

import Input from '../Input/Input'

class Form extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      formSubmitted: false,
      displayErrorMessage: false,
      errorMessage: '',
      errorObj: {}
    }

    this.updateErrorObj = this.updateErrorObj.bind(this)
  }

  componentDidUpdate (prevProps, prevState) {
    if (
      prevProps.submissionErrorMessages !== this.props.submissionErrorMessages
    ) {
      this.setState({ errorMessage: this.props.submissionErrorMessages })
    }

    if (!prevState.formSubmitted && this.state.formSubmitted) {
      console.log('form submitted, inputs are all validating, reset')
      // reset form submission state
      this.resetForm()
    }

    if (prevState.formSubmitted && !this.state.formSubmitted) {
      setTimeout(() => {
        if(Object.keys(this.state.errorObj).length === 0) {
          this.onValidationSuccess()
        } else {
          this.onValidationFailure()
        }
      }, 500)
    }
  }

  resetForm() {
    this.setState({
      formSubmitted: false
    })
  }

  getFields (data) {
    const { onInputChange } = this.props
    const { formSubmitted } = this.state

    // const hiddenInput = {}
    return Object.entries(data)
      .reduce((a, [name, d]) => {
        return Object.assign({ [name]: (
          <Input
            autoComplete={d.autoComplete || d.type}
            onChange={onInputChange}
            sendResultsToForm={this.updateErrorObj}
            inForm
            name={name}
            formSubmitted={formSubmitted}
            {...d}
          />
        ) }, a)
      }, {})
  }

  handleErrorMessage () {
    console.log('handling error messages')
    if (!this.state.errorMessage === '') {
      return (
        <div className='gc-form__error-message'>
          <p>{ReactHtmlParser(this.state.errorMessage)}</p>
        </div>
      )
    } else if (
      !isEmpty(this.props.submissionErrorMessages) &&
      this.state.displayErrorMessage
    ) {
      if (isArray(this.props.submissionErrorMessages)) {
        const errorList = this.props.submissionErrorMessages.map(err => {
          return <li key={uniqueId()}>{ReactHtmlParser(err)}</li>
        })
        return <ul className='gc-form__error-message'>{errorList}</ul>
      } else {
        return (
          <div className='gc-form__error-message'>
            <p>{ReactHtmlParser(this.props.submissionErrorMessages)}</p>
          </div>
        )
      }
    }

    return null
  }

  onFormSubmission (e) {
    e.preventDefault()
    e.stopPropagation()

    this.setState(
      {
        formSubmitted: true,
        displayErrorMessage: true,
        errorMessage: '',
        errorObj: {}
      })
  }

  onValidationSuccess() {
    this.setState(
          {
            displayErrorMessage: false,
            errorObj: {}
          },
          () => {
            console.log('%c Form has been validated and thinks its okay to submit', 'background: #bada55; color: #fff')
            this.props.onSubmit()
            if (typeof onFormValidationSuccess === 'function') {
              this.props.onFormValidationSuccess()
            }
          }
        )
  }

  onValidationFailure() {
    this.setState(
          {
            displayErrorMessage: true,
            errorMessage:
              'Please make sure that you have filled in the fields correctly'
          },
          () => {
            if (typeof this.props.onFormValidationFailure === 'function') {
              this.props.onFormValidationFailure(this.state.errorObj)
            }
          }
        )
  }

  updateErrorObj (name, results) {
    const copiedObj = this.state.errorObj
    if (results !== this.state.errorObj) {
      if (results) {
        copiedObj[name] = results
      } else if (!results && has(copiedObj, name)) {
        delete copiedObj[name]
      }

      this.setState({ errorObj: copiedObj })
    }

    this.handleFormValidationCallbacks(isEmptyObject(copiedObj), copiedObj)
  }



  handleFormValidationCallbacks (isFormValid, errorObj) {
    if (isFormValid && typeof this.props.onFormValidationSuccess === 'function') {
      this.props.onFormValidationSuccess()
    } else if (!isFormValid && typeof this.props.onFormValidationFailure === 'function') {
      this.props.onFormValidationFailure(errorObj)
    }
  }

  render () {
    const { extendedClassNames, ref, id, description, children, data } = this.props
    const formClasses = classnames('gc-form', {
      [extendedClassNames]: extendedClassNames
    })

    return (
      <form
        ref={ref}
        id={id}
        className={formClasses}
        onSubmit={e => this.onFormSubmission(e)}
        noValidate
      >
        {description !== '' && <p>{description}</p>}
        {this.handleErrorMessage()}
        {children({ fields: this.getFields(data) })}
      </form>
    )
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  customFormErrorMessage: PropTypes.node,

  ref: PropTypes.func,
  description: PropTypes.string,
  submissionErrorMessages: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ])
}

Form.defaultProps = {
  description: '',
  submissionErrorMessages: '',
  handleFormErrors: () => ({})
}

export default Form
