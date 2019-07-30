// components/nodata/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    setColor: {
      type: String,
      value: "b"
    },
    selectDataType: {
      type: String,
      value: "xs1" // xues1:我的学生信息没有数据
    },
    isshowbottom: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toBind() {
      wx.navigateTo({
        url: '/pages/my_info_add/index',
      })
    }
  }
})
