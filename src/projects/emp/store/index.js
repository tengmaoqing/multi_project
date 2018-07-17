/*
* @Author: tengmaoqing
* @Date:   2018-04-16 14:05:40
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-06-13 20:39:29
*/

// store.js
import { storeFnCreator } from '@/system/init/init-store';

const loadConfig = pid => {
  let c = null;
  try {
    c = require(`../config/${pid}.js`);
  } catch (err) {
    //  default
    c = require('../config/default.js');
  }

  return c;
};

export function createStore () {
  return storeFnCreator(loadConfig);
};
