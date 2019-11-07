import React from 'react';
import AnchorLink from '../components/AnchorLink';
import Image from '../components/Image';

export default ({
  headerClasses,
  anchor,
  image
}) => (
    <div className={headerClasses}>
        <AnchorLink {...anchor}>
            <Image {...image} />
        </AnchorLink>
    </div>
);
