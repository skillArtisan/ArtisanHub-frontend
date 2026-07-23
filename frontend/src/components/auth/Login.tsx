import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FormInput } from '../FormInput';

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API.
    // For now, we perform a dummy login.
    handleDummyLogin();
  };

  const handleDummyLogin = () => {
    login({
      id: '123',
      name: 'John Doe',
      email: email || 'user@example.com',
      role: 'client'
    });
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-header">
        <h2>Welcome back</h2>
        <p>Enter your details to access your account.</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <FormInput
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
        
        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <div className="auth-actions-row">
          <label className="checkbox-label">
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
          <Link to="/forgot-password" className="auth-link">
            Forgot password?
          </Link>
        </div>

        <button type="submit" className="primary-action w-full">
          Log In
        </button>
        
        <button 
          type="button" 
          onClick={handleDummyLogin} 
          className="ghost-action w-full"
          style={{ marginTop: '12px' }}
        >
          Dummy Login (Bypass)
        </button>
      </form>

      <div className="auth-footer">
        <p>Don't have an account? <Link to="/register" className="auth-link">Sign up</Link></p>
      </div>
    </div>
  );
}
