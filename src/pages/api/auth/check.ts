import { TokenPayload, withAuth } from '@/lib/auth';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse, user:TokenPayload) {
  // Return user info
  return res.status(200).json({
    success: true,
    user: {
      openid: user.openid,
    },
  });

}

export default withAuth(handler);