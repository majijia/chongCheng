//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    select:1,
    severity:'',
    checked:false,
    check:false
  },
  /**radio改变 */
  radioChange:function(e){
    wx.removeStorage({key:'checked'});
    wx.removeStorage({key:'check'});
    var that=this;
    wx.setStorage({
      key:'condition_type',
      data:e.detail.value
    })
    if(e.detail.value==1){
      that.setData({
        severity:'完全损伤'
      })
      that.setData({
        checked:true
      })
      wx.setStorage({
        key:'checked',
        data:true
      })
    }
    else{
      that.setData({
        severity:'非完全损伤'
      })
      that.setData({
        check:true
      })
      wx.setStorage({
        key:'check',
        data:true
      })
    }
    
    wx.setStorage({
      key:'severity',
      data:that.data.severity
    });
    wx.redirectTo({
      url:'../styleBing/styleBing'
    })
  },
  onLoad: function () {
    var that=this;
    wx.getStorage({
      key:'checked',
      success(res){
        that.setData({
          checked:res.data
        })
      },
    })
    wx.getStorage({
      key:'check',
      success(res){
        that.setData({
          check:res.data
        })
      },
    })
    that.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
