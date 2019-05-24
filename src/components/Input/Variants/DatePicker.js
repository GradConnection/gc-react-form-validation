import React, { Component } from 'react';
import PropTypes from 'prop-types';

import $ from 'jquery';
import moment from 'moment';
import 'daterangepicker';
import { GCIcon } from 'ui';

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
    const { yearSpan } = this.props;
    const defaultMaxYear = parseInt(moment().add(10, 'years').format('YYYY'))
    
    this.pickerRef.daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      minYear: yearSpan.min || 1930,
      maxYear: yearSpan.max || defaultMaxYear
    }, (date) => {
      this.setState({value: date.format('l')})
    })
  }

  render() {
    const { placeholder } = this.props;
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
          value={this.state.value}
          placeholder={placeholder}
          readOnly
          />
        <GCIcon kind='calendarIcon' extendedClassNames='gc-drop-down__caret' />
      </div>
    </div>
    );
  }
}

DatePicker.propTypes = {
    yearSpan: PropTypes.array
  };

DatePicker.defaultProps = {
  placeholder: 'Select Date'
}

export { DatePicker };
