import config from './config'
const app = getApp()

export const fetch = (url, method, data, callback) => {
  const header = {
    "Content-Type":"application/json",
    openId:app.globalData.openId,
    unionId: app.globalData.unionId,
    avatar: app.globalData.avatar,
    appletName: config.appletName
  }
  wx.showLoading({
    title: '加载中...',
  })
  wx.request({
    url: url,
    method: method,
    data,
    header: header,
    success: function(res){
      wx.hideLoading()
      return typeof callback === "function" && callback(res.data)
    },
    fail: function(res){
      wx.hideLoading();
      return typeof callback === "function" && callback(false)
    }
  })
}