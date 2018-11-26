import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { toArray } from 'utils'
import uniqueId from 'lodash/uniqueId'
import ReactHtmlParser from 'react-html-parser'

const GCCheckbox = ({
  name,
  title,
  value,
  label,
  options,
  onInputChange,
  handleInputValidation
}) => {
  const onSingleCheckboxClick = () => {
    onInputChange(!value)
  }

  const onCheckboxItemClick = newValue => {
    const valueArray = toArray(value)
    let newArray = []

    if (!valueArray.includes(newValue)) {
      newArray = [...valueArray, newValue]
    } else {
      newArray = valueArray.filter(v => v !== newValue)
    }

    onInputChange(newArray)
    handleInputValidation(newArray)
  }

  const renderSingleCheckbox = () => (
    <div className='gc-input__el gc-input__el--no-deco'>
      <input
        className='gc-input__btn-hidden'
        type='checkbox'
        name={name}
        title={title}
        checked={value}
        onChange={e => e.preventDefault()}
        />
      <span className='gc-input__inline-icon gc-checkbox__icon' onClick={onSingleCheckboxClick} />
      <label className='gc-input__inline-label'>{label}</label>
    </div>
    )

  const renderMultipleCheckboxes = () => (
    <ul className='gc-input__el gc-input--list'>
      {options.map((opt, i) => (
        <li
          className='gc-input-list__item'
          onClick={() => onCheckboxItemClick(opt.value)}
          key={`${name}__${i}`}
          role='checkbox'>
          <input
            className='gc-input__btn-hidden'
            type='checkbox'
            value={opt.value}
            name={name}
            title={title}
            checked={toArray(value).includes(opt.value)}
            onChange={e => e.preventDefault()}
            />
          <span className='gc-input__inline-icon gc-checkbox__icon' />
          <label className='gc-input__inline-label'>{opt.label}</label>
        </li>
          ))}
    </ul>
    )

  return options.length > 0 ? renderMultipleCheckboxes() : renderSingleCheckbox()
}

export { GCCheckbox }
