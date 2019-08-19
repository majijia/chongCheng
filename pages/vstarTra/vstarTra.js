const app = getApp()
var urlGlobal=app.globalData.host;
Page({
 /**
 * 页面的初始数据
 */
 data: {
    percent: 0,
    isDown: false,
    isShow:false,
 },

 /**
 * 生命周期函数--监听页面加载
 */
 onLoad: function (options) {
     /** 解码*/
    //  var s=decodeURIComponent(options.src)
    // wx.navigateTo({
    //     url:'../vplayAuto/vplayAuto'
    //   })
     var that=this;
     wx.getStorage({
         key:'openid',
         success(res){
             var openid=res.data;
             wx.request({
                url:urlGlobal+'Action/action_detail',
                method:"post",
                data:{action_id:1,openid:openid},
                success:function(result){
                    if(result.data.code_status==0){
                        that.setData({
                            isDown:true,
                            percent:100
                        })
                        that.setJin();
                    }
                }
            })
         }
     })
 },
 /**更改进度条 */
 setJin:function(){
     var that=this; 
     if(that.data.percent==100){
         setTimeout(function(){
            //  var ul=that.data.vidOneUrl;
            wx.redirectTo({
                url:'../vplayAuto/vplayAuto'
              })
         },3000)
   }
 },
 onReady: function() {

  },
 // 页面卸载
 onUnload() {
   
 },

})