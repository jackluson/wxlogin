import type { NextApiRequest, NextApiResponse } from 'next';
import { TokenPayload, withAuth } from '@/lib/auth';
import { SDK } from '@/lib/subscription';

async function handler(req: NextApiRequest, res: NextApiResponse, user:TokenPayload){
  if(req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  const { planKey } = req.body
  const userId = user.openid
  const notifyUrl = process.env.NOTIFY_URL!
  const payOrder = await SDK.pay.createPay(planKey, userId, notifyUrl)
  return res.status(200).json({
    success: true,
    order: payOrder,
  });
}

export default withAuth(handler);
