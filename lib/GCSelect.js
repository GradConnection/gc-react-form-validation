"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GCSelect = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uniqueId = _interopRequireDefault(require("lodash/uniqueId"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _filter = _interopRequireDefault(require("lodash/filter"));

var _without = _interopRequireDefault(require("lodash/without"));

var _find = _interopRequireDefault(require("lodash/find"));

var _throttle = _interopRequireDefault(require("lodash/throttle"));

var _GCInputLabel = _interopRequireDefault(require("./GCInputLabel"));

var _GCInputSVG = _interopRequireDefault(require("./GCInputSVG"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var GCSelect =
/*#__PURE__*/
function (_Component) {
  _inherits(GCSelect, _Component);

  function GCSelect(props) {
    var _this;

    _classCallCheck(this, GCSelect);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GCSelect).call(this, props));
    _this.state = {
      isActive: false,
      searchActive: false,
      displayListBottom: true,
      index: -1,
      searchTxt: '',
      selection: _this.getValue(props.options, _this.props.value) || ''
    };
    _this.handleClose = _this.handleClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.calcDropDownPostion = _this.calcDropDownPostion.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(GCSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('click', this.handleClose);
      window.addEventListener('scroll', (0, _throttle.default)(this.calcDropDownPostion, 1000));
      this.calcDropDownPostion();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('click', this.handleClose);
      window.removeEventListener('scroll', this.calcDropDownPostion);
    }
  }, {
    key: "componentWillReceiveProps",
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
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps.options !== this.props.options || nextProps.value !== this.props.value || nextState.searchActive || this.state.isActive !== nextState.isActive || nextProps.dynamicClasses !== this.props.dynamicClasses || nextState.index !== this.state.index || nextState.displayListBottom !== this.state.displayListBottom;
    }
  }, {
    key: "calcDropDownPostion",
    value: function calcDropDownPostion() {
      var displayListBottom = this.state.displayListBottom;

      if (this[this.props.name]) {
        this.rect = this[this.props.name].getBoundingClientRect();
        var vh = window.innerHeight;
        var y = this.rect.top;

        if (vh - y < 300 && displayListBottom) {
          this.setState({
            displayListBottom: false
          });
        } else if (vh - y > 300 && !displayListBottom) {
          this.setState({
            displayListBottom: true
          });
        }
      }
    }
  }, {
    key: "handleClose",
    value: function handleClose(e) {
      if (!this.props.accordian) {
        if (this.state.isActive && !this[this.props.name].contains(e.target)) {
          this.setState({
            isActive: false,
            searchActive: false
          });
        }
      } else if (this[this.props.name].classList.contains('gc-select--open') && !this[this.props.name].contains(e.target)) {
        this[this.props.name].classList.remove('gc-select--open');
        this[this.props.name].classList.add('gc-select--close');
      }
    }
  }, {
    key: "getOpts",
    value: function getOpts(options) {
      var _this2 = this;

      if (options.length === 0) {
        return _react.default.createElement("li", {
          className: "gc-select__drop-down__option gc-select__drop-down__option--no-results",
          key: (0, _uniqueId.default)()
        }, _react.default.createElement("label", {
          htmlFor: this.props.name
        }, this.state.searchActive ? 'There are no matching results' : 'No available options'));
      }

      var inactiveItems = (0, _isEmpty.default)(this.props.value) ? options : (0, _without.default)(options, (0, _find.default)(options, function (o) {
        return o.value === _this2.props.value;
      }));
      return inactiveItems.map(function (opt, index) {
        var hoveredClass = _this2.state.index === index ? 'gc-select__drop-down__option--hover' : '';
        var disabledClass = opt.disabled ? 'gc-select__drop-down__option--disabled' : '';
        return _react.default.createElement("li", {
          className: "gc-select__drop-down__option ".concat(disabledClass, " ").concat(hoveredClass),
          key: (0, _uniqueId.default)(),
          onMouseDown: function onMouseDown() {
            return _this2.handleChange(opt.value, opt.disabled);
          }
        }, _react.default.createElement("label", {
          htmlFor: _this2.props.name
        }, opt.label));
      });
    }
  }, {
    key: "renderActiveItem",
    value: function renderActiveItem() {
      var _this3 = this;

      var ActiveItem = (0, _find.default)(this.props.options, function (o) {
        return o.value === _this3.props.value;
      });
      return _react.default.createElement("li", {
        className: "gc-select__drop-down__option gc-select__drop-down__option--active",
        key: (0, _uniqueId.default)(),
        onMouseDown: function onMouseDown() {
          return _this3.handleChange('', _this3.props.required);
        }
      }, _react.default.createElement("label", {
        htmlFor: this.props.name
      }, ActiveItem.label), !this.props.required && _react.default.createElement("div", {
        className: "gc-select__option--active__cross"
      }));
    }
  }, {
    key: "matchToValue",
    value: function matchToValue(arr, value) {
      return arr === value;
    }
  }, {
    key: "getSearchResults",
    value: function getSearchResults(options, searchTxt) {
      if (searchTxt === '') {
        return options;
      }

      var pattern = new RegExp(searchTxt, 'i');
      return (0, _filter.default)(options, function (o) {
        return pattern.test(o.label);
      });
    }
  }, {
    key: "getValue",
    value: function getValue(arr, value) {
      var valArray = arr.filter(function (i) {
        return i.value === value;
      });
      return (0, _isEmpty.default)(valArray) ? undefined : valArray[0].label;
    }
  }, {
    key: "handleChange",
    value: function handleChange(v) {
      var _this4 = this;

      var disabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!disabled) {
        if (this.props.accordian) {
          this[this.props.name].classList.remove('gc-select--open');
          this[this.props.name].classList.add('gc-select--close');
          this.props.onChange(v);
          setTimeout(function () {
            _this4.props.handleValidation();
          }, 50);
        } else {
          this.props.onChange(v);
          this.setState({
            isActive: false,
            index: -1
          }, function () {
            return _this4.props.handleValidation();
          });
        }
      }
    }
  }, {
    key: "dropDownList",
    value: function dropDownList(shouldOpen, e) {
      var _this5 = this;

      var must = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      e.preventDefault();
      if (this.props.disabled && shouldOpen) return;

      if (this.props.accordian) {
        if (shouldOpen && must || this[this.props.name].classList.contains('gc-select--close') && !must) {
          this[this.props.name].classList.add('gc-select--open');
          this[this.props.name].classList.remove('gc-select--close');
        } else if (!shouldOpen && must || this[this.props.name].classList.contains('gc-select--open') && !must) {
          this[this.props.name].classList.remove('gc-select--open');
          this[this.props.name].classList.add('gc-select--close');
          this.props.handleValidation();
        }
      } else {
        if (!shouldOpen) {
          setTimeout(function () {
            return _this5.setState({
              isActive: false,
              searchTxt: '',
              searchActive: false,
              index: -1
            }, function () {
              return _this5.props.handleValidation();
            });
          }, 50);
        } else {
          this.setState({
            isActive: true
          });
        }
      }
    }
  }, {
    key: "handleSearch",
    value: function handleSearch(e) {
      var v = e.target.value;
      var state = this.state;
      console.log('searching: ', v);

      if (this.state.searchActive) {
        state = {
          searchTxt: v,
          selection: v
        };
      } else {
        state = {
          searchTxt: v,
          selection: v,
          searchActive: true,
          isActive: true
        };
      }

      this.setState(state);
    }
  }, {
    key: "handleEnter",
    value: function handleEnter(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    }
  }, {
    key: "handleKeyPress",
    value: function handleKeyPress(e) {
      var _this$state = this.state,
          searchTxt = _this$state.searchTxt,
          selection = _this$state.selection,
          index = _this$state.index,
          searchActive = _this$state.searchActive;
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
        this.setState({
          index: index - 1
        });
      } else if (e.keyCode === 40 && queryArray.length - 1 > index) {
        e.preventDefault();
        this.setState({
          index: index + 1
        });
      }
    }
  }, {
    key: "renderOptions",
    value: function renderOptions(options) {
      if (this.state.searchActive) {
        return this.getOpts(this.getSearchResults(options, this.state.selection));
      }

      return this.getOpts(options);
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var requiredClass = this.props.required ? 'gc-input__label--required' : '';
      var activeClass = this.state.isActive ? '' : 'gc-select--inactive';
      var floatLabel = !this.state.isActive && !(0, _isEmpty.default)(this.props.value);
      var requiredLabelClass = !floatLabel ? requiredClass : '';
      return _react.default.createElement("div", {
        className: "gc-select ".concat(this.props.dynamicClasses, " ").concat(this.props.accordian ? 'gc-select--accordian gc-select--close' : ''),
        ref: function ref(select) {
          _this6[_this6.props.name] = select;
        },
        key: "gc-selectList".concat(this.props.name)
      }, _react.default.createElement("div", {
        className: "gc-select__label-container ".concat(activeClass),
        onMouseDown: function onMouseDown(e) {
          return _this6.dropDownList(!_this6.state.isActive, e);
        }
      }, _react.default.createElement("label", {
        className: "gc-input__label gc-select__label ".concat(requiredLabelClass),
        htmlFor: this.props.name
      }, floatLabel ? this.getValue(this.props.options, this.props.value) : this.props.title), this.props.loading ? this.props.spinner : _react.default.createElement(_react.Fragment, null, this.state.isActive ? _react.default.createElement(_GCInputSVG.default, {
        type: "chevronUp",
        onMouseDown: function onMouseDown(e) {
          return _this6.dropDownList(false, e, true);
        },
        className: "gc-select__input-icon gc-multi-select__icon"
      }) : _react.default.createElement(_GCInputSVG.default, {
        type: "chevronDown",
        onMouseDown: function onMouseDown(e) {
          return _this6.dropDownList(true, e, true);
        },
        className: "gc-select__input-icon gc-multi-select__icon"
      }))), floatLabel && _react.default.createElement("label", {
        className: "gc-input__label gc-select__label--floated ".concat(requiredClass, " gc-input__label--inline"),
        htmlFor: this.props.name
      }, this.props.title), !this.props.loading && _react.default.createElement(_react.Fragment, null, this.props.accordian && _react.default.createElement("ul", {
        className: "gc-select__drop-down"
      }, this.props.search && _react.default.createElement("li", {
        className: "gc-select__searchbar"
      }, _react.default.createElement("input", {
        name: "searchTxt".concat(this.props.name),
        title: "Search ".concat(this.props.name),
        autoFocus: true,
        placeholder: "Start typing to search",
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
      })), !(0, _isEmpty.default)(this.props.value) && this.renderActiveItem(), this.renderOptions(this.props.options)), this.state.isActive && _react.default.createElement("ul", {
        className: this.state.displayListBottom ? "gc-select__drop-down" : "gc-select__drop-down gc-select__drop-down--top"
      }, this.props.search && _react.default.createElement("li", {
        className: "gc-select__searchbar"
      }, _react.default.createElement("input", {
        name: "searchTxt".concat(this.props.name),
        title: "Search ".concat(this.props.name),
        autoFocus: true,
        placeholder: "Start typing to search",
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
      })), !(0, _isEmpty.default)(this.props.value) && this.renderActiveItem(), this.renderOptions(this.props.options))));
    }
  }]);

  return GCSelect;
}(_react.Component);

exports.GCSelect = GCSelect;
GCSelect.propTypes = {
  onChange: _propTypes.default.func.isRequired,
  placeholder: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]).isRequired,
  name: _propTypes.default.string.isRequired,
  options: _propTypes.default.array.isRequired,
  dynamicClasses: _propTypes.default.string.isRequired,
  title: _propTypes.default.string,
  handleValidation: _propTypes.default.func.isRequired,
  required: _propTypes.default.bool.isRequired,
  loading: _propTypes.default.bool,
  search: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  spinner: _propTypes.default.node
};
GCSelect.defaultProps = {
  placeholder: '',
  title: '',
  loading: false,
  search: true,
  spinner: _react.default.createElement("div", {
    className: "gc-form__spinner"
  })
};