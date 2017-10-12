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

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _without = require('lodash/without');

var _without2 = _interopRequireDefault(_without);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _GCInputLabel = require('./GCInputLabel');

var _GCInputLabel2 = _interopRequireDefault(_GCInputLabel);

var _GCInputSVG = require('./GCInputSVG');

var _GCInputSVG2 = _interopRequireDefault(_GCInputSVG);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GCSelect = function (_Component) {
  _inherits(GCSelect, _Component);

  function GCSelect(props) {
    _classCallCheck(this, GCSelect);

    var _this = _possibleConstructorReturn(this, (GCSelect.__proto__ || Object.getPrototypeOf(GCSelect)).call(this, props));

    _this.state = {
      isActive: false,
      searchActive: false,
      index: -1,
      selection: _this.getValue(props.options, _this.props.value) || ''
    };
    return _this;
  }

  _createClass(GCSelect, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var props = this.props;
      if (nextProps.value !== props.value || this.state.searchActive) {
        this.setState({
          selection: this.getValue(props.options, nextProps.value),
          searchActive: false
        });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps.value !== this.props.value || nextState.searchActive || this.state.isActive !== nextState.isActive || nextProps.dynamicClasses !== this.props.dynamicClasses || nextState.index !== this.state.index;
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
      var inactiveItems = (0, _isEmpty2.default)(this.props.value) ? options : (0, _without2.default)(options, (0, _find2.default)(options, function (o) {
        return o.value === _this2.props.value;
      }));
      return inactiveItems.map(function (opt, index) {
        var hoveredClass = _this2.state.index === index ? 'gc-select__drop-down__option--hover' : '';
        var disabledClass = opt.disabled ? 'gc-select__drop-down__option--disabled' : '';
        return _react2.default.createElement(
          'li',
          {
            className: 'gc-select__drop-down__option ' + disabledClass + ' ' + hoveredClass,
            key: (0, _uniqueId2.default)(),
            onClick: function onClick() {
              return _this2.handleChange(opt.value, opt.disabled);
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
    key: 'renderActiveItem',
    value: function renderActiveItem() {
      var _this3 = this;

      var ActiveItem = (0, _find2.default)(this.props.options, function (o) {
        return o.value === _this3.props.value;
      });

      return _react2.default.createElement(
        'li',
        {
          className: 'gc-select__drop-down__option gc-select__drop-down__option--active',
          key: (0, _uniqueId2.default)(),
          onClick: function onClick() {
            return _this3.handleChange('', _this3.props.required);
          } },
        _react2.default.createElement(
          'label',
          { htmlFor: this.props.name },
          ActiveItem.label
        ),
        !this.props.required && _react2.default.createElement('div', {
          className: 'gc-select__option--active__cross'
        })
      );
    }
  }, {
    key: 'matchToValue',
    value: function matchToValue(arr, value) {
      return arr === value;
    }
  }, {
    key: 'getSearchResults',
    value: function getSearchResults(options, searchTxt) {
      if (searchTxt === '') {
        return options;
      }
      var pattern = new RegExp(searchTxt, 'i');
      return (0, _filter2.default)(options, function (o) {
        return pattern.test(o.label);
      });
    }
  }, {
    key: 'getValue',
    value: function getValue(arr, value) {
      var valArray = arr.filter(function (i) {
        return i.value === value;
      });
      return (0, _isEmpty2.default)(valArray) ? undefined : valArray[0].label;
    }
  }, {
    key: 'handleChange',
    value: function handleChange(v) {
      var _this4 = this;

      var disabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!disabled) {
        this.props.onChange(v);
        this.setState({
          isActive: false,
          index: -1
        }, function () {
          return _this4.props.validateInput();
        });
      }
    }
  }, {
    key: 'dropDownList',
    value: function dropDownList(shouldOpen) {
      var _this5 = this;

      if (!shouldOpen) {
        setTimeout(function () {
          return _this5.setState({ isActive: false }, function () {
            return _this5.props.validateInput();
          });
        }, 50);
      } else {
        this.setState({ isActive: true });
      }
    }
  }, {
    key: 'handleSearch',
    value: function handleSearch(e) {
      var v = e.target.value;
      var state = this.state;
      if (this.state.searchActive) {
        state = { selection: v };
      } else {
        state = {
          selection: v,
          searchActive: true,
          isActive: true
        };
      }
      this.setState(state);
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

      var queryArray = searchActive ? this.getSearchResults(options, selection) : options;

      if (e.keyCode === 13) {
        e.preventDefault();
        if (index > -1) {
          this.handleChange(queryArray[index].value);
        } else if (selection === '') {
          this.handleChange(selection);
        }
      } else if (e.keyCode === 38 && index > -1) {
        e.preventDefault();
        this.setState({ index: index - 1 });
      } else if (e.keyCode === 40 && queryArray.length - 1 > index) {
        e.preventDefault();
        this.setState({ index: index + 1 });
      }
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions(options) {
      if (this.state.searchActive) {
        return this.getOpts(this.getSearchResults(options, this.state.selection));
      }
      return this.getOpts(options);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var requiredClass = this.props.required ? 'gc-input__label--required' : '';
      var activeClass = this.state.isActive ? '' : 'gc-select--inactive';
      var floatLabel = !this.state.isActive && !(0, _isEmpty2.default)(this.props.value);
      var requiredLabelClass = !floatLabel ? requiredClass : '';
      return _react2.default.createElement(
        'div',
        {
          className: 'gc-select ' + this.props.dynamicClasses,
          onBlur: function onBlur() {
            return _this6.dropDownList(false);
          } },
        _react2.default.createElement(
          'div',
          { className: 'gc-select__label-container ' + activeClass,
            onClick: function onClick() {
              return _this6.dropDownList(!_this6.state.isActive);
            } },
          _react2.default.createElement(
            'label',
            {
              className: 'gc-input__label gc-select__label ' + requiredLabelClass,
              htmlFor: this.props.name },
            floatLabel ? this.getValue(this.props.options, this.props.value) : this.props.title
          ),
          this.state.isActive ? _react2.default.createElement(_GCInputSVG2.default, {
            type: 'chevronUp',
            onClick: function onClick() {
              return _this6.dropDownList(false);
            },
            className: 'gc-select__input-icon gc-multi-select__icon' }) : _react2.default.createElement(_GCInputSVG2.default, {
            type: 'chevronDown',
            onClick: function onClick() {
              return _this6.dropDownList(true);
            },
            className: 'gc-select__input-icon gc-multi-select__icon' })
        ),
        floatLabel && _react2.default.createElement(
          'label',
          {
            className: 'gc-input__label gc-select__label--floated ' + requiredClass + ' gc-input__label--inline',
            htmlFor: this.props.name },
          this.props.title
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
                return _this6.handleEnter(e);
              },
              onKeyUp: function onKeyUp(e) {
                return _this6.handleKeyPress(e);
              },
              onChange: function onChange(e) {
                return _this6.handleSearch(e);
              }
            })
          ),
          !(0, _isEmpty2.default)(this.props.value) && this.renderActiveItem(),
          this.renderOptions(this.props.options)
        )
      );
    }
  }]);

  return GCSelect;
}(_react.Component);

GCSelect.propTypes = {
  onChange: _propTypes2.default.func.isRequired,
  placeholder: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]).isRequired,
  name: _propTypes2.default.string.isRequired,
  options: _propTypes2.default.array.isRequired,
  dynamicClasses: _propTypes2.default.string.isRequired,
  title: _propTypes2.default.string,
  validateInput: _propTypes2.default.func.isRequired,
  required: _propTypes2.default.bool.isRequired
};

GCSelect.defaultProps = {
  placeholder: '',
  title: ''
};

exports.default = GCSelect;