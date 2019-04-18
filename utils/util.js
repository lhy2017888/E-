module.exports = {
  //今日
  todayData() {
    let date = new Date();
    return {
      beginTime: Math.floor(new Date(date.toLocaleDateString()).getTime() / 1000),
      endTime: Math.floor(date.getTime() / 1000)
    }
  },
  //昨日
  yesterdayData() {
    let date = new Date();
    return {
      beginTime: Math.floor((new Date(date.toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000) / 1000),
      endTime: Math.floor((new Date(date.toLocaleDateString()).getTime() - 1) / 1000)
    }
  },
  //本周
  weekData() {
    let date = new Date();
    return {
      beginTime: Math.floor((new Date(date.toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000 * date.getDay()) / 1000),
      endTime: Math.floor(date.getTime() / 1000)
    }
  },
  //本月
  mouthData() {
    let date = new Date();
    return {
      beginTime: Math.floor((new Date(date.toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000 * (date.getDate()-1)) / 1000),
      endTime: Math.floor(date.getTime() / 1000)
    }
  }
}