/*
* @Author: tengmaoqing
* @Date:   2018-04-16 20:03:46
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-05-10 10:34:58
*/

const defaultTKD = {
  title: '回收宝 - 价格评估|二手手机回收|回收旧手机|回收手机的网站|回收宝 - 手机回收第一选择！',
  keywords: '回收宝',
  description: '回收宝'
};

// TKD.js
function getTKD (meta, store) {
  const TKD = Object.assign({}, defaultTKD, meta);

  TKD.title = typeof TKD.title === 'function'
    ? TKD.title(meta, store)
    : TKD.title;

  return TKD;
};

const serverTKDMixin = (app, route, store) => {
  const TKD = getTKD(route.meta, store);
  if (app.$ssrContext) {
    app.$ssrContext.title = app.$t(TKD.title);
    app.$ssrContext.keywords = app.$t(TKD.keywords);
    app.$ssrContext.description = app.$t(TKD.description);
  }
};

const clientTKDMixin = (app, route, store) => {
  const TKD = getTKD(route.meta, store);
  if (TKD.title) {
    document.title = app.$t(TKD.title);
  }
};

export default process.env.VUE_ENV === 'server'
  ? serverTKDMixin
  : clientTKDMixin;
