/*
* @Author: tengmaoqing
* @Date:   2018-05-31 17:28:50
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-05-31 18:08:40
*/

import Cookies from 'js-cookie';

const APPFLAG = '1';

export const setFlag = isAPP => {
  if (isAPP) {
    Cookies.set('isNubiaApp', APPFLAG);
  }
};

export const isNubiaApp = () => Cookies.get('isNubiaApp') === APPFLAG;
