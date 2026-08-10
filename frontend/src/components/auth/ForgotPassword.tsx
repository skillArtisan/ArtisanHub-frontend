import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setIsSubmitted(true), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl">AH</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset password</h1>
          <p className="text-gray-600">Enter your email address and we'll send you a link</p>
        </div>

        {/* Form Card */}
        {!isSubmitted ? (
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8 mb-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-0 transition"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-bold hover:from-blue-700 hover:to-blue-600 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Send Reset Link
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8 mb-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl mb-4 mx-auto">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
            <p className="text-gray-600 mb-6">We sent a password reset link to <strong className="text-gray-900">{email}</strong></p>
            <button 
              onClick={() => setIsSubmitted(false)} 
              className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition"
            >
              Try another email
            </button>
          </div>
        )}

        {/* Back to Login Link */}
        <div className="text-center">
          <Link to="/login" className="text-blue-600 font-bold hover:text-blue-700 flex items-center justify-center gap-1">
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
