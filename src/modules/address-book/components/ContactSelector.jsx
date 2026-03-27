import React, { useState, useEffect } from 'react';
import { X, Users, Search, Check } from 'lucide-react';

const ContactSelector = ({ 
  contacts = [], 
  selectedContacts = [], 
  onSelectionChange, 
  onClose, 
  onConfirm,
  loading = false 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [internalSelection, setInternalSelection] = useState(selectedContacts);

  useEffect(() => {
    setInternalSelection(selectedContacts);
  }, [selectedContacts]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleContact = (contactId) => {
    setInternalSelection(prev => {
      if (prev.includes(contactId)) {
        return prev.filter(id => id !== contactId);
      } else {
        return [...prev, contactId];
      }
    });
  };

  const handleSelectAll = () => {
    if (internalSelection.length === filteredContacts.length) {
      setInternalSelection([]);
    } else {
      setInternalSelection(filteredContacts.map(contact => contact.id));
    }
  };

  const handleConfirm = () => {
    onSelectionChange(internalSelection);
    onConfirm();
  };

  const selectedCount = internalSelection.length;
  const totalCount = filteredContacts.length;
  const isAllSelected = selectedCount === totalCount && totalCount > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center">
            <Users className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Select Contacts ({selectedCount} selected)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="relative flex-1 mr-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
              />
            </div>
            <button
              onClick={handleSelectAll}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-md transition-colors"
            >
              {isAllSelected ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          <div className="border border-gray-200 dark:border-slate-700 rounded-lg max-h-96 overflow-y-auto">
            {filteredContacts.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                {searchTerm ? 'No contacts found matching your search.' : 'No contacts available.'}
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-slate-700">
                {filteredContacts.map((contact) => {
                  const isSelected = internalSelection.includes(contact.id);
                  return (
                    <div
                      key={contact.id}
                      className={`p-4 hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors ${
                        isSelected ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                      }`}
                      onClick={() => handleToggleContact(contact.id)}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
                          isSelected 
                            ? 'bg-blue-600 border-blue-600' 
                            : 'border-gray-300 dark:border-slate-500'
                        }`}>
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-gray-100">{contact.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{contact.email}</div>
                      <div className="text-sm text-gray-400 dark:text-gray-500">{contact.phone}</div>
                    </div>
                  </div>
                </div>
              );
            })}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {selectedCount} of {totalCount} contacts selected
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={selectedCount === 0 || loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Adding...
                  </div>
                ) : (
                  `Add ${selectedCount} Contact${selectedCount !== 1 ? 's' : ''} to Group`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSelector;
