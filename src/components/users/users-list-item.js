'use strict';

import React from 'react';
import { Link } from 'react-router';

class UsersListItem extends React.Component {

  render() {
    let params = {
      id: this.props.id,
      userName: this.props.name.trim().toLowerCase()
    };

    return (
      <tr key={this.props.id}>
          <td className="text-center">{this.props.id}</td>
          <td><Link to="usersdetail" params={params}>{this.props.name}</Link></td>
          <td className="text-center">
            <img className="UserGravatar" src={this.props.gravatar} alt="" />
          </td>
      </tr>
    );
  }

}

export default UsersListItem;
