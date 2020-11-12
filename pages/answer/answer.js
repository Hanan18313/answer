// pages/admin/questionItem/questionItem.js
import { fetch } from '../../config/fetch'
import { urlList } from '../../config/url'
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    EnIndexArr: ['A','B','C','D','E','F','G','H'],
    dataSource: [],
    disabled: true,
    answer: [],
    radio: []
  },

  handleChangeRadio: function(e){
    const dataLength = this.data.dataSource
    const arr = e.detail
    const transArr = []
    const answer = []
    arr.map(item => {
      transArr.push(item.charAt(0))
    })
    if ([...new Set(transArr)].length < arr.length) {
      Notify('请重新选择')
    } else {
      arr.map(item => {
        answer.splice(item.charAt(0), 0, this.data.EnIndexArr[item.charAt(1)])
      })
      this.setData({
        radio: e.detail,
        answer: answer
      })
    }
    
  },
  handleSubmit: function(e){
    const { issueid } = e.currentTarget.dataset
    const param = {
      issueid,
      formid: '',
      answer: this.data.answer
    }
    // wx.requestSubscribeMessage({
    //   tmplIds: ['lf9684uptuG8RmdmY_C8LOKB2dwGH3bCHHHq5pLRipA'],
    //   success: function(res){
    //     console.log(res)
    //   },
    //   fail: function(res){
    //     console.log(res)
    //   }
    // })
    fetch(urlList.createUserAnswerInfo, 'POST', param, res => {
      console.log(res)
      if (res.data.code === 200) {
        Toast.success('提交成功')
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 1000)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const issueId = options.issueId
    let disabled, solutionArr = []
    fetch(urlList.getIssueWithAnswerInfo, "GET", {issueId}, res => {
      if (res.data.code === 200) {
        if (res.data.data.status === '已关闭') {
          disabled = true
        } else if (res.data.data.status === '进行中') {
          disabled = false
        }
        if (res.data.data.answer.length !== 0) {
          const solution = JSON.parse(res.data.data.answer[0].answer)
          for (let i = 0; i < solution.length; i++) {
            if (solution[i] === '未选择') {
              solution.splice(i, 1)
            } else {
              solutionArr.push(`${i}${this.data.EnIndexArr.indexOf(solution[i])}`)
            }
          }
        }

        this.setData({
          dataSource: res.data.data.issue,
          disabled,
          titleInfo: res.data.data,
          radio: solutionArr
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
      imageUrl: '../../public/images/cover.png'
    }
  }
})