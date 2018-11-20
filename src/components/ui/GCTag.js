import React from 'react'

import { GCIcon } from 'ui'

export const GCTag = ({children, onCrossBtnClick}) => (
  <div className='gc-tag'>
    <span className='gc-tag__label'>{children}</span>
    <button className='gc-tag__btn gc-btn--icon-sml' onClick={onCrossBtnClick}><GCIcon kind='closeIcon' /></button>
  </div>
)
