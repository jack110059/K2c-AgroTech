import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (phone: string, otp: string, role: User['role']) => Promise<boolean>;
  loginWithEmail: (email: string, password: string, role: User['role']) => Promise<boolean>;
  register: (userData: Partial<User> & { phone: string; role: User['role'] }) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user data
    const savedUser = localStorage.getItem('k2c_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (phone: string, otp: string, role: User['role']): Promise<boolean> => {
    try {
      // Mock login validation
      if (otp === '1234') {
        const mockUser: User = {
          id: `${role}_${Date.now()}`,
          name: role === 'farmer' ? 'Ravi Kumar' : role === 'customer' ? 'Priya Sharma' : 'Amit Retail',
          phone,
          role,
          village: role === 'farmer' ? 'Krishnagiri' : undefined,
          district: role === 'farmer' ? 'Tamil Nadu' : undefined,
          membershipId: role === 'farmer' ? 'K2C001234' : undefined,
        };
        setUser(mockUser);
        localStorage.setItem('k2c_user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const loginWithEmail = async (email: string, password: string, role: User['role']): Promise<boolean> => {
    try {
      // Mock email login
      if (password === 'password') {
        const mockUser: User = {
          id: `${role}_${Date.now()}`,
          name: role === 'farmer' ? 'Ravi Kumar' : role === 'customer' ? 'Priya Sharma' : 'Amit Retail',
          email,
          phone: '9876543210',
          role,
          village: role === 'farmer' ? 'Krishnagiri' : undefined,
          district: role === 'farmer' ? 'Tamil Nadu' : undefined,
          membershipId: role === 'farmer' ? 'K2C001234' : undefined,
        };
        setUser(mockUser);
        localStorage.setItem('k2c_user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const register = async (userData: Partial<User> & { phone: string; role: User['role'] }): Promise<boolean> => {
    try {
      const newUser: User = {
        id: `${userData.role}_${Date.now()}`,
        name: userData.name || '',
        phone: userData.phone,
        email: userData.email,
        role: userData.role,
        village: userData.village,
        district: userData.district,
        membershipId: userData.role === 'farmer' ? `K2C${Math.random().toString().substr(2, 6)}` : undefined,
      };
      setUser(newUser);
      localStorage.setItem('k2c_user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('k2c_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithEmail, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};