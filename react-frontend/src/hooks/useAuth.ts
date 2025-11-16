import React, { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import { apiCoupons } from '../api/coupons';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      // In a real application, you would verify the token with the backend
      // For now, we'll just set a mock user
      const mockUser: User = {
        id: '1',
        username: 'user',
        email: 'user@example.com',
        role: 'user'
      };
      setUser(mockUser);
    }
  }, []);

  const login = async (username: string) => {
    try {
      // Call the Windows authentication API
      const response = await apiCoupons.windowsAuth(username);
      
      // Store the token in localStorage
      localStorage.setItem('authToken', response.token);
      
      // Set the user
      const mockUser: User = {
        id: response.user.id,
        username: response.user.username,
        email: response.user.email,
        role: response.user.role
      };
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return React.createElement(
    AuthContext.Provider,
    { value: { user, login, logout } },
    children
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};