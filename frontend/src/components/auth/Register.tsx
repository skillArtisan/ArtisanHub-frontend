import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FormInput } from '../FormInput';
import { FormSelect } from '../FormSelect';

export function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to register, then navigate to email verification.
    // For now, we'll just log them in directly as a dummy flow.
    login({
      id: Math.random().toString(36).substring(7),
      name: formData.name,
      email: formData.email,
      role: formData.role as 'client' | 'artisan'
    });
    navigate('/');
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-header">
        <h2>Create an account</h2>
        <p>Join ArtisanHub to connect with professionals.</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <FormInput
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Jane Doe"
          required
        />

        <FormInput
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />

        <FormSelect
          label="I am joining as a"
          name="role"
          value={formData.role}
          onChange={handleChange}
          options={[
            { value: 'client', label: 'Client (Looking for services)' },
            { value: 'artisan', label: 'Artisan (Offering services)' }
          ]}
          required
        />

        <button type="submit" className="primary-action w-full">
          Create Account
        </button>
      </form>

      <div className="auth-footer">
        <p>Already have an account? <Link to="/login" className="auth-link">Log in</Link></p>
      </div>
    </div>
  );
}
