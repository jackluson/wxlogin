import type { NextApiRequest, NextApiResponse } from 'next';
import { TokenPayload, withAuth } from '@/lib/auth';
import { getPayOrder } from '@/lib/pay';
import { SDK } from '@/lib/subscription';

async function handler(req: NextApiRequest, res: NextApiResponse){
  console.log("req.body", req.body);
  // console.log("req.method", req.method); // post
  console.log("req.headers", req.headers);
  const {out_trade_no} = req.body
  if(out_trade_no) {
    const res = await SDK.pay.payCallback(out_trade_no)
    console.log("res", res);
  } else {
    res.status(403).send('Fail in case of lossing out_trade_no')
    return 
  }
  return res.status(200).send('SUCCESS')
}

export default handler;
