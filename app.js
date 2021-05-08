// app.js
App({
  globalData: {//to be modified
    windowHeight:'',
    windowWidth:'',
    serverIp:'http://127.0.0.1:8000/webmail/',
    token: {
      token: '',
      expirationTime: ''
    },
    userInfo: {
      userId: '',
    },
    // hasLogin: false,
    // openid: null
  },
  onLaunch() {
    var that = this;
    wx.getSystemInfo({
      success(res) {
        console.log(res);
        console.log("height="+ res.windowHeight);
        console.log("width="+res.windowWidth);
        that.globalData.windowHeight = res.windowHeight;
        that.globalData.windowWidth = res.windowWidth;
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
