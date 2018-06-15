/*
* An attempt to get out of using lodash
*/

export const toArray = value => {
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
