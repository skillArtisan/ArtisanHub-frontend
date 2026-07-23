import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function EmailVerification() {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join('');
    if (verificationCode.length === 6) {
      // Simulate API call
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-header">
        <h2>Verify your email</h2>
        <p>We've sent a 6-digit code to your email address.</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="otp-container">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="otp-input"
            />
          ))}
        </div>

        <button 
          type="submit" 
          className="primary-action w-full"
          disabled={code.some(digit => !digit)}
        >
          Verify
        </button>
      </form>

      <div className="auth-footer">
        <p>Didn't receive the code? <button type="button" className="auth-link button-link">Resend</button></p>
      </div>
    </div>
  );
}
