import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from '../FormInput';

export function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setError('');
    // Simulate API call
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-header">
        <h2>Set new password</h2>
        <p>Your new password must be different from previous used passwords.</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <FormInput
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <FormInput
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        {error && <div className="form-error" style={{ color: 'var(--rose)', marginTop: '-8px', marginBottom: '16px' }}>{error}</div>}

        <button type="submit" className="primary-action w-full">
          Reset Password
        </button>
      </form>

      <div className="auth-footer">
        <p><Link to="/login" className="auth-link">← Back to login</Link></p>
      </div>
    </div>
  );
}
