import type { NextApiRequest, NextApiResponse } from 'next';
// import { getUserInfoByCode } from '../../../lib/redis';
import { getCache } from '../../../lib/cache';
import { generateToken } from '../../../lib/auth';
import { SDK } from '@/lib/subscription';

export enum SourceEnum {
  wechat = 'wechat',
  google = 'google',
  microsoft = 'microsoft'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { source = SourceEnum.wechat, code, email, uniqueId: id } = req.body;
  console.log("req.body", req.body);
  
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Verification code required' });
  }
  
  try {
    let userInfo = null
    let uniqueId = id
    if(source === SourceEnum.wechat) {
      // Get user info from Redis
      userInfo = await getCache(`wechat:verification:${code}`);
      uniqueId = userInfo.openid;
    } else if(source === SourceEnum.google && email) {
      uniqueId = email
      userInfo  = {
        email,
      }
    } else if(source && uniqueId) {
      userInfo  = {
        uniqueId,
      }
    }
    if (!userInfo || !uniqueId) {
      return res.status(400).json({ error: 'Invalid or expired verification code' });
    }
    // Generate JWT token
    const token = generateToken(uniqueId, source);
    const availablePlans = await SDK.plan.getAvailablePlan(uniqueId);
    // Return user info and token
    return res.status(200).json({
      success: true,
      user: userInfo,
      availablePlans,
      token
    });
  } catch (error) {
    console.error('Error verifying code:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 
