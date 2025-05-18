import type { NextApiRequest, NextApiResponse } from 'next';
import { TokenPayload, withAuth } from '@/lib/auth';
import { getPayOrder } from '@/lib/pay';

async function handler(req: NextApiRequest, res: NextApiResponse){
  console.log("req.body", req.body);
  console.log("req.query", req.query);
  console.log("req.method", req.method);
  console.log("req.headers", req.headers);
  const orderNo = 'LTZF20250532323096'
  const resp =  await getPayOrder(orderNo)

  return res.status(200).json({
    success: true,
    resp,
    // user: {
    //   openid: user.openid,
    // },
  });
}

export default handler;
