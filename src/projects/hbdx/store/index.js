/*
* @Author: tengmaoqing
* @Date:   2018-04-16 14:05:40
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-05-07 09:50:05
*/

// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import User from '@/core/user/store';
import createPlugin from 'logrocket-vuex';
import LogRocket from 'logrocket';

Vue.use(Vuex);

export function createStore () {
  const store = {
    state: {
      pid: 1001,
      phoneImgRoot: 'https://s1.huishoubao.com/img/phone/',
      apiHost: '//hbdxapi.huishoubao.com',
      config: {}
    },
    actions: {
      configSetting ({ commit }, config) {
        if (config) {
          return commit('setConfig', config);
        }
      }
    },
    mutations: {
      setPid (state, pid) {
        if (Number(pid)) {
          state.pid = Number(pid);
        }
      },

      setConfig (state, config) {
        state.config = config;
      }
    },
    modules: {
      user: User
    }
  };
  if (process.env.VUE_ENV !== 'server') {
    LogRocket.init('29pzmo/fd');
    store.plugins = [createPlugin(LogRocket)];
  }
  return new Vuex.Store(store);
};
