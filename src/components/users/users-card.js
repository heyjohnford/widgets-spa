'use strict';

import React from 'react';

class UsersCard extends React.Component {

  render() {
    return (
      <div className={this.props.gridClassName + ' col-md-6 col-xs-12'}>
        <div className="widget">
          <div className="widget-header">
            <div className="widget-icon green pull-left">
              <i className="fa fa-users"></i>
            </div>
            <div className="title">{this.props.usersCount}</div>
            <div className="comment">Users</div>
          </div>
        </div>
      </div>
    );
  }

}

UsersCard.propTypes = {};
UsersCard.defaultProps = {
  gridClassName: 'col-lg-3'
};

export default UsersCard;
