// pages/admin/questionItem/questionItem.js
import { fetch } from '../../../config/fetch'
import { urlList } from '../../../config/url'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    EnIndexArr: ['A','B','C','D','E','F','G','H'],
    dataSource: [],
  },

  handleChangeRadio: function(e){
    console.log(e)
    const index = e.currentTarget.dataset.id
    this.setData({
      radio: e.detail
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const issueId = options.issueId
    fetch(urlList.getIssueById, "GET", {issueId}, res => {
      if (res.data.code === 200) {
        this.setData({
          dataSource: res.data.data[0].issue
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
    return {
      title: '轻松问答',
      path: '/pages/index/index',
      imageUrl: '../../../public/images/cover.png'
    }
  }
})