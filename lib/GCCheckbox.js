"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GCCheckbox = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uniqueId = _interopRequireDefault(require("lodash/uniqueId"));

var _reactHtmlParser = _interopRequireDefault(require("react-html-parser"));

var _GCInputLabel = _interopRequireDefault(require("./GCInputLabel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GCCheckbox =
/*#__PURE__*/
function (_Component) {
  _inherits(GCCheckbox, _Component);

  function GCCheckbox() {
    _classCallCheck(this, GCCheckbox);

    return _possibleConstructorReturn(this, _getPrototypeOf(GCCheckbox).apply(this, arguments));
  }

  _createClass(GCCheckbox, [{
    key: "matchValues",
    value: function matchValues(arr, value) {
      if (this.props.options.length === 0) {
        return this.props.value;
      }

      return arr.includes(value);
    }
  }, {
    key: "removeFromArray",
    value: function removeFromArray(arr, item) {
      var index = arr.findIndex(function (el) {
        return item === el;
      });
      arr.splice(index, 1);
      return arr;
    }
  }, {
    key: "convertToArray",
    value: function convertToArray(str) {
      if (str === '') {
        return [];
      } else if (str.includes(', ')) {
        return str.split(', ');
      } else {
        return [str];
      }
    }
  }, {
    key: "handleChange",
    value: function () {
      var _handleChange = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(e, value) {
        var props, selectedValue, prevValue, newArray;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();
                props = this.props;

                if (!(props.options.length === 0)) {
                  _context.next = 8;
                  break;
                }

                _context.next = 5;
                return this.props.onChange(!props.value);

              case 5:
                this.props.validate();
                _context.next = 13;
                break;

              case 8:
                selectedValue = value;
                prevValue = typeof props.value === 'string' ? this.convertToArray(props.value) : props.value.map(function (i) {
                  return i;
                });
                newArray = prevValue;

                if (prevValue.includes(selectedValue)) {
                  newArray = this.removeFromArray(prevValue, selectedValue);
                } else {
                  newArray.push(selectedValue);
                }

                this.props.onChange(newArray);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function handleChange(_x, _x2) {
        return _handleChange.apply(this, arguments);
      };
    }()
  }, {
    key: "renderCheckboxOpts",
    value: function renderCheckboxOpts() {
      var _this = this;

      var props = this.props; // TODO: Add disabledClass

      return props.options.map(function (opt, i) {
        var activeClass = _this.matchValues(props.value, opt.value) ? 'gc-form__checkbox--checked' : '';
        return _react.default.createElement("div", {
          className: "gc-form__checkbox",
          onClick: function onClick(e, v) {
            return _this.handleChange(e, opt.value);
          }
        }, _react.default.createElement("input", {
          className: activeClass,
          type: "checkbox",
          value: opt.value,
          key: (0, _uniqueId.default)(),
          name: props.name,
          title: props.title,
          onChange: function onChange(e, v) {
            return _this.handleChange(e, opt.value);
          },
          checked: _this.matchValues(props.value, opt.value),
          disabled: _this.props.disabled,
          readOnly: true
        }), _react.default.createElement("label", {
          className: "gc-input__label gc-input__label--checkbox gc-input__label--checkbox-group",
          htmlFor: props.name
        }, (0, _reactHtmlParser.default)(opt.label)));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props;
      var disabledClass = props.disabled ? 'gc-input--disabled' : '';

      if (props.options.length >= 1) {
        return _react.default.createElement("div", {
          className: "".concat(disabledClass, " ").concat(props.extendedClass)
        }, this.renderCheckboxOpts());
      } else {
        var activeClass = props.value ? 'gc-form__checkbox--checked' : '';
        return _react.default.createElement("div", {
          className: "gc-form__checkbox",
          onClick: function onClick(e, v) {
            return _this2.handleChange(e, !props.value);
          }
        }, _react.default.createElement("input", {
          className: "".concat(activeClass, " ").concat(disabledClass, " ").concat(props.extendedClass, " ").concat(this.props.invalidClass),
          type: "checkbox",
          key: (0, _uniqueId.default)(),
          name: props.name,
          title: props.title,
          checked: props.value,
          onClick: function onClick(e, v) {
            return _this2.handleChange(e, !props.value);
          },
          disabled: this.props.disabled,
          readOnly: true
        }));
      }
    }
  }]);

  return GCCheckbox;
}(_react.Component);

exports.GCCheckbox = GCCheckbox;
GCCheckbox.propTypes = {
  extendedClass: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool, _propTypes.default.array]),
  stateName: _propTypes.default.string.isRequired,
  disabled: _propTypes.default.bool,
  name: _propTypes.default.string,
  onChange: _propTypes.default.func.isRequired,
  customErrorMessage: _propTypes.default.string,
  touchedByParent: _propTypes.default.bool,
  sendResultsToForm: _propTypes.default.func,
  options: _propTypes.default.array,
  title: _propTypes.default.string,
  multiple: _propTypes.default.bool
};
GCCheckbox.defaultProps = {
  extendedClass: '',
  value: null,
  disabled: false,
  name: '',
  customRegex: null,
  customErrorMessage: null,
  touchedByParent: false,
  sendResultsToForm: null,
  options: [],
  title: null,
  multiple: false
};