import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes
const WARNING_MS = 14 * 60 * 1000; // 14 minutes (show warning 1 min before timeout)

export function SessionTimeout() {
  const { isAuthenticated, logout, lastActivity, updateActivity } = useAuth();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const handleActivity = () => {
      updateActivity();
      setShowWarning(false);
    };

    // Listen for user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('click', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, [isAuthenticated, updateActivity]);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowWarning(false);
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivity;

      if (timeSinceLastActivity >= TIMEOUT_MS) {
        logout();
        setShowWarning(false);
      } else if (timeSinceLastActivity >= WARNING_MS) {
        setShowWarning(true);
      } else {
        setShowWarning(false);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [isAuthenticated, lastActivity, logout]);

  if (!showWarning) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Session Timeout Warning">
      <div className="modal-body auth-modal" style={{ maxWidth: '400px' }}>
        <h3>Session Expiring</h3>
        <p style={{ marginBottom: '24px' }}>
          Your session will expire in less than a minute due to inactivity. Do you want to stay logged in?
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button onClick={logout} className="ghost-action">
            Log Out
          </button>
          <button onClick={updateActivity} className="primary-action">
            Stay Logged In
          </button>
        </div>
      </div>
    </div>
  );
}
