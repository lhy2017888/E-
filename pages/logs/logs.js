const app = getApp()
const CONFIG = require('../../config.js')
const WXAPI = require('../../wxapi/main')
Page({
  data: {
    balance: 0.00,
    freeze: 0,
    score: 0,
    score_sign_continuous: 0,
  },
  onShareAppMessage: function () {
    return {
      title: '自定义转发标题',
      path: '/pages/logs/logs'
    }
  },
  onShow() {
    let that = this;
    let bingedEz = app.bingedEz
    let bindUser = wx.getStorageSync('bindUser')
    let bindCid = wx.getStorageSync('bindCid')
    that.setData({
      bingedEz: bingedEz,
      bindUser: bindUser,
      bindCid: bindCid
    })
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      app.goLoginPageTimeOut()
    } else {
      that.setData({
        userInfo: userInfo,
        version: CONFIG.version
      })
    }
  },
  aboutUs() {
    wx.navigateTo({
      url: "/pages/aboutUs/aboutUs"
    })
  },
  bindEz(){
    wx.navigateTo({
      url: '/pages/bindEz/bindEz'
    })
  },
  bindOut(){
    let that = this
    let loginSession = wx.getStorageSync('loginSession');
    let openId = wx.getStorageSync('openId');
    if (!loginSession){
      return
    }
    wx.showModal({
      title: '提示',
      content: '是否确定解绑？',
      success(res) {
        console.log(res)
        if (res.confirm) {
          WXAPI.bindOut(openId).then(function (res) {
            if (res.code == 0) {
              wx.removeStorageSync('bindUser')
              wx.removeStorageSync('bindCid')
              wx.removeStorageSync('loginSession')
              app.bingedEz = false
              that.setData({
                bingedEz: app.bingedEz
              })
              wx.showToast({
                title: '解绑成功',
                icon: 'success',
                duration: 2000
              })
            } else {
              wx.showModal({
                title: '提示',
                content: res.error,
                showCancel: false
              })
            }
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '取消解绑',
            icon: 'cancel',
            duration: 2000
          })
        }
      }
    })
    
  },
  
  relogin: function () {
    app.goLoginPageTimeOut()
  },
})