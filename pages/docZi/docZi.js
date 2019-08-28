//logs.js
import { connect } from '../../redux/index.js'
import { showToast, calcTimeHeader, clickLogoJumpToCard } from '../../utils/util.js'
import { iconNoMessage } from '../../utils/imageBase64.js'
const util = require('../../utils/util.js')
const app = getApp()
let startX = 0
let store = app.store
var urlGlobal=app.globalData.host;
Page({
  data: {
    list:[],
    type:'',
    iconNoMessage: '',
    loginUserAccount: '',
    translateX: 0,
    defaultUserLogo: '',
    chatList: [], // [{account,nick,lastestMsg,type,timestamp,displayTime,message,       unread,status}]
    chatAccount: {} // {accountName: accountName} 备注:消息通知key为notification
  },
  onLoad: function () {
    var that=this;
    wx.getStorage({
      key:'openid',
      success:res=>{
        var openid=res.data;
        wx.request({
           url:urlGlobal+'Doctor/get_list',
           method:'post',
           data:{openid:openid},
           success:function(result){
              console.log(303,result)
              if(result.data.code_status==0){
                 that.setData({
                   list:result.data.data,
                  //  type:result.data.data.type
                 })
              }
            }   
        })
        wx.request({
          url:urlGlobal+'wy/get_token',
          method:'post',
          data:{openid:openid,type:2},
          success:function(ress){
            console.log(ress)
          }
        })
      }

    })
  },
  /**医生详情 */
  switchToChating:function(e){
    var docId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url:'../docDetail/docDetail?id='+docId
    })
  }
})



