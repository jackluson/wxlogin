import type { NextApiRequest, NextApiResponse } from 'next';
import { validateSignature, generateVerificationCode, sendTextMessage, getUserInfo } from '../../../lib/wechat';
// import { storeVerificationCode } from '../../../lib/redis';
import getRawBody from 'raw-body';
import { parseStringPromise } from 'xml2js';
import { setCache } from '../../../lib/cache';

const processReq = async (req: NextApiRequest) => {
  // Get raw XML body
  const rawBody = await getRawBody(req);
  const xmlBody = rawBody.toString('utf-8');
  // Parse XML data
  const xmlData = await parseStringPromise(xmlBody, { explicitArray: false });
  console.log("xmlData", xmlData);
  const message = xmlData.xml;
  const loginKeywords = ['验证码', '登录', '登陆', 'Login', 'login', 'LOGIN'];

  if (message.MsgType === 'text' && loginKeywords.includes(message.Content)) {
    // if (message.MsgType === 'event' && message.Event === 'CLICK' && message.EventKey === 'login') {
    // Generate verification code
    const code = generateVerificationCode();

    // Get user info
    const userInfo = await getUserInfo(message.FromUserName, true);
    console.log('userInfo:', userInfo);

    // Store code and user info in Redis (valid for 5 minutes)
    setCache(`wechat:verification:${code}`, userInfo);

    // Send verification code to user
    const replyMessage = sendTextMessage(
      message.FromUserName,
      message.ToUserName,
      `您的登录验证码是：${code}，有效期5分钟。`
    );
    return replyMessage;
  }
  // Default reply
  return 'success';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // WeChat server verification request
    console.log('get query:', req.query);
    // console.log('WECHAT_TOKEN:', process.env.WECHAT_TOKEN);
    const { signature, timestamp, nonce, echostr } = req.query;
    console.log('token:', process.env.WECHAT_TOKEN);
    if (
      typeof signature === 'string' &&
      typeof timestamp === 'string' &&
      typeof nonce === 'string' &&
      typeof echostr === 'string'
    ) {
      const token = process.env.WECHAT_TOKEN || '';
      if (validateSignature(signature, timestamp, nonce, token)) {
        return res.status(200).send(echostr);
      }
    }

    return res.status(401).send('Invalid signature');
  }
  if (req.method === 'POST') {
    // Handle WeChat event push
    console.log('post query:', req.query);
    // console.log('WECHAT_TOKEN:', process.env.WECHAT_TOKEN);
    const { signature, timestamp, nonce } = req.query;
    const isInWechatCloud = process.env.WECHAT_CLOUD == '1';
    console.log("isInWechatCloud", isInWechatCloud);
    if (
      typeof signature === 'string' &&
      typeof timestamp === 'string' &&
      typeof nonce === 'string'
    ) {
      const token = process.env.WECHAT_TOKEN || '';
      if (!validateSignature(signature, timestamp, nonce, token)) {
        return res.status(401).send('Invalid signature');
      }
      try {
        const resMessage = processReq(req);
        return res.status(200).send(resMessage);
      } catch (error) {
        console.error('Error handling WeChat event:', error);
        return res.status(500).send('Internal Server Error');
      }
    } else if (isInWechatCloud) {
      try {
        const resMessage = await processReq(req);
        console.log("resMessage", resMessage);
        return res.status(200).send(resMessage);
      } catch (error) {
        console.error('Error handling WeChat event:', error);
        return res.status(500).send('Internal Server Error');
      }
    }
  }
  return res.status(405).send('Method Not Allowed');
}

export const config = {
  api: {
    bodyParser: false,
  },
};

