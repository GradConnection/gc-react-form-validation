"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GCCustom = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _GCStaticLabel = _interopRequireDefault(require("../Labels/GCStaticLabel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var GCCustom = function GCCustom(_ref) {
  var title = _ref.title,
      name = _ref.name,
      size = _ref.size,
      min = _ref.min,
      max = _ref.max,
      handleInputValidation = _ref.handleInputValidation,
      handleInputChange = _ref.handleInputChange,
      restProps = _objectWithoutProperties(_ref, ["title", "name", "size", "min", "max", "handleInputValidation", "handleInputChange"]);

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_GCStaticLabel.default, {
    title: title,
    htmlFor: name
  }), _react.default.createElement("textarea", _extends({
    name: name,
    className: "gc-input__textarea gc-input__textarea--".concat(size),
    onBlur: function onBlur() {
      return handleInputValidation();
    },
    onChange: function onChange(e) {
      return handleInputChange(e.target.value);
    },
    minLength: min,
    maxLength: max
  }, restProps)));
};

exports.GCCustom = GCCustom;
GCCustom.propTypes = {
  extendedClass: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool, _propTypes.default.array]),
  stateName: _propTypes.default.string.isRequired,
  disabled: _propTypes.default.bool,
  name: _propTypes.default.string,
  onChange: _propTypes.default.func.isRequired,
  customErrorMessage: _propTypes.default.string,
  touchedByParent: _propTypes.default.bool,
  sendResultsToForm: _propTypes.default.func,
  options: _propTypes.default.array,
  title: _propTypes.default.string,
  multiple: _propTypes.default.bool
};
GCCustom.defaultProps = {
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