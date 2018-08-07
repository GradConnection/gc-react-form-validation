'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactHtmlParser = require('react-html-parser');

var _reactHtmlParser2 = _interopRequireDefault(_reactHtmlParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GCErrorMessage = function GCErrorMessage(_ref) {
  var msg = _ref.msg,
      _ref$extendedClassNam = _ref.extendedClassNames,
      extendedClassNames = _ref$extendedClassNam === undefined ? '' : _ref$extendedClassNam;

  return !!msg ? _react2.default.createElement(
    'p',
    { className: 'gc-input__error-msg ' + extendedClassNames },
    (0, _reactHtmlParser2.default)(msg),
    ' '
  ) : null;
};

exports.default = GCErrorMessage;