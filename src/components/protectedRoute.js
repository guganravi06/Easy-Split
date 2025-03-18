import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// This is a wrapper component for routes that should only be accessible to authenticated users
const ProtectedRoute = () => {
  const { user } = useAuth();

  // Redirect to sign in if not authenticated
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Render the protected route
  return <Outlet />;
};

export default ProtectedRoute;