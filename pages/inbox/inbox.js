
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
//id isRead sender subject
//example
    rev_mail_list: [
      {
        id: 1,
        isRead: true,
        sender: '芒果',
        subject: "我是张三，见到大家很高兴。。。"
      }, 
      {
        id: 2,
        isRead: false,
        sender: '香蕉',
        subject: "我是李四，可以带大将去玩。。。。"
  
      },
      {
        id: 3,
        isRead: true,
        sender: '苹果',
        subject: "我是王五，我编码贼好。。。。"
  
      },
      {
        id: 4,
        isRead: true,
        sender: '芒果',
        subject: "我是张三，见到大家很高兴。。。"
      }, 
      {
        id: 5,
        isRead: false,
        sender: '香蕉',
        subject: "我是李四，可以带大将去玩。。。。"
      },
      {
        id: 8,
        isRead: false,
        sender: '苹果',
        subject: "我是王五，我编码贼好。。。。"
      }  
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
        this.setData({
          margin_top: app.globalData.titleBarHeight+app.globalData.statusBarHeight,
          windowHeight: app.globalData.windowHeight
        })
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
  //全部与未读的点击切换，滑块index赋值
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