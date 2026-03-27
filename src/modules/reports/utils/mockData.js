import { CAMPAIGN_CHANNELS, CAMPAIGN_STATUS, DELIVERY_STATUS, CHANNEL_STATUSES } from './constants.js';

export const MOCK_CAMPAIGNS = [];
export const MOCK_CONTACTS = [];

export const calculateCampaignMetrics = (recipients, channel) => {
  const metrics = { totalRecipients: recipients.length, totalSent: 0, totalDelivered: 0, totalRead: 0, totalOpened: 0, totalFailed: 0 };
  recipients.forEach(r => {
    if ([DELIVERY_STATUS.WHATSAPP_SENT, DELIVERY_STATUS.SMS_SENT].includes(r.status)) metrics.totalSent++;
    else if ([DELIVERY_STATUS.WHATSAPP_DELIVERED, DELIVERY_STATUS.SMS_DELIVERED, DELIVERY_STATUS.EMAIL_DELIVERED].includes(r.status)) { metrics.totalSent++; metrics.totalDelivered++; }
    else if (r.status === DELIVERY_STATUS.WHATSAPP_READ) { metrics.totalSent++; metrics.totalDelivered++; metrics.totalRead++; }
    else if (r.status === DELIVERY_STATUS.EMAIL_OPENED) { metrics.totalSent++; metrics.totalDelivered++; metrics.totalOpened++; }
    else if ([DELIVERY_STATUS.WHATSAPP_FAILED, DELIVERY_STATUS.SMS_FAILED, DELIVERY_STATUS.EMAIL_FAILED].includes(r.status)) { metrics.totalSent++; metrics.totalFailed++; }
  });
  return metrics;
};

export const getPercentage = (value, total) => total === 0 ? 0 : Math.round((value / total) * 100);
