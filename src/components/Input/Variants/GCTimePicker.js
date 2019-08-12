import React, { Component } from 'react';
import TimePicker from 'rc-time-picker';

class GCTimePicker extends Component {
  constructor(props) {
    super(props);

    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange() {
    console.log('handleValueChange');
  }

  render() {
    <div className="gc-input__el" >
      <TimePicker
        onChange={this.handleValueChange}
      />
    </div>
  }
};

export { GCTimePicker };