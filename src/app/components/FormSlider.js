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
    <p className={theme['sliderLabel']} >
        {label}

        <Slider
            {...{max, min, step, editable, value, onChange, theme}} />
    </p>
);
