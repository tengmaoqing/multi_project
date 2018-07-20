/*
* @Author: tengmaoqing
* @Date:   2018-06-23 10:42:59
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-06-26 17:01:30
*/

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueLazyload from 'vue-lazyload';
import { sync } from 'vuex-router-sync';
import { getLocales } from '@/helper/locales';
import { httpConfig } from '@/apis/base';
import * as filters from '@/helper/filters';
import 'babel-polyfill';
import { merge } from 'lodash';
import * as CONST from '../const/recycle';
import 'element-ui/lib/theme-chalk/icon.css';

Vue.config.productionTip = false;
Vue.prototype.Q_CONST = CONST;
Vue.use(VueI18n);
Vue.use(VueLazyload);

export {
  Vue
};

export const autoInstallFilters = (interceptor) => {
  Object.keys(filters).forEach(key => {
    let filter = filters[key];
    if (interceptor) {
      filter = interceptor(key, filter);
    }
    Vue.filter(key, filter);
  });
};

export const appCreator = ({router, store, locales, locale = 'zh-cn', App, requestConfig}) => {
  sync(store, router);

  const i18n = new VueI18n({
    locale,
    messages: getLocales(locales)
  });

  const app = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  });

  // 配置
  router.onReady(() => {
    const xs = merge({
      apiHost: store.state.apiHost,
      state: store.state,
      trunks: {
        platform: store.state.config.platform
      }
    }, requestConfig);
    httpConfig(xs);
  });

  // 检查登录态
  router.beforeResolve((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters['user/loginToken']) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });

  return {app, router, store};
};
