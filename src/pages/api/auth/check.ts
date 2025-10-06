import { TokenPayload, withAuth } from '@/lib/auth';
import { SDK } from '@/lib/subscription';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse, user:TokenPayload) {
  console.log('user', user)
  const uniqueId = user.uniqueId || (user as any).openid;// 兼容之前微信登录
  const availablePlans = await SDK.plan.getAvailablePlan(uniqueId, user.source);

  // Return user info
  return res.status(200).json({
    success: true,
    user: {
      uniqueId: user.uniqueId,
    },
    availablePlans,
  });

}

export default withAuth(handler);
