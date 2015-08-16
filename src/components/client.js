require('isomorphic-fetch');

import React from 'react';
import Router from 'react-router';
import routes from '../../lib/client-routes.js';

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler />, document.getElementById('react'));
});
