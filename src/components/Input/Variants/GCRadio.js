import React, { Component } from 'react';
import PropTypes from 'prop-types';

const GCRadio = ({
  onRadioBtnClick,
  options,
  value,
  name,
  title,
  required
}) => {
  const onListItemClick = newValue => {
    if (newValue === value && !required) {
      onRadioBtnClick('');
    } else {
      onRadioBtnClick(newValue, name);
    }
  };

  return (
    <ul className="gc-input__el gc-input--list">
      {options.map((opt, i) => (
        <li
          className="gc-input-list__item"
          onClick={() => onListItemClick(opt.value)}
          key={`${name}__${i}`}
          role="radio"
        >
          <input
            className="gc-input__btn-hidden"
            type="radio"
            value={opt.value}
            name={name}
            title={title}
            required={required}
            checked={value === opt.value}
            onChange={e => e.preventDefault()}
          />
          <span className="gc-input__inline-icon gc-radio__icon" />
          <label className="gc-input__inline-label">{opt.label}</label>
        </li>
      ))}
    </ul>
  );
};

GCRadio.propTypes = {
  onRadioBtnClick: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  required: PropTypes.bool
};

GCRadio.defaultProps = {
  title: '',
  required: false
};

export { GCRadio };
