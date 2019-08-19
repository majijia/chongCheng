const app = getApp()
var urlGlobal=app.globalData.host;
Page({
 /**
 * 页面的初始数据
 */
 data: {
    list:[]
 },
 /*视频详情 */
 vidplay:function(e){
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
        url:'../vidplay/vidplay?id='+id      
    })
 },
 /**
 * 生命周期函数--监听页面加载
 */
 onLoad: function () {
     var that=this;
     wx.getStorage({
         key:'openid',
         success:res=>{
             var openid=res.data;
             wx.request({
                url:urlGlobal+'Lesson/get_list',
                method:'get',
                data:{page:1,perpage:10,openid:openid},
                success:function(result){
                    console.log(result)
                    if(result.data.code_status==0){
                      that.setData({
                        list:result.data.data
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

})