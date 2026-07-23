import React, { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name?: string;
  error?: string;
  register?: any;
  helperText?: string;
}

export function FormInput({
  label,
  name,
  type = 'text',
  placeholder,
  error,
  register,
  required = false,
  helperText,
  disabled = false,
  ...rest
}: FormInputProps) {
  return (
    <div className="form-field">
      <label htmlFor={name || rest.id} className="form-label">
        {label}
        {required && <span className="required-mark">*</span>}
      </label>
      <input
        id={name || rest.id}
        name={name}
        type={type}
        className={`form-input ${error ? 'error' : ''}`}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        {...register}
        {...rest}
      />
      {helperText && !error && <p className="form-helper-text">{helperText}</p>}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
