import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormInput } from '../FormInput';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setIsSubmitted(true), 1000);
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-header">
        <h2>Reset password</h2>
        <p>Enter your email address and we'll send you a link to reset your password.</p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="auth-form">
          <FormInput
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />

          <button type="submit" className="primary-action w-full">
            Send Reset Link
          </button>
        </form>
      ) : (
        <div className="auth-success-message">
          <div className="success-icon">✓</div>
          <h3>Check your email</h3>
          <p>We sent a password reset link to <strong>{email}</strong></p>
          <button 
            onClick={() => setIsSubmitted(false)} 
            className="ghost-action w-full"
            style={{ marginTop: '24px' }}
          >
            Try another email
          </button>
        </div>
      )}

      <div className="auth-footer">
        <p><Link to="/login" className="auth-link">← Back to login</Link></p>
      </div>
    </div>
  );
}
