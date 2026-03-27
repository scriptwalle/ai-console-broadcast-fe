import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Search, Plus, Upload, Edit2, Trash2, AlertCircle, Phone, MessageCircle } from 'lucide-react';
import { formatInternationalPhone, getCountryByCode } from '../../../utils/countries.js';

// Helper function to format phone number for display
const formatPhoneDisplay = (phone) => {
  if (!phone) return '';
  
  // If phone is already in international format (starts with +)
  if (phone.startsWith('+')) {
    // Extract country code and number
    const match = phone.match(/^(\+\d{1,3})(\d+)$/);
    if (match) {
      const [, countryCode, number] = match;
      return formatInternationalPhone(countryCode, number);
    }
  }
  
  // If phone is object with countryCode and number
  if (typeof phone === 'object' && phone.countryCode && phone.number) {
    return formatInternationalPhone(phone.countryCode, phone.number);
  }
  
  // Fallback to original phone
  return phone;
};

const ContactRow = ({ contact, onEdit, onDelete }) => {
  // Combine first_name and last_name for display
  const displayName = [contact.first_name, contact.last_name, contact.name]
    .filter(Boolean)
    .join(' ') || 'Unknown';

  return (
    <tr key={contact.id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center mr-3">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
              {displayName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{displayName}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{contact.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{contact.email}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{formatPhoneDisplay(contact.phone)}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{formatPhoneDisplay(contact.whatsapp_number || contact.whatsapp || '-')}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
        {contact.groups && contact.groups.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {contact.groups.slice(0, 2).map(group => (
              <span key={group} className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 rounded-full">
                {group}
              </span>
            ))}
            {contact.groups.length > 2 && (
              <span className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 rounded-full">
                +{contact.groups.length - 2}
              </span>
            )}
          </div>
        ) : (
          <span className="text-slate-400">No groups</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button onClick={() => onEdit(contact)} className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 mr-3">
          <Edit2 className="w-4 h-4" />
        </button>
        <button onClick={() => onDelete(contact.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};

const DeleteModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-sm mx-4 p-6">
      <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
      <p className="text-slate-600 mb-6">Are you sure you want to delete this contact?</p>
      <div className="flex justify-end space-x-3">
        <button onClick={onCancel} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-xl">Cancel</button>
        <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-xl">Delete</button>
      </div>
    </div>
  </div>
);

const ContactList = ({ 
  contacts = [], 
  onEdit, 
  onDelete, 
  onBulkUpload, 
  loading = false, 
  error = null, 
  successMessage = null,
  pagination = null, 
  onLoadMore = null, 
  totalCount = 0
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const scrollContainerRef = useRef(null);
  const loadingRef = useRef(null);

  // Filter contacts for search (client-side filtering)
  const filteredContacts = contacts.filter(c => {
    // Combine all possible name fields for search
    const fullName = [c.first_name, c.last_name, c.name]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    
    return (
      fullName.includes(searchTerm.toLowerCase()) || 
      (c.email || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
      (c.phone || '').includes(searchTerm)
    );
  });

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || !onLoadMore || loading || !pagination?.hasMore) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    
    // Load more when user is within 200px of bottom
    if (scrollHeight - scrollTop <= clientHeight + 200) {
      onLoadMore();
    }
  }, [onLoadMore, loading, pagination?.hasMore]);

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // Intersection Observer for loading indicator
  useEffect(() => {
    if (!loadingRef.current || !onLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && pagination?.hasMore) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadingRef.current);
    return () => observer.disconnect();
  }, [onLoadMore, loading, pagination?.hasMore]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            Contacts {totalCount > 0 && `(${contacts.length})`}
          </h3>
          <div className="flex space-x-2">
            <button onClick={onBulkUpload} className="flex items-center px-4 py-2 bg-slate-800 text-white rounded-xl"><Upload className="w-4 h-4 mr-2" />Bulk Upload</button>
            <button onClick={() => onEdit(null)} className="flex items-center px-4 py-2 bg-slate-700 text-white rounded-xl"><Plus className="w-4 h-4 mr-2" />Add Contact</button>
          </div>
        </div>
        
        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center">
            <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
            <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
          </div>
        )}

        {/* Success Message Display */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center">
            <AlertCircle className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-sm text-green-700 dark:text-green-300">{successMessage}</span>
          </div>
        )}

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search contacts..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100" 
          />
        </div>
      </div>

      {/* Scrollable table container */}
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto max-h-96 overflow-y-auto"
        onScroll={handleScroll}
      >
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300">WhatsApp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300">Groups</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-600">
            {loading && contacts.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center">
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-slate-600 border-t-transparent rounded-full animate-spin mr-2" />
                    Loading contacts...
                  </div>
                </td>
              </tr>
            ) : filteredContacts.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                  {searchTerm ? 'No contacts found matching your search.' : 'No contacts yet. Add your first contact to get started.'}
                </td>
              </tr>
            ) : (
              filteredContacts.map(c => (
                <ContactRow 
                  key={c.id} 
                  contact={c} 
                  onEdit={onEdit} 
                  onDelete={(id) => { setShowDeleteConfirm(id); }} 
                />
              ))
            )}
            
            {/* Loading indicator for pagination */}
            {loading && contacts.length > 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  <div ref={loadingRef} className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full animate-spin mr-2" />
                    Loading more contacts...
                  </div>
                </td>
              </tr>
            )}

            {/* End of results indicator */}
            {!loading && pagination && !pagination.hasMore && contacts.length > 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-slate-500 dark:text-slate-400 text-sm">
                  {contacts.length} contacts loaded
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showDeleteConfirm && (
        <DeleteModal 
          onConfirm={() => { 
            onDelete(showDeleteConfirm); 
            setShowDeleteConfirm(null); 
          }} 
          onCancel={() => setShowDeleteConfirm(null)} 
        />
      )}
    </div>
  );
};

export default ContactList;
