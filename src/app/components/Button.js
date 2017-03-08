import React from 'react';
import {Button, IconButton} from 'react-toolbox/lib/button';

export default ({
    icon,
    label,
    name,
    styling,
    theme,
    onMouseUp
}) => {
    if (name !== "hints") {
        return (
            <Button {...{icon, label, theme, onMouseUp}} raised primary />
        );
    } else {
        const inverse = styling === "light" ? true : false;
        return (
            <IconButton {...{icon, onMouseUp, inverse}} />
        );
    }
}
