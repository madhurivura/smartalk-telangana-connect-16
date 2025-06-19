
import React from 'react';
import { Globe, Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-[#3c392b] text-[#cbccc1] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <h3 className="text-xl font-bold text-[#e1dbd1] mb-4">{t('hero.title')}</h3>
            <p className="text-[#94928b] leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-[#e1dbd1] mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-[#94928b] hover:text-[#e1dbd1] transition-colors">{t('nav.about')}</a>
              </li>
              <li>
                <a href="#features" className="text-[#94928b] hover:text-[#e1dbd1] transition-colors">{t('nav.features')}</a>
              </li>
              <li>
                <a href="#chatbot" className="text-[#94928b] hover:text-[#e1dbd1] transition-colors">{t('nav.chatbot')}</a>
              </li>
              <li>
                <a href="#contact" className="text-[#94928b] hover:text-[#e1dbd1] transition-colors">{t('nav.contact')}</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-[#e1dbd1] mb-4">{t('footer.contactInfo')}</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-[#44646f]" />
                <span className="text-[#94928b]">{t('contact.supportEmail')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-[#44646f]" />
                <span className="text-[#94928b]">+91-40-XXXX-XXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe size={16} className="text-[#44646f]" />
                <span className="text-[#94928b]">{t('footer.availableIn')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#4d4330] mt-8 pt-8 text-center">
          <p className="text-[#94928b]">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
