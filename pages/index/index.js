//index.js
const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    // indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
  },
  //事件处理函数
  swiperchange: function(e) {
    // console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  tapBanner: function(e) {
    if (e.currentTarget.dataset.id != 0) {
      wx.navigateTo({
        url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
      })
    }
  },
  onLoad: function() {
    var that = this;
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName'),
    })
    WXAPI.banners({
      type: 'index'
    }).then(function(res) {
      if (res.code == 700) {
        wx.showModal({
          title: '提示',
          content: '请在后台添加 banner 轮播图片，自定义类型填写 index',
          showCancel: false
        })
      } else {
        that.setData({
          banners: res.data
        })
      }
    }).catch(function(e){
      wx.showToast({
        title: e.msg,
        icon:'none'
      })
    })
  }
})