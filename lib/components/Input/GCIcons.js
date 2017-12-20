'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GCIcon = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GCIcon = exports.GCIcon = function (_React$Component) {
  _inherits(GCIcon, _React$Component);

  function GCIcon() {
    _classCallCheck(this, GCIcon);

    return _possibleConstructorReturn(this, (GCIcon.__proto__ || Object.getPrototypeOf(GCIcon)).apply(this, arguments));
  }

  _createClass(GCIcon, [{
    key: 'renderIcon',
    value: function renderIcon(kind) {
      var _props = this.props,
          mainFill = _props.mainFill,
          width = _props.width,
          height = _props.height,
          size = _props.size,
          iconTitle = _props.iconTitle;


      switch (kind) {
        default:
          return null;
        case 'cloudIcon':
          return _react2.default.createElement(
            'svg',
            {
              id: 'layer_cloudIcon',
              height: height || size,
              width: width || size,
              viewBox: '0 0 32 32',
              'aria-labelledby': iconTitle
            },
            _react2.default.createElement(
              'title',
              { id: iconTitle },
              iconTitle
            ),
            _react2.default.createElement(
              'g',
              { id: 'cloudIcon' },
              _react2.default.createElement('path', {
                fill: mainFill,
                d: 'M27.5,12.1c0-0.3,0-0.6,0-0.9c-0.3-2.9-2.9-5.1-5.8-4.8c-1,0.1-1.9,0.4-2.7,1c-1.5-1.7-3.7-2.7-6-2.8 c-4.2,0-7.7,3.1-8.2,7.3c-2.2,0.6-3.8,2.7-3.8,5v0.2c0,3.1,2.5,5.5,5.5,5.5h2.8l-0.1-0.1l0,0l0,0c-0.5-0.5-0.9-1.2-1-1.9H6.5 c-1.9,0-3.5-1.6-3.5-3.5c0-0.1,0-0.1,0-0.2v-0.1c0-1.6,1.3-3,2.9-3.2l0.8-0.1v-0.8C6.8,9.3,9.6,6.6,13,6.6c2,0,3.9,1.1,5,2.8 l0.7,1.1l0.9-1c1.2-1.4,3.3-1.6,4.7-0.4c0.7,0.6,1.1,1.4,1.2,2.3c0,0.4,0,0.8-0.1,1.1l-0.3,1l1,0.2c1.7,0.3,2.9,1.7,2.9,3.4 c0,1.9-1.6,3.5-3.5,3.5h0h-1.7c-0.2,0.7-0.5,1.3-1,1.8l-0.1,0l0,0.1l-0.1,0.1h2.8c3.1,0,5.6-2.5,5.6-5.5c0,0,0,0,0,0 C31,14.9,29.6,12.9,27.5,12.1z'
              }),
              _react2.default.createElement('path', {
                fill: mainFill,
                d: 'M20.7,20.4c-0.2,0.1-0.4,0.2-0.6,0.2c-0.2,0-0.4-0.1-0.6-0.2l-2.7-2.7v8.4c0,0.4-0.4,0.8-0.8,0.8c-0.5,0-0.8-0.4-0.8-0.8 v-8.4l-2.7,2.7c-0.2,0.1-0.4,0.2-0.6,0.2c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l2.1-2.1l2-2c0.1-0.1,0.2-0.1,0.3-0.2 c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0.1,0.3,0.2l4.1,4.1C21,19.6,21,20.1,20.7,20.4z'
              })
            )
          );
        case 'ZoomInIcon':
          return _react2.default.createElement(
            'svg',
            {
              id: 'layer_zoomInIcon',
              height: height || size,
              width: width || size,
              viewBox: '0 0 24 24',
              ariaLabelledby: iconTitle
            },
            _react2.default.createElement(
              'title',
              { id: iconTitle },
              iconTitle
            ),
            _react2.default.createElement(
              'g',
              { id: 'zoomInIcon' },
              _react2.default.createElement('path', {
                fill: mainFill,
                d: 'M24,21.7l-5.2-5.2c3.4-4.7,2.3-11.2-2.3-14.5S5.3-0.4,1.9,4.2s-2.3,11.2,2.3,14.5c3.6,2.6,8.6,2.6,12.2,0l5.2,5.2L24,21.7 z M10.4,17.4c-3.9,0-7.1-3.2-7.1-7.1c0-3.9,3.2-7.1,7.1-7.1c3.9,0,7.1,3.2,7.1,7.1C17.4,14.3,14.3,17.4,10.4,17.4z'
              }),
              _react2.default.createElement('path', {
                fill: mainFill,
                d: 'M15.2,10.6c-0.1,0.5-0.6,0.9-1.2,0.9h-2.5v2.6c0,0.6-0.5,1.2-1.2,1.2c-0.5,0-0.9-0.3-1.1-0.7c-0.1-0.1-0.1-0.3-0.1-0.4 v-2.6H6.6c-0.6,0-1.1-0.4-1.2-0.9C5.3,10,5.7,9.4,6.3,9.2c0.1,0,0.2,0,0.3,0h2.6V6.6c0-0.1,0-0.3,0.1-0.4C9.3,6,9.5,5.8,9.7,5.6 c0.2-0.1,0.4-0.2,0.6-0.2h0.1h0.1c0.6,0.1,0.9,0.6,0.9,1.2v2.5h2.6c0.6,0,1.2,0.5,1.2,1.2C15.2,10.5,15.2,10.6,15.2,10.6z'
              })
            )
          );
        case 'ZoomOutIcon':
          return _react2.default.createElement(
            'svg',
            {
              id: 'layer_zoomOutIcon',
              height: height || size,
              width: width || size,
              viewBox: '0 0 24 24',
              ariaLabelledby: iconTitle
            },
            _react2.default.createElement(
              'title',
              { id: iconTitle },
              iconTitle
            ),
            _react2.default.createElement(
              'g',
              { id: 'zoomOutIcon' },
              _react2.default.createElement('path', {
                fill: mainFill,
                d: 'M24,21.7l-5.2-5.2c3.4-4.7,2.3-11.2-2.3-14.5S5.3-0.4,1.9,4.2s-2.3,11.2,2.3,14.5c3.6,2.6,8.6,2.6,12.2,0l5.2,5.2L24,21.7 z M10.4,17.4c-3.9,0-7.1-3.2-7.1-7.1c0-3.9,3.2-7.1,7.1-7.1c3.9,0,7.1,3.2,7.1,7.1C17.4,14.3,14.3,17.4,10.4,17.4z'
              }),
              _react2.default.createElement('path', {
                fill: mainFill,
                d: 'M15.2,10.6c-0.1,0.5-0.6,0.9-1.2,0.9H6.6c-0.6,0-1.1-0.4-1.2-0.9C5.3,10,5.7,9.4,6.3,9.2c0.1,0,0.2,0,0.2,0h7.5 c0.6,0,1.2,0.5,1.2,1.2C15.2,10.5,15.2,10.6,15.2,10.6z'
              })
            )
          );
        case 'infoIcon':
          return _react2.default.createElement(
            'svg',
            {
              id: 'layer_infoIcon',
              height: height || size,
              width: width || size,
              viewBox: '0 0 100 100',
              ariaLabelledby: iconTitle
            },
            _react2.default.createElement(
              'title',
              { id: iconTitle },
              iconTitle
            ),
            _react2.default.createElement(
              'g',
              { id: 'infoIcon' },
              _react2.default.createElement('path', {
                fill: mainFill,
                d: 'M25,0C11.1929,0,0,11.1929,0,25s11.1929,25,25,25s25-11.1929,25-25S38.8071,0,25,0z M25,48.5 C12.0421,48.5,1.5,37.9579,1.5,25S12.0421,1.5,25,1.5S48.5,12.0421,48.5,25S37.9579,48.5,25,48.5z M26.4139,17.5823v23.8932 c0,0.7804-0.6328,1.4133-1.4139,1.4133s-1.4139-0.6329-1.4139-1.4133V17.5823c0-0.7805,0.6328-1.4133,1.4139-1.4133 S26.4139,16.8018,26.4139,17.5823z M27.3176,9.7568c0,1.28-1.0376,2.3176-2.3176,2.3176s-2.3176-1.0377-2.3176-2.3176 c0-1.28,1.0376-2.3177,2.3176-2.3177S27.3176,8.4768,27.3176,9.7568z'
              })
            )
          );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          kind = _props2.kind,
          extendedClass = _props2.extendedClass;

      return _react2.default.createElement(
        'span',
        { className: extendedClass ? 'icon ' + extendedClass : 'icon' },
        this.renderIcon(kind)
      );
    }
  }]);

  return GCIcon;
}(_react2.default.Component);