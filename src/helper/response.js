/*
* @Author: tengmaoqing
* @Date:   2018-04-28 16:51:38
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-04-28 16:58:12
*/

const XSSCREEN = 769;
const MDSCREENT = 1201;

export const isXSScreen = () => {
  const cw = document.body.clientWidth;
  if (cw < XSSCREEN) {
    return true;
  }
  return false;
};

export const isMDScreen = () => {
  const cw = document.body.clientWidth;
  if (cw < MDSCREENT) {
    return true;
  }
  return false;
};
