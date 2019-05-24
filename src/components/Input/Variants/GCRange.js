import React from 'react';
import Slider from 'rc-slider';

class GCRange extends PureComponent {
  render() {
    const { createSliderWithTooltip } = Slider;
    const Range = createSliderWithTooltip(Slider.Range);

    const {
      min,
      max,
      handleInputChange,
      defaultValue
    } = this.props;

    const defaultRange = Array.isArray(defaultValue) ? defaultValue : [min, max];

    return (
      <Range
        min={min}
        max={max}
        onAfterChange={handleInputChange}
        defaultValue={defaultRange}
        tipFormatter={v => `${v}`}
        marks={{ [min]: min, [max]: max }}
      />);
  }
}

export { GCRange };