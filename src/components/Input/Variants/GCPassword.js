import React, { Component, Fragment } from 'react'

class GCPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mode: 'password'
    }
  }

  onIconClick () {
    const { mode } = this.state
    const newMode = mode === 'password' ? 'text' : 'password'
    this.setState({ mode: newMode })
  }

  render () {
    const { mode } = this.state
    const { value, name, handleInputValidation, handleInputChange } = this.props

    return (
      <Fragment>
        <input type={mode}
          value={value}
          name={name}
          onBlur={() => handleInputValidation()}
          onChange={e => handleInputChange(e.target.value)} />
      </Fragment>
    )
  }
}

export { GCPassword }
