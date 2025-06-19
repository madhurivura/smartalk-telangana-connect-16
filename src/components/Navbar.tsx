
import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'telugu' : 'english');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#3c392b] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-[#e1dbd1]">SmartTalk Telangana</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-[#cbccc1] hover:text-[#e1dbd1] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {t('nav.about')}
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-[#cbccc1] hover:text-[#e1dbd1] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {t('nav.features')}
              </button>
              <button 
                onClick={() => scrollToSection('chatbot')}
                className="text-[#cbccc1] hover:text-[#e1dbd1] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {t('nav.chatbot')}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-[#cbccc1] hover:text-[#e1dbd1] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {t('nav.contact')}
              </button>
            </div>
          </div>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 bg-[#44646f] text-white px-3 py-1 rounded-md text-sm hover:bg-opacity-90 transition-colors"
            >
              <Globe size={16} />
              <span>{language === 'english' ? 'తెలుగు' : 'English'}</span>
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#cbccc1] hover:text-[#e1dbd1] p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#4d4330] rounded-md mt-2">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-[#cbccc1] hover:text-[#e1dbd1] block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
              >
                {t('nav.about')}
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-[#cbccc1] hover:text-[#e1dbd1] block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
              >
                {t('nav.features')}
              </button>
              <button 
                onClick={() => scrollToSection('chatbot')}
                className="text-[#cbccc1] hover:text-[#e1dbd1] block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
              >
                {t('nav.chatbot')}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-[#cbccc1] hover:text-[#e1dbd1] block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
              >
                {t('nav.contact')}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
