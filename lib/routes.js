import Path from 'path';
import React from 'react';
import Router from 'react-router';
import ServerLocation from 'react-router-server-location';
import routes from './client-routes';
import OAuth from 'oauth';
import TWITTER from '../configs/twitter-credentials';
import fs from 'fs';

const STATIC_FILE = fs.readFileSync(Path.join(process.cwd(), '/src/views/index.html'), 'utf8');

function globalHandler(request, reply) {
  const location = new ServerLocation(request, reply);
  Router.create({routes, location}).run((Handler, state) => {
    reply(STATIC_FILE);
  });
}

let oauth = new OAuth.OAuth(
  TWITTER.REQUEST_TOKEN,
  TWITTER.OAUTH_ACCESS_TOKEN,
  TWITTER.CONSUMER_KEY,
  TWITTER.CONSUMER_SECRET,
  TWITTER.VERSION,
  null,
  TWITTER.SIGNATURE_METHOD
);

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
  // Twitter data route
  {
    method: 'GET',
    path: '/tweets/search',
    handler(request, reply) {
      oauth.get(
        'https://api.twitter.com/1.1/search/tweets.json?q=' + encodeURIComponent(request.query.q),
        TWITTER.ACCESS_TOKEN,
        TWITTER.ACCESS_TOKEN_SECRET,
        (e, data, res) => {
          if (e) { console.error(e); }
          reply(data);
        }
      );
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
