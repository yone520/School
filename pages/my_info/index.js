// pages/my_info/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentsArr: []
  },

  toPage() {
    wx.navigateTo({
      url: '/pages/my_info_add/index',
    })
  },

  // 获取数据
  getData() {
    let _this = this;
    app.HTTP({
      url: 'wxapi/user/getStudentInfoList',
      method: "GET",
      title: "获取数据中..."
    }).then(res => {
      _this.setData({
        studentsArr: res.result.records
      })
    })
  },

  delInfoList(e) {
    wx.showModal({
      title: '删除提升',
      content: '是否删除某某某',
      showCancel: true,
      success: function(res) {
        if (res.confirm) {
          // 确定关闭
        }
      },
      fail: function(res) {},
      complete: function(res) {},
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
    this.getData();
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