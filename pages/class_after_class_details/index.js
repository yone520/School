// pages/class_after_class_details/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detObject: {},
    msgId: null
  },

  getReadyData(msgId) {
    app.HTTP({
      url: "wxapi/afteclass/getMsgInfo",
      method: "GET",
      data: { msgId }
    }).then(res => {
      this.setData({
        detObject: res.result
      })
    })
  },

  jiaofei() {
    // wx.navigateTo({
    //   url: `/pages/class_ofthe/index?msgid=${this.data.msgId}`,
    // })
    wx.redirectTo({
      url: `/pages/class_ofthe/index?msgid=${this.data.msgId}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.msgId = options.msgid;
    this.getReadyData(options.msgid)
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