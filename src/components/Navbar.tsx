
import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (newLanguage: 'english' | 'telugu' | 'hindi') => {
    setLanguage(newLanguage);
    setShowLanguageMenu(false);
  };

  const getLanguageLabel = () => {
    switch (language) {
      case 'telugu': return 'తె';
      case 'hindi': return 'हि';
      default: return 'EN';
    }
  };

  return (
    <nav className="bg-[#3c392b] text-[#e1dbd1] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold">SmartTalk</h1>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#about" className="hover:bg-[#44646f] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                {t('nav.about')}
              </a>
              <a href="#features" className="hover:bg-[#44646f] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                {t('nav.features')}
              </a>
              <a href="#chatbot" className="hover:bg-[#44646f] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                {t('nav.chatbot')}
              </a>
              <a href="#contact" className="hover:bg-[#44646f] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                {t('nav.contact')}
              </a>
              
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="flex items-center space-x-1 hover:bg-[#44646f] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <Globe size={16} />
                  <span>{getLanguageLabel()}</span>
                </button>
                
                {showLanguageMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <button
                      onClick={() => handleLanguageChange('english')}
                      className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${language === 'english' ? 'bg-gray-100 font-semibold' : ''}`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => handleLanguageChange('hindi')}
                      className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${language === 'hindi' ? 'bg-gray-100 font-semibold' : ''}`}
                    >
                      हिंदी (Hindi)
                    </button>
                    <button
                      onClick={() => handleLanguageChange('telugu')}
                      className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${language === 'telugu' ? 'bg-gray-100 font-semibold' : ''}`}
                    >
                      తెలుగు (Telugu)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-[#44646f] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#44646f]">
            <a href="#about" className="block hover:bg-[#3c392b] px-3 py-2 rounded-md text-base font-medium">
              {t('nav.about')}
            </a>
            <a href="#features" className="block hover:bg-[#3c392b] px-3 py-2 rounded-md text-base font-medium">
              {t('nav.features')}
            </a>
            <a href="#chatbot" className="block hover:bg-[#3c392b] px-3 py-2 rounded-md text-base font-medium">
              {t('nav.chatbot')}
            </a>
            <a href="#contact" className="block hover:bg-[#3c392b] px-3 py-2 rounded-md text-base font-medium">
              {t('nav.contact')}
            </a>
            
            <div className="pt-2 border-t border-[#3c392b]">
              <div className="text-sm font-medium px-3 py-1 text-[#cbccc1]">भाषा / Language / భాష:</div>
              <button
                onClick={() => handleLanguageChange('english')}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-[#3c392b] ${language === 'english' ? 'bg-[#3c392b]' : ''}`}
              >
                English
              </button>
              <button
                onClick={() => handleLanguageChange('hindi')}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-[#3c392b] ${language === 'hindi' ? 'bg-[#3c392b]' : ''}`}
              >
                हिंदी (Hindi)
              </button>
              <button
                onClick={() => handleLanguageChange('telugu')}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-[#3c392b] ${language === 'telugu' ? 'bg-[#3c392b]' : ''}`}
              >
                తెలుగు (Telugu)
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
