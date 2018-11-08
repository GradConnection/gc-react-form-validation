"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GCRadio = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = require("lodash");

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

var GCRadio =
/*#__PURE__*/
function (_Component) {
  _inherits(GCRadio, _Component);

  function GCRadio() {
    _classCallCheck(this, GCRadio);

    return _possibleConstructorReturn(this, _getPrototypeOf(GCRadio).apply(this, arguments));
  }

  _createClass(GCRadio, [{
    key: "renderRadioOpts",
    value: function renderRadioOpts() {
      var _this = this;

      var props = this.props;

      if ((0, _lodash.get)(this.props, 'options').length > 0) {
        return props.options.map(function (opt) {
          return _react.default.createElement("label", {
            key: (0, _lodash.uniqueId)(),
            className: "gc-radio__option",
            htmlFor: props.name,
            onClick: function onClick(e) {
              return _this.handleChange(e, opt.value);
            }
          }, _react.default.createElement("span", {
            className: "gc-radio__btn",
            role: "radio"
          }, _react.default.createElement("input", {
            className: "gc-radio__btn-hidden",
            type: "radio",
            value: opt.value,
            name: props.name,
            title: props.title,
            defaultChecked: props.value === opt.value
          }), _react.default.createElement("span", {
            className: "gc-radio__btn-visible"
          })), _react.default.createElement("span", {
            className: "gc-input__label gc-radio__label"
          }, opt.label));
        });
      } else {
        return _react.default.createElement("label", {
          key: (0, _lodash.uniqueId)(),
          className: "gc-radio__option",
          htmlFor: props.name,
          onClick: function onClick(e) {
            return _this.handleChange(e, !props.value);
          }
        }, _react.default.createElement("span", {
          className: "gc-radio__btn",
          role: "radio"
        }, _react.default.createElement("input", {
          className: "gc-radio__btn-hidden",
          type: "radio",
          value: props.value,
          name: props.name,
          title: props.title,
          defaultChecked: props.value
        }), _react.default.createElement("span", {
          className: "gc-radio__btn-visible"
        })), _react.default.createElement("span", {
          className: "gc-input__label gc-radio__label"
        }, props.title));
      }
    }
  }, {
    key: "handleChange",
    value: function () {
      var _handleChange = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(e, value) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();

                if (value === this.props.value && !this.props.required) {
                  this.props.onChange('');
                } else {
                  this.props.onChange(value);
                }

              case 2:
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
    key: "render",
    value: function render() {
      var disabledClass = this.props.disabled ? 'gc-input--disabled' : '';
      return _react.default.createElement("div", {
        className: "".concat(disabledClass, " ").concat(this.props.extendedClass)
      }, this.renderRadioOpts());
    }
  }]);

  return GCRadio;
}(_react.Component);

exports.GCRadio = GCRadio;
GCRadio.propTypes = {
  extendedClass: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool]),
  stateName: _propTypes.default.string.isRequired,
  disabled: _propTypes.default.bool,
  name: _propTypes.default.string,
  onChange: _propTypes.default.func.isRequired,
  customErrorMessage: _propTypes.default.string,
  touchedByParent: _propTypes.default.bool,
  sendResultsToForm: _propTypes.default.func,
  options: _propTypes.default.array,
  title: _propTypes.default.string
};
GCRadio.defaultProps = {
  extendedClass: '',
  value: null,
  disabled: false,
  name: '',
  customRegex: null,
  customErrorMessage: null,
  touchedByParent: false,
  sendResultsToForm: null,
  options: [],
  title: null
};