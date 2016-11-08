import React from 'react';
import Main from '../theme/main.scss';

class Header extends React.Component {

  render () {
    return (
        <div className={Main.header}>
            <a href="http://lmcjt.com/" title="Luke Taylor – Web and Mobile Development" rel="home">
                <img src="http://lmcjt.com/wp-content/uploads/2016/08/lmcjt-logo.png" width="90" alt="Luke Taylor – Web and Mobile Development"/>
            </a>
        </div>
    );
  }
}

export default Header;
