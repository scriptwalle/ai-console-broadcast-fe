import { 
  CHANNEL_STATUSES, 
  STATUS_PROGRESSION, 
  STATUS_CONFIG,
  UPDATE_INTERVALS 
} from './constants.js';

// Get the next possible status for a recipient
export const getNextStatus = (currentStatus, channel) => {
  const progression = STATUS_PROGRESSION[channel];
  const possibleNextStatuses = progression[currentStatus] || [];
  
  if (possibleNextStatuses.length === 0) {
    return null; // Final status
  }
  
  // Randomly select next status (80% chance of success, 20% chance of failure if available)
  const failureStatus = possibleNextStatuses.find(status => 
    status.includes('failed')
  );
  const successStatuses = possibleNextStatuses.filter(status => 
    !status.includes('failed')
  );
  
  if (failureStatus && Math.random() < 0.2) {
    return failureStatus;
  }
  
  if (successStatuses.length > 0) {
    return successStatuses[Math.floor(Math.random() * successStatuses.length)];
  }
  
  return possibleNextStatuses[0];
};

// Check if a status is final (no further progression)
export const isFinalStatus = (status, channel) => {
  const progression = STATUS_PROGRESSION[channel];
  const nextStatuses = progression[status] || [];
  return nextStatuses.length === 0;
};

// Get status configuration for display
export const getStatusConfig = (status) => {
  return STATUS_CONFIG[status] || { 
    label: status, 
    color: 'slate', 
    icon: '❓' 
  };
};

// Get CSS classes for status badge
export const getStatusBadgeClasses = (status) => {
  const config = getStatusConfig(status);
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    emerald: 'bg-emerald-100 text-emerald-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    slate: 'bg-slate-100 text-slate-800'
  };
  
  return colorClasses[config.color] || colorClasses.slate;
};

// Validate if status is valid for channel
export const isValidStatusForChannel = (status, channel) => {
  const validStatuses = CHANNEL_STATUSES[channel];
  return validStatuses.includes(status);
};

// Get all valid statuses for a channel
export const getValidStatusesForChannel = (channel) => {
  return CHANNEL_STATUSES[channel] || [];
};

// Calculate completion percentage for a campaign
export const calculateCompletionPercentage = (recipients, channel) => {
  if (recipients.length === 0) return 0;
  
  const finalStatuses = recipients.filter(recipient => 
    isFinalStatus(recipient.status, channel)
  );
  
  return Math.round((finalStatuses.length / recipients.length) * 100);
};

// Get random update interval
export const getRandomUpdateInterval = () => {
  const { MIN, MAX } = UPDATE_INTERVALS;
  return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
};

// Simulate batch updates for real-time effect
export const getBatchUpdateRecipients = (recipients, batchSize = UPDATE_INTERVALS.BATCH_SIZE) => {
  // Filter recipients that can still be updated (not in final status)
  const updatableRecipients = recipients.filter(recipient => 
    !isFinalStatus(recipient.status, recipient.channel)
  );
  
  // If no updatable recipients, return empty array
  if (updatableRecipients.length === 0) {
    return [];
  }
  
  // Randomly select recipients for batch update
  const shuffled = [...updatableRecipients].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(batchSize, shuffled.length));
};

// Generate status update message for real-time updates
export const getStatusUpdateMessage = (recipientCount, channel) => {
  const messages = [
    `Updating ${recipientCount} ${channel} recipients...`,
    `Processing delivery status for ${recipientCount} messages...`,
    `Received webhook updates for ${recipientCount} ${channel} messages...`,
    `Syncing status updates for ${recipientCount} recipients...`
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
};

// Check if campaign is complete based on recipient statuses
export const isCampaignComplete = (recipients, channel) => {
  return calculateCompletionPercentage(recipients, channel) === 100;
};

// Get campaign health status
export const getCampaignHealth = (recipients, channel) => {
  if (recipients.length === 0) return 'unknown';
  
  const metrics = {};
  recipients.forEach(recipient => {
    metrics[recipient.status] = (metrics[recipient.status] || 0) + 1;
  });
  
  const totalRecipients = recipients.length;
  const failedCount = Object.keys(metrics)
    .filter(status => status.includes('failed'))
    .reduce((sum, status) => sum + metrics[status], 0);
  
  const failureRate = (failedCount / totalRecipients) * 100;
  
  if (failureRate > 20) return 'poor';
  if (failureRate > 10) return 'fair';
  if (failureRate > 5) return 'good';
  return 'excellent';
};
