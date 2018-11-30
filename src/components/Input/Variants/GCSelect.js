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
    this.state = {
      isActive: false,
      index: -1,
      options: props.options,
      searchTerm: '',
      isSearchActive: false,
      placeholder: props.placeholder || 'Select an option'
    }

    this.textInput = React.createRef()
    // this.searchInput = React.createRef()
    this.select = React.createRef()

    this.onSearchInputChange = this.onSearchInputChange.bind(this)

    this.handleWindowClick = this.handleWindowClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)

    this.onTagCrossBtnClick = this.onTagCrossBtnClick.bind(this)
    this.onInputClick = this.onInputClick.bind(this)
  }
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     isActive: false,
  //     searchActive: false,
  //     displayListBottom: true,
  //     index: -1,
  //     searchTxt: '',
  //     selection: this.getValue(props.options, this.props.value) || ''
  //   }
  //   this.handleClose = this.handleClose.bind(this)
  //   this.calcDropDownPostion = this.calcDropDownPostion.bind(this)
  // }
  //
  // componentDidMount () {
  //   window.addEventListener('click', this.handleClose)
  //   window.addEventListener('scroll', throttle(this.calcDropDownPostion, 1000))
  //   this.calcDropDownPostion()
  // }
  //
  // componentWillUnmount () {
  //   window.removeEventListener('click', this.handleClose)
  //   window.removeEventListener('scroll', this.calcDropDownPostion)
  // }
  //
  // componentWillReceiveProps (nextProps) {
  //   const props = this.props
  //   if (nextProps.value !== props.value || this.state.searchActive) {
  //     this.setState({
  //       selection: this.getValue(props.options, nextProps.value),
  //       searchActive: false
  //     })
  //   }
  // }
  //
  // shouldComponentUpdate (nextProps, nextState) {
  //   return (
  //     nextProps.options !== this.props.options ||
  //     nextProps.value !== this.props.value ||
  //     nextState.searchActive ||
  //     this.state.isActive !== nextState.isActive ||
  //     nextProps.dynamicClasses !== this.props.dynamicClasses ||
  //     nextState.index !== this.state.index ||
  //     nextState.displayListBottom !== this.state.displayListBottom
  //   )
  // }
  //
  // calcDropDownPostion () {
  //   const { displayListBottom } = this.state
  //   if (this[this.props.name]) {
  //     this.rect = this[this.props.name].getBoundingClientRect()
  //     const vh = window.innerHeight
  //     const y = this.rect.top
  //
  //     if (vh - y < 300 && displayListBottom) {
  //       this.setState({ displayListBottom: false })
  //     } else if (vh - y > 300 && !displayListBottom) {
  //       this.setState({ displayListBottom: true })
  //     }
  //   }
  // }
  //
  // handleClose (e) {
  //   if (!this.props.accordian) {
  //     if (this.state.isActive && !this[this.props.name].contains(e.target)) {
  //       this.setState({
  //         isActive: false,
  //         searchActive: false
  //       })
  //     }
  //   } else if (
  //     this[this.props.name].classList.contains('gc-select--open') &&
  //     !this[this.props.name].contains(e.target)
  //   ) {
  //     this[this.props.name].classList.remove('gc-select--open')
  //     this[this.props.name].classList.add('gc-select--close')
  //   }
  // }
  //
  // getOpts (options) {
  //   if (options.length === 0) {
  //     return (
  //       <li
  //         className='gc-select__drop-down__option gc-select__drop-down__option--no-results'
  //         key={uniqueId()}
  //       >
  //         <label htmlFor={this.props.name}>
  //           {this.state.searchActive
  //             ? 'There are no matching results'
  //             : 'No available options'}
  //         </label>
  //       </li>
  //     )
  //   }
  //   const inactiveItems = isEmpty(this.props.value)
  //     ? options
  //     : without(
  //       options,
  //       find(options, o => {
  //         return o.value === this.props.value
  //       })
  //     )
  //   return inactiveItems.map((opt, index) => {
  //     const hoveredClass =
  //       this.state.index === index ? 'gc-select__drop-down__option--hover' : ''
  //     const disabledClass = opt.disabled
  //       ? 'gc-select__drop-down__option--disabled'
  //       : ''
  //     return (
  //       <li
  //         className={`gc-select__drop-down__option ${disabledClass} ${hoveredClass}`}
  //         key={uniqueId()}
  //         onMouseDown={() => this.handleChange(opt.value, opt.disabled)}
  //       >
  //         <label htmlFor={this.props.name}>{opt.label}</label>
  //       </li>
  //     )
  //   })
  // }
  //
  // renderActiveItem () {
  //   const ActiveItem = find(this.props.options, o => {
  //     return o.value === this.props.value
  //   })
  //
  //   return (
  //     <li
  //       className={`gc-select__drop-down__option gc-select__drop-down__option--active`}
  //       key={uniqueId()}
  //       onMouseDown={() => this.handleChange('', this.props.required)}
  //     >
  //       <label htmlFor={this.props.name}>{ActiveItem.label}</label>
  //       {!this.props.required && (
  //         <div className='gc-select__option--active__cross' />
  //       )}
  //     </li>
  //   )
  // }
  //
  // matchToValue (arr, value) {
  //   return arr === value
  // }
  //
  // getSearchResults (options, searchTxt) {
  //   if (searchTxt === '') {
  //     return options
  //   }
  //   const pattern = new RegExp(searchTxt, 'i')
  //   return filter(options, o => pattern.test(o.label))
  // }
  //
  // getValue (arr, value) {
  //   const valArray = arr.filter(i => i.value === value)
  //   return isEmpty(valArray) ? undefined : valArray[0].label
  // }
  //
  // handleChange (v, disabled = false) {
  //   if (!disabled) {
  //     if (this.props.accordian) {
  //       this[this.props.name].classList.remove('gc-select--open')
  //       this[this.props.name].classList.add('gc-select--close')
  //       this.props.onChange(v)
  //       setTimeout(() => {
  //         this.props.handleValidation()
  //       }, 50)
  //     } else {
  //       this.props.onChange(v)
  //       this.setState(
  //         {
  //           isActive: false,
  //           index: -1
  //         },
  //         () => this.props.handleValidation()
  //       )
  //     }
  //   }
  // }
  //
  // dropDownList (shouldOpen, e, must = false) {
  //   e.preventDefault()
  //   if (this.props.disabled && shouldOpen) return
  //   if (this.props.accordian) {
  //     if (
  //       (shouldOpen && must) ||
  //       (this[this.props.name].classList.contains('gc-select--close') && !must)
  //     ) {
  //       this[this.props.name].classList.add('gc-select--open')
  //       this[this.props.name].classList.remove('gc-select--close')
  //     } else if (
  //       (!shouldOpen && must) ||
  //       (this[this.props.name].classList.contains('gc-select--open') && !must)
  //     ) {
  //       this[this.props.name].classList.remove('gc-select--open')
  //       this[this.props.name].classList.add('gc-select--close')
  //       this.props.handleValidation()
  //     }
  //   } else {
  //     if (!shouldOpen) {
  //       setTimeout(
  //         () =>
  //           this.setState(
  //             {
  //               isActive: false,
  //               searchTxt: '',
  //               searchActive: false,
  //               index: -1
  //             },
  //             () => this.props.handleValidation()
  //           ),
  //         50
  //       )
  //     } else {
  //       this.setState({ isActive: true })
  //     }
  //   }
  // }
  //
  // handleSearch (e) {
  //   const v = e.target.value
  //   let state = this.state
  //   if (this.state.searchActive) {
  //     state = {
  //       searchTxt: v,
  //       selection: v
  //     }
  //   } else {
  //     state = {
  //       searchTxt: v,
  //       selection: v,
  //       searchActive: true,
  //       isActive: true
  //     }
  //   }
  //   this.setState(state)
  // }
  //
  // handleEnter (e) {
  //   if (e.keyCode === 13) {
  //     e.preventDefault()
  //   }
  // }
  //
  // handleKeyPress (e) {
  //   const { searchTxt, selection, index, searchActive } = this.state
  //   const { options } = this.props
  //   const queryArray = searchActive
  //     ? this.getSearchResults(options, selection)
  //     : options
  //
  //   if (e.keyCode === 13) {
  //     e.preventDefault()
  //     if (index > -1) {
  //       this.handleChange(queryArray[index].value)
  //     } else if (selection === '') {
  //       this.handleChange(selection)
  //     }
  //   } else if (e.keyCode === 38 && index > -1) {
  //     e.preventDefault()
  //     this.setState({ index: index - 1 })
  //   } else if (e.keyCode === 40 && queryArray.length - 1 > index) {
  //     e.preventDefault()
  //     this.setState({ index: index + 1 })
  //   }
  // }
  //
  // renderOptions (options) {
  //   if (this.state.searchActive) {
  //     return this.getOpts(this.getSearchResults(options, this.state.selection))
  //   }
  //   return this.getOpts(options)
  // }

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
        isActive: false
      })
    }
  }

  onEnterKeyPress (e) {
    e.preventDefault()

    const { options, index } = this.state
    const { value, handleInputChange } = this.props
    this.setState({
      isActive: false,
      index: -1
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
      isSearchActive: false,
      placeholder: this.props.placeholder || 'Select an option'
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
      return isEmpty(value) ? '' : getLabel(value, options)
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
