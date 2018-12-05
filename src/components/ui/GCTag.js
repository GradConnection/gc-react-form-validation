import React from 'react'
import PropTypes from 'prop-types'

import { GCIcon } from 'ui'

const GCTag = ({ children, onCrossBtnClick }) => (
  <div className='gc-tag'>
    <span className='gc-tag__label'>{children}</span>
    <button className='gc-tag__btn gc-btn--icon-sml' onClick={onCrossBtnClick}><GCIcon kind='closeIcon' /></button>
  </div>
)

GCTag.propTypes = {
  children: PropTypes.node.isRequired,
  onCrossBtnClick: PropTypes.func.isRequired
}

export { GCTag }
