import React from 'react';
import {Button, IconButton} from 'react-toolbox/lib/button';

export default ({
    icon,
    label,
    onMouseUp
}) => (
    <Button {...{icon, label, onMouseUp}} raised primary />
);
