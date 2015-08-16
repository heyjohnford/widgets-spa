import Path from 'path';
import React from 'react';
import Router from 'react-router';
import ServerLocation from 'react-router-server-location';
import routes from './client-routes';
import fs from 'fs';

const STATIC_FILE = fs.readFileSync(Path.join(process.cwd(), '/src/views/index.html'), 'utf8');

function globalHandler(request, reply) {
  const location = new ServerLocation(request, reply);
  Router.create({routes, location}).run((Handler, state) => {
    reply(STATIC_FILE);
  });
}

module.exports = [
  // Client routes
  {
    method: 'GET',
    path: '/',
    handler: globalHandler
  },
  {
    method: 'GET',
    path: '/users',
    handler: globalHandler
  },
  {
    method: 'GET',
    path: '/users/{users_id}/{users_name}',
    handler: globalHandler
  },
  {
    method: 'GET',
    path: '/widgets',
    handler: globalHandler
  },
  {
    method: 'GET',
    path: '/widgets/{widget_id}/{widget_name}',
    handler: globalHandler
  },
  {
    method: 'POST',
    path: '/widgets/new',
    handler: {
      proxy: {
        mapUri: (request, callback) => {
          callback(null, 'http://spa.tglrw.com:4000/widgets');
        },
        passThrough: true,
        xforward: true
      }
    }
  },
  {
    method: 'PUT',
    path: '/widgets/{widget_id}/edit',
    handler: {
      proxy: {
        mapUri: (request, callback) => {
          callback(null, `http://spa.tglrw.com:4000/widgets/${request.params.widget_id}`);
        },
        passThrough: true,
        xforward: true
      }
    }
  },
  // Serve static assets
  {
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: [
          Path.join(process.cwd(), 'dist'),
          Path.join(process.cwd(), 'public')
        ]
      }
    }
  }
];
