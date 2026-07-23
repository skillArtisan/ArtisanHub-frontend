import React, { SelectHTMLAttributes } from 'react';

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
    <div className="form-field">
      <label htmlFor={name || rest.id} className="form-label">
        {label}
        {required && <span className="required-mark">*</span>}
      </label>
      <select
        id={name || rest.id}
        name={name}
        className={`form-select ${error ? 'error' : ''}`}
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
      {helperText && !error && <p className="form-helper">{helperText}</p>}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
