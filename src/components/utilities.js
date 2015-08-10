'use strict';

require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';

module.exports = {
  /**
  * Retrieve data from api-end point
  * @param {url} string
  * @param {model} object
  * @param {property} string
  * @param {callback} function
  * @return {Array/Object} data from api
  */
  goFetch(url, model, property, callback) {
    fetch(url, model)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          var obj = {};
          obj[property] = data;
        } else {
          obj = data;
        }
        callback(obj);
      });
  }
};
