import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import VerificationCodeInput from '../components/VerificationCodeInput';
import Head from 'next/head';

export default function Login() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    
    if (code.length !== 6) {
      setError('请输入6位验证码');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '验证失败');
      }
      
      // Save token to localStorage
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user_info', JSON.stringify(data.user));
      
      // Redirect to dashboard or callback URL
      const callbackUrl = router.query.callbackUrl as string || '/dashboard';
      router.push(callbackUrl);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <>
      <Head>
        <title>微信公众号登录</title>
        <meta name="description" content="通过微信公众号验证码登录" />
      </Head>
      
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">微信公众号登录</h1>
          
          <div className="mb-6">
            <p className="text-center mb-4">
              1. 扫描下方二维码关注公众号
            </p>
            <div className="flex justify-center">
              <Image 
                src="/images/qrcode.png" 
                width={200} 
                height={200} 
                alt="公众号二维码" 
                className="border rounded"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-center mb-2">
              {/* 2. 点击公众号菜单中的「点击登录」按钮 */}
              2. 向公众号发送一条内容为【验证码】的消息
            </p>
            <p className="text-center text-sm text-gray-600">
              系统将向您发送一条包含6位验证码的消息
            </p>
          </div>
          
          <form onSubmit={handleVerify}>
            <div className="mb-4">
              <label className="block text-center mb-2">
                3. 输入收到的验证码
              </label>
              <VerificationCodeInput 
                length={6} 
                value={code} 
                onChange={setCode} 
              />
            </div>
            
            {error && (
              <div className="mb-4 p-2 bg-red-50 text-red-600 rounded text-center">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-50"
            >
              {isLoading ? '验证中...' : '验证并登录'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
} 