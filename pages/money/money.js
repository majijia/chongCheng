//logs.js
const util = require('../../utils/util.js')
const app = getApp();
var urlGlobal=app.globalData.host;
Page({
  data: {
    list:[]
  },
  onLoad: function () {
    var that=this;
    wx.getStorage({
      key:'keId',
      success(res){
          var keId=res.data;
          wx.getStorage({
              key:'openid',
              success(ress){
                  var openid=res.data;
                  wx.request({
                      url:urlGlobal+"Lesson/cashier",
                      method:"post",
                      data:{openid:openid,id:keId},
                      success:function(result){
                        console.log(123,result)
                        if(result.data.code_status==0){
                           that.setData({
                             list:result.data.data
                           })
                        }
                      }
                  })
              }
          })
      }
  })
    
  }
})
