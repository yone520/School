// pages/class/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isWin: false, // 控制遮罩层
    isStudentData: false,
    userInfo: [], // 学生列表
    selectStudentObj: {}, //得到当前选择的学生
  },

  toPage(e) {
    let name = e.currentTarget.dataset.name;
    let url = `/pages/${name}/index`;
    if (name == "class_teacher") {
      url += `?gradeid=${this.data.selectStudentObj.classGradeId}`
    }
    wx.navigateTo({
      url
    })
  },

  // 获取数据
  getStudentList() {
    app.HTTP({
      url: 'wxapi/user/getStudentInfoList',
      method: "GET",
      isLoading: false,
    }).then(res => {
      if (res.result.records.length) { // 没有用户
        // 判断本地是否存在studentid
        let studentid = wx.getStorageSync("studentid");
        let studentList = res.result.records;
        this.setData({
          isStudentData: true,
          userInfo: studentList
        })
        if (!studentid) { // 如果存在说明选择过获取第一次过
          wx.setStorageSync("studentid", studentList[0].id);
        }
        this.getSelectStudent();
        this.changeArr();
      } else {
        this.setData({
          isStudentData: false
        })
      }
    })
  },

  // 改变数据
  changeArr() {
    this.data.userInfo.forEach((item) => {
      if (item.id == this.data.selectStudentObj.id) {
        item.select = true
      } else {
        item.select = false
      }
    })
    this.setData({
      userInfo: this.data.userInfo
    })
  },

  // 切换学生
  chengStudent(e) {
    let id = e.currentTarget.dataset.id;
    wx.setStorageSync("studentid", id);
    this.getSelectStudent();
    this.changeArr(this.data.userInfo, this.data.selectStuobj);
    this.closeWin();
  },

  // 得到当前选择的学生
  getSelectStudent() {
    let stuid = wx.getStorageSync("studentid");
    let sArr = this.data.userInfo.filter(item => {
      return item.id == stuid
    })
    this.setData({
      selectStudentObj: sArr[0]
    })
    return sArr[0]
  },

  /**
   * 打开遮罩层
   */
  openWin() {
    this.setData({
      isWin: true
    })
  },

  /**
   * 关闭遮罩层
   */
  closeWin() {
    this.setData({
      isWin: false
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
    this.getStudentList();
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