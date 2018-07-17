/*
* @Author: tengmaoqing
* @Date:   2018-04-28 18:07:49
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-04-28 18:20:34
*/
import Vue from 'vue';

export const append = (C, option) => {
  const VueLike = Vue.extend(C);
  return new VueLike(Object.assign({
    el: document.body.appendChild(document.createElement('div'))
  }, option));
};
