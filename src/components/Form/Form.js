import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import isArray from 'lodash/isArray'
import uniqueId from 'lodash/uniqueId'
import has from 'lodash/has'
import get from 'lodash/get'

import ReactHtmlParser from 'react-html-parser'

import { isEmpty } from '../../utils'

import Input from '../Input/Input'

class Form extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      formSubmitted: false,
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
  }

  hasRequiredFields (
    data,
    condition = () => {
      return true
    }
  ) {
    const requiredFields = Object.keys(data).filter(d => {
      return (
        (has(data[d], 'required') &&
          get(data[d], 'required') &&
          has(data[d], 'hidden') &&
          get(data[d], 'hidden') &&
          condition(d)) ||
        (has(data[d], 'required') &&
          get(data[d], 'required') &&
          !has(data[d], 'hidden') &&
          condition(d))
      )
    })
    return requiredFields.length > 0
  }

  validateRequiredFields (data) {
    return !this.hasRequiredFields(data, d => {
      if (data[d].type === 'checkbox' && data[d].options === undefined) {
        return !data[d].value
      } else {
        return isEmpty(data[d].value)
      }
    })
  }

  validateForm (errorObj, data) {
    return (
      Object.keys(errorObj).length === 0 && this.validateRequiredFields(data)
    )
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

  getErrorMessages () {
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

  handleFormSubmission (e) {
    e.preventDefault()
    e.stopPropagation()
    console.log('%c Form has been validated and thinks its okay to submit', 'background: #bada55; color: #fff')
    if (this.validateForm(this.state.errorObj, this.props.data)) {
      this.setState(
        {
          formSubmitted: true,
          displayErrorMessage: true,
          errorMessage: '',
          errorObj: {}
        },
        () => {
          this.props.onSubmit()
          if (typeof onFormValidationSuccess === 'function') {
            this.props.onFormValidationSuccess()
          }
        }
      )
    } else {
      this.setState(
        {
          formSubmitted: true,
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
  }

  updateErrorObj (name, results) {
    const copiedObj = this.state.errorObj
    if (results !== this.state.errorObj) {
      if (results) {
        copiedObj[name] = results
      } else if (!results && has(copiedObj, name)) {
        delete copiedObj[name]
      }

      // only update if different?
      this.setState({ errorObj: copiedObj })
    }

    this.handleFormValidationCallbacks(this.validateForm(this.state.errorObj, this.props.data), copiedObj)
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
        onSubmit={e => this.handleFormSubmission(e)}
        noValidate
      >
        {description !== '' && <p>{description}</p>}
        {this.getErrorMessages()}
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
