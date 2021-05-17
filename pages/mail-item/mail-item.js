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
    mailNo: -1,
    mailItem: {},
  },
  modalBindaconfirm:function(){
    var that = this
    this.setData({
      modalHidden:!this.data.modalHidden,
    })
    let str = ''
    str += '\r\n--XXX' + '\r\nContent-Disposition:form-data;name="isRead"' + '\r\n' + '\r\n' + '1' +
        '\r\n--XXX'
    str += '--'  // 这里必须是以它结尾
    wx.request({
      url: app.globalData.serverIp + 'mails/' + that.data.mailNo + '/',
      method: "DELETE",
      header: {
        'content-type': 'multipart/form-data;boundary=XXX'
      },
      data: str,
      success: function(res) {
        

        console.log('邮件删除成功')
        wx.showToast({
          title: '邮件删除成功',
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
      },
      fail: function(res) {
        console.log('邮件修改为已读失败')
      }
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
    var that = this;
    this.setData({
      margin_top: app.globalData.titleBarHeight+app.globalData.statusBarHeight,
      windowHeight: app.globalData.windowHeight,
      // mailItem: {
      //   id: 1,
      //   subject: 'hello',
      //   sender: 'cbowu@index.cn',
      //   content: 'hello world!'
      // },
      mailNo: options.mailNo

    })
    let str = ''
    for (let key in that.data) {
        str += '\r\n--XXX' + '\r\nContent-Disposition:form-data;name="' + key + '"' + '\r\n' + '\r\n' + that.data[key] +
            '\r\n--XXX'
    }
    str += '--'  // 这里必须是以它结尾
    wx.request({
      url: app.globalData.serverIp + 'getmail/',
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
          mailItem: res.data.data
        })
        that.data.mailItem.rendOrReceiptDate = that.data.mailItem.rendOrReceiptDate.replace('T',' ')
        that.data.mailItem.rendOrReceiptDate = that.data.mailItem.rendOrReceiptDate.replace('Z',' ')
        that.setData({
          mailItem: that.data.mailItem
        })
        console.log(that.data.mailItem)
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