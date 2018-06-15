'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
* An attempt to get out of using lodash
*/

var toArray = exports.toArray = function toArray(value) {
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