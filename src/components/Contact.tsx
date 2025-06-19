
import React, { useState } from 'react';
import { Mail, User, MessageSquare, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission logic here
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-[#e1dbd1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3c392b] mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-[#5d5c54]">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#3c392b] mb-2">
                {t('contact.fullName')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={20} className="text-[#94928b]" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-[#cbccc1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44646f] focus:border-transparent"
                  placeholder={t('contact.enterName')}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#3c392b] mb-2">
                {t('contact.emailAddress')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={20} className="text-[#94928b]" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-[#cbccc1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44646f] focus:border-transparent"
                  placeholder={t('contact.enterEmail')}
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#3c392b] mb-2">
                {t('contact.message')}
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MessageSquare size={20} className="text-[#94928b]" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="block w-full pl-10 pr-3 py-3 border border-[#cbccc1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44646f] focus:border-transparent resize-none"
                  placeholder={t('contact.messagePlaceholder')}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-[#44646f] hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>{t('contact.sendMessage')}</span>
              </button>
            </div>
          </form>

          {/* Contact Info */}
          <div className="mt-8 pt-8 border-t border-[#cbccc1] text-center">
            <p className="text-[#5d5c54] mb-2">
              {t('contact.supportText')}
            </p>
            <p className="text-[#44646f] font-medium">
              {t('contact.supportEmail')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
