// pages/class_ofthe/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderObject: {},
    msgid: null
  },

  getReadyData(msgId) {
    app.HTTP({
      url: "wxapi/afteclass/orderConfirm",
      method: "GET",
      data: { msgId }
    }).then(res => {
      this.setData({
        orderObject: res.result
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.msgid = options.msgid;
    this.getReadyData(options.msgid)
  },

  wxpayfn() {
    //  data-name="class_processtobe" bindtap="toPage"
    app.HTTP({
      url: "wxapi/afteclass/prepay",
      method: "GET",
      title: "提交请求中...",
      data: {
        msgId: this.data.msgid
      }
    }).then(res => {
      console.log(res)
      let result = res.result;
      wx.requestPayment({
        timeStamp: result.timeStamp,
        nonceStr: result.nonceStr,
        package: result.packageValue,
        signType: result.signType,
        paySign: result.paySign,
        success(res) { 
          if (!true) {
            wx.redirectTo({ // 缴费成功,无需申请课程
              url: '/pages/class_processtobe/index',
            })
          } else { // 缴费成功,申请课程
            app.HTTP({
              url: "wxapi/afteclass/payNotify"
            }).then(notres => {
              wx.redirectTo({
                url: '/pages/class_applyfor/index',
              })
            })
          }
        },
        fail(res) {
          console.log('err', res)
        }
      })
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