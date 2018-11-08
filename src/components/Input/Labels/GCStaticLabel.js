import React from 'react'

const GCStaticLabel = ({ title = null, htmlFor }) => !!title && (<label className='gc-input__label gc-input__label--static' htmlFor={htmlFor}>{title}</label>)

export { GCStaticLabel }
