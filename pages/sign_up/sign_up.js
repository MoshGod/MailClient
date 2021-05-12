// pages/sign_up/sign_up.js
const app = getApp()
var util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    pass1:'',
    pass2:'',
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
      pass1:e.detail.value,
    })
  },
  pass2_input: function (e){
    this.setData({
      pass2:e.detail.value,
    })
  },
  sign_up: function (e){
    console.log("点击注册按钮");
    console.log(this.data);
    this.setData({
      username:'',
      pass1:'',
      pass2:'',
    })
  },
  formSumbit: function (e){
  },
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

  }
})