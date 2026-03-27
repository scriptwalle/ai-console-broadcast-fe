import React, { useState } from 'react';
import { Edit, Trash2, Plus, Search, Filter, Eye } from 'lucide-react';
import { CAMPAIGN_CHANNELS, CAMPAIGN_STATUS } from '../utils/constants.js';

const CampaignList = ({ 
  campaigns = [], 
  loading = false, 
  onEdit, 
  onDelete, 
  onCreate,
  onView
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getChannelBadge = (channel) => {
    const styles = {
      [CAMPAIGN_CHANNELS.WHATSAPP]: 'bg-green-100 text-green-800',
      [CAMPAIGN_CHANNELS.SMS]: 'bg-blue-100 text-blue-800',
      [CAMPAIGN_CHANNELS.EMAIL]: 'bg-purple-100 text-purple-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[channel] || 'bg-gray-100 text-gray-800'}`}>
        {channel.charAt(0).toUpperCase() + channel.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      [CAMPAIGN_STATUS.DRAFT]: 'bg-gray-100 text-gray-800',
      [CAMPAIGN_STATUS.SCHEDULED]: 'bg-yellow-100 text-yellow-800',
      [CAMPAIGN_STATUS.RUNNING]: 'bg-blue-100 text-blue-800',
      [CAMPAIGN_STATUS.COMPLETED]: 'bg-green-100 text-green-800',
      [CAMPAIGN_STATUS.FAILED]: 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatScheduledTime = (time) => {
    if (!time) return 'Not scheduled';
    return new Date(time).toLocaleString();
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Campaigns ({campaigns.length})</h3>
          <button onClick={onCreate} className="flex items-center px-4 py-2 bg-slate-700 dark:bg-slate-600 text-white rounded-xl hover:bg-slate-800">
            <Plus className="w-4 h-4 mr-2" /> Create Campaign
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-100"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">Campaign Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">Channel</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">Scheduled Time</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-slate-500">
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-slate-600 border-t-transparent rounded-full animate-spin mr-2" />
                    Loading campaigns...
                  </div>
                </td>
              </tr>
            ) : filteredCampaigns.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                  {searchTerm ? 'No campaigns found.' : 'No campaigns yet. Create your first campaign.'}
                </td>
              </tr>
            ) : (
              filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium">{campaign.name}</div>
                  </td>
                  <td className="px-6 py-4">{getChannelBadge(campaign.channel)}</td>
                  <td className="px-6 py-4">{getStatusBadge(campaign.status)}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{formatScheduledTime(campaign.scheduledTime)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => onView(campaign)} className="text-blue-600 hover:text-blue-800" title="View"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => onEdit(campaign)} className="text-slate-600 hover:text-slate-900" title="Edit"><Edit className="w-4 h-4" /></button>
                      <button
                        onClick={() => setShowDeleteConfirm(campaign.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-sm mx-4 p-6">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-slate-600 mb-6">Are you sure you want to delete this campaign? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowDeleteConfirm(null)} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-xl">Cancel</button>
              <button onClick={() => { onDelete(showDeleteConfirm); setShowDeleteConfirm(null); }} className="px-4 py-2 bg-red-600 text-white rounded-xl">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignList;
