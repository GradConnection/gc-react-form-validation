import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import uniqueId from 'lodash/uniqueId';
import isArray from 'lodash/isArray';
import filter from 'lodash/filter';
import without from 'lodash/without';
import get from 'lodash/get';
import throttle from 'lodash/throttle';

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
      displayListBottom: true,
      selection: this.getValue(props.options, this.props.value) || ''
    };

    this.reworkedOptions = this.generateOptions(this.props.options);
    this.calcDropDownPostion = this.calcDropDownPostion.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClose);
    window.addEventListener('scroll', throttle(this.calcDropDownPostion, 1000));
    this.calcDropDownPostion();
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClose);
    window.addEventListener('scroll', this.calcDropDownPostion);
  }

  componentWillReceiveProps(nextProps) {
    const props = this.props;
    if (
      nextProps.value.length !== props.value.length ||
      this.state.searchActive
    ) {
      this.setState({
        selection: this.getValue(props.options, nextProps.value)
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.options !== this.props.options ||
      nextProps.value !== this.props.value ||
      nextState.searchActive !== this.state.searchActive ||
      nextState.searchTxt !== this.state.searchTxt ||
      this.state.isActive !== nextState.isActive ||
      nextProps.dynamicClasses !== this.props.dynamicClasses ||
      nextState.index !== this.state.index ||
      nextState.displayListBottom !== this.state.displayListBottom
    );
  }

  calcDropDownPostion() {
    const { displayListBottom } = this.state;
    if (this[this.props.name]) {
      this.rect = this[this.props.name].getBoundingClientRect();
      const vh = window.innerHeight;
      const y = this.rect.top;

      if (vh - y < 300 && displayListBottom) {
        this.setState({ displayListBottom: false });
      } else if (vh - y > 300 && !displayListBottom) {
        this.setState({ displayListBottom: true });
      }
    }
  }

  handleClose(e) {
    if (!this.props.accordian) {
      if (this.state.isActive && !this[this.props.name].contains(e.target)) {
        this.setState({
          isActive: false,
          searchActive: false,
          searchTxt: ''
        });
      }
    } else if (
      this[this.props.name].classList.contains('gc-select--open') &&
      !this[this.props.name].contains(e.target)
    ) {
      this[this.props.name].classList.remove('gc-select--open');
      this[this.props.name].classList.add('gc-select--close');
      setTimeout(() => {
        this.setState({
          searchActive: false,
          searchTxt: '',
          isActive: false
        });
      }, 500);
    }
  }

  handleChange(v, disabled = false) {
    if (!disabled) {
      this.props.onChange(v);
      this.setState(
        {
          isActive: false,
          index: -1,
          searchTxt: ''
        },
        () => this.props.handleValidation(true)
      );
    }
  }

  generateOptions(options) {
    if(this.props.defaultAll) {
      return [{
        value: 'gcAll',
        label: this.props.defaultText
      }].concat(options);
    }

    return options;
  }

  getOpts(options) {
    if (options.length === 0) {
      return (
        <li
          className="gc-select__drop-down__option gc-select__drop-down__option--no-results"
          key={uniqueId()}
        >
          <label htmlFor={this.props.name}>
            {this.state.searchActive
              ? 'There are no matching results'
              : 'No available options'}
          </label>
        </li>
      );
    }

    return options.map((opt, index) => {
      const hoveredClass =
        this.state.index === index ? 'gc-select__drop-down__option--hover' : '';
      const disabledClass = opt.disabled
        ? 'gc-select__drop-down__option--disabled'
        : '';
      return (
        <li
          className={`gc-select__drop-down__option ${disabledClass} ${hoveredClass}`}
          key={uniqueId()}
          onMouseDown={() => this.handleAllChange(true, opt.value, opt.disabled)}
        >
          <label htmlFor={this.props.name}>{opt.label}</label>
        </li>
      );
    });
  }

  renderOtherItems(options) {
    let sortedArray = this.sortOptionsArray(options);
    if(this.props.defaultAll) {
      sortedArray = [{
        value: 'gcAll',
        label: this.props.defaultText
      }].concat(sortedArray);
    }
    if (this.state.searchActive) {
      return this.getOpts(this.getSearchResults());
    }
    return this.getOpts(this.getInactiveItems(sortedArray));
  }

  getAllValues() {
    return this.props.options.map( o => o.value );
  }

  handleAllChange(add, value, disabled) {
    if(this.props.defaultAll) {
      if(add && value === 'gcAll') {
        this.handleChange(this.getAllValues())
      } else if(!add && value === 'gcAll'){
        this.removeAll();
      } else if(value !== 'gcAll' && this.props.value.length === this.props.options.length) {
        this.handleChange([value]);
      } else {
        add ? this.addToArray(value, disabled) : this.deleteFromArray(value);
      }
    } else {
      add ? this.addToArray(value, disabled) : this.deleteFromArray(value);
    }
  }

  renderActiveItems(options) {
    const activeItems = this.getActiveItems(options);
    const sortedArray = this.sortOptionsArray(activeItems);

    return sortedArray.map((opt, index) => {
      const hoveredClass =
        this.state.index === index ? 'gc-select__drop-down__option--hover' : '';
      const disabledClass = opt.disabled
        ? 'gc-select__drop-down__option--disabled'
        : '';
      return (
        <li
          className={`gc-select__drop-down__option gc-select__drop-down__option--active ${hoveredClass}`}
          key={uniqueId()}
          onMouseDown={() => this.handleAllChange(false, opt.value)}
        >
          <label htmlFor={this.props.name}>{opt.label}</label>
          <div
            className="gc-select__option--active__cross"
            onMouseDown={() => this.handleAllChange(false,opt.value)}
          />
        </li>
      );
    });
  }

  getInactiveItems(options) {
    if(this.props.defaultAll && this.props.value.length === this.props.options.length) {
      return this.props.options;
    } else {
      const optionsDup = options.slice();
      const inactiveOptions = optionsDup.filter(o => {
        return !this.matchToValue(this.props.value, o.value);
      });
      return inactiveOptions;
    }
  }

  getActiveItems(options) {
    if(this.props.defaultAll && this.props.value.length === this.props.options.length) {
      return [{
        value: 'gcAll',
        label: this.props.defaultText
      }];
    } else {
      const optionsDup = options.slice();
      const activeOptions = optionsDup.filter(o => {
        return this.matchToValue(this.props.value, o.value);
      });
      return activeOptions;
    }
  }

  sortOptionsArray(options) {
    const optionsDup = options.slice();
    optionsDup.sort((a, b) => {
      if (a.label < b.label) {
        return -1;
      }
      if (a.label > b.label) {
        return 1;
      }
      return 0;
    });
    return optionsDup;
  }

  matchToValue(arr, value) {
    return arr.includes(value);
  }

  addToArray(v, disabled) {
    if (!this.matchToValue(this.props.value, v)) {
      let newValueArray = [];
      if (this.props.value.length > 0) {
        newValueArray = this.props.value.slice();
      }
      newValueArray.push(v);
      this.handleChange(newValueArray, disabled);
    } else {
      this.deleteFromArray(v);
    }
  }

  getSearchResults(searchTxt = this.state.searchTxt) {
    const options = this.getInactiveItems(this.reworkedOptions);
    if (searchTxt === '') {
      return options;
    }
    const pattern = new RegExp(searchTxt, 'i');
    const foo = filter(options, o => pattern.test(o.label));
    return foo;
  }

  getValue(arr, value) {
    const valueArray = isArray(value) ? value : value.split(', ');
    let objArray = [];
    valueArray.forEach(i => {
      arr.forEach(o => {
        if (i === o.value) {
          objArray.push(o);
        }
      });
    });
    return objArray;
  }

  dropDownList(shouldOpen, e, must = false) {
    e.preventDefault();
    if (this.props.disabled && shouldOpen) return;
    if (this.props.accordian) {
      if (
        (shouldOpen && must) ||
        (this[this.props.name].classList.contains('gc-select--close') && !must)
      ) {
        this[this.props.name].classList.add('gc-select--open');
        this[this.props.name].classList.remove('gc-select--close');
      } else if (
        (!shouldOpen && must) ||
        (this[this.props.name].classList.contains('gc-select--open') && !must)
      ) {
        this[this.props.name].classList.remove('gc-select--open');
        this[this.props.name].classList.add('gc-select--close');
        setTimeout(() => {
          this.setState({
            searchActive: false,
            searchTxt: ''
          });
        }, 500);

        this.props.handleValidation(true);
      }
    } else {
      if (!shouldOpen) {
        setTimeout(
          () =>
            this.setState(
              {
                isActive: false,
                searchTxt: '',
                searchActive: false,
                index: -1
              },
              () => this.props.handleValidation(true)
            ),
          50
        );
      } else {
        this.setState({ isActive: true });
      }
    }
  }

  handleSearch(e) {
    if (e.keyCode !== 13 && e.keyCode !== 38 && e.keyCode !== 40) {
      const v = e.target.value;
      let state = this.state;
      if (this.state.searchActive) {
        state = { searchTxt: v };
      } else {
        state = {
          searchTxt: v,
          searchActive: true,
          isActive: true
        };
      }
      this.setState(state);
    }
  }

  handleEnter(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }

  handleKeyPress(e) {
    const { searchTxt, selection, index, searchActive } = this.state;
    const queryArray = this.getSearchResults(e.target.value);
    e.preventDefault();
    if (e.keyCode === 13) {
      if (index > -1) {
        this.handleAllChange(true, queryArray[index].value);
      } else if (selection === '') {
        this.handleAllChange(true, selection);
      }
    } else if (e.keyCode === 38 && index > -1) {
      // Press Up arrow key
      this.setState({ index: index - 1 });
    } else if (e.keyCode === 40 && queryArray.length - 1 > index) {
      // Press Down arrow key
      this.setState({ index: index + 1 });
    }
  }

  removeAll() {
    this.handleChange([]);
  }

  deleteFromArray(value) {
    const newValueArray = without(this.props.value, value);
    this.handleChange(newValueArray);
  }

  render() {
    const requiredClass = this.props.required
      ? 'gc-input__label--required'
      : '';
    const activeClass = this.state.isActive ? '' : 'gc-select--inactive';
    let accordianClass = '';
    if (this.props.accordian) {
      accordianClass = this.props.activeInput
        ? 'gc-select--accordian gc-select--open'
        : 'gc-select--accordian gc-select--close';
    }
  
    return (
      <div
        className={`gc-select ${this.props.dynamicClasses} ${accordianClass}`}
        ref={select => {
          this[this.props.name] = select;
        }}
        key={`gc-selectList${this.props.name}`}
      >
        <div
          className={`gc-select__label-container ${activeClass}`}
          onMouseDown={e => this.dropDownList(!this.state.isActive, e)}
        >
          <label
            className={`gc-input__label gc-select__label ${requiredClass}`}
            htmlFor={this.props.name}
          >
            {this.props.title}
          </label>

          {this.props.value.length > 0 && (
            <div className="gc-select__option-count">
              <span className="gc-select__option-count--text">
                {this.props.value.length}
              </span>
              <div
                className="gc-select__cross"
                onMouseDown={() => this.removeAll()}
              />
            </div>
          )}

          {this.props.loading ? (
            this.props.spinner
          ) : (
            <Fragment>
              {this.state.isActive ? (
                <GCInputSVG
                  type="chevronUp"
                  onMouseDown={e => this.dropDownList(false, e, true)}
                  className="gc-select__input-icon gc-multi-select__icon"
                />
              ) : (
                <GCInputSVG
                  type="chevronDown"
                  onMouseDown={e => this.dropDownList(true, e, true)}
                  className="gc-select__input-icon gc-multi-select__icon"
                />
              )}
            </Fragment>
          )}
        </div>

        {!this.props.loading && (
          <Fragment>
            {this.props.accordian && (
              <ul
                className={`gc-select__drop-down
                      ${
                        this.state.displayListBottom
                          ? ''
                          : 'gc-select__drop-down--top'
                      } ${this.props.accordian ? 'gc-select--accordian' : ''}`}
              >
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
                {this.renderActiveItems(this.reworkedOptions)}
                {this.renderOtherItems(this.props.options)}
              </ul>
            )}

            {this.state.isActive &&
              !this.props.accordian && (
                <ul
                  className={`gc-select__drop-down ${
                    this.state.displayListBottom
                      ? ''
                      : 'gc-select__drop-down--top'
                  } ${this.props.accordian ? 'gc-select--accordian' : ''}`}
                >
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
                  {this.renderActiveItems(this.reworkedOptions)}
                  {this.renderOtherItems(this.props.options)}
                </ul>
              )}
          </Fragment>
        )}
      </div>
    );
  }
}

GCMultiSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  dynamicClasses: PropTypes.string.isRequired,
  title: PropTypes.string,
  handleValidation: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  multi: PropTypes.bool,
  search: PropTypes.bool,
  accordian: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  spinner: PropTypes.node
};

GCMultiSelect.defaultProps = {
  placeholder: '',
  title: '',
  multi: false,
  search: true,
  accordian: false,
  loading: false,
  spinner: <div className="gc-form__spinner" />
};

export default GCMultiSelect;
