const WXAPI = require('wxapi/main')
App({
  navigateToLogin: false,
  bingedEz: false,
  onLaunch: function() {
    const that = this;
    // 检测新版本
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    /**
     * 初次加载判断网络情况
     * 无网络状态下根据实际情况进行调整
     */
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if (networkType === 'none') {
          that.globalData.isConnected = false
          wx.showToast({
            title: '当前无网络',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    });
    /**
     * 监听网络状态变化
     * 可根据业务需求进行调整
     */
    wx.onNetworkStatusChange(function(res) {
      if (!res.isConnected) {
        that.globalData.isConnected = false
        wx.showToast({
          title: '网络已断开',
          icon: 'loading',
          duration: 2000,
          complete: function() {
            that.goStartIndexPage()
          }
        })
      } else {
        that.globalData.isConnected = true
        wx.hideToast()
      }
    });
    // 判断是否登录
    let openId = wx.getStorageSync('openId');
    if (!openId) {
      that.goLoginPageTimeOut()
      return
    } else {
      const loginSession = wx.getStorageSync('loginSession')
      if (!loginSession) {
        that.goBindEzTimeOut()
        return
      }
      that.bingedEz = true;
      WXAPI.refreshloginsession(openId).then(function(res) {
        if (res.code == 0) {
          wx.setStorageSync('loginSession', res.Body.loginsession)
        } else {
          wx.showModal({
            title: '提示',
            content: res.error,
            showCancel: false
          })
        }
      })

    }
  },
  goLoginPageTimeOut: function() {
    this.navigateToLogin = true
    setTimeout(function() {
      wx.navigateTo({
        url: "/pages/login/login"
      })
    }, 1000)
  },
  goBindEzTimeOut: function() {
    setTimeout(function() {
      wx.navigateTo({
        url: "/pages/bindEz/bindEz"
      })
    }, 1000)
  },
  goStartIndexPage: function() {
    setTimeout(function() {
      wx.redirectTo({
        url: "/pages/login/login"
      })
    }, 1000)
  },
  globalData: {
    isConnected: true
  }
})