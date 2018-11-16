import React from 'react'
import PropTypes from 'prop-types'

const GCDescription = ({ text }) => {
  return (
    <p className='gc-description'>{text}</p>
  )
}

GCDescription.propTypes = {
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

export default GCDescription
