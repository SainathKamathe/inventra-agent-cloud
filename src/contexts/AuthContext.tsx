import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockUser, User } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (data: Partial<User> & { password: string }) => boolean;
  verifyOtp: (otp: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [pendingUser, setPendingUser] = useState<User | null>(null);

  const login = (email: string, _password: string) => {
    if (email) {
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const register = (data: Partial<User> & { password: string }) => {
    const newUser: User = {
      id: 'u_new',
      name: data.name || '',
      shopName: data.shopName || '',
      mobile: data.mobile || '',
      email: data.email || '',
      city: 'Mumbai',
      area: 'Andheri West',
    };
    setPendingUser(newUser);
    return true;
  };

  const verifyOtp = (otp: string) => {
    if (otp === '123456' && pendingUser) {
      setUser(pendingUser);
      setPendingUser(null);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return React.createElement(AuthContext.Provider, {
    value: { user, isAuthenticated: !!user, login, register, verifyOtp, logout },
    children,
  });
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be within AuthProvider');
  return ctx;
}
