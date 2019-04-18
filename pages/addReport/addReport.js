// pages/addReport/addReport.js
const WXAPI = require('../../wxapi/main')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tableList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    let bingedEz = app.bingedEz
    that.setData({
      bingedEz: bingedEz
    })
    this.getData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindEz() {
    wx.navigateTo({
      url: '/pages/bindEz/bindEz'
    })
  },
  getData(){
    let that = this;
    let openId = wx.getStorageSync('openId')
    WXAPI.reportList(openId, 'all').then(function (res) {
      if (res.code == 0) {
        that.setData({
          tableList: res.Body.items
        })
      }
    })
  },
  reportOpen(e){
    let that = this
    let open_status = e.currentTarget.dataset.item.open_status ? 'close' :'open';
    let report_id = e.currentTarget.dataset.item.id
    let openId = wx.getStorageSync('openId')
    let timer;
    if (timer){
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      WXAPI.reportOpen(openId, report_id, open_status).then(function (res) {
        if (res.code == 0) {
          that.getData()
          wx.showToast({
            title: '修改成功',
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
    }, 800);  
  }
})