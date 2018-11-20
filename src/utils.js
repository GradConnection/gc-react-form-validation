/*
* An attempt to get out of using lodash
*/

export const toArray = value => {
  if (typeof value !== 'array') {
    if (value === '') {
      if (value.includes(',')) {
        return value.split()
      }
      return [value]
    }
    return []
  }
  return value
}

export const isEmpty = value => (value === '' || value === [] || value === {} || value === undefined || value === null)

export const determineRenderType = type => {
  switch (type) {
    case 'hidden':
    case 'custom':
      return 'hidden'
    case 'name':
    case 'text':
    case 'url':
      return 'text'
    default:
      return type
  }
}

export const getLabel = (v, options) => {
  const obj = options.find(opt => opt.value === v)
  return obj.label
}

export const removeOption = (v, options) => {
  return options.filter(opt => opt.value !== v)
}
