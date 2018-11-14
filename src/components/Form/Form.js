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
  }

  // componentDidMount () {
  //   this.props.disableSubmitButton(this.hasRequiredFields(this.props.data))
  // }

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

    const hiddenInput = {}
    return Object.entries(data)
    .reduce((a, [name, d]) => {
      return Object.assign({ [name]: (
        <Input
          autoComplete={d.autoComplete || d.type}
          onChange={onInputChange}
          sendResultsToForm={(n, r) => this.validateFormOnInput(n, r)}
          inForm
          name={name}
          formSubmitted={formSubmitted}
          {...d}
          />
      )}, a)
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

    if (this.validateForm(this.state.errorObj, this.props.data)) {
      this.setState(
        {
          formSubmitted: true,
          displayErrorMessage: true,
          errorMessage: '',
          errorObj: {}
        },
        () => this.props.onSubmit(this.state.errorObj)
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
          if (this.props.onFormValidationFailure) {
            this.props.onSubmit(this.state.errorObj)
          }
        }
      )
    }
  }

  validateFormOnInput (name, results) {
    const copiedObj = this.state.errorObj
    if (results) {
      copiedObj[name] = results
    } else if (!results && has(copiedObj, name)) {
      delete copiedObj[name]
    }

    this.setState({ errorObj: copiedObj }, () => {
      this.validateForm(this.state.errorObj, this.props.data) ?
        this.props.onFormValidationSuccess() :
        this.props.onFormValidationFailure(this.state.errorObj)
    })
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
  ]),
  onFormValidationSuccess: PropTypes.func,
  onFormValidationFailure: PropTypes.func
}

Form.defaultProps = {
  description: '',
  submissionErrorMessages: '',
  handleFormErrors: () => ({}),
  onFormValidationSuccess: () => ({}),
  onFormValidationFailure: () => ({})
}

export default Form
