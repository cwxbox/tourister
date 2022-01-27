// miniprogram/pages/index/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    article :[]
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.cloud.database().collection('artilce_kinds').get().then(res=>{
      
      this.setData({
        artilce_kinds:res.data
      })
      console.log(res.data)
    })
  },

    // 跳转页面
    goDetail_kinds(e){
      console.log(e)
      console.log(e.currentTarget.dataset.article)
      wx.navigateTo({
        url: '/pages/article_content/article_content?kind='+e.currentTarget.dataset.article,
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