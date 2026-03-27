import React from 'react';
import { Smartphone, MessageSquare, Mail } from 'lucide-react';
import { CAMPAIGN_CHANNELS } from '../utils/constants.js';

const ChannelSelector = ({ selectedChannel, onChannelSelect, error }) => {
  const channels = [
    { 
      id: CAMPAIGN_CHANNELS.WHATSAPP, 
      icon: Smartphone, 
      color: 'text-green-600',
      label: 'WhatsApp'
    },
    { 
      id: CAMPAIGN_CHANNELS.SMS, 
      icon: MessageSquare, 
      color: 'text-blue-600',
      label: 'SMS'
    },
    { 
      id: CAMPAIGN_CHANNELS.EMAIL, 
      icon: Mail, 
      color: 'text-purple-600',
      label: 'Email'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Select Communication Channel</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {channels.map(channel => {
          const Icon = channel.icon;
          return (
            <button
              key={channel.id}
              onClick={() => onChannelSelect(channel.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedChannel === channel.id
                  ? 'border-slate-700 bg-slate-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2 flex justify-center">
                  <Icon className={`w-8 h-8 ${channel.color}`} />
                </div>
                <div className="font-medium">{channel.label}</div>
              </div>
            </button>
          );
        })}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default ChannelSelector;
