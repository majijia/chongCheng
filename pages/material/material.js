//logs.js
var app=getApp();
const util = require('../../utils/util.js')
var urlGlobal=app.globalData.host;
Page({
  data: {
    logs: [],
    select:'',
    sex:'',
    userName:'',
    userDate:'',
    state:'请选择病情',
    dates:'',
    hidden:false
  },
  /**动态变样式 */
  selectBtn:function(e){
    this.setData({
      select:e.currentTarget.dataset.num,
      sex:e.currentTarget.dataset.sex
    })
    wx.setStorage({
      key:'select',
      data:this.data.select
    })
    wx.setStorage({
      key:'sex',
      data:this.data.sex
    })
  },
  bindKeyInput:function(e){
     this.setData({
       userName:e.detail.value
     })
  },
  /**用户姓名 */
  bindName:function(e){
    wx.setStorage({
      key:'userName',
      data:e.detail.value
    })
  },
  /**用户生日 */

  bindDateChange(e){
    this.setData({
      hidden:true,
      dates:e.detail.value
    })
    wx.setStorage({
      key: 'userDate',
      data: e.detail.value,
    })
  },

  /**病情分类 */
  moldBing:function(){
    wx.navigateTo({
      url:"../styleBing/styleBing"
    })
  },
  /**开启 */
  openChong:function(){
    var that=this;
    wx.getStorage({
      key:'condition_id',
      success:resOne=>{
        var condition_id=resOne.data
        wx.getStorage({
          key:'condition_type',
          success:resTwo=>{
            var condition_type=resTwo.data
            wx.getStorage({
              key:'openid',
              success:resThree=>{
                var openid=resThree.data
                wx.request({
                  url:urlGlobal+'user/user_perfect',
                  method:'post',
                  data:{name:that.data.userName,gender:that.data.sex,birthday:that.data.dates,condition_id:condition_id,condition_type:condition_type,openid:openid},
                  success:function(result){
                    if(result.data.code_status==0){
                      wx.switchTab({
                        url:"../index/index",
                    })
                    }
                    else{
                      wx.showToast({
                        // 提示内容
                        title: '请填写完整的信息',
                        icon: "none",
                        duration: 2000,
                        mask: false,
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
  },
  onLoad: function () {
    var that=this;
    wx.getStorage({
      key:'name',
      success(res){
        that.setData({
          state:res.data
        })
      }
    })
    /**用户名 */
    wx.getStorage({
      key:'userName',
      success(ress){
        that.setData({
          userName:ress.data
        })
      }
    })
    /**生日 */
    wx.getStorage({
      key:'userDate',
      success(result){
        that.setData({
          hidden:true,
          dates:result.data,
        })
      }
    })
    /**性别 */
    wx.getStorage({
      key:'select',
      success(resLect){
        that.setData({
          select:resLect.data
        })
      }
    })
    wx.getStorage({
      key:'sex',
      success(resSex){
        that.setData({
          sex:resSex.data
        })
      }
    })
    that.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
