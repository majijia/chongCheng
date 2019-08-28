const app = getApp()
var urlGlobal=app.globalData.host;
Page({
 /**
 * 页面的初始数据
 */
 data: {
    cir:1,
    vidId:'',
    list:[],
    isPing:true,
 },
 cirOne:function(event){
     var that=this;
     var cirId=event.currentTarget.dataset.gid;
     that.setData({
         cir:cirId,
         isPing:true
     })
     if(cirId==3){
         that.setData({
           isPing:false
         })
         that.comping.getKeId(); 
     }
 },
/**开始训练 */
starTra:function(){
    var that=this;
    that.setData({
        cir:4
    })
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
                        // wx.redirectTo({
                        //     url:'../vstarTra/vstarTra'
                        // })
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
    /**课程id */
    that.data.vidId=options.id;
    wx.setStorage({
        key:'keId',
        data:that.data.vidId
    })
    wx.getStorage({
        key:'openid',
        success(res){
            var openid=res.data;
            wx.request({
                url:urlGlobal+'Lesson/detail',
                method:"post",
                data:{id:that.data.vidId,openid:openid},
                success:function(result){
                    if(result.data.code_status==0){
                        that.setData({
                            list:result.data.data,
                        })
                    }
                }
            })
        }
    })
 },
 // 页面卸载
 onUnload() {
   
 },
 onReady: function () {
   var that=this;
   that.comping= that.selectComponent('#Ping');
}
})