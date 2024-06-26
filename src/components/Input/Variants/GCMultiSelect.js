import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { isEmpty, getLabel, toArray } from 'utils';
import { GCIcon, GCTag } from 'ui';

class GCMultiSelect extends Component {
  constructor(props) {
    super(props);

    this.searchActivate = {
      isSearchActive: true,
      placeholder: 'Start typing to search'
    };
    this.searchReset = {
      searchTerm: '',
      isSearchActive: false,
      placeholder: props.placeholder || 'Select options'
    };
    this.state = {
      isActive: false,
      isFocussed: false,
      index: 0,
      options: props.options, // it's important not to put options in searchReset, otherwise SSR might not initially populate options
      ...this.searchReset
    };

    this.textInput = React.createRef();
    this.select = React.createRef();
    this.input = React.createRef();
    this.optionList = React.createRef();
    this.listContainer = React.createRef();
    this.toggleIcon = React.createRef();

    this.onSearchInputChange = this.onSearchInputChange.bind(this);

    this.handleWindowClick = this.handleWindowClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleOnBlurEffect = this.handleOnBlurEffect.bind(this);
    this.handleOnFocusEffect = this.handleOnFocusEffect.bind(this);

    this.onTagCrossBtnClick = this.onTagCrossBtnClick.bind(this);
    this.onInputClick = this.onInputClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleWindowClick);
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleWindowClick);
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isSearchActive, searchTerm, options } = this.state;
    if (prevState.isSearchActive !== isSearchActive && isSearchActive) {
      if (searchTerm === '') {
        this.setState({
          options: this.props.options,
          index: 0
        });
      }
      if (this.input.current) {
        this.input.current.focus();
      } else {
        this.textInput.current.focus();
      }
    }
  }

  handleWindowClick(e) {
    if (
      !this.props.search &&
      !this.select.current.contains(e.target) &&
      this.state.isFocussed
    ) {
      this.setState({
        isActive: false,
        isFocussed: false,
        index: 0,
        ...this.searchReset,
        options: this.props.options
      });
      this.props.handleInputValidation(this.props.value);
    }
  }

  handleKeyPress(e) {
    const { options, index, isActive, isFocussed } = this.state;
    if (isActive && isFocussed) {
      if (e.keyCode === 13) {
        this.onEnterKeyPress(e);
      } else if (e.keyCode === 38 && index > -1) {
        this.onUpKeyPress(e);
      } else if (e.keyCode === 40 && options.length - 1 > index) {
        this.onDownKeyPress(e);
      } else if (e.keyCode === 9) {
        this.setState({
          isFocussed: false,
          isActive: false,
          placeholder: this.props.placeholder || 'Select options'
        });
      }
    }
  }

  activateDropDown() {
    const activeState = {
      isActive: true,
      isFocussed: true
    };

    if (this.props.search) {
      activeState.isSearchActive = true;
      activeState.placeholder = 'Start typing to search';
    }

    this.setState(activeState);
  }

  onEnterKeyPress(e) {
    const focusedEl = document.activeElement;
    if (focusedEl.classList.contains('gc-tag__btn')) {
      return;
    }
    e.preventDefault();
    const { options, index } = this.state;

    this.setState(
      !this.props.persistSearch
        ? {
            ...this.searchReset,
            options: this.props.options
          }
        : {},
      () => {
        if (index > -1 && options[index] && options[index].value) {
          this.handleInputChange(options[index].value);
        } else if (
          index > -1 &&
          index + 1 > options.length &&
          options.length >= 1 &&
          options[0] &&
          options[0].value
        ) {
          this.handleInputChange(options[0].value);
        } else if (!this.props.persistSearch) {
          this.setState({ index: 0 });
        }
      }
    );
  }

  onUpKeyPress(e) {
    const { index } = this.state;

    e.preventDefault();
    if (index === 0) this.input.current.focus();
    else {
      this.optionList.current.scrollTo({
        left: 0,
        top:
          document.querySelector(`#${this.props.name}_option_${index}`)
            .offsetTop - this.optionList.current.offsetHeight,
        behavior: 'smooth'
      });
      this.setState({ index: index - 1 });
    }
  }

  onDownKeyPress(e) {
    const { index } = this.state;
    e.preventDefault();
    this.setState({ index: index + 1 });
    const nextEl = document.querySelector(
      `#${this.props.name}_option_${index + 1}`
    );
    this.optionList.current.scrollTo({
      left: 0,
      top:
        nextEl.offsetTop +
        nextEl.offsetHeight -
        this.optionList.current.offsetHeight,
      behavior: 'smooth'
    });
  }

  onTagCrossBtnClick(e, value) {
    e.preventDefault();
    const newValueArray = this.removeItemFromValueArray(value);
    this.props.handleInputChange(newValueArray);
  }

  handleOnFocusEffect(e) {
    if (e.target === this.textInput.current && this.input.current) {
      this.input.current.focus();
    } else if (this.props.search) {
      this.setState({
        isActive: true,
        isFocussed: true,
        ...this.searchActivate
      });
    } else {
      this.setState({
        isActive: true,
        isFocussed: true
      });
    }
  }

  handleOnBlurEffect(e) {
    if (
      document.activeElement !== this.listContainer.current &&
      document.activeElement !== this.textInput.current &&
      document.activeElement !== this.input.current
    ) {
      this.setState({
        isActive: false,
        isFocussed: false,
        index: 0,
        ...this.searchReset,
        options: this.props.options
      });
      this.props.handleInputValidation(this.props.value);
    }
  }

  onSearchInputChange(e) {
    const searchTerm = e.target.value;
    const { options } = this.props;

    const filteredOptions = options.filter(opt =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const newState = {
      searchTerm: e.target.value,
      options: filteredOptions,
      index: 0
    };

    if (!this.state.isActive) {
      newState.isActive = true;
    }

    this.setState(newState);
  }

  onInputClick(e) {
    e.preventDefault();
    if (this.props.search) {
      if (!this.state.isActive) {
        this.setState({
          isFocussed: true,
          isActive: true,
          ...this.searchActivate
        });
      } else {
        this.toggleIcon.current.focus();
      }
    } else if (this.state.isActive) {
      this.setState({ isActive: false, isFocussed: false });
    } else {
      this.setState({ isActive: true, isFocussed: true });
    }
  }

  onOptionMouseDown(e, value) {
    e.preventDefault();
    this.handleInputChange(value);
    if (!this.props.persistSearch) {
      this.setState({
        ...this.searchReset,
        options: this.props.options
      });
    }
  }

  handleInputChange(newValue) {
    const { value, persistSearch } = this.props;

    let newValueArray = [];
    if (value.includes(newValue)) {
      newValueArray = this.removeItemFromValueArray(newValue);
    } else {
      newValueArray = this.addItemToValueArray(newValue);
    }
    if (!persistSearch) {
      this.setState({ index: 0 });
    }
    this.props.handleInputChange(newValueArray);
  }

  removeItemFromValueArray(item) {
    return Array.isArray(this.props.value)
      ? this.props.value.filter(v => v !== item)
      : this.props.value;
  }

  addItemToValueArray(item) {
    const newValueArray = toArray(this.props.value).splice(0);
    newValueArray.push(item);
    return newValueArray;
  }

  computeItemClassList(selectV, itemV, index) {
    return classNames('gc-select__list-item', {
      'gc-select__list-item--selected': selectV.includes(itemV),
      'gc-select__list-item--hovered': this.state.index === index
    });
  }

  renderTags(valueArray) {
    return toArray(valueArray).map(value => (
      <GCTag
        key={value}
        onCrossBtnClick={e => this.onTagCrossBtnClick(e, value)}
      >
        {getLabel(value, this.props.options)}
      </GCTag>
    ));
  }

  render() {
    const { value, name, autoComplete } = this.props;
    const { isActive, isFocussed, options, placeholder } = this.state;

    const selectClasses = classNames(
      'gc-input__el',
      'gc-input__el--no-padding',
      {
        'gc-input__el--active': isActive || isFocussed
      }
    );

    const containerClasses = classNames('gc-select__list-container', {
      'gc-select__list-container__empty': isEmpty(value)
    });

    const listInputClasses = classNames(
      'gc-drop-down__value__text',
      'gc-select__input',
      'gc-drop-down__value__text__autoselect',
      {
        'gc-drop-down__value__text--input gc-drop-down__value__text--input-inline':
          !isEmpty(value),
        'gc-input__el': isEmpty(value)
      }
    );

    return (
      <div className="gc-select__multi-container">
        <div
          id={`gc-drop-down_${name}`}
          className={selectClasses}
          ref={this.select}
        >
          <div
            id={`gc-input-multi_${name}`}
            ref={this.textInput}
            role="button"
            aria-haspopup="listbox"
            aria-label={`input ${name}`}
            className="gc-drop-down__value"
            onMouseDown={this.onInputClick}
            onFocus={() => {
              !this.state.isActive ? this.activateDropDown() : null;
            }}
          >
            {isEmpty(value) && (
              <input
                id={name}
                className="gc-drop-down__value__text gc-drop-down__value__text--input"
                value=""
                placeholder={placeholder}
                readOnly
              />
            )}
            <span className="gc-drop-down__value__text gc-drop-down__value__text--input">
              {this.renderTags(value)}
            </span>
            <GCIcon
              kind="caretIcon"
              extendedClassNames="gc-drop-down__caret"
              passedRef={this.toggleIcon}
            />
          </div>

          <div className={containerClasses} ref={this.listContainer}>
            {this.props.search && isFocussed && (
              <input
                id={name}
                ref={this.input}
                className={listInputClasses}
                type="text"
                value={this.state.searchTerm}
                onChange={this.onSearchInputChange}
                onFocus={this.handleOnFocusEffect}
                onBlur={this.handleOnBlurEffect}
                placeholder={placeholder}
                autoComplete={autoComplete}
              />
            )}
            {isActive && (
              <ul
                role="listbox"
                ref={this.optionList}
                className="gc-drop-down__el gc-select__list"
              >
                {options.length > 0 ? (
                  options.map((opt, i) => (
                    <li
                      role="option"
                      id={`${this.props.name}_option_${i}`}
                      key={`${this.props.name}_option_${i}`}
                      className={this.computeItemClassList(value, opt.value, i)}
                      onMouseDown={e => this.onOptionMouseDown(e, opt.value)}
                    >
                      <span>
                        {opt.label}
                        {opt.job_count && <span> ({opt.job_count})</span>}
                      </span>
                    </li>
                  ))
                ) : (
                  <li
                    key={`$noOpt_select_${name}`}
                    className="gc-select__list-item gc-select__list-item--no-opt"
                  >
                    <i>There are no available options</i>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }
}

GCMultiSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.array.isRequired
  ]),
  options: PropTypes.array,
  search: PropTypes.bool,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  handleInputChange: PropTypes.func.isRequired,
  handleInputValidation: PropTypes.func.isRequired,
  selectAll: PropTypes.bool,
  selectAllValue: PropTypes.array,
  autoComplete: PropTypes.string,
  persistSearch: PropTypes.bool
};

GCMultiSelect.defaultProps = {
  selectAll: false,
  autoComplete: 'chrome-off' // Autocomplete "off" does not work on chrome
};

export { GCMultiSelect };
