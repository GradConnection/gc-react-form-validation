'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _uniqueId = require('lodash/uniqueId');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _without = require('lodash/without');

var _without2 = _interopRequireDefault(_without);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _GCInputLabel = require('./GCInputLabel');

var _GCInputLabel2 = _interopRequireDefault(_GCInputLabel);

var _GCInputSVG = require('./GCInputSVG');

var _GCInputSVG2 = _interopRequireDefault(_GCInputSVG);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GCMultiSelect = function (_Component) {
  _inherits(GCMultiSelect, _Component);

  function GCMultiSelect(props) {
    _classCallCheck(this, GCMultiSelect);

    var _this = _possibleConstructorReturn(this, (GCMultiSelect.__proto__ || Object.getPrototypeOf(GCMultiSelect)).call(this, props));

    _this.state = {
      isActive: false,
      searchActive: false,
      searchTxt: '',
      index: -1,
      keyCode: '',
      selection: _this.getValue(props.options, _this.props.value) || ''
    };

    _this.handleClose = _this.handleClose.bind(_this);
    return _this;
  }

  _createClass(GCMultiSelect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('click', this.handleClose);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('click', this.handleClose);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var props = this.props;
      if (nextProps.value.length !== props.value.length || this.state.searchActive) {
        this.setState({
          selection: this.getValue(props.options, nextProps.value)
        });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps.value !== this.props.value || nextState.searchActive !== this.state.searchActive || nextState.searchTxt !== this.state.searchTxt || this.state.isActive !== nextState.isActive || nextProps.dynamicClasses !== this.props.dynamicClasses || nextState.index !== this.state.index;
    }
  }, {
    key: 'handleClose',
    value: function handleClose(e) {
      var _this2 = this;

      if (!this.props.accordian) {
        if (this.state.isActive && !this[this.props.name].contains(e.target)) {
          this.setState({
            isActive: false,
            searchActive: false,
            searchTxt: ''
          });
        }
      } else if (this[this.props.name].classList.contains('gc-select--open') && !this[this.props.name].contains(e.target)) {
        this[this.props.name].classList.remove('gc-select--open');
        this[this.props.name].classList.add('gc-select--close');
        setTimeout(function () {
          _this2.setState({
            searchActive: false,
            searchTxt: '',
            isActive: false
          });
        }, 500);
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(v) {
      var _this3 = this;

      var disabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!disabled) {
        this.props.onChange(v);
        this.setState({
          isActive: false,
          index: -1
        }, function () {
          return _this3.props.handleValidation(true);
        });
      }
    }
  }, {
    key: 'getOpts',
    value: function getOpts(options) {
      var _this4 = this;

      if (options.length === 0) {
        return _react2.default.createElement(
          'li',
          {
            className: 'gc-select__drop-down__option gc-select__drop-down__option--no-results',
            key: (0, _uniqueId2.default)()
          },
          _react2.default.createElement(
            'label',
            { htmlFor: this.props.name },
            this.state.searchActive ? 'There are no matching results' : 'No available options'
          )
        );
      }

      return options.map(function (opt, index) {
        var hoveredClass = _this4.state.index === index ? 'gc-select__drop-down__option--hover' : '';
        var disabledClass = opt.disabled ? 'gc-select__drop-down__option--disabled' : '';
        return _react2.default.createElement(
          'li',
          {
            className: 'gc-select__drop-down__option ' + disabledClass + ' ' + hoveredClass,
            key: (0, _uniqueId2.default)(),
            onMouseDown: function onMouseDown() {
              return _this4.addToArray(opt.value, opt.disabled);
            }
          },
          _react2.default.createElement(
            'label',
            { htmlFor: _this4.props.name },
            opt.label
          )
        );
      });
    }
  }, {
    key: 'renderOtherItems',
    value: function renderOtherItems(options) {
      var sortedArray = this.sortOptionsArray(options);
      if (this.state.searchActive) {
        return this.getOpts(this.getSearchResults());
      }
      return this.getOpts(this.getInactiveItems(sortedArray));
    }
  }, {
    key: 'renderActiveItems',
    value: function renderActiveItems(options) {
      var _this5 = this;

      var activeItems = this.getActiveItems(options);
      var sortedArray = this.sortOptionsArray(activeItems);

      return sortedArray.map(function (opt, index) {
        var hoveredClass = _this5.state.index === index ? 'gc-select__drop-down__option--hover' : '';
        var disabledClass = opt.disabled ? 'gc-select__drop-down__option--disabled' : '';
        return _react2.default.createElement(
          'li',
          {
            className: 'gc-select__drop-down__option gc-select__drop-down__option--active ' + hoveredClass,
            key: (0, _uniqueId2.default)(),
            onMouseDown: function onMouseDown() {
              return _this5.deleteFromArray(opt.value);
            }
          },
          _react2.default.createElement(
            'label',
            { htmlFor: _this5.props.name },
            opt.label
          ),
          _react2.default.createElement('div', {
            className: 'gc-select__option--active__cross',
            onMouseDown: function onMouseDown() {
              return _this5.deleteFromArray(opt.value);
            }
          })
        );
      });
    }
  }, {
    key: 'getInactiveItems',
    value: function getInactiveItems(options) {
      var _this6 = this;

      var optionsDup = options.slice();
      var inactiveOptions = optionsDup.filter(function (o) {
        return !_this6.matchToValue(_this6.props.value, o.value);
      });
      return inactiveOptions;
    }
  }, {
    key: 'getActiveItems',
    value: function getActiveItems(options) {
      var _this7 = this;

      var optionsDup = options.slice();
      var activeOptions = optionsDup.filter(function (o) {
        return _this7.matchToValue(_this7.props.value, o.value);
      });
      return activeOptions;
    }
  }, {
    key: 'sortOptionsArray',
    value: function sortOptionsArray(options) {
      var optionsDup = options.slice();
      optionsDup.sort(function (a, b) {
        if (a.label < b.label) {
          return -1;
        }
        if (a.label > b.label) {
          return 1;
        }
        return 0;
      });
      return optionsDup;
    }
  }, {
    key: 'matchToValue',
    value: function matchToValue(arr, value) {
      return arr.includes(value);
    }
  }, {
    key: 'addToArray',
    value: function addToArray(v, disabled) {
      if (!this.matchToValue(this.props.value, v)) {
        var newValueArray = [];
        if (this.props.value.length > 0) {
          newValueArray = this.props.value.slice();
        }
        newValueArray.push(v);
        this.handleChange(newValueArray, disabled);
      } else {
        this.deleteFromArray(v);
      }
    }
  }, {
    key: 'getSearchResults',
    value: function getSearchResults() {
      var searchTxt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.searchTxt;

      var options = this.getInactiveItems(this.props.options);
      if (searchTxt === '') {
        return options;
      }
      var pattern = new RegExp(searchTxt, 'i');
      var foo = (0, _filter2.default)(options, function (o) {
        return pattern.test(o.label);
      });
      return foo;
    }
  }, {
    key: 'getValue',
    value: function getValue(arr, value) {
      var valueArray = (0, _isArray2.default)(value) ? value : value.split(', ');
      var objArray = [];
      valueArray.forEach(function (i) {
        arr.forEach(function (o) {
          if (i === o.value) {
            objArray.push(o);
          }
        });
      });
      return objArray;
    }
  }, {
    key: 'dropDownList',
    value: function dropDownList(shouldOpen, e) {
      var _this8 = this;

      var must = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      e.preventDefault();
      if (this.props.accordian) {
        if (shouldOpen && must || this[this.props.name].classList.contains('gc-select--close') && !must) {
          this[this.props.name].classList.add('gc-select--open');
          this[this.props.name].classList.remove('gc-select--close');
        } else if (!shouldOpen && must || this[this.props.name].classList.contains('gc-select--open') && !must) {
          this[this.props.name].classList.remove('gc-select--open');
          this[this.props.name].classList.add('gc-select--close');
          setTimeout(function () {
            _this8.setState({
              searchActive: false,
              searchTxt: ''
            });
          }, 500);

          this.props.handleValidation(true);
        }
      } else {
        if (!shouldOpen) {
          setTimeout(function () {
            return _this8.setState({
              isActive: false,
              searchTxt: '',
              searchActive: false,
              index: -1
            }, function () {
              return _this8.props.handleValidation(true);
            });
          }, 50);
        } else {
          this.setState({ isActive: true });
        }
      }
    }
  }, {
    key: 'handleSearch',
    value: function handleSearch(e) {
      if (e.keyCode !== 13 && e.keyCode !== 38 && e.keyCode !== 40) {
        var v = e.target.value;
        var state = this.state;
        if (this.state.searchActive) {
          state = { searchTxt: v };
        } else {
          state = {
            searchTxt: v,
            searchActive: true,
            isActive: true
          };
        }
        this.setState(state);
      }
    }
  }, {
    key: 'handleEnter',
    value: function handleEnter(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(e) {
      var _state = this.state,
          searchTxt = _state.searchTxt,
          selection = _state.selection,
          index = _state.index,
          searchActive = _state.searchActive;
      var options = this.props.options;

      var queryArray = this.getSearchResults(e.target.value);
      e.preventDefault();
      if (e.keyCode === 13) {
        if (index > -1) {
          this.addToArray(queryArray[index].value);
        } else if (selection === '') {
          this.addToArray(selection);
        }
      } else if (e.keyCode === 38 && index > -1) {
        // Press Up arrow key
        this.setState({ index: index - 1 });
      } else if (e.keyCode === 40 && queryArray.length - 1 > index) {
        // Press Down arrow key
        this.setState({ index: index + 1 });
      }
    }
  }, {
    key: 'removeAll',
    value: function removeAll() {
      this.handleChange([]);
    }
  }, {
    key: 'deleteFromArray',
    value: function deleteFromArray(value) {
      var newValueArray = (0, _without2.default)(this.props.value, value);
      this.handleChange(newValueArray);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this9 = this;

      var requiredClass = this.props.required ? 'gc-input__label--required' : '';
      var activeClass = this.state.isActive ? '' : 'gc-select--inactive';
      var accordianClass = '';
      if (this.props.accordian) {
        accordianClass = this.props.activeInput ? 'gc-select--accordian gc-select--open' : 'gc-select--accordian gc-select--close';
      }

      return _react2.default.createElement(
        'div',
        {
          className: 'gc-select ' + this.props.dynamicClasses + ' ' + accordianClass,
          ref: function ref(select) {
            _this9[_this9.props.name] = select;
          },
          key: 'gc-selectList' + this.props.name
        },
        _react2.default.createElement(
          'div',
          {
            className: 'gc-select__label-container ' + activeClass,
            onMouseDown: function onMouseDown(e) {
              return _this9.dropDownList(!_this9.state.isActive, e);
            }
          },
          _react2.default.createElement(
            'label',
            {
              className: 'gc-input__label gc-select__label ' + requiredClass,
              htmlFor: this.props.name
            },
            this.props.title
          ),
          this.props.value.length > 0 && _react2.default.createElement(
            'div',
            { className: 'gc-select__option-count' },
            _react2.default.createElement(
              'span',
              { className: 'gc-select__option-count--text' },
              this.props.value.length
            ),
            _react2.default.createElement('div', {
              className: 'gc-select__cross',
              onMouseDown: function onMouseDown() {
                return _this9.removeAll();
              }
            })
          ),
          this.props.loading ? this.props.spinner : _react2.default.createElement(
            _react.Fragment,
            null,
            this.state.isActive ? _react2.default.createElement(_GCInputSVG2.default, {
              type: 'chevronUp',
              onMouseDown: function onMouseDown(e) {
                return _this9.dropDownList(false, e, true);
              },
              className: 'gc-select__input-icon gc-multi-select__icon'
            }) : _react2.default.createElement(_GCInputSVG2.default, {
              type: 'chevronDown',
              onMouseDown: function onMouseDown(e) {
                return _this9.dropDownList(true, e, true);
              },
              className: 'gc-select__input-icon gc-multi-select__icon'
            })
          )
        ),
        !this.props.loading && _react2.default.createElement(
          _react.Fragment,
          null,
          this.props.accordian && _react2.default.createElement(
            'ul',
            {
              className: 'gc-select__drop-down ' + (this.props.accordian ? 'gc-select--accordian' : '')
            },
            this.props.search && _react2.default.createElement(
              'li',
              { className: 'gc-select__searchbar' },
              _react2.default.createElement('input', {
                name: 'searchTxt' + this.props.name,
                title: 'Search ' + this.props.name,
                autoFocus: true,
                placeholder: 'Start typing to search',
                value: this.state.searchTxt,
                onKeyDown: function onKeyDown(e) {
                  return _this9.handleEnter(e);
                },
                onKeyUp: function onKeyUp(e) {
                  return _this9.handleKeyPress(e);
                },
                onChange: function onChange(e) {
                  return _this9.handleSearch(e);
                }
              })
            ),
            this.renderActiveItems(this.props.options),
            this.renderOtherItems(this.props.options)
          ),
          this.state.isActive && !this.props.accordian && _react2.default.createElement(
            'ul',
            {
              className: 'gc-select__drop-down ' + (this.props.accordian ? 'gc-select--accordian' : '')
            },
            this.props.search && _react2.default.createElement(
              'li',
              { className: 'gc-select__searchbar' },
              _react2.default.createElement('input', {
                name: 'searchTxt' + this.props.name,
                title: 'Search ' + this.props.name,
                autoFocus: true,
                placeholder: 'Start typing to search',
                value: this.state.searchTxt,
                onKeyDown: function onKeyDown(e) {
                  return _this9.handleEnter(e);
                },
                onKeyUp: function onKeyUp(e) {
                  return _this9.handleKeyPress(e);
                },
                onChange: function onChange(e) {
                  return _this9.handleSearch(e);
                }
              })
            ),
            this.renderActiveItems(this.props.options),
            this.renderOtherItems(this.props.options)
          )
        )
      );
    }
  }]);

  return GCMultiSelect;
}(_react.Component);

GCMultiSelect.propTypes = {
  onChange: _propTypes2.default.func.isRequired,
  placeholder: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]).isRequired,
  name: _propTypes2.default.string.isRequired,
  options: _propTypes2.default.array.isRequired,
  dynamicClasses: _propTypes2.default.string.isRequired,
  title: _propTypes2.default.string,
  handleValidation: _propTypes2.default.func.isRequired,
  required: _propTypes2.default.bool.isRequired,
  multi: _propTypes2.default.bool,
  search: _propTypes2.default.bool,
  accordian: _propTypes2.default.bool,
  loading: _propTypes2.default.bool,
  spinner: _propTypes2.default.node
};

GCMultiSelect.defaultProps = {
  placeholder: '',
  title: '',
  multi: false,
  search: false,
  accordian: false,
  loading: false,
  spinner: _react2.default.createElement('div', { className: 'gc-form__spinner' })
};

exports.default = GCMultiSelect;