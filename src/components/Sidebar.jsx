import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, FileText, Send, BarChart3, Megaphone } from 'lucide-react';

const Sidebar = ({ activeItem, onMenuItemClick }) => {
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(true);

  const menuItems = [
    {
      id: 'address-book',
      label: 'Address Book',
      icon: BookOpen,
      onClick: () => onMenuItemClick('address-book')
    },
    {
      id: 'templates',
      label: 'Templates',
      icon: FileText,
      onClick: () => onMenuItemClick('templates')
    },
    {
      id: 'campaigns',
      label: 'Campaigns',
      icon: Megaphone,
      onClick: () => onMenuItemClick('campaigns')
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: BarChart3,
      onClick: () => onMenuItemClick('reports')
    }
  ];

  return (
    <div className="w-64 bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-screen fixed left-0 top-0 shadow-sm">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">AI Console</h1>
        
        <nav className="space-y-2">
          <div>
            <button
              onClick={() => setIsBroadcastOpen(!isBroadcastOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200"
            >
              <span className="flex items-center space-x-3">
                <Send className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <span className="font-medium text-slate-700 dark:text-slate-300">Broadcast</span>
              </span>
              {isBroadcastOpen ? (
                <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-500 dark:text-slate-500" />
              )}
            </button>
            
            {isBroadcastOpen && (
              <div className="ml-4 mt-2 space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.onClick}
                      className={`w-full flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-200 ${
                        activeItem === item.id
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
