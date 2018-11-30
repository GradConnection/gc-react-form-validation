import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import uniqueId from 'lodash/uniqueId'
import filter from 'lodash/filter'
import without from 'lodash/without'
import find from 'lodash/find'
import classNames from 'classnames'

import { isEmpty, getLabel, debounce } from 'utils'
import { GCIcon } from 'ui'

class GCSelect extends Component {
  constructor (props) {
    super(props)

    this.searchReset = {
      options: props.options,
      searchTerm: '',
      isSearchActive: false,
      placeholder: props.placeholder || 'Select an option'
    }

    this.state = {
      isActive: false,
      index: -1,
      ...this.searchReset
    }

    this.textInput = React.createRef()
    this.select = React.createRef()

    this.onSearchInputChange = this.onSearchInputChange.bind(this)

    this.handleWindowClick = this.handleWindowClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)

    this.onTagCrossBtnClick = this.onTagCrossBtnClick.bind(this)
    this.onInputClick = this.onInputClick.bind(this)
  }

  componentDidMount () {
    window.addEventListener('click', this.handleWindowClick)
    window.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.handleWindowClick)
    window.removeEventListener('keydown', this.handleKeyPress)
  }

  componentDidUpdate (prevProps, prevState) {
    const { isSearchActive } = this.state
    if (prevState.isSearchActive !== isSearchActive && isSearchActive) {
      this.textInput.current.focus()
    }
  }

  handleWindowClick (e) {
    if (!this.select.current.contains(e.target) && e.target !== this.textInput) {
      this.setState({
        isActive: false,
        ...this.searchReset
      })
    }
  }

  onEnterKeyPress (e) {
    e.preventDefault()

    const { options, index } = this.state
    const { value, handleInputChange, placeholder } = this.props
    this.setState({
      isActive: false,
      index: -1,
      ...this.searchReset
    }, () => {
      if (index > -1 && options[index].value !== value) {
        handleInputChange(options[index].value)
      } else if (options[index].value === value) {
        handleInputChange('')
      }
    })
  }

  onUpKeyPress (e) {
    const { options, index } = this.state

    e.preventDefault()
    this.setState({ index: index - 1 })
  }

  onDownKeyPress (e) {
    const { options, index } = this.state

    e.preventDefault()
    this.setState({ index: index + 1 })
  }

  handleKeyPress (e) {
    const { options, index, isActive } = this.state
    if (isActive) {
      if (e.keyCode === 13) {
        this.onEnterKeyPress(e)
      } else if (e.keyCode === 38 && index > -1) {
        this.onUpKeyPress(e)
      } else if (e.keyCode === 40 && options.length - 1 > index) {
        this.onDownKeyPress(e)
      }
    }
  }

  onSearchInputChange (e) {
    const searchTerm = e.target.value
    const { options } = this.props
    const filteredOptions = options.filter(opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase()))
    this.setState({
      searchTerm: e.target.value,
      options: filteredOptions
    })
  }

  onInputClick (e) {
    e.preventDefault()
    if (this.props.search) {
      if (!this.state.isActive) {
        this.setState({ isActive: true })
      } else {
        this.setState({
          isSearchActive: true,
          placeholder: 'Start typing to search' })
      }
    } else {
      this.setState(state => ({ isActive: !state.isActive }))
    }
  }

  onOptionClick (e, value) {
    e.preventDefault()
    this.props.handleInputChange(value, this.props.name)
    this.setState({
      isActive: false,
      ...this.searchReset
    })
  }

  onTagCrossBtnClick (e) {
    e.preventDefault()
    this.props.handleInputChange('', this.props.name)
  }

  computeItemClassList (selectV, itemV, index) {
    return classNames('gc-select__list-item', {
      'gc-select__list-item--selected': selectV === itemV,
      'gc-select__list-item--hovered': this.state.index === index
    })
  }

  computeInputValue (value, options, isSearchActive, searchTerm) {
    if (isSearchActive) {
      return searchTerm
    } else {
      return isEmpty(value) ? '' : getLabel(value, this.props.options)
    }
  }

  render () {
    const {
      value,
      search,
      name
    } = this.props
    const { isActive, options, isSearchActive, searchTerm, placeholder } = this.state

    const selectClasses = classNames('gc-input__el', 'gc-input__el--no-padding', {
      'gc-input__el--active': isActive
    })

    return (
      <div
        className={selectClasses}
        ref={this.select}>

        <div
          role='button'
          className='gc-drop-down__value'
          onClick={this.onInputClick}>
          <input
            ref={this.textInput}
            className='gc-drop-down__value__text gc-drop-down__value__text--input'
            type='text'
            value={this.computeInputValue(value, options, isSearchActive, searchTerm)}
            onChange={this.onSearchInputChange}
            placeholder={placeholder}
            readOnly={!isSearchActive}
              />
          <GCIcon kind='caretIcon' extendedClassNames='gc-drop-down__caret' />
        </div>

        {isActive && (
          <ul className='gc-drop-down__el gc-select__list'>
            {options.length > 0 ?
            options.map((opt, i) => (
              <li
                key={`${i}_select_${name}`}
                className={this.computeItemClassList(value, opt.value, i)}
                onClick={e => this.onOptionClick(e, opt.value)}>
                {opt.label}
              </li>
            )) : (
              <li
                key={`$noOpt_select_${name}`}
                className='gc-select__list-item gc-select__list-item--no-opt'>
                <i>There are no available options</i>
              </li>
          )}
          </ul>
        )}

      </div>
    )
  }
}

export { GCSelect }
