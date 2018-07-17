/*
* @Author: tengmaoqing
* @Date:   2018-06-08 10:38:51
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-06-08 18:26:18
*/
import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);
const resolve = Router.prototype.resolve;
Router.prototype.originResolve = resolve;
Router.prototype.resolve = function (to, location, append) {
  const currentQ = location && location.query.pid;
  const next = typeof to === 'string' ? { path: to } : to;
  next.query = next.query || {};
  if (!next.query.pid) {
    next.query.pid = currentQ;
  }
  const ret = resolve.apply(this, [next, location, append]);
  return ret;
};

const $Router = function (params) {
  const defaultOptions = {
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    }
  };
  return new Router(Object.assign(defaultOptions, params));
};

export default $Router;
