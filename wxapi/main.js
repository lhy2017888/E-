// 小程序开发api接口工具包，https://github.com/gooking/wxapi
const CONFIG = require('./config.js')
const common = require('../utils/common.js')
const API_BASE_URL = 'https://mireport.wisder.com/miapi/rest/'

const request = (url, method, data) => {
  let _url = API_BASE_URL  + url
  let params = Object.assign({},data)
  let { loginsession, timestamp, v } = common.getBaseParams()
  // 验签
  let signFilter = params.signFilter || [];
  delete params.signFilter; 
  let _sign = Object.assign({}, params, {
    loginsession,
    v,
    timestamp,
    method: url
  });
  // console.log(_sign)
  let sign = common.getSign(_sign, url);

  if (method == "get") {
    url_ += `?loginsession=${loginsession}&timestamp=${timestamp}&v=${v}&method=${url}&sign=${sign}`;
  } else if (method == "post") {
    params = Object.assign(params, {
      loginsession,
      v,
      timestamp,
      sign,
      method:url
    });
  }


  return new Promise((resolve, reject) => {
    wx.showLoading({ title: '加载中', mask:true, icon: 'loading', duration: 10000 });
    wx.request({
      url: _url,
      method: method,
      data: params,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        resolve(request.data)
      },
      fail(err) {
        reject(err)
        // let app = getApp()
        // if(app.isOutTime){
        //   app.isOutTime = false
        //   wx.showModal({
        //     title: '网络请求出错',
        //     content: err.errMsg,
        //     showCancel: false,
        //     success:function(res){
        //       if(res.confirm){
        //         reject(err)
        //         // util.prompt('请求超时！', 'loading', 1000);
        //       }
        //     }
        //   })
        // }
        wx.showModal({
          title: '提示',
          content: (err.errMsg && err.errMsg === 'request:fail timeout') ? '请求超时!' : (err.errMsg || err.error),
          showCancel: false
        })
      },
      complete() {
        wx.hideLoading()
      }
    })
  })
}

/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value;
        }
      );
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason;
        }
      );
    }
  );
}

module.exports = {
  request,
  login: (code) => {
    return request('login_ez_by_wechat', 'post', {
      wx_code: code,
      client_code:'123456'
    })
  },
  refreshloginsession:(data)=>{
    return request('refresh_ez_loginsession','post',{
      openid:data,
      client_code:'123456'
    })
  },
  bindEz: (openid, cid, user, password) => {
    return request('bind_ez_user', 'post', {
      openid,
      cid,
      user,
      password,
      client_code: '123456'
    })
  },
  banners: () => {
    return request('get_banner_list', 'post', {
      client_code: '123456'
    })
  },
  bindOut: (openid)=>{
    return request('release_ez_user','post',{
      openid,
      client_code: '123456'
    })
  },
  reportList: (openid,type)=>{
    return request('get_rpt_list','post',{
      openid,
      type,
      client_code: '123456'
    })
  },
  reportOpen: (openid, report_id, open_status)=>{
    return request('switch_my_report','post',{
      openid,
      report_id,
      open_status,
      client_code: '123456'
    })
  },
  reportDetail: (openid, report_id, in_json)=>{
    return request('get_rpt_json_data','post',{
      openid,
      report_id,
      in_json,
      client_code: '123456'
    })
  }
}
