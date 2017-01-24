import React from 'react';

const Image = ({
  source,
  width,
  alt
}) => (
  <img
    src={source}
    alt={alt}
    width={width} />
);

export default Image;