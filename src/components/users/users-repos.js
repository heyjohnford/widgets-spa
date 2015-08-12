'use strict';

import React, { PropTypes } from 'react';

class UsersRepos extends React.Component {

  renderActivity() {
    let grammar = (count) => {
      return count !== 1 ? 's' : '';
    };

    return this.props.repos.map((repo, i) => {
      let {open_issues, forks, stargazers_count} = repo;

      return (
        <li key={i} className="UserRepos-item">
          <p className="UserRepos-title">
            <a href={repo.html_url}>{repo.full_name}</a>
          </p>
          <p>{repo.description}</p>
          <small>Clone: {repo.ssh_url}</small>
          <div className="text-center clearfix">
            <div className="col-lg-4">
              <span className="UserRepos-statsCount">{open_issues}</span>
              <p><small>Open Issue{grammar(open_issues)}</small></p>
            </div>
            <div className="col-lg-4">
              <span className="UserRepos-statsCount">{forks}</span>
              <p><small>Fork{grammar(forks)}</small></p>
            </div>
            <div className="col-lg-4">
              <span className="UserRepos-statsCount">{stargazers_count}</span>
              <p><small>Star{grammar(stargazers_count)}</small></p>
            </div>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="UserRepos">
        <h3>Github Activity</h3>
        <ul>
          {this.renderActivity()}
        </ul>
      </div>
    );
  }

}

export default UsersRepos;
