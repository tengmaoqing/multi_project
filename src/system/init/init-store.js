/*
* @Author: tengmaoqing
* @Date:   2018-06-13 20:28:48
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-06-23 16:19:06
*/

import Vue from 'vue';
import Vuex from 'vuex';
import User from '@/core/user/store';
// import createPlugin from 'logrocket-vuex';
import { merge } from 'lodash';

Vue.use(Vuex);

export const storeFnCreator = (configloader, initStore) => {
  const store = {
    state: {
      pid: 1001,
      phoneImgRoot: 'https://s1.huishoubao.com/img/phone/',
      apiHost: 'https://api.huishoubao.com',
      config: {}
    },
    actions: {
      configSetting ({ commit }, config) {
        if (config) {
          return commit('setConfig', config);
        }
      }
      // loadConfig ({ commit, state }) {
      //   const newConfig = configloader(state.pid);
      //   if (newConfig) {
      //     return commit('setConfig', newConfig);
      //   }
      // }
    },
    mutations: {
      setPid (state, pid) {
        if (Number(pid)) {
          state.pid = Number(pid);
        }
      },

      setConfig (state, config) {
        state.config = config;
      },

      loadConfig (state, pid) {
        const newConfig = configloader(state.pid);
        state.config = newConfig;
      },

      setHeaderTop (state, top) {
        state.headerTopComponent = top;
      }
    },
    modules: {
      user: User
    }
  };

  merge(store, initStore);

  if (process.env.VUE_ENV !== 'server' && process.env.NODE_ENV === 'production') {
    // const LogRocket = require('logrocket');
    // LogRocket.init('29pzmo/fd');
    // store.plugins = [createPlugin(LogRocket)];
  }
  return new Vuex.Store(store);
};
