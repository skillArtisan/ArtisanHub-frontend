import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormTextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
  register: any;
  required?: boolean;
  helperText?: string;
  rows?: number;
  disabled?: boolean;
}

export function FormTextarea({
  label,
  name,
  placeholder,
  error,
  register,
  required = false,
  helperText,
  rows = 4,
  disabled = false
}: FormTextareaProps) {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="block text-sm font-bold text-gray-900 mb-2">
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <textarea
        id={name}
        className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-0 transition font-sans ${
          error
            ? 'border-red-600 bg-red-50 focus:border-red-700'
            : 'border-gray-300 bg-white focus:border-blue-600'
        } ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        {...register}
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
