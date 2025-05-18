import { Options } from "ky"
import md5 from "md5"
import { request } from "./request"

const payBaseUrl = 'https://api.ltzf.cn/api'
const MCH_ID = '1717086839'
const MCH_KEY = '440ec1456c78979a4b713e8fbbb23d73'

function wxPaySign(params:Record<string,any>, key:string) {
  const paramsArr = Object.keys(params);
  paramsArr.sort();
  const stringArr = [];
  paramsArr.map(key => {
      stringArr.push(key + '=' + params[key]);
  });
  // 最后加上商户Key
  stringArr.push("key=" + key);
  const string = stringArr.join('&');
  return md5(string).toString().toUpperCase();
}

async function getWechatOpenId() {
  const url = payBaseUrl + '/wxpay/get_wechat_openid'
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
  const searchParams:Record<string,any> = {
    "mch_id": MCH_ID,
    "timestamp": Math.round(Date.now() / 1000).toString(),
    "callback_url": "http://test-run.imflow-ai.com/api/pay/callback",
    // "attach": "自定义数据",
    // "time_expire": "5m",
    // "sign": "B7337098E280841EB5F4D28261B60C07"
  }
  // 计算签名
  searchParams.sign = wxPaySign(searchParams, MCH_KEY)
  searchParams.attach = 'attach_data'
  const urlSearchParams = new URLSearchParams(searchParams);
  const response = await request.post(url, {
    headers,
    body: urlSearchParams
  })
  return response.json()
}

const createLTPayQrcode=  async () => {
  const url = payBaseUrl + '/wxpay/native'
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
  const searchParams:Record<string,any> = {
    "body": "Image形象店-深圳腾大-QQ公仔",
    "mch_id": MCH_ID,
    "notify_url": "http://test-run.imflow-ai.com/api/pay/callback",
    "out_trade_no": "LTZF20250532323096",
    "timestamp": Math.round(Date.now() / 1000).toString(),
    "total_fee": "0.1",
    // "attach": "自定义数据",
    // "time_expire": "5m",
    // "sign": "B7337098E280841EB5F4D28261B60C07"
  }
  // 计算签名
  searchParams.sign = wxPaySign(searchParams, MCH_KEY)
  const urlSearchParams = new URLSearchParams(searchParams);
  console.log("urlSearchParams", urlSearchParams);
  const response = await request.post(url, {
    headers,
    body: urlSearchParams
  })
  console.log("response", response);
  return response.json()
  // return request.post(url, { headers, body: urlSearchParams })
}

export const getPayOrder=  async (trade_no:string) => {
  const url = payBaseUrl + '/wxpay/get_pay_order'

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  const searchParams:Record<string,any> = {
    "mch_id": MCH_ID,
    "out_trade_no": trade_no,
    "timestamp": Math.round(Date.now() / 1000).toString()
    // "attach": "自定义数据",
    // "time_expire": "5m",
    // "sign": "B7337098E280841EB5F4D28261B60C07"
  }
  // 计算签名
  searchParams.sign = wxPaySign(searchParams, MCH_KEY)
  const urlSearchParams = new URLSearchParams(searchParams);
  const response = await request.post(url, {
    headers,
    body: urlSearchParams
  })
  return response.json()
  // return request.post(url, { headers, body: urlSearchParams })
}

try {
  getWechatOpenId().then((res)=> {
    console.log('res', res)
  }).catch((err) => {
    console.log('err', err)
  } )
} catch (error) {
  console.log('error', error)
  // throw error
  // return Promise.reject(error)
}
