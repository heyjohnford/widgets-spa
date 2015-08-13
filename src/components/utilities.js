'use strict';

require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import _ from 'lodash';

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
    let __passAlongModelData = (response) => {
      model.data = model.body;
      return _.assign(response, model);
    };

    fetch(url, model)
      .then((response) => {
        let {status, statusText} = response;
        if (status >= 400) {
          throw new Error('Bad response');
        }
        return ((status === 204 || status === 200) && statusText === 'No Content') ? __passAlongModelData(response) : response.json();
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
  },
  /**
  * @param {str} string
  * @return {String} ex. "John Doe" => 'john-doe'
  */
  hyphenateParams(str) {
    return str.trim().toLowerCase().replace(/\s/g, '-');
  }
};
