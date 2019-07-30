// pages/class_schedule/index.js
let moment = require("../../utils/moment.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArr: [],
    indicatorDots: false,
    interval: 1000,
    duration: 500,
    thiscurrent: 1, // 当前显示在用户面前的页,
    cindex: 1, // 上下周切换的下标
    month: 0, // 第几月
    week: 0, // 第几周
    clickday: moment().format("YYYY-MM-DD"),
    thisday: moment().format("YYYY-MM-DD")
  },

  toViewDay() {
    wx.redirectTo({
      url: '/pages/class_schedule/index',
    })
  },

  /**
   * 获取本周周一和周日日期
   */
  getCurrentWeek() {
    const start = moment().weekday(1).format('YYYY-MM-DD'); //本周一
    const end = moment().weekday(7).format('YYYY-MM-DD'); //本周日
    // return [start, end]
    return start
  },

  /**
   * 获取前 i 周的周一和周日日期，并以数组的方式返回。
   * 当 i=1，获取的是上周一和上周日的日期；
   * 当 i=2，获取的是上上周一和上上周日的日期
   * ...以此类推
   * @param i
   */
  getLastWeek(i) {
    let weekOfDay = parseInt(moment().format('E'));//计算今天是这周第几天
    let last_monday = moment().subtract(weekOfDay + 7 * i - 1, 'days').format('YYYY-MM-DD');//周一日期
    let last_sunday = moment().subtract(weekOfDay + 7 * (i - 1), 'days').format('YYYY-MM-DD');//周日日期
    // return [last_monday, last_sunday]
    return last_monday
  },

  /**
   * 获取后 i 周的周一和周日日期，并以数组的方式返回。
   * 当 i=1，获取的是下周一和下周日的日期；
   * 当 i=2，获取的是下下周一和下下周日的日期
   * ...以此类推
   * @param i
   */
  getNextWeek(i) {
    let weekOfDay = parseInt(moment().format('E'));//计算今天是这周第几天
    let next_monday = moment().add((7 - weekOfDay) + 7 * (i - 1) + 1, 'days').format('YYYY-MM-DD');//周一日期
    let next_sunday = moment().add((7 - weekOfDay) + 7 * i, 'days').format('YYYY-MM-DD');//周日日期
    // return [next_monday, next_sunday]
    return next_monday
  },

  getMonthNum(time = moment().format("YYYY-MM-DD")) {
    //a = d = 当前日期
    //b = 6 - w = 当前周的还有几天过完(不算今天)
    //a + b 的和在除以7 就是当天是当前月份的第几周
    let a = time.split("-")[0];
    let b = time.split("-")[1];
    let c = time.split("-")[2];
    if (b < 10) {
      b = b.split("")[1];
    }
    var date = new Date(a, parseInt(b) - 1, c), w = date.getDay(), d = date.getDate();

    this.setData({
      week: Math.ceil((d + 6 - w) / 7),
      month: b
    })
  },

  backToday() {
    this.newArr(1, 888, true);
  },

  // 返回date后的七天
  getUtime(date) {
    let arr = [];
    for (let i = 0; i < 7; i++) {
      let time = moment(date).add(i, "days").format("YYYY-MM-DD");
      arr.push({
        time: time,
        isClick: (moment().format("YYYY-MM-DD") == time) ? true : false,
        showTime: time.split("-")[2],
        text: this.retNumStr(i)
      })
    }
    return arr;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.newArr(this.data.cindex, 888);
    this.getMonthNum();
    this.setData({
      dataArr: this.data.dataArr
    })
  },

  // 重写组装三个数组
  newArr(i, swiper, isJintian) {
    // console.log(this.getUtime(this.getNextWeek(i - 2)));
    // console.log(this.getUtime(this.getNextWeek(i - 1)));
    // console.log(this.getUtime(this.getNextWeek(i)));
    if (isJintian) {
      i = 1;
    }
    this.data.dataArr = [];
    if (swiper == 888) {
      this.data.dataArr.push(this.getUtime(this.getNextWeek(i - 2)), this.getUtime(this.getNextWeek(i - 1)), this.getUtime(this.getNextWeek(i)))
      this.setData({
        thiscurrent: 1
      })
    } else {
      if (swiper) {
        if (this.data.thiscurrent == 2) {
          this.data.dataArr.push(this.getUtime(this.getNextWeek(i)), this.getUtime(this.getNextWeek(i - 2)), this.getUtime(this.getNextWeek(i - 1)))
        } else if (this.data.thiscurrent == 0) {
          this.data.dataArr.push(this.getUtime(this.getNextWeek(i - 1)), this.getUtime(this.getNextWeek(i)), this.getUtime(this.getNextWeek(i - 2)))
        } else if (this.data.thiscurrent == 1) {
          this.data.dataArr.push(this.getUtime(this.getNextWeek(i - 2)), this.getUtime(this.getNextWeek(i - 1)), this.getUtime(this.getNextWeek(i)))
        }
      } else {
        if (this.data.thiscurrent == 0) {
          this.data.dataArr.push(this.getUtime(this.getNextWeek(i - 1)), this.getUtime(this.getNextWeek(i)), this.getUtime(this.getNextWeek(i - 2)))
        } else if (this.data.thiscurrent == 2) {
          this.data.dataArr.push(this.getUtime(this.getNextWeek(i)), this.getUtime(this.getNextWeek(i - 2)), this.getUtime(this.getNextWeek(i - 1)))
        } else if (this.data.thiscurrent == 1) {
          this.data.dataArr.push(this.getUtime(this.getNextWeek(i - 2)), this.getUtime(this.getNextWeek(i - 1)), this.getUtime(this.getNextWeek(i)))
        }
      }
    }

    // 滑动后数组的第一项
    let swiperLastJb = this.data.dataArr[this.data.thiscurrent][0]['time'];
    this.getMonthNum(swiperLastJb)

    this.setData({
      dataArr: this.data.dataArr
    })

  },

  // 数字转换大写
  retNumStr(num) {
    if (num == 0) {
      return "一"
    } else if (num == 1) {
      return "二"
    } else if (num == 2) {
      return "三"
    } else if (num == 3) {
      return "四"
    } else if (num == 4) {
      return "五"
    } else if (num == 5) {
      return "六"
    } else if (num == 6) {
      return "日"
    }
  },

  // 判断方向
  determineTheDrection(current, nextCurrent, len = 3) {
    if (current == 2) { // 代表在最后一页
      if (nextCurrent == 0) {
        // 向右
        return true
      } else {
        return false
      }
    } else if (current == 0) {
      if (nextCurrent == 2) {
        // 向左
        return false
      } else {
        return true
      }
    } else if (current == 1) {
      if (current > nextCurrent) { // 向左滑动
        return false
      } else if (current < nextCurrent) { // 向右滑动
        return true
      }
    }
  },

  // swiper 滑动
  swiperchange(e) {
    let current = e.detail.current;
    let swiper = this.determineTheDrection(this.data.thiscurrent, current);
    if (swiper) { // 向右滑动
      this.data.cindex += 1;
    } else {
      this.data.cindex -= 1;
    }
    this.setData({
      thiscurrent: current
    })
    if (!e.detail.source) { // 非手动滑动
      this.data.cindex = 1;
      this.newArr(this.data.cindex, swiper, true)
    } else {
      this.newArr(this.data.cindex, swiper)
    }
  },

  bindtransition(e) {
    console.log(e);
  },

  changeDay(e) {
    let time = e.currentTarget.dataset.time;
    let index = e.currentTarget.dataset.index;
    let ind = e.currentTarget.dataset.ind;
    this.data.dataArr.forEach((item, iiindex) => {
      item.forEach((ccItem, ccIndex) => {
        ccItem.isClick = false;
      })
    })
    this.data.dataArr[index][ind].isClick = true;
    // wx.showToast({
    //   title: JSON.stringify(e.currentTarget.dataset.time),
    // })
    this.setData({
      clickday: time,
      dataArr: this.data.dataArr
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