//index.js
const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    tableList: []
  },
  addReport() {
    wx.navigateTo({
      url: '../../pages/addReport/addReport'
    })
  },
  reportDetail(e) {
    let title = e.currentTarget.dataset.title
    let id = e.currentTarget.dataset.id
    if(id==2){
      wx.navigateTo({
        url: '/pages/eChart/eChart?id=' + id + '&title=' + title
      })
      return
    }
    wx.navigateTo({
      url: '../../pages/reportDatail/reportDatail?id=' + id+'&title='+title
    })
  },
  bindEz() {
    wx.navigateTo({
      url: '/pages/bindEz/bindEz'
    })
  },
  onShow: function() {
    let that = this
    let bingedEz = app.bingedEz
    that.setData({
      bingedEz: bingedEz
    })
    let loginSession = wx.getStorageSync('loginSession')
    if (loginSession) {
      let openId = wx.getStorageSync('openId')
      WXAPI.reportList(openId, 'open').then(function(res) {
        if (res.code == 0) {
          that.setData({
            tableList: res.Body.items
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.error,
            showCancel: false
          })
        }
      })
    }else{
      return
    }
  },
  onShareAppMessage: function() {
    console.log(222)
    wx.getShareInfo({
      shareTicket: 'aaa',
      success: function() {
        console.log(111)
      }
    })
  }

})