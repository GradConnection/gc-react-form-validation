import React from 'react'

const GCMappedInput = ({ type, ...restProps }) => {
  console.log('MappedInput')
  return (
    <div>
      <h1>{type}</h1>
    </div>
  )
}

export default GCMappedInput
