
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    margin_top: 0,
    windowHeight: 0,

    autoplay: false, //是否自动播放
    circular: true, //是否采用衔接滑动
    indicatorDots: true, //是否显示面板指示点
    scrollTop: '', //滑动的距离
    navFixed: "true", //导航是否固定
    currentData: 0,
    userName: '',
    password: '',
//id isRead sender subject
//example
    rev_mail_list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    this.setData({
      margin_top: app.globalData.titleBarHeight+app.globalData.statusBarHeight,
      windowHeight: app.globalData.windowHeight,
      userName: options.username,
      password: options.password
    })
    let str = ''
    for (let key in that.data) {
        str += '\r\n--XXX' + '\r\nContent-Disposition:form-data;name="' + key + '"' + '\r\n' + '\r\n' + that.data[key] +
            '\r\n--XXX'
    }
    str += '--'  // 这里必须是以它结尾
    wx.request({
      url: app.globalData.serverIp + 'getmaillist/',
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


  // 点击了某个邮件，跳转到邮件详细页面
  click: function (e) { 
    console.log("按了：", e.currentTarget.id)
    console.log(this.data.rev_mail_list[e.currentTarget.id])
    var that = this;
    // 修改双向绑定数据为已读
    let isRead = 'rev_mail_list[' + e.currentTarget.id + '].isRead'
    that.setData({
      [isRead]: 1
    })

    // 修改数据库数据为已读
    let str = ''
    str += '\r\n--XXX' + '\r\nContent-Disposition:form-data;name="isRead"' + '\r\n' + '\r\n' + '1' +
        '\r\n--XXX'
    str += '--'  // 这里必须是以它结尾
    wx.request({
      url: app.globalData.serverIp + 'mails/' + that.data.rev_mail_list[e.currentTarget.id].mailNo + '/',
      method: "PUT",
      header: {
        'content-type': 'multipart/form-data;boundary=XXX'
      },
      data: str,
      success: function(res) {
        console.log('邮件修改为已读成功')
      },
      fail: function(res) {
        console.log('邮件修改为已读失败')
      }
    })
    wx.navigateTo({
       url: '/pages/mail-item/mail-item?mailNo=' + that.data.rev_mail_list[e.currentTarget.id].mailNo,
     })
  },
  // 全部与未读的点击切换，滑块index赋值
  checkCurrent: function(e) {
    console.log('点击切换')
    const that = this;
    console.log(e.target.dataset.current)
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
})