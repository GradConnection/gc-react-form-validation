"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GCDescription = function GCDescription(_ref) {
  var description = _ref.description;
  return _react.default.createElement("p", {
    className: "gc-description"
  }, description);
};

GCDescription.propTypes = {
  description: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node])
};
var _default = GCDescription;
exports.default = _default;