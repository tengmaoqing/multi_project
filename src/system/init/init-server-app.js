/*
* @Author: tengmaoqing
* @Date:   2018-04-26 18:02:03
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-04-26 18:04:05
*/
import { asyncData } from '@/helper/vueAsyncData';
import { setTokenFromServer } from '@/helper/loginStatusManger';

export default (createApp) => {
  return context => {
    const { app, router, store } = createApp();
    return new Promise((resolve, reject) => {
      router.push(context.url);
      router.onReady(() => {
        const matchedComponents = router.getMatchedComponents();
        // 匹配不到的路由，执行 reject 函数，并返回 404
        if (!matchedComponents.length) {
          return reject();
        }

        store.dispatch('configSetting', context.projectConfig);
        store.commit('user/setToken', context.loginToken);

        Promise.all(matchedComponents.map(Component => {
          return asyncData(Component, router.currentRoute, store);
        })).then(() => {
          context.state = store.state;
          resolve(app);
        }).catch(reject);
      }, reject);
    });
  };
}