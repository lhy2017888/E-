// pages/bindEz/bindEz.js
const WXAPI = require('../../wxapi/main')
const md5 = require('../../utils/md5.min.js')
const common = require('../../utils/common.js')
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    advertImg:false,
    buttonColor:false
  },

  formSubmit: function(e) {
    let that = this
    that.setData({
      buttonColor:true
    })
    let inputCID = e.detail.value.inputCID;
    let inputName = e.detail.value.inputName;
    let inputSecret = common._arrayBufferToBase64(md5.digest(e.detail.value.inputSecret));
    const openId = wx.getStorageSync('openId');
    WXAPI.bindEz(openId, inputCID, inputName, inputSecret).then(function(res) {
      if (res.code == 0) {
        wx.setStorageSync('bindUser', res.Body.user)
        wx.setStorageSync('bindCid', res.Body.cid)
        wx.setStorageSync('loginSession', res.Body.loginsession)
        app.bingedEz = true;
        that.setData({
          buttonColor: false
        })
        wx.showToast({
          title: '绑定成功',
          icon: 'success',
          duration: 2000
        })
        wx.navigateBack()
      }else{
        wx.showModal({
          title: '提示',
          content: res.error,
          showCancel: false
        })
      }
    })
  },
  showImg(){
    this.setData({
      advertImg: true
    })
  },
  cancelImg(){
    this.setData({
      advertImg: false
    })
  }
})