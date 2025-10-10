
import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import type { User, AuthProviderType } from '../types';
import * as api from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (provider: AuthProviderType, data: any) => Promise<void>;
  logout: () => Promise<void>;
  mintDeafPass: () => Promise<{ success: boolean; message: string; txHash?: string }>;
  submitIdea: (idea: string) => Promise<{ success: boolean; message: string; ideaId?: string }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const verifyToken = useCallback(async () => {
    setLoading(true);
    try {
      const userData = await api.getMe();
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    } catch (e) {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async (provider: AuthProviderType, data: any) => {
    setLoading(true);
    setError(null);
    try {
      await api.login(provider, data);
      const userData = await api.getMe();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await api.revokeSession();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err: any) {
      setError(err.message || 'Logout failed.');
    } finally {
      setLoading(false);
    }
  }, []);
  
  const mintDeafPass = useCallback(async () => {
    if (!isAuthenticated) throw new Error("Not authenticated");
    setLoading(true);
    try {
        const result = await api.mintDeafPass();
        return { success: true, ...result };
    } catch (e: any) {
        return { success: false, message: e.message };
    } finally {
        setLoading(false);
    }
  }, [isAuthenticated]);

  const submitIdea = useCallback(async (idea: string) => {
    if (!isAuthenticated) throw new Error("Not authenticated");
    setLoading(true);
    try {
        const result = await api.submitIdea(idea);
        return { success: true, ...result };
    } catch (e: any) {
        return { success: false, message: e.message };
    } finally {
        setLoading(false);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, error, login, logout, mintDeafPass, submitIdea }}>
      {children}
    </AuthContext.Provider>
  );
};
