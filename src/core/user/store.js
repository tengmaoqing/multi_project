
import { setToken, setUserInfo, clearUserInfo } from '@/helper/loginStatusManger.js';

const clearLoginStatus = state => {
  clearUserInfo();
  state.loginToken = '';
  state.userInfo = {};
};

export default {
  namespaced: true,
  state: {
    userInfo: {},
    loginToken: ''
  },
  getters: {
    userInfo: state => {
      return state.userInfo;
    },
    loginToken: state => {
      return state.loginToken;
    }
  },
  actions: {
    async getUserInfoByToken ({ commit, getters }) {
      // const loginToken = getters.loginToken;
    }
  },
  mutations: {
    setUserInfo (state, data) {
      if (data) {
        setUserInfo(data.tel, data.name, data.openid);
        state.userInfo = data;
      }
    },

    setToken (state, token) {
      if (token) {
        setToken(token);
        state.loginToken = token;
      }
    },

    loginOut (state) {
      clearLoginStatus(state);
    },

    authFail: state => clearLoginStatus(state)
  }
};
