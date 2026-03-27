import React from 'react';

const Tabs = ({
  activeTab,
  onTabChange,
  tabs,
  size = 'md',
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center space-x-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-1
  `.trim();

  const variants = {
    default: '',
    pills: 'space-x-2 bg-transparent p-0',
    underline: 'border-b border-slate-200 dark:border-slate-700 bg-transparent p-0 space-x-0',
  };

  const sizes = {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
  };

  const getTabStyles = (tab, isActive) => {
    const baseTabStyles = `
      px-3 py-1.5 rounded-md font-medium transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-slate-500
      disabled:opacity-50 disabled:cursor-not-allowed
    `.trim();

    if (variant === 'pills') {
      return `
        ${baseTabStyles}
        ${isActive
          ? 'bg-slate-700 text-white dark:bg-slate-600'
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700'
        }
      `.trim();
    }

    if (variant === 'underline') {
      return `
        px-4 py-2 border-b-2 font-medium transition-all duration-200
        focus:outline-none
        ${isActive
          ? 'border-slate-700 text-slate-900 dark:border-slate-300 dark:text-slate-100'
          : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600'
        }
      `.trim();
    }

    // Default variant
    return `
      ${baseTabStyles}
      ${isActive
        ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-600 dark:text-slate-100'
        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-600/50'
      }
    `.trim();
  };

  return (
    <div
      className={`
        ${variant !== 'underline' ? baseStyles : 'inline-flex'}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `.trim()}
      {...props}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        const isDisabled = tab.disabled;

        return (
          <button
            key={tab.value}
            type="button"
            disabled={isDisabled}
            onClick={() => !isDisabled && onTabChange(tab.value)}
            className={getTabStyles(tab, isActive)}
            aria-selected={isActive}
            role="tab"
          >
            {tab.icon && (
              <span className={tab.label ? 'mr-2' : ''}>
                <tab.icon className="w-4 h-4" />
              </span>
            )}
            {tab.label}
            {tab.badge && (
              <span className="ml-2 bg-slate-200 text-slate-700 text-xs px-1.5 py-0.5 rounded-full dark:bg-slate-500 dark:text-slate-200">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

// Tab panels wrapper
export const TabPanels = ({ activeTab, children, className = '' }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

// Individual tab panel
export const TabPanel = ({ value, activeTab, children, className = '' }) => {
  if (activeTab !== value) return null;

  return (
    <div className={className} role="tabpanel">
      {children}
    </div>
  );
};

export default Tabs;