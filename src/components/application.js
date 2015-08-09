'use strict';

import React from 'react';
import Sidebar from './sidebar';
import Dashboard from './dashboard';
import Utility from './utilities';

const BASE_API = 'http://spa.tglrw.com:4000';

class Application extends React.Component {

  _bind(...handlers) {
    handlers.forEach(handler => this[handler] = this[handler].bind(this));
  }

  constructor() {
    super();
    this._bind('setDataFromApi', 'handleDashboardClick');
    this.state = {
      users: [],
      widgets: [],
      usersCount: 0,
      widgetsCount: 0,
      isDashboardOpen: true
    };
  }

  getAllUsers() {
    Utility.goFetch(BASE_API + '/users', {}, 'users', this.setDataFromApi);
  }

  getAllWidgets() {
    Utility.goFetch(BASE_API + '/widgets', {}, 'widgets', this.setDataFromApi);
  }

  setDataFromApi(data) {
    let key = Object.keys(data).toString();

    // set the count from the fetched data
    data[key + 'Count'] = data[key].length;
    this.setState(data);
  }

  componentWillMount() {
    this.getAllUsers();
    this.getAllWidgets();
  }

  handleDashboardClick(event) {
    event.preventDefault();
    document.querySelector('.WidgetsApplication').classList.toggle('open');
    this.setState({isDashboardOpen: !this.state.isDashboardOpen});
  }

  render() {
    let {usersCount, widgetsCount, isDashboardOpen} = this.state;
    return (
      <div className="WidgetsDashboard">
        <Sidebar isDashboardOpen={isDashboardOpen} handleDashboardClick={this.handleDashboardClick} />
        <Dashboard usersCount={usersCount} widgetsCount={widgetsCount} />
      </div>
    );
  }
}

// Application.displayName = 'Widgets Spa';

React.render(<Application />, document.getElementById('react'));
