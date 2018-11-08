"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _validateInput = _interopRequireDefault(require("./validateInput"));

var _GCTooltip = _interopRequireDefault(require("./GCTooltip"));

var _GCErrorMessage = _interopRequireDefault(require("./GCErrorMessage"));

var _GCDescription = _interopRequireDefault(require("./GCDescription"));

var _GCMappedInput = _interopRequireDefault(require("./GCMappedInput"));

var _Input$propTypes, _Input$defaultProps;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var Input =
/*#__PURE__*/
function (_Component) {
  _inherits(Input, _Component);

  function Input(props, context) {
    var _this;

    _classCallCheck(this, Input);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Input).call(this, props, context));
    _this.state = {
      validationMessage: null,
      showTooltip: false,
      showValidationMessage: false
    };
    return _this;
  }

  _createClass(Input, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextState.validationMessage !== this.state.validationMessage || nextState.tooltip !== this.state.tooltip || nextProps.value !== this.props.value || nextProps.hidden !== this.props.hidden || nextProps.options !== this.props.options || nextProps.formSubmitted !== this.props.formSubmitted || nextProps.disabled !== this.props.disabled;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.value !== this.props.value && this.props.hidden || prevProps.value !== this.props.value && this.props.customUI || prevProps.value !== this.props.value && this.props.type === 'radio' || !prevProps.formSubmitted && this.props.formSubmitted || prevProps.required !== this.props.required) {
        this.handleInputValidation();
      }
    }
  }, {
    key: "handleInputValidation",
    value: function () {
      var _handleInputValidation = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(open) {
        var _this$props, onInputValidationFailure, onInputValidationSuccess, validationMessage, isValid;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props = this.props, onInputValidationFailure = _this$props.onInputValidationFailure, onInputValidationSuccess = _this$props.onInputValidationSuccess;
                _context.next = 3;
                return (0, _validateInput.default)(_objectSpread({
                  open: open
                }, this.props));

              case 3:
                validationMessage = _context.sent;
                isValid = !!validationMessage;
                this.setState({
                  validationMessage: validationMessage,
                  showValidationMessage: isValid
                }, function () {
                  isValid ? onInputValidationSuccess() : onInputValidationFailure(validationMessage);
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function handleInputValidation(_x) {
        return _handleInputValidation.apply(this, arguments);
      };
    }()
  }, {
    key: "handleInputChange",
    value: function handleInputChange(v) {
      if (!this.props.disabled || !this.props.loading) {
        this.props.onChange(v, this.props.stateName);
      }
    }
  }, {
    key: "toggleTooltip",
    value: function toggleTooltip(active) {
      this.setState({
        tooltip: active
      });
    }
  }, {
    key: "getValue",
    value: function getValue() {
      if (this.props.defaultAll && this.props.multi && this.props.type === 'select') {
        if (Array.isArray(this.props.value) && this.props.value.length === 0 || this.props.value === '') {
          return this.props.options.map(function (o) {
            return o.value;
          });
        }
      }

      return this.props.value;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          type = _this$props2.type,
          extendedClassNames = _this$props2.extendedClassNames,
          description = _this$props2.description,
          customUI = _this$props2.customUI,
          isVisible = _this$props2.isVisible,
          disabled = _this$props2.disabled;
      var _this$state = this.state,
          validationMessage = _this$state.validationMessage,
          showValidationMessage = _this$state.showValidationMessage,
          showTooltip = _this$state.showTooltip;
      var inputClasses = (0, _classnames3.default)('gc-input', "gc-input--".concat(type), _defineProperty({
        'gc-input--invalid': showValidationMessage,
        'gc-input--disabled': disabled
      }, extendedClassNames, extendedClassNames));
      var customInputClasses = (0, _classnames3.default)('gc-input', 'gc-input--custom', _defineProperty({
        'gc-input--invalid': showValidationMessage,
        'gc-input--disabled': disabled
      }, extendedClassNames, extendedClassNames));

      if (isVisible) {
        if (!customUI) {
          // Renders standard layout
          return _react.default.createElement("div", {
            className: inputClasses
          }, description && _react.default.createElement(_GCDescription.default, {
            text: description
          }), _react.default.createElement(_GCMappedInput.default, _extends({
            handleInputValidation: function handleInputValidation(open) {
              return _this2.handleInputValidation(open);
            },
            handleInputChange: function handleInputChange(v) {
              return _this2.handleInputChange(v);
            }
          }, this.props)), showValidationMessage && _react.default.createElement(_GCErrorMessage.default, {
            msg: validationMessage
          }), showTooltip && _react.default.createElement(_GCTooltip.default, {
            content: this.props.tooltip,
            name: this.props.name,
            active: this.state.tooltip,
            toggleTooltip: function toggleTooltip(active) {
              return _this2.toggleTooltip(active);
            }
          }));
        } else {
          // TODO: Simplify the custom component
          // Renders custom component
          return _react.default.createElement("div", {
            className: customInputClasses
          }, this.props.customComponent(this.props, this.state), _react.default.createElement("input", {
            type: "hidden",
            value: this.props.value,
            name: this.props.name
          }));
        }
      }

      return null;
    }
  }]);

  return Input;
}(_react.Component);

Input.propTypes = (_Input$propTypes = {
  description: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  extendedClassNames: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool, _propTypes.default.array, _propTypes.default.object, _propTypes.default.number]),
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool, _propTypes.default.array]),
  stateName: _propTypes.default.string.isRequired,
  type: _propTypes.default.string.isRequired,
  disabled: _propTypes.default.bool,
  name: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  to: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.number, _propTypes.default.string]),
  from: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.number, _propTypes.default.string]),
  max: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.number, _propTypes.default.string]),
  min: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.number, _propTypes.default.string]),
  onChange: _propTypes.default.func.isRequired,
  customRegex: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  customErrorMessage: _propTypes.default.string,
  sendResultsToForm: _propTypes.default.func,
  options: _propTypes.default.array,
  required: _propTypes.default.bool,
  inForm: _propTypes.default.bool,
  size: _propTypes.default.string,
  title: _propTypes.default.string,
  data: _propTypes.default.object,
  formTemplate: _propTypes.default.func,
  isVisible: _propTypes.default.bool,
  multi: _propTypes.default.bool,
  search: _propTypes.default.bool,
  tooltip: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  autocomplete: _propTypes.default.string,
  loading: _propTypes.default.bool,
  hidden: _propTypes.default.bool
}, _defineProperty(_Input$propTypes, "tooltip", _propTypes.default.string), _defineProperty(_Input$propTypes, "customUI", _propTypes.default.bool), _defineProperty(_Input$propTypes, "formSubmitted", _propTypes.default.bool), _defineProperty(_Input$propTypes, "customComponent", _propTypes.default.func), _defineProperty(_Input$propTypes, "defaultAll", _propTypes.default.bool), _defineProperty(_Input$propTypes, "defaultText", _propTypes.default.string), _Input$propTypes);
Input.defaultProps = (_Input$defaultProps = {
  description: '',
  extendedClassNames: '',
  value: '',
  defaultValue: null,
  disabled: false,
  name: '',
  placeholder: '',
  to: null,
  from: null,
  max: null,
  min: null,
  customRegex: null,
  inForm: false,
  customErrorMessage: null,
  sendResultsToForm: null,
  options: [],
  required: false,
  size: 'medium',
  title: null,
  data: null,
  formTemplate: null,
  isVisible: true,
  multi: false,
  search: true,
  tooltip: null,
  autocomplete: 'off',
  loading: false,
  hidden: false
}, _defineProperty(_Input$defaultProps, "tooltip", ''), _defineProperty(_Input$defaultProps, "customUI", false), _defineProperty(_Input$defaultProps, "formSubmitted", false), _defineProperty(_Input$defaultProps, "customComponent", null), _defineProperty(_Input$defaultProps, "defaultText", 'All Options'), _defineProperty(_Input$defaultProps, "defaultAll", false), _defineProperty(_Input$defaultProps, "allowAll", false), _Input$defaultProps);
var _default = Input;
exports.default = _default;