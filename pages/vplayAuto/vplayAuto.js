const app = getApp()
var urlGlobal=app.globalData.host;
Page({
 /**
 * 页面的初始数据
 */
 data: {
  swiper:{current:0},
  videoUrList:'',
  fullScreen:false,
  videoIndex:null,
  videoOne:'',
  vidLen:'',
  vidNum:0, //id---控制显示哪一个视频
  rightJian:true,   //左
  leftJian:false,  //右
 },
 /**
 * 生命周期函数--监听页面加载
 */
 onLoad: function () {
    var that=this;
    // wx.getStorage({
    //     key:'openid',
    //     success:function(res){
    //         var openid=res.data;
    //         wx.request({
    //             url:urlGlobal+'Action/action_detail',
    //             method:"post",
    //             data:{action_id:1,openid:openid},
    //             success:result=>{
    //                 if(result.data.code_status==0){
    //                   that.setData({
    //                     videoUrList:result.data.data.detail_video_infos,
    //                   })
    //                 }
    //             }
    //          })
    //     }
    // })  
    /*获取所有视频*/
    wx.getStorage({
      key:'videoUrList',
      success:function(res){
        that.setData({
          videoUrList:res.data
        })
        var vidOne=that.data.videoUrList.detail_video_infos;
        var vidLen=vidOne.length;
        that.setData({
          videoOne:vidOne,
          vidLen:vidLen,
        })
      }
    })  
 },
 /**查看详情 */
 see(){
   wx.navigateTo({
     url:'../styleSite/styleSite'
   })
 },
 play(e) {
    //执行全屏方法  
    var videoContext = wx.createVideoContext('myvideo', this);
    videoContext.requestFullScreen();
    this.setData({
        fullScreen:true
    })
 },
 /**右箭头 */
 prevImg: function() { 
    var that=this;
    that.setData({
      rightJian:false
    })
    that.setData({
      leftJian:false
    })
    that.onLoad();
    var vidNum=that.data.vidNum;
    var vidLen=that.data.vidLen;
    if(vidNum==vidLen-1){
      that.setData({
        leftJian:true
      })
    }
    else{
      that.setData({
        vidNum:++that.data.vidNum
      })
      if(vidNum==vidLen){
        that.setData({
          leftJian:true
        })
      }
      that.onLoad();

    }
  },
 /**左箭头 */
  nextImg: function() {
    var that=this;
    that.setData({
      rightJian:false
    })
    that.setData({
      leftJian:false
    })
    var vidNum=that.data.vidNum;
    var vidLen=that.data.vidLen;
    if(vidNum==0){
    // ++that.data.vidNum;
    that.setData({
      rightJian:true
    }) 
    }
    else{
      that.setData({
        vidNum:--that.data.vidNum
      })
      if(vidNum==0){
        that.setData({
          rightJian:true
        })
      }
      that.onLoad();
    }
  },
/**播放末尾时触发 */
ended:function(){
  this.prevImg();
},
/**点击视频 */
audioPlayed:function(event){
   console.log(event.currentTarget.dataset.id)
},
 // 页面卸载
 onUnload() {
   
 },
 /**关闭视屏 */
 closeVideo() {
  var videoContext = wx.createVideoContext('myvideo', this);
  videoContext.exitFullScreen();     
},
/**视屏进入、退出全屏 */
fullScreen(e){
  var isFull = e.detail.fullScreen;
  this.setData({
    fullScreen:isFull
  })
},
 onShow: function() {
    this.videoContext = wx.createVideoContext('myvideo', this);
    this.videoContext.requestFullScreen({ direction: 90 });
},
})

