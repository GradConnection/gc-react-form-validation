'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Input$propTypes, _Input$defaultProps;

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

var _GCErrorMessage = require('./GCErrorMessage');

var _GCErrorMessage2 = _interopRequireDefault(_GCErrorMessage);

var _GCDescription = require('./GCDescription');

var _GCDescription2 = _interopRequireDefault(_GCDescription);

var _GCMappedInput = require('./GCMappedInput');

var _GCMappedInput2 = _interopRequireDefault(_GCMappedInput);

var _validateInput = require('./validateInput');

var _validateInput2 = _interopRequireDefault(_validateInput);

var _reactHtmlParser = require('react-html-parser');

var _reactHtmlParser2 = _interopRequireDefault(_reactHtmlParser);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

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
      activeInput: false,
      showTooltip: false,
      showValidationMessage: false
    };
    return _this;
  }

  _createClass(Input, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps.value !== this.props.value || nextProps.isVisible !== this.props.isVisible || nextState.validationMessage !== this.state.validationMessage || nextProps.options !== this.props.options || this.state.tooltip !== nextState.tooltip || this.props.formSubmitted !== nextProps.formSubmitted || this.props.disabled !== nextProps.disabled;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.value !== this.props.value && this.props.hidden || prevProps.value !== this.props.value && this.props.customUI || prevProps.value !== this.props.value && this.props.type === 'radio' || !prevProps.formSubmitted && this.props.formSubmitted || prevProps.required !== this.props.required) {
        this.handleInputValidation();
      }
    }
  }, {
    key: 'handleInputValidation',
    value: async function handleInputValidation(open) {
      var validationObj = Object.assign({ open: open }, this.props);
      var validationMessage = await (0, _validateInput2.default)(validationObj);
      this.setState({
        validationMessage: validationMessage,
        showValidationMessage: !!validationMessage
      });
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
    key: 'getValue',
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
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          type = _props.type,
          extendedClassNames = _props.extendedClassNames,
          description = _props.description,
          customUI = _props.customUI,
          isVisible = _props.isVisible;
      var _state = this.state,
          validationMessage = _state.validationMessage,
          showValidationMessage = _state.showValidationMessage,
          showTooltip = _state.showTooltip;


      var inputClasses = (0, _classnames4.default)('gc-input', 'gc-input--' + type, _defineProperty({
        'gc-input--invalid': showValidationMessage
      }, extendedClassNames, extendedClassNames));

      var customInputClasses = (0, _classnames4.default)('gc-input', 'gc-input--custom', _defineProperty({
        'gc-input--invalid': showValidationMessage
      }, extendedClassNames, extendedClassNames));

      if (isVisible) {
        if (!customUI) {
          // Renders standard layout
          return _react2.default.createElement(
            'div',
            { className: inputClasses },
            description && _react2.default.createElement(_GCDescription2.default, { text: description }),
            showValidationMessage && _react2.default.createElement(_GCErrorMessage2.default, {
              msg: validationMessage }),
            showTooltip && _react2.default.createElement(_GCTooltip2.default, {
              content: this.props.tooltip,
              name: this.props.name,
              active: this.state.tooltip,
              toggleTooltip: function toggleTooltip(active) {
                return _this2.toggleTooltip(active);
              } })
          );
        } else {
          // TODO: Simplify the custom component
          // Renders custom component
          return _react2.default.createElement(
            'div',
            { className: customInputClasses },
            this.props.customComponent(this.props, this.state),
            _react2.default.createElement('input', {
              type: 'hidden',
              value: this.props.value,
              name: this.props.name })
          );
        }
      }
      return null;

      // const { autocomplete } = this.props;
      // const errorMsgClass =
      //   this.props.type === 'checkbox' ? 'gc-input__error-msg--checkbox' : '';
      // if (this.props.isVisible) {
      //   if (this.props.customUI) {
      //     return (
      //       <div
      //         className={`gc-input--custom ${
      //           this.state.validationMessage ? 'gc-input--custom--disabled' : null
      //         } ${this.props.extendedClassNames}`}
      //       >
      //         {this.props.customComponent()}
      //         <input
      //           type="hidden"
      //           value={this.props.value}
      //           name={this.props.name}
      //         />
      //
      //         <GCErrorMessage
      //           msg={this.state.validationMessage}
      //           extendedClassNames={errorMsgClass}
      //         />
      //       </div>
      //     );
      //   } else {
      //     const checkboxSingle =
      //       this.props.type === 'checkbox' && this.props.options.length === 0;
      //     return (
      //       <div
      //         className={`gc-input gc-input--${this.props.type} ${
      //           this.props.extendedClassNames
      //         } ${checkboxSingle ? 'gc-input--checkbox-single' : ''} ${this.props.description !== '' ? 'gc-input--has-description' : ''}`}
      //       >
      //         {this.props.description !== '' && (
      //           <p className="gc-input__description">{this.props.description}</p>
      //         )}
      //         <GCInputLabel
      //           title={this.props.title}
      //           value={this.props.value}
      //           name={this.props.name}
      //           type={this.props.type}
      //           required={this.props.required}
      //           disabled={this.props.loading || this.props.disabled}
      //           hidden={this.props.hidden}
      //           toggleTooltip={active => this.toggleTooltip(active)}
      //           hasTooltip={this.props.tooltip !== ''}
      //           toolTipActive={this.state.tooltip}
      //           options={this.props.options.length > 0}
      //         >
      //           <GCInputRenderer
      //             handleValidation={open => this.handleInputValidation(open)}
      //             handleChange={v => this.handleChange(v)}
      //             validationMessage={this.state.validationMessage}
      //             disabled={this.props.loading || this.props.disabled}
      //             activeInput={this.state.activeInput}
      //             {...this.props}
      //             value={this.getValue()}
      //             allowAll={this.props.allowAll || this.props.defaultAll}
      //             autocomplete={
      //               autocomplete === 'off'
      //                 ? `section-blue ${this.props.type}`
      //                 : autocomplete
      //             }
      //           />
      //         </GCInputLabel>
      //
      //         {this.state.tooltip && (
      //           <GCTooltip
      //             content={this.props.tooltip}
      //             name={this.props.name}
      //             active={this.state.tooltip}
      //             toggleTooltip={active => this.toggleTooltip(active)}
      //           />
      //         )}
      //
      //         <GCErrorMessage msg={this.state.validationMessage} />
      //       </div>
      //     );
      //   }
      // } else if (this.props.hidden) {
      //   return <GCErrorMessage msg={this.state.validationMessage} />;
      // } else {
      //   return null;
      // }
    }
  }]);

  return Input;
}(_react.Component);

Input.propTypes = (_Input$propTypes = {
  description: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
  extendedClassNames: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool, _propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.number]),
  defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool, _propTypes2.default.array]),
  stateName: _propTypes2.default.string.isRequired,
  type: _propTypes2.default.string.isRequired,
  disabled: _propTypes2.default.bool,
  name: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  to: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.number, _propTypes2.default.string]),
  from: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.number, _propTypes2.default.string]),
  max: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.number, _propTypes2.default.string]),
  min: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.number, _propTypes2.default.string]),
  onChange: _propTypes2.default.func.isRequired,
  customRegex: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
  customErrorMessage: _propTypes2.default.string,
  sendResultsToForm: _propTypes2.default.func,
  options: _propTypes2.default.array,
  required: _propTypes2.default.bool,
  inForm: _propTypes2.default.bool,
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
}, _defineProperty(_Input$propTypes, 'tooltip', _propTypes2.default.string), _defineProperty(_Input$propTypes, 'customUI', _propTypes2.default.bool), _defineProperty(_Input$propTypes, 'formSubmitted', _propTypes2.default.bool), _defineProperty(_Input$propTypes, 'customComponent', _propTypes2.default.func), _defineProperty(_Input$propTypes, 'defaultAll', _propTypes2.default.bool), _defineProperty(_Input$propTypes, 'defaultText', _propTypes2.default.string), _Input$propTypes);

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
}, _defineProperty(_Input$defaultProps, 'tooltip', ''), _defineProperty(_Input$defaultProps, 'customUI', false), _defineProperty(_Input$defaultProps, 'formSubmitted', false), _defineProperty(_Input$defaultProps, 'customComponent', null), _defineProperty(_Input$defaultProps, 'defaultText', 'All Options'), _defineProperty(_Input$defaultProps, 'defaultAll', false), _defineProperty(_Input$defaultProps, 'allowAll', false), _Input$defaultProps);

exports.default = Input;