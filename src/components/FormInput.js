import React from 'react';
import Input from 'react-toolbox/lib/input';

import IconButton from './IconButton';
import themedButton from '../theme/themedButton';

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
    suffix,
    styling,
    onToast
}) => {
    const {inputPrefix, inputSuffix, inputOuterWrapper, inputInnerWrapper, inputCopy } = theme;
    const copyToClipboard = () => {
        document.querySelector(`#${name}InputId`).select();
        document.execCommand('copy');
        document.querySelector(`#${name}InputId`).blur();
        onToast(`${name.toUpperCase()} has been copied.`);
    };
    return (
        <div className={inputOuterWrapper}>
            <div className={inputInnerWrapper} data-ref={name}>
                <p className={inputPrefix} style={{opacity: opacity}}>
                    {`${ label === 'RGB' ? label.toLowerCase() : '' }${prefix}`}
                </p>
                <Input
                    spellCheck="false"
                    id={`${name}InputId`}
                    {...{type, label, name, value, onFocus, onChange, onBlur, theme}} />
                <p className={inputSuffix} style={{opacity: opacity}}>{suffix}</p>
            </div>
            <div className={inputCopy} >
                <IconButton
                    icon='save'
                    inverse={ styling === "light" }
                    onMouseUp={ () => copyToClipboard() }
                    theme={theme}
                />
            </div>
        </div>
    );
};
