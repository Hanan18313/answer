import { fetch } from '../../config/fetch'
import { urlList } from '../../config/url'
// Components/user/user.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isLoginPage: false,
    isUserPage: false,
    show: false,
    isStaff: false,
    userInfo: {}
  },
  ready: function(){
    if (app.globalData.isAuthLogin) {
      fetch(urlList.checkMemberInfo, "GET", {}, res => {
        if (res.data.data.isStaff === 1) {
          this.setData({
            isStaff: true,
            userInfo: res.data.data,
            avatar: app.globalData.avatar,
            isLoginPage: false,
            isUserPage: true
          })
        } else {
          this.setData({
            isStaff: false,
            userInfo: res.data.data,
            avatar: app.globalData.avatar,
            isUserPage: true,
            isLoginPage: false
          })
        }
      })
    } else {
      this.setData({
        isLoginPage: true,
        isUserPage: false
      })
    }
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    wxAuthLogin: function(e) {
      this.setData({
        show: true
      })
    },
    getUserInfo: function(e){
      if (e.detail.errMsg === "getUserInfo:ok") {
        this.getMemberInfo()
      }
    },
    getMemberInfo: function(){
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
                fetch(urlList.getUnionIdByCode, 'GET', params, res => {
                  if(res.code === 200) {
                    
                    app.globalData.openId = res.data.openId;
                    app.globalData.unionId = res.data.unionId;
                    app.globalData.avatar = res.data.avatarUrl
                    fetch(urlList.checkMemberInfo, "GET", {}, res => {
                      if (res.data.code === 200) {
                        wx.reLaunch({
                          url: '../../pages/index/index',
                        })
                        // if (res.data.data.isStaff === 1) {
                        //   this.setData({
                        //     isLogin: true,
                        //     isStaff: true
                        //   })
                        // } else {
                        //   this.setData({
                        //     isLogin: false,
                        //     isStaff: false
                        //   })
                        // }
                        
                      }else if(res.data.code === -10001) {
                        Dialog.alert({
                          title: '系统提示',
                          message: '您还未注册，是否前往注册界面',
                          showCancelButton: true,
                          confirmButtonText: '前往注册',
                          cancelButtonText: '暂不注册'
                        }).then(() => {
                          wx.redirectTo({
                            url: '../../pages/register/register',
                          })
                        })
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
  }
})
