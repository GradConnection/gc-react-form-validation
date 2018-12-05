import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'

import { isEmpty, getLabel, toArray } from 'utils'
import { GCIcon, GCTag } from 'ui'

class GCMultiSelect extends Component {
  constructor (props) {
    super(props)

    this.searchReset = {
      options: props.options,
      searchTerm: '',
      isSearchActive: false,
      placeholder: props.placeholder || 'Select options'
    }

    this.searchActivate = {
      isSearchActive: true,
      placeholder: 'Start typing to search'
    }

    this.state = {
      isActive: false,
      isFocussed: false,
      index: -1,
      ...this.searchReset
    }

    this.textInput = React.createRef()
    this.select = React.createRef()

    this.onSearchInputChange = this.onSearchInputChange.bind(this)

    this.handleWindowClick = this.handleWindowClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleOnBlurEffect = this.handleOnBlurEffect.bind(this)
    this.handleOnFocusEffect = this.handleOnFocusEffect.bind(this)

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
    if (!this.select.current.contains(e.target)) {
      console.log('Apparently clicking outside the input')
      this.setState({
        isActive: false,
        isFocussed: false,
        index: -1,
        ...this.searchReset
      })
    }
  }

  handleKeyPress (e) {
    const { options, index, isActive, isFocussed } = this.state
    if (isActive && isFocussed) {
      if (e.keyCode === 13) {
        this.onEnterKeyPress(e)
      } else if (e.keyCode === 38 && index > -1) {
        this.onUpKeyPress(e)
      } else if (e.keyCode === 40 && options.length - 1 > index) {
        this.onDownKeyPress(e)
      }
    }

    if (!isActive && isFocussed) {
      if (e.keyCode === 40 || e.keyCode === 13) {
        this.activateDropDown()
      }
    }
  }

  activateDropDown () {
    const activeState = {
      isActive: true,
      isFocussed: true
    }

    if (this.props.search) {
      activeState.isSearchActive = true
      activeState.placeholder = 'Start typing to search'
    }

    this.setState(activeState)
  }

  onEnterKeyPress (e) {
    e.preventDefault()

    const { options, index } = this.state
    this.setState({
      ...this.searchReset
    }, () => {
      if (index > -1) {
        this.handleInputChange(options[index].value)
      }
    })
  }

  onUpKeyPress (e) {
    const { index } = this.state

    e.preventDefault()
    this.setState({ index: index - 1 })
  }

  onDownKeyPress (e) {
    const { index } = this.state
    e.preventDefault()
    this.setState({ index: index + 1 })
  }

  onTagCrossBtnClick (e, value) {
    e.preventDefault()
    const newValueArray = this.removeItemFromValueArray(value)
    this.props.handleInputChange(newValueArray)
  }

  handleOnFocusEffect () {
    if (this.props.search) {
      this.setState({
        isActive: true,
        isFocussed: true,
        ...this.searchActivate
      })
    } else {
      this.setState({
        isActive: true,
        isFocussed: true
      })
    }
  }

  handleOnBlurEffect () {
    this.setState({
      isActive: false,
      isFocussed: false,
      index: -1,
      ...this.resetSearch
    })
  }

  onSearchInputChange (e) {
    const searchTerm = e.target.value
    const { options } = this.props

    const filteredOptions = options.filter(opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase()))
    const newState = {
      searchTerm: e.target.value,
      options: filteredOptions
    }

    if (!this.state.isActive) {
      newState.isActive = true
    }

    this.setState(newState)
  }

  onInputClick (e) {
    e.preventDefault()
    if (this.props.search) {
      if (!this.state.isActive) {
        this.setState({
          isFocussed: true,
          isActive: true
        })
      } else {
        this.setState(this.searchActivate)
      }
    } else {
      if (this.state.isActive) {
        this.setState({ isActive: false })
      } else {
        this.setState({ isActive: true, isFocussed: true })
      }
    }
  }

  onOptionMouseDown (e, value) {
    e.preventDefault()
    this.handleInputChange(value)
    this.setState({
      ...this.searchReset
    })
  }

  handleInputChange (newValue) {
    const { value } = this.props

    let newValueArray = []
    if (value.includes(newValue)) {
      newValueArray = this.removeItemFromValueArray(newValue)
    } else {
      newValueArray = this.addItemToValueArray(newValue)
    }

    this.props.handleInputChange(newValueArray)
  }

  removeItemFromValueArray (item) {
    return this.props.value.filter(v => v !== item)
  }

  addItemToValueArray (item) {
    const newValueArray = this.props.value.splice(0)
    newValueArray.push(item)
    return newValueArray
  }

  computeItemClassList (selectV, itemV, index) {
    return classNames('gc-select__list-item', {
      'gc-select__list-item--selected': selectV.includes(itemV),
      'gc-select__list-item--hovered': this.state.index === index
    })
  }

  renderTags (valueArray) {
    return toArray(valueArray).map(value => (
      <GCTag
        onCrossBtnClick={e => this.onTagCrossBtnClick(e, value)}>{getLabel(value, this.props.options)}</GCTag>
    ))
  }

  render () {
    const {
      value,
      name
    } = this.props
    const { isActive, isFocussed, options, placeholder } = this.state

    const selectClasses = classNames('gc-input__el', 'gc-input__el--no-padding', {
      'gc-input__el--active': isActive || isFocussed
    })

    return (
      <div
        className={selectClasses}
        ref={this.select}>
        <div
          ref={this.textInput}
          role='button'
          className='gc-drop-down__value'
          onFocus={this.handleOnFocusEffect}
          onClick={this.onInputClick}>
          {isEmpty(value) && !isFocussed && (
            <input
              className='gc-drop-down__value__text gc-drop-down__value__text--input'
              value=''
              placeholder={placeholder}
              readOnly
            />
          )}
          <span
            className='gc-drop-down__value__text gc-drop-down__value__text--input'
            onBlur={this.handleOnBlurEffect}
          >
            {this.renderTags(value)}
            {this.props.search && isFocussed && (
              <input
                className='gc-drop-down__value__text gc-drop-down__value__text--input gc-drop-down__value__text--input-inline'
                type='text'
                autoFocus
                value={this.state.searchTerm}
                onChange={this.onSearchInputChange}
                onFocus={this.handleOnFocusEffect}
                onBlur={this.handleOnBlurEffect}
                placeholder='Start typing to search'
              />
            )}
          </span>
          <GCIcon kind='caretIcon' extendedClassNames='gc-drop-down__caret' />
        </div>

        {isActive && (
          <ul className='gc-drop-down__el gc-select__list'>
            { options.length > 0 ?
              options.map((opt, i) => (
                <li
                  key={`${i}_select_${name}`}
                  className={this.computeItemClassList(value, opt.value, i)}
                  onMouseDown={e => this.onOptionMouseDown(e, opt.value)}>
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

GCMultiSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.array.isRequired]
  ),
  options: PropTypes.array,
  search: PropTypes.bool,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  handleInputChange: PropTypes.func.isRequired,
  handleInputValidation: PropTypes.func.isRequired,
  selectAll: PropTypes.bool,
  selectAllValue: PropTypes.array
}

GCMultiSelect.defaultProps = {
  selectAll: false
}

export { GCMultiSelect }
