
import React from 'react';
import { Smartphone, Wifi, Zap } from 'lucide-react';

const MobileShowcase = () => {
  return (
    <section className="py-20 bg-[#e1dbd1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mobile Mockup */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="bg-[#3c392b] rounded-3xl p-4 shadow-2xl">
                <div className="bg-[#e1dbd1] rounded-2xl p-6 h-96 w-64 flex flex-col justify-between">
                  <div>
                    <div className="bg-[#44646f] h-2 w-16 rounded mx-auto mb-6"></div>
                    <h4 className="text-[#3c392b] font-bold text-lg mb-4 text-center">SmartTalk</h4>
                    <div className="space-y-3">
                      <div className="bg-[#cbccc1] rounded-lg p-3">
                        <p className="text-[#5d5c54] text-sm">Hello! How can I help you today?</p>
                      </div>
                      <div className="bg-[#44646f] rounded-lg p-3 ml-8">
                        <p className="text-white text-sm">I need help with pension</p>
                      </div>
                      <div className="bg-[#cbccc1] rounded-lg p-3">
                        <p className="text-[#5d5c54] text-sm">I can help you with that...</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#44646f] rounded-lg p-2 flex items-center">
                    <div className="bg-white rounded w-full p-2">
                      <p className="text-[#5d5c54] text-xs">Type your message...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3c392b] mb-6">
              Accessible Even on 2G
            </h2>
            <p className="text-xl text-[#5d5c54] mb-8 leading-relaxed">
              Now accessible even on 2G phones. No app install needed. 
              Works directly in your mobile browser for maximum accessibility.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-[#44646f] bg-opacity-10 rounded-lg p-3">
                  <Smartphone size={24} className="text-[#44646f]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#3c392b] mb-2">No App Required</h3>
                  <p className="text-[#5d5c54]">Works on any phone with internet connection</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#44646f] bg-opacity-10 rounded-lg p-3">
                  <Wifi size={24} className="text-[#44646f]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#3c392b] mb-2">Low Bandwidth Optimized</h3>
                  <p className="text-[#5d5c54]">Designed to work smoothly on 2G and 3G networks</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#44646f] bg-opacity-10 rounded-lg p-3">
                  <Zap size={24} className="text-[#44646f]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#3c392b] mb-2">Fast Loading</h3>
                  <p className="text-[#5d5c54]">Optimized for quick responses even on slow connections</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileShowcase;
