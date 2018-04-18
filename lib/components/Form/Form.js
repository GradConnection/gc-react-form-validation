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

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _mapValues = require('lodash/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _uniqueId = require('lodash/uniqueId');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _has = require('lodash/has');

var _has2 = _interopRequireDefault(_has);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _reactHtmlParser = require('react-html-parser');

var _reactHtmlParser2 = _interopRequireDefault(_reactHtmlParser);

var _Input = require('../Input/Input');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form(props, context) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props, context));

    _this.state = {
      formSubmitted: false,
      errorMessage: '',
      errorObj: {}
    };
    return _this;
  }

  _createClass(Form, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.disableSubmitButton(this.hasRequiredFields(this.props.data));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.submissionErrorMessages !== this.props.submissionErrorMessages) {
        this.setState({ errorMessage: this.props.submissionErrorMessages });
      }
    }
  }, {
    key: 'hasRequiredFields',
    value: function hasRequiredFields(data) {
      var condition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return true;
      };

      var requiredFields = Object.keys(data).filter(function (d) {
        return (0, _has2.default)(data[d], 'required') && (0, _get2.default)(data[d], 'required') && condition(d);
      });
      return requiredFields.length > 0;
    }
  }, {
    key: 'validateRequiredFields',
    value: function validateRequiredFields(data) {
      var _this2 = this;

      return !this.hasRequiredFields(data, function (d) {
        return _this2.isEmpty(data[d].value);
      });
    }
  }, {
    key: 'allowSubmission',
    value: function allowSubmission(errorObj, data) {
      return Object.keys(errorObj).length === 0 && this.validateRequiredFields(data);
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty(v) {
      return v === '' || v === [] || v === {} || v === undefined || v === null;
    }
  }, {
    key: 'getFields',
    value: function getFields() {
      var _this3 = this;

      var renderTemplate = (0, _mapValues2.default)(this.props.data, function (d) {
        return _react2.default.createElement(_Input2.default, _extends({}, d, {
          autoComplete: d.autoComplete || d.type,
          onChange: _this3.props.handleInputChange,
          sendResultsToForm: function sendResultsToForm(n, r) {
            return _this3.validateForm(n, r);
          },
          inForm: true
        }));
      });

      var hiddenInput = {};
      return renderTemplate;
    }
  }, {
    key: 'getErrorMessages',
    value: function getErrorMessages() {
      if (!this.isEmpty(this.state.errorMessage)) {
        return _react2.default.createElement(
          'div',
          { className: 'gc-form__error-message' },
          _react2.default.createElement(
            'p',
            null,
            (0, _reactHtmlParser2.default)(this.state.errorMessage)
          )
        );
      } else if (!this.isEmpty(this.props.submissionErrorMessages) && this.state.displayErrorMessage) {
        if ((0, _isArray2.default)(this.props.submissionErrorMessages)) {
          var errorList = this.props.submissionErrorMessages.map(function (err) {
            return _react2.default.createElement(
              'li',
              { key: (0, _uniqueId2.default)() },
              (0, _reactHtmlParser2.default)(err)
            );
          });
          return _react2.default.createElement(
            'ul',
            { className: 'gc-form__error-message' },
            errorList
          );
        }
      }
    }
  }, {
    key: 'submitForm',
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
        });
      }
    }
  }, {
    key: 'validateForm',
    value: function validateForm(name, results) {
      var _this5 = this;

      var copiedObj = this.state.errorObj;
      if (!!results) {
        copiedObj[name] = results;
      } else if (!results && (0, _has2.default)(copiedObj, name)) {
        delete copiedObj[name];
      }
      this.setState({ errorObj: copiedObj }, function () {
        _this5.props.disableSubmitButton(!_this5.allowSubmission(_this5.state.errorObj, _this5.props.data));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      return _react2.default.createElement(
        'form',
        {
          ref: this.props.formRef,
          id: this.props.formId,
          className: 'gc-form ' + this.props.extendedClassNames,
          onSubmit: function onSubmit(e) {
            return _this6.submitForm(e);
          }
        },
        this.props.description !== '' && _react2.default.createElement(
          'p',
          null,
          this.props.description
        ),
        this.getErrorMessages(),
        this.props.children({ fields: this.getFields() })
      );
    }
  }]);

  return Form;
}(_react.Component);

Form.propTypes = {
  handleInputChange: _propTypes2.default.func.isRequired,
  formRef: _propTypes2.default.func,
  children: _propTypes2.default.func.isRequired,
  data: _propTypes2.default.object.isRequired,
  onSubmit: _propTypes2.default.func.isRequired,
  description: _propTypes2.default.string,
  submissionErrorMessages: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.string]),
  disableSubmitButton: _propTypes2.default.func
};

Form.defaultProps = {
  description: '',
  submissionErrorMessages: '',
  disableSubmitButton: function disableSubmitButton(isDisabled) {
    return isDisabled;
  }
};

exports.default = Form;