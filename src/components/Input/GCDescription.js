import React from 'react'
import PropTypes from 'prop-types'

const GCDescription = ({ description }) => (
  <p className='gc-description'>{description}</p>
)

GCDescription.propTypes = {
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

export default GCDescription
