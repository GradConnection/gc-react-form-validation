import React, { Component } from "react";
import PropTypes from "prop-types";

import $ from "jquery";
import "daterangepicker";
import { GCIcon } from "ui";

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || this.props.placeholder
    };
    this.pickerRef = null;
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOffClick)
    this.pickerRef.daterangepicker({
      singleDatePicker: true
    }, (date) => {
      this.setState({value: date.format('l')})
    })
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleOffClick);
  };



  render() {
    return (
      <div
      ref={picker => {
            this.pickerRef = $(picker);
          }}
          className={`gc-input__el gc-input__el--no-padding`}>
      <div
        role='button'
        className='gc-drop-down__value'>
        <input
          className="gc-drop-down__value__text gc-drop-down__value__text--input"
          type='text'
          value={!this.state.value ? '' : this.state.value}
          placeholder={this.props.placeholder}
          readOnly
          />
        <GCIcon kind='calendarIcon' extendedClassNames='gc-drop-down__caret' />
      </div>
    </div>
    );
  }
}


DatePicker.defaultProps = {
  placeholder: 'Select Date'
}

export { DatePicker };
