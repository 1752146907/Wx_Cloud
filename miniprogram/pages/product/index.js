
const db = wx.cloud.database(); // 初始化数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    this.handleLoad(options.id);
  },
  handleLoad: function(id) {
    db.collection('product').where({
      id: id
    }).get({
      success: res => {
        this.setData({
          product: res.data
        }); 
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error(err)
      }
    })
  },
  // 提交
  handleSubmit: function() {
    wx.navigateTo({
      url: '/pages/my/order/submit'
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