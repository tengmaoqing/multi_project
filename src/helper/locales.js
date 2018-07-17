/*
* @Author: tengmaoqing
* @Date:   2018-05-07 11:16:41
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-06-14 09:42:18
*/

export const getLocales = webpackContext => {
  let maps = {};
  webpackContext.keys().forEach(n => {
    maps[n.replace(/\.\/([\w\W]+)\.js$/, '$1')] = webpackContext(n);
  });
  return maps;
};
