import Vue from 'vue';

Vue.directive('picker', {
  inserted: function (el, binding, vnode) {
    // 聚焦元素
    console.log(el);
    console.log(binding);
    console.log(vnode);
  }
});
