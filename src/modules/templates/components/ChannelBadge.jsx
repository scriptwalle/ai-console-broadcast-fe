import React from 'react';
import { MessageCircle, Mail } from 'lucide-react';

export const getChannelBadge = (channel) => {
  const styles = {
    whatsapp: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    sms: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
    email: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
  };
  const icons = { whatsapp: MessageCircle, sms: MessageCircle, email: Mail };
  const Icon = icons[channel] || MessageCircle;
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[channel] || 'bg-slate-100 text-slate-700'}`}>
      <Icon className="w-3.5 h-3.5 mr-1" /> <span>{channel.charAt(0).toUpperCase() + channel.slice(1)}</span>
    </span>
  );
};

export default getChannelBadge;
