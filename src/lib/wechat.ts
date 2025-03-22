import axios from 'axios';
import crypto from 'crypto';

export type WechatUserInfo = {
  openid: string;
  nickname?: string;
  headimgurl?: string;
};

// Generate 6-digit random code
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Validate WeChat signature
export function validateSignature(signature: string, timestamp: string, nonce: string, token: string): boolean {
  const arr = [token, timestamp, nonce].sort();
  const str = arr.join('');
  const sha1Str = crypto.createHash('sha1').update(str).digest('hex');
  return sha1Str === signature;
}

// Send auto reply message
export function sendTextMessage(toUser: string, fromUser: string, content: string): string {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  
  return `
    <xml>
      <ToUserName><![CDATA[${toUser}]]></ToUserName>
      <FromUserName><![CDATA[${fromUser}]]></FromUserName>
      <CreateTime>${timestamp}</CreateTime>
      <MsgType><![CDATA[text]]></MsgType>
      <Content><![CDATA[${content}]]></Content>
    </xml>
  `.trim();
}

// Get access token
export async function getAccessToken(): Promise<string> {
  const { data } = await axios.get(
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${process.env.WECHAT_APP_ID}&secret=${process.env.WECHAT_APP_SECRET}`
  );
  return data.access_token;
}

// Get user info by openid
export async function getUserInfo(openid: string, is_default: boolean = false): Promise<WechatUserInfo> {
  if (is_default) {
    return {
      openid: openid,
      nickname: 'WeChat User',
      headimgurl: ''
    };
  }
  const accessToken = await getAccessToken();
  const { data } = await axios.get(
    `https://api.weixin.qq.com/cgi-bin/user/info?access_token=${accessToken}&openid=${openid}&lang=zh_CN`
  );

  // console.log('data:', data);

  return {
    openid: data.openid,
    nickname: data.nickname,
    headimgurl: data.headimgurl
  };
} 