
import React from 'react';
import { Users, Award, Heart } from 'lucide-react';

const PersonalizedSchemes = () => {
  return (
    <section className="py-20 bg-[#cbccc1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3c392b] mb-4">
            Find Your Eligible Schemes
          </h2>
          <p className="text-lg text-[#5d5c54]">
            Discover government schemes tailored for you based on your profile
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6 text-center">
            <div className="w-16 h-16 bg-[#44646f] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-[#44646f]" />
            </div>
            <h3 className="text-xl font-semibold text-[#3c392b] mb-3">
              Pension Schemes
            </h3>
            <p className="text-[#5d5c54] mb-4">
              Old age, widow, and disability pensions for eligible citizens
            </p>
            <div className="text-sm text-[#44646f] font-medium">
              Monthly benefits up to ₹3,016
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6 text-center">
            <div className="w-16 h-16 bg-[#44646f] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={32} className="text-[#44646f]" />
            </div>
            <h3 className="text-xl font-semibold text-[#3c392b] mb-3">
              Education Support
            </h3>
            <p className="text-[#5d5c54] mb-4">
              Scholarships and educational assistance for students
            </p>
            <div className="text-sm text-[#44646f] font-medium">
              Various amounts based on category
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6 text-center">
            <div className="w-16 h-16 bg-[#44646f] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-[#44646f]" />
            </div>
            <h3 className="text-xl font-semibold text-[#3c392b] mb-3">
              Healthcare Benefits
            </h3>
            <p className="text-[#5d5c54] mb-4">
              Medical insurance and healthcare support schemes
            </p>
            <div className="text-sm text-[#44646f] font-medium">
              Coverage up to ₹5 lakhs
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-[#5d5c54] mb-6">
            Use our smart assistant below to find schemes you're eligible for
          </p>
          <div className="bg-[#44646f] bg-opacity-10 rounded-lg p-6 max-w-2xl mx-auto">
            <h4 className="font-semibold text-[#3c392b] mb-2">How it works:</h4>
            <ol className="text-left text-[#5d5c54] space-y-2">
              <li>1. Answer a few simple questions about yourself</li>
              <li>2. Our AI will analyze your eligibility</li>
              <li>3. Get a personalized list of schemes you can apply for</li>
              <li>4. Download detailed information and application process</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedSchemes;
