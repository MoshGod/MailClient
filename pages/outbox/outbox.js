// pages/outbox/outbox.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rev_mail_list: [],

  },

  // 点击了某个邮件，跳转到邮件详细页面
  click: function (e) { 
    console.log("按了：", e.currentTarget.id)
    console.log(this.data.rev_mail_list[e.currentTarget.id])
    var that = this;
    wx.navigateTo({
      url: '/pages/mail-item/mail-item?mailNo=' + that.data.rev_mail_list[e.currentTarget.id].mailNo,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let str = ''
    str += '\r\n--XXX' + '\r\nContent-Disposition:form-data;name="' + 'userName' + '"' + '\r\n' + '\r\n' + app.globalData.userInfo.username +
        '\r\n--XXX'
    str += '--'  // 这里必须是以它结尾
    wx.request({
      url: app.globalData.serverIp + 'getsendbox/',
      method: "POST",
      header: {
        'content-type': 'multipart/form-data;boundary=XXX'
      },
      data: str,
      success:function (res) {
        console.log(JSON.stringify(res.data))
        console.log("响应状态码: " + res.data.status);
        console.log("响应数据: ", res.data.message);
        
        wx.showToast({
          title: '邮件获取成功!',
          icon: 'none',
          duration: 1000,
          mask: true
        }) 
        that.setData({
          rev_mail_list: JSON.parse(res.data.data)
        })
        for (let i=0;i<that.data.rev_mail_list.length;i++)
        {
          that.data.rev_mail_list[i].time = that.data.rev_mail_list[i].time.split("+")[0];
        }
        that.setData({
          rev_mail_list: that.data.rev_mail_list
        })
        
        console.log(that.data.rev_mail_list)
        console.log(res.data.data)
      },
      fail: function (res) {
        console.log("邮件列表获取失败");
        // wx.navigateTo({
        //   url: '../user_login/user_login',
        // })
        wx.showToast({
          title: '邮件获取失败',
          icon: 'none',
          duration: 1000,
          mask: true
        })
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