import { api } from './api.js';

// Address Book API Service - Contacts only for fetching
export const addressBookAPI = {
  // Get contacts list with pagination
  getContacts: async (page = 1, groupId = null) => {
    try {
      const params = {
        page: page.toString()
      };

      // If groupId is provided, override the default from localStorage
      if (groupId) {
        params.group_id = groupId;
      }

      const response = await api.get('listNotificationUserData', params);
      return response;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },

  // Create new contact
  createContact: async (contactData) => {
    try {
      // Get company_id from localStorage or use a default valid one
      const companyId = contactData.company_id || localStorage.getItem('companyId') || '61b8400cb268af68a73b0f5b';
      
      const params = {
        company_id: companyId, // Must be at least 24 characters
        group_id: contactData.group_id || localStorage.getItem('groupId') || '',
        phone: contactData.phone || '',
        whatsapp_number: contactData.whatsapp_number || '',
        email: contactData.email || '',
        first_name: contactData.first_name || '',
        last_name: contactData.last_name || ' ', // Use space instead of empty to avoid validation error
        facebook_id: '', // Required by backend but not used
        telegram_id: '', // Required by backend but not used
        list: contactData.list || [] // Groups the contact belongs to (optional)
      };

      const response = await api.post('createNotificationUserData', params, {});
      return response;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  }
};

export default addressBookAPI;
