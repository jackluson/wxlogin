import { useEffect } from 'react';
import { useRouter } from 'next/router';

// 与 dashboard.tsx 中保持一致的开发模式标志
const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // 开发模式直接进入仪表盘
    if (DEV_MODE) {
      router.replace('/dashboard');
      return;
    }
    
    const token = localStorage.getItem('auth_token');
    if (token) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-xl">Loading...</div>
    </div>
  );
} 