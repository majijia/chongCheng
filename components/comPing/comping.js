Component({
    properties: {},
    data:{},
    methods:{
        /**添加评论 */
        wirtePing:function(){
            wx.navigateTo({
                url: '../../pages/writePing/writePing',
              })
        }
    }
})