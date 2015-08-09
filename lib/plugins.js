import Good from 'good';

module.exports = [
  {
    register: Good,
    options: {
      reporters: [{
        reporter: require('good-console'),
        events: {
          response: '*',
          log: '*'
        }
      }]
    }
  }
];
