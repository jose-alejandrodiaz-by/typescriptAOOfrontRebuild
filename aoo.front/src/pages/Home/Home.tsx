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
            <a href="https://app.powerbi.com/groups/me/reports/80475581-8836-49b0-8c1c-b2b8bbe5ccca/39f904f7cd631509e604?experience=power-bi" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', width: '50%' }}>
              <img src="/AOOPBI.png" alt="Power BI Report" style={{ width: '100%' }} />
            </a>
        </header>
      </div>
    </AuthProvider>
  );
};

export default Home;
