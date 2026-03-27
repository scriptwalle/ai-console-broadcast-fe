import React from 'react';
import { getChannelIcon, getChannelLabel, getChannelCount } from '../utils/channelHelpers.jsx';
import { TEMPLATE_CHANNELS } from '../utils/constants.js';

const ChannelTabs = ({ templates, activeTab, onTabChange }) => {
  const channels = [TEMPLATE_CHANNELS.WHATSAPP, TEMPLATE_CHANNELS.SMS, TEMPLATE_CHANNELS.EMAIL];

  return (
    <div className="border-b border-slate-200 dark:border-slate-700 mb-6">
      <nav className="flex space-x-8" aria-label="Channel tabs">
        {channels.map((channel) => (
          <button
            key={channel}
            onClick={() => onTabChange(channel)}
            className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-all duration-200 ${
              activeTab === channel
                ? 'border-slate-600 dark:border-slate-400 text-slate-900 dark:text-slate-100'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            {getChannelIcon(channel)}
            <span className="ml-2">{getChannelLabel(channel)}</span>
            <span className="ml-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full text-xs">
              {getChannelCount(templates, channel)}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ChannelTabs;
