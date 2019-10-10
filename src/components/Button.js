import React from 'react';
import { Button } from 'react-toolbox/lib/button';

export default ({
    icon,
    label,
    theme,
    onMouseUp
}) => {
    return (
        <Button {...{icon, label, theme, onMouseUp}} raised primary />
    );
}
