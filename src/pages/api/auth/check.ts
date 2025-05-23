import { TokenPayload, withAuth } from '@/lib/auth';
import { SDK } from '@/lib/subscription';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse, user:TokenPayload) {
  console.log('openid', user.openid)
  const availablePlans = await SDK.plan.getAvailablePlan(user.openid);

  // Return user info
  return res.status(200).json({
    success: true,
    user: {
      openid: user.openid,
    },
    availablePlans,
  });

}

export default withAuth(handler);