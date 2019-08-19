const app = getApp()
var urlGlobal=app.globalData.host;
Page({
 /**
 * 页面的初始数据
 */
 data: {
    cir:2,
    vidId:'',
 },
 cirOne:function(event){
     this.setData({
         cir:event.currentTarget.dataset.gid
     })
 },
/**开始训练 */
starTra:function(){
    var that=this;
    wx.getStorage({
        key:'openid',
        success(res){
            var openid=res.data;
            wx.request({
               url:urlGlobal+'Action/action_detail',
               method:"post",
               data:{action_id:that.data.vidId-0,openid:openid},
               success:function(result){
                   if(result.data.code_status==0){
                       /**视频所有内容 */
                       var vidListsOne=result.data.data;
                       /**存储视频地址 */
                       wx.setStorage({
                           key:'videoUrList',
                           data:vidListsOne
                       })
                       /*把视频地址带过去*/  
                    //    var ul=encodeURIComponent(vidListsOne);
                        wx.redirectTo({
                            url:'../vstarTra/vstarTra'
                        })
                   }
               }
           })
        }
    })
    
      
},
 /**
 * 生命周期函数--监听页面加载
 */
 onLoad: function (options) {
    /**视频列表id */
    var that=this;
    that.data.vidId=options.id;
   
 },
 // 页面卸载
 onUnload() {
   
 },

})