'use client';

import React from 'react';
import { AuthProvider } from '../../context/AuthContext';
import '../../App.css';

const Home: React.FC = () => {
  return (
    <AuthProvider>
    <div className="App">
        <header className="App-header">
          <p>
            AOO application, create, manage and edit your onboarding projects in one place
          </p>
        </header>
      </div>
    </AuthProvider>
  );
};

export default Home;
