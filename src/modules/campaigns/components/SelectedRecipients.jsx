import React from 'react';
import { X, Users, User } from 'lucide-react';

const SelectedRecipients = ({ 
  selectedContacts, 
  selectedGroups, 
  selectAllContacts, 
  selectAllGroups,
  onRemoveContact,
  onRemoveGroup,
  onToggleSelectAllContacts,
  onToggleSelectAllGroups
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Selected Recipients</h3>
      
      {/* Select All Options */}
      <div className="space-y-3">
        <label className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg">
          <input
            type="checkbox"
            checked={selectAllContacts}
            onChange={(e) => onToggleSelectAllContacts(e.target.checked)}
            className="w-4 h-4 text-slate-700 border-slate-300 rounded focus:ring-slate-500"
          />
          <User className="w-4 h-4 text-slate-600" />
          <span>Target All Contacts</span>
        </label>
        
        <label className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg">
          <input
            type="checkbox"
            checked={selectAllGroups}
            onChange={(e) => onToggleSelectAllGroups(e.target.checked)}
            className="w-4 h-4 text-slate-700 border-slate-300 rounded focus:ring-slate-500"
          />
          <Users className="w-4 h-4 text-slate-600" />
          <span>Target All Groups</span>
        </label>
      </div>

      {/* Selected Contacts */}
      {selectedContacts.length > 0 && (
        <div>
          <div className="text-sm font-medium text-slate-700 mb-2">
            Selected Contacts ({selectedContacts.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedContacts.map(contact => (
              <div
                key={contact.id}
                className="flex items-center space-x-2 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
              >
                <User className="w-3 h-3" />
                <span>{contact.name}</span>
                <button
                  onClick={() => onRemoveContact(contact)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Groups */}
      {selectedGroups.length > 0 && (
        <div>
          <div className="text-sm font-medium text-slate-700 mb-2">
            Selected Groups ({selectedGroups.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedGroups.map(group => (
              <div
                key={group.id}
                className="flex items-center space-x-2 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
              >
                <Users className="w-3 h-3" />
                <span>{group.name}</span>
                <button
                  onClick={() => onRemoveGroup(group)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Count Display */}
      <div className="text-sm text-slate-600 pt-2 border-t border-slate-200">
        <div>• {selectedContacts.length} contacts selected</div>
        <div>• {selectedGroups.length} groups selected</div>
        {selectAllContacts && <div>• All contacts targeted</div>}
        {selectAllGroups && <div>• All groups targeted</div>}
      </div>
    </div>
  );
};

export default SelectedRecipients;
