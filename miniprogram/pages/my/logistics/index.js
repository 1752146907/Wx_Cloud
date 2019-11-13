
const db = wx.cloud.database(); // 初始化数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postid: 'TT6600236034657',
    // postid: '260449872246',
    logisticsInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handleLogisticsType();
  },
  // 获取物流公司类型
  handleLogisticsType: function () {
    wx.cloud.callFunction({
      name: 'kuaidi',
      data: {
        text: this.data.postid
      },
      success: res => { 
        let comCode = JSON.parse(res.result).auto[0].comCode;

        this.handleLogisticsInfo(comCode, this.data.postid)
      },
      fail: err => {
        console.error(err)
      }
    })
  },
  // 获取物流信息
  handleLogisticsInfo: function (comCode, postid) {
    wx.request({
      url: "https://www.kuaidi100.com/query?type=" + comCode + "&postid=" + postid +"&temp=0.8445075342502237&phone=",
      header: { 
        Cookie: "csrftoken=3kSqJORurBGne4RqAxvwhP679X79ZVVpTmUGTxG7vJw; WWWID=WWW1807CFA7D8D05B91B6771A8378BC14B9; couponpop_maxCount_www_coupon_pop=2; couponpop_expire_www_coupon_pop=1573660800031; Hm_lvt_22ea01af58ba2be0fec7c11b25e88e6c=1573527014,1573545988,1573616427,1573627497; Hm_lpvt_22ea01af58ba2be0fec7c11b25e88e6c=1573627510"
      },
      data: {},
      success: (res) => { 
        if (res.data.status == "200") {
          this.setData({
            logisticsInfo: res
          })
        } else {
          wx.showToast({
            title: '快递公司参数异常：单号不存在或者已经过期',
            icon: 'none',
            duration: 3000
          })
        }
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