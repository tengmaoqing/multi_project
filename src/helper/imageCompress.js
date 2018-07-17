/*
 * @Author: tengmaoqing
 * @Date:   2018-05-11 15:01:53
 * @Last Modified by:   tengmaoqing
 * @Last Modified time: 2018-05-15 20:18:44
 */

function photoCompress (file, w) {
  return new Promise((resolve, reject) => {
    const ready = new FileReader();
    ready.readAsDataURL(file);
    ready.onload = function () {
      const re = this.result;
      resolve(canvasDataURL(re, w));
    };

    ready.onerror = reject;
  });
};

function canvasDataURL (path, obj) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = path;
    img.onload = function () {
      const that = this;
      // 默认按比例压缩
      let w = that.width;
      let h = that.height;
      const scale = w / h;

      w = obj.width || w;
      h = obj.height || (w / scale);
      let quality = 0.7; // 默认图片质量为0.7
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      // 创建属性节点
      const anw = document.createAttribute('width');
      anw.nodeValue = w;
      const anh = document.createAttribute('height');
      anh.nodeValue = h;
      canvas.setAttributeNode(anw);
      canvas.setAttributeNode(anh);
      ctx.drawImage(that, 0, 0, w, h);
      // 图像质量
      if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
        quality = obj.quality;
      }
      // quality值越小，所绘制出的图像越模糊
      const base64 = canvas.toDataURL('image/jpeg', quality);
      // 回调函数返回base64的值
      resolve(base64);
    };
    img.onerror = reject;
  });
};

function convertBase64UrlToBlob (urlData) {
  const arr = urlData.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

export default photoCompress;
export {
  photoCompress,
  convertBase64UrlToBlob
};
