import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import AuthModal from './AuthModal.jsx';

const ProfileIcon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasAuthKey, setHasAuthKey] = useState(false);

  useEffect(() => {
    const checkAuthConfig = () => {
      const savedKey = localStorage.getItem('authKey');
      const savedGroupId = localStorage.getItem('groupId');
      setHasAuthKey(!!savedKey && !!savedGroupId);
    };

    checkAuthConfig();
    
    const handleStorageChange = () => {
      checkAuthConfig();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="relative p-2 rounded-lg transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 group"
        aria-label="API Configuration"
        title="API Configuration"
      >
        <User className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
        {hasAuthKey && (
          <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
        )}
      </button>
      
      <AuthModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default ProfileIcon;
