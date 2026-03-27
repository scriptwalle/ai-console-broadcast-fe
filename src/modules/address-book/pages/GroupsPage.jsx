import React, { useState, useEffect } from 'react';
import { useGroups } from '../hooks/useGroups.js';
import { useContacts } from '../hooks/useContacts.js';
import GroupForm from '../components/GroupForm.jsx';
import GroupList from '../components/GroupList.jsx';
import ContactSelector from '../components/ContactSelector.jsx';

const GroupsPage = () => {
  const {
    groups,
    loading,
    error,
    addGroup,
    updateGroup,
    deleteGroup,
    addContactsToGroup,
    clearError
  } = useGroups();

  const { contacts } = useContacts();

  const [showGroupForm, setShowGroupForm] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [showContactSelector, setShowContactSelector] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showGroupContacts, setShowGroupContacts] = useState(null);

  useEffect(() => {
    if (error) {
      alert(error);
      clearError();
    }
  }, [error, clearError]);

  const handleAddGroup = async (groupData) => {
    const result = await addGroup(groupData);
    if (result.success) {
      setShowGroupForm(false);
    }
  };

  const handleEditGroup = async (groupData) => {
    const result = await updateGroup(editingGroup.id, groupData);
    if (result.success) {
      setEditingGroup(null);
      setShowGroupForm(false);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    const result = await deleteGroup(groupId);
    if (!result.success) {
      alert('Failed to delete group');
    }
  };

  const handleAddContactsToGroup = (group) => {
    setSelectedGroup(group);
    const existingContactIds = group.contacts || [];
    setShowContactSelector(existingContactIds);
  };

  const handleContactSelection = async (selectedContactIds) => {
    if (selectedGroup) {
      addContactsToGroup(selectedGroup.id, selectedContactIds);
    }
  };

  const openGroupForm = (group = null) => {
    setEditingGroup(group);
    setShowGroupForm(true);
  };

  const closeGroupForm = () => {
    setEditingGroup(null);
    setShowGroupForm(false);
  };

  const handleViewContacts = (group) => {
    const groupContacts = contacts.filter(contact => 
      group.contacts && group.contacts.includes(contact.id)
    );
    setShowGroupContacts({
      groupName: group.name,
      contacts: groupContacts
    });
  };

  const getGroupNames = () => {
    return groups.map(group => group.name);
  };

  return (
    <div className="p-6">
      <GroupList
        groups={groups}
        contacts={contacts}
        loading={loading}
        onEdit={openGroupForm}
        onDelete={handleDeleteGroup}
        onAddContacts={handleAddContactsToGroup}
        onViewContacts={handleViewContacts}
      />

      {showGroupForm && (
        <GroupForm
          group={editingGroup}
          onSave={editingGroup ? handleEditGroup : handleAddGroup}
          onCancel={closeGroupForm}
          loading={loading}
          existingGroups={getGroupNames()}
        />
      )}

      {showContactSelector && (
        <ContactSelector
          contacts={contacts}
          selectedContacts={showContactSelector}
          onSelectionChange={handleContactSelection}
          onClose={() => setShowContactSelector(false)}
          onConfirm={() => setShowContactSelector(false)}
          loading={loading}
        />
      )}

      {showGroupContacts && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Contacts in "{showGroupContacts.groupName}"
              </h2>
              <button
                onClick={() => setShowGroupContacts(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              {showGroupContacts.contacts.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No contacts in this group yet.
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {showGroupContacts.contacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">{contact.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{contact.email}</div>
                        <div className="text-sm text-gray-400 dark:text-gray-500">{contact.phone}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-slate-700">
              <button
                onClick={() => setShowGroupContacts(null)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupsPage;
