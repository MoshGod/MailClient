// pages/outbox/outbox.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rev_mail_list: [
      {
        id: 1,
        isRead: true,
        time: '2021-01-06 19:47',
        sender: '芒果',
        subject: "我是张三，见到大家很高兴。。。"
      }, 
      {
        id: 2,
        isRead: false,
        time: '2021-01-06 19:47',
        sender: '香蕉',
        subject: "我是李四，可以带大将去玩。。。。"
  
      },
      {
        id: 3,
        isRead: true,
        time: '2021-01-06 19:47',
        sender: '苹果',
        subject: "我是王五，我编码贼好。。。。"
  
      },
      {
        id: 4,
        isRead: true,
        time: '2021-01-06 19:47',
        sender: '芒果',
        subject: "我是张三，见到大家很高兴。。。"
      }, 
      {
        id: 5,
        isRead: false,
        time: '2021-01-06 19:47',
        sender: '香蕉',
        subject: "我是李四，可以带大将去玩。。。。"
      },
      {
        id: 8,
        isRead: false,
        time: '2021-01-06 19:47',
        sender: '苹果',
        subject: "我是王五，我编码贼好。。。。"
      }  
    ],

  },

  // 点击了某个邮件，跳转到邮件详细页面
  click: function (e) { 
    console.log("按了：", e.currentTarget.id)
    console.log(this.data.rev_mail_list[e.currentTarget.id])
    //暫時先這樣
    wx.navigateTo({
       url: '/pages/mail-item/mail-item',
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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