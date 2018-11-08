"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GCStaticLabel = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GCStaticLabel = function GCStaticLabel(_ref) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? null : _ref$title,
      htmlFor = _ref.htmlFor;
  return !!title && _react.default.createElement("label", {
    className: "gc-input__label gc-input__label--static",
    htmlFor: htmlFor
  }, title);
};

exports.GCStaticLabel = GCStaticLabel;