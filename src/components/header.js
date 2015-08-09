'use strict';

import React from 'react';

class Header extends React.Component {

  render() {
    return (
      <div className="row header col-xs-12">
        <div className="user pull-right">
          <div className="item dropdown">
            <a href="#" className="dropdown-toggle"><img src="/img/avatar.jpg" alt="" /></a>
          </div>
        </div>
        <div className="meta">
          <div className="page">Dashboard</div>
          <div className="breadcrumb-links">Home / Dashboard</div>
        </div>
      </div>
    );
  }

}

export default Header;
