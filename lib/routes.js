import Path from 'path';
import React from 'react';
import Router from 'react-router';
// import {Resolver} from 'react-resolver';
import ServerLocation from 'react-router-server-location';
import routes from './client-routes';
import fs from 'fs';

module.exports = [
  // Client routes
  {
    method: 'GET',
    path: '/',
    handler(request, reply) {
      const location = new ServerLocation(request, reply);
      Router.create({routes, location}).run((Handler, state) => {
        console.log('dirname');
        console.log(__dirname);
        console.log(process.cwd());
        // var element = React.createElement(fs.readFileSync(Path.join(process.cwd(), '/src/views/index.html'), 'utf8'), state);
        // var markup = React.renderToStaticMarkup(fs.readFileSync(Path.join(process.cwd(), '/src/views/index.html'), 'utf8'));

        reply(fs.readFileSync(Path.join(process.cwd(), '/src/views/index.html'), 'utf8'));
      });
    }
  },
  {
    method: 'GET',
    path: '/users',
    handler(request, reply) {
      const location = new ServerLocation(request, reply);
      Router.create({routes, location}).run((Handler, state) => {
        console.log('dirname');
        console.log(__dirname);
        console.log(process.cwd());
        // var element = React.createElement(fs.readFileSync(Path.join(process.cwd(), '/src/views/index.html'), 'utf8'), state);
        // var markup = React.renderToStaticMarkup(fs.readFileSync(Path.join(process.cwd(), '/src/views/index.html'), 'utf8'));

        reply(fs.readFileSync(Path.join(process.cwd(), '/src/views/index.html'), 'utf8'));
      });
    }
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
