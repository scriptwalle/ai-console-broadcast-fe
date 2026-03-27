import React, { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, MessageCircle, Mail } from 'lucide-react';
import { CHANNEL_STATUSES } from '../utils/constants.js';
import StatusBadge from './StatusBadge.jsx';

const RecipientTableRow = ({ recipient, getChannelIcon, formatDate }) => (
  <tr key={recipient.id} className="hover:bg-slate-50">
    <td className="px-6 py-4"><div className="text-sm font-medium">{recipient.name}</div></td>
    <td className="px-6 py-4"><div className="text-sm">{recipient.identifier}</div></td>
    <td className="px-6 py-4"><div className="flex items-center text-sm">{getChannelIcon(recipient.channel)}<span className="ml-1">{recipient.channel}</span></div></td>
    <td className="px-6 py-4"><StatusBadge status={recipient.status} /></td>
    <td className="px-6 py-4"><div className="text-sm text-slate-600">{formatDate(recipient.updatedAt)}</div></td>
  </tr>
);

const RecipientTablePagination = ({ currentPage, totalPages, onPageChange, startIndex, endIndex, total }) => (
  <div className="px-6 py-4 border-t border-slate-200">
    <div className="flex items-center justify-between">
      <div className="text-sm text-slate-600">Showing {startIndex + 1} to {Math.min(endIndex, total)} of {total}</div>
      <div className="flex items-center space-x-2">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => <button key={page} onClick={() => onPageChange(page)} className={`px-3 py-1 text-sm rounded-md ${currentPage === page ? 'bg-slate-700 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{page}</button>)}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50"><ChevronRight className="w-4 h-4" /></button>
      </div>
    </div>
  </div>
);

const RecipientTable = ({ recipients, channel, loading = false, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const getChannelIcon = (ch) => {
    const icons = { whatsapp: MessageCircle, sms: MessageCircle, email: Mail };
    const Icon = icons[ch.toLowerCase()] || MessageCircle;
    return <Icon className="w-4 h-4" />;
  };
  const formatDate = (ts) => new Date(ts).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const filteredRecipients = recipients.filter(r => (!searchTerm || r.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.identifier.toLowerCase().includes(searchTerm.toLowerCase())) && (statusFilter === 'all' || r.status === statusFilter));
  const totalPages = Math.ceil(filteredRecipients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecipients = filteredRecipients.slice(startIndex, startIndex + itemsPerPage);
  const getValidStatuses = () => CHANNEL_STATUSES[channel] || [];

  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`}>
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold">Recipient Breakdown ({filteredRecipients.length})</h3></div>
        <div className="flex items-center space-x-4">
          <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" /><input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl" /></div>
          <div className="flex items-center space-x-2"><Filter className="w-4 h-4 text-slate-500" /><select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="px-3 py-2 border border-slate-300 rounded-xl text-sm">{getValidStatuses().map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}</select></div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200"><tr><th className="px-6 py-3 text-left text-xs font-medium">Name</th><th className="px-6 py-3 text-left text-xs font-medium">Identifier</th><th className="px-6 py-3 text-left text-xs font-medium">Channel</th><th className="px-6 py-3 text-left text-xs font-medium">Status</th><th className="px-6 py-3 text-left text-xs font-medium">Updated</th></tr></thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? <tr><td colSpan="5" className="px-6 py-8 text-center"><div className="flex items-center justify-center"><div className="w-6 h-6 border-2 border-slate-600 border-t-transparent rounded-full animate-spin mr-2" />Loading...</div></td></tr> : paginatedRecipients.length === 0 ? <tr><td colSpan="5" className="px-6 py-8 text-center">No recipients found.</td></tr> : paginatedRecipients.map(r => <RecipientTableRow key={r.id} recipient={r} getChannelIcon={getChannelIcon} formatDate={formatDate} />)}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && <RecipientTablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} startIndex={startIndex} endIndex={startIndex + itemsPerPage} total={filteredRecipients.length} />}
    </div>
  );
};

export default RecipientTable;
