// pages/my_help_center/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lenText: 0, // 输入框文字长度
    val: '', // 内容
    adviceImgList: [], // 上传图片数组
    teacher: [true, true, true, true, true], // 评价讲师星号
    course: [true, true, true, true, true],   // 评价课程内容星号
    teacherText: ['差评', '一般', '中等', '满意', '非常满意'],
    courseText: ['差评', '一般', '中等', '满意', '非常满意'],
    teacherIndex: 4,
    courseIndex: 4
  },

  // 输入框改变事件
  textChange(e) {
    this.setData({
      lenText: e.detail.value.length,
      val: e.detail.value.replace(/\s+/g, '')
    })
  },

  // 评价星号
  evaluation(e) {
    let index = e.currentTarget.dataset.index;
    if (e.currentTarget.dataset.mark) { // 评论课程
      this.setData({
        course: this.changeArr(index, this.data.course),
        courseIndex: index
      })
    } else { // 评论讲师
      this.setData({
        teacher: this.changeArr(index, this.data.teacher),
        teacherIndex: index
      })
    }
  },

  // 更新星号数组
  changeArr(i, arr) {
    arr.forEach((item, index) => {
      if (index <= i) {
        arr[index] = true;
      } else {
        arr[index] = false;
      }
    })
    return arr;
  },

  selectImg() {
    let _this = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success(res) {
        let temp = res.tempFilePaths.map(item => {
          return { url: item }
        });
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
    return this.data.val ? true : false;
  },

  submitBack() {
    // 提交
    wx.showToast({
      title: this.validation().toString(),
      icon: 'none'
    })
    // setTimeout(() => {
    //   wx.navigateBack({
    //     delta: 1,
    //   })
    // }, 2000)
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