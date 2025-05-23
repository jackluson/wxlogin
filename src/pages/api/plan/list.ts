import { TokenPayload, withAuth } from '@/lib/auth';
import { SDK } from '@/lib/subscription';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse, user:TokenPayload) {
  const list = await SDK.plan.list();
  // Return user info
  return res.status(200).json({
    success: true,
    list,
  });

}

export default withAuth(handler);