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
    this.listContainer = React.createRef();
    this.selectContainer = React.createRef();
    this.infoIcon = React.createRef();
  }

  componentDidUpdate(prevState) {
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
    this.props.handleInputChange();
  }

  handleOnFocusEffect() {
    this.setState({
      isActive: true
    });
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

  onInformationClick() {
    this.setState({
      isInformationActive: !this.state.isInformationActive
    });
  }

  render() {
    const { value, name, autoComplete, label, required, disabled } = this.props;
    const { isActive, isInformationActive, options, placeholder } = this.state;

    const selectClasses = classNames(
      'gc-input__el',
      'gc-input__el--no-padding',
      {
        'gc-input__el--active': isActive
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
        'gc-drop-down__value__text--input gc-drop-down__value__text--input-inline': !isEmpty(
          value
        ),
        'gc-input__el': isEmpty(value)
      }
    );

    return (
      <div
        className="gc-select__single-container"
        onFocus={() => !disabled && this.handleOnFocusEffect()}
        onBlur={e => !disabled && this.handleOnBlurEffect(e)}
        onKeyDown={e => !disabled && this.handleKeyPress(e)}
        ref={this.select}
        role="button"
        tabIndex={disabled ? '-1' : '0'}
      >
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
              label={label}
              htmlFor={name}
              required={required}
              activeShrink={!isEmpty(value) || isActive}
            />
            {!isEmpty(value) && <div className="gc-filter--badge">1</div>}
            {!isEmpty(value) && !isActive && (
              <div className="gc-filter--value">
                {options.find(opt => value === opt.value)?.label}
              </div>
            )}

            <GCIcon kind="caretIcon" extendedClassNames="gc-drop-down__caret" />
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
          </div>

          <div className={containerClasses} ref={this.listContainer}>
            {this.props.search && isActive && (
              <input
                id={name}
                ref={this.input}
                className={listInputClasses}
                type="text"
                value={this.state.searchTerm}
                onChange={e => this.onSearchInputChange(e)}
                placeholder={placeholder}
                autoComplete={autoComplete}
              />
            )}
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

            {isActive && (
              <div className="gc-drop-down__el gc-select__list">
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
                  className="gc-drop-down__el filter-drop-down"
                >
                  {options.length > 0 ? (
                    options.map((opt, i) => (
                      <li
                        role="option"
                        id={`${this.props.name}_option_${i}`}
                        key={`${this.props.name}_option_${i}`}
                        className={this.computeItemClassList(
                          value,
                          opt.value,
                          i
                        )}
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
  autoComplete: PropTypes.string,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  required: PropTypes.bool
};

GCSelectFilter.defaultProps = {
  autoComplete: 'chrome-off' // Autocomplete "off" does not work on chrome
};

export { GCSelectFilter };
