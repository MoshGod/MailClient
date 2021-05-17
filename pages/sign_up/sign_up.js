// pages/sign_up/sign_up.js
const app = getApp()
var util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:'',
    password2:'',
    windowHeight:'',
    windowWidth:'',
  },
  username_input: function (e){
    this.setData({
      username:e.detail.value,
    })
  },
  pass1_input: function (e){
    this.setData({
      password:e.detail.value,
    })
  },
  pass2_input: function (e){
    this.setData({
      password2:e.detail.value,
    })
  },
  // sign_up: function (e){
  //   console.log("点击注册按钮");
  //   console.log(this.data);
  //   this.setData({
  //     username:'',
  //     pass1:'',
  //     pass2:'',
  //   })
  // },
  // formSumbit: function (e){
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      windowWidth:app.globalData.windowWidth,
      windowHeight:app.globalData.windowHeight
    })
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

  sign_up: function (e) {
    console.log("点击注册按钮");
    console.log(this.data);
    var that = this;
    console.log(app.globalData.serverIp + 'signup/');
    // 校验表单是否填写完整
    if (that.data.username == "" || that.data.password == "" || that.data.password2 == ""){
      wx.showToast({
        title: '请填写完整所有信息',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      that.setData({
        username: '',
        password: '',
        password2: '',
      })
      return
    }
    // 校验邮箱
    var reg = /^\w+@test.com$/

    if (reg.test(that.data.username)) {
      console.log('邮箱校验成功:', that.data.username);
    } else {
      console.log('邮箱校验失败:');
      wx.showModal({
        title: '错误',
        content: '请输入合法邮箱',
        success: function (e) {
          if (e.confirm) {
              that.setData({
              username: '',
              password: '',
              password2: '',
            })
          }
        }
      })
      return 
    }
    // 检验两次输入密码是否相同
    if (that.data.password != that.data.password2) {
      wx.showModal({
        title: '错误',
        content: '两次输入密码不一致',
        success: function (e) {
          if (e.confirm) {
              that.setData({
                password: '',
                password2: '',
              })
          }
        }
      })
      return 
    }

    /* 发送数据 */
    let str = ''
    for (let key in that.data) {
        str += '\r\n--XXX' + '\r\nContent-Disposition:form-data;name="' + key + '"' + '\r\n' + '\r\n' + that.data[key] +
            '\r\n--XXX'
    }
    str += '--'  // 这里必须是以它结尾
    wx.request({//to be modified
      url: app.globalData.serverIp + 'signup/',
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
        // 跳转到登录页面
        wx.showToast({
          title: '注册成功！',
          icon: 'none',
          duration: 1000,
          mask: true,
          success: function(e){
            setTimeout(function(){
              wx.navigateTo({
                url: '../user_login/user_login',
              })
            }, 1000)
          }
        }) 
        
      },
      fail: function (res) {
        console.log("注册失败");
        // wx.navigateTo({
        //   url: '../user_login/user_login',
        // })
        wx.showToast({
          title: '注册失败',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    })
  },

})