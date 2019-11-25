
const db = wx.cloud.database(); // 初始化数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    openid: '',
    pageFrom: ''
  },
  // 地址详情
  handleDetail: function (e) { 
    wx.navigateTo({
      url: '/pages/my/address/edit?id=' + e.currentTarget.dataset.id
    })
  },
  // 添加地址
  handleAddDetail: function () {
    wx.navigateTo({
      url: '/pages/my/address/add'
    })
  },
  handleDete: function(e) { 
    wx.showLoading({
      title: '加载中...',
    })
    db.collection('address').doc(e.currentTarget.dataset.id).remove({ 
      success: res => { 
        wx.showToast({
          icon: 'none',
          title: '删除成功'
        });

        this.onGetOpenid()
      },
      fail: err => { 
        console.error('[云函数] [login] 调用失败', err)
      }
    }) 
  },
  // 最后修改的设为默认收货地址
  handleTabDefault: function(e) { 
    wx.showLoading({
      title: '加载中...',
    });
    // 查询用户地址列表
    db.collection('address').where({
      userId: this.data.openid
    }).get({
      success: res => { 
        // 把所有列表设为不默认
        res.data.map((data) => {
          db.collection('address').doc(data._id).update({
            data: {
              isDefault: false
            },
            success: (res) => {
              // 把当前的设为默认
              db.collection('address').doc(e.currentTarget.dataset.id).update({
                data: {
                  isDefault: true
                },
                success: (res) => { 
                  // 刷新列表
                  this.onGetOpenid()
                },
                fail: console.error
              })
            },
            fail: console.error
          })
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageFrom: options.from
    }) 
  },
  // 选择收货地址
  handleSeleceAddress: function (e) {
    if (this.data.pageFrom == 'order') {
      this.data.address.map((data) => {
        if (data._id == e.currentTarget.dataset.id) {
          let pages = getCurrentPages();  // 当前页的数据，可以输出来看看有什么东西
          let prevPage = pages[pages.length - 2];  // 上一页的数据，也可以输出来看看有什么东西
          /** 设置数据 这里面的 address 是上一页你想被携带过去的数据 */
          prevPage.setData({
            address: data
          })
          wx.navigateBack({
            delta: 1
          })
        }
      })  
    }
  },
  // 获取用户信息
  onGetOpenid: function () {
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
        this.handleLoad()
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  handleLoad: function() {
    db.collection('address').where({
      userId: this.data.openid
    }).get({
      success: res => {
        this.setData({
          address: res.data
        }) 
        wx.hideLoading();
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
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
    this.onGetOpenid()
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