/*
* @Author: tengmaoqing
* @Date:   2018-04-18 18:31:12
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-05-22 11:51:25
*/

export const asyncData = async (c, route, store, isPreserveState, noRegisterModule) => {
  if (c.registerModule && !noRegisterModule) {
    c.registerModule(store, isPreserveState);
  }
  if (c.asyncData) {
    await c.asyncData({ store, route });
  }
};
