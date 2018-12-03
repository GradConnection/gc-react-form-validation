import React from 'react'

const GCTooltip = ({ active, toggleTooltip, content }) => (
  <div
    className='gc-tooltip'
    onClick={(e) => toggleTooltip(!active)}
  >
    <p className='gc-tooltip__message'>{content}</p>
  </div>
)

export { GCTooltip }
