import React from 'react';
import AnchorLink from '../components/AnchorLink';
import Image from '../components/Image';

const Header = ({
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

export default Header;
