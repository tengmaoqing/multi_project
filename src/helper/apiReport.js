/*
* @Author: tengmaoqing
* @Date:   2018-06-14 11:57:00
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-06-26 16:09:09
*/
import parse from 'url-parse';

export const sendReport = (functionName, startTime, spendTime, base = {}) => {
  const defaultData = [1, parseInt(+new Date() / 1000)];
  const retCode = base.retCode;
  const myID = 'HsbHeZuoWeb' || base.myID;
  const myNode = '';
  const herID = 'HsbApiAgent' || base.herID;
  const herNode = '119.29.42.78'; // api.huishoubao
  defaultData[2] = myID;
  defaultData[3] = myNode;
  defaultData[4] = herID;
  defaultData[5] = herNode;
  defaultData[6] = functionName;
  defaultData[7] = retCode;
  defaultData[8] = spendTime;
  defaultData[9] = startTime;

  if (process.env.NODE_ENV === 'production') {
    setTimeout(() => {
      const url = `//logreport.huishoubao.com/hjxapps?${defaultData.join('=')}`;
      new Image().src = url;
    }, 300);
  }
};

export const axiosResponesReport = (result) => {
  if (result.request && result.request.fromCache) {
    return;
  }
  const startTime = result.config.startTime;
  const now = +new Date();
  const urlObj = parse(result.config.url);
  const base = {};

  do {
    if (result.status !== 200) {
      base.retCode = result.status || -1;
      break;
    }
    base.retCode = result.data._errCode;
  } while (0);
  sendReport(urlObj.pathname, startTime, now - startTime, base);
};
