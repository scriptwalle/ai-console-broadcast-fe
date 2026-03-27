import React from 'react';

const Button = ({
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  children,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center font-medium rounded-xl
    transition-all duration-200 focus:outline-none focus:ring-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `.trim();

  const variants = {
    primary: `
      bg-slate-700 text-white hover:bg-slate-800
      focus:ring-slate-500 active:bg-slate-900
      dark:bg-slate-600 dark:hover:bg-slate-700
    `.trim(),
    secondary: `
      bg-slate-100 text-slate-700 hover:bg-slate-200
      focus:ring-slate-300 active:bg-slate-300
      dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600
    `.trim(),
    outline: `
      border border-slate-300 text-slate-700 hover:bg-slate-50
      focus:ring-slate-300 active:bg-slate-100
      dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700
    `.trim(),
    danger: `
      bg-red-600 text-white hover:bg-red-700
      focus:ring-red-500 active:bg-red-800
    `.trim(),
    ghost: `
      text-slate-600 hover:text-slate-900 hover:bg-slate-100
      focus:ring-slate-300
      dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700
    `.trim(),
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    icon: 'p-2',
  };

  const loadingSpinner = (
    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
  );

  const iconElement = Icon && !loading && <Icon className="w-4 h-4" />;
  const showSpinner = loading && loadingSpinner;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}
      `.trim()}
      {...props}
    >
      {/* Icon or spinner on left */}
      {iconPosition === 'left' && (showSpinner || iconElement) && (
        <span className={children ? 'mr-2' : ''}>
          {showSpinner || iconElement}
        </span>
      )}

      {children}

      {/* Icon on right */}
      {iconPosition === 'right' && iconElement && !loading && (
        <span className={children ? 'ml-2' : ''}>
          {iconElement}
        </span>
      )}
    </button>
  );
};

export default Button;