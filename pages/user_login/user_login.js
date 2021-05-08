const app = getApp()
Page({
  data: {
    username:'',
    password:'',
    windowHeight:'',
    windowWidth:''
  },
  formSumbit:function (e) {
    console.log("点击登录按钮");
    console.log(e.detail.value);
    this.setData({
      username: e.detail.value.account,
      password: e.detail.value.password,
    })
    var that = this;
    console.log(app.globalData.serverIp + 'signin/')

    let str = ''
    for (let key in that.data) {
        str += '\r\n--XXX' + '\r\nContent-Disposition:form-data;name="' + key + '"' + '\r\n' + '\r\n' + that.data[key] +
            '\r\n--XXX'
    }
    str += '--'  // 这里必须是以它结尾
    wx.request({//to be modified
      url: app.globalData.serverIp + 'signin/',
      method: "POST",
      // dataType:'JSON',
      header: {
        'content-type': 'multipart/form-data;boundary=XXX'
      },
      data: str,
      success:function (res) {
        console.log(JSON.stringify(res.data))
        console.log("响应状态码: " + res.data.status);
        console.log("响应数据: ", res.data.message);
        // app.globalData.token = res.data.token;
        // app.globalData.userinfo = res.data.userinfo;
        // 跳转到邮箱页面 
      },
      fail: function (res) {
        console.log("登录失败");
        wx.showToast({
          title: '登录失败',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    })
  },
  onLoad: function () {
    this.setData({
      windowWidth:app.globalData.windowWidth,
      windowHeight:app.globalData.windowHeight
    })
  },
  
  formRest:function () {
    console.log("点击了注册");
    wx.redirectTo({
      url: '../sign_up/sign_up',
    })
  },
})
