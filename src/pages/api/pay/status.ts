import type { NextApiRequest, NextApiResponse } from 'next';
import { TokenPayload, withAuth } from '@/lib/auth';

async function handler(req: NextApiRequest, res: NextApiResponse, user:TokenPayload){
  return res.status(200).json({
    success: true,
    user: {
      openid: user.openid,
    },
  });
}

export default withAuth(handler);
