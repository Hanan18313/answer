//index.js
//获取应用实例
import { fetch } from '../../config/fetch';
import { urlList } from '../../config/url'
const app = getApp()

Page({
  data: {
    activeTabbar: 'home'
  },
  //事件处理函数
  onMyEvent: function(e){
    this.setData({
      activeTabbar: 'user'
    })
  },
  handleChangeTabbar: function(e) {
    const tabbarTitle = e.detail === 'home' ? '首页' : '我的'
    this.setData({
      activeTabbar: e.detail
    })
    wx.setNavigationBarTitle({
      title: tabbarTitle,
    })
  },
  onLoad: function () {
    wx.getSetting({
      withSubscriptions: true,
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          getLoginInfo()
        }else{
          
        }
      }
    })
  },


})
function getLoginInfo(){
  wx.login({
    success: function(res){
      if(res.code) {
        wx.getUserInfo({
          success: function(_res){
            const params = {
              code: res.code,
              encryptedData: _res.encryptedData,
              iv: _res.iv,
            }
            fetch(urlList.getUnionIdByCode, 'GET', params, _res => {
              if(_res.code === 200) {
                console.log(_res)
                app.globalData.openId = _res.data.openId;
                app.globalData.unionId = _res.data.unionId;
                app.globalData.avatar = _res.data.avatarUrl
                fetch(urlList.checkMemberInfo, "GET", {}, res => {
                  if (res.data.code === 200) {
                    app.globalData.isAuthLogin = true
                  }
                })
              }
            })
          }
        })
      }
    }
  })
}
function getUserInfo () {
  console.log(e)
  app.globalData.userInfo = e.detail.userInfo
  this.setData({
    userInfo: e.detail.userInfo,
    hasUserInfo: true
  })
}
