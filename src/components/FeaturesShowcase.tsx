
import React, { useState } from 'react';
import { MessageCircle, FileText, CreditCard, MapPin, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TDocsSystem from './TDocsSystem';
import ENagrikCards from './ENagrikCards';
import EnhancedChatbot from './EnhancedChatbot';
import MeesevaCenterLocator from './MeesevaCenterLocator';

const FeaturesShowcase: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const { t } = useLanguage();

  const features = [
    {
      id: 'chatbot',
      icon: <MessageCircle size={32} className="text-[#44646f]" />,
      title: t('features.teluguChatbot'),
      description: t('features.teluguChatbotDesc'),
      component: <EnhancedChatbot />
    },
    {
      id: 'tdocs',
      icon: <FileText size={32} className="text-[#44646f]" />,
      title: t('features.tdocs'),
      description: t('features.tdocsDesc'),
      component: <TDocsSystem />
    },
    {
      id: 'enagrik',
      icon: <CreditCard size={32} className="text-[#44646f]" />,
      title: t('features.enagrik'),
      description: t('features.enagrikDesc'),
      component: <ENagrikCards />
    },
    {
      id: 'meeseva',
      icon: <MapPin size={32} className="text-[#44646f]" />,
      title: t('features.meesevaLocator'),
      description: t('features.meesevaLocatorDesc'),
      component: <MeesevaCenterLocator />
    }
  ];

  const governmentPortals = [
    {
      name: t('portals.meeseva.name'),
      description: t('portals.meeseva.description'),
      url: 'https://meeseva.telangana.gov.in/meeseva/home.htm',
      icon: '🏛️'
    },
    {
      name: t('portals.telanganaOfficial.name'),
      description: t('portals.telanganaOfficial.description'),
      url: 'https://www.telangana.gov.in/',
      icon: '🏢'
    },
    {
      name: t('portals.epass.name'),
      description: t('portals.epass.description'),
      url: 'https://telanganaepass.cgg.gov.in/',
      icon: '🎓'
    },
    {
      name: t('portals.prajavani.name'),
      description: t('portals.prajavani.description'),
      url: 'https://prajavani.telangana.gov.in/',
      icon: '🗣️'
    },
    {
      name: t('portals.ipass.name'),
      description: t('portals.ipass.description'),
      url: 'https://ipass.telangana.gov.in/',
      icon: '🏭'
    },
    {
      name: t('portals.bhuvan.name'),
      description: t('portals.bhuvan.description'),
      url: 'https://bhuvan.nrsc.gov.in/',
      icon: '🛰️'
    }
  ];

  const openFeature = (featureId: string) => {
    setActiveFeature(featureId);
  };

  const closeFeature = () => {
    setActiveFeature(null);
  };

  if (activeFeature) {
    const feature = features.find(f => f.id === activeFeature);
    return (
      <div className="min-h-screen bg-[#e1dbd1] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-[#3c392b]">
              {feature?.title}
            </h2>
            <button
              onClick={closeFeature}
              className="bg-[#44646f] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              {t('features.backToFeatures')}
            </button>
          </div>
          {feature?.component}
        </div>
      </div>
    );
  }

  return (
    <section id="features" className="py-20 bg-[#e1dbd1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3c392b] mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg text-[#5d5c54] max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => openFeature(feature.id)}
            >
              <div className="bg-[#44646f] bg-opacity-10 rounded-lg w-16 h-16 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#3c392b] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#5d5c54] leading-relaxed mb-4">
                {feature.description}
              </p>
              <button className="text-[#44646f] hover:text-[#3c392b] font-medium transition-colors">
                {t('features.tryNow')} →
              </button>
            </div>
          ))}
        </div>

        {/* Essential Government Portals Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-[#3c392b] mb-4">
              {t('portals.title')}
            </h3>
            <p className="text-lg text-[#5d5c54] max-w-2xl mx-auto">
              {t('portals.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {governmentPortals.map((portal, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl mb-2">{portal.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-[#3c392b] mb-2">
                      {portal.name}
                    </h4>
                    <p className="text-[#5d5c54] text-sm leading-relaxed mb-4">
                      {portal.description}
                    </p>
                    <a
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-[#44646f] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors text-sm font-medium"
                    >
                      <span>{t('portals.visitButton')}</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
