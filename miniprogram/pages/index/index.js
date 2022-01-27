// miniprogram/pages/index/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index_artcle:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.cloud.database().collection('index_artcle')
    .get()
    .then(res=>{
      
      this.setData({
        index_artcle:res.data[0]
      })
      console.log(res.data[0])
    }),

    wx.cloud.database().collection('index_tourist')
    .where({
      first: '是',
    })
    .get()
    .then(res=>{
      
      this.setData({
        index_tourist:res.data[0]
      })
      console.log(res.data[0])
    }),

    wx.cloud.database().collection('index_movie')
    .where({
      first: '是',
    })
    .get()
    .then(res=>{
      this.setData({
        index_movie:res.data[0]
      })
      console.log(res.data[0])
    })

  },
  

       // 跳转页面
       goDetail(){
    
        wx.navigateTo({
          url: '/pages/shi_content/shi_contnet'
        })
      },



       // 跳转页面

      goDetail_old(){
        wx.navigateTo({
          url: '/pages/old/old'
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})