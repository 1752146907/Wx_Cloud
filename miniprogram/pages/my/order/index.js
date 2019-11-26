
const db = wx.cloud.database(); // 初始化数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    listAll: [],
    list0: [],
    list1: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handleLoad()
  },
  handleLoad: function() {
    db.collection('orderList').where({
      
    }).get({
      success: res => {
        let list0 = [];
        let list1 = [];

        res.data.map((data) => {
          // 已付款
          if (data.status == 0) {
            list0.push(data)
          } 
          // 未付款
          else {
            list1.push(data)
          }
        })
        this.setData({
          listAll: res.data,
          list0: list0,
          list1: list1
        })
        console.log(this.data.listAll)
        console.log(this.data.list0)
        console.log(this.data.list1)
        wx.hideLoading();
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取地址失败'
        })
      }
    })
  },
  // 订单详情
  handleOrder: function() {
    wx.navigateTo({
      url: '/pages/my/order/detail'
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