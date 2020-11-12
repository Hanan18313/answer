// pages/admin/create/create.js
import { fetch } from '../../../config/fetch';
import { urlList } from '../../../config/url';
import moment from 'moment'
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    questionArr: [],
    title: '',
    showCalendar: false,
    deadline: ''
  },

  handleDisplayCalendar() {
    this.setData({ showCalendar: true });
  },
  handleCloseCalendar() {
    this.setData({ showCalendar: false });
  },
  handleConfirmCalendar(e) {
    console.log(e)
    this.setData({
      showCalendar: false,
      deadline: moment(e.detail).format('YYYY/MM/DD HH:mm:ss'),
    });
  },
  
  handleInputTitleChange: function(e){
    this.setData({
      title: e.detail
    })
  },
  
  handleAddQuestion: function(){
    const issue = {};
    issue.topic = "";
    issue.options = []
    this.data.arr.push(issue)
    this.setData({
      questionArr: this.data.arr
    })
  },
  handleDeleteOptions: function(e){
    const index = e.currentTarget.dataset.index
    const arr = this.data.questionArr
    arr[index].options.pop() 
    this.setData({
      questionArr: arr
    })
  },
  handleCreateOptions: function(e){
    const index = e.currentTarget.dataset.index
    const arr = this.data.questionArr
    arr[index].options.push('') 
    this.setData({
      questionArr: arr
    })
  },

  handleDeleteIssue: function(e){
    const index = e.currentTarget.dataset.index
    const arr = this.data.questionArr
    arr.splice(index, 1)
    this.setData({
      questionArr: arr
    })
  },

  handleInputOptionsChange: function(e){
    const { index, idx } = e.currentTarget.dataset
    const arr = this.data.questionArr
    arr[index].options[idx] = e.detail
    this.setData({
      questionArr: arr
    })
  },

  handleInputIssueChange: function(e){
    const { index } = e.currentTarget.dataset
    const arr = this.data.questionArr
    arr[index].topic = e.detail
    this.setData({
      questionArr: arr
    })
  },

  handleSubmit: function(){
    console.log(this.data.questionArr)
    fetch(urlList.createIssue, 'POST', {issue: this.data.questionArr, title: this.data.title, deadline: this.data.deadline}, res => {
      console.log(res)
      if (res.data.code === 200) {
        Toast.success('操作成功')
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 1000)
      } else {
        Notify('请完善输入框信息')
      }
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




function debounce(fn, wait) {
  let timer = null;
  return (...args) => {
    if(timer !== null) clearTimeout(timer);        
    // timer = setTimeout(fn, wait); 
    // clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, wait)
  }
}
//节流
function throttle(f, wait) {
  let timer
  return (...args) => {
      if(timer) return
      timer = setTimeout(() => {
          f(...args)
          timer = null
      }, wait)
  }
}