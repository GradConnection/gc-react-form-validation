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
    return _this;
  }

  _createClass(GCMultiSelect, [{
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
    key: 'getOpts',
    value: function getOpts(options) {
      var _this2 = this;

      if (options.length === 0) {
        return _react2.default.createElement(
          'li',
          {
            className: 'gc-select__drop-down__option gc-select__drop-down__option--no-results',
            key: (0, _uniqueId2.default)() },
          _react2.default.createElement(
            'label',
            { htmlFor: this.props.name },
            this.state.searchActive ? 'There are no matching results' : 'No available options'
          )
        );
      }

      return options.map(function (opt, index) {
        var hoveredClass = _this2.state.index === index ? 'gc-select__drop-down__option--hover' : '';
        var disabledClass = opt.disabled ? 'gc-select__drop-down__option--disabled' : '';
        return _react2.default.createElement(
          'li',
          {
            className: 'gc-select__drop-down__option ' + disabledClass + ' ' + hoveredClass,
            key: (0, _uniqueId2.default)(),
            onClick: function onClick() {
              return _this2.addToArray(opt.value, opt.disabled);
            } },
          _react2.default.createElement(
            'label',
            { htmlFor: _this2.props.name },
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
      var _this3 = this;

      var activeItems = this.getActiveItems(options);
      var sortedArray = this.sortOptionsArray(activeItems);

      return sortedArray.map(function (opt, index) {
        var hoveredClass = _this3.state.index === index ? 'gc-select__drop-down__option--hover' : '';
        var disabledClass = opt.disabled ? 'gc-select__drop-down__option--disabled' : '';
        return _react2.default.createElement(
          'li',
          {
            className: 'gc-select__drop-down__option gc-select__drop-down__option--active ' + hoveredClass,
            key: (0, _uniqueId2.default)(),
            onClick: function onClick() {
              return _this3.deleteFromArray(opt.value);
            } },
          _react2.default.createElement(
            'label',
            { htmlFor: _this3.props.name },
            opt.label
          ),
          _react2.default.createElement('div', { className: 'gc-select__option--active__cross', onClick: function onClick() {
              return _this3.deleteFromArray(opt.value);
            } })
        );
      });
    }
  }, {
    key: 'getInactiveItems',
    value: function getInactiveItems(options) {
      var _this4 = this;

      var optionsDup = options.slice();
      var inactiveOptions = optionsDup.filter(function (o) {
        return !_this4.matchToValue(_this4.props.value, o.value);
      });
      return inactiveOptions;
    }
  }, {
    key: 'getActiveItems',
    value: function getActiveItems(options) {
      var _this5 = this;

      var optionsDup = options.slice();
      var activeOptions = optionsDup.filter(function (o) {
        return _this5.matchToValue(_this5.props.value, o.value);
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
        var newValueArray = this.props.value.slice();
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
      var valueArray = (0, _isArray2.default)(value) ? value : value.split(", ");
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
    key: 'handleChange',
    value: function handleChange(v) {
      var _this6 = this;

      var disabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!disabled) {
        this.props.onChange(v);
        this.setState({
          isActive: false,
          index: -1,
          searchTxt: ''
        }, function () {
          return _this6.props.validateInput();
        });
      }
    }
  }, {
    key: 'dropDownList',
    value: function dropDownList(shouldOpen) {
      var _this7 = this;

      if (!shouldOpen) {
        setTimeout(function () {
          return _this7.setState({
            isActive: false,
            searchTxt: '',
            searchActive: false,
            index: -1
          }, function () {
            return _this7.props.validateInput();
          });
        }, 50);
      } else {
        this.setState({ isActive: true });
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
    key: 'deleteFromArray',
    value: function deleteFromArray(value) {
      var newValueArray = (0, _without2.default)(this.props.value, value);
      this.handleChange(newValueArray);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this8 = this;

      var requiredClass = this.props.required ? 'gc-input__label--required' : '';
      var activeClass = this.state.isActive ? '' : 'gc-select--inactive';
      return _react2.default.createElement(
        'div',
        {
          className: 'gc-select ' + this.props.dynamicClasses,
          onBlur: function onBlur() {
            return _this8.dropDownList(!_this8.state.isActive);
          } },
        _react2.default.createElement(
          'div',
          { className: 'gc-select__label-container ' + activeClass,
            onClick: function onClick() {
              return _this8.dropDownList(!_this8.state.isActive);
            } },
          _react2.default.createElement(
            'label',
            {
              className: 'gc-input__label gc-select__label ' + requiredClass,
              htmlFor: this.props.name },
            this.props.title
          ),
          this.props.value.length > 0 && _react2.default.createElement(
            'div',
            { className: 'gc-select__option-count' },
            this.props.value.length
          ),
          this.state.isActive ? _react2.default.createElement(_GCInputSVG2.default, {
            type: 'chevronUp',
            onClick: function onClick() {
              return _this8.dropDownList(false);
            },
            className: 'gc-select__input-icon gc-multi-select__icon' }) : _react2.default.createElement(_GCInputSVG2.default, {
            type: 'chevronDown',
            onClick: function onClick() {
              return _this8.dropDownList(true);
            },
            className: 'gc-select__input-icon gc-multi-select__icon' })
        ),
        this.state.isActive && _react2.default.createElement(
          'ul',
          { className: 'gc-select__drop-down' },
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
                return _this8.handleEnter(e);
              },
              onKeyUp: function onKeyUp(e) {
                return _this8.handleKeyPress(e);
              },
              onChange: function onChange(e) {
                return _this8.handleSearch(e);
              }
            })
          ),
          this.renderActiveItems(this.props.options),
          this.renderOtherItems(this.props.options)
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
  validateInput: _propTypes2.default.func.isRequired,
  required: _propTypes2.default.bool.isRequired,
  multi: _propTypes2.default.bool,
  search: _propTypes2.default.bool
};

GCMultiSelect.defaultProps = {
  placeholder: '',
  title: '',
  multi: false,
  search: false
};

exports.default = GCMultiSelect;