/*
* @Author: tengmaoqing
* @Date:   2018-06-15 10:15:45
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-06-15 15:00:00
*/
let styleEL = null;

const createStyle = () => {
  const dom = document.createElement('style');
  // dom.setAttribute('rel', 'stylesheet');
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(dom);
  return dom;
};

const loadTheme = theme => {
  // documentElement.classList.add(`theme-${theme}`);
  let css = '';
  try {
    css = require(`./${theme}.theme`);
  } catch (err) {
    console.warn(`没有找到这个主题: ${theme}`);
    return;
  }

  if (!styleEL) {
    styleEL = createStyle();
  }
  styleEL.innerHTML = css;
};

export default loadTheme;
