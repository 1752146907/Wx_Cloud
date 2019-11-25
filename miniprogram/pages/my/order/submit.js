
const db = wx.cloud.database(); // 初始化数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    openid: '',
    parameter: {},
    totalPrice : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    this.handleGetOpenid();

    let totalPrice = Number(JSON.parse(options.parameter).price) * JSON.parse(options.parameter).shopNumber;
    this.setData({
      parameter: JSON.parse(options.parameter),
      totalPrice: totalPrice.toFixed(2)
    }) 
  },


  // 获取用户信息
  handleGetOpenid: function () {
    // 调用云函数
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        this.setData({
          openid: res.result.openid
        });
        this.handleAddress()
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  handleAddress: function () {
    db.collection('address').where({
      userId: this.data.openid
    }).get({
      success: res => {
        res.data.map((value) => { 
          if (value.isDefault) {
            this.setData({
              address: value
            })
          }
        })  
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
  // 跳转收货地址
  handleToAddress: function () {
    wx.navigateTo({
      url: '/pages/my/address/index?from=order'
    })
  },
  // 提交订单
  handleSubmit: function () {
    console.log(this.data.address)
    console.log(this.data.parameter)
    console.log(this.data.totalPrice)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    
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