import React from 'react';
import { APPROVAL_STATUS } from '../utils/constants.js';

export const getStatusBadge = (status) => {
  const statusConfig = {
    [APPROVAL_STATUS.PENDING]: { color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300', label: 'Pending' },
    [APPROVAL_STATUS.APPROVED]: { color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300', label: 'Approved' },
    [APPROVAL_STATUS.REJECTED]: { color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300', label: 'Rejected' }
  };

  const config = statusConfig[status];
  if (!config) return null;

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};

export default getStatusBadge;
