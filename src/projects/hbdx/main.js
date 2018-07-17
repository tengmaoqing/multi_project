import Vue from 'vue';
import App from './App';
import VueI18n from 'vue-i18n';
import { createRouter } from './router';
import { createStore } from './store/index';
import { sync } from 'vuex-router-sync';
import TKDMixin from '@/helper/TKD';
import { httpConfig } from '@/apis/base';
import { getLocales } from '@/helper/locales';
import * as filters from '@/helper/filters';
import 'babel-polyfill';

Vue.config.productionTip = false;
Vue.use(VueI18n);
// Vue.mixin(TKDMixin);
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
// Vue.prototype.$isServer = process.env.VUE_ENV === 'server';

export function createApp () {
  const router = createRouter();
  const store = createStore();
  sync(store, router);

  const i18n = new VueI18n({
    locale: 'zh-cn',
    messages: getLocales(require.context('./locales/', false, /\.json$/))
  });

  const app = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  });

  const checkResult = result => {
    if (result._errCode === '200003') {
      store.commit('user/authFail');
      router.push({
        path: '/login',
        query: { redirect: router.currentRoute.fullPath }
      });
      return false;
    }
    return true;
  };

  httpConfig({
    apiHost: store.state.apiHost,
    state: store.state,
    checkResult
  });

  router.beforeResolve((to, from, next) => {
    store.commit('setPid', to.query.pid);
    TKDMixin(app, to, store);
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
