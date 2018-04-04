'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GCTooltip = function (_Component) {
  _inherits(GCTooltip, _Component);

  function GCTooltip(props, context) {
    _classCallCheck(this, GCTooltip);

    var _this = _possibleConstructorReturn(this, (GCTooltip.__proto__ || Object.getPrototypeOf(GCTooltip)).call(this, props, context));

    _this.removeMessage = _this.removeMessage.bind(_this);
    return _this;
  }

  _createClass(GCTooltip, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('click', this.removeMessage);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('click', this.removeMessage);
    }
  }, {
    key: 'toggleMessage',
    value: function toggleMessage() {
      this.props.toggleTooltip(!this.props.active);
    }
  }, {
    key: 'removeMessage',
    value: function removeMessage(e) {
      // console.log(e);
      // if (this.props.active && !this[this.props.name].contains(e.target)) {
      //   this.props.toggleTooltip(false);
      // }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        {
          className: 'gctooltip',
          onClick: function onClick(e) {
            return _this2.toggleMessage(e);
          },
          ref: function ref(tooltip) {
            _this2[_this2.props.name] = tooltip;
          }
        },
        _react2.default.createElement(
          'p',
          { className: 'gctooltip__message' },
          this.props.content
        )
      );
    }
  }]);

  return GCTooltip;
}(_react.Component);

exports.default = GCTooltip;