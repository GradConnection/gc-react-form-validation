import React, { Component } from "react";
import PropTypes from "prop-types";

import classNames from "classnames";

import { isEmpty, getLabel } from "utils";
import { GCIcon } from "ui";

class GCSelect extends Component {
  constructor(props) {
    super(props);

    this.searchReset = {
      searchTerm: "",
      isSearchActive: false,
      placeholder: props.placeholder || "Select an option",
    };

    this.state = {
      isActive: false,
      isFocussed: false,
      index: 0,
      options: props.options, // it's important not to put options in searchReset, otherwise SSR might not initially populate options
      ...this.searchReset,
    };

    this.textInput = React.createRef();
    this.select = React.createRef();

    this.onSearchInputChange = this.onSearchInputChange.bind(this);

    this.handleWindowClick = this.handleWindowClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleOnBlurEffect = this.handleOnBlurEffect.bind(this);
    this.handleOnFocusEffect = this.handleOnFocusEffect.bind(this);

    this.onInputMouseUp = this.onInputMouseUp.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleWindowClick);
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleWindowClick);
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isSearchActive } = this.state;
    if (prevState.isSearchActive !== isSearchActive && isSearchActive) {
      this.textInput.current.focus();
    }
  }

  handleWindowClick(e) {
    if (
      !this.select.current.contains(e.target) &&
      e.target !== this.textInput
    ) {
      this.setState({
        isActive: false,
        ...this.searchReset,
        options: this.props.options,
      });
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
      }
    }

    if (!isActive && isFocussed) {
      if (e.keyCode === 40 || e.keyCode === 13) {
        this.activateDropDown();
      }
    }
  }

  activateDropDown() {
    const activeState = {
      isActive: true,
    };

    if (this.props.search) {
      activeState.isSearchActive = true;
      activeState.placeholder = "Start typing to search";
    }

    this.setState(activeState);
  }

  onEnterKeyPress(e) {
    e.preventDefault();
    const { value, handleInputChange, unselectable } = this.props;
    const { options, index } = this.state;
    this.setState(
      {
        isActive: false,
        index: 0,
        ...this.searchReset,
        options: this.props.options,
      },
      () => {
        if (
          options &&
          index > -1 &&
          options[index] &&
          options[index].value !== value
        ) {
          handleInputChange(options[index].value);
        } else {
          unselectable
            ? handleInputChange("")
            : handleInputChange(options[index].value);
          this.setState({
            isActive: false,
            index: 0,
            ...this.searchReset,
            options: this.props.options,
          });
        }
      }
    );
  }

  onUpKeyPress(e) {
    const { index } = this.state;

    e.preventDefault();
    this.setState({ index: index - 1 });
  }

  onDownKeyPress(e) {
    const { index } = this.state;

    e.preventDefault();
    this.setState({ index: index + 1 });
  }

  handleOnFocusEffect(e) {
    e.preventDefault();
    this.setState({
      options: this.props.options,
    });
    if (this.props.search) {
      this.setState({
        isActive: true,
        isFocussed: true,
        isSearchActive: true,
        placeholder: "Start typing to search",
      });
    } else {
      this.setState({
        isActive: true,
        isFocussed: true,
      });
    }
  }

  handleOnBlurEffect() {
    const { handleInputValidation, value } = this.props;
    this.setState({
      isActive: false,
      isFocussed: false,
      ...this.resetSearch,
    });
    handleInputValidation(value);
  }

  onSearchInputChange(e) {
    const searchTerm = e.target.value;
    const { options } = this.props;
    const filteredOptions = options.filter(opt =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    this.setState({
      searchTerm: e.target.value,
      index: 0,
      options: filteredOptions,
    });
  }

  onInputMouseUp(e) {
    const { isActive } = this.state;
    if (this.props.search) {
      if (!isActive) {
        this.setState({
          isActive: true,
          isFocussed: true,
        });
      } else {
        this.setState({
          isSearchActive: true,
          placeholder: "Start typing to search",
        });
      }
    } else if (!isActive) {
      this.setState({ isActive: true });
    }
  }

  onOptionMouseDown(e, value) {
    e.preventDefault();

    const { handleInputChange, unselectable } = this.props;

    this.setState(
      {
        isActive: false,
        ...this.searchReset,
        options: this.props.options,
      },
      () => {
        if (value === this.props.value && unselectable) {
          handleInputChange("");
        } else {
          handleInputChange(value);
        }
      }
    );
  }

  computeItemClassList(selectV, itemV, index) {
    return classNames("gc-select__list-item", {
      "gc-select__list-item--selected": selectV === itemV,
      "gc-select__list-item--hovered": this.state.index === index,
    });
  }

  computeInputValue(value, options, isSearchActive, searchTerm) {
    if (isSearchActive) {
      return searchTerm;
    }
    return isEmpty(value) ? "" : getLabel(value, this.props.options);
  }

  render() {
    const { value, name } = this.props;
    const {
      isActive,
      isFocussed,
      options,
      isSearchActive,
      searchTerm,
      placeholder,
    } = this.state;
    const selectClasses = classNames(
      "gc-input__el",
      "gc-input__el--no-padding",
      {
        "gc-input__el--active": isActive || isFocussed,
      }
    );
    const inputClasses =
      "gc-drop-down__value__text gc-drop-down__value__text__autoselect gc-drop-down__value__text--input";

    return (
      <div className={selectClasses} ref={this.select}>
        <div
          role="button"
          className="gc-drop-down__value"
          onMouseUp={this.onInputMouseUp}
        >
          <input
            ref={this.textInput}
            className={inputClasses}
            type="text"
            value={this.computeInputValue(
              value,
              options,
              isSearchActive,
              searchTerm
            )}
            onChange={this.onSearchInputChange}
            onFocus={this.handleOnFocusEffect}
            onBlur={this.handleOnBlurEffect}
            placeholder={placeholder}
            readOnly={!isSearchActive}
          />
          <GCIcon kind="caretIcon" extendedClassNames="gc-drop-down__caret" />
        </div>

        {isActive && !this.props.disabled && (
          <ul className="gc-drop-down__el gc-select__list">
            {options.length > 0 ? (
              options.map((opt, i) => (
                <li
                  key={`${i}_select_${name}`}
                  className={this.computeItemClassList(value, opt.value, i)}
                  onMouseDown={e => this.onOptionMouseDown(e, opt.value)}
                >
                  {opt.label}
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
    );
  }
}

GCSelect.defaultProps = {
  unselectable: true,
};

GCSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.array,
  search: PropTypes.bool,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  handleInputChange: PropTypes.func.isRequired,
  handleInputValidation: PropTypes.func.isRequired,
  unselectable: PropTypes.bool,
};

export { GCSelect };
