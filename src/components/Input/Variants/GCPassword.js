import React, { Component, Fragment } from 'react'

import { GCIcon } from 'ui'

class GCPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mode: 'password'
    }
    this.input = React.createRef()
    this.onIconBtnClick = this.onIconBtnClick.bind(this)
  }

  onIconBtnClick () {
    const { mode } = this.state
    const newMode = mode === 'password' ? 'text' : 'password'
    this.setState({ mode: newMode }, () => {
      this.input.current.focus()
    })
  }

  render () {
    const { mode } = this.state
    const { value, name, handleInputValidation, handleInputChange } = this.props

    return (
      <div>
        <input
          className='gc-input__el'
          type={mode}
          ref={this.input}
          value={value}
          name={name}
          onBlur={() => handleInputValidation()}
          onChange={e => handleInputChange(e.target.value)} />

        <button className='gc-btn--icon' onClick={this.onIconBtnClick}>
          {mode === 'password' ? (
            <GCIcon kind='showIcon' />
          ) : (
            <GCIcon kind='hideIcon' />
          )}
        </button>
      </div>
    )
  }
}

export { GCPassword }
