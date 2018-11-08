"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GCInputSVG =
/*#__PURE__*/
function (_Component) {
  _inherits(GCInputSVG, _Component);

  function GCInputSVG() {
    _classCallCheck(this, GCInputSVG);

    return _possibleConstructorReturn(this, _getPrototypeOf(GCInputSVG).apply(this, arguments));
  }

  _createClass(GCInputSVG, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          type = _this$props.type,
          className = _this$props.className;

      switch (type) {
        case 'chevronDown':
          return _react.default.createElement("svg", {
            id: "layer_chevronDown",
            className: className,
            style: {
              maxHeight: '50px'
            },
            viewBox: "0 0 50 50"
          }, _react.default.createElement("title", {
            id: type
          }, type), _react.default.createElement("g", {
            id: "chevronDown"
          }, _react.default.createElement("polygon", {
            className: "gc-select__input-icon--fill",
            points: "0 0 25 25 50 0 0 0"
          })));

        case 'chevronUp':
          return _react.default.createElement("svg", {
            id: "layer_chevronUp",
            className: className,
            style: {
              maxHeight: '50px'
            },
            viewBox: "0 0 50 50"
          }, _react.default.createElement("title", {
            id: type
          }, type), _react.default.createElement("g", {
            id: "chevronUp"
          }, _react.default.createElement("polygon", {
            className: "gc-select__input-icon--fill",
            points: "0 25 25 0 50 25 0 25"
          })));

        case 'close':
          return _react.default.createElement("svg", {
            id: "layer_closeUp",
            className: className,
            style: {
              maxHeight: '50px'
            },
            viewBox: "0 0 50 50"
          }, _react.default.createElement("title", {
            id: type
          }, type), _react.default.createElement("g", {
            id: "closeUp"
          }, _react.default.createElement("polygon", {
            className: "gc-select__input-icon--fill",
            points: "M26.074 25L49.778 1.297A.76.76 0 1 0 48.704.223L25 23.925 1.296.223A.76.76 0 1 0 .222 1.297L23.926 25 .222 48.703a.76.76 0 1 0 1.074 1.075L25 26.074l23.704 23.703a.756.756 0 0 0 1.074 0 .76.76 0 0 0 0-1.073L26.074 25z"
          })));
      }
    }
  }]);

  return GCInputSVG;
}(_react.Component);

GCInputSVG.propTypes = {
  className: _propTypes.default.string.isRequired,
  type: _propTypes.default.string.isRequired
};
var _default = GCInputSVG;
exports.default = _default;