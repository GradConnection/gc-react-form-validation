import React, { Component } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { toArray } from 'utils';

class GCCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocussed: false,
    };
    this.checkbox = React.createRef();
    this.handleBlur = this.handleBlur.bind(this);
    this.onSingleCheckboxClick = this.onSingleCheckboxClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleBlur);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleBlur);
  }

  handleBlur(e) {
    const { isFocussed } = this.state;
    if (!this.checkbox.current.contains(e.target) && isFocussed) {
      this.setState(
        {
          isFocussed: false,
        },
        () => {
          this.props.handleInputValidation(this.props.value);
        }
      );
    } else if (this.checkbox.current.contains(e.target) && !isFocussed) {
      this.setState({
        isFocussed: true,
      });
    }
  }

  onSingleCheckboxClick() {
    this.props.onInputChange(!this.props.value);
    this.props.handleInputValidation(!this.props.value);
  }

  handleKeyPress(e){
    if(e.key === "Enter"){
      this.onSingleCheckboxClick()
    }
  }

  onCheckboxItemClick(newValue) {
    const { value, onInputChange } = this.props;
    const valueArray = toArray(value);
    let newArray = [];

    if (!valueArray.includes(newValue)) {
      newArray = [...valueArray, newValue];
    } else {
      newArray = valueArray.filter((v) => v !== newValue);
    }

    onInputChange(newArray);
  }

  renderSingleCheckbox() {
    const { name, value, label, required, disabled } = this.props;

    return (
      <div className="gc-input__el gc-input__el--no-deco" ref={this.checkbox}>
        <input
          id={`gc-input-checkbox_${name}`}
          className='gc-input__btn-hidden'
          type='checkbox'
          name={name}
          title={label}
          checked={!!value}
          aria-checked={!!value}
          role="checkbox"
          onChange={(e) => e.preventDefault()}
          aria-label={label}
        />
        <span
          className="gc-input__inline-icon gc-checkbox__icon"
          onClick={!disabled ? this.onSingleCheckboxClick : undefined}
          tabIndex={disabled? -1 : 0}
          onKeyPress={!disabled ? this.handleKeyPress : undefined}
        />
        <label
          className={`gc-input__inline-label ${
            required ? "gc-label__text--required" : ""
          }`}
        >
          {typeof label === 'object' ? label : parse(label)}
        </label>
      </div>
    );
  }

  renderMultipleCheckboxes() {
    const { name, value, options, title } = this.props;
    return (
      <ul className="gc-input__el gc-input--list" ref={this.checkbox}>
        {options.map((opt, i) => (
          <li
            className="gc-input-list__item"
            onClick={() => this.onCheckboxItemClick(opt.value)}
            key={`${name}__${i}`}
          >
            <input
              className="gc-input__btn-hidden"
              type="checkbox"
              value={opt.value}
              name={name}
              title={title}
              checked={toArray(value).includes(opt.value)}
              aria-checked={toArray(value).includes(opt.value)}
              role="checkbox"
              onChange={(e) => e.preventDefault()}
            />
            <span className="gc-input__inline-icon gc-checkbox__icon" />
            <label className="gc-input__inline-label">{opt.label}</label>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { options } = this.props;

    return options.length > 0
      ? this.renderMultipleCheckboxes()
      : this.renderSingleCheckbox();
  }
}

GCCheckbox.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.bool,
  ]),
  label: PropTypes.node.isRequired,
  options: PropTypes.array,
  onInputChange: PropTypes.func.isRequired,
  handleInputValidation: PropTypes.func.isRequired,
};

export { GCCheckbox };
