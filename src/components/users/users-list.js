'use strict';


import React, { PropTypes } from 'react';
import UsersListItem from './users-list-item';
import Search from '../search';

class UsersList extends React.Component {
  renderUsers() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th className="text-center">ID</th>
            <th>Name</th>
            <th className="text-center">Gravatar</th>
          </tr>
        </thead>
        <tbody>
          {this.renderIndividualUsers()}
        </tbody>
      </table>
    );
  }

  renderIndividualUsers() {
    return this.props.users.map(user => (
      <UsersListItem key={user.id} id={user.id} name={user.name} gravatar={user.gravatar} />
    ));
  }

  noUsersFound() {
    return (
      <table className="table">
        <tbody>
          <tr><td>No Users Found</td></tr>
        </tbody>
      </table>
    );
  }

  render() {
    let {users, handleSearchFilter, gridClassName, isSearching} = this.props;
    let hasUsers = users.length;

    return (
      <div className={gridClassName}>
        <div className="widget">
          <div className="widget-header">Users
            <div className="pull-right">
              <Search
                placeholder="Search users..."
                searchName="users"
                searchCritera="name"
                onChange={handleSearchFilter}
                disabled={hasUsers || isSearching ? false : true} />
            </div>
          </div>
          <div className="table-responsive">
            {hasUsers ? this.renderUsers() : this.noUsersFound()}
          </div>
        </div>
      </div>
    );
  }

}

UsersList.propTypes = {
  users: PropTypes.array,
  handleSearchFilter: PropTypes.func.isRequired
};

UsersList.defaultProps = {
  gridClassName: 'col-lg-6'
};

export default UsersList;
