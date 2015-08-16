'use strict';

import React from 'react';
import Header from '../header';
import UsersCard from './users-card';
import UsersList from './users-list';

class UsersDefault extends React.Component {

  render() {
    let {users, usersCount, handleSearchFilter, isSearching} = this.props;
    return (
      <div>
        <Header paneName="Users" />
        <div className="row">
          <UsersCard usersCount={usersCount} gridClassName="col-lg-12" />
        </div>
        <div className="row">
          <UsersList users={users} handleSearchFilter={handleSearchFilter} isSearching={isSearching} gridClassName="col-lg-12" />
        </div>
      </div>
    );
  }

}

export default UsersDefault;
