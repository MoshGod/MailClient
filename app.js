// app.js
App({
  globalData: {//to be modified
    statusBarHeight: 0,
    titleBarHeight: 0,
    windowHeight:'',
    windowWidth:'',
    serverIp:'http://127.0.0.1:8000/webmail/',
    token: {
      token: '',
      expirationTime: ''
    },
    userInfo: {
      username: '',
      password: ''
    },
    // hasLogin: false,
    // openid: null
  },
  onLaunch() {
    var that = this;
    wx.getSystemInfo({
      success(res) {
        that.globalData.windowHeight = res.windowHeight;
        that.globalData.windowWidth = res.windowWidth;
        if (res.model.indexOf('iPhone') !== -1) {
          that.globalData.titleBarHeight = 44
        } else {
          that.globalData.titleBarHeight = 48
        }
        that.globalData.statusBarHeight = res.statusBarHeight
      },
    })

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  }
})
