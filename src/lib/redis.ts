import { createClient } from 'redis';

console.log("process.env.REDIS_URL", process.env.REDIS_URL);
const redis_url = process.env.REDIS_URL;
const redisClient = createClient({
  url: redis_url || 'redis://redis:6379'
});

// redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connected', (res) => console.log('connected:', res));
// Connect to Redis when the server starts
let connected = false;
async function connectIfNeeded() {
  if (!connected) {
    await redisClient.connect();
    console.log('Connected to Redis');
    connected = true;
  }
}
// connectIfNeeded().then((res) => {console.log('Redis client connected', res)})


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