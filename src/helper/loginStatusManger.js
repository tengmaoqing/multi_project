
import Cookies from 'js-cookie';

// let token = '';

export const setToken = tokenid => {
  // token = tokenid;
  if (process.env.VUE_ENV === 'server') {
    return;
  }
  Cookies.set('token', tokenid, {
    expires: 15
  });
};

export const getToken = () => {
  if (process.env.VUE_ENV === 'server') {
    return;
    // return token;
  }

  return Cookies.get('token');
};

const clearToken = () => {
  Cookies.remove('token');
};

export const getUserInfo = () => {
  if (process.env.VUE_ENV === 'server') {
    return;
  }

  const unfo = JSON.parse(window.localStorage.getItem('uinfo'));
  return unfo;
};

export const setUserInfo = (tel, name, openid, headimgurl) => {
  if (process.env.VUE_ENV === 'server') {
    return;
  }
  window.localStorage.setItem('uinfo', JSON.stringify({
    tel,
    name,
    openid,
    headimgurl
  }));
};

export const clearUserInfo = () => {
  if (process.env.VUE_ENV === 'server') {
    return;
  }
  clearToken();
  window.localStorage.removeItem('uinfo');
};
