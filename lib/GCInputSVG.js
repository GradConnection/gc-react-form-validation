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

var GCInputSVG = function (_Component) {
  _inherits(GCInputSVG, _Component);

  function GCInputSVG() {
    _classCallCheck(this, GCInputSVG);

    return _possibleConstructorReturn(this, (GCInputSVG.__proto__ || Object.getPrototypeOf(GCInputSVG)).apply(this, arguments));
  }

  _createClass(GCInputSVG, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          type = _props.type,
          className = _props.className;

      switch (type) {
        case 'chevronDown':
          return _react2.default.createElement(
            'svg',
            { id: 'layer_chevronDown', className: className, viewBox: '0 0 100 100', onClick: function onClick(e) {
                return _this2.props.onClick(e);
              } },
            _react2.default.createElement(
              'title',
              { id: type },
              type
            ),
            _react2.default.createElement(
              'g',
              { id: 'chevronDown' },
              _react2.default.createElement('path', {
                className: 'gc-select__input-icon--fill', d: 'M43.9188,76.5719c3.4249,3.4183,8.98,3.4183,12.4049,0l41.1061-41.0016c3.4268-3.4144,3.4268-8.9595,0-12.374 c-3.4249-3.4181-8.7214-2.9288-12.1463,0.4895L49.5673,59.4144L15.1611,23.8357c-3.4249-3.4183-9.1662-4.1581-12.5911-0.7398 C0.8567,24.8032,0,27.044,0,29.2829s0.8566,4.4797,2.57,6.187L43.9188,76.5719z' })
            )
          );
        case 'chevronUp':
          return _react2.default.createElement(
            'svg',
            { id: 'layer_chevronUp', className: className, viewBox: '0 0 100 100', onClick: function onClick(e) {
                return _this2.props.onClick(e);
              } },
            _react2.default.createElement(
              'title',
              { id: type },
              type
            ),
            _react2.default.createElement(
              'g',
              { id: 'chevronUp' },
              _react2.default.createElement('path', {
                className: 'gc-select__input-icon--fill', d: 'M76.9035,42.5457l-19.715-19.7149c-0.8932-0.872-2.1055-1.6589-3.254-2.063c-1.4036-0.6593-2.8711-0.8082-3.8706-0.8082 c-1.4888,0-2.7223,0.2552-3.8707,0.8082c-1.0209,0.3615-2.1056,0.9996-3.254,1.9141l-0.085,0.0637L23.0541,42.5457L3.02,62.7499 C1.0847,64.6853,0,67.2586,0,69.9383c0,2.701,1.0847,5.2533,3.0412,7.2097l0.0213,0.0426l0.0426,0.0426 c2.0416,1.829,4.4874,2.8072,7.0608,2.8072c2.5733,0,4.9978-0.9782,7.0395-2.8072L50,45.2467l32.6882,31.9226 c2.0417,1.8503,4.615,2.8711,7.1034,2.8711c2.6584,0,5.2104-0.9995,7.2096-2.8072l0.0639-0.0639l0.0637-0.0426 C98.9792,75.1703,100,72.618,100,69.9383c0-2.6584-1.0208-5.2107-2.8712-7.1671L76.9035,42.5457z' })
            )
          );
      }
    }
  }]);

  return GCInputSVG;
}(_react.Component);

GCInputSVG.propTypes = {
  className: _propTypes2.default.string.isRequired,
  type: _propTypes2.default.string.isRequired
};

exports.default = GCInputSVG;