// pages/my_help_center/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lenText: 0, // 输入框文字长度
    val: '', // 内容
    adviceImgList: [], // 上传图片数组
    phone: ''
  },

  changephone(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 输入框改变事件
  textChange(e) {
    this.setData({
      lenText: e.detail.value.length,
      val: e.detail.value.replace(/\s+/g, '')
    })
  },

  selectImg() {
    let _this = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success(res) {
        let temp = res.tempFilePaths.map(item => {
          return {url: item}
        });
        console.log(temp)
        // app.uploadImg(temp[0].url)
        _this.setData({
          adviceImgList: _this.data.adviceImgList.concat(temp)
        })
      }
    })
  },

  // 改变图片
  changeImg(e) {
    let _this = this;
    let index = e.currentTarget.dataset.index; // 
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success(res) {
        _this.data.adviceImgList[index].url = res.tempFilePaths[0];
        _this.setData({
          adviceImgList: _this.data.adviceImgList
        })
      }
    })
  },

  // 验证是否可以提交
  validation() {
    return (this.data.val && this.data.adviceImgList.length) ? true : false;
  },

  submitBack() {
    let imgLen = this.data.adviceImgList.length;
    let loading = 0;
    let imgStr = [];
    let _this = this;
    // 提交
    if (this.validation()) {
      wx.showLoading({
        title: "图片上传中...",
        mask: true,
      })
      for (let i = 0; i < imgLen; i++) {
        app.uploadImg(this.data.adviceImgList[i].url, function(src) {
          imgStr.push(src);
          loading++;
          if (loading >= imgLen) {
            wx.hideLoading();
            app.HTTP({
              url: 'wxapi/user/feedback',
              method: "GET",
              title: "反馈中...",
              data: {
                opinion: _this.data.val,
                picUrl: imgStr.join(";"),
                phone: _this.data.phone
              }
            }).then(resut => {
              console.log(resut)
              if (resut.result) {
                wx.showToast({
                  title: '反馈成功！'
                })
                setTimeout(function() {
                  wx.navigateBack({
                    delta: 1,
                  })
                }, 1500)
              }
            })
          }
        })
      }
    } else {
      wx.showToast({
        title: '数据格式不正确',
        icon: "none"
      })
    }
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