import { useReducer, useCallback, useEffect } from 'react';
import { addressBookAPI } from '../../../services/addressBookAPI.js';
import { hasAuthConfig } from '../../../utils/auth.js';

const initialState = { 
  contacts: [], 
  loading: false, 
  error: null,
  pagination: {
    currentPage: 1,
    hasMore: true,
    totalCount: 0
  }
};

const contactsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING': return { ...state, loading: action.payload };
    case 'SET_ERROR': return { ...state, error: action.payload, loading: false };
    case 'SET_CONTACTS': { 
      // Map API fields to display fields for contacts from API
      const mappedContacts = action.payload.contacts.map(contact => {
        // Combine first_name and last_name for display
        const name = [contact.first_name, contact.last_name]
          .filter(Boolean)
          .join(' ');
        
        return {
          ...contact,
          name: name,
          whatsapp: contact.whatsapp_number
        };
      });
      
      return { 
        ...state, 
        contacts: mappedContacts, 
        loading: false, 
        error: null,
        pagination: action.payload.pagination
      };
    };
    case 'APPEND_CONTACTS': { 
      // Map API fields to display fields for contacts from API
      const mappedContacts = action.payload.contacts.map(contact => {
        // Combine first_name and last_name for display
        const name = [contact.first_name, contact.last_name]
          .filter(Boolean)
          .join(' ');
        
        return {
          ...contact,
          name: name,
          whatsapp: contact.whatsapp_number
        };
      });
      
      return { 
        ...state, 
        contacts: [...state.contacts, ...mappedContacts], 
        loading: false, 
        error: null,
        pagination: action.payload.pagination
      };
    };
    case 'ADD_CONTACT': return { ...state, contacts: [...state.contacts, { ...action.payload, id: action.payload.id || `contact-${Date.now()}` }], loading: false, error: null };
    case 'UPDATE_CONTACT': return { ...state, contacts: state.contacts.map(c => c.id === action.payload.id ? action.payload : c), loading: false, error: null };
    case 'DELETE_CONTACT': return { ...state, contacts: state.contacts.filter(c => c.id !== action.payload), loading: false, error: null };
    case 'BULK_ADD_CONTACTS': return { ...state, contacts: [...state.contacts, ...action.payload], loading: false, error: null };
    case 'ADD_CONTACT_TO_GROUPS': return { ...state, contacts: state.contacts.map(c => c.id === action.payload.contactId ? { ...c, groups: [...new Set([...c.groups, action.payload.groupName])] } : c) };
    case 'REMOVE_CONTACT_FROM_GROUP': return { ...state, contacts: state.contacts.map(c => c.id === action.payload.contactId ? { ...c, groups: c.groups.filter(g => g !== action.payload.groupName) } : c) };
    case 'RESET_PAGINATION': return { ...state, contacts: [], pagination: { currentPage: 1, hasMore: true, totalCount: 0 } };
    default: return state;
  }
};

export const useContacts = () => {
  const [state, dispatch] = useReducer(contactsReducer, initialState);

  // Fetch contacts with pagination
  const fetchContacts = useCallback(async (page = 1, append = false) => {
    if (!hasAuthConfig()) {
      dispatch({ type: 'SET_ERROR', payload: 'Please configure API settings first' });
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await addressBookAPI.getContacts(page);
      
      // Parse the API response - adjust based on actual response structure
      let contacts = [];
      let pagination = { currentPage: page, hasMore: false, totalCount: 0 };
      
      if (response && response.data && Array.isArray(response.data)) {
        // API response structure: { success: 1, data: [contacts] }
        contacts = response.data || [];
        
        // For pagination: assume there are more pages if we got a full page of contacts
        // This is a simple heuristic - in a real app, the API should return pagination info
        const pageSize = 50; // Based on your API returning 50 contacts
        const hasMore = contacts.length === pageSize;
        
        pagination = {
          currentPage: page,
          hasMore: hasMore,
          totalCount: append ? (state.pagination.totalCount + contacts.length) : contacts.length
        };
      }
      
      dispatch({ 
        type: append ? 'APPEND_CONTACTS' : 'SET_CONTACTS', 
        payload: { contacts, pagination } 
      });
      
    } catch (error) {
      console.error('Error fetching contacts:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to fetch contacts' });
    }
  }, []);

  // Load more contacts (for infinite scroll)
  const loadMoreContacts = useCallback(() => {
    if (!state.loading && state.pagination.hasMore) {
      const nextPage = state.pagination.currentPage + 1;
      fetchContacts(nextPage, true);
    }
  }, [state.loading, state.pagination.hasMore, state.pagination.currentPage, fetchContacts]);

  // Reset and fetch first page
  const refreshContacts = useCallback(() => {
    dispatch({ type: 'RESET_PAGINATION' });
    fetchContacts(1, false);
  }, [fetchContacts]);

  // Initial load
  useEffect(() => {
    if (hasAuthConfig()) {
      refreshContacts();
    }
  }, [refreshContacts]);

  // Create contact with API call
  const addContact = async (contactData) => {
    console.log('🔄 Adding contact:', contactData);

    if (!hasAuthConfig()) {
      console.log('❌ No auth config');
      dispatch({ type: 'SET_ERROR', payload: 'Please configure API settings first' });
      return { success: false, error: 'API configuration required' };
    }

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Call the actual API to create contact
      console.log('📡 Calling API to create contact...');
      const response = await addressBookAPI.createContact(contactData);
      console.log('📡 API Response:', response);

      // Check if API returned success: 0 (failure)
      if (response.success === 0) {
        console.log('❌ API returned failure:', response);
        // Handle validation errors from API
        let errorMessage = 'Failed to create contact';
        let validationErrors = {};

        if (response.errors) {
          // Keep the original errors object for form validation
          validationErrors = response.errors;
          // Convert errors object to readable message for fallback
          const errorMessages = Object.values(response.errors);
          if (errorMessages.length > 0) {
            errorMessage = errorMessages.join(', ');
          }
        }

        // Don't set global error - let the form handle validation errors
        dispatch({ type: 'SET_LOADING', payload: false });
        return { success: false, error: errorMessage, validationErrors };
      }
      
      // Handle success case
      console.log('✅ API Success! Processing response...');
      let successMessage = 'Contact created successfully';
      if (response.data && typeof response.data === 'string') {
        successMessage = response.data; // Use API success message if provided
      }

      // Map API fields to display fields for local state
      const name = [contactData.first_name, contactData.last_name]
        .filter(name => name && name.trim()) // Filter out empty/whitespace-only strings
        .join(' ');

      const displayContact = {
        id: response.data?.id || `contact-${Date.now()}`,
        name: name,
        first_name: contactData.first_name || '',
        last_name: contactData.last_name || '',
        email: contactData.email || '',
        phone: contactData.phone || '',
        whatsapp: contactData.whatsapp_number || '',
        whatsapp_number: contactData.whatsapp_number || '',
        company_id: contactData.company_id || '',
        group_id: contactData.group_id || '',
        groups: contactData.list || [],
        list: contactData.list || []
      };

      console.log('📝 Display contact created:', displayContact);

      // Add to local state, clear loading, and set success message
      console.log('🔄 Dispatching ADD_CONTACT to state...');
      dispatch({ type: 'ADD_CONTACT', payload: displayContact });
      dispatch({ type: 'SET_LOADING', payload: false });

      console.log('✅ Contact added to state successfully');
      // Return success with message (let the calling component handle displaying it)
      return { success: true, message: successMessage };
    } catch (error) {
      console.error('❌ Error creating contact:', error);
      console.error('❌ Error details:', error.message, error.stack);
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to create contact' });
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, error: error.message || 'Failed to create contact' };
    }
  };

  const updateContact = async (id, contactData) => {
    if (!hasAuthConfig()) {
      dispatch({ type: 'SET_ERROR', payload: 'Please configure API settings first' });
      return { success: false, error: 'API configuration required' };
    }

    // Map API fields to display fields for local state
    const name = [contactData.first_name, contactData.last_name]
      .filter(Boolean)
      .join(' ');
    
    const displayContact = {
      ...contactData,
      name: name,
      whatsapp: contactData.whatsapp_number,
      id: id
    };

    // Update local state only
    dispatch({ type: 'UPDATE_CONTACT', payload: displayContact });
    return { success: true };
  };

  const deleteContact = async (id) => {
    if (!hasAuthConfig()) {
      dispatch({ type: 'SET_ERROR', payload: 'Please configure API settings first' });
      return { success: false, error: 'API configuration required' };
    }

    // Update local state only
    dispatch({ type: 'DELETE_CONTACT', payload: id });
    return { success: true };
  };

  const bulkAddContacts = async (contactsData) => {
    if (!hasAuthConfig()) {
      dispatch({ type: 'SET_ERROR', payload: 'Please configure API settings first' });
      return { success: false, error: 'API configuration required' };
    }

    // Map contacts to display format and add to local state
    const displayContacts = contactsData.map(contact => {
      const name = [contact.first_name, contact.last_name]
        .filter(Boolean)
        .join(' ');
      
      return {
        ...contact,
        name: name,
        whatsapp: contact.whatsapp_number,
        id: `contact-${Date.now()}-${Math.random()}`
      };
    });

    dispatch({ type: 'BULK_ADD_CONTACTS', payload: displayContacts });
    return { success: true };
  };

  const addContactToGroups = (id, groups) => dispatch({ type: 'ADD_CONTACT_TO_GROUPS', payload: { contactId: id, groupName: groups } });
  const removeContactFromGroup = (id, group) => dispatch({ type: 'REMOVE_CONTACT_FROM_GROUP', payload: { contactId: id, groupName: group } });
  const clearError = () => dispatch({ type: 'SET_ERROR', payload: null });

  return { 
    ...state, 
    refreshContacts,
    addContact, 
    updateContact, 
    deleteContact, 
    bulkAddContacts, 
    addContactToGroups, 
    removeContactFromGroup, 
    clearError 
  };
};
