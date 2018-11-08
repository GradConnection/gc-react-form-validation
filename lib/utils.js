"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.determineRenderType = exports.toArray = void 0;

/*
* An attempt to get out of using lodash
*/
var toArray = function toArray(value) {
  if (typeof value !== 'array') {
    if (value === '') {
      if (value.includes(',')) {
        return value.split();
      }

      return [value];
    }

    return [];
  }

  return value;
};

exports.toArray = toArray;

var determineRenderType = function determineRenderType(type) {
  switch (type) {
    case 'hidden':
    case 'custom':
      return 'hidden';

    case 'name':
    case 'text':
    case 'url':
      return 'text';

    default:
      return type;
  }
};

exports.determineRenderType = determineRenderType;