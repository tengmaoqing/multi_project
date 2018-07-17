import App from './App';
import { createRouter } from './router';
import { createStore } from './store/index';
import { appCreator, autoInstallFilters } from '@/system/init/init-vue-app';
import { setFlag } from './nubiaAPPauth';
import { scrollToByUrl, configIframeURL } from '@/helper/iframeEvent';
import { axiosResponesReport } from '@/helper/apiReport';

const locales = require.context('./locales/', false, /\.js$/);
autoInstallFilters();

export function createApp () {
  const router = createRouter();
  const store = createStore();

  const checkResult = result => {
    if (result._errCode === '200000') {
      store.commit('user/authFail');
      router.push({
        path: '/login',
        query: { redirect: router.currentRoute.fullPath }
      });
      return false;
    }
    return true;
  };

  configIframeURL('https://shop.nubia.com/recycle.php?a=getHeight#', 'https://shop.nubia.com/recycle.php?a=setTop#');
  const { app } = appCreator({
    router,
    store,
    locales,
    locale: 'zh-cn',
    App,
    requestConfig: {
      checkResult,
      onRequest (config) {
        config.startTime = +new Date();
      },
      onEnd: axiosResponesReport
    }
  });

  router.beforeResolve((to, from, next) => {
    setFlag(to.query.isapk);
    if (!app.$isServer) {
      scrollToByUrl(0);
    }
    next();
  });

  return {app, router, store};
};
