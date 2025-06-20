
import React from 'react';
import { CheckCircle, Clock, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ValueProposition = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-[#cbccc1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#3c392b] mb-6">
              {t('valueProposition.title')}
            </h2>
            <p className="text-xl text-[#44646f] font-semibold mb-8">
              {t('valueProposition.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#44646f] bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-[#44646f]" />
              </div>
              <h3 className="text-lg font-semibold text-[#3c392b] mb-2">{t('valueProposition.clearSteps')}</h3>
              <p className="text-[#5d5c54]">{t('valueProposition.clearStepsDesc')}</p>
            </div>

            <div className="text-center">
              <div className="bg-[#44646f] bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock size={32} className="text-[#44646f]" />
              </div>
              <h3 className="text-lg font-semibold text-[#3c392b] mb-2">{t('valueProposition.fewerDelays')}</h3>
              <p className="text-[#5d5c54]">{t('valueProposition.fewerDelaysDesc')}</p>
            </div>

            <div className="text-center">
              <div className="bg-[#44646f] bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target size={32} className="text-[#44646f]" />
              </div>
              <h3 className="text-lg font-semibold text-[#3c392b] mb-2">{t('valueProposition.smarterAccess')}</h3>
              <p className="text-[#5d5c54]">{t('valueProposition.smarterAccessDesc')}</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-[#44646f] bg-opacity-5 rounded-lg p-6">
              <p className="text-[#3c392b] font-medium text-lg">
                {t('valueProposition.quote')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
