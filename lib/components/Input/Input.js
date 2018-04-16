'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GCInputRenderer = require('./GCInputRenderer');

var _GCInputRenderer2 = _interopRequireDefault(_GCInputRenderer);

var _GCInputLabel = require('./GCInputLabel');

var _GCInputLabel2 = _interopRequireDefault(_GCInputLabel);

var _GCTooltip = require('./GCTooltip');

var _GCTooltip2 = _interopRequireDefault(_GCTooltip);

var _validateInput2 = require('./validateInput');

var _validateInput3 = _interopRequireDefault(_validateInput2);

var _reactHtmlParser = require('react-html-parser');

var _reactHtmlParser2 = _interopRequireDefault(_reactHtmlParser);

var _has = require('lodash/has');

var _has2 = _interopRequireDefault(_has);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input(props, context) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props, context));

    _this.state = {
      validationMessage: null,
      touchedByParent: props.touchedByParent,
      activeInput: false,
      tooltip: false
    };
    return _this;
  }

  _createClass(Input, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (nextProps.touchedByParent && this.props.touchedByParent !== nextProps.touchedByParent) {
        this.setState({ touchedByParent: true }, function () {
          console.log('touched');
          _this2.validateInput();
        });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps.value !== this.props.value || nextProps.touchedByParent !== this.props.touchedByParent || nextProps.isVisible != this.props.isVisible || nextState.validationMessage !== this.state.validationMessage || nextProps.options !== this.props.options || this.state.tooltip !== nextState.tooltip;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!this.props.touchedByParent && this.props.type === 'checkbox' || !this.props.touchedByParent && this.props.type === 'radio' || prevProps.value !== this.props.value && this.props.hidden || prevProps.value !== this.props.value && this.props.type === 'custom' || prevProps.value !== this.props.value && this.props.type === 'hidden') {
        this.validateInput();
      }
    }
  }, {
    key: 'validateInput',
    value: function validateInput(open) {
      var validationObj = Object.assign({ open: open, touchedByParent: this.state.touchedByParent }, this.props);
      var validationState = (0, _validateInput3.default)(validationObj);
      this.setState(validationState);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(v) {
      if (!this.props.disabled || !this.props.loading) {
        this.props.onChange(v, this.props.stateName);
      }
    }
  }, {
    key: 'toggleTooltip',
    value: function toggleTooltip(active) {
      this.setState({ tooltip: active });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      console.log('Input rendered: ', this.props.name);
      var errorMsgClass = this.props.type === 'checkbox' ? 'gc-input__error-msg--checkbox' : '';
      if (this.props.isVisible) {
        return _react2.default.createElement(
          'div',
          {
            className: 'gc-input gc-input--' + this.props.type + ' ' + this.props.extendedClassNames
          },
          _react2.default.createElement(
            _GCInputLabel2.default,
            {
              title: this.props.title,
              value: this.props.value,
              name: this.props.name,
              type: this.props.type,
              required: this.props.required,
              disabled: this.props.loading || this.props.disabled,
              hidden: this.props.hidden,
              toggleTooltip: function toggleTooltip(active) {
                return _this3.toggleTooltip(active);
              },
              hasTooltip: this.props.tooltip !== '',
              toolTipActive: this.state.tooltip
            },
            _react2.default.createElement(_GCInputRenderer2.default, _extends({
              validateInput: function validateInput(open) {
                return _this3.validateInput(open);
              },
              handleChange: function handleChange(v) {
                return _this3.handleChange(v);
              },
              validationMessage: this.state.validationMessage,
              disabled: this.props.loading || this.props.disabled,
              autocomplete: this.props.type,
              activeInput: this.state.activeInput
            }, this.props))
          ),
          this.state.tooltip && _react2.default.createElement(_GCTooltip2.default, {
            content: this.props.tooltip,
            name: this.props.name,
            active: this.state.tooltip,
            toggleTooltip: function toggleTooltip(active) {
              return _this3.toggleTooltip(active);
            }
          }),
          this.state.validationMessage && _react2.default.createElement(
            'p',
            { className: 'gc-input__error-msg ' + errorMsgClass },
            (0, _reactHtmlParser2.default)(this.state.validationMessage)
          )
        );
      } else if (this.state.validationMessage && this.props.hidden) {
        return _react2.default.createElement(
          'p',
          { className: 'gc-input__error-msg ' + errorMsgClass },
          (0, _reactHtmlParser2.default)(this.state.validationMessage)
        );
      } else {
        return null;
      }
    }
  }]);

  return Input;
}(_react.Component);

Input.propTypes = _defineProperty({
  extendedClassNames: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool, _propTypes2.default.array]),
  defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool, _propTypes2.default.array]),
  stateName: _propTypes2.default.string.isRequired,
  type: _propTypes2.default.string.isRequired,
  disabled: _propTypes2.default.bool,
  name: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  to: _propTypes2.default.object,
  from: _propTypes2.default.object,
  max: _propTypes2.default.number,
  min: _propTypes2.default.number,
  onChange: _propTypes2.default.func.isRequired,
  customRegex: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
  customErrorMessage: _propTypes2.default.string,
  touchedByParent: _propTypes2.default.bool,
  sendResultsToForm: _propTypes2.default.func,
  options: _propTypes2.default.array,
  required: _propTypes2.default.bool,
  size: _propTypes2.default.string,
  title: _propTypes2.default.string,
  data: _propTypes2.default.object,
  formTemplate: _propTypes2.default.func,
  isVisible: _propTypes2.default.bool,
  multi: _propTypes2.default.bool,
  search: _propTypes2.default.bool,
  tooltip: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
  autocomplete: _propTypes2.default.string,
  loading: _propTypes2.default.bool,
  hidden: _propTypes2.default.bool
}, 'tooltip', _propTypes2.default.string);

Input.defaultProps = _defineProperty({
  extendedClassNames: '',
  value: null,
  defaultValue: null,
  disabled: false,
  name: '',
  placeholder: '',
  to: null,
  from: null,
  max: null,
  min: null,
  customRegex: null,
  customErrorMessage: null,
  touchedByParent: false,
  sendResultsToForm: null,
  options: [],
  required: false,
  size: 'medium',
  title: null,
  data: null,
  formTemplate: null,
  isVisible: true,
  multi: false,
  search: false,
  tooltip: null,
  autocomplete: '',
  loading: false,
  hidden: false
}, 'tooltip', '');

exports.default = Input;