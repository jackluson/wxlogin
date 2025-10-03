import type { NextApiRequest, NextApiResponse } from 'next';
import { TokenPayload, withAuth } from '@/lib/auth';
import { SDK } from '@/lib/subscription';

async function handler(req: NextApiRequest, res: NextApiResponse, user:TokenPayload){
  if(req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  const {orderNo} = req.query
  if(!orderNo){
    return res.status(400).json({error: 'OrderNo params loss'})
  }
  const payOrder= await SDK.pay.getOrderStatus(orderNo as string) as Record<string,any> 
  return res.status(200).json({
    success: true,
    order: {
      status: payOrder.status
    },
    user: {
      uniqueId: payOrder.userId,
    },
  });
}

export default withAuth(handler);
