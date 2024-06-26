import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { GCTooltip } from '../GCTooltip';
import { isEmpty, getLabel, toArray } from 'utils';
import { GCIcon, GCTag } from 'ui';
import GCLabel from '../GCLabel';

class GCSelectFilter extends Component {
  constructor(props) {
    super(props);

    this.searchReset = {
      searchTerm: '',
      placeholder: props.placeholder
        ? props.placeholder
        : 'Start typing to search'
    };
    this.stateReset = {
      isActive: false,
      isInformationActive: false,
      index: 0
    };
    this.state = {
      index: 0,
      options: props.options, // it's important not to put options in searchReset, otherwise SSR might not initially populate options
      ...this.stateReset,
      ...this.searchReset
    };

    this.textInput = React.createRef();
    this.select = React.createRef();
    this.input = React.createRef();
    this.optionList = React.createRef();
    this.selectContainer = React.createRef();
    this.infoIcon = React.createRef();
    this.toggleIcon = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isActive === false && this.state.isActive === true) {
      this.input.current.focus();
    }
  }

  handleKeyPress(e) {
    const { options, index, isActive } = this.state;
    if (isActive) {
      if (e.keyCode === 13) {
        if (
          (!this.infoIcon.current ||
            !this.infoIcon.current.contains(e.target)) &&
          !e.target.classList.contains('gc-tag__btn')
        ) {
          this.onEnterKeyPress(e);
        }
      } else if (e.keyCode === 38 && index > -1) {
        this.onUpKeyPress(e);
      } else if (e.keyCode === 40 && options.length - 1 > index) {
        this.onDownKeyPress(e);
      }
    }
  }

  onEnterKeyPress(e) {
    e.preventDefault();
    const { options, index } = this.state;

    this.setState(
      {
        ...this.searchReset,
        options: this.props.options
      },
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
        } else {
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

  onTagCrossBtnClick(e) {
    e.preventDefault();
    // Need to focus on input if no value is selected, otherwise blur wont work
    this.input.current.focus();
    this.props.handleInputChange();
  }

  handleOnFocusEffect(e) {
    if (
      !(
        this.toggleIcon.current.contains(e.target) ||
        e.target === this.toggleIcon.current
      )
    ) {
      this.setState({
        isActive: true
      });
    }
  }

  handleOnBlurEffect(e) {
    // Only blur if click away is not on a child element
    if (!e.currentTarget.contains(e.relatedTarget)) {
      this.setState({
        ...this.stateReset,
        ...this.searchReset,
        index: 0,
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

  onOptionMouseDown(e, value) {
    e.preventDefault();
    this.handleInputChange(value);
    this.setState({
      ...this.searchReset,
      options: this.props.options
    });
  }

  handleInputChange(newValue) {
    const { value } = this.props;

    if (value === newValue || value === [newValue]) {
      this.props.handleInputChange();
    } else {
      this.props.handleInputChange(newValue);
      this.props.handleInputValidation(newValue);
      this.setState({ isActive: false });
    }
  }

  removeItemFromValueArray(item) {
    return this.props.value.filter(v => v !== item);
  }

  addItemToValueArray(item) {
    const newValueArray = toArray(this.props.value).splice(0);
    newValueArray.push(item);
    return newValueArray;
  }

  computeItemClassList(selectV, itemV, index) {
    return classNames('gc-select__list-item', {
      'gc-select__list-item--selected': selectV === itemV,
      'gc-select__list-item--hovered': this.state.index === index
    });
  }

  renderTags(valueArray) {
    return toArray(valueArray).map(value => (
      <GCTag key={value} onCrossBtnClick={e => this.onTagCrossBtnClick(e)}>
        {getLabel(value, this.props.options)}
      </GCTag>
    ));
  }

  onInputClick() {
    // this is needed for when the user selects an item, the dropdown closes, but they still have focus.
    // if they click again, it should open up.
    if (!this.state.isActive) {
      this.setState({ isActive: true });
    }
  }

  onInformationClick() {
    this.setState({
      isInformationActive: !this.state.isInformationActive
    });
  }

  onToggleIconClick() {
    this.setState(state => ({ isActive: !state.isActive }));
    this.props.handleInputValidation(this.props.value);
  }

  render() {
    const { value, name, label, required, disabled, isFrontPageFilter } =
      this.props;
    const { isActive, isInformationActive, options, placeholder } = this.state;

    const selectClasses = classNames('gc-input__el', {
      'gc-input__el--active': isActive
    });

    return (
      <div
        className="gc-select__single-container"
        onFocus={e => !disabled && this.handleOnFocusEffect(e)}
        onBlur={e => !disabled && this.handleOnBlurEffect(e)}
        onKeyDown={e => !disabled && this.handleKeyPress(e)}
        onClick={e => !disabled && this.onInputClick(e)}
        ref={this.select}
        role="button"
        tabIndex={disabled ? -1 : 0}
      >
        {this.props.tooltip &&
          isActive &&
          isInformationActive &&
          this.props.tooltip && (
            <GCTooltip
              content={this.props.tooltip}
              name={`${name}tooltip`}
              active={isInformationActive}
              toggleTooltip={() => this.onInformationClick()}
            />
          )}
        <div id={`gc-drop-down_${name}`} className={selectClasses}>
          <div
            id={`gc-input-multi_${name}`}
            ref={this.textInput}
            role="button"
            aria-haspopup="listbox"
            aria-label={`input ${name}`}
            className={`${
              !isEmpty(value) || isActive
                ? 'gc-drop-down__value--shrink'
                : 'gc-drop-down__value'
            }`}
          >
            <GCLabel
              label={isFrontPageFilter ? placeholder : label}
              htmlFor={name}
              required={required}
              activeShrink={!isEmpty(value) || isActive}
            />
            {!isEmpty(value) && <div className="gc-filter--badge">1</div>}
            {!isEmpty(value) && !isActive && (
              <p className="gc-filter--value">
                {options.find(opt => value === opt.value)?.label}
              </p>
            )}
            {this.props.search && isActive && (
              <input
                id={name}
                ref={this.input}
                className="gc-search__input"
                type="text"
                value={this.state.searchTerm}
                onChange={e => this.onSearchInputChange(e)}
                placeholder={
                  isFrontPageFilter ? 'Start typing to search' : placeholder
                }
                autoComplete="chrome-off"
              />
            )}

            <GCIcon
              kind="chevronIconBold"
              extendedClassNames={`gc-drop-down__chevron ${
                isActive ? 'active' : ''
              }`}
              passedRef={this.toggleIcon}
              onClick={() => this.onToggleIconClick()}
            />

            {this.props.tooltip && (
              <div
                role="button"
                ref={this.infoIcon}
                className="filter_icon_div"
                onKeyDown={e => e.key === 'Enter' && this.onInformationClick()}
                tabIndex={0}
                onClick={() => this.onInformationClick()}
              >
                <GCIcon
                  kind="infoIcon"
                  extendedClassNames="gc-drop-down__info"
                />
              </div>
            )}
          </div>

          {isActive && (
            <div className="filter-drop-down">
              <span
                className="gc-drop-down__value__text gc-drop-down__value__text--input"
                ref={this.selectContainer}
              >
                Selected: {this.renderTags(value)}
              </span>
              <div className="dotted" />
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
                      {opt.label}
                      {value === opt.value && (
                        <GCIcon
                          kind="tickIcon"
                          extendedClassNames="gc-filter-icon"
                        />
                      )}
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
            </div>
          )}
        </div>
      </div>
    );
  }
}

GCSelectFilter.propTypes = {
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
  disabled: PropTypes.bool,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  required: PropTypes.bool,
  isFrontPageFilter: PropTypes.bool
};

GCSelectFilter.defaultProps = {
  autoComplete: 'chrome-off' // Autocomplete "off" does not work on chrome
};

export { GCSelectFilter };
