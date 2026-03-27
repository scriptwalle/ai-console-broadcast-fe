import React from 'react';
import { Users, BookOpen } from 'lucide-react';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'contacts',
      label: 'Contacts',
      icon: BookOpen,
      description: 'Manage individual contacts'
    },
    {
      id: 'groups',
      label: 'Groups',
      icon: Users,
      description: 'Organize contacts into groups'
    }
  ];

  return (
    <div className="border-b border-slate-200 dark:border-slate-700">
      <nav className="flex space-x-8 px-6" aria-label="Tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'border-slate-600 dark:border-slate-400 text-slate-900 dark:text-slate-100'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <Icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default TabNavigation;
