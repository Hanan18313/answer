// pages/admin/home/home.js
import { urlList } from '../../../config/url'
import { fetch } from '../../../config/fetch'
import format from '../../../utils/util'
import moment from 'moment'
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionnaireArr:[]
  },
  handlePreview: function(e){
    wx.navigateTo({
      url: '../questionItem/questionItem?issueId=' + e.currentTarget.dataset.issueid,
    })
  },
  handleDelete: function(e){
    const id =  e.currentTarget.dataset.issueid
    let arr = []
    arr = this.data.questionnaireArr.filter(item => item.id !== id)
    fetch(urlList.deleteIssueById, 'DELETE', {id: id}, res => {
      if (res.data.code === 200) {
        Toast.success('删除成功')
        setTimeout(() => {
          this.setData({
            questionnaireArr: arr
          })
        },1000)
      }else{
        Toast.success('删除失败')
      }
    })
  },
  handleEdit: function(e){
    wx.navigateTo({
      url: '../edit/edit?issueId=' + e.currentTarget.dataset.issueid,
    })
  },
  handleStatistical: function(e){
    wx.navigateTo({
      url: '../statistical/statistical?issueId=' + e.currentTarget.dataset.issueid,
    })
  },
  handleCreate: function(){
    wx.navigateTo({
      url: '../create/create',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    fetch(urlList.getIssueList, 'GET', {}, res => {
      res.data.map(item => {
        item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
      })
      this.setData({
        questionnaireArr: res.data
      })
    })
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
    return {
      title: '轻松问答',
      path: '/pages/index/index',
      imageUrl: '../../../public/images/cover.png'
    }
  }
})