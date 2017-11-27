'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GCInputRenderer = require('./GCInputRenderer');

var _GCInputRenderer2 = _interopRequireDefault(_GCInputRenderer);

var _GCRadio = require('./GCRadio');

var _GCRadio2 = _interopRequireDefault(_GCRadio);

var _GCCheckbox = require('./GCCheckbox');

var _GCCheckbox2 = _interopRequireDefault(_GCCheckbox);

var _GCSelect = require('./GCSelect');

var _GCSelect2 = _interopRequireDefault(_GCSelect);

var _GCMultiSelect = require('./GCMultiSelect');

var _GCMultiSelect2 = _interopRequireDefault(_GCMultiSelect);

var _GCInputLabel = require('./GCInputLabel');

var _GCInputLabel2 = _interopRequireDefault(_GCInputLabel);

var _reactHtmlParser = require('react-html-parser');

var _reactHtmlParser2 = _interopRequireDefault(_reactHtmlParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      touchedByParent: props.touchedByParent
    };
    return _this;
  }

  _createClass(Input, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (nextProps.touchedByParent && this.props.touchedByParent !== nextProps.touchedByParent) {
        this.setState({ touchedByParent: true }, function () {
          _this2.validateInput();
        });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps.value !== this.props.value || nextProps.touchedByParent !== this.props.touchedByParent || nextProps.isVisible != this.props.isVisible || nextState.validationMessage !== this.state.validationMessage || nextProps.options !== this.props.options;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (!this.props.touchedByParent && this.props.type === 'checkbox' || !this.props.touchedByParent && this.props.type === 'radio') {
        this.validateInput();
      }
    }
  }, {
    key: 'validateEmail',
    value: function validateEmail(value) {
      var pattern = this.handleRegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      var valid = pattern.test(value);
      return this.handleErrorMessage(valid, 'The email address you have entered is not valid');
    }
  }, {
    key: 'validateName',
    value: function validateName(value) {
      var pattern = this.handleRegExp(/\d/);
      var maxL = this.props.maxLength;
      var valid = void 0;

      if (maxL && value.length < maxL || !maxL) {
        valid = pattern.test(value);
        if (!this.props.customRegex) {
          valid = !valid;
        }
        return this.handleErrorMessage(valid);
      } else {
        return this.handleErrorMessage(valid, 'May not contain more than ' + maxL + ' characters');
      }
    }
  }, {
    key: 'validateText',
    value: function validateText(value) {
      var pattern = this.handleRegExp('');
      var maxL = this.props.maxLength;
      var valid = void 0;

      if (maxL && value.length < maxL || !maxL) {
        valid = pattern.test(value);
        if (!this.props.customRegex) {
          valid = !valid;
        }
        return this.handleErrorMessage(valid);
      } else {
        return this.handleErrorMessage(valid, 'May not contain more than ' + maxL + ' characters');
      }
    }
  }, {
    key: 'validateUrl',
    value: function validateUrl(value) {
      var usableUrl = '';
      if (/^(https:\/\/|http:\/\/)/.test(value)) {
        usableUrl = value;
      } else {
        usableUrl = 'https:// ' + value;
      }
      var valid = /[.]+/.test(usableUrl);
      return this.handleErrorMessage(valid, 'Url is not valid');
    }
  }, {
    key: 'validateTextarea',
    value: function validateTextarea(value) {
      var pattern = this.handleRegExp('');
      var minL = this.props.minLength;
      var maxL = this.props.maxLength;
      var valid = void 0;
      if (minL && value.length < minL) {
        return this.handleErrorMessage(valid, 'May not contain less than ' + minL + ' characters');
      } else if (maxL && value.length > maxL) {
        return this.handleErrorMessage(valid, 'May not contain more than ' + maxL + ' characters');
      } else {
        valid = pattern.test(value);
        return this.handleErrorMessage(valid);
      }
    }
  }, {
    key: 'validatePassword',
    value: function validatePassword(value) {
      var min = this.props.minLength && this.props.minLength !== 0 ? this.props.minLength : 8;
      var pattern = this.handleRegExp('');
      if (value.length < min) {
        return this.handleErrorMessage(false, 'Password needs to have more than ' + min + ' characters', true);
      } else if (!pattern.test(value)) {
        return this.handleErrorMessage(false);
      }
    }
  }, {
    key: 'validateDate',
    value: function validateDate(value) {
      var selectedDate = new Date(value);
      var min = void 0,
          max = void 0;

      if (this.props.maxDate !== null && this.props.minDate !== null) {
        max = new Date(this.props.maxDate);
        min = new Date(this.props.minDate);
        return this.handleErrorMessage(min <= selectedDate && max >= selectedDate, 'Please select a date between ' + min.toDateString() + ' and ' + max.toDateString());
      } else if (this.props.minDate !== null) {
        min = new Date(this.props.minDate);
        return this.handleErrorMessage(min <= selectedDate, 'Please select a date after ' + min.toDateString());
      } else if (this.props.maxDate !== null) {
        max = new Date(this.props.maxDate);
        return this.handleErrorMessage(max >= selectedDate, 'Please select a date before ' + max.toDateString());
      }
    }
  }, {
    key: 'validateNumber',
    value: function validateNumber(value) {
      var min = this.props.min;
      var max = this.props.max;
      var res = '';
      if (min && min > value) {
        res = this.handleErrorMessage(false, 'Number must be higher than ' + min + '.');
      } else if (max && max < value) {
        res = this.handleErrorMessage(false, 'Number must be lower than ' + max);
      }
      return res;
    }
  }, {
    key: 'validateCheckbox',
    value: function validateCheckbox(value) {
      var res = null;

      if (this.props.options.length > 0) {
        var minL = this.props.minLength;
        var maxL = this.props.maxLength;
        if (minL && minL > value.length) {
          res = 'Please select more than ' + minL + ' options';
        } else if (maxL && maxL < value.length) {
          res = 'Please select less than ' + maxL + ' options';
        }
      }
      return res;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty(v) {
      return v === null || v === undefined || typeof v === 'string' && v !== '' || (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object' && v.length > 0 || typeof v === 'boolean' && v && this.props.required;
    }
  }, {
    key: 'validateInput',
    value: function validateInput() {
      var props = this.props;
      var error = null;
      if (this.isEmpty(props.value) && props.isVisible) {
        switch (props.type) {
          case 'email':
            error = this.validateEmail(props.value);
            break;
          case 'password':
            error = this.validatePassword(props.value);
            break;
          case 'name':
            error = this.validateName(props.value);
            break;
          case 'text':
            error = this.validateText(props.value);
            break;
          case 'date':
            error = this.validateDate(props.value);
            break;
          case 'number':
            error = this.validateNumber(props.value);
            break;
          case 'textarea':
            error = this.validateTextarea(props.value);
          case 'checkbox':
            error = this.validateCheckbox(props.value);
            break;
          case 'url':
            error = this.validateUrl(props.value);
            break;
          case 'range':
          default:
            error = null;
            break;
        }
      } else if (props.required && props.isVisible) {
        error = 'This field is required';
      }

      if (this.state.touchedByParent) {
        this.props.sendResultsToForm(!error);
      }
      this.setState({
        validationMessage: error,
        touchedByParent: false
      });
    }
  }, {
    key: 'handleErrorMessage',
    value: function handleErrorMessage(v) {
      var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Invalid Input';
      var ignoreCustom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!v) {
        return this.props.customErrorMessage && !ignoreCustom ? this.props.customErrorMessage : msg;
      }
      return null;
    }
  }, {
    key: 'handleRegExp',
    value: function handleRegExp(regX) {
      if (this.props.customRegex) {
        var cleanPattern = this.props.customRegex;
        if (typeof this.props.customRegex === 'string' && this.props.customRegex.match(/^\//) && this.props.customRegex.match(/\/$/)) {
          cleanPattern = this.props.customRegex.slice(1, -1);
        }
        return new RegExp(cleanPattern);
      }
      return new RegExp(regX);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(v) {
      if (!this.props.disabled) {
        this.props.onChange(v, this.props.stateName);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var errorMsgClass = this.props.type === 'checkbox' ? 'gc-input__error-msg--checkbox' : '';
      if (this.props.isVisible) {
        return _react2.default.createElement(
          'div',
          { className: 'gc-input ' + this.props.extendedClassNames },
          _react2.default.createElement(
            _GCInputLabel2.default,
            {
              title: this.props.title,
              value: this.props.value,
              name: this.props.name,
              type: this.props.type,
              required: this.props.required },
            _react2.default.createElement(_GCInputRenderer2.default, _extends({
              validateInput: function validateInput() {
                return _this3.validateInput();
              },
              handleChange: function handleChange(v) {
                return _this3.handleChange(v);
              },
              validationMessage: this.state.validationMessage
            }, this.props))
          ),
          this.state.validationMessage && _react2.default.createElement(
            'p',
            { className: 'gc-input__error-msg ' + errorMsgClass },
            (0, _reactHtmlParser2.default)(this.state.validationMessage)
          )
        );
      } else {
        return _react2.default.createElement(
          'span',
          null,
          '\xA0'
        );
      }
    }
  }]);

  return Input;
}(_react.Component);

Input.propTypes = {
  extendedClassNames: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool, _propTypes2.default.array]),
  defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool, _propTypes2.default.array]),
  stateName: _propTypes2.default.string.isRequired,
  type: _propTypes2.default.string.isRequired,
  disabled: _propTypes2.default.bool,
  name: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  maxLength: _propTypes2.default.number,
  minLength: _propTypes2.default.number,
  maxDate: _propTypes2.default.object,
  minDate: _propTypes2.default.object,
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
  search: _propTypes2.default.bool
};

Input.defaultProps = {
  extendedClassNames: '',
  value: null,
  defaultValue: null,
  disabled: false,
  name: '',
  placeholder: '',
  maxLength: null,
  minLength: null,
  maxDate: null,
  minDate: null,
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
  search: false
};

exports.default = Input;