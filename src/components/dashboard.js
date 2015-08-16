'use strict';

import React, {PropTypes} from 'react';
import Header from './header';
import UsersCard from './users/users-card';
import WidgetsCard from './widgets/widgets-card';
import UsersList from './users/users-list';
import WidgetsList from './widgets/widgets-list';

class Dashboard extends React.Component {

  componentWillUnmount() {
    this.props.resetToDefaultSettings();
  }

  render() {
    let {users, widgets, usersCount, widgetsCount, handleSearchFilter, isSearching} = this.props;
    return (
      <div id="content-wrapper">
        <Header />
        <div className="row">
          <UsersCard usersCount={usersCount} />
          <WidgetsCard widgetsCount={widgetsCount} />
        </div>
        <div className="row">
          <UsersList users={users} handleSearchFilter={handleSearchFilter} isSearching={isSearching} />
          <WidgetsList widgets={widgets} handleSearchFilter={handleSearchFilter} isSearching={isSearching} widgetListClass="WidgetsList--fixed" />
        </div>
      </div>
    );
  }

}

Dashboard.propTypes = {
  usersCount: PropTypes.number,
  widgetsCount: PropTypes.number
};

export default Dashboard;
