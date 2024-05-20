import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { GCTooltip } from '../GCTooltip';
import { isEmpty, getLabel, toArray } from 'utils';
import { GCIcon, GCTag } from 'ui';
import GCLabel from '../GCLabel';

class GCMultiSelectFilter extends Component {
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
    this.clearButton = React.createRef();
    this.saveButton = React.createRef();
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
          e.target !== this.clearButton.current &&
          e.target !== this.saveButton.current &&
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

  onToggleIconClick() {
    this.setState(state => ({ isActive: !state.isActive }));
    this.props.handleInputValidation(this.props.value);
  }

  onTagCrossBtnClick(e, value) {
    e.preventDefault();
    const newValueArray = this.removeItemFromValueArray(value);
    if (isEmpty(newValueArray)) {
      // Need to focus on input if no value is selected, otherwise blur wont work
      this.input.current.focus();
    }
    this.props.handleInputChange(newValueArray);
  }

  handleOnFocusEffect(e) {
    if (
      !(
        this.toggleIcon.current.contains(e.target) ||
        this.toggleIcon.current === e.target
      )
    ) {
      this.setState({
        isActive: true
      });
    }
  }

  handleOnBlurEffect(e) {
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

    let newValueArray = [];
    if (value.includes(newValue)) {
      newValueArray = this.removeItemFromValueArray(newValue);
    } else {
      newValueArray = this.addItemToValueArray(newValue);
    }
    this.setState({ index: 0 });
    this.props.handleInputChange(newValueArray);
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

  onContainerMouseDown() {
    this.input.current.focus();
  }

  onClearClick() {
    this.setState({
      ...this.searchReset,
      options: this.props.options,
      isActive: false
    });
    this.props.handleInputChange([]);
    this.props.handleInputValidation();
  }

  onSubmitClick() {
    this.setState({
      ...this.stateReset
    });
    this.props.handleInputValidation(this.props.value);
  }

  onInformationClick() {
    this.setState({
      isInformationActive: !this.state.isInformationActive
    });
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
        className="gc-select__multi-container"
        onFocus={e => !disabled && this.handleOnFocusEffect(e)}
        onBlur={e => !disabled && this.handleOnBlurEffect(e)}
        onKeyDown={e => !disabled && this.handleKeyPress(e)}
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
              isActive ? 'gc-drop-down__value--shrink' : 'gc-drop-down__value'
            }`}
          >
            <GCLabel
              label={isFrontPageFilter ? placeholder : label}
              htmlFor={name}
              required={required}
              activeShrink={isActive}
            />
            {!isEmpty(value) && (
              <div
                className={`gc-filter--badge ${
                  isActive ? 'gc-filter--badge--active' : ''
                }`}
              >
                {value.length}
              </div>
            )}
            {this.props.search && isActive && (
              <input
                id={name}
                ref={this.input}
                className={`gc-search__input ${isActive ? 'active' : ''}`}
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
              onClick={() => this.onToggleIconClick()}
              passedRef={this.toggleIcon}
            />
            {this.props.tooltip && (
              <div
                role="button"
                ref={this.infoIcon}
                className="filter_icon_div"
                onKeyDown={e => e.key === 'Enter' && this.onInformationClick()}
                onClick={() => this.onInformationClick()}
                tabIndex={0}
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
                      <span>
                        {opt.label}
                        {opt.job_count && <span> ({opt.job_count})</span>}
                      </span>
                      {value.includes(opt.value) && (
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
              <div className="dotted" />
              <div className="gc-filter__dropdown__controls">
                <button
                  type="button"
                  ref={this.saveButton}
                  className="btn btn--primary gc-filter-primary-button"
                  onClick={e => this.onSubmitClick(e)}
                  aria-label="submit filter item"
                >
                  Save
                </button>
                <button
                  type="button"
                  ref={this.clearButton}
                  className="gc-tag__btn gc-btn--icon-sml underline"
                  onClick={() => this.onClearClick()}
                  aria-label="remove filter item"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

GCMultiSelectFilter.propTypes = {
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
  label: PropTypes.string,
  tooltip: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  isFrontPageFilter: PropTypes.bool
};

GCMultiSelectFilter.defaultProps = {
  autoComplete: 'chrome-off' // Autocomplete "off" does not work on chrome
};

export { GCMultiSelectFilter };
