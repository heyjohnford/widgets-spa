'use strict';

import React from 'react';
import { Link } from 'react-router';

class Sidebar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="sidebar-wrapper">
        <ul className="sidebar">
          <li className="sidebar-main"><a href="/" onClick={this.props.handleDashboardClick}>Dashboard <span className="menu-icon fa fa-tachometer"></span></a></li>
          <li className="sidebar-title"><span>NAVIGATION</span></li>
          <li className="sidebar-list">
            <Link to="app" onClick={this.handleCurrentPaneClick}>Dashboard <span className="menu-icon fa fa-tachometer"></span></Link>
          </li>
          <li className="sidebar-list">
            <Link to="users" onClick={this.handleCurrentPaneClick}>Users <span className="menu-icon fa fa-users"></span></Link>
          </li>
          <li className="sidebar-list">
            <Link to="widgets" onClick={this.handleCurrentPaneClick}>Widgets <span className="menu-icon fa fa-cubes"></span></Link>
          </li>
        </ul>
        <div className="sidebar-footer col-xs-12"><a href="#" target="_blank">&copy; 2015 Red Ventures</a></div>
      </div>
    );
  }

}

Sidebar.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Sidebar;
