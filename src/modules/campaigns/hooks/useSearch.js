import { useState } from 'react';
import { searchContacts, searchGroups } from '../utils/searchAPI.js';

export const useSearch = () => {
  const [searchState, setSearchState] = useState({
    contacts: { results: [], loading: false, hasMore: true, query: '' },
    groups: { results: [], loading: false, hasMore: true, query: '' }
  });

  const searchContactsHandler = async (query, page = 1) => {
    setSearchState(prev => ({
      ...prev,
      contacts: { ...prev.contacts, loading: true, query }
    }));
    
    try {
      const result = await searchContacts(query, page);
      setSearchState(prev => ({
        ...prev,
        contacts: {
          results: page === 1 ? result.results : [...prev.contacts.results, ...result.results],
          loading: false,
          hasMore: result.hasMore,
          query,
          total: result.total
        }
      }));
    } catch (error) {
      setSearchState(prev => ({
        ...prev,
        contacts: { ...prev.contacts, loading: false }
      }));
    }
  };

  const searchGroupsHandler = async (query, page = 1) => {
    setSearchState(prev => ({
      ...prev,
      groups: { ...prev.groups, loading: true, query }
    }));
    
    try {
      const result = await searchGroups(query, page);
      setSearchState(prev => ({
        ...prev,
        groups: {
          results: page === 1 ? result.results : [...prev.groups.results, ...result.results],
          loading: false,
          hasMore: result.hasMore,
          query,
          total: result.total
        }
      }));
    } catch (error) {
      setSearchState(prev => ({
        ...prev,
        groups: { ...prev.groups, loading: false }
      }));
    }
  };

  const clearSearch = (type) => {
    setSearchState(prev => ({
      ...prev,
      [type]: { results: [], loading: false, hasMore: true, query: '' }
    }));
  };

  return {
    ...searchState,
    searchContacts: searchContactsHandler,
    searchGroups: searchGroupsHandler,
    clearSearch
  };
};
