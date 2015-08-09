'use strict';

import React from 'react';
import Header from '../header';
import UsersCard from './users-card';
import UsersList from './users-list';

class UsersIndex extends React.Component {

  render() {
    return (
      <div id="content-wrapper">
        <Header paneName="Users" />
        <div className="row">
          <UsersCard usersCount={this.props.usersCount} gridClassName="col-lg-12" />
        </div>
        <div className="row">
          <UsersList gridClassName="col-lg-12" />
        </div>
      </div>
    );
  }

}

export default UsersIndex;
