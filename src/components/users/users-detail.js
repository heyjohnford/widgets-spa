'use strict';

import React, { PropTypes } from 'react';
import Header from '../header';
import UsersRepos from './users-repos';
import Utility from '../utilities';
import Constants from '../constants';

class UsersDetail extends React.Component {

  _bind(...handlers) {
    handlers.forEach(handler => this[handler] = this[handler].bind(this));
  }

  constructor(props, context) {
    super(props, context);
    this._bind('setCurrentUser', 'setGithubUser', 'setGithubRepos');
    this.state = {
      user: {},
      github: {},
      repos: []
    };
  }

  getCurrentUser() {
    let {router} = this.context;
    Utility.goFetch(`${this.props.BASE_API}/users/${router.getCurrentParams().id}`, {}, 'user', this.setCurrentUser);
  }

  setCurrentUser(data) {
    this.setState({user: data}, this.getGithubCredentials);
  }

  getGithubCredentials() {
    let githubUser = Object.keys(Constants.GITHUB).filter(key => {
      return this.state.user.id === parseInt(key, 10);
    });
    let currentGithubUser = Constants.GITHUB[githubUser];

    this.fetchGithubUser(currentGithubUser);
  }

  fetchGithubUser(user) {
    const URL = 'https://api.github.com/users/' + user;
    Utility.goFetch(URL, {}, 'github', this.setGithubUser);
  }

  setGithubUser(data) {
    this.setState({github: data}, this.fetchGithubRepos);
  }

  fetchGithubRepos() {
    const URL = this.state.github.subscriptions_url;
    Utility.goFetch(URL, {}, 'repos', this.setGithubRepos);
  }

  setGithubRepos(data) {
    this.setState(data);
  }

  gravatarEnhancer(image) {
    return image.replace(/\?(.*)\&/g, 's=300');
  }

  componentWillMount() {
    this.getCurrentUser();
  }

  render() {
    let {user, github, repos} = this.state;
    let {blog} = github;
    let isBlog = (blog || '').length ? <p><a href={blog} target="_blank">{blog}</a></p> : null;
    let vintage = new Date(github.created_at).toLocaleDateString();

    // Wait for user object to be ready before rendering
    if (!user.id) { return null; }

    return (
      <div>
        <Header paneName={['Users', user.name]} />
          <div className="col-lg-3">
            <img className="UserGravatar--large" src={this.gravatarEnhancer(user.gravatar)} alt="" />
            <h3 className="text-center"><small><sup className="u-lightGrey">{user.id}</sup></small>{github.name}</h3>
            <div className="text-center">
              <img className="GithubAvatar" src={github.avatar_url} alt="" />
              <p><small>Github</small></p>
              <p><a href={github.html_url} target="_blank">{github.login}</a></p>
            </div>
            <hr />
            <p>{github.company || 'Red Ventures'}</p>
            <p>{github.location || 'Planet Earth'}</p>
            {isBlog}
            <p>Joined on {vintage}</p>
            <hr />
            <div className="clearfix">
              <div className="text-center col-lg-4">
                <div>{github.followers}</div>
                <small>Followers</small>
              </div>
              <div className="text-center col-lg-4">
                <div>{github.following}</div>
                <small>Following</small>
              </div>
              <div className="text-center col-lg-4">
                <div>{github.public_repos}</div>
                <small>Repos</small>
              </div>
            </div>
            <hr />
          </div>
          <div className="col-lg-push-1 col-lg-6">
            <UsersRepos repos={repos} />
          </div>
      </div>
    );
  }

}

UsersDetail.contextTypes = {
  router: PropTypes.func.isRequired
};

export default UsersDetail;
