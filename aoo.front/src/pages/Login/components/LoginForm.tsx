import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { UpdateToken } from '../../../services/UpdateToken';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [user_name, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login, loading, user } = useAuth();
  const [sessionToken, setSessionToken] = useState<string>('');

  useEffect(() => {
    if (sessionToken) {
      Cookies.set('jwt_token', sessionToken);
      login(sessionToken);
      UpdateToken();
      navigate('/');
    }
  }, [sessionToken,login,navigate]);

  useEffect(() => {
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading,navigate]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://byobsb.azurewebsites.net/api/Login`, {
        user_name,
        password,
      });
      setSessionToken(response.data.access_token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        value={user_name}
        placeholder="User"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <br />
      <a href="/forgot-password">Forgot your password?</a>
    </form>
  );
};

export default LoginForm;
