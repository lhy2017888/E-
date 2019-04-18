// pages/reportDatail/reportDatail.js
const WXAPI = require('../../wxapi/main')
const timeDate = require('../../utils/util.js')
const app = getApp();

Page({
  data: {
    report_id:'',
    activeCategoryId: '0',
    beginTime: timeDate.todayData().beginTime,
    endTime: timeDate.todayData().endTime,
    categories: [{
        name: "今日",
        id: "0"
      },
      {
        name: "昨日",
        id: "1"
      },
      {
        name: "本周",
        id: "2"
      },
      {
        name: "本月",
        id: "3"
      }
    ],
    reportDataArr:[],
    reportNumAll:'',
    ReportHeight:'215rpx',
    reportLength:'',
    ifShowMore:false
  },
  bindchange: function (e) {
    const that = this;
    that.setData({
      activeCategoryId: e.detail.current
    })
    that.dataTime(that.data.activeCategoryId)
  },
  tabClick(e) {
    const that = this;
    that.setData({
      ifShowMore: false,
      reportDataArr:[],
      reportNumAll:''
    })
    if (that.data.activeCategoryId === e.currentTarget.dataset.current) {
      return false;
    } else {
      this.setData({
        activeCategoryId: e.currentTarget.dataset.current
      })
    }
  },
  reportMore(e) {
    this.setData({
      ifShowMore: false,
      ReportHeight:this.data.reportLength * 102 + 'rpx'
    })
  },
  getData(index){
    let that = this
    let openId = wx.getStorageSync('openId');
    let report_id = this.data.report_id;
    let in_json = JSON.stringify({beginTime:this.data.beginTime,endTime:this.data.endTime})
    WXAPI.reportDetail(openId, report_id, in_json).then(function(res){
      if(res.code == 0){
        let arrData = res.Body.items;
        let NumAllData = res.Body.trade_count;
        that.setData({
          reportDataArr: arrData,
          reportNumAll: NumAllData,
          reportLength: arrData.length,
          ifShowMore: true,
        })
        if (arrData.length <=9){
          that.setData({
            ReportHeight: 215 + arrData.length*102+'rpx',
            ifShowMore: false
          })
        }else{
          that.setData({
            ReportHeight: '1218rpx'
          })
        }
      }else{
        wx.showModal({
          title: '提示',
          content: res.error,
          showCancel: false
        })
      }
    })                                   
  },
  dataTime(index){
    if(index==0){
      this.setData({
        beginTime: timeDate.todayData().beginTime,
        endTime: timeDate.todayData().endTime,
      })
      this.getData(index);
    } else if (index == 1){
      this.setData({
        beginTime: timeDate.yesterdayData().beginTime,
        endTime: timeDate.yesterdayData().endTime,
      })
      this.getData(index);
    } else if (index == 2){
      this.setData({
        beginTime: timeDate.weekData().beginTime,
        endTime: timeDate.weekData().endTime,
      })
      this.getData(index);
    } else if (index == 3) {
      this.setData({
        beginTime: timeDate.mouthData().beginTime,
        endTime: timeDate.mouthData().endTime,
      })
      this.getData(index);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.title
    }) 
    this.setData({
      report_id: options.id
    })
    this.getData()
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

  }
})