/*
* @Author: tengmaoqing
* @Date:   2018-04-13 16:24:43
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-06-26 11:35:01
*/
import { createApp } from './main';
import initClientApp from '@/system/init/init-client-app';
import { setIfrHeightByURL } from '@/helper/iframeEvent';
import { throttle } from 'lodash';
import TKDMixin from '@/helper/TKD';

if (process.env.NODE_ENV !== 'production') {
  // const VConsole = require('vconsole');
  // window.$$vvvv = new VConsole();
}

const throttledSet = throttle(setIfrHeightByURL, 500);
document.body.addEventListener('click', (ev) => {
  setTimeout(throttledSet, 200);
});

initClientApp(createApp, {
  pageLoaded (app, store, router) {
    TKDMixin(app, router.currentRoute, store);
    setTimeout(() => {
      throttledSet();
    }, 500);
  }
});
