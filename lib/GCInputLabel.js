"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GCInputLabel;

var _react = _interopRequireWildcard(require("react"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _reactHtmlParser = _interopRequireDefault(require("react-html-parser"));

var _GCIcons = require("./GCIcons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
      toolTipActive = _ref.toolTipActive,
      options = _ref.options;
  var inlineClass = (0, _isEmpty.default)(value) ? 'gc-input__label--inline' : '';
  var requiredClass = required ? 'gc-input__label--required' : '';
  var selectClass = exception === 'select' ? 'gc-select__label' : '';
  var floatingLabel = type !== 'radio' && type !== 'date' && type !== 'range' && type !== 'select' && type !== 'textarea' && type !== 'checkbox';
  var staticLabel = type === 'date' || type === 'range' || type === 'textarea';

  if (!(0, _isEmpty.default)(title) && type !== 'select') {
    if (staticLabel) {
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement("label", {
        className: "gc-input__label ".concat(requiredClass, " ").concat(selectClass),
        htmlFor: name
      }, (0, _reactHtmlParser.default)(title)), hasTooltip && _react.default.createElement("span", {
        className: "gctooltip__icon",
        role: "button",
        onClick: function onClick() {
          return toggleTooltip(!toolTipActive);
        }
      }, _react.default.createElement(_GCIcons.GCIcon, {
        size: "30px",
        kind: "infoIcon",
        iconTitle: "tooltip",
        mainFill: "#777"
      })), children);
    } else if (floatingLabel) {
      return _react.default.createElement(_react.Fragment, null, children, _react.default.createElement("label", {
        className: "gc-input__label ".concat(inlineClass, " ").concat(requiredClass),
        htmlFor: name
      }, (0, _reactHtmlParser.default)(title)), hasTooltip && _react.default.createElement("span", {
        className: "gctooltip__icon",
        role: "button",
        onClick: function onClick() {
          return toggleTooltip(!toolTipActive);
        }
      }, _react.default.createElement(_GCIcons.GCIcon, {
        size: "30px",
        kind: "infoIcon",
        iconTitle: "tooltip",
        mainFill: "#777"
      })));
    } else if (type === 'checkbox') {
      if (!options) {
        return _react.default.createElement(_react.Fragment, null, children, _react.default.createElement("label", {
          className: "gc-input__label gc-input__label--checkbox ".concat(requiredClass, " ").concat(selectClass),
          htmlFor: name
        }, (0, _reactHtmlParser.default)(title)));
      } else {
        return _react.default.createElement(_react.Fragment, null, _react.default.createElement("label", {
          className: "gc-input__label ".concat(requiredClass, " ").concat(selectClass),
          htmlFor: name
        }, (0, _reactHtmlParser.default)(title)), children);
      }
    }

    return children;
  }

  return children;
}