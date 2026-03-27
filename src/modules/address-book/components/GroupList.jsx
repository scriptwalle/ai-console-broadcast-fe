import React, { useState } from 'react';
import { Edit, Trash2, Users, Plus, UserPlus, Eye } from 'lucide-react';

const GroupRow = ({ group, onEdit, onDelete, onAddContacts, onViewContacts }) => (
  <tr key={group.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-slate-100 rounded-full"><Users className="h-5 w-5 text-slate-600" /></div>
        <div className="ml-4"><div className="text-sm font-medium">{group.name}</div></div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap"><span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100">{group.contacts?.length || 0} contacts</span></td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(parseInt(group.id.split('-')[1])).toLocaleDateString()}</td>
    <td className="px-6 py-4 text-right">
      <div className="flex items-center justify-end space-x-2">
        <button onClick={() => onViewContacts(group)} className="text-green-600 hover:text-green-800" title="View"><Eye className="w-4 h-4" /></button>
        <button onClick={() => onAddContacts(group)} className="text-slate-600 hover:text-slate-900" title="Add contacts"><UserPlus className="w-4 h-4" /></button>
        <button onClick={() => onEdit(group)} className="text-yellow-600 hover:text-yellow-800" title="Edit"><Edit className="w-4 h-4" /></button>
        <button onClick={() => onDelete(group.id)} className="text-red-500 hover:text-red-700" title="Delete"><Trash2 className="w-4 h-4" /></button>
      </div>
    </td>
  </tr>
);

const DeleteModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-sm mx-4 p-6">
      <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
      <p className="text-slate-600 mb-6">Are you sure? Contacts will not be deleted.</p>
      <div className="flex justify-end space-x-3">
        <button onClick={onCancel} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-xl">Cancel</button>
        <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-xl">Delete</button>
      </div>
    </div>
  </div>
);

const GroupList = ({ groups = [], onEdit, onDelete, onAddContacts, onViewContacts, loading = false }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Groups ({groups.length})</h3>
          <button onClick={() => onEdit(null)} className="flex items-center px-4 py-2 bg-slate-700 text-white rounded-xl"><Plus className="w-4 h-4 mr-2" />Create Group</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200"><tr><th className="px-6 py-3 text-left text-xs font-medium text-slate-500">Group Name</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500">Contact Count</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500">Created</th><th className="px-6 py-3 text-right text-xs font-medium text-slate-500">Actions</th></tr></thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? <tr><td colSpan="4" className="px-6 py-4 text-center"><div className="flex items-center justify-center"><div className="w-6 h-6 border-2 border-slate-600 border-t-transparent rounded-full animate-spin mr-2" />Loading...</div></td></tr> : groups.length === 0 ? <tr><td colSpan="4" className="px-6 py-8 text-center">No groups yet.</td></tr> : groups.map(g => <GroupRow key={g.id} group={g} onEdit={onEdit} onDelete={(id) => setShowDeleteConfirm(id)} onAddContacts={onAddContacts} onViewContacts={onViewContacts} />)}
          </tbody>
        </table>
      </div>
      {showDeleteConfirm && <DeleteModal onConfirm={() => { onDelete(showDeleteConfirm); setShowDeleteConfirm(null); }} onCancel={() => setShowDeleteConfirm(null)} />}
    </div>
  );
};

export default GroupList;
