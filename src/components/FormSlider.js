import React from 'react';
import { Slider } from 'react-toolbox/lib/slider';

export default ({
    min,
    max,
    step,
    editable,
    label,
    value,
    onChange,
    theme
}) => (
    <div>
        <p className={theme['sliderLabel']} >
            {label}
        </p>
        <Slider {...{max, min, step, editable, value, onChange, theme}} />
    </div>
);
