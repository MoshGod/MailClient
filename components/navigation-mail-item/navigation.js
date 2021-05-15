const app = getApp();
Component({
  properties: {
    //小程序页面的表头
    title: {
      type: String,
    },
    //是否展示返回和主页按钮
    showIcon: {
      type: Boolean,
      value: true
    }
  },

  data: {
    statusBarHeight: 0,
    titleBarHeight: 0,
  },

  ready: function () {
    // 因为很多地方都需要用到，所有保存到全局对象中
    if (app.globalData && app.globalData.statusBarHeight && app.globalData.titleBarHeight) {
      this.setData({
        statusBarHeight: app.globalData.statusBarHeight,
        titleBarHeight: app.globalData.titleBarHeight
      });
    } 
  },

  methods: {//to be modified
    headerBack() {
      wx.navigateBack({
        url: '/pages/inbox/inbox',
      })
    },
    headerDelete() {
      this.triggerEvent('syncEnsure')
    }
  }
})
