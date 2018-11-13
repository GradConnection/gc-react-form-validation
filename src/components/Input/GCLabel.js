import React from 'react'

const GCLabel = ({ htmlFor, title }) => (
  <label className='gc-input__label gc-input__label--static' htmlFor={htmlFor}>{title}</label>
)

export default GCLabel
