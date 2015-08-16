'use strict';

import React from 'react';
import { RouteHandler } from 'react-router';

class UsersIndex extends React.Component {

  componentWillUnmount() {
    this.props.resetToDefaultSettings();
  }

  render() {
    let {users, usersCount, handleSearchFilter, isSearching, BASE_API} = this.props;
    return (
      <div id="content-wrapper">
        <RouteHandler
          usersCount={usersCount}
          users={users}
          handleSearchFilter={handleSearchFilter}
          isSearching={isSearching}
          BASE_API={BASE_API} />
      </div>
    );
  }

}

export default UsersIndex;
