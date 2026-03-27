import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import Button from '../buttons/Button';

const Alert = ({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  className = '',
  ...props
}) => {
  const variants = {
    info: {
      containerClass: 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800',
      iconClass: 'text-blue-400',
      titleClass: 'text-blue-800 dark:text-blue-200',
      textClass: 'text-blue-700 dark:text-blue-300',
      icon: Info,
    },
    success: {
      containerClass: 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800',
      iconClass: 'text-green-400',
      titleClass: 'text-green-800 dark:text-green-200',
      textClass: 'text-green-700 dark:text-green-300',
      icon: CheckCircle,
    },
    warning: {
      containerClass: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800',
      iconClass: 'text-yellow-400',
      titleClass: 'text-yellow-800 dark:text-yellow-200',
      textClass: 'text-yellow-700 dark:text-yellow-300',
      icon: AlertTriangle,
    },
    error: {
      containerClass: 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800',
      iconClass: 'text-red-400',
      titleClass: 'text-red-800 dark:text-red-200',
      textClass: 'text-red-700 dark:text-red-300',
      icon: AlertCircle,
    },
  };

  const config = variants[variant] || variants.info;
  const IconComponent = config.icon;

  return (
    <div
      className={`
        relative rounded-xl border p-4
        ${config.containerClass}
        ${className}
      `.trim()}
      {...props}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <IconComponent className={`w-5 h-5 ${config.iconClass}`} />
        </div>

        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${config.titleClass}`}>
              {title}
            </h3>
          )}

          <div className={`${title ? 'mt-2' : ''} text-sm ${config.textClass}`}>
            {children}
          </div>
        </div>

        {dismissible && onDismiss && (
          <div className="ml-auto pl-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onDismiss}
              className={`${config.iconClass} hover:bg-black/5`}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Convenience components
export const ErrorAlert = (props) => <Alert variant="error" {...props} />;
export const SuccessAlert = (props) => <Alert variant="success" {...props} />;
export const WarningAlert = (props) => <Alert variant="warning" {...props} />;
export const InfoAlert = (props) => <Alert variant="info" {...props} />;

export default Alert;