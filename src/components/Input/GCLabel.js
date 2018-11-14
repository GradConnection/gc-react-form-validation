import React from 'react'

const GCLabel = ({ htmlFor, label }) => (
  <label className='gc-input__label gc-input__label--static' htmlFor={htmlFor}>{label}</label>
)

export default GCLabel
