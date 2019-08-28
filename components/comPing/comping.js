const app = getApp();
var urlGlobal=app.globalData.host;
Component({
    properties: {
        isPing:{
            type:Boolean
        }
    },
    data:{
        list:[],
        num:'',
    },
    methods:{

        /**添加评论 */
        wirtePing:function(){
            wx.navigateTo({
                url: '../../pages/writePing/writePing',
              })
        },
        getKeId(){
            var that=this;
            wx.getStorage({
                key:'keId',
                success(res){
                    var keId=res.data
                    wx.getStorage({
                        key:'openid',
                        success(ress){
                          var openid=ress.data;
                          wx.request({
                              url:urlGlobal+'Comment/get_comment_list',
                              method:'post',
                              data:{openid:openid,source_id:keId,type:1},
                              success:function(result){
                                  if(result.data.code_status==0){
                                     that.setData({
                                         list:result.data.data.list,
                                         num:result.data.data.num
                                     })
                                  }
                              }
                          })  
                        }
                    })
                }
            })
            
        }
        
    }
})