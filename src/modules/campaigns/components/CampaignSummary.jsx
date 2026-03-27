import React from 'react';
import { formatDateTime } from '../utils/scheduler.js';
import { CAMPAIGN_CHANNELS } from '../utils/constants.js';

const CampaignSummary = ({ formData, selectedTemplate, errors }) => {
  const getChannelLabel = (channel) => {
    return channel.charAt(0).toUpperCase() + channel.slice(1);
  };

  const formatRecipients = () => {
    const parts = [];
    if (formData.selectAllContacts) parts.push('All contacts');
    else if (formData.selectedContacts.length > 0) parts.push(`${formData.selectedContacts.length} contacts`);
    
    if (formData.selectAllGroups) parts.push('All groups');
    else if (formData.selectedGroups.length > 0) parts.push(`${formData.selectedGroups.length} groups`);
    
    return parts.length > 0 ? parts.join(', ') : 'None';
  };

  const formatVariables = () => {
    const vars = Object.entries(formData.variables || {});
    return vars.length > 0 
      ? vars.map(([key, value]) => `${key}: ${value}`).join(', ')
      : 'None';
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Campaign Summary</h3>
      
      <div className="bg-slate-50 rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium text-slate-500">Campaign Name</div>
            <div className="text-slate-900">{formData.name || 'Not set'}</div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-slate-500">Channel</div>
            <div className="text-slate-900">{getChannelLabel(formData.channel)}</div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-slate-500">Template</div>
            <div className="text-slate-900">{selectedTemplate?.name || 'Not selected'}</div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-slate-500">Recipients</div>
            <div className="text-slate-900">{formatRecipients()}</div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-slate-500">Variables</div>
            <div className="text-slate-900">{formatVariables()}</div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-slate-500">Schedule Time</div>
            <div className="text-slate-900">
              {formData.runNow ? 'Now (2 min buffer)' : formatDateTime(formData.scheduleTime)}
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-slate-500">Lapse Time</div>
            <div className="text-slate-900">{formatDateTime(formData.lapseTime)}</div>
          </div>
        </div>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-sm font-medium text-red-800 mb-2">Please fix the following errors:</div>
          <ul className="text-sm text-red-700 space-y-1">
            {Object.values(errors).map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CampaignSummary;
