'use strict';

import React from 'react';
import Sidebar from './sidebar';
import Dashboard from './dashboard';
import UsersIndex from './users/users-index';
import UsersDefault from './users/users-default';
import UsersDetail from './users/users-detail';
import WidgetsIndex from './widgets/widgets-index';
import WidgetsDefault from './widgets/widgets-default';
import WidgetsDetail from './widgets/widgets-detail';
import Utility from './utilities';
import Router, { DefaultRoute, Route, RouteHandler } from 'react-router';

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
    let {users, widgets, usersCount, widgetsCount, isDashboardOpen} = this.state;
    return (
      <div className="WidgetsDashboard">
        <Sidebar isDashboardOpen={isDashboardOpen} handleDashboardClick={this.handleDashboardClick} />
        <RouteHandler
          users={users}
          widgets={widgets}
          usersCount={usersCount}
          widgetsCount={widgetsCount}
          BASE_API={BASE_API} />
      </div>
    );
  }
}

const routes = (
  <Route path="/" handler={Application}>
    <DefaultRoute name="app" handler={Dashboard} />
    <Route name="users" path="/users" handler={UsersIndex}>
      <DefaultRoute handler={UsersDefault} />
      <Route name="usersdetail" path="/users/:id/:userName" handler={UsersDetail} />
    </Route>
    <Route name="widgets" path="/widgets" handler={WidgetsIndex}>
      <DefaultRoute handler={WidgetsDefault} />
      <Route name="widgetsdetail" path="/widgets/:id/:widgetName" handler={WidgetsDetail} />
    </Route>
  </Route>
);


Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler />, document.getElementById('react'));
});
