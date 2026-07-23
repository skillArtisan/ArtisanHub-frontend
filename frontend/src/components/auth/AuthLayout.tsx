import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="auth-layout">
      <div className="auth-sidebar">
        <div className="auth-brand">
          <div className="brand-mark large">
            <span>AH</span>
          </div>
          <h1>ArtisanHub</h1>
          <p>The premium platform for connecting clients with vetted artisans.</p>
        </div>
      </div>
      <div className="auth-content">
        <div className="auth-form-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
