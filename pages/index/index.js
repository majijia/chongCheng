const app = getApp()
var urlGlobal=app.globalData.host;
Page({
 /**
 * 页面的初始数据
 */
 data: {
    imgUrls:[
        '../../utils/image/index/banner1.jpg',
        '../../utils/image/index/banner3.png',
    ],
    carousel_ad:[],
    banner_ad:[],
    lesson_list:[],
    recommend_ad:[],
    floorstatus:false,
 },
 /**
 * 生命周期函数--监听页面加载
 */
/**页面的高度 */
onPageScroll: function (e) {
    if (e.scrollTop > 300) {
      this.setData({
        floorstatus: true
      });
    }
    else {
      this.setData({
        floorstatus: false
      });
    }
  },
//回到顶部
goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
/**视频列表 */
vidList:function(){
    wx.navigateTo({
        url:"../vidList/vidList"
      })
},
/**课程列表 */
indexCour:function(){
    wx.navigateTo({
        url:"../vidList/vidList"
      })
},
/**修改资料 */
amend:function(){
    wx.redirectTo ({
        url:"../material/material",
    })
},
/**康复咨询 */
docZiup:function(){
  wx.navigateTo({
    url:"../docZiup/docZiup"
  })
},
 onLoad: function () {
    var that=this;
    wx.getStorage({
        key:'openid',
        success:res=>{
            var openid=res.data
            wx.request({
                url:urlGlobal+'Index/index',
                method:'post',
                data:{openid:openid},
                success:function(result){
                    // console.log(result)
                    if(result.data.code_status==0){
                      that.setData({
                        carousel_ad:result.data.data.carousel_ad,
                        banner_ad:result.data.data.banner_ad,
                        lesson_list:result.data.data.lesson_list,
                        recommend_ad:result.data.data.recommend_ad
                      })
                    }
                }
            }) 
        }
    })
    /**下载视频缓存 */
    // wx.downloadFile({
    //   url: 'https://test.cc.rchang.cn/1.mp4', //仅为示例，并非真实的资源
    //     // filePath:"/utils/image/vid",
    //     filePath: wx.env.USER_DATA_PATH + '/1.jpg',
    //   success (res) {
    //     console.log(wx.env.USER_DATA_PATH)
    //     // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
    //     console.log(555,res)
    //   },
    //   fail(res){
    //     console.log(456,res)
    //   }
    // }) 
 },
 // 页面卸载
 onUnload() {
   
 },

})