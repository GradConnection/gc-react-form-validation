'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _uniqueId = require('lodash/uniqueId');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _GCInputLabel = require('./GCInputLabel');

var _GCInputLabel2 = _interopRequireDefault(_GCInputLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GCCheckbox = function (_Component) {
  _inherits(GCCheckbox, _Component);

  function GCCheckbox() {
    _classCallCheck(this, GCCheckbox);

    return _possibleConstructorReturn(this, (GCCheckbox.__proto__ || Object.getPrototypeOf(GCCheckbox)).apply(this, arguments));
  }

  _createClass(GCCheckbox, [{
    key: 'matchValues',
    value: function matchValues(arr, value) {
      if (this.props.options.length === 0) {
        return this.props.value;
      }
      return arr.includes(value);
    }
  }, {
    key: 'removeFromArray',
    value: function removeFromArray(arr, item) {
      var index = arr.findIndex(function (el) {
        return item === el;
      });
      arr.splice(index, 1);
      return arr;
    }
  }, {
    key: 'convertToArray',
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
    key: 'handleChange',
    value: async function handleChange(e, value) {
      e.preventDefault();
      var props = this.props;
      if (props.options.length === 0) {
        await this.props.onChange(!props.value);
        this.props.validate();
      } else {
        var selectedValue = value;
        var prevValue = typeof props.value === 'string' ? this.convertToArray(props.value) : props.value.map(function (i) {
          return i;
        });
        var newArray = prevValue;

        if (prevValue.includes(selectedValue)) {
          newArray = this.removeFromArray(prevValue, selectedValue);
        } else {
          newArray.push(selectedValue);
        }
        this.props.onChange(newArray);
      }
    }
  }, {
    key: 'renderCheckboxOpts',
    value: function renderCheckboxOpts() {
      var _this2 = this;

      var props = this.props;
      // TODO: Add disabledClass
      return props.options.map(function (opt, i) {
        var activeClass = _this2.matchValues(props.value, opt.value) ? 'gc-form__checkbox--checked' : '';
        return _react2.default.createElement(
          'div',
          {
            className: 'gc-form__checkbox',
            onClick: function onClick(e, v) {
              return _this2.handleChange(e, opt.value);
            }
          },
          _react2.default.createElement('input', {
            className: activeClass,
            type: 'checkbox',
            value: opt.value,
            key: (0, _uniqueId2.default)(),
            name: props.name,
            title: props.title,
            onChange: function onChange(e, v) {
              return _this2.handleChange(e, opt.value);
            },
            checked: _this2.matchValues(props.value, opt.value),
            disabled: _this2.props.disabled,
            readOnly: true
          }),
          _react2.default.createElement(
            'label',
            {
              className: 'gc-input__label gc-input__label--checkbox gc-input__label--checkbox-group',
              htmlFor: props.name
            },
            opt.label
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var props = this.props;
      var disabledClass = props.disabled ? 'gc-input--disabled' : '';
      if (props.options.length >= 1) {
        return _react2.default.createElement(
          'div',
          { className: disabledClass + ' ' + props.extendedClass },
          this.renderCheckboxOpts()
        );
      } else {
        var activeClass = props.value ? 'gc-form__checkbox--checked' : '';
        return _react2.default.createElement(
          'div',
          {
            className: 'gc-form__checkbox',
            onClick: function onClick(e, v) {
              return _this3.handleChange(e, !props.value);
            }
          },
          _react2.default.createElement('input', {
            className: activeClass + ' ' + disabledClass + ' ' + props.extendedClass + ' ' + this.props.invalidClass,
            type: 'checkbox',
            key: (0, _uniqueId2.default)(),
            name: props.name,
            title: props.title,
            checked: props.value,
            onClick: function onClick(e, v) {
              return _this3.handleChange(e, !props.value);
            },
            disabled: this.props.disabled,
            readOnly: true
          })
        );
      }
    }
  }]);

  return GCCheckbox;
}(_react.Component);

GCCheckbox.propTypes = {
  extendedClass: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool, _propTypes2.default.array]),
  stateName: _propTypes2.default.string.isRequired,
  disabled: _propTypes2.default.bool,
  name: _propTypes2.default.string,
  onChange: _propTypes2.default.func.isRequired,
  customErrorMessage: _propTypes2.default.string,
  touchedByParent: _propTypes2.default.bool,
  sendResultsToForm: _propTypes2.default.func,
  options: _propTypes2.default.array,
  title: _propTypes2.default.string,
  multiple: _propTypes2.default.bool
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

exports.default = GCCheckbox;