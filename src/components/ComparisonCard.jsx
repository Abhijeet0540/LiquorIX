import React, { useState } from 'react';
import { Star, TrendingUp, Info, CheckCircle2, ChevronRight, BarChart3, Droplets, Zap } from 'lucide-react';
import RadarChart from './RadarChart';

const ComparisonCard = ({ liquor, isHighlighted }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = liquor.images || [liquor.image];

  return (
    <div className={`relative flex flex-col h-full glass-morphism rounded-3xl overflow-hidden border-white/5 transition-all duration-700 card-hover group ${isHighlighted ? 'ring-2 ring-[#D4AF37]/40 scale-105 z-10' : 'opacity-80 hover:opacity-100'}`}>
      {/* Category & Tier Badges */}
      <div className="absolute top-6 left-6 flex flex-row gap-2 items-start align-center">
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] ${isHighlighted ? 'bg-[#D4AF37] text-black' : 'bg-white/10 text-white/60'}`}>
          {liquor.category}
        </span>
        {liquor.tier && (
          <span className="px-3 py-1.5 bg-red-600/20 text-red-500 border border-red-500/30 rounded-full text-[8px] font-black uppercase tracking-[0.3em] backdrop-blur-md animate-pulse">
            TIER: {liquor.tier}
          </span>
        )}
      </div>

      <div className="p-8 pb-0 pt-20 flex flex-col items-center text-center">
        <div className="mb-8 relative w-full h-[400px] flex items-center justify-center">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-[#D4AF37] opacity-5 rounded-full blur-[80px] group-hover:opacity-10 transition-opacity"></div>

          {/* Main Image with Transition */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-t-2xl">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${liquor.name} ${idx + 1}`}
                className={`absolute w-full h-full object-cover transition-all duration-700 pointer-events-none ${idx === activeImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95 blur-sm'}`}
              />
            ))}
          </div>

          {/* Carousel Navigation Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-30 mb-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${idx === activeImageIndex ? 'bg-[#D4AF37] w-6' : 'bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4 w-full">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-bold opacity-60">{liquor.type}</span>
            <h3 className="text-3xl font-serif font-bold text-white mt-1 group-hover:text-[#D4AF37] transition-colors">{liquor.name}</h3>
          </div>

          <div className="flex items-center justify-center space-x-6 text-2xl font-bold text-white py-4 border-y border-white/5">
            <span className="gold-gradient-text">₹{liquor.price.toLocaleString()}</span>
            <div className="w-1 h-6 bg-white/10"></div>
            <div className="flex items-center gap-1.5">
              <Star className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
              <span>{liquor.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8 flex-grow">
        {/* Taste Profile Radar */}
        <div className="py-6 flex flex-col items-center">
          <h4 className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mb-8">Taste Fingerprint</h4>
          <RadarChart data={liquor.tasteProfile} size={250} />
        </div>

        {/* AI Insight Section */}
        <div className="p-6 bg-[#D4AF37]/5 rounded-2xl border border-[#D4AF37]/10 relative overflow-hidden group/insight">
          <div className="absolute top-0 right-0 p-3 opacity-20 transform translate-x-1 group-hover/insight:-translate-x-1 transition-all">
            <Zap className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <h5 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-3">
            <BarChart3 className="w-4 h-4" />
            AI BUYER ANALYSIS
          </h5>
          <p className="text-sm text-white/70 leading-relaxed italic">
            "{liquor.aiInsight}"
          </p>
        </div>

        {/* Pros/Cons */}
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-3">
            <h5 className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Why buy this?</h5>
            {liquor.pros.map((pro, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-white/50">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                <span>{pro}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button className="w-full mt-6 py-4 bg-white/5 border border-white/10 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-all group flex items-center justify-center gap-2">
          EXPLORE RANGE
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ComparisonCard;
