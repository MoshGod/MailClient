const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime:formatTime,
  login:login,
  checkLogin:checkLogin,
}
function checkLogin(){
  if(getApp().globalData.token.token==""){//未登录状态
    return true;
  }else{
    return false;
  }
}
//登录辅助
function login(){
    wx.showModal({
      title: '登陆提示',
      content: '请登陆后再访问',
      success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
                url:'../user_login/user_login'
            })
          }
      }
  })
}
// function getCurrentUrl(){//从页面栈中获取当前页面的路径
//   var url=getCurrentPages()[getCurrentPages().length-1].__route__;
//   return '/'+url;
// }