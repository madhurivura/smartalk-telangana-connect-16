
import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

const Blog = () => {
  return (
    <section className="py-20 bg-[#cbccc1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3c392b] mb-4">
            Latest Updates
          </h2>
          <p className="text-lg text-[#5d5c54]">
            Stay informed about new government schemes and services
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 bg-[#44646f] bg-opacity-10 flex items-center justify-center">
              <div className="text-center">
                <Calendar size={48} className="text-[#44646f] mx-auto mb-4" />
                <p className="text-[#5d5c54] font-medium">Latest Blog Post</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-[#94928b] mb-3">
                <Calendar size={16} className="mr-2" />
                <span>December 19, 2024</span>
              </div>
              <h3 className="text-xl font-semibold text-[#3c392b] mb-3">
                Latest Updates on Government Schemes
              </h3>
              <p className="text-[#5d5c54] mb-4 leading-relaxed">
                Discover the newest government schemes available for Telangana residents, 
                including pension updates, healthcare benefits, and digital service improvements.
              </p>
              <button className="flex items-center text-[#44646f] font-medium hover:text-opacity-80 transition-colors">
                <span>Read More</span>
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
