/*
* @Author: tengmaoqing
* @Date:   2018-05-01 16:37:05
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-05-28 16:52:44
*/

export const fen2yuan = (number, options = {}) => {
  const formatter = {
    symbol: '￥',
    symbolOnLeft: true,
    thousandsSeparator: ',',
    decimalSeparator: '.',
    spaceBetweenAmountAndSymbol: false,
    decimalDigits: 2
  };

  const currency = Object.assign(formatter, options);
  // const symbolOnLeft = currency.symbolOnLeft;
  // const spaceBetweenAmountAndSymbol = currency.symbolOnLeft;
  const { symbol, decimalDigits, symbolOnLeft, spaceBetweenAmountAndSymbol } = {...currency};
  let p = 0;
  if (typeof Number(number) === 'number') {
    p = (number / 100).toFixed(decimalDigits);
  }
  if (spaceBetweenAmountAndSymbol) {
    p = ` ${p} `;
  }
  return (symbolOnLeft ? symbol + p : p + symbol).trim();
};

export const trim = str => str.trim();

// export const superEncode = url => {
//   return encodeURI(url).replace('(', '%28').replace(')', '%29');
// };
