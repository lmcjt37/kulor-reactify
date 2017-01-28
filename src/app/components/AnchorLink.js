import React from 'react';

export default ({
    href,
    title,
    rel,
    children
}) => <a href={href} title={title} rel={rel}>{children}</a>;

