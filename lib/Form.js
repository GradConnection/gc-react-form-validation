"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _isArray = _interopRequireDefault(require("lodash/isArray"));

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _uniqueId = _interopRequireDefault(require("lodash/uniqueId"));

var _has = _interopRequireDefault(require("lodash/has"));

var _get = _interopRequireDefault(require("lodash/get"));

var _reactHtmlParser = _interopRequireDefault(require("react-html-parser"));

var _Input = _interopRequireDefault(require("../Input/Input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Form =
/*#__PURE__*/
function (_Component) {
  _inherits(Form, _Component);

  function Form(props, context) {
    var _this;

    _classCallCheck(this, Form);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Form).call(this, props, context));
    _this.state = {
      formSubmitted: false,
      errorMessage: '',
      errorObj: {}
    };
    return _this;
  }

  _createClass(Form, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.disableSubmitButton(this.hasRequiredFields(this.props.data));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.submissionErrorMessages !== this.props.submissionErrorMessages) {
        this.setState({
          errorMessage: this.props.submissionErrorMessages
        });
      }
    }
  }, {
    key: "hasRequiredFields",
    value: function hasRequiredFields(data) {
      var condition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return true;
      };
      var requiredFields = Object.keys(data).filter(function (d) {
        return (0, _has.default)(data[d], 'required') && (0, _get.default)(data[d], 'required') && (0, _has.default)(data[d], 'isVisible') && (0, _get.default)(data[d], 'isVisible') && condition(d) || (0, _has.default)(data[d], 'required') && (0, _get.default)(data[d], 'required') && !(0, _has.default)(data[d], 'isVisible') && condition(d);
      });
      return requiredFields.length > 0;
    }
  }, {
    key: "validateRequiredFields",
    value: function validateRequiredFields(data) {
      var _this2 = this;

      return !this.hasRequiredFields(data, function (d) {
        if (data[d].type === 'checkbox' && data[d].options === undefined) {
          return !data[d].value;
        } else {
          return _this2.isEmpty(data[d].value);
        }
      });
    }
  }, {
    key: "allowSubmission",
    value: function allowSubmission(errorObj, data) {
      return Object.keys(errorObj).length === 0 && this.validateRequiredFields(data);
    }
  }, {
    key: "isEmpty",
    value: function isEmpty(v) {
      return v === '' || v === [] || v === {} || v === undefined || v === null;
    }
  }, {
    key: "getFields",
    value: function getFields() {
      var _this3 = this;

      var renderTemplate = (0, _mapValues.default)(this.props.data, function (d) {
        return _react.default.createElement(_Input.default, _extends({}, d, {
          autoComplete: d.autoComplete || d.type,
          onChange: _this3.props.handleInputChange,
          sendResultsToForm: function sendResultsToForm(n, r) {
            return _this3.validateForm(n, r);
          },
          inForm: true,
          formSubmitted: _this3.state.formSubmitted,
          translations: _this3.props.translations
        }));
      });
      var hiddenInput = {};
      return renderTemplate;
    }
  }, {
    key: "getErrorMessages",
    value: function getErrorMessages() {
      if (!this.state.errorMessage === '') {
        return _react.default.createElement("div", {
          className: "gc-form__error-message"
        }, _react.default.createElement("p", null, (0, _reactHtmlParser.default)(this.state.errorMessage)));
      } else if (!this.isEmpty(this.props.submissionErrorMessages) && this.state.displayErrorMessage) {
        if ((0, _isArray.default)(this.props.submissionErrorMessages)) {
          var errorList = this.props.submissionErrorMessages.map(function (err) {
            return _react.default.createElement("li", {
              key: (0, _uniqueId.default)()
            }, (0, _reactHtmlParser.default)(err));
          });
          return _react.default.createElement("ul", {
            className: "gc-form__error-message"
          }, errorList);
        } else {
          return _react.default.createElement("div", {
            className: "gc-form__error-message"
          }, _react.default.createElement("p", null, (0, _reactHtmlParser.default)(this.props.submissionErrorMessages)));
        }
      }

      return null;
    }
  }, {
    key: "submitForm",
    value: function submitForm(e) {
      var _this4 = this;

      e.preventDefault();
      e.stopPropagation();

      if (this.allowSubmission(this.state.errorObj, this.props.data)) {
        this.setState({
          formSubmitted: true,
          displayErrorMessage: true,
          errorMessage: '',
          errorObj: {}
        }, function () {
          return _this4.props.onSubmit(_this4.state.errorObj);
        });
      } else {
        this.setState({
          formSubmitted: true,
          displayErrorMessage: true,
          errorMessage: 'Please make sure that you have filled in the fields correctly'
        }, function () {
          if (_this4.props.onFormValidationFailure) {
            _this4.props.onSubmit(_this4.state.errorObj);
          }
        });
      }
    }
  }, {
    key: "validateForm",
    value: function validateForm(name, results) {
      var _this5 = this;

      var copiedObj = this.state.errorObj;

      if (results) {
        copiedObj[name] = results;
      } else if (!results && (0, _has.default)(copiedObj, name)) {
        delete copiedObj[name];
      }

      this.setState({
        errorObj: copiedObj
      }, function () {
        _this5.props.disableSubmitButton(!_this5.allowSubmission(_this5.state.errorObj, _this5.props.data));

        _this5.props.handleFormErrors(_this5.state.errorObj);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      return _react.default.createElement("form", {
        ref: this.props.formRef,
        id: this.props.formId,
        className: "gc-form ".concat(this.props.extendedClassNames),
        onSubmit: function onSubmit(e) {
          return _this6.submitForm(e);
        }
      }, this.props.description !== '' && _react.default.createElement("p", null, this.props.description), this.getErrorMessages(), this.props.children({
        fields: this.getFields()
      }));
    }
  }]);

  return Form;
}(_react.Component);

Form.propTypes = {
  handleInputChange: _propTypes.default.func.isRequired,
  formRef: _propTypes.default.func,
  children: _propTypes.default.func.isRequired,
  data: _propTypes.default.object.isRequired,
  onSubmit: _propTypes.default.func.isRequired,
  description: _propTypes.default.string,
  submissionErrorMessages: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.string]),
  disableSubmitButton: _propTypes.default.func,
  handleFormErrors: _propTypes.default.func,
  onFormValidationFailure: _propTypes.default.bool,
  // For troubleshooting
  translations: _propTypes.default.object
};
Form.defaultProps = {
  description: '',
  submissionErrorMessages: '',
  disableSubmitButton: function disableSubmitButton(isDisabled) {
    return isDisabled;
  },
  handleFormErrors: function handleFormErrors() {
    return {};
  },
  onFormValidationFailure: false,
  translations: {}
};
var _default = Form;
exports.default = _default;