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
      isActive: false,
      value: this.props.value || this.props.placeholder
    };
    this.pickerRef = null;
    
    this.onDropDownClick = this.onDropDownClick.bind(this)
  }

  componentDidMount() {
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

  componentDidUpdate(prevProps) {
    if(!prevProps.value && this.props.value) {
      this.setState({ isActive: false })
    }
  }

  onDropDownClick () {
      this.setState(state => ({ isActive: !state.isActive }))
  }

  render() {
    console.log('this.props', this.props)
    console.log('this.state', this.state)
    const { placeholder, disabled } = this.props;
    const { isActive } = this.state;
    
    return (
      <div
      ref={picker => {
            this.pickerRef = $(picker);
          }}
          className={`gc-input__el gc-input__el--no-padding ${isActive ? 'gc-input__el--active' : ''}`}
          onMouseDown={this.onDropDownClick}>
      <div
        className='gc-drop-down__value'>
        <input
          className='gc-input__el gc-drop-down__value__text gc-drop-down__value__text--input'
          type='text'
          value={this.state.value}
          placeholder={placeholder}
          readOnly
          onFocus={() => this.setState({ isActive: true })}
          onBlur={() => this.setState({ isActive: false })}
          />
        <GCIcon kind='calendarIcon' extendedClassNames='gc-drop-down__caret' />
      </div>
    </div>
    );
  }
}

DatePicker.propTypes = {
  disabled: PropTypes.bool,
  yearSpan: PropTypes.array,
  };

DatePicker.defaultProps = {
  placeholder: 'Select Date',
}

export { DatePicker };
