import React from 'react';

const Badge = ({
  children,
  variant = 'default',
  size = 'sm',
  icon: Icon,
  className = '',
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center font-medium rounded-full
    whitespace-nowrap
  `.trim();

  const variants = {
    default: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
    primary: 'bg-slate-700 text-white dark:bg-slate-600',
    secondary: 'bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  };

  const sizes = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={`
        ${baseStyles}
        ${variants[variant] || variants.default}
        ${sizes[size] || sizes.sm}
        ${className}
      `.trim()}
      {...props}
    >
      {Icon && (
        <Icon className={`
          ${children ? 'mr-1' : ''}
          ${size === 'xs' ? 'w-3 h-3' : 'w-3.5 h-3.5'}
        `.trim()} />
      )}
      {children}
    </span>
  );
};

// Status-specific badges with predefined colors
export const StatusBadge = ({ status, ...props }) => {
  const statusConfig = {
    // Campaign statuses
    scheduled: { variant: 'info', text: 'Scheduled' },
    running: { variant: 'warning', text: 'Running' },
    completed: { variant: 'success', text: 'Completed' },
    failed: { variant: 'danger', text: 'Failed' },
    paused: { variant: 'secondary', text: 'Paused' },

    // Template statuses
    draft: { variant: 'secondary', text: 'Draft' },
    pending: { variant: 'warning', text: 'Pending' },
    approved: { variant: 'success', text: 'Approved' },
    rejected: { variant: 'danger', text: 'Rejected' },
    active: { variant: 'success', text: 'Active' },
    inactive: { variant: 'secondary', text: 'Inactive' },

    // Delivery statuses
    sent: { variant: 'primary', text: 'Sent' },
    delivered: { variant: 'success', text: 'Delivered' },
    read: { variant: 'info', text: 'Read' },
    opened: { variant: 'info', text: 'Opened' },
    partial: { variant: 'warning', text: 'Partial' },
  };

  const config = statusConfig[status?.toLowerCase()] || { variant: 'default', text: status };

  return (
    <Badge variant={config.variant} {...props}>
      {config.text}
    </Badge>
  );
};

// Channel-specific badges
export const ChannelBadge = ({ channel, ...props }) => {
  const channelConfig = {
    whatsapp: { variant: 'success', text: 'WhatsApp', icon: '📱' },
    sms: { variant: 'info', text: 'SMS', icon: '💬' },
    email: { variant: 'primary', text: 'Email', icon: '📧' },
  };

  const config = channelConfig[channel?.toLowerCase()] || { variant: 'default', text: channel };

  return (
    <Badge variant={config.variant} {...props}>
      <span className="mr-1">{config.icon}</span>
      {config.text}
    </Badge>
  );
};

export default Badge;