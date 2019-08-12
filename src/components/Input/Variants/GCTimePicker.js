import React, { Component } from 'react';
import TimePicker from 'rc-time-picker';

class GCTimePicker extends Component {

  handleValueChange = () => {
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