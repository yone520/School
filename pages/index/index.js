// pages/index/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 500,
    isWin: false, // 控制遮罩层
    newsArr: [], // 益体咨询
    isStudentData: false,
    userInfo: [], // 学生列表
    selectStudentObj: {}, //得到当前选择的学生
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
        
        this.getIndexData();
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
    console.log(123);
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
   * 关闭遮罩层
   */
  closeWin() {
    this.setData({
      isWin: false
    })
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
   * 打开页面
   */
  openUrl(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/index_details/index?id=${id}`,
    })
  },

  // 获取首页数据
  getIndexData() {
    let banner = new Promise((resolve, reject) => {
      app.HTTP({
        url: 'wxapi/home/getBannerPic',
        method: "GET"
      }).then(res => {
        resolve(res.result.records);
      })
    })

    let news = new Promise((resolve, reject) => {
      app.HTTP({
        url: 'wxapi/home/getNews',
        method: "GET"
      }).then(res => {
        resolve(res.result.records);
      })
    })

    Promise.all([banner, news]).then(res => {
      this.setData({
        imgUrls: res[0],
        newsArr: res[1]
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getIndexData();
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