'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input() {
    _classCallCheck(this, Input);

    return _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));
  }

  _createClass(Input, [{
    key: 'renderRadioOpts',
    value: function renderRadioOpts() {
      var _this2 = this;

      var props = this.props;
      return props.options.map(function (opt) {
        var d = new Date();
        var uid = d.getTime() * 2;
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('input', {
            type: 'radio',
            value: opt.value,
            key: uid,
            name: props.name,
            title: props.title,
            checked: props.value === opt.value,
            onChange: function onChange(e) {
              return _this2.handleChange(e);
            }
          }),
          opt.label
        );
      });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      if (e.target.value === this.props.value && !this.props.required) {
        this.props.onChange("");
      } else {
        this.props.onChange(e.target.value);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      // const invalidClass = this.state.validationMessage ? 'gc-input--invalid' : '';
      var disabledClass = this.props.disabled ? 'gc-input--disabled' : '';
      return _react2.default.createElement(
        'div',
        { className: disabledClass + ' ' + this.props.extendedClass },
        this.renderRadioOpts()
      );
    }
  }]);

  return Input;
}(_react.Component);

Input.propTypes = {
  extendedClass: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
  stateName: _propTypes2.default.string.isRequired,
  disabled: _propTypes2.default.bool,
  name: _propTypes2.default.string,
  onChange: _propTypes2.default.func.isRequired,
  customErrorMessage: _propTypes2.default.string,
  touchedByParent: _propTypes2.default.bool,
  sendResultsToForm: _propTypes2.default.func,
  options: _propTypes2.default.array,
  title: _propTypes2.default.string
};

Input.defaultProps = {
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

exports.default = Input;