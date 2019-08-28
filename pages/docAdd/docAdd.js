const app = getApp();
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
 onLoad: function () {
   var that=this;
    wx.getStorage({
      key:'openid',
      success(res){
        var openid=res.data;
        wx.request({
          url:urlGlobal+'Patient/get_list',
          method:'post',
          data:{openid:openid},
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
 /**添加患者 */
 addPeo:function(){
   wx.navigateTo({
       url:'../docAddpeo/docAddpeo'
   })
 },
 // 页面卸载
 onUnload() {
   
 },

})