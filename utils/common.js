const md5 = require('./md5.min.js')
 const polyfill = require('./base64.min.js')
const { btoa } = polyfill
module.exports = {
  timeStamp() {
    return Date.parse(new Date()) / 1000;
  },
  getBaseParams() {
    let loginsession = wx.getStorageSync('loginSession');
    let v = "1.0";
    let timestamp = this.timeStamp();
    return {
      loginsession,
      v,
      timestamp
    };
  },
  getSign(obj, method) {
    let newkey = Object.keys(obj).sort()
    var newObj = {}
    for (var i = 0; i < newkey.length; i++) {
      newObj[newkey[i]] = obj[newkey[i]]
    }
    var newStr = ''
    for (var item in newObj) {
      newStr += item + newObj[item]
    }
    var content = method + newStr + method
    return md5.hex(content).toUpperCase();
  },
  // MD5加密字符组，Base64再加密
  _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
}