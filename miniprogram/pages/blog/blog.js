// pages/blog/blog.js

//搜索关键字
let keyword=''


Page({

  /**
   * 页面的初始数据
   */
  data: {
    //控制底部弹出层
    modalShow: false,
    blogList:[],
  },
  //发布
  onPublish(){
    console.log("!!!!!!")
    //判断用户是否授权
    wx.getSetting({
        success:(res)=>{
          console.log("!!!!!!")
          console.log(res)
          if(res.authSetting['scope.userInfo']){
            wx.getUserInfo({
              success:(res)=>{
                console.log(res)
                this.onLoginSuccess({
                  detail:res.userInfo
                })
              }
            })
          }else{
            this.setData({
              modalShow:true,
            })
          }
        }
    })
  },
  
  goComment(event){
   wx.navigateTo({
     url: '../../pages/blog-comment/blog-comment?blogId='+event.target.dataset.blogid,
   })
  },
  



  onLoginSuccess(event){
    
    const detail=event.detail
    /*console.log(event)
    console.log(detail.nickName)*/
    console.log(detail.avatarUrl)
    
    wx.navigateTo({
      /*url:'../blog-edit/blog-edit?nickName='+detail.nickName,
      url:'../blog-edit/blog-edit?avatarUrl='+detail.avatarUrl,*//*教训标点符号要看清*/
      url: `../blog-edit/blog-edit?nickName=${detail.nickName}&avatarUrl=${detail.avatarUrl}`,
    })
  },
  onLoginFail(){
    wx.showModal({
      title:'授权用户才能发布',
      content:''
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadBloglist()
  },

  onSearch(event){
    console.log(event.detail.keyword)
    this.setData({
      blogList:[]
    })
    keyword=event.detail.keyword
    this._loadBloglist(0)
  },


  _loadBloglist(start=0){
  wx.showLoading({
    title: '拼命加载中',
  })
  wx.cloud.callFunction({
    name:'blog',
    data:{
      keyword,
      start,
      count:10,
      $url:'list',
      
    }
  }).then((res)=>{
    this.setData({
      blogList:this.data.blogList.concat(res.result),
      
    })
    wx.hideLoading()
    wx.stopPullDownRefresh()
  })

  



},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      blogList:[]
    })
    this._loadBloglist(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._loadBloglist(this.data.blogList.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (event) {
    console.log(event)
    let blogObj =event.target.dataset.blog
    return{
      title:blogObj.content,
      path:`/pages/blog-comment/blog-comment?blogId=${blogObj._id}`,
      //imageUrl:''
    }
  }
})
