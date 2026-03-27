import React, { useState } from 'react';
import SearchResults from './SearchResults.jsx';
import SelectedRecipients from './SelectedRecipients.jsx';
import { useSearch } from '../hooks/useSearch.js';

const RecipientSelector = ({ 
  selectedContacts, 
  selectedGroups, 
  selectAllContacts, 
  selectAllGroups,
  onToggleSelectAllContacts,
  onToggleSelectAllGroups,
  onContactSelect,
  onGroupSelect,
  onContactRemove,
  onGroupRemove,
  error 
}) => {
  const [activeTab, setActiveTab] = useState('contacts');
  const { searchState, searchContacts, searchGroups, clearSearch } = useSearch();
  
  const safeSearchState = searchState || {
    contacts: { results: [], loading: false, hasMore: true, query: '' },
    groups: { results: [], loading: false, hasMore: true, query: '' }
  };

  const handleContactSelect = (contact) => {
    onContactSelect(contact);
  };

  const handleGroupSelect = (group) => {
    onGroupSelect(group);
  };

  const handleClearSearch = () => {
    clearSearch(activeTab);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Select Recipients</h3>
      
      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('contacts')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'contacts'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Search Contacts
        </button>
        <button
          onClick={() => setActiveTab('groups')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'groups'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Search Groups
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Search Section */}
        <div>
          <SearchResults
            type={activeTab}
            searchState={activeTab === 'contacts' ? safeSearchState.contacts : safeSearchState.groups}
            onSearch={activeTab === 'contacts' ? searchContacts : searchGroups}
            onSelect={activeTab === 'contacts' ? handleContactSelect : handleGroupSelect}
            onLoadMore={activeTab === 'contacts' ? searchContacts : searchGroups}
            onClear={handleClearSearch}
          />
        </div>

        {/* Selected Recipients */}
        <div>
          <SelectedRecipients
            selectedContacts={selectedContacts}
            selectedGroups={selectedGroups}
            selectAllContacts={selectAllContacts}
            selectAllGroups={selectAllGroups}
            onRemoveContact={onContactRemove}
            onRemoveGroup={onGroupRemove}
            onToggleSelectAllContacts={onToggleSelectAllContacts}
            onToggleSelectAllGroups={onToggleSelectAllGroups}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default RecipientSelector;
