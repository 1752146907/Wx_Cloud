
const db = wx.cloud.database(); // 初始化数据库

import Dialog from '/vant-weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    db.collection('orderList').where({
      orderId: Number(options.orderId)
    }).get({
      success: res => {
        this.setData({
          orderInfo: res.data[0]
        })
         console.log(res.data[0]);
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })
  },
  // 取消订单
  handleQuit: function() {
    Dialog.confirm({
      title: '确认提示',
      message: '本操作不可逆，您确认取消订单吗？'
    }).then(() => {
      // on confirm 
      wx.showLoading({
        title: '加载中...',
      }); 
      db.collection('orderList').doc(this.data.orderInfo._id).remove({
        success: res => {
          wx.showToast({
            icon: 'none',
            title: '删除成功'
          }); 
          wx.navigateBack({
            delta: 1
          })
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
        }
      }) 
    }).catch(() => {
      // on cancel
    });
  },
  // 立即支付
  handleSubmit: function () {
    wx.showToast({
      title: '支付逻辑....',
      icon: 'none',
      duration: 2000
    });
  },
  //  复制单号
  handleCopy: function (e) { 
    let val = JSON.stringify(e.currentTarget.dataset.order);
    wx.setClipboardData({
      data: val,
      success(res) {
        
      }
    })
  },
  // 查询快递
  handleKuaidi: function() {
    wx.navigateTo({
      url: '/pages/my/logistics/index'
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