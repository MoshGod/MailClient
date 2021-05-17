// pages/submit-mail/submit-mail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subject:'',
    content:'',
    receiver:'',
    sender:'',
    password:''
  },
  bindOnSubject: function(e) {
    this.setData({
      subject: e.detail.value,
    })
  },
  bindOnReciever: function(e) {
    this.setData({
      receiver: e.detail.value,
    })
  },
  bindOnContent: function(e) {
    this.setData({
      content: e.detail.value,
    })
  },
  submitMail: function(e){
    // 表单验证
    var that = this
    // receiver
    if (that.data.receiver == ""){
      wx.showToast({
        title: '请输入收件人邮箱',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return 
    }
    var reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/
    if (!reg.test(that.data.receiver)){
      wx.showToast({
        title: '请输入合法邮箱',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      
      return 
    }
    // content
    if (that.data.content == ""){
      wx.showToast({
        title: '请输入邮件正文',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return 
    }
    console.log(this.data)
    let str = ''
    for (let key in that.data) {
        str += '\r\n--XXX' + '\r\nContent-Disposition:form-data;name="' + key + '"' + '\r\n' + '\r\n' + that.data[key] +
            '\r\n--XXX'
    }
    str += '--'  // 这里必须是以它结尾
    wx.request({
      url: app.globalData.serverIp + 'sendmailbysmtp/',
      method: "POST",
      // dataType:'JSON',
      header: {
        'content-type': 'multipart/form-data;boundary=XXX'
      },
      data: str,
      success:function (res) {
        console.log(JSON.stringify(res.data))
        console.log("响应状态码: " + res.data.status)
        console.log("响应数据: ", res.data.message)
        if (res.data.status == 200){
          wx.showToast({
            title: '发送成功！',
            icon: 'none',
            duration: 1000,
            mask: true,
            success: function(e){
              setTimeout(function(){
                wx.navigateTo({
                  url: '/pages/inbox/inbox'
                })
              }, 1000)
            }
          })
          
        } else {
          console.log("发送失败");
          wx.showToast({
            title: '发送失败，请检查收件人邮箱是否合法',
            icon: 'none',
            duration: 1000,
            mask: true,
            success: function(e){
              setTimeout(function(){
                that.setData({
                  subject: '',
                  receiver: '',
                  content: ''
                })
              }, 1000)
            }
          })
        }
        
      },
      fail: function (res) {
        console.log("发送失败");
        wx.showToast({
          title: '发送失败，请检查收件人邮箱是否合法',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sender: app.globalData.userInfo.username,
      password: app.globalData.userInfo.password
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