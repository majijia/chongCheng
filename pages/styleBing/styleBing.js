//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    select:1,
    sunBu:'请选择损伤部位',
    serious:'请选择严重程度'
  },
  /**动态变样式 */
  selectBtn:function(e){
    this.setData({
      select:e.currentTarget.dataset.num
    })
  },
  /**损伤部位 */
  styleSite:function(){
    wx.navigateTo({
      url:"../styleSite/styleSite"
    })
  },
  /**严重程度 */
  styleOrder:function(){
    wx.navigateTo({
      url:"../styleOrder/styleOrder"
    })
  },
  /**完成 */
  finish:function(){
    var that=this;
    if(that.data.sunBu=='请选择损伤部位'){
      wx.showToast({
        // 提示内容
        title: '请选择相关信息',
        icon: "none",
        duration: 2000,
        mask: false,
      })
    }
    else{
      wx.redirectTo({
        url:'../material/material'
      })
    }
  },
  onLoad: function () {
    var that=this;
    wx.getStorage({ 
      key:'name',
      success(res){
        var name=res.data;
        that.setData({
          sunBu:name
        })
      }
    })
    wx.getStorage({
      key:'severity',
      success(res){
        var yanZ=res.data;
        that.setData({
          serious:yanZ
        })
      }
    })
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
