import { useReducer } from 'react';

const initialState = { groups: [], loading: false, error: null };

const groupsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING': return { ...state, loading: action.payload };
    case 'SET_ERROR': return { ...state, error: action.payload, loading: false };
    case 'SET_GROUPS': return { ...state, groups: action.payload, loading: false, error: null };
    case 'ADD_GROUP': return { ...state, groups: [...state.groups, { ...action.payload, id: `group-${Date.now()}`, contacts: [] }], loading: false, error: null };
    case 'UPDATE_GROUP': return { ...state, groups: state.groups.map(g => g.id === action.payload.id ? action.payload : g), loading: false, error: null };
    case 'DELETE_GROUP': return { ...state, groups: state.groups.filter(g => g.id !== action.payload), loading: false, error: null };
    case 'ADD_CONTACTS_TO_GROUP': return { ...state, groups: state.groups.map(g => g.id === action.payload.groupId ? { ...g, contacts: [...new Set([...g.contacts, ...action.payload.contactIds])] } : g) };
    case 'REMOVE_CONTACT_FROM_GROUP': return { ...state, groups: state.groups.map(g => g.id === action.payload.groupId ? { ...g, contacts: g.contacts.filter(c => c !== action.payload.contactId) } : g) };
    default: return state;
  }
};

export const useGroups = () => {
  const [state, dispatch] = useReducer(groupsReducer, initialState);
  const apiCall = async (type, payload) => { dispatch({ type: 'SET_LOADING', payload: true }); await new Promise(r => setTimeout(r, 500)); dispatch({ type, payload }); };
  return { ...state, addGroup: (d) => apiCall('ADD_GROUP', d).then(() => ({ success: true })), updateGroup: (id, d) => apiCall('UPDATE_GROUP', { ...d, id }).then(() => ({ success: true })), deleteGroup: (id) => apiCall('DELETE_GROUP', id).then(() => ({ success: true })), addContactsToGroup: (gid, cids) => dispatch({ type: 'ADD_CONTACTS_TO_GROUP', payload: { groupId: gid, contactIds: cids } }), removeContactFromGroup: (gid, cid) => dispatch({ type: 'REMOVE_CONTACT_FROM_GROUP', payload: { groupId: gid, contactId: cid } }), getGroupByName: (name) => state.groups.find(g => g.name.toLowerCase() === name.toLowerCase()), clearError: () => dispatch({ type: 'SET_ERROR', payload: null }) };
};
