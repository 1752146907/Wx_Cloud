
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
  handleSubmit: function () { 
    let specAttr = "";
    // 多规格
    if (this.data.product[0].type == '2') {
      this.data.product[0].sku.map((data) => {
        data.spec_attr.map((children) => {
          if (children.active) {
            specAttr = data.title + ':' + children.title
          }
        })
      }) 
    }
    let parameter = {
      image: this.data.product[0].image[0],    // 图片
      specAttr: specAttr,                   // 规格
      shopNumber: this.data.shopNumber,     // 数量
      title: this.data.product[0].title,    // 标题
      sort: this.data.product[0].sort,      // 库存
      price: this.data.price                // 价格
    }
    wx.navigateTo({
      url: '/pages/my/order/submit?parameter=' + JSON.stringify(parameter), 
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
  // 设置数量
  onInputGoodsNum(e) { 
    this.setData({
      shopNumber: e.detail.value
    });
  },
  handlePull() {
    if (this.data.shopNumber > 1) {
      this.setData({
        shopNumber: --this.data.shopNumber
      });
    }
  },
  handlePush() {
    this.setData({
      shopNumber: ++this.data.shopNumber
    });
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