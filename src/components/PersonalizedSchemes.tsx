
import React, { useState } from 'react';
import { Users, Award, Heart, Volume2, Mic } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import EnhancedSchemeQuestionnaire from './EnhancedSchemeQuestionnaire';

const PersonalizedSchemes = () => {
  const { t } = useLanguage();
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  
  if (showQuestionnaire) {
    return (
      <section className="py-20 bg-[#cbccc1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-[#3c392b]">
              {t('schemes.title')}
            </h2>
            <button
              onClick={() => setShowQuestionnaire(false)}
              className="bg-[#44646f] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              ← वापस / Back / వెనుకకు
            </button>
          </div>
          <EnhancedSchemeQuestionnaire />
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-20 bg-[#cbccc1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#3c392b]">
              {t('schemes.title')}
            </h2>
            <div className="flex space-x-2">
              <button className="p-2 bg-[#44646f] bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors" title={t('audio.speakInTelugu')}>
                <Mic size={20} className="text-[#44646f]" />
              </button>
              <button className="p-2 bg-[#44646f] bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors" title={t('audio.listenInTelugu')}>
                <Volume2 size={20} className="text-[#44646f]" />
              </button>
            </div>
          </div>
          <p className="text-lg text-[#5d5c54]">
            {t('schemes.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6 text-center">
            <div className="w-16 h-16 bg-[#44646f] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-[#44646f]" />
            </div>
            <div className="flex items-center justify-center space-x-2 mb-3">
              <h3 className="text-xl font-semibold text-[#3c392b]">
                {t('schemes.pensionSchemes')}
              </h3>
              <button className="p-1 text-[#44646f] hover:bg-[#44646f] hover:bg-opacity-10 rounded" title={t('audio.listenInTelugu')}>
                <Volume2 size={16} />
              </button>
            </div>
            <p className="text-[#5d5c54] mb-4">
              {t('schemes.pensionSchemesDesc')}
            </p>
            <div className="text-sm text-[#44646f] font-medium">
              {t('schemes.pensionBenefits')}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6 text-center">
            <div className="w-16 h-16 bg-[#44646f] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={32} className="text-[#44646f]" />
            </div>
            <div className="flex items-center justify-center space-x-2 mb-3">
              <h3 className="text-xl font-semibold text-[#3c392b]">
                {t('schemes.educationSupport')}
              </h3>
              <button className="p-1 text-[#44646f] hover:bg-[#44646f] hover:bg-opacity-10 rounded" title={t('audio.listenInTelugu')}>
                <Volume2 size={16} />
              </button>
            </div>
            <p className="text-[#5d5c54] mb-4">
              {t('schemes.educationSupportDesc')}
            </p>
            <div className="text-sm text-[#44646f] font-medium">
              {t('schemes.educationBenefits')}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6 text-center">
            <div className="w-16 h-16 bg-[#44646f] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-[#44646f]" />
            </div>
            <div className="flex items-center justify-center space-x-2 mb-3">
              <h3 className="text-xl font-semibold text-[#3c392b]">
                {t('schemes.healthcareBenefits')}
              </h3>
              <button className="p-1 text-[#44646f] hover:bg-[#44646f] hover:bg-opacity-10 rounded" title={t('audio.listenInTelugu')}>
                <Volume2 size={16} />
              </button>
            </div>
            <p className="text-[#5d5c54] mb-4">
              {t('schemes.healthcareBenefitsDesc')}
            </p>
            <div className="text-sm text-[#44646f] font-medium">
              {t('schemes.healthcareCoverage')}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <p className="text-lg text-[#5d5c54]">
              {t('schemes.howItWorks')}
            </p>
            <button className="p-1 text-[#44646f] hover:bg-[#44646f] hover:bg-opacity-10 rounded" title={t('audio.listenInTelugu')}>
              <Volume2 size={16} />
            </button>
          </div>
          <div className="bg-[#44646f] bg-opacity-10 rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <h4 className="font-semibold text-[#3c392b] mb-2">{t('schemes.howItWorksTitle')}</h4>
            <ol className="text-left text-[#5d5c54] space-y-2">
              <li>{t('schemes.step1')}</li>
              <li>{t('schemes.step2')}</li>
              <li>{t('schemes.step3')}</li>
              <li>{t('schemes.step4')}</li>
            </ol>
          </div>
          
          <button
            onClick={() => setShowQuestionnaire(true)}
            className="bg-[#44646f] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors transform hover:scale-105"
          >
            विस्तृत प्रश्नावली शुरू करें / Start Detailed Questionnaire / వివరణాత్మక ప్రశ్నావళి ప్రారంభించండి
          </button>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedSchemes;
