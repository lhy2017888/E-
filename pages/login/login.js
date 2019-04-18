const WXAPI = require('../../wxapi/main')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  bindGetUserInfo: function(e) {
    if (app.globalData.isConnected) {
      if (e.detail.userInfo) {
        wx.setStorageSync('userInfo', e.detail.userInfo)
        wx.login({
          success: function(res) {
            WXAPI.login(res.code).then(function(res) {
              if (res.code == 0) {
                let openId = res.Body.openid;
                wx.setStorageSync('openId', openId)
                // 回到原来的地方放
                app.navigateToLogin = false
                wx.navigateBack();
              } else {
                wx.showModal({
                  title: '提示',
                  content: res.error,
                  showCancel: false
                })
              }
            })
          }
        })
      }else{
        return
      }
    } else {
      wx.showToast({
        title: '当前无网络',
        icon: 'none',
      })
    }
  }
})