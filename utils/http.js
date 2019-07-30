// 封装HTTP请求
export class HTTP {

  constructor() {}

  // 数据请求
  request({
    url, 
    isLoading = true,
    success,
    title = '获取数据中', 
    fail, 
    method = 'POST', 
    data = {}, 
    header = {}
  }) {
    let _this = this;
    // 获取token,如果有的话就写入header
    let token = wx.getStorageSync("token");
    let studentid = wx.getStorageSync("studentid");
    if (token) {
      header.token = token;
    }
    if (studentid) {
      header.studentid = studentid;
    }
    // 是否显示Loading
    if (isLoading) {
      wx.showLoading({
        title,
        mask: true,
      })
    }
    return new Promise((resolve, rejeck) => {
      wx.request({
        url: `${this.data.baseUrl}${url}`,
        data,
        header: { ...header, ...this.data.header },
        method,
        success: (res) => {
          if (!res.data.msg) { // 接口成功
            resolve(res.data);
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        },
        fail: (res) => {
          // 请求失败
          HTTP.errToast(res);
        },
        complete: function (res) {
          wx.hideLoading();
        },
      })
    })
  }

  static errToast(err = {}) {
    if (err.errMsg == 'request:fail timeout') {
      wx.showToast({
        title: '请求超时',
        icon: 'none'
      })
    } else {
      if (err.msg) {
        wx.showToast({
          // 根据后台决定
          title: err.msg,
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: "服务器开小差啦",
          icon: 'none'
        })
      }
    }
  }
}
