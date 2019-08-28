const app = getApp()
var urlGlobal=app.globalData.host;
Page({
 /**
 * 页面的初始数据
 */
 data: {
   list:[],
 },
 /**
 * 生命周期函数--监听页面加载
 */
 onLoad: function (options) {
     var that=this;
     var docId=options.id;
     wx.getStorage({
         key:'openid',
         success(res){
             var openid=res.data;
             wx.request({
                 url:urlGlobal+'Doctor/detail',
                 method:'post',
                 data:{openid:openid,doctor_id:docId},
                 success:function(result){
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
 /**图文咨询 */
 phoZi:function(e){
     wx.navigateTo({
         url:'../docPaypho/docPaypho'
     })
 },
 // 页面卸载
 onUnload() {
   
 },

})