import React, { SelectHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';

type OptionType = string | { value: string; label: string };

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name?: string;
  options: readonly OptionType[];
  error?: string;
  register?: any;
  helperText?: string;
  placeholder?: string;
}

export function FormSelect({
  label,
  name,
  options,
  placeholder = 'Select an option',
  error,
  register,
  required = false,
  helperText,
  disabled = false,
  ...rest
}: FormSelectProps) {
  return (
    <div className="mb-5">
      <label htmlFor={name || rest.id} className="block text-sm font-bold text-gray-900 mb-2">
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <select
        id={name || rest.id}
        name={name}
        className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-0 transition appearance-none cursor-pointer ${
          error
            ? 'border-red-600 bg-red-50 focus:border-red-700'
            : 'border-gray-300 bg-white focus:border-blue-600'
        } ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
        disabled={disabled}
        required={required}
        {...register}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => {
          const value = typeof option === 'string' ? option : option.value;
          const displayLabel = typeof option === 'string' ? option : option.label;
          return (
            <option key={value} value={value}>
              {displayLabel}
            </option>
          );
        })}
      </select>
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
