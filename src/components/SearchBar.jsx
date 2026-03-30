import React from 'react';
import { Search, MapPin, SlidersHorizontal, ChevronDown } from 'lucide-react';

const SearchBar = ({ onSearchChange }) => {
  return (
    <div className="relative z-30 max-w-5xl mx-auto -mt-20 px-6 lg:px-0 mb-20">
      <div className="glass-morphism p-4  mt-15 rounded-[32px] border-white/10 shadow-3xl bg-white/[0.05] backdrop-blur-2xl animate-slide-up">
        <div className="flex flex-col md:flex-row items-stretch gap-4">

          {/* Main Search Input */}
          <div className="flex-grow flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 transition-all focus-within:border-[#D4AF37]/50 focus-within:bg-white/10 group">
            <Search className="w-5 h-5 text-white/30 group-focus-within:text-[#D4AF37] transition-colors" />
            <input
              type="text"
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search by brand, type, or region..."
              className="bg-transparent border-none outline-none text-white placeholder-white/20 w-full font-medium"
            />
          </div>

          {/* Location Selector */}
          <div className="md:w-64 flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 hover:border-white/20 transition-all cursor-pointer group">
            <MapPin className="w-5 h-5 text-[#D4AF37] opacity-60 group-hover:opacity-100" />
            <div className="flex flex-col text-left overflow-hidden">
              <span className="text-[10px] uppercase font-bold text-white/30 tracking-widest">REGION</span>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold truncate">NAGPUR, MH</span>
                <ChevronDown className="w-4 h-4 text-white/20" />
              </div>
            </div>
          </div>

          {/* Filters Toggle */}
          <button className="flex items-center justify-center gap-4 bg-[#D4AF37] text-black rounded-2xl px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-[#F5E0A9] transition-all active:scale-95 shadow-xl shadow-[#D4AF37]/20">
            <SlidersHorizontal className="w-4 h-4" />
            FILTERS
          </button>
        </div>

        {/* Quick Filter Badges */}
        <div className="mt-4 flex flex-wrap gap-2 px-2 overflow-auto scrollbar-hide">
          {['Whiskey', 'Single Malt', 'Aged 12Y+', 'Under ₹5000', 'Top Rated', 'Smooth'].map((filter, i) => (
            <button key={i} className="px-5 py-2.5 rounded-full border border-white/5 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all whitespace-nowrap">
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
