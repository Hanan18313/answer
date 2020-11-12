// pages/admin/edit/edit.js
import { fetch } from '../../../config/fetch'
import { urlList } from '../../../config/url'
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionArr: [],
    issueArr: [],
    steps: [
      {
        text: '未开始',
      },
      {
        text: '进行中',
      },
      {
        text: '已关闭',
      }
    ],
    active: 0,
    checkboxValue: [],
    EnIndexArr: ['A','B','C','D','E','F','G','H'],
    title: '',
    showTransition: false,
    solutionArr: [],
    disabled: false
  },

  handleChangeStatus: function(){
    const step = this.data.steps[this.data.active].text
    const id = this.data.questionArr[0].questionnaireTitle_id;
    let nextStatus = ''
    if (step === '未开始') {
      nextStatus = '进行中'
      this.updateIssueStatus(nextStatus, id)
    } else if (step === '进行中') {
      nextStatus = '已关闭'
      this.updateIssueStatus(nextStatus, id)
    } else if (step === '已关闭') {
      nextStatus = '已关闭'
    }
    
  
  },

  updateIssueStatus: function(nextStatus, id){
    let active
    if (this.data.issueArr.length === this.data.checkboxValue.length) {
      fetch(urlList.updateIssueStatus, "PUT", {status: nextStatus, id: id}, res => {
        if (res.data.code === 200) {
          Toast.success('操作成功')
          for (let i = 0; i < this.data.steps.length; i++) {
            if (nextStatus === this.data.steps[i].text) {
              active = i
            }
          }
          this.setData({
            active: active
          })
          if (nextStatus === '已关闭') {
            this.setData({
              disabled: true
            })
          }
        }
      })
    } else {
      Notify('请正确勾选答案')
    }
  },

  handleInputCorrectAnswer: function(e){
    // const group = []
    // const solutionArr = []
    // const issueArr = this.data.issueArr
    // for (let i = 0; i < issueArr.length; i++) {
    //   if (arr.length > i) {
    //     group.push(arr[i].charAt(0))
    //     solutionArr.push(this.data.EnIndexArr[arr[i].charAt(1)])
    //   } else {
    //     group.push("未选择")
    //     solutionArr.push("未选择")
    //   }
    // }
    // if (issueArr.length < arr.length) {
    //   Notify('重复选择')
    // } else {
    //   this.setData({
    //     checkboxValue: e.detail,
    //     solutionArr: solutionArr.reverse()
    //   })
    // }
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
        checkboxValue: e.detail,
        solutionArr: answer
      })
    }
    
  },

  handleInputIssueChange: function(e){
    const { index } = e.currentTarget.dataset
    const arr = this.data.issueArr
    arr[index].topic = e.detail
    this.setData({
      issueArr: arr
    })
  },
  handleInputOptionsChange: function(e){
    const { index, idx } = e.currentTarget.dataset
    const arr = this.data.issueArr
    arr[index].options[idx] = e.detail
    this.setData({
      issueArr: arr
    })
  },
  handleDeleteIssue: function(e){
    const index = e.currentTarget.dataset.index
    const arr = this.data.issueArr
    arr.splice(index, 1)
    this.setData({
      issueArr: arr
    })
  },
  handleDeleteOptions: function(e){
    const index = e.currentTarget.dataset.index;
    const arr = this.data.issueArr
    arr[index].options.pop() 
    this.setData({
      issueArr: arr
    })
  },
  handleCreateOptions: function(e){
    const index = e.currentTarget.dataset.index
    const arr = this.data.issueArr
    arr[index].options.push('') 
    this.setData({
      issueArr: arr
    })
  },
  handleAddQuestion: function(e){
    const arr = this.data.issueArr;
    const issue = {};
    issue.topic = "";
    issue.options = []
    arr.push(issue)
    this.setData({
      issueArr: arr
    })
  },
  handleSubmit: function(){
    const id = this.data.questionArr[0].questionnaireTitle_id
    const content = this.data.issueArr
    const title = this.data.title
    fetch(urlList.updateIssueContentById, "PUT", {id, content, title, solution: this.data.solutionArr}, res => {
      if (res.data.code === 200) {
        Toast.success('更新成功')
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 1000)
      } else {
        Toast.fail('网络错误，更新失败')
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const issueId = options.issueId;
    let active, solutionArr = [], disabled = ''
    fetch(urlList.getIssueById, "GET", {issueId}, res => {
      if (res.data.code === 200) {
        for (let i = 0; i < this.data.steps.length; i++) {
          if (res.data.data[0].questionnaireTitle_status === this.data.steps[i].text) {
            active = i
          }
        }
        if (res.data.data[0].questionnaireTitle_correctResult) {
          const solution = JSON.parse(res.data.data[0].questionnaireTitle_correctResult)
          for (let i = 0; i < solution.length; i++) {
            if (solution[i] === '未选择') {
              solution.splice(i, 1)
            } else {
              solutionArr.push(`${i}${this.data.EnIndexArr.indexOf(solution[i])}`)
            }
          }
        }
        if (res.data.data[0].questionnaireTitle_status === '已关闭') {
          disabled = true
        } else {
          disabled = false
        }
        this.setData({
          questionArr: res.data.data,
          active: active,
          title: res.data.data[0].questionnaireTitle_title,
          issueArr: res.data.data[0].issue,
          checkboxValue: solutionArr,
          disabled: disabled
        })

        setTimeout(() => {
          this.setData({
            showTransition: true
          })
        }, 500)
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

function updateIssueStatus(nextStatus, id){
  
}