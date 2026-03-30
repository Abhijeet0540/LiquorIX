import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ComparisonCard from '../components/ComparisonCard';
import { liquors } from '../data/liquors';
import { Link } from 'react-router-dom';
import { ArrowLeft, SlidersHorizontal, Search } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const Gallery = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLiquors = liquors.filter(liquor => 
    liquor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    liquor.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    liquor.origin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useGSAP(() => {
    window.scrollTo(0, 0);
    gsap.from(".gallery-header", { 
      y: -20, 
      opacity: 0, 
      duration: 1, 
      ease: "power3.out",
      clearProps: "all"
    });
    gsap.from(".gallery-card", { 
      scale: 0.9, 
      opacity: 0, 
      stagger: 0.1, 
      duration: 0.8, 
      ease: "power2.out",
      delay: 0.3,
      clearProps: "all"
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      <Navbar />

      <main className="pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="gallery-header mb-16 space-y-6">
          <Link to="/" className="inline-flex items-center gap-2 text-white/30 hover:text-[#D4AF37] transition-all group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="uppercase text-[10px] font-bold tracking-[0.3em]">Back to Home</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight">
                The <span className="gold-gradient-text italic font-normal">Collective</span>
              </h1>
              <p className="text-white/40 text-lg font-light max-w-xl leading-relaxed">
                Explore our curated index of {filteredLiquors.length} premier spirits, updated daily for the Nagpur market.
              </p>
            </div>

            {/* Practical Filter/Search Controls for Gallery */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#D4AF37] transition-colors" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find a brand, type..." 
                  className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-4 text-sm focus:border-[#D4AF37]/50 focus:bg-white/10 transition-all outline-none w-64 md:w-80 text-white"
                />
              </div>
              <button className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                <SlidersHorizontal className="w-5 h-5 text-[#D4AF37]" />
              </button>
            </div>
          </div>
        </div>

        {/* Global Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
          {filteredLiquors.map((liquor, index) => (
            <div key={liquor.id} className="gallery-card">
              <Link 
                to={`/liquor/${liquor.id}`} 
                className="block no-underline transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <ComparisonCard 
                   liquor={liquor} 
                   isHighlighted={false} 
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Dynamic Footer for Gallery */}
        <div className="mt-32 text-center py-20 border-t border-white/5">
           <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">
              LiquorIX &copy; Elite Distillery Collective. Showing {filteredLiquors.length} of {liquors.length} indexed brands for Nagpur.
           </p>
        </div>
      </main>
    </div>
  );
};

export default Gallery;
