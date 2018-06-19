import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import uniqueId from 'lodash/uniqueId';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import without from 'lodash/without';
import find from 'lodash/find';
import throttle from 'lodash/throttle';

import GCInputLabel from './GCInputLabel';
import GCInputSVG from './GCInputSVG';

class GCSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      searchActive: false,
      displayListBottom: true,
      index: -1,
      searchTxt: '',
      selection: this.getValue(props.options, this.props.value) || ''
    };
    this.handleClose = this.handleClose.bind(this);
    this.calcDropDownPostion = this.calcDropDownPostion.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClose);
    window.addEventListener('scroll', throttle(this.calcDropDownPostion, 1000));
    this.calcDropDownPostion();
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClose);
    window.removeEventListener('scroll', this.calcDropDownPostion);
  }

  componentWillReceiveProps(nextProps) {
    const props = this.props;
    if (nextProps.value !== props.value || this.state.searchActive) {
      this.setState({
        selection: this.getValue(props.options, nextProps.value),
        searchActive: false
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.value !== this.props.value ||
      nextState.searchActive ||
      this.state.isActive !== nextState.isActive ||
      nextProps.dynamicClasses !== this.props.dynamicClasses ||
      nextState.index !== this.state.index
    );
  }

  calcDropDownPostion() {
    const { displayListBottom } = this.state;
    this.rect = this[this.props.name].getBoundingClientRect();
    const vh = window.innerHeight;
    const y = this.rect.top;

    if (vh - y < 500 && displayListBottom) {
      console.log('list appear top');
      this.setState({ displayListBottom: false });
    } else if (vh - y > 500 && !displayListBottom) {
      console.log('list appear bottom');
      this.setState({ displayListBottom: true });
    }
  }

  handleClose(e) {
    if (!this.props.accordian) {
      if (this.state.isActive && !this[this.props.name].contains(e.target)) {
        this.setState({
          isActive: false,
          searchActive: false
        });
      }
    } else if (
      this[this.props.name].classList.contains('gc-select--open') &&
      !this[this.props.name].contains(e.target)
    ) {
      this[this.props.name].classList.remove('gc-select--open');
      this[this.props.name].classList.add('gc-select--close');
    }
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
    const inactiveItems = isEmpty(this.props.value)
      ? options
      : without(
          options,
          find(options, o => {
            return o.value === this.props.value;
          })
        );
    return inactiveItems.map((opt, index) => {
      const hoveredClass =
        this.state.index === index ? 'gc-select__drop-down__option--hover' : '';
      const disabledClass = opt.disabled
        ? 'gc-select__drop-down__option--disabled'
        : '';
      return (
        <li
          className={`gc-select__drop-down__option ${disabledClass} ${hoveredClass}`}
          key={uniqueId()}
          onMouseDown={() => this.handleChange(opt.value, opt.disabled)}
        >
          <label htmlFor={this.props.name}>{opt.label}</label>
        </li>
      );
    });
  }

  renderActiveItem() {
    const ActiveItem = find(this.props.options, o => {
      return o.value === this.props.value;
    });

    return (
      <li
        className={`gc-select__drop-down__option gc-select__drop-down__option--active`}
        key={uniqueId()}
        onMouseDown={() => this.handleChange('', this.props.required)}
      >
        <label htmlFor={this.props.name}>{ActiveItem.label}</label>
        {!this.props.required && (
          <div className="gc-select__option--active__cross" />
        )}
      </li>
    );
  }

  matchToValue(arr, value) {
    return arr === value;
  }

  getSearchResults(options, searchTxt) {
    if (searchTxt === '') {
      return options;
    }
    const pattern = new RegExp(searchTxt, 'i');
    return filter(options, o => pattern.test(o.label));
  }

  getValue(arr, value) {
    const valArray = arr.filter(i => i.value === value);
    return isEmpty(valArray) ? undefined : valArray[0].label;
  }

  handleChange(v, disabled = false) {
    if (!disabled) {
      if (this.props.accordian) {
        this[this.props.name].classList.remove('gc-select--open');
        this[this.props.name].classList.add('gc-select--close');
        this.props.onChange(v);
        setTimeout(() => {
          this.props.handleValidation();
        }, 50);
      } else {
        this.props.onChange(v);
        this.setState(
          {
            isActive: false,
            index: -1
          },
          () => this.props.handleValidation()
        );
      }
    }
  }

  dropDownList(shouldOpen, e, must = false) {
    e.preventDefault();
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
        this.props.handleValidation();
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
              () => this.props.handleValidation()
            ),
          50
        );
      } else {
        this.setState({ isActive: true });
      }
    }
  }

  handleSearch(e) {
    const v = e.target.value;
    let state = this.state;
    if (this.state.searchActive) {
      state = { selection: v };
    } else {
      state = {
        selection: v,
        searchActive: true,
        isActive: true
      };
    }
    this.setState(state);
  }

  handleEnter(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }

  handleKeyPress(e) {
    const { searchTxt, selection, index, searchActive } = this.state;
    const { options } = this.props;
    const queryArray = searchActive
      ? this.getSearchResults(options, selection)
      : options;

    if (e.keyCode === 13) {
      e.preventDefault();
      if (index > -1) {
        this.handleChange(queryArray[index].value);
      } else if (selection === '') {
        this.handleChange(selection);
      }
    } else if (e.keyCode === 38 && index > -1) {
      e.preventDefault();
      this.setState({ index: index - 1 });
    } else if (e.keyCode === 40 && queryArray.length - 1 > index) {
      e.preventDefault();
      this.setState({ index: index + 1 });
    }
  }

  renderOptions(options) {
    if (this.state.searchActive) {
      return this.getOpts(this.getSearchResults(options, this.state.selection));
    }
    return this.getOpts(options);
  }

  render() {
    const requiredClass = this.props.required
      ? 'gc-input__label--required'
      : '';
    const activeClass = this.state.isActive ? '' : 'gc-select--inactive';
    const floatLabel = !this.state.isActive && !isEmpty(this.props.value);
    const requiredLabelClass = !floatLabel ? requiredClass : '';

    return (
      <div
        className={`gc-select ${this.props.dynamicClasses} ${
          this.props.accordian ? 'gc-select--accordian gc-select--close' : ''
        }`}
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
            className={`gc-input__label gc-select__label ${requiredLabelClass}`}
            htmlFor={this.props.name}
          >
            {floatLabel
              ? this.getValue(this.props.options, this.props.value)
              : this.props.title}
          </label>

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

        {floatLabel && (
          <label
            className={`gc-input__label gc-select__label--floated ${requiredClass} gc-input__label--inline`}
            htmlFor={this.props.name}
          >
            {this.props.title}
          </label>
        )}

        {!this.props.loading && (
          <Fragment>
            {this.props.accordian && (
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
                {!isEmpty(this.props.value) && this.renderActiveItem()}
                {this.renderOptions(this.props.options)}
              </ul>
            )}

            {this.state.isActive && (
              <ul
                className={
                  this.state.displayListBottom
                    ? `gc-select__drop-down`
                    : `gc-select__drop-down gc-select__drop-down--top`
                }
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
                {!isEmpty(this.props.value) && this.renderActiveItem()}
                {this.renderOptions(this.props.options)}
              </ul>
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

GCSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  dynamicClasses: PropTypes.string.isRequired,
  title: PropTypes.string,
  handleValidation: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  spinner: PropTypes.node
};

GCSelect.defaultProps = {
  placeholder: '',
  title: '',
  loading: false,
  spinner: <div className="gc-form__spinner" />
};

export default GCSelect;
