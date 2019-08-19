// pages/getId/getId.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pid:'',
    openI:'',
    /**变量判断手机号 */
    isPhone:true,
  },
/**判断手机号 */
getPhone:function(){
  wx.request({
      url:'https://test.cc.rchang.cn/api/user/has_phone',
      method:'post',
      success:result=>{
          console.log(22,result)
          if(result.code_status==0){
              wx.setData({
                isPhone:false
              });
          }
      },
      fail:function(){
          wx.setData({
              isPhone:true
          })
      }
  })
},

getPhoneNumber(i){
    wx.clearStorage();
    var that=this;
    wx.login({
        success(res) {
          var code = res.code
              if (res.code) {
                  // 发起网络请求
                  wx.request({
                      // 自行补上自己的 APPID 和 SECRET
                      url: app.globalData.host+'user/getOpenid',
                      data:{code:res.code},
                      method:'post',
                      success: result => {
                          // 获取到用户的 openid
                          if(result.data.code_status==0){
                              var openId=result.data.data.openid;
                              var sessionKey=result.data.data.session_key;
                              wx.setStorage({
                                  key:'openid',    
                                  data:openId
                              })
                            wx.setStorage({
                                key:'session_key',
                                data:sessionKey
                            })
                              wx.request({
                                url:app.globalData.host+"user/get_phone",
                                method:'post',
                                data:{encrydata:i.detail.encryptedData,iv:i.detail.iv,openid:openId},
                                success:result=>{
                                   if(result.data.code_status==0){
                                        wx.redirectTo ({
                                            url:"../material/material",
                                        })
                                        that.setData({
                                            isPhone:false
                                        })
                                   } 
                                }
                            })
                            //   this.getPhone();
                          }
                      }
                  });
              } else {
                  console.log('登录失败！' + res.errMsg)
              }
        }
    })
    
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
      wx.getStorage({
          key:'openId',
          success:res=>{
            wx.checkSession({
                success:function(){
                    // this.getPhone();
                    that.setData({
                        isPhone:false
                    })
                    wx.redirectTo ({
                        url:"../material/material",
                    })
                },
            })
          },
          fail:function(){
            that.setData({
                isPhone:true
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

  }
})