'use strict';

import React from 'react';
import { Link } from 'react-router';

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
          <div className="page">{this.props.paneName}</div>
          <div className="breadcrumb-links"><Link to="app">Home</Link> / {this.props.paneName}</div>
        </div>
      </div>
    );
  }

}

Header.defaultProps = {
  paneName: 'Dashboard'
};

export default Header;
