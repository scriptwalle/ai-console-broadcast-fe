import React from 'react';
import { getStatusConfig, getStatusBadgeClasses } from '../utils/statusUtils.js';

const StatusBadge = ({ status, showIcon = true, className = '' }) => {
  const config = getStatusConfig(status);
  const badgeClasses = getStatusBadgeClasses(status);
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badgeClasses} ${className}`}>
      {showIcon && <span className="mr-1">{config.icon}</span>}
      {config.label}
    </span>
  );
};

export default StatusBadge;
