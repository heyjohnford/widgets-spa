import Path from 'path';
import Hapi from 'hapi';
import Routes from '../lib/routes';
import Plugins from '../lib/plugins';

let server = new Hapi.Server();
let PORT = process.env.PORT || 8000;

function handleRegisterErrors(err) {
  if (err) {
    throw err;
  }
}

server.connection({
  host: 'localhost',
  port: PORT
});

server.views({
  engines: {
    html: require('handlebars')
  },
  path: Path.join(process.cwd(), 'src', 'views'),
  isCached: true
});

// Serve the routes
server.route(Routes);

// Register the plugins
server.register(Plugins, handleRegisterErrors);

server.start(() => {
  console.log('Running app on ' + server.info.uri);
});
