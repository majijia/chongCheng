//logs.js
var app=getApp();
const util = require('../../utils/util.js')
var urlGlobal=app.globalData.host;
Page({
  data: {
    logs: [],
    select:1,
    list:[],
    check:false,
  },
  /**选择某个损伤 */
  listChange:function(event){
    /**病情id */
      var condition_id =event.currentTarget.dataset.gid;
      var bingName=event.currentTarget.dataset.name;
      var lis=this.data.list;
      wx.setStorage({
        key:'list',
        data:lis
      }),
      wx.setStorage({
        key:'condition_id',    
        data:condition_id
    })
      wx.setStorage({
        key:'name',
        data:bingName
      })
    wx.navigateTo({
      url:'../styleBing/styleBing'
    })
  },
  onLoad: function () {
    var that=this;
    var cond_id;
    wx.getStorage({
      key:'condition_id',
      success(res){
        cond_id=res.data-1;
      }
    })
    wx.getStorage({ 
      key:'openid',
      success(res){
        var openid=res.data;
        wx.request({
          url:urlGlobal+'Condition/get_list',
          data:{openid:openid},
          method:'post',
          success:function(result){
            that.setData({
              list:result.data.data
            })
            var abc='list['+cond_id+'].checked'
            that.setData({
              [abc]:true
            })
          }
        })
          },
      fail(){
          
      }
  })
    
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
