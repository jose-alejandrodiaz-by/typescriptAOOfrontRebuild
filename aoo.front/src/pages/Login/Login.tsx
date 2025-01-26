'use client';

import React from 'react';
import LoginForm from './components/LoginForm';
import { AuthProvider } from '../../context/AuthContext';
import './Login.css';

const Login: React.FC = () => {
  return (
    <AuthProvider>
    <div className='App-center-container'>
      <div className="loginForm">
        <h1>Welcome to Scrum Builder</h1>
        <h2>Please log in to access</h2>
        <br />
        <LoginForm />
      </div>
    </div>
    </AuthProvider>
  );
};

export default Login;
