import React from 'react';
import { IconButton } from 'react-toolbox/lib/button';

export default ({
    icon,
    inverse,
    onMouseUp
}) => {
    return (
        <IconButton {...{icon, onMouseUp, inverse}} />
    );
}
