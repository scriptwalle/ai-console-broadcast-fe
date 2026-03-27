import React from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';

const Select = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder = 'Select an option...',
  error,
  helperText,
  icon: Icon,
  disabled = false,
  required = false,
  className = '',
  selectClassName = '',
  ...props
}) => {
  const hasError = Boolean(error);
  const errorMessage = Array.isArray(error) ? error[0] : error;

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

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
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`
            w-full px-3 py-2 pr-10 border rounded-xl appearance-none
            focus:outline-none focus:ring-2 focus:ring-slate-500
            dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200
            ${hasError
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-300 dark:border-slate-600'
            }
            ${selectClassName}
          `.trim()}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => {
            // Support both simple arrays and object arrays
            const optionValue = typeof option === 'object' ? option.value : option;
            const optionLabel = typeof option === 'object' ? option.label : option;
            const optionDisabled = typeof option === 'object' ? option.disabled : false;

            return (
              <option
                key={optionValue}
                value={optionValue}
                disabled={optionDisabled}
              >
                {optionLabel}
              </option>
            );
          })}
        </select>

        {/* Dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
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

export default Select;