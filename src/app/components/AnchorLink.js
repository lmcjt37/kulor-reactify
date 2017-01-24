import React from 'react';

const AnchorLink  =  ({
  href,
  title,
  rel,
  children
}) => (
  <a
    href={href}
    title={title}
    rel={rel}
  >
    {children}
  </a>
);

export default AnchorLink;