// Components/index/index.js
import { fetch } from '../../config/fetch';
import { urlList } from '../../config/url';
import config from '../../config/config'
import moment from 'moment';
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
    ongoingIssue: [],
    endedIssue: [],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    imgArr: [
      {
        name: '代龙700',
        img: config.DOMAIN + '/static/images/product/代龙700.jpg',
        content:'代龙700是一款CAN总线、适合工程现场、经济坚固的独立控制器。'
        
      },
      {
        name: '代龙900',
        img: config.DOMAIN + '/static/images/product/代龙900.png',
        content:'代龙900是一款PCI内置、适合科研实验室、功能强大的动态伺服控制器。'
      },
      {
        name: '威程884',
        img: config.DOMAIN + '/static/images/product/威程884.jpg',
        content: '威程884M是一款USB外置、应用广泛的旗舰型电子万能控制器。'
      }
    ]
  },
  lifetimes: {},
  ready: function() {
    let ongoingIssue = [], endedIssue = []
    fetch(urlList.getIssueListWithAnswerInfo, "GET", {}, res => {
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].createTime = moment(res.data[i].createTime).format('YYYY-MM-DD HH:mm:ss')
        res.data[i].deadline = moment(res.data[i].deadline).format('YYYY-MM-DD HH:mm:ss')
        if(res.data[i].answer.length !== 0) {
          res.data[i].answer[0].answerTime = moment(res.data[i].answer[0].answerTime).format('YYYY-MM-DD HH:mm:ss')
        }
        if (res.data[i].status === '进行中') {
          ongoingIssue = res.data[i]
        }else if(res.data[i].status === '已关闭'){
          endedIssue.push(res.data[i])
        }
      }
      this.setData({
        ongoingIssue: ongoingIssue,
        endedIssue: endedIssue
      })
    })
  },

  
  

  /**
   * 组件的方法列表
   */
  methods: {
    entryAnswer: function(e){
      if (app.globalData.isAuthLogin) {
        wx.navigateTo({
          url: '../../pages/answer/answer?issueId=' + e.currentTarget.dataset.id,
        })
      } else {
        this.triggerEvent('myevent')
      }
    },
    binderror: function(e){
      console.log(e)
    },
    bindload: function(e){
      console.log(e)
    }
    
  }
})

