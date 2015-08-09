'use strict';

import React from 'react';

class Sidebar extends React.Component {

  constructor() {
    super();
    this.state = {
      isPaneActive: true
    };
  }

  render() {
    return (
      <div id="sidebar-wrapper">
        <ul className="sidebar">
          <li className="sidebar-main"><a href="/" onClick={this.props.handleDashboardClick}>Dashboard <span className="menu-icon fa fa-tachometer"></span></a></li>
          <li className="sidebar-title"><span>NAVIGATION</span></li>
          <li className="sidebar-list"><a href="/">Dashboard <span className="menu-icon fa fa-tachometer"></span></a></li>
          <li className="sidebar-list"><a href="/user.html">Users <span className="menu-icon fa fa-users"></span></a></li>
          <li className="sidebar-list"><a href="/widget.html">Widgets <span className="menu-icon fa fa-cubes"></span></a></li>
        </ul>
        <div className="sidebar-footer col-xs-12"><a href="#" target="_blank">&copy; 2015 Red Ventures</a></div>
      </div>
    );
  }

}

export default Sidebar;
