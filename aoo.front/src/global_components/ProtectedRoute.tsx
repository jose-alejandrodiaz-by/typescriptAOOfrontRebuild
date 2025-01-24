import React, { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Display a loading spinner or other loading indicator while authentication is in progress
  if (loading) {
    return <p>Loading...</p>;
  }

  // If user is authenticated, render children, otherwise render null
  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
