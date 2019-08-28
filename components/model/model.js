const app = getApp();
var urlGlobal=app.globalData.host;
Component({
    properties: {},
    data:{},
    methods:{
      /*购买*/
      buyMony:function(){
          
          wx.navigateTo({
              url:'../../pages/money/money'
          })
      }  
    }
})