// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var rp = require('request-promise');

// 云函数入口函数
exports.main = async (event, context) => {
  // 拿到快递公司名称
  return rp(`https://www.kuaidi100.com/chaxun?nu=${event.nu}&com=${event.code}`)
    .then(function (res) {
      return res;
    })
    .catch(function (err) {
      return err;
    }); 
}