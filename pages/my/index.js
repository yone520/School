// pages/my/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  getReadyData() {
    let _this = this;
    app.HTTP({
      url: "/wxapi/user/myInfo",
      method: "GET"
    }).then(res => {
      this.setData({
        userInfo: res.result
      })
    })
  },

  /**
   * 页面跳转
   */
  toPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.name}/index`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.getReadyData();
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