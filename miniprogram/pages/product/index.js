
const db = wx.cloud.database(); // 初始化数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: [],
    shopNumber: 1,
    price: 0,
    showProductSku: false 
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
        if (res.data[0].type == 2) {
          res.data[0].sku[0].spec_attr.map((data, index) => {
            if (index == 0) {
              data.active = true;
            } else {
              data.active = false;
            }
          }); 
        }
        this.setData({
          product: res.data,
          price: res.data[0].price
        }); 
        console.log(this.data.product)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        }) 
      }
    })
  },
  // 切换规格
  handleTabSku: function (e) { 
    let val = e.currentTarget.dataset.index; 
    this.data.product[0].sku[0].spec_attr.map((data, index) => {
      if (index == val) {
        data.active = true;
      } else {
        data.active = false;
      }
    })
    this.setData({
      product: this.data.product,
      price: this.data.product[0].sku[0].spec_attr[val].price
    })
  },
  // 提交
  handleSubmit: function() {
    wx.navigateTo({
      url: '/pages/my/order/submit'
    })
  },
  // 返回首页
  handleHome() {
    wx.navigateBack({
      delta: 1
    })
  },
  // 立即购买
  handlesShop() {
    this.onTabProductSku() 
  },
  // 购买弹框
  onTabProductSku() {
    this.setData({
      showProductSku: !this.data.showProductSku
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