// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

//1，引入支付的三方依赖
const tenpay = require('tenpay');
//2，配置支付信息
const config = {
  appid: 'wxe76332ca8c17ad61', // 你的小程序appid
  mchid: '你的微信商户号', //你的微信商户号
  partnerKey: 'hfeui23982fhjh118hfj39qzmnao3ao3', //微信支付安全密钥
  notify_url: 'https://www.baidu.com/', //支付回调
  spbill_create_ip: '127.0.0.1' //这里填这个就可以
};

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let {
    orderid,
    money
  } = event;
  //3，初始化支付
  const api = tenpay.init(config);

  let result = await api.getPayParams({
    out_trade_no: orderid,
    body: '商品简单描述',
    total_fee: money, //订单金额(分),
    openid: wxContext.OPENID //付款用户的openid
  });
  return result;
} 