'use strict';

import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  breakdownBreadcrumbs() {
    let crumbs = this.props.paneName;
    if (Array.isArray(crumbs)) {
      return crumbs.map((c, i, a) => c + (a.length === (i + 1) ? '' : ' / '));
    }

    return crumbs;
  }

  render() {
    let crumbs = this.props.paneName;
    return (
      <div className="row header col-xs-12">
        <div className="user pull-right">
          <div className="item dropdown">
            <a href="#" className="dropdown-toggle"><img src="/img/avatar.jpg" alt="" /></a>
          </div>
        </div>
        <div className="meta">
          <div className="page">{Array.isArray(crumbs) ? crumbs.slice(-1) : crumbs}</div>
          <div className="breadcrumb-links"><Link to="app">Home</Link> / {this.breakdownBreadcrumbs()}</div>
        </div>
      </div>
    );
  }

}

Header.defaultProps = {
  paneName: 'Dashboard'
};

export default Header;
