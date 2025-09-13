import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
const AuthWrapper = () => {
  const {
    isLoaded,
    isSignedIn
  } = useAuth();
  if (!isLoaded) {
    return <div className="flex items-center justify-center w-full h-screen bg-gray-50">
        <div className="animate-bounce">
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>;
  }
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }
  return <Outlet />;
};
export default AuthWrapper;