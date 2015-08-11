'use strict';

import React from 'react';
import { RouteHandler } from 'react-router';

class UsersIndex extends React.Component {

  render() {
    let {users, usersCount, BASE_API} = this.props;
    return (
      <div id="content-wrapper">
        <RouteHandler
          usersCount={usersCount}
          users={users}
          BASE_API={BASE_API} />
      </div>
    );
  }

}

export default UsersIndex;
