var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var reactReplace = new webpack.NormalModuleReplacementPlugin(/^react$/i, 'react/addons');
var ROOT = path.join(__dirname, 'src');
var COMPONENTS = path.join(__dirname, 'src', 'components');
var NODE_MODULES = path.join(__dirname, 'node_modules');
var nodeModules = {};

var clientFiles = fs.readdirSync(COMPONENTS);
var modules = clientFiles.reduce(function(list, file) {

  // Filter out hidden files and directories
  if (file.indexOf('.') !== 0 && file.indexOf('.') !== -1) {
    list.push(path.join(COMPONENTS, file));
  }

  // Recursively search directories -- only one-level deep
  if (file.indexOf('.') === -1) {
    var NESTED_COMPONENTS = path.resolve(COMPONENTS, file),
      stats = fs.statSync(NESTED_COMPONENTS);

    if (stats.isDirectory()) {
      fs.readdirSync(NESTED_COMPONENTS).forEach(function(nestedFile) {
        if (nestedFile.indexOf('.') !== 0) {
          list.push(path.join(NESTED_COMPONENTS, nestedFile));
        }
      });
    }
  }

  return list;
}, []);

modules.push(path.join(__dirname, '/public/js/app.js'));

fs.readdirSync('node_modules').filter(function(f) {
  return ['.bin'].indexOf(f) === -1;
}).forEach(function(mod) {
  nodeModules[mod] = 'commonjs ' + mod;
});


module.exports = [
  {
    entry: {
      client: modules
    },
    output: {
      path: './dist',
      filename: '[name]_bundle.js'
    },

    resolve: {
      root: ROOT,
      extensions: ['', '.js', '.json', '.jsx'],
      modulesDirectories: [
        'node_modules',
        'src',
        'src/components'
      ],
      fallback: [NODE_MODULES, COMPONENTS]
    },

    module: {
      loaders: [
        { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader?optional[]=runtime&stage=0' },
        { test: /\.jsx/, exclude: /node_modules/, loader: 'babel-loader?optional[]=runtime&stage=0' }
      ]
    },
    resolveLoader: {root: NODE_MODULES},
    devtool: 'inline-source-map',
    plugins: [commonsPlugin, reactReplace]
  },
  {
    entry: {
      server: './src/server.js'
    },
    output: {
      path: './dist',
      filename: '[name]_bundle.js'
    },

    resolve: {
      root: ROOT,
      extensions: ['', '.js', '.json', '.jsx'],
      modulesDirectories: [
        'node_modules',
        'src',
        'src/components'
      ],
      fallback: [NODE_MODULES, COMPONENTS]
    },

    module: {
      loaders: [
        // the optional 'selfContained' transformer tells babel to require the runtime instead of inlining it.
        { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader?optional[]=runtime&stage=0' }
      ],
      preLoaders: [
        { test: /\.json/, exclude: /node_modules/, loader: 'json-loader' }
      ]
    },

    resolveLoader: {root: NODE_MODULES},
    devtool: 'inline-source-map',
    target: 'node',
    externals: nodeModules
  }
];
