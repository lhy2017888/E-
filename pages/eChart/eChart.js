import * as echarts from '../../ec-canvas/echarts';
const WXAPI = require('../../wxapi/main')
const timeDate = require('../../utils/util.js')

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    // title: {
    //   text: '图标',
    //   left: 'center'
    // },
    color: ["#85c86f", "#1793b5", "#c08c29", "#ff8023"],
    legend: {
      data: ['销售总额', '商品成本', '利润', '利润率'],
      top: 15,
      left: 'center',
      textStyle: {
        fontSize: 12,
      },
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLabel:{
        textStyle:{
          fontSize:13,
        }
      }
    },
    yAxis: {
      x: 'center',
      type: 'value',
      axisLabel: {
        textStyle: {
          fontSize: 13,
        }
      }
    },
    series: [{
      name: '销售总额',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30, 78, 40, 33]
    }, {
      name: '商品成本',
      type: 'line',
      smooth: true,
      data: [12, 50, 51, 35, 70, 30, 20]
    }, {
      name: '利润',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40, 20, 10]
    }, {
      name: '利润率',
      type: 'line',
      smooth: true,
      data: [8, 46, 51, 23, 55, 67, 50]
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function(res) {},
  data: {
    ec: {
      onInit: initChart
    },
    report_id: '',
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
  },
  /**
     * 生命周期函数--监听页面加载
     */
  getData(index) {
    
  },
  tabClick(e) {
    const that = this;
    that.setData({
      ifShowMore: false,
      reportDataArr: [],
      reportNumAll: ''
    })
    if (that.data.activeCategoryId === e.currentTarget.dataset.current) {
      return false;
    } else {
      this.setData({
        activeCategoryId: e.currentTarget.dataset.current
      })
    }
  },
  bindchange: function (e) {
    const that = this;
    that.setData({
      activeCategoryId: e.detail.current
    })
    that.dataTime(that.data.activeCategoryId)
  },
  dataTime(index) {
    if (index == 0) {
      this.setData({
        beginTime: timeDate.todayData().beginTime,
        endTime: timeDate.todayData().endTime,
      })
      this.getData(index);
    } else if (index == 1) {
      this.setData({
        beginTime: timeDate.yesterdayData().beginTime,
        endTime: timeDate.yesterdayData().endTime,
      })
      this.getData(index);
    } else if (index == 2) {
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
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.setData({
      report_id: options.id
    })
  },
  onReady() {}
});