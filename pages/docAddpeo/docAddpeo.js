const app = getApp()
var urlGlobal=app.globalData.host;

Page({
 /**
 * 页面的初始数据
 */
 data: {
    select:1,
    dates:'',
    userDate:'',
    sex:'男',
    hidden:false,
    userName:'',
 },
 /**
 * 生命周期函数--监听页面加载
 */
 onLoad: function () {
      
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
  /**跳转医生列表 */
  docList:function(){
    var that=this;
    wx.getStorage({
      key:'openid',
      success(res){
        var openid=res.data;
        wx.request({
          url:urlGlobal+"Patient/add",
          data:{openid:openid,gender:that.data.sex,name:that.data.userName,birthday:that.data.dates},
          method:'post',
          success:function(result){
            if(result.data.code_status==0){
              wx.navigateTo({
                url:'../docZi/docZi'
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