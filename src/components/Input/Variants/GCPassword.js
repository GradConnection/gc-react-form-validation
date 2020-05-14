import React, { Component, Fragment } from 'react';

import { GCIcon } from 'ui';

class GCPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'password'
    };
    this.input = React.createRef();
    this.onIconBtnClick = this.onIconBtnClick.bind(this);
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

  render() {
    const { mode } = this.state;
    const {
      value,
      name,
      handleInputValidation,
      handleInputChange
    } = this.props;

    return (
      <div>
        <input
          id={`gc-input-password_${name}`}
          className='gc-input__el'
          type={mode}
          ref={this.input}
          value={value}
          name={name}
          autoComplete="current-password"
          onBlur={e => handleInputValidation(e.target.value)}
          onChange={e => handleInputChange(e.target.value)}
        />

        <div
          tabIndex={-1}
          className="gc-btn--icon"
          onClick={this.onIconBtnClick}
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
