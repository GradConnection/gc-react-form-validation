import React, { Component } from 'react';
import PropTypes from 'prop-types';

import uniqueId from 'lodash/uniqueId';
import isArray from 'lodash/isArray';
import filter from 'lodash/filter';
import without from 'lodash/without';

import GCInputLabel from './GCInputLabel';
import GCInputSVG from './GCInputSVG';

class GCMultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      searchActive: false,
      searchTxt: '',
      index: -1,
      keyCode: '',
      selection: this.getValue(props.options, this.props.value) || '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const props = this.props
    if (nextProps.value.length !== props.value.length || this.state.searchActive) {
      this.setState({
        selection: this.getValue(props.options, nextProps.value),
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.value !== this.props.value
      || nextState.searchActive !== this.state.searchActive
      || nextState.searchTxt !== this.state.searchTxt
      || this.state.isActive !== nextState.isActive
      || nextProps.dynamicClasses !== this.props.dynamicClasses
      || nextState.index !== this.state.index;
  }

  getOpts(options) {
    if (options.length === 0) {
      return (
        <li
          className='gc-select__drop-down__option gc-select__drop-down__option--no-results'
          key={uniqueId()}>
          <label htmlFor={this.props.name}>
            {this.state.searchActive ? 'There are no matching results' : 'No available options'}
          </label>
        </li>
      );
    }

    return options.map((opt, index) => {
      const hoveredClass = this.state.index === index ? 'gc-select__drop-down__option--hover' : '';
      const disabledClass = opt.disabled ? 'gc-select__drop-down__option--disabled' : '';
      return (
        <li
          className={`gc-select__drop-down__option ${disabledClass} ${hoveredClass}`}
          key={uniqueId()}
          onMouseDown={() => this.addToArray(opt.value, opt.disabled)}>
          <label htmlFor={this.props.name}>
            {opt.label}
          </label>
        </li>
      );
    });
  }

  renderOtherItems(options) {
    let sortedArray = this.sortOptionsArray(options);
    if (this.state.searchActive) {
      return this.getOpts(this.getSearchResults());
    }
    return this.getOpts(this.getInactiveItems(sortedArray));
  }

  renderActiveItems(options) {
    const activeItems = this.getActiveItems(options)
    const sortedArray = this.sortOptionsArray(activeItems);

    return sortedArray.map((opt, index) => {
      const hoveredClass = this.state.index === index ? 'gc-select__drop-down__option--hover' : '';
      const disabledClass = opt.disabled ? 'gc-select__drop-down__option--disabled' : '';
      return (
        <li
          className={`gc-select__drop-down__option gc-select__drop-down__option--active ${hoveredClass}`}
          key={uniqueId()}
          onMouseDown={() => this.deleteFromArray(opt.value)}>
          <label htmlFor={this.props.name}>
            {opt.label}
          </label>
            <div className="gc-select__option--active__cross" onMouseDown={() => this.deleteFromArray(opt.value)}/>
        </li>
      );
    });
  }

  getInactiveItems(options) {
    const optionsDup = options.slice();
    const inactiveOptions = optionsDup.filter( o => {
      return !this.matchToValue(this.props.value, o.value);
    });
    return inactiveOptions;
  }

  getActiveItems(options) {
    const optionsDup = options.slice();
    const activeOptions = optionsDup.filter( o => {
      return this.matchToValue(this.props.value, o.value);
    });
    return activeOptions;
  }

  sortOptionsArray(options) {
    const optionsDup = options.slice();
    optionsDup.sort((a, b) => {
      if (a.label < b.label){
        return -1;
      }
      if (a.label > b.label){
        return 1;
      }
      return 0;
    });
    return optionsDup
  }

  matchToValue(arr, value) {
    return arr.includes(value);
  }

  addToArray(v, disabled) {
    if (!this.matchToValue(this.props.value, v)) {
      let newValueArray = this.props.value.slice();
      newValueArray.push(v);
      this.handleChange(newValueArray, disabled);
    } else {
      this.deleteFromArray(v);
    }
  }

  getSearchResults(searchTxt = this.state.searchTxt) {
    const options = this.getInactiveItems(this.props.options);
    if (searchTxt === '') {
      return options;
    }
    const pattern = new RegExp(searchTxt, 'i');
    const foo = filter(options, o => pattern.test(o.label));
    return foo;
  }

  getValue(arr, value) {
    const valueArray = isArray(value) ? value : value.split(", ");
    let objArray = [];
    valueArray.forEach(i => {
      arr.forEach(o => {
        if(i === o.value) {
          objArray.push(o);
        }
      });
    });
    return objArray;
  }

  handleChange(v, disabled = false) {
    if (!disabled) {
      this.props.onChange(v);
      this.setState({
        isActive: false,
        index: -1,
        searchTxt: '',
      }, () => this.props.validateInput());
    }
  }

  dropDownList(shouldOpen) {
    if (!shouldOpen) {
      setTimeout(() => this.setState(
        {
          isActive: false,
          searchTxt: '',
          searchActive: false,
          index: -1,
        },
        () => this.props.validateInput()), 50);
    } else {
      this.setState({ isActive: true });
    }
  }

  handleSearch(e) {
    if(e.keyCode !== 13 && e.keyCode !== 38 && e.keyCode !== 40){
      const v = e.target.value;
      let state = this.state;
      if (this.state.searchActive) {
        state = { searchTxt: v };
      } else {
        state = {
          searchTxt: v,
          searchActive: true,
          isActive: true,
        };
      }
      this.setState(state);
    }
  }

  handleEnter(e) {
    if(e.keyCode === 13) {
      e.preventDefault();
    }
  }

  handleKeyPress(e) {
    const { searchTxt, selection, index, searchActive } = this.state;
    const { options } = this.props;
    const queryArray = this.getSearchResults(e.target.value);
      e.preventDefault();
    if (e.keyCode === 13) {
      if (index > -1) {
        this.addToArray(queryArray[index].value);
      } else if (selection === '') {
        this.addToArray(selection);
      }
    } else if (e.keyCode === 38 && index > -1) {
      // Press Up arrow key
      this.setState({ index: index - 1 });
    } else if (e.keyCode === 40 && queryArray.length - 1 > index) {
      // Press Down arrow key
      this.setState({ index: index + 1 });
    }
  }

  deleteFromArray(value) {
    const newValueArray = without(this.props.value, value);
    this.handleChange(newValueArray);
  }

  render() {
    const requiredClass = this.props.required ? 'gc-input__label--required' : '';
    const activeClass = this.state.isActive ? '' : 'gc-select--inactive';
    return (
      <div
        className={`gc-select ${this.props.dynamicClasses}`}
        onBlur={() => this.dropDownList(!this.state.isActive)}>

        <div className={`gc-select__label-container ${activeClass}`}
          onMouseDown={() => this.dropDownList(!this.state.isActive)}>
          <label
            className={`gc-input__label gc-select__label ${requiredClass}`}
            htmlFor={this.props.name}>
            {this.props.title}
          </label>

          {this.props.value.length > 0 &&(
            <div className="gc-select__option-count">
              {this.props.value.length}
            </div>
          )}

          {this.state.isActive ? (
            <GCInputSVG
              type="chevronUp"
              onMouseDown={() => this.dropDownList(false)}
              className="gc-select__input-icon gc-multi-select__icon"/>
          ) : (
            <GCInputSVG
              type="chevronDown"
              onMouseDown={() => this.dropDownList(true)}
              className="gc-select__input-icon gc-multi-select__icon"/>
          )}
        </div>

        {this.state.isActive && (
          <ul className="gc-select__drop-down">
            {this.props.search && (
              <li className="gc-select__searchbar">
                <input
                  name={`searchTxt${this.props.name}`}
                  title={`Search ${this.props.name}`}
                  autoFocus={true}
                  placeholder="Start typing to search"
                  value={this.state.searchTxt}
                  onKeyDown={e => this.handleEnter(e)}
                  onKeyUp={e => this.handleKeyPress(e)}
                  onChange={e => this.handleSearch(e)}
                  />
              </li>
            )}
            {this.renderActiveItems(this.props.options)}
            {this.renderOtherItems(this.props.options)}
          </ul>
        )}
      </div>
    );
  }
}

GCMultiSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  dynamicClasses: PropTypes.string.isRequired,
  title: PropTypes.string,
  validateInput: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  multi: PropTypes.bool,
  search: PropTypes.bool,
};

GCMultiSelect.defaultProps = {
  placeholder: '',
  title: '',
  multi: false,
  search: false,
};

export default GCMultiSelect;
