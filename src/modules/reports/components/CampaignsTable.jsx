import React from 'react';
import { Search, Filter, Calendar, MessageCircle, Mail } from 'lucide-react';
import { CAMPAIGN_CHANNELS, CAMPAIGN_STATUS, CAMPAIGN_STATUS_CONFIG } from '../utils/constants.js';

const CampaignChannelBadge = ({ channel }) => {
  const icons = { [CAMPAIGN_CHANNELS.WHATSAPP]: MessageCircle, [CAMPAIGN_CHANNELS.SMS]: MessageCircle, [CAMPAIGN_CHANNELS.EMAIL]: Mail };
  const styles = { [CAMPAIGN_CHANNELS.WHATSAPP]: 'bg-green-100 text-green-800', [CAMPAIGN_CHANNELS.SMS]: 'bg-blue-100 text-blue-800', [CAMPAIGN_CHANNELS.EMAIL]: 'bg-purple-100 text-purple-800' };
  const Icon = icons[channel] || MessageCircle;
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[channel] || 'bg-slate-100'}`}><Icon className="w-3.5 h-3.5 inline mr-1" />{channel}</span>;
};

const CampaignStatusBadge = ({ status }) => {
  const config = CAMPAIGN_STATUS_CONFIG[status];
  const colors = { green: 'bg-green-100 text-green-800', yellow: 'bg-yellow-100 text-yellow-800', blue: 'bg-blue-100 text-blue-800', slate: 'bg-slate-100 text-slate-800' };
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[config.color]}`}>{config.label}</span>;
};

const CampaignsTable = ({ campaigns, loading, onViewReport, searchTerm, onSearchChange, filters, onFiltersChange }) => {
  const filteredCampaigns = campaigns.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) && (filters.status === 'all' || c.status === filters.status) && (filters.channel === 'all' || c.channel === filters.channel));
  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold">Campaign Reports ({campaigns.length})</h3></div>
        <div className="flex items-center space-x-4">
          <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" /><input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl" /></div>
          <div className="flex items-center space-x-2"><Filter className="w-4 h-4 text-slate-500" /><select value={filters.channel} onChange={(e) => onFiltersChange({ ...filters, channel: e.target.value })} className="px-3 py-2 border border-slate-300 rounded-xl text-sm">{['whatsapp','sms','email'].map(c => <option key={c} value={c}>{c}</option>)}</select><select value={filters.status} onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })} className="px-3 py-2 border border-slate-300 rounded-xl text-sm">{['completed','partial','running','scheduled'].map(s => <option key={s} value={s}>{s}</option>)}</select></div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200"><tr><th className="px-6 py-3 text-left text-xs font-medium">Campaign</th><th className="px-6 py-3 text-left text-xs font-medium">Channel</th><th className="px-6 py-3 text-left text-xs font-medium">Status</th><th className="px-6 py-3 text-left text-xs font-medium">Date</th><th className="px-6 py-3 text-left text-xs font-medium">Recipients</th><th className="px-6 py-3 text-right text-xs font-medium">Actions</th></tr></thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? <tr><td colSpan="6" className="px-6 py-4 text-center"><div className="flex items-center justify-center"><div className="w-6 h-6 border-2 border-slate-600 border-t-transparent rounded-full animate-spin mr-2" />Loading...</div></td></tr> : filteredCampaigns.length === 0 ? <tr><td colSpan="6" className="px-6 py-8 text-center">No campaigns found.</td></tr> : filteredCampaigns.map(c => <tr key={c.id} className="hover:bg-slate-50"><td className="px-6 py-4"><div className="text-sm font-medium">{c.name}</div>{c.executedAt && <div className="text-xs text-slate-500">Executed {formatDate(c.executedAt)}</div>}</td><td className="px-6 py-4"><CampaignChannelBadge channel={c.channel} /></td><td className="px-6 py-4"><CampaignStatusBadge status={c.status} /></td><td className="px-6 py-4"><div className="flex items-center text-sm"><Calendar className="w-4 h-4 mr-2 text-slate-400" />{formatDate(c.date)}</div></td><td className="px-6 py-4">{c.totalRecipients}</td><td className="px-6 py-4 text-right"><button onClick={() => onViewReport(c.id)} className="text-blue-600 hover:text-blue-800">View Report</button></td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignsTable;
