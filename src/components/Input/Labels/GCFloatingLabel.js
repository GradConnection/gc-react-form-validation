import React from 'react'

const GCFloatingLabel = ({ title = null, htmlFor }) => !!title && (<label className='gc-input__label gc-input__label--floating' htmlFor={htmlFor}>{title}</label>)

export { GCFloatingLabel }
