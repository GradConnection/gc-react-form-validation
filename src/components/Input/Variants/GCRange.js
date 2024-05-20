import React from 'react';
import Slider from 'rc-slider';
import PropTypes from 'prop-types';

const GCRange = ({
  min,
  max,
  handleInputChange,
  defaultValue,
  disabled,
  onClick,
  allowCross = false,
  pushable = true
}) => {
  const { createSliderWithTooltip } = Slider;
  const Range = createSliderWithTooltip(Slider.Range);
  const defaultRange = Array.isArray(defaultValue) ? defaultValue : [min, max];

  return (
    <span onClick={onClick}>
      <Range
        min={min}
        max={max}
        onAfterChange={handleInputChange}
        defaultValue={defaultRange}
        tipFormatter={v => `${v}`}
        marks={{ [min]: min, [max]: max }}
        dots
        disabled={disabled}
        allowCross={allowCross}
        pushable={pushable}
      />
    </span>
  );
};

GCRange.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  handleInputChange: PropTypes.func,
  defaultValue: PropTypes.arrayOf(PropTypes.number)
};

export { GCRange };
