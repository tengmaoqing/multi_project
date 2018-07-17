/*
* @Author: tengmaoqing
* @Date:   2018-05-14 19:49:34
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-05-23 14:53:32
*/
import axios from 'axios';
import qs from 'qs';
import { setupCache } from 'axios-cache-adapter';

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
  // debug: true,
  exclude: {
    query: false
  }
});

const createInstance = (param) => {
  let options = {
    headers: {
      // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    timeout: 10000,
    // validateStatus (status) {
    //   // 异常状态处理
    //   return status >= 200 && status < 300; // default
    // },
    transformRequest: [(data) => {
      if (typeof FormData !== 'undefined' && data instanceof FormData) {
        return data;
      }
      return qs.stringify(data);
    }],
    adapter: cache.adapter
  };

  options = Object.assign({}, options, param);

  // if (options.method === 'POST') {
  //   options.data = qs.stringify(config.data);
  //   options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  // }
  const httpInstances = axios.create(options);

  httpInstances.cache = cache;
  return httpInstances;
};

export default createInstance;
