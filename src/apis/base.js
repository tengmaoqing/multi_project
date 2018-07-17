/*
* @Author: tengmaoqing
* @Date:   2018-04-17 11:53:16
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-06-26 15:59:27
*/
import parse from 'url-parse';
import createInstance from './instanceCreator';

let baseConfig = {
  apiHost: '//mobile.huishoubao.com',
  state: {}
};

const httpInstances = createInstance();
httpInstances.interceptors.request.use(config => {
  const urlObj = parse(config.url, true);
  if (!urlObj.query.pid) {
    urlObj.query.pid = baseConfig.state.pid;
    config.url = urlObj.toString();
  }

  if (!urlObj.query.token) {
    urlObj.query.token = baseConfig.state.user.loginToken;
    config.url = urlObj.toString();
  }

  if (baseConfig.trunks) {
    Object.keys(baseConfig.trunks).forEach(trunk => {
      if (!urlObj.query[trunk]) {
        urlObj.query[trunk] = baseConfig.trunks[trunk];
        config.url = urlObj.toString();
      }
    });
  }

  if (baseConfig.onRequest) {
    baseConfig.onRequest(config);
  }
  return config;
});

httpInstances.interceptors.response.use(response => {
  if (baseConfig.onEnd) {
    baseConfig.onEnd(response);
  }
  return new Promise((resolve, reject) => {
    const result = response.data;
    if (!baseConfig.checkResult) {
      resolve(result);
      return;
    }
    if (baseConfig.checkResult(result)) {
      resolve(result);
      return;
    }
    reject(new Error('验证未通过'));
  });
}, (err) => {
  if (baseConfig.onEnd) {
    baseConfig.onEnd(err);
  }
  return Promise.reject(err);
});

export const httpConfig = con => Object.assign(baseConfig, con);
export default httpInstances;
export { baseConfig, httpInstances };

export const getProducts = (categoryId, brandId, pageIndex = 1, pageSize = 20) => {
  return httpInstances.get(`${baseConfig.apiHost}/api/product/getProductList?classId=${categoryId}&brandId=${brandId}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
};

export const getProductsByKey = (keyword, pageIndex = 1, pageSize = 20) => {
  return httpInstances.get(`${baseConfig.apiHost}/api/product/getProductList?keyword=${keyword}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
};

export const getBrands = (categoryId, pageSize = 100) => {
  return httpInstances.get(`${baseConfig.apiHost}/api/product/getBrandList?classId=${categoryId}&pageSize=${pageSize}`);
};

export const getCategory = () => {
  return httpInstances.get(`${baseConfig.apiHost}/api/product/getCategoryList`);
};

export const getProductParams = productId => {
  return httpInstances.get(`${baseConfig.apiHost}/api/product/getProductParam?productId=${productId}`);
};

export const evaluate = (productId, select) => {
  return httpInstances.post(`${baseConfig.apiHost}/api/product/evaluate`, {select, productId});
};

export const getEvInfo = evaluateid => {
  return httpInstances.get(`${baseConfig.apiHost}/api/product/getEvaluateResult?evaluateid=${evaluateid}`);
};

export const getPayway = () => {
  return httpInstances.post(`${baseConfig.apiHost}/api/user/getPayway`);
};

export const createOrder = ({ evaluateid, tel, payType, regionId, recycleType, time, province, city, county, address, activityId, couponId, payAccount, payName, userName, imei }) => {
  return httpInstances.post(`${baseConfig.apiHost}/api/order/placeOrder`, {
    evaluateid,
    tel,
    payType,
    regionId,
    recycleType,
    time,
    province,
    city,
    county,
    address,
    activityId,
    couponId,
    payAccount,
    payName,
    userName,
    imei
  });
};

export const getTempOrder = orderNum => {
  return httpInstances.get(`${baseConfig.apiHost}/api/order/getOrderResult?orderNum=${orderNum}`);
};

export const getSfCity = () => {
  return httpInstances.get(`${baseConfig.apiHost}/api/Common/getSfCity`);
};

export const supportVisitTime = () => {
  return httpInstances.get(`${baseConfig.apiHost}/api/Common/supportVisitTime`);
};

export const getSMSCode = (tel, randcode) => {
  return httpInstances.post(`${baseConfig.apiHost}/common/user/getCode/`, {tel, randcode});
};

export const loginIn = (tel, code, validDays) => {
  return httpInstances.post(`${baseConfig.apiHost}/common/user/officialUserLogin`, {tel, code, valid_days: validDays});
};

export const getUserInfo = ntoken => {
  return httpInstances.post(`${baseConfig.apiHost}/api/user/getUserInfo?token=${ntoken}`);
};

export const getOrderList = (pageIndex, pageSize, kw = '') => {
  kw = String(kw);
  return httpInstances.post(`${baseConfig.apiHost}/api/order/getOrderList?pageIndex=${pageIndex}&pageSize=${pageSize}&kw=${kw}`);
};

export const getOrderDetail = orderNum => {
  return httpInstances.post(`${baseConfig.apiHost}/api/order/getOrderInfo?orderNum=${orderNum}`);
};

export const getBannerConfig = () => httpInstances.post(`${baseConfig.apiHost}/api/common/getBannerList`);

// 取消订单
export const cancelOrder = orderNum => httpInstances.post(`${baseConfig.apiHost}/api/order/cancelOrder?orderNum=${orderNum}`);

// 订单备注
export const orderRemark = (orderNum, content) => httpInstances.post(`${baseConfig.apiHost}/api/order/remark?orderNum=${orderNum}&content=${content}`);

/**
 * 获取获取价格趋势(http://wiki.huishoubao.net/index.php?s=/101&page_id=1630)
 */
export const getProductPriceTrend = (productId, price) => {
  return httpInstances.post(`${baseConfig.apiHost}/api/product/getPriceHistory?productId=${productId}&price=${price}`);
};

/**
 * 获取回收方式列表
 * @param platform
 * @param pid
 */
export const getRecycleTypeList = () => {
  return httpInstances.post(`${baseConfig.apiHost}/api/common/getRecycleTypeList`);
};
