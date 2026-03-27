import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ThemeToggle from './components/ThemeToggle';
import ProfileIcon from './components/ProfileIcon';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AddressBookPage } from './modules/address-book';
import { TemplatesPage } from './modules/templates';
import { CampaignsPage } from './modules/campaigns';
import { ReportsPage } from './modules/reports';

function AppContent() {
  const [activeView, setActiveView] = useState('address-book');

  const renderContent = () => {
    switch (activeView) {
      case 'address-book':
        return <AddressBookPage />;
      case 'templates':
        return <TemplatesPage />;
      case 'campaigns':
        return <CampaignsPage />;
      case 'reports':
        return <ReportsPage />;
      default:
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Dashboard</h2>
            <p className="text-slate-600 dark:text-slate-400">Welcome to AI Console Broadcast.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      <Sidebar activeItem={activeView} onMenuItemClick={setActiveView} />
      <div className="flex-1 ml-64">
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Broadcast Management</h1>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <ProfileIcon />
            </div>
          </div>
        </header>
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
