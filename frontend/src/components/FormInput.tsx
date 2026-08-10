import React, { InputHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';

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
    <div className="mb-5">
      <label htmlFor={name || rest.id} className="block text-sm font-bold text-gray-900 mb-2">
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <input
        id={name || rest.id}
        name={name}
        type={type}
        className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-0 transition ${
          error
            ? 'border-red-600 bg-red-50 focus:border-red-700'
            : 'border-gray-300 bg-white focus:border-blue-600'
        } ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        {...register}
        {...rest}
      />
      {helperText && !error && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
      {error && (
        <div className="flex items-center gap-1 mt-1 text-red-600 text-xs font-medium">
          <AlertCircle size={14} />
          {error}
        </div>
      )}
    </div>
  );
}
