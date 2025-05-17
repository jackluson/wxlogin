import type { NextApiRequest, NextApiResponse } from 'next';
// import { getUserInfoByCode } from '../../../lib/redis';
import { getCache } from '../../../lib/cache';
import { generateToken } from '../../../lib/auth';
import { SDK } from '@/lib/subscription';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { code } = req.body;
  
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Verification code required' });
  }
  
  try {
    // Get user info from Redis
    const userInfo = await getCache(`wechat:verification:${code}`);
    
    if (!userInfo) {
      return res.status(400).json({ error: 'Invalid or expired verification code' });
    }
    
    // Generate JWT token
    const token = generateToken(userInfo);
    const openid = userInfo.openid;
    const subInfo = await SDK.plan.getAvailablePlan(openid);
    
    // Return user info and token
    return res.status(200).json({
      success: true,
      user: userInfo,
      subInfo,
      token
    });
  } catch (error) {
    console.error('Error verifying code:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 