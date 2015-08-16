'use strict';

import React from 'react';
import Sidebar from './sidebar';
import Utility from './utilities';
import { RouteHandler } from 'react-router';

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
      'handleSearchFilter',
      'updateAllWidgetsList',
      'updateSingleWidgetList',
      'resetToDefaultSettings'
    );
    this.state = {
      users: [],
      widgets: [],
      usersfilter: [],
      widgetsfilter: [],
      usersSearchValue: '',
      widgetsSearchValue: '',
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

  resetToDefaultSettings(isNewWidgetCreated) {
    if (isNewWidgetCreated) {
      this.setState({usersSearchValue: '', widgetsSearchValue: ''});
    }
    this.setState({usersfilter: [], widgetsfilter: []});
  }

  handleSearchFilter(event, searchName, searchCritera) {
    let searchKey = searchName + 'filter';
    let searchValue = event.target.value;
    let searchValueKey = searchName + 'SearchValue';
    let newListAfterSearch = this.state[searchName].filter(item => {
      if (searchValue.length) {
        let lowerCaseSearchItem = item[searchCritera].toLowerCase();
        let lowerCaseSearchValue = searchValue.toLowerCase();
        return lowerCaseSearchItem.indexOf(lowerCaseSearchValue) > -1;
      }
      return false;
    });

    this.setState({[searchKey]: newListAfterSearch, [searchValueKey]: searchValue});
  }

  handleDashboardClick(event) {
    event.preventDefault();
    document.querySelector('.WidgetsApplication').classList.toggle('open');
    this.setState({isDashboardOpen: !this.state.isDashboardOpen});
  }

  render() {
    let {
      users,
      widgets,
      usersCount,
      widgetsCount,
      usersfilter,
      widgetsfilter,
      usersSearchValue,
      widgetsSearchValue,
      isDashboardOpen
    } = this.state;

    return (
      <div className="WidgetsDashboard">
        <Sidebar isDashboardOpen={isDashboardOpen} handleDashboardClick={this.handleDashboardClick} />
        <RouteHandler
          users={usersfilter.length || usersSearchValue.length ? usersfilter : users}
          widgets={widgetsfilter.length || widgetsSearchValue.length ? widgetsfilter : widgets}
          isSearching={usersSearchValue.length || widgetsSearchValue.length}
          usersCount={usersCount}
          widgetsCount={widgetsCount}
          updateAllWidgetsList={this.updateAllWidgetsList}
          updateSingleWidgetList={this.updateSingleWidgetList}
          handleSearchFilter={this.handleSearchFilter}
          resetToDefaultSettings={this.resetToDefaultSettings}
          BASE_API={BASE_API} />
      </div>
    );
  }
}

export default Application;
