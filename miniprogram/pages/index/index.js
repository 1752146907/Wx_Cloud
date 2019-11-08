
const db = wx.cloud.database(); // 初始化数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onProductList();

    wx.cloud.callFunction({
      name: 'logistics',
      data: {
        text: 'TT6600236034657'
        // text: 'TT6600236034657'
      },
      success: res => { 
        console.log(res)
      },
      fail: err => {
        console.error(err)
      }
    })
  },
  // 跳转商品详情
  handleProductDetail: function (e) { 
    wx.navigateTo({
      url: '/pages/product/index?id=' + e.target.dataset.id
    })
  },
  // 查询商品列表
  onProductList: function () {
    db.collection('product').get({
      success: res => {
        this.setData({
          productList: res.data
        }); 
      },
      fail: err => {
        console.error(err)
      }
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