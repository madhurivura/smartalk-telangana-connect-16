
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { User, LogOut, ChevronDown } from 'lucide-react';

const UserProfile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { language } = useLanguage();

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-[#44646f] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
      >
        <User size={16} />
        <span className="hidden md:inline">{user.name}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-20">
            <div className="px-4 py-2 border-b border-gray-200">
              <p className="text-sm font-medium text-[#3c392b]">{user.name}</p>
              <p className="text-xs text-[#5d5c54]">{user.email}</p>
            </div>
            
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full flex items-center space-x-2 px-4 py-2 text-left text-[#3c392b] hover:bg-gray-50 transition-colors"
            >
              <LogOut size={16} />
              <span>{language === 'english' ? 'Sign Out' : 'సైన్ అవుట్'}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
