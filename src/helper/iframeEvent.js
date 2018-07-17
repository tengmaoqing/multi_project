/*
* @Author: tengmaoqing
* @Date:   2018-05-17 17:40:53
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-06-19 18:34:41
*/

export const setIfrHeight = h => {
  h = h || document.body.offsetHeight;

  window.parent.postMessage(JSON.stringify({
    evenId: 0,
    data: {
      height: h
    }
  }), '*');
};

export const scrollTo = h => {
  if (window.top === window) {
    window.scroll(0, h);
    return;
  }

  window.parent.postMessage(JSON.stringify({
    evenId: 1,
    data: {
      scrollTop: h
    }
  }), '*');
};

let SET_IFRAME_HEIGHT_URL = 'https://www.nubia.com/recycle.php?a=getHeight#';
let SET_IFRAME_SCROLL_URL = 'https://www.nubia.com/recycle.php?a=setTop#';

const createTempIframe = src => {
  const ifr = document.createElement('iframe');
  ifr.src = src;
  ifr.style.display = 'none';
  document.body.appendChild(ifr);
  setTimeout(() => ifr.parentNode.removeChild(ifr), 500);
};

export const setIfrHeightByURL = h => {
  if (window.top === window) {
    return;
  }
  h = h || document.body.offsetHeight;
  createTempIframe(SET_IFRAME_HEIGHT_URL + h);
};

export const scrollToByUrl = t => {
  if (window.top === window) {
    window.scroll(0, t);
    return;
  }
  createTempIframe(SET_IFRAME_SCROLL_URL + t);
};

export const configIframeURL = (hURL, sURL) => {
  SET_IFRAME_HEIGHT_URL = hURL;
  SET_IFRAME_SCROLL_URL = sURL;
};
