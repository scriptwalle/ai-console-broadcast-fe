export const CAMPAIGN_CHANNELS = {
  WHATSAPP: 'whatsapp',
  SMS: 'sms',
  EMAIL: 'email'
};

export const CAMPAIGN_STATUS = {
  COMPLETED: 'completed',
  PARTIAL: 'partial',
  RUNNING: 'running',
  SCHEDULED: 'scheduled'
};

export const DELIVERY_STATUS = {
  // WhatsApp statuses
  WHATSAPP_SENT: 'sent',
  WHATSAPP_DELIVERED: 'delivered', 
  WHATSAPP_READ: 'read',
  WHATSAPP_FAILED: 'failed',
  
  // SMS statuses
  SMS_SENT: 'sent',
  SMS_DELIVERED: 'delivered',
  SMS_FAILED: 'failed',
  
  // Email statuses
  EMAIL_DELIVERED: 'delivered',
  EMAIL_OPENED: 'opened',
  EMAIL_FAILED: 'failed'
};

// Channel-specific status mapping
export const CHANNEL_STATUSES = {
  [CAMPAIGN_CHANNELS.WHATSAPP]: [
    DELIVERY_STATUS.WHATSAPP_SENT,
    DELIVERY_STATUS.WHATSAPP_DELIVERED,
    DELIVERY_STATUS.WHATSAPP_READ,
    DELIVERY_STATUS.WHATSAPP_FAILED
  ],
  [CAMPAIGN_CHANNELS.SMS]: [
    DELIVERY_STATUS.SMS_SENT,
    DELIVERY_STATUS.SMS_DELIVERED,
    DELIVERY_STATUS.SMS_FAILED
  ],
  [CAMPAIGN_CHANNELS.EMAIL]: [
    DELIVERY_STATUS.EMAIL_DELIVERED,
    DELIVERY_STATUS.EMAIL_OPENED,
    DELIVERY_STATUS.EMAIL_FAILED
  ]
};

// Status progression logic for each channel
export const STATUS_PROGRESSION = {
  [CAMPAIGN_CHANNELS.WHATSAPP]: {
    [DELIVERY_STATUS.WHATSAPP_SENT]: [DELIVERY_STATUS.WHATSAPP_DELIVERED, DELIVERY_STATUS.WHATSAPP_FAILED],
    [DELIVERY_STATUS.WHATSAPP_DELIVERED]: [DELIVERY_STATUS.WHATSAPP_READ],
    [DELIVERY_STATUS.WHATSAPP_READ]: [], // Final status
    [DELIVERY_STATUS.WHATSAPP_FAILED]: [] // Final status
  },
  [CAMPAIGN_CHANNELS.SMS]: {
    [DELIVERY_STATUS.SMS_SENT]: [DELIVERY_STATUS.SMS_DELIVERED, DELIVERY_STATUS.SMS_FAILED],
    [DELIVERY_STATUS.SMS_DELIVERED]: [], // Final status
    [DELIVERY_STATUS.SMS_FAILED]: [] // Final status
  },
  [CAMPAIGN_CHANNELS.EMAIL]: {
    [DELIVERY_STATUS.EMAIL_DELIVERED]: [DELIVERY_STATUS.EMAIL_OPENED, DELIVERY_STATUS.EMAIL_FAILED],
    [DELIVERY_STATUS.EMAIL_OPENED]: [], // Final status
    [DELIVERY_STATUS.EMAIL_FAILED]: [] // Final status
  }
};

// Status display configuration
export const STATUS_CONFIG = {
  [DELIVERY_STATUS.WHATSAPP_SENT]: { label: 'Sent', color: 'blue', icon: '📤' },
  [DELIVERY_STATUS.WHATSAPP_DELIVERED]: { label: 'Delivered', color: 'green', icon: '✅' },
  [DELIVERY_STATUS.WHATSAPP_READ]: { label: 'Read', color: 'emerald', icon: '👁️' },
  [DELIVERY_STATUS.WHATSAPP_FAILED]: { label: 'Failed', color: 'red', icon: '❌' },
  
  [DELIVERY_STATUS.SMS_SENT]: { label: 'Sent', color: 'blue', icon: '📤' },
  [DELIVERY_STATUS.SMS_DELIVERED]: { label: 'Delivered', color: 'green', icon: '✅' },
  [DELIVERY_STATUS.SMS_FAILED]: { label: 'Failed', color: 'red', icon: '❌' },
  
  [DELIVERY_STATUS.EMAIL_DELIVERED]: { label: 'Delivered', color: 'green', icon: '✅' },
  [DELIVERY_STATUS.EMAIL_OPENED]: { label: 'Opened', color: 'emerald', icon: '👁️' },
  [DELIVERY_STATUS.EMAIL_FAILED]: { label: 'Failed', color: 'red', icon: '❌' }
};

// Campaign status configuration
export const CAMPAIGN_STATUS_CONFIG = {
  [CAMPAIGN_STATUS.COMPLETED]: { label: 'Completed', color: 'green' },
  [CAMPAIGN_STATUS.PARTIAL]: { label: 'Partial', color: 'yellow' },
  [CAMPAIGN_STATUS.RUNNING]: { label: 'Running', color: 'blue' },
  [CAMPAIGN_STATUS.SCHEDULED]: { label: 'Scheduled', color: 'slate' }
};

// Real-time update intervals (in milliseconds)
export const UPDATE_INTERVALS = {
  MIN: 2000,  // 2 seconds
  MAX: 10000, // 10 seconds
  BATCH_SIZE: 5 // Number of recipients to update per batch
};

// Metrics calculation constants
export const METRICS = {
  TOTAL_RECIPIENTS: 'totalRecipients',
  TOTAL_SENT: 'totalSent',
  TOTAL_DELIVERED: 'totalDelivered',
  TOTAL_READ: 'totalRead',
  TOTAL_OPENED: 'totalOpened',
  TOTAL_FAILED: 'totalFailed'
};
