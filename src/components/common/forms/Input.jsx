import React from 'react';
import { AlertCircle } from 'lucide-react';

const Input = ({
  type = 'text',
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  helperText,
  icon: Icon,
  disabled = false,
  required = false,
  maxLength,
  className = '',
  inputClassName = '',
  ...props
}) => {
  const hasError = Boolean(error);
  const errorMessage = Array.isArray(error) ? error[0] : error;

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {Icon && <Icon className="w-4 h-4 mr-1" />}
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          autoComplete="off"
          className={`
            w-full px-3 py-2 border rounded-xl
            focus:outline-none focus:ring-2 focus:ring-slate-500
            dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200
            ${hasError
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-300 dark:border-slate-600'
            }
            ${inputClassName}
          `.trim()}
          {...props}
        />
      </div>

      {hasError && (
        <div className="flex items-start space-x-1 text-sm text-red-600 dark:text-red-400">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {helperText && !hasError && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;