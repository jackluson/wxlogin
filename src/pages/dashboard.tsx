import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

type UserInfo = {
  openid: string;
  nickname?: string;
  headimgurl?: string;
};

type Donation = {
  name: string;
  amount: number;
  date: string;
};

// 开发模式标志，设置为 true 可以跳过登录验证
const DEV_MODE = true;

export default function Dashboard() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [paymentType, setPaymentType] = useState<'wechat' | 'alipay'>('wechat');
  const router = useRouter();
  
  // Mock donation data
  const donations: Donation[] = [
    { name: '李**', amount: 10, date: '2025-3-22' },
    { name: '随**', amount: 5, date: '2025-3-21' },
    { name: '肖**', amount: 66, date: '2025-3-21' },
  ];
  
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('auth_token');
    const userInfo = localStorage.getItem('user_info');
    
    // 开发模式下，使用模拟数据
    if (DEV_MODE) {
      setUser({
        openid: 'dev_openid_12345',
        nickname: '开发测试用户',
        // 不设置 headimgurl，使用默认头像显示
      });
      return;
    }
    
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
    if (DEV_MODE) {
      alert('开发模式：退出登录功能已禁用');
      return;
    }
    
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
              退出登录 {DEV_MODE && '(开发模式)'}
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
          
          {/* 打赏功能 */}
          <div className="mt-6 p-6 border border-red-200 rounded-lg">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">来都来了，支持一下呗！</h3>
              <p className="text-gray-600 mb-4">小额打赏，大爱无疆！</p>
              
              <div className="flex justify-center space-x-4 mb-4">
                <button 
                  onClick={() => setPaymentType('wechat')}
                  className={`px-4 py-2 rounded-md ${paymentType === 'wechat' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                >
                  微信支付
                </button>
                <button 
                  onClick={() => setPaymentType('alipay')}
                  className={`px-4 py-2 rounded-md ${paymentType === 'alipay' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  支付宝
                </button>
              </div>
              
              <div className="flex justify-center">
                {paymentType === 'wechat' ? (
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto bg-gray-100 flex items-center justify-center mb-2 border">
                      <Image 
                        src="/images/wechat-qr.png" 
                        width={180} 
                        height={180} 
                        alt="微信支付"
                        className="rounded-md"
                      />
                    </div>
                    <p className="text-sm text-gray-600">请使用微信扫描二维码打赏</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto bg-gray-100 flex items-center justify-center mb-2 border">
                      <Image 
                        src="/images/alipay-qr.png" 
                        width={180} 
                        height={180} 
                        alt="支付宝" 
                        className="rounded-md"
                      />
                    </div>
                    <p className="text-sm text-gray-600">请使用支付宝扫描二维码打赏</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* 打赏记录列表 */}
            <div className="mt-8">
              <h4 className="font-medium text-gray-700 mb-3 border-b pb-2">感谢这些朋友的支持</h4>
              <div className="space-y-2">
                {donations.map((donation, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                        {donation.name.charAt(0)}
                      </span>
                      <span>{donation.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-red-500 font-medium">¥{donation.amount}</span>
                      <span className="text-gray-400 text-xs ml-2">{donation.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 