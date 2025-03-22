import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://redis:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

// Connect to Redis when the server starts
let connected = false;
async function connectIfNeeded() {
  if (!connected) {
    await redisClient.connect();
    connected = true;
  }
}

// Store verification code with user info
export async function storeVerificationCode(code: string, userInfo: any, expiryInSeconds = 300) {
  await connectIfNeeded();
  await redisClient.set(
    `wechat:verification:${code}`,
    JSON.stringify(userInfo),
    { EX: expiryInSeconds }
  );
}

// Get user info by verification code
export async function getUserInfoByCode(code: string) {
  await connectIfNeeded();
  const data = await redisClient.get(`wechat:verification:${code}`);
  if (!data) return null;
  
  // Delete the code after successful verification
  await redisClient.del(`wechat:verification:${code}`);
  
  return JSON.parse(data);
}

export default redisClient; 