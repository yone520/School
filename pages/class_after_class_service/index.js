// pages/class_after_class_service/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navchange: 1,
    msglist: [],
    status: null, // 0、待缴费 ，1、待申请 2、待排课 3、代报名 4、报名成功
    statusArr: ["待缴费", "待申请", "待排课", "待报名", "报名成功"],
    statusStyle: ["jf", "sq", "pk", "bm", "bmcg"],
    statusUrl: ["class_after_class_details", "class_applyfor", "class_processtobe", "class_signup", "class_signup_success"]
  },

  toPage(e) {
    let name = e.currentTarget.dataset.name;
    let id = e.currentTarget.dataset.id;
    let url = `/pages/${name}/index`;
    if (name == "class_after_class_details") {
      url += `?msgid=${id}`
    }
    wx.navigateTo({
      url
    })
  },

  getMsgList() {
    app.HTTP({
      url: "wxapi/afteclass/getMsglist",
      method: "GET"
    }).then(res => {
      this.setData({
        msglist: [res.result]
      })
      console.log(this.data.msglist)
    })
  },

  // 头部切换
  topnavFn(e) {
    this.setData({
      navchange: e.currentTarget.dataset.id
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
    this.getMsgList();
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