import React, { Component, Fragment } from 'react';

import { GCIcon } from 'ui';

class GCPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'password'
    };
    this.input = React.createRef();
    this.passwordToggle = React.createRef();
    this.onIconBtnClick = this.onIconBtnClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  onIconBtnClick(e) {
    e.preventDefault();
    const { mode } = this.state;
    const newMode = mode === 'password' ? 'text' : 'password';
    this.setState({ mode: newMode }, () => {
      if (!this.input.current.isFocussed) {
        this.input.current.focus();
      }
    });
  }
  handleKeyPress(e) {
      if (e.keyCode === 13 && this.passwordToggle.current === document.activeElement) {
        this.onIconBtnClick(e);
      } 
  }

  render() {
    const { mode } = this.state;
    const {
      value,
      name,
      handleInputValidation,
      handleInputChange,
      label,
      autoFocus
    } = this.props;

    return (
      <div>
        <input
          id={name}
          className='gc-input__el'
          type={mode}
          ref={this.input}
          value={value}
          name={name}
          autoComplete="current-password"
          onBlur={e => handleInputValidation(e.target.value)}
          onChange={e => handleInputChange(e.target.value)}
          autoFocus={autoFocus}
        />

        <div
          role="button"
          tabIndex={0}
          className="gc-btn--icon"
          onClick={this.onIconBtnClick}
          ref={this.passwordToggle}
          aria-controls={name}
          aria-expanded={mode !== 'password'}
        >
          {mode === 'password' ? (
            <GCIcon kind="showIcon" />
          ) : (
            <GCIcon kind="hideIcon" />
          )}
        </div>
      </div>
    );
  }
}

export { GCPassword };
