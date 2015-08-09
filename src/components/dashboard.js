'use strict';

import React, {PropTypes} from 'react';
import Header from './header';
import UsersCard from './users/users-card';
import WidgetsCard from './widgets/widgets-card';
import UsersList from './users/users-list';
import WidgetsList from './widgets/widgets-list';

class Dashboard extends React.Component {

  render() {
    return (
      <div id="content-wrapper">
        <Header />
        <div className="row">
          <UsersCard usersCount={this.props.usersCount} />
          <WidgetsCard widgetsCount={this.props.widgetsCount} />
        </div>
        <div className="row">
          <UsersList />
          <WidgetsList />
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
