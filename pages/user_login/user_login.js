const app = getApp()
Page({
  data: {
    username:'',
    password:'',
    windowHeight:'',
    windowWidth:''
  },
  account_input: function(e) {
    this.setData({
      username: e.detail.value,
    })
  },
  pass_input: function(e) {
    this.setData({
      password: e.detail.value,
    })
  },
  log_in: function (e) {
    console.log("点击登录按钮"+this.data.username+' '+this.data.password);
    var that = this;
    console.log(app.globalData.serverIp + 'signin/')
    // 校验表单是否填写完整
    if (that.data.username == "" || that.data.password == "" ){
      wx.showModal({
        title: '错误',
        content: '请填写完整所有信息',
        success: function (e) {
          if (e.confirm) {
              that.setData({
                username: '',
                password: ''
              })
          }
        }
      })
      return
    }
    let str = ''
    for (let key in that.data) {
        str += '\r\n--XXX' + '\r\nContent-Disposition:form-data;name="' + key + '"' + '\r\n' + '\r\n' + that.data[key] +
            '\r\n--XXX'
    }
    str += '--'  // 这里必须是以它结尾
    wx.request({
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
        if (res.data.status == 200){
            wx.navigateTo({
            url: '../inbox/inbox?username=' + that.data.username + '&password=' + that.data.password
          })
        } else {
          console.log("登录失败");
          wx.showToast({
            title: '登录失败，请验证登录信息是否正确',
            icon: 'none',
            duration: 1000,
            mask: true
          })
        }
        
      },
      fail: function (res) {
        console.log("登录失败");
        wx.showToast({
          title: '登录失败，请验证登录信息是否正确',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        that.data.username = ''
        that.data.password = ''
      }
    })
  },
  onLoad: function () {
    this.setData({
      windowWidth:app.globalData.windowWidth,
      windowHeight:app.globalData.windowHeight
    })
  },
  
  sign_up:function () {
    console.log("点击了注册");
    wx.redirectTo({
      url: '../sign_up/sign_up',
    })
  },
})
