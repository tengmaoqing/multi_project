/*
* @Author: tengmaoqing
* @Date:   2018-04-26 17:57:42
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-06-26 17:01:15
*/
import Vue from 'vue';
// import { createApp } from './main';
import ProgressBar from '@/components/progress-bar';
import { asyncData } from '@/helper/vueAsyncData';
import { getUserInfo, getToken } from '@/helper/loginStatusManger.js';
import parse from 'url-parse';

export default (createApp, options = {}) => {
  Vue.mixin({
    beforeRouteUpdate (to, from, next) {
      asyncData(this.$options, to, this.$store, false, true).then(next).catch(next);
    }
  });

  const { app, store, router } = createApp();
  const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount();
  document.body.appendChild(bar.$el);

  if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
  }

  const pid = parse(window.location.href, true).query.pid;
  store.commit('user/setToken', getToken());
  store.commit('user/setUserInfo', getUserInfo());
  store.commit('setPid', pid);
  store.commit('loadConfig', pid);

  router.beforeEach((to, from, next) => {
    const fQuery = from.query;
    let { query, params, path } = to;
    let pid = store.state.pid;
    if (fQuery.pid) {
      pid = fQuery.pid;
    }

    if (query.pid || pid === 1001) {
      return next();
    }

    query.pid = pid || 1001;
    next({ query, params, path });
  });

  router.onReady(() => {
    router.beforeResolve((to, from, next) => {
      const matched = router.getMatchedComponents(to);
      const prevMatched = router.getMatchedComponents(from);
      let diffed = false;
      const activated = matched.filter((c, i) => {
        return diffed || (diffed = (prevMatched[i] !== c));
      });
      if (!activated.length) {
        return next();
      }

      bar.start();
      Promise.all(activated.map(c => {
        return asyncData(c, to, store);
      })).then(() => {
        bar.finish();
        options.pageLoaded && options.pageLoaded(app, store, router);
        // 停止加载指示器(loading indicator)
        next();
      }).catch(next);
    });

    if (!document.querySelector('#app')) {
      const currentRoute = router.currentRoute;
      Promise.all(router.getMatchedComponents(currentRoute).map(Component => {
        return asyncData(Component, currentRoute, store);
      })).then(() => {
        options.pageLoaded && options.pageLoaded(app, store, router);
      });
      app.$mount(document.body.appendChild(document.createElement('div')));
    } else {
      const currentRoute = router.currentRoute;
      router.getMatchedComponents(currentRoute).map(Component => {
        if (Component.registerModule) {
          Component.registerModule(store, true);
        }
      });
      app.$mount('#app');
      options.pageLoaded && options.pageLoaded(app, store, router);
    }

    const loadingEl = document.getElementById('pageLoading');
    if (loadingEl) {
      loadingEl.parentNode.removeChild(loadingEl);
    }
  });
};
