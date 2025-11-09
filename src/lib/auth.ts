import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { WechatUserInfo } from './wechat';

const JWT_SECRET = process.env.JWT_SECRET || 'wxlogin-secret-key';

export interface TokenPayload {
  uniqueId: string;
  source: string;
  iat?: number;
  exp?: number;
}

// Generate JWT token
export function generateToken(uniqueId: string, source?: string): string {
  const info = { uniqueId: uniqueId, source }
  return jwt.sign(
    info,
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Verify JWT token
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

// Middleware to check authentication
export function withAuth(
  handler: (req: NextApiRequest, res: NextApiResponse, user: TokenPayload) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      const user = verifyToken(token);
      if (!user) {
        return res.status(401).json({ error: 'Invalid or expired token' });
      }
      return await handler(req, res, user);
    } catch (error) {
      console.error('Auth error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
} 
