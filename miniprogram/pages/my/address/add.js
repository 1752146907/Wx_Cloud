
const db = wx.cloud.database(); // 初始化数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    res_id: '',          // 提交成功返回的id
    disabled: false,
    nav_select: false, // 快捷导航
    openid: "",
    name: '',
    region: '',
    phone: '',
    detail: '',
    error: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onGetOpenid();
  },
  // 获取用户信息
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        this.setData({
          openid: res.result.openid
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  /**
   * 表单提交
   */
  saveData: function (e) {
    let _this = this,
      values = e.detail.value
    values.region = this.data.region;
    // 表单验证
    if (!_this.validation(values)) {
      return false;
    }
    // 云数据库插入数据
    wx.showLoading({
      title: '加载中...',
    })
    db.collection('address').add({
      data: {
        procince: this.data.provinceName,
        city: this.data.cityName,
        region: this.data.regionName,
        address: values.detail,
        name: values.name,
        phone: values.phone,
        userId: this.data.openid
      }
    }).then(res => { 
      this.handleEditDefaultAddredd(res._id)
    }).catch(err => {
      wx.hideLoading();
      wx.showToast({
        title: '资料插入失败',
      })
    }); 
  },
  /**
   * 表单验证
   */
  validation: function (values) {
    // 去除空格
    let name = values.name.replace(/(^\s*)|(\s*$)/g, "")
    if (name == '') {
      wx.showToast({
        title: '收件人不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (name.length < 2) {
      wx.showToast({
        title: '收件人名称过短，建议至少两位数以上',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (values.phone.length < 1) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    let reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
    if (!reg.test(values.phone)) {
      wx.showToast({
        title: '手机号不符合要求',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (!this.data.region) {
      wx.showToast({
        title: '省市区不能空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (JSON.stringify(values.detail).length < 5) {
      wx.showToast({
        title: '详细地址长度过短',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    return true;
  },

  /**
   * 修改地区
   */
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value,
      provinceName: e.detail.value[0],
      cityName: e.detail.value[1],
      countyName: e.detail.value[2]
    })
  },

  /**
   * 获取微信地址
   */
  chooseAddress: function () {
    let _this = this;
    wx.chooseAddress({
      success: function (res) {
        _this.setData({
          name: res.userName,
          phone: res.telNumber,
          region: [res.provinceName, res.cityName, res.countyName],
          regionName: res.countyName,
          detail: res.detailInfo,
          provinceName: res.provinceName,
          cityName: res.cityName,
          countyName: res.countyName
        });
      }
    })
  },
  // 最后修改的设为默认收货地址
  handleEditDefaultAddredd: function (res_id) {
    db.collection('address').where({
      userId: this.data.openid
    }).get({
      success: res => { 
        res.data.map((data) => {
          db.collection('address').doc(data._id).update({
            data: {
              isDefault: false
            },
            success: (res) => {
              db.collection('address').doc(res_id).update({
                data: {
                  isDefault: true
                },
                success: (res) => {
                  wx.hideLoading();
                  wx.showToast({
                    title: '修改成功',
                  });
                  wx.navigateTo({
                    url: '/pages/my/address/index'
                  })
                  // wx.navigateBack({
                  //   delta: 1
                  // })
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

})