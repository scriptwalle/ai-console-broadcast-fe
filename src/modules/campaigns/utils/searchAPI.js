import { generateMockContacts } from './scheduler.js';

const mockGroups = [
  { id: 'group-1', name: 'VIP Customers', contactCount: 25 },
  { id: 'group-2', name: 'Newsletter Subscribers', contactCount: 150 },
  { id: 'group-3', name: 'Active Users', contactCount: 300 },
  { id: 'group-4', name: 'Trial Users', contactCount: 75 },
  { id: 'group-5', name: 'Premium Members', contactCount: 50 }
];

const mockContacts = generateMockContacts(500);

export const searchContacts = async (query = '', page = 1, limit = 10) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const filtered = query
    ? mockContacts.filter(contact => 
        contact.name.toLowerCase().includes(query.toLowerCase()) ||
        contact.phone.includes(query) ||
        contact.email.toLowerCase().includes(query.toLowerCase())
      )
    : mockContacts;
  
  const start = (page - 1) * limit;
  const end = start + limit;
  const results = filtered.slice(start, end);
  
  return {
    results,
    hasMore: end < filtered.length,
    total: filtered.length
  };
};

export const searchGroups = async (query = '', page = 1, limit = 10) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const filtered = query
    ? mockGroups.filter(group => 
        group.name.toLowerCase().includes(query.toLowerCase())
      )
    : mockGroups;
  
  const start = (page - 1) * limit;
  const end = start + limit;
  const results = filtered.slice(start, end);
  
  return {
    results,
    hasMore: end < filtered.length,
    total: filtered.length
  };
};
