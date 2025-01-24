import React, { createContext, useContext, useState, useEffect, ReactNode,useCallback } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { getJWTTokenObject } from '../utils/getJWTTokenObject';
import { UpdateToken } from '../services/UpdateToken';

interface AuthContextType {
  user: { token: string } | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ token: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('jwt_token');
    const currentTime = Math.floor(Date.now() / 1000);
    const payload = getJWTTokenObject();

    if (typeof payload !== 'string' && currentTime > payload.exp) {
      Cookies.remove('jwt_token');
      navigate('/login');
    } else {
      setUser(token ? { token } : null);
      setLoading(false);
    }
  }, [navigate]);

  const login = useCallback((token: string) => {
    setUser({ token });
    UpdateToken();
  }, []);

  const logout = () => {
    setUser(null);
    Cookies.remove('jwt_token');
    localStorage.removeItem('basicData');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
