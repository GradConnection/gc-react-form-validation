'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GCInputLabel;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _reactHtmlParser = require('react-html-parser');

var _reactHtmlParser2 = _interopRequireDefault(_reactHtmlParser);

var _GCIcons = require('./GCIcons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GCInputLabel(_ref) {
  var title = _ref.title,
      required = _ref.required,
      name = _ref.name,
      value = _ref.value,
      type = _ref.type,
      exception = _ref.exception,
      children = _ref.children,
      hasTooltip = _ref.hasTooltip,
      toggleTooltip = _ref.toggleTooltip,
      toolTipActive = _ref.toolTipActive;

  var inlineClass = (0, _isEmpty2.default)(value) ? 'gc-input__label--inline' : '';
  var requiredClass = required ? 'gc-input__label--required' : '';
  var selectClass = exception === 'select' ? 'gc-select__label' : '';
  var floatingLabel = type !== 'radio' && type !== 'date' && type !== 'range' && type !== 'select' && type !== 'textarea' && type !== 'checkbox';
  var staticLabel = type === 'date' || type === 'range' || type === 'textarea';
  if (!(0, _isEmpty2.default)(title) && type !== 'select') {
    if (staticLabel) {
      return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(
          'label',
          {
            className: 'gc-input__label ' + requiredClass + ' ' + selectClass,
            htmlFor: name
          },
          (0, _reactHtmlParser2.default)(title)
        ),
        hasTooltip && _react2.default.createElement(
          'span',
          {
            className: 'gctooltip__icon',
            role: 'button',
            onClick: function onClick() {
              return toggleTooltip(!toolTipActive);
            }
          },
          _react2.default.createElement(_GCIcons.GCIcon, {
            size: '30px',
            kind: 'infoIcon',
            iconTitle: 'tooltip',
            mainFill: '#777'
          })
        ),
        children
      );
    } else if (floatingLabel) {
      return _react2.default.createElement(
        _react.Fragment,
        null,
        children,
        _react2.default.createElement(
          'label',
          {
            className: 'gc-input__label ' + inlineClass + ' ' + requiredClass,
            htmlFor: name
          },
          (0, _reactHtmlParser2.default)(title)
        ),
        hasTooltip && _react2.default.createElement(
          'span',
          {
            className: 'gctooltip__icon',
            role: 'button',
            onClick: function onClick() {
              return toggleTooltip(!toolTipActive);
            }
          },
          _react2.default.createElement(_GCIcons.GCIcon, {
            size: '30px',
            kind: 'infoIcon',
            iconTitle: 'tooltip',
            mainFill: '#777'
          })
        )
      );
    } else if (type === 'checkbox') {
      return _react2.default.createElement(
        _react.Fragment,
        null,
        children,
        _react2.default.createElement(
          'label',
          {
            className: 'gc-input__label gc-input__label--checkbox ' + requiredClass + ' ' + selectClass,
            htmlFor: name
          },
          (0, _reactHtmlParser2.default)(title)
        )
      );
    }
    return children;
  }
}