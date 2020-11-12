// pages/scoreList/scoreList.js
import { fetch } from '../../config/fetch';
import { urlList } from '../../config/url';
import moment from 'moment'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scoreList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const arr = []
    fetch(urlList.getScoreList, "GET", {}, res => {
      console.log(res)
      let transArr = []
      if (res.data.code === 200) {
        transArr = res.data.data.filter(item => item.QuestionnaireTitle_status === '已关闭')
        transArr.map(item => {
          item.QuestionnaireAnswer_answerTime = moment(item.QuestionnaireAnswer_answerTime).format('YYYY-MM-DD HH:mm:ss')
        })
      }
      this.setData({
        scoreList: transArr
      })
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
      imageUrl: '../../public/images/cover.png'
    }
  }
})