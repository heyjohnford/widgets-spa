'use strict';


import React, { PropTypes } from 'react';
import UsersListItem from './users-list-item';

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
        <tr><td>No Users Found</td></tr>
      </table>
    );
  }

  render() {
    let hasUsers = this.props.users.length;

    return (
      <div className={this.props.gridClassName}>
        <div className="widget">
          <div className="widget-header">Users
            <div className="pull-right">
              <input type="text" className="form-control input-sm" placeholder="Search users..." disabled={hasUsers ? false : true} />
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
  users: PropTypes.array
};

UsersList.defaultProps = {
  gridClassName: 'col-lg-6'
};

export default UsersList;
