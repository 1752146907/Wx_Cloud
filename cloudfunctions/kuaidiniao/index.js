// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var rp = require('request-promise');

// 云函数入口函数
exports.main = async (event, context) => {
  var options = {
    uri: 'http://www.kuaidi100.com/query?type=tiantian&postid=TT6600236034657&temp=0.5171239413011192&phone=',
    header: {
      Accept: "application/json, text/javascript, */*; q=0.01",
      Connection: "keep-alive",
      Cookie: "csrftoken=3kSqJORurBGne4RqAxvwhP679X79ZVVpTmUGTxG7vJw; WWWID=WWW1807CFA7D8D05B91B6771A8378BC14B9; couponpop_maxCount_www_coupon_pop=2; couponpop_expire_www_coupon_pop=1573660800031; Hm_lvt_22ea01af58ba2be0fec7c11b25e88e6c=1573527014,1573545988,1573616427,1573627497; Hm_lpvt_22ea01af58ba2be0fec7c11b25e88e6c=1573627510",
      Host: "www.kuaidi100.com",
      Referer: "https://www.kuaidi100.com/?from=openv"
    }
  };

  return rp(options)
    .then(function (res) {
      return res;
    })
    .catch(function (err) {
      return err;
    });
}