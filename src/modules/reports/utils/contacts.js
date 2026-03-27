import { CAMPAIGN_CHANNELS, CAMPAIGN_STATUS, DELIVERY_STATUS, CHANNEL_STATUSES } from './constants.js';

export const MOCK_CONTACTS = [];

export const generateRecipients = (campaignId, channel, count = 10) => {
  const recipients = [];
  const contacts = MOCK_CONTACTS.slice(0, count);
  const statuses = CHANNEL_STATUSES[channel];
  const initialStatus = statuses[0];
  contacts.forEach((contact, index) => {
    recipients.push({
      id: `recipient-${campaignId}-${contact.id}`,
      contactId: contact.id,
      name: contact.name,
      identifier: channel === CAMPAIGN_CHANNELS.EMAIL ? contact.email : contact.phone,
      channel,
      status: initialStatus,
      updatedAt: Date.now() + (index * 1000),
      campaignId
    });
  });
  return recipients;
};
