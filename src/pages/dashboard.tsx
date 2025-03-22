import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

type UserInfo = {
  openid: string;
  nickname?: string;
  headimgurl?: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('auth_token');
    const userInfo = localStorage.getItem('user_info');
    
    if (!token || !userInfo) {
      router.replace('/login');
      return;
    }
    
    try {
      setUser(JSON.parse(userInfo));
    } catch (err) {
      console.error('Error parsing user info:', err);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_info');
      router.replace('/login');
    }
  }, [router]);
  
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    router.push('/login');
  };
  
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>Dashboard | 微信登录</title>
      </Head>
      
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">欢迎使用</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              退出登录
            </button>
          </div>
          
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            {user.headimgurl ? (
              <Image
                src={user.headimgurl}
                width={80}
                height={80}
                alt="用户头像"
                className="rounded-full"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
            )}
            
            <div className="ml-4">
              <h2 className="text-xl font-semibold">
                {user.nickname || '微信用户'}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                OpenID: {user.openid ? user.openid.substring(0, 8) + '...' : 'N/A'}
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <p className="font-medium text-green-700">
              🎉 您已成功通过微信公众号登录!
            </p>
          </div>
        </div>
      </div>
    </>
  );
} 