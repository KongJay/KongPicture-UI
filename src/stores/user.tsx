'use client';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { getLoginUserUsingGet } from '@/api/userController';

// 定义用户类型
export interface LoginUserVO {
  userName: string;
  // 可以根据实际API返回添加其他字段
  userId?: number;
  userAccount?: string;
  avatarUrl?: string;
  email?: string;
}

// 定义Context类型
interface UserContextType {
  loginUser: LoginUserVO;
  setLoginUser: (user: LoginUserVO) => void;
  fetchLoginUser: () => Promise<void>;
  isLoading: boolean;
}

// 创建Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider组件Props
interface UserProviderProps {
  children: ReactNode;
}

// Provider组件
export const UserProvider = ({ children }: UserProviderProps) => {
  const [loginUser, setLoginUser] = useState<LoginUserVO>({
    userName: '未登录',
  });
  const [isLoading, setIsLoading] = useState(false);

  // 获取登录用户信息
  const fetchLoginUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getLoginUserUsingGet();
      if (res.data.code === 0 && res.data.data) {
        setLoginUser(res.data.data);
      }
    } catch (error) {
      console.error('获取用户信息失败:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ loginUser, setLoginUser, fetchLoginUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

// 自定义Hook
export const useLoginUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useLoginUser must be used within a UserProvider');
  }
  return context;
};
