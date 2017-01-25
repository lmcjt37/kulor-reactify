import React from 'react';
import { Slider } from 'react-toolbox/lib/slider';

const FormSlider = ({
  min,
  max,
  step,
  editable,
  label,
  value,
  onChange,
  theme
}) => (
    <p className={theme['sliderLabel']} >
      {label}
      <Slider
        {...{max, min, step, editable, value, onChange, theme}} />
    </p>
);

export default FormSlider;
