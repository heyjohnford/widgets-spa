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
