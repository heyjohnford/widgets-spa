/*eslint-disable*/
import React from 'react';
/*eslint-enable*/
import { DefaultRoute, Route } from 'react-router';
import Application from '../src/components/application';
import Dashboard from '../src/components/dashboard';
import UsersIndex from '../src/components/users/users-index';
import UsersDefault from '../src/components/users/users-default';
import UsersDetail from '../src/components/users/users-detail';
import WidgetsIndex from '../src/components/widgets/widgets-index';
import WidgetsDefault from '../src/components/./widgets/widgets-default';
import WidgetsDetail from '../src/components/./widgets/widgets-detail';

const routes = (
  <Route path="/" handler={Application}>
    <DefaultRoute name="app" handler={Dashboard} />
    <Route name="users" path="/users" handler={UsersIndex}>
      <DefaultRoute handler={UsersDefault} />
      <Route name="usersdetail" path="/users/:id/:userName" handler={UsersDetail} />
    </Route>
    <Route name="widgets" path="/widgets" handler={WidgetsIndex}>
      <DefaultRoute handler={WidgetsDefault} />
      <Route name="widgetsdetail" path="/widgets/:id/:widgetName" handler={WidgetsDetail} />
    </Route>
  </Route>
);

export default routes;
