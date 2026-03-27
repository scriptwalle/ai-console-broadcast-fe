import React, { useState } from 'react';
import { Edit, Trash2, Plus, Search, Filter, Eye } from 'lucide-react';
import { TEMPLATE_CHANNELS, APPROVAL_STATUS } from '../utils/constants.js';
import { getChannelBadge } from './ChannelBadge.jsx';
import { getStatusBadge } from './StatusBadge.jsx';

const TemplateList = ({ 
  templates = [], 
  loading = false, 
  onEdit, 
  onDelete, 
  onCreate,
  onPreview,
  filters,
  onFiltersChange 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const truncateContent = (content, maxLength = 50) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Templates ({templates.length})</h3>
          <button onClick={onCreate} className="flex items-center px-4 py-2 bg-slate-700 dark:bg-slate-600 text-white rounded-xl hover:bg-slate-800">
            <Plus className="w-4 h-4 mr-2" /> Create Template
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-100"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={filters.channel}
              onChange={(e) => onFiltersChange({ channel: e.target.value })}
              className="px-3 py-2 border border-slate-300 rounded-xl text-sm dark:bg-slate-700"
            >
              <option value="all">All Channels</option>
              <option value={TEMPLATE_CHANNELS.WHATSAPP}>WhatsApp</option>
              <option value={TEMPLATE_CHANNELS.SMS}>SMS</option>
              <option value={TEMPLATE_CHANNELS.EMAIL}>Email</option>
            </select>
            <select
              value={filters.status}
              onChange={(e) => onFiltersChange({ status: e.target.value })}
              className="px-3 py-2 border border-slate-300 rounded-xl text-sm dark:bg-slate-700"
            >
              <option value="all">All Status</option>
              <option value={APPROVAL_STATUS.PENDING}>Pending</option>
              <option value={APPROVAL_STATUS.APPROVED}>Approved</option>
              <option value={APPROVAL_STATUS.REJECTED}>Rejected</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">Channel</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">Content</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-slate-500">
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-slate-600 border-t-transparent rounded-full animate-spin mr-2" />
                    Loading templates...
                  </div>
                </td>
              </tr>
            ) : filteredTemplates.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                  {searchTerm ? 'No templates found.' : 'No templates yet. Create your first template.'}
                </td>
              </tr>
            ) : (
              filteredTemplates.map((template) => (
                <tr key={template.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium">{template.name}</div>
                    {template.inUse && <div className="text-xs text-slate-500">In use</div>}
                  </td>
                  <td className="px-6 py-4">{getChannelBadge(template.channel)}</td>
                  <td className="px-6 py-4 text-sm max-w-xs truncate">{truncateContent(template.content)}</td>
                  <td className="px-6 py-4">
                    {template.channel === TEMPLATE_CHANNELS.WHATSAPP ? getStatusBadge(template.status) : <span className="text-slate-400">-</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => onPreview(template)} className="text-blue-600 hover:text-blue-800" title="Preview"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => onEdit(template)} className="text-slate-600 hover:text-slate-900" title="Edit"><Edit className="w-4 h-4" /></button>
                      <button
                        onClick={() => setShowDeleteConfirm(template.id)}
                        className={`${template.inUse ? 'text-slate-300 cursor-not-allowed' : 'text-red-500 hover:text-red-700'}`}
                        title={template.inUse ? 'Cannot delete' : 'Delete'}
                        disabled={template.inUse}
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
            <p className="text-slate-600 mb-6">Are you sure you want to delete this template? This action cannot be undone.</p>
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

export default TemplateList;
