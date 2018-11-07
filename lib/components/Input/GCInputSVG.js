'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _createClass = (function () { function defineProperties (target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } }())

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

function _possibleConstructorReturn (self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called") } return call && (typeof call === 'object' || typeof call === 'function') ? call : self }

function _inherits (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass) } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass }

var GCInputSVG = (function (_Component) {
  _inherits(GCInputSVG, _Component)

  function GCInputSVG () {
    _classCallCheck(this, GCInputSVG)

    return _possibleConstructorReturn(this, (GCInputSVG.__proto__ || Object.getPrototypeOf(GCInputSVG)).apply(this, arguments))
  }

  _createClass(GCInputSVG, [{
    key: 'render',
    value: function render () {
      var _props = this.props

      var type = _props.type

      var className = _props.className

      switch (type) {
        case 'chevronDown':
          return _react2.default.createElement(
            'svg',
            {
              id: 'layer_chevronDown',
              className: className,
              style: { maxHeight: '50px' },
              viewBox: '0 0 50 50'
            },
            _react2.default.createElement(
              'title',
              { id: type },
              type
            ),
            _react2.default.createElement(
              'g',
              { id: 'chevronDown' },
              _react2.default.createElement('polygon', {
                className: 'gc-select__input-icon--fill',
                points: '0 0 25 25 50 0 0 0'
              })
            )
          )
        case 'chevronUp':
          return _react2.default.createElement(
            'svg',
            {
              id: 'layer_chevronUp',
              className: className,
              style: { maxHeight: '50px' },
              viewBox: '0 0 50 50'
            },
            _react2.default.createElement(
              'title',
              { id: type },
              type
            ),
            _react2.default.createElement(
              'g',
              { id: 'chevronUp' },
              _react2.default.createElement('polygon', {
                className: 'gc-select__input-icon--fill',
                points: '0 25 25 0 50 25 0 25'
              })
            )
          )
        case 'close':
          return _react2.default.createElement(
            'svg',
            {
              id: 'layer_closeUp',
              className: className,
              style: { maxHeight: '50px' },
              viewBox: '0 0 50 50'
            },
            _react2.default.createElement(
              'title',
              { id: type },
              type
            ),
            _react2.default.createElement(
              'g',
              { id: 'closeUp' },
              _react2.default.createElement('polygon', {
                className: 'gc-select__input-icon--fill',
                points: 'M26.074 25L49.778 1.297A.76.76 0 1 0 48.704.223L25 23.925 1.296.223A.76.76 0 1 0 .222 1.297L23.926 25 .222 48.703a.76.76 0 1 0 1.074 1.075L25 26.074l23.704 23.703a.756.756 0 0 0 1.074 0 .76.76 0 0 0 0-1.073L26.074 25z'
              })
            )
          )
      }
    }
  }])

  return GCInputSVG
}(_react.Component))

GCInputSVG.propTypes = {
  className: _propTypes2.default.string.isRequired,
  type: _propTypes2.default.string.isRequired
}

exports.default = GCInputSVG
