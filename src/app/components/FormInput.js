import React from 'react';
import Input from 'react-toolbox/lib/input';

export default ({
    type = 'text',
    label,
    value,
    name,
    theme,
    onFocus,
    onChange,
    onBlur,
    opacity,
    prefix,
    suffix
}) => {
    const {inputPrefix, inputSuffix, inputWrapper} = theme;

    return (
        <div className={inputWrapper} data-ref={name}>
            <p className={inputPrefix} style={{opacity: opacity}}>
                {`${ label === 'RGB' ? label.toLowerCase() : '' }${prefix}`}
            </p>
            <Input
                {...{type, label, name, value, onFocus, onChange, onBlur, theme}} />
            <p className={inputSuffix} style={{opacity: opacity}}>{suffix}</p>
        </div>
    );
};
