'use strict';

import React, { Component } from 'react';

export default class GCTooltip extends Component {
  constructor(props, context) {
    super(props, context);

    this.removeMessage = this.removeMessage.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.removeMessage);
  }

  componentDidMount() {
    window.addEventListener('click', this.removeMessage);
  }

  toggleMessage() {
    this.props.toggleTooltip(!this.props.active);
  }

  removeMessage(e) {
    // console.log(e);
    // if (this.props.active && !this[this.props.name].contains(e.target)) {
    //   this.props.toggleTooltip(false);
    // }
  }

  render() {
    return (
      <div
        className="gctooltip"
        onClick={e => this.toggleMessage(e)}
        ref={tooltip => {
          this[this.props.name] = tooltip;
        }}
      >
        <p className="gctooltip__message">{this.props.content}</p>
      </div>
    );
  }
}
