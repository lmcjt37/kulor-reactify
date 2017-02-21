import React from 'react';

export default ({
    onClick,
    theme,
    icon,
    label
}) => (
    <a href="#" {...{onClick}} className={ theme['menu-item'] } >
        <i className="material-icons" >{icon}</i>
        <span>{label}</span>
    </a>
);
