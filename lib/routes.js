import Path from 'path';

module.exports = [
  // Client routes
  {
    method: 'GET',
    path: '/',
    handler(request, reply) {
      reply.view('index.html');
    }
  },
  {
    method: 'PUT',
    path: '/widgets/{widget_id}/edit',
    handler: {
      proxy: {
        mapUri: (request, callback) => {
          callback(null, 'http://spa.tglrw.com:4000/widgets/' + request.params.widget_id);
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
