// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var rp = require('request-promise');

// 云函数入口函数
exports.main = async (event, context) => {
  // 拿到快递公司名称
  return rp(`https://www.kuaidi100.com/autonumber/autoComNum?resultv2=1&text=${event.text}`)
    .then(function (res) {
      return res;
    })
    .catch(function (err) {
      return err;
    }); 

  // https://www.kuaidi100.com/query?type=suning&postid=TT6600236034657&temp=0.3639768691287424&phone=

  // type: suning               // 刚刚得到的快递公司名称
  // postid: TT6600236034657    // 快递单号
  // temp: 0.3639768691287424   // 时间戳
  // phone:                     // 传空
}