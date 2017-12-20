'use strict';

import React, { Component } from 'react';
import { GCIcon } from './GCIcons';

export default class GCTooltip extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isActive: false
    };

    this.removeMessage = this.removeMessage.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.removeMessage);
  }

  componentDidMount() {
    window.addEventListener('click', this.removeMessage);
  }

  render() {
    var iconClasses = this.state.isActive && 'gctooltip__icon--active';

    return (
      <div className="gctooltip">
        <span onClick={e => this.toggleMessage(e)}>
          <GCIcon
            extendedClass={`gctooltip__icon ${iconClasses}`}
            kind="infoIcon"
            size="14px"
            mainFill="#cdcdcd"
            iconTitle="Information Icon"
          />
        </span>

        {this.state.isActive && (
          <div className="gctooltip__message-container">
            <p className="gctooltip__message">{this.props.content}</p>
          </div>
        )}
      </div>
    );
  }

  toggleMessage(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ isActive: !this.state.isActive });
  }

  removeMessage() {
    this.setState({ isActive: false });
  }
}
