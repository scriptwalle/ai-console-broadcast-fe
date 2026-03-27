import React, { useState } from 'react';
import TabNavigation from '../components/TabNavigation.jsx';
import ContactsPage from './ContactsPage.jsx';
import GroupsPage from './GroupsPage.jsx';

const AddressBookPage = () => {
  const [activeTab, setActiveTab] = useState('contacts');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'contacts':
        return <ContactsPage />;
      case 'groups':
        return <GroupsPage />;
      default:
        return <ContactsPage />;
    }
  };

  return (
    <div className="min-h-full">
      <div className="bg-white dark:bg-slate-800 shadow-sm">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Address Book</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Manage your contacts and organize them into groups for efficient communication.
          </p>
        </div>
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default AddressBookPage;
