import React from 'react';
import { MessageCircle, Mail, FileText } from 'lucide-react';
import { CAMPAIGN_CHANNELS } from '../utils/constants.js';
import StatusBadge from './StatusBadge.jsx';

const CHANNEL_ICONS = {
  [CAMPAIGN_CHANNELS.WHATSAPP]: MessageCircle,
  [CAMPAIGN_CHANNELS.SMS]: MessageCircle,
  [CAMPAIGN_CHANNELS.EMAIL]: Mail
};

const CampaignInfoSection = ({ campaign }) => {
  const Icon = CHANNEL_ICONS[campaign.channel] || FileText;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <div className="text-sm text-slate-600">Campaign Date</div>
          <div className="text-sm font-medium text-slate-900">
            {new Date(campaign.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
        <div>
          <div className="text-sm text-slate-600">Total Recipients</div>
          <div className="text-sm font-medium text-slate-900">{campaign.totalRecipients}</div>
        </div>
        <div>
          <div className="text-sm text-slate-600">Channel</div>
          <div className="text-sm font-medium text-slate-900">
            <Icon className="w-4 h-4 inline mr-1" /> {campaign.channel.charAt(0).toUpperCase() + campaign.channel.slice(1)}
          </div>
        </div>
        <div>
          <div className="text-sm text-slate-600">Status</div>
          <div className="mt-1">
            <StatusBadge status={campaign.status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignInfoSection;
