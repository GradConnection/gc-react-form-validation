'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GCDescription = function GCDescription(_ref) {
  var description = _ref.description;
  return _react2.default.createElement(
    'p',
    { className: 'gc-description' },
    description
  );
};

GCDescription.propTypes = {
  description: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node])
};

exports.default = GCDescription;