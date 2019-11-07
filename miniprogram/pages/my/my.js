 
const db = wx.cloud.database(); // 初始化数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  }, 

  // 我的订单
  handleOrder: function() {
    wx.navigateTo({
      url: '/pages/my/order/index'
    })
  },
  // 地址列表
  handleAddress: function () {
    wx.navigateTo({
      url: '/pages/my/address/index'
    })
  },
  // 获取用户信息并且保存到数据
  onGotUserInfo: function(event){
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.showLoading({
            title: '资料插入中...',
          })
          wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
              console.log('[云函数] [login] user openid: ', res.result.openid)
              this.setData({
                userInfo: event.detail.userInfo
              })
              // 插入数据
              db.collection('user').add({
                data: {
                  name: event.detail.userInfo.nickName,
                  avatarUrl: event.detail.userInfo.nickName,
                  gender: event.detail.userInfo.gender,
                  openid: res.result.openid
                }
              }).then(res => {
                wx.hideLoading();
                wx.showToast({
                  title: '资料插入成功',
                })
                console.log(this.data.userInfo)
              }).catch(err => {
                wx.hideLoading();
                wx.showToast({
                  title: '资料插入失败',
                })
              })
            },
            fail: err => {
              console.error('[云函数] [login] 调用失败', err)
            }
          })
        }
      }
    }) 
    console.log(event.detail);
  },

  // 获取用户信息
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        console.log(res) 
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err) 
      }
    })
  },

  // 获取商品详情
  onGetProduct: function () {  
    db.collection('product').where({
      id: '1'
    }).get({
      success: res => {
        console.log(res.data);  
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  // 添加收货地址
  onAddress: function () {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)

        // 插入数据
        db.collection('address').add({
          data: {
            city: this.data.userInfo.city,
            detail: "粤海街道",
            isDefault: true,
            name: this.data.userInfo.nickName,
            phome: "13929747777",
            province: this.data.userInfo.province,
            region: '宝安区',
            userId: res.result.openid
          }
        }).then(res => {
          wx.showToast({
            title: '添加成功',
          })
        }).catch(err => {
          wx.showToast({
            title: '添加失败',
          })
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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