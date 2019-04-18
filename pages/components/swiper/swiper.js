// pages/components/swiper/swiper.js
const WXAPI = require('../../../wxapi/main')
const CONFIG = require('../../../config.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    banners:[]
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      var that = this;
      WXAPI.banners().then(function (res) {
        if (res.code == 0) {
          that.setData({
            banners: res.Body
          })
          
        } else {
          wx.showModal({
            title: '提示',
            content: res.error,
            showCancel: false
          })
        }
      })
    },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {
    var that = this;
    WXAPI.banners().then(function (res) {
      if (res.code == 0) {
        that.setData({
          banners: res.Body
        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.error,
          showCancel: false
        })
      }
    })
   }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () { },
  /**
   * 组件的方法列表
   */
  methods: {
    //事件处理函数
    swiperchange: function (e) {
      // console.log(e.detail.current)
      this.setData({
        swiperCurrent: e.detail.current
      })
    }
  }
})