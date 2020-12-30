const request = require('request-promise-native');

const excelUtils = {
  /**
   * convertImgToBase64
   * @param  {String}   url
   * @param  {Function} callback
   * @param  {String}   [outputFormat='image/png']
   * @author HaNdTriX
   * @example
   convertImgToBase64('http://goo.gl/AOxHAL', function(base64Img){
		console.log('IMAGE:',base64Img);
	})
   */
  convertImgToBase64: function (url, callback, outputFormat) {
    let canvas = document.createElement('CANVAS');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL(outputFormat || 'image/png');
      callback.call(this, dataURL);
      // Clean up
      canvas = null;
    };
    img.src = url;
  },
  urlToBase64: function (url) {
    // 图片压缩处理
    if (url) {
      if (url.indexOf("market-maoniunet") !== -1) {
        url = url + "?x-oss-process=image/resize,w_350,h_350/quality,Q_60";
      }
      if (url.indexOf("alicdn") !== -1) {
        url = url + "_350x350.jpg"
      }
    }
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;
        // 将图片插入画布并开始绘制
        canvas.getContext('2d').drawImage(image, 0, 0);
        // result
        const result = canvas.toDataURL('image/png');
        resolve(result);
      };
      // CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
      image.setAttribute("crossOrigin", 'Anonymous');
      image.src = url;
      // 图片加载失败的错误处理
      image.onerror = () => {
        // 图片加载失败时返回空
        resolve("");
      };
    })
  },
  urlToBuffer: function (url) {
    return request({
      url,
      method: 'GET',
      encoding: null
    }).then(res => {
      console.log(res);
      const imageBuffer = Buffer.from(res);
      return imageBuffer;
    })
  }

};

export default excelUtils;
