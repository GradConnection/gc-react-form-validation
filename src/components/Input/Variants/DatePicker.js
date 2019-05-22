import React, { Component } from 'react'
import PropTypes from 'prop-types'

import $ from 'jquery';
import 'daterangepicker';
class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.pickerRef = null;
      }

componentDidMount() {
    this.pickerRef.daterangepicker({
      singleDatePicker: true,
    });
  }

  render () {
    return (
        <div
          // role='button'
          ref={picker => {
            this.pickerRef = $(picker);
          }}
          className='gc-input__el gc-drop-down__value'
          >
        {`${this.props.value}`}
      </div>

    )
  }
}

export {DatePicker}

