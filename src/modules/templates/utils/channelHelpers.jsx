import React from 'react';
import { MessageSquare, Type, Mail } from 'lucide-react';
import { TEMPLATE_CHANNELS } from '../utils/constants.js';

export const getChannelIcon = (channel) => {
  switch (channel) {
    case TEMPLATE_CHANNELS.WHATSAPP:
      return <MessageSquare className="w-5 h-5" />;
    case TEMPLATE_CHANNELS.SMS:
      return <Type className="w-5 h-5" />;
    case TEMPLATE_CHANNELS.EMAIL:
      return <Mail className="w-5 h-5" />;
    default:
      return <Type className="w-5 h-5" />;
  }
};

export const getChannelLabel = (channel) => {
  switch (channel) {
    case TEMPLATE_CHANNELS.WHATSAPP:
      return 'WhatsApp';
    case TEMPLATE_CHANNELS.SMS:
      return 'SMS';
    case TEMPLATE_CHANNELS.EMAIL:
      return 'Email';
    default:
      return channel;
  }
};

export const getChannelCount = (templates, channel) => {
  return templates.filter(t => t.channel === channel).length;
};
