import React from 'react';
import Overrides from '../theme/overrides.css';

class Header extends React.Component {

  render () {
    return (
        <div className={Overrides.header}>
            <a href="http://lmcjt.com/" title="Luke Taylor – Web and Mobile Development" rel="home">
                <img src="http://lmcjt.com/wp-content/uploads/2016/08/lmcjt-logo.png" width="90" alt="Luke Taylor – Web and Mobile Development"/>
            </a>
        </div>
    );
  }
}

export default Header;
