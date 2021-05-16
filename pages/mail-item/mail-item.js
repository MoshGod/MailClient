// pages/mail-item/mail-item.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalHidden:true,//是否隐藏对话框
    margin_top: 0,
    windowHeight: 0,

    mailItem: {},
  },
  modalBindaconfirm:function(){
    this.setData({
      modalHidden:!this.data.modalHidden,
    })
  },
  //取消按钮点击事件(关闭弹出)
  modalBindcancel:function(){
    this.setData({
      modalHidden:!this.data.modalHidden,
    })
  }, 
  onSyncEnsure:function(){
    this.setData({
      modalHidden: false,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      margin_top: app.globalData.titleBarHeight+app.globalData.statusBarHeight,
      windowHeight: app.globalData.windowHeight,
      mailItem: {
        mailNo: 1,
        receiver: 'moshgod@index.cn',
        time: '2021-01-06 19:47',
        subject: 'hello',
        sender: 'cbowu@index.cn',
        content: 'hello world!'
      }
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