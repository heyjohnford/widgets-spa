'use strict';

import React, {PropTypes} from 'react';
import Header from '../header';
import Utility from '../utilities';

class UsersDetail extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.state = {
      user: {}
    };
  }

  getCurrentUser() {
    let {router} = this.context;
    Utility.goFetch(`${this.props.BASE_API}/users/${router.getCurrentParams().id}`, {}, 'user', this.setCurrentUser);
  }

  setCurrentUser(data) {
    console.log(data);
    this.setState(data);
  }

  componentWillMount() {
    this.getCurrentUser();
  }

  render() {
    return (
      <div>
        <Header paneName={['Users', this.state.name]} />
      </div>
    );
  }

}

UsersDetail.contextTypes = {
  router: PropTypes.func.isRequired
};

export default UsersDetail;
