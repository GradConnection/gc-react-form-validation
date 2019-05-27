import React from 'react';
import Slider from 'rc-slider';
import PropTypes from 'prop-types';

const GCRange = ({
  min,
  max,
  handleInputChange,
  value
}) => {
  const { createSliderWithTooltip } = Slider;
  const Range = createSliderWithTooltip(Slider.Range);

  const currentValue = Array.isArray(value) ? value : [min, max];

  return (
    <Range
      min={min}
      max={max}
      onAfterChange={handleInputChange}
      value={currentValue}
      tipFormatter={v => `${v}`}
      marks={{ [min]: min, [max]: max }}
    />);
}

GCRange.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  handleInputChange: PropTypes.func,
  defaultValue: PropTypes.arrayOf(PropTypes.number)
}

export { GCRange };
