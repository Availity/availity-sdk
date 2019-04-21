import AvLocalStorage from '@availity/localstorage-core';
import qs from 'qs';
import isAbsoluteUrl from 'is-absolute-url';
import resolveUrl from '@availity/resolve-url';

import API_OPTIONS from './options';

export default class AvApi {
  constructor({ http, promise, merge, config }) {
    if (!http || !config || !promise || !merge) {
      throw new Error(
        '[http], [promise], [config], and [merge] must be defined'
      );
    }
    this.http = http;
    this.Promise = promise;
    this.merge = merge;
    this.defaultConfig = this.merge({}, API_OPTIONS.API, config);
    this.localStorage = new AvLocalStorage();
  }

  // get the merged config
  config(config = {}) {
    return this.merge({}, this.defaultConfig, config);
  }

  addParams(params = {}, config = {}, newObj = true) {
    const output = newObj ? Object.assign({ params: {} }, config) : config;

    if (!newObj) {
      output.params = output.params || {};
    }

    output.params = Object.assign({}, output.params, params);
    return output;
  }

  // set the cache parameters
  cacheParams(config) {
    const params = {};

    if (config.cacheBust) {
      params.cacheBust = this.getCacheBustVal(config.cacheBust, () =>
        Date.now()
      );
    }

    if (config.pageBust) {
      params.pageBust = this.getCacheBustVal(config.pageBust, () =>
        this.getPageBust()
      );
    }

    if (config.sessionBust) {
      params.sessionBust = this.getCacheBustVal(
        config.sessionBust,
        () => this.localStorage.getSessionBust() || this.getPageBust()
      );
    }

    return this.addParams(params, config, false);
  }

  // get the cache value with default function
  getCacheBustVal(cacheBust, defaultFn) {
    if (!cacheBust) {
      return undefined;
    }

    if (typeof cacheBust === 'boolean' && defaultFn) {
      return defaultFn();
    }

    if (typeof cacheBust === 'function') {
      return cacheBust();
    }

    return cacheBust;
  }

  // get pagebust value, make sure it is instantiated first
  getPageBust() {
    if (typeof this.pageBustValue === 'undefined') {
      this.setPageBust();
    }

    return this.pageBustValue;
  }

  // set the page bust value to given value or timestamp
  setPageBust(value) {
    this.pageBustValue = typeof value === 'undefined' ? Date.now() : value;
  }

  // get final url from config
  getUrl(config, id = '') {
    if (!config.api) {
      return config.url;
    }

    const { path, version, name, url } = config;
    let parts = [];
    if (name) {
      parts = ['', path, version, name, id];
    } else {
      parts = [url, id];
    }

    // join parts, remove multiple /'s and trailing /
    return parts
      .join('/')
      .replace(/[/]+/g, '/')
      .replace(/\/$/, '');
  }

  getRequestUrl() {
    return this.getUrl(this.config());
  }

  // return location if should poll otherwise false
  getLocation(response) {
    let locationUrl;
    const { config, headers = {} } = response;
    const { getHeader, base, url } = config;
    const { location, Location } = headers;

    if (getHeader) {
      locationUrl = getHeader(response, 'Location');
    } else {
      locationUrl = location || Location;
    }

    if (locationUrl && !isAbsoluteUrl(locationUrl)) {
      if (base) {
        locationUrl = resolveUrl({ relative: location, base });
      } else if (url && isAbsoluteUrl(url)) {
        locationUrl = resolveUrl({ relative: location, url });
      }
    }

    return locationUrl;
  }

  // condition for calls that should continue polling
  shouldPoll(response) {
    return (
      response.config.polling &&
      response.status === 202 &&
      response.config.attempt < response.config.pollingIntervals.length
    );
  }

  // handle response with possible polling
  onResponse(response, afterResponse) {
    if (this.shouldPoll(response)) {
      const newConfig = this.config(response.config);
      const pollingUrl = this.getLocation(response);

      if (pollingUrl) {
        newConfig.method = this.defaultConfig.pollingMethod;
        newConfig.url = pollingUrl;
        newConfig.cache = false;
        return new this.Promise(resolve => {
          setTimeout(
            resolve,
            newConfig.pollingIntervals[newConfig.attempt] || 1000
          );
        }).then(() => this.request(newConfig, afterResponse));
      }
    }

    return afterResponse ? afterResponse(response) : response;
  }

  // make request to http
  request(config, afterResponse) {
    if (config.polling) {
      config.attempt = config.attempt || 0;
      config.attempt += 1;
    }

    return this.http(config).then(response =>
      this.onResponse(response, afterResponse)
    );
  }

  // post request
  create(data, config) {
    if (!data) {
      throw new Error('called method without [data]');
    }
    config = this.config(config);
    config.method = 'POST';
    config.url = this.getUrl(config);
    config.data = data;

    const beforeFunc = this.beforeCreate || this.beforePost;
    if (beforeFunc) {
      config.data = beforeFunc(config.data);
    }

    return this.request(config, this.afterCreate || this.afterPost);
  }

  post(data, config) {
    return this.create(data, config);
  }

  // post request with method-override to get
  postGet(data, config) {
    if (!data) {
      throw new Error('called method without [data]');
    }
    config = this.config(config);
    config.method = 'POST';
    config.headers = config.headers || {};
    config.headers['X-HTTP-Method-Override'] = 'GET';
    config.headers['Content-Type'] =
      config.headers['Content-Type'] || 'application/x-www-form-urlencoded';
    config.url = this.getUrl(config);
    config.data = data;
    if (this.beforePostGet) {
      config.data = this.beforePostGet(config.data);
    }
    if (
      typeof config.data !== 'string' &&
      config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
    ) {
      config.data = qs.stringify(config.data, {
        encode: false,
        arrayFormat: 'repeat',
        indices: false,
        allowDots: true,
      });
    }
    return this.request(config, this.afterPostGet);
  }

  // get request with id
  get(id, config) {
    if (!id) {
      throw new Error('called method without [id]');
    }
    config = this.config(config);
    config.method = 'GET';
    config.url = this.getUrl(config, id);
    config = this.cacheParams(config);
    return this.request(config, this.afterGet);
  }

  // get request with just params
  query(config) {
    config = this.config(config);
    config.method = 'GET';
    config.url = this.getUrl(config);
    config = this.cacheParams(config);
    return this.request(config, this.afterQuery);
  }

  all(config) {
    return this.query(config).then(resp => {
      const key = this.getQueryResultKey(resp.data);
      const totalPages = Math.ceil(resp.data.totalCount / resp.data.limit);
      const result = resp.data[key] || [];
      if (totalPages > 1) {
        const otherPages = [];
        for (let i = 0; i < totalPages - 1; i += 1) {
          otherPages[i] = i + 2;
        }
        /* eslint-disable promise/no-nesting */
        return this.Promise.all(
          otherPages.map(page =>
            this.getPage(page, config, resp.data.limit).then(
              pageResp => pageResp.data[key] || []
            )
          )
        ).then(pages => result.concat(...pages));
      }
      return result;
    });
  }

  getQueryResultKey(data) {
    return Object.keys(data).filter(key => Array.isArray(data[key]))[0];
  }

  getResult(data) {
    return data[this.getQueryResultKey(data)];
  }

  getPage(page = 1, config = {}, limit) {
    limit = limit || (config.params && config.params.limit) || 50;
    const offset = (page - 1) * limit;
    return this.query(this.addParams({ offset, limit }, config, false));
  }

  // put request
  update(id, data, config) {
    if (typeof id !== 'string' && typeof id !== 'number') {
      config = data;
      data = id;
      id = '';
    }
    config = this.config(config);
    config.method = 'PUT';
    config.url = this.getUrl(config, id);
    config.data = data;

    const beforeFunc = this.beforeUpdate || this.beforePut;
    if (beforeFunc) {
      config.data = beforeFunc(config.data);
    }
    return this.request(config, this.afterUpdate || this.afterPut);
  }

  put(...args) {
    return this.update(...args);
  }

  // delete request
  remove(id, config) {
    if (typeof id !== 'string' && typeof id !== 'number') {
      config = id;
      id = '';
    }
    config = this.config(config);
    config.method = 'DELETE';
    config.url = this.getUrl(config, id);

    const beforeFunc = this.beforeRemove || this.beforeDelete;
    if (beforeFunc) {
      config = beforeFunc(config);
    }
    return this.request(config, this.afterRemove || this.afterDelete);
  }

  delete(...args) {
    return this.remove(...args);
  }
}
