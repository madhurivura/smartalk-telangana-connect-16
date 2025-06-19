
import React from 'react';
import { Users, Award, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const PersonalizedSchemes = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-[#cbccc1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3c392b] mb-4">
            {t('schemes.title')}
          </h2>
          <p className="text-lg text-[#5d5c54]">
            {t('schemes.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6 text-center">
            <div className="w-16 h-16 bg-[#44646f] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-[#44646f]" />
            </div>
            <h3 className="text-xl font-semibold text-[#3c392b] mb-3">
              {t('schemes.pensionSchemes')}
            </h3>
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
            <h3 className="text-xl font-semibold text-[#3c392b] mb-3">
              {t('schemes.educationSupport')}
            </h3>
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
            <h3 className="text-xl font-semibold text-[#3c392b] mb-3">
              {t('schemes.healthcareBenefits')}
            </h3>
            <p className="text-[#5d5c54] mb-4">
              {t('schemes.healthcareBenefitsDesc')}
            </p>
            <div className="text-sm text-[#44646f] font-medium">
              {t('schemes.healthcareCoverage')}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-[#5d5c54] mb-6">
            {t('schemes.howItWorks')}
          </p>
          <div className="bg-[#44646f] bg-opacity-10 rounded-lg p-6 max-w-2xl mx-auto">
            <h4 className="font-semibold text-[#3c392b] mb-2">{t('schemes.howItWorksTitle')}</h4>
            <ol className="text-left text-[#5d5c54] space-y-2">
              <li>{t('schemes.step1')}</li>
              <li>{t('schemes.step2')}</li>
              <li>{t('schemes.step3')}</li>
              <li>{t('schemes.step4')}</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedSchemes;
