import React, { useState, useEffect } from 'react';
import { useContacts } from '../hooks/useContacts.js';
import { useGroups } from '../hooks/useGroups.js';
import ContactForm from '../components/ContactForm.jsx';
import ContactList from '../components/ContactList.jsx';
import BulkUpload from '../components/BulkUpload.jsx';

const ContactsPage = () => {
  const {
    contacts,
    loading,
    error,
    pagination,
    loadMoreContacts,
    refreshContacts,
    addContact,
    updateContact,
    deleteContact,
    bulkAddContacts,
    clearError
  } = useContacts();

  const { groups } = useGroups();

  const [showContactForm, setShowContactForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Remove error alert - errors are now displayed in UI

  // Handle add contact with success message
  const handleAddContact = async (contactData) => {
    const result = await addContact(contactData);
    if (result.success) {
      setShowContactForm(false);
      if (result.message) {
        setSuccessMessage(result.message);
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    }
  };

  const handleEditContact = async (contactData) => {
    const result = await updateContact(editingContact.id, contactData);
    if (result.success) {
      setEditingContact(null);
      setShowContactForm(false);
    }
  };

  const handleDeleteContact = async (contactId) => {
    const result = await deleteContact(contactId);
    // Error will be shown in UI, no alert needed
  };

  const handleBulkUpload = async (contactsData) => {
    const result = await bulkAddContacts(contactsData);
    if (result.success) {
      setShowBulkUpload(false);
    }
    return result.success;
  };

  const openContactForm = (contact = null) => {
    // Pass the contact as-is (with API field structure) to the form
    // The form will handle the field mapping internally
    setEditingContact(contact);
    setShowContactForm(true);
  };

  const closeContactForm = () => {
    setEditingContact(null);
    setShowContactForm(false);
  };

  return (
    <div className="p-6">
      <ContactList
        contacts={contacts}
        loading={loading}
        error={error}
        successMessage={successMessage}
        pagination={pagination}
        totalCount={pagination?.totalCount || 0}
        onLoadMore={loadMoreContacts}
        onEdit={openContactForm}
        onDelete={handleDeleteContact}
        onBulkUpload={() => setShowBulkUpload(true)}
      />

      {showContactForm && (
        <ContactForm
          contact={editingContact}
          onSave={editingContact ? handleEditContact : handleAddContact}
          onCancel={closeContactForm}
          loading={loading}
        />
      )}

      {showBulkUpload && (
        <BulkUpload
          onClose={() => setShowBulkUpload(false)}
          onUpload={handleBulkUpload}
          existingGroups={groups}
        />
      )}
    </div>
  );
};

export default ContactsPage;
