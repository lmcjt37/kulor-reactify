import React from 'react';
import {Button, IconButton} from 'react-toolbox/lib/button';

export default ({
    icon,
    label,
    theme,
    onMouseUp
}) => <Button {...{icon, label, theme, onMouseUp}} raised primary />;
