import type { NextApiRequest, NextApiResponse } from 'next';
import { TokenPayload, withAuth } from '@/lib/auth';

async function handler(req: NextApiRequest, res: NextApiResponse){
  console.log("req.body", req.body);
  console.log("req.query", req.query);
  console.log("req.method", req.method);
  console.log("req.headers", req.headers);

  return res.status(200).json({
    success: true,
    // user: {
    //   openid: user.openid,
    // },
  });
}

export default handler;
