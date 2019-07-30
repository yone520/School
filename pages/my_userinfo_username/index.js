// pages/my_userinfo_username/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameVal: ""
  },

  /**
   * 清空输入框
   */
  aaaaaa() {
    this.setData({
      nameVal: ""
    })
  },
  /**
   * 获取输入框的值
   */
  getNameVal(e) {
    this.setData({
      nameVal: e.detail.value.replace(/\s+/g, '')
    })
  },

  // 键盘提交按钮
  confirmSub() {
    app.HTTP({
      url: "wxapi/user/modifyUserName",
      method: "GET",
      data: {
        "newName": this.data.nameVal
      }
    }).then(res => {
      console.log(res);
      if (res.result) {
        wx.navigateBack({
          delta: 1,
        })
      }
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