'use strict';

import React from 'react';
import Sidebar from './sidebar';
import Utility from './utilities';
import { RouteHandler } from 'react-router';
// import routes from '../../lib/client-routes.js';
// import { Resolver } from 'react-resolver';

const BASE_API = 'http://spa.tglrw.com:4000';

class Application extends React.Component {

  _bind(...handlers) {
    handlers.forEach(handler => this[handler] = this[handler].bind(this));
  }

  constructor() {
    super();
    this._bind(
      'setDataFromApi',
      'handleDashboardClick',
      'updateAllWidgetsList',
      'updateSingleWidgetList'
    );
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

  updateAllWidgetsList(data) {
    data = JSON.parse(data);
    let {widgets} = this.state;
    data.id = widgets[widgets.length - 1].id + 1;

    this.setState({widgets: widgets.concat(data)});
  }

  updateSingleWidgetList(data) {
    let newWidgetsList = this.state.widgets.reduce((arr, widget) => {
      if (widget.id === data.id) {
        arr.push(data);
      } else {
        arr.push(widget);
      }
      return arr;
    }, []);

    this.setState({widgets: newWidgetsList});
  }

  setDataFromApi(data) {
    let key = Object.keys(data).toString();

    // Set the count(s) from the fetched data
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
          updateAllWidgetsList={this.updateAllWidgetsList}
          updateSingleWidgetList={this.updateSingleWidgetList}
          BASE_API={BASE_API} />
      </div>
    );
  }
}

export default Application;
