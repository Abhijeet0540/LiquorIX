import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { liquors } from '../data/liquors';
import Navbar from '../components/Navbar';
import RadarChart from '../components/RadarChart';
import { ArrowLeft, MapPin, Calendar, Utensils, Zap, Globe, ShieldCheck } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const LiquorDetail = () => {
  const { id } = useParams();
  const liquor = liquors.find(l => l.id === id);
  const [activeImage, setActiveImage] = useState(0);

  useGSAP(() => {
    window.scrollTo(0, 0);
    // Ensure detail-card and data-row are visible
    gsap.from(".detail-card", { 
      scale: 0.9, 
      opacity: 0, 
      duration: 1.2, 
      ease: "slow(0.7, 0.7, false)",
      clearProps: "all" // Clear any leftover inline styles after animation
    });
    gsap.from(".data-row", { 
      y: 20, 
      opacity: 0, 
      stagger: 0.1, 
      duration: 0.8, 
      ease: "power3.out", 
      delay: 0.5,
      clearProps: "all"
    });
  }, [id]);

  if (!liquor) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
      <div className="text-center space-y-6">
        <h2 className="text-4xl font-serif">Brand not found</h2>
        <Link to="/" className="text-[#D4AF37] uppercase tracking-widest text-xs font-bold hover:underline">
          Return to collection
        </Link>
      </div>
    </div>
  );

  const images = liquor.images || [];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-white/30 hover:text-[#D4AF37] transition-all mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase text-[10px] font-bold tracking-[0.3em]">Back to Selection</span>
        </Link>

        {/* Compact Detail Card System */}
        <div className="detail-card glass-morphism rounded-[40px] border-white/5 overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent shadow-3xl opacity-100">
           <div className="grid grid-cols-1 lg:grid-cols-2">
              
              {/* Left: Immersive Visual Area */}
              <div className="relative h-[60vh] lg:h-auto bg-black/40 border-r border-white/5 overflow-hidden group">
                 <div className="absolute inset-0 bg-[#D4AF37] opacity-[0.03] blur-[150px] rounded-full"></div>
                 
                 <div className="relative w-full h-full flex items-center justify-center p-12 overflow-hidden">
                    {images.map((img, idx) => (
                      <img 
                        key={idx}
                        src={img} 
                        alt={liquor.name} 
                        className={`absolute h-[80%] w-auto object-cover transition-all duration-1000 ${idx === activeImage ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                        loading="eager"
                      />
                    ))}
                 </div>

                 {/* Minimal Thumbnail Bar */}
                 {images.length > 1 && (
                   <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                     {images.map((_, idx) => (
                       <button
                         key={idx}
                         onClick={() => setActiveImage(idx)}
                         className={`w-2 h-2 rounded-full transition-all ${idx === activeImage ? 'bg-[#D4AF37] w-8' : 'bg-white/20 hover:bg-white/40'}`}
                       />
                     ))}
                   </div>
                 )}
              </div>

              {/* Right: Data Focus */}
              <div className="p-8 lg:p-16 flex flex-col justify-between">
                 <div className="space-y-10">
                    <div className="data-row space-y-4">
                       <span className="px-5 py-1.5 bg-[#D4AF37] text-black font-black text-[9px] uppercase tracking-[0.4em] rounded-full inline-block">
                          {liquor.tier}
                       </span>
                       <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-tight">
                          {liquor.name}
                       </h1>
                       <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                          <Globe className="w-4 h-4" />
                          {liquor.type}
                       </div>
                    </div>

                    <div className="data-row grid grid-cols-2 gap-8 py-8 border-y border-white/5">
                       <div className="space-y-1">
                          <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold flex items-center gap-2">
                            <MapPin className="w-3 h-3" /> Origin
                          </span>
                          <p className="text-sm font-bold text-white uppercase tracking-widest">{liquor.origin}</p>
                       </div>
                       <div className="space-y-1">
                          <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold flex items-center gap-2">
                            <Calendar className="w-3 h-3" /> Alcohol
                          </span>
                          <p className="text-sm font-bold text-white uppercase tracking-widest">{liquor.alcoholPercent}% ABV</p>
                       </div>
                    </div>

                    <div className="data-row space-y-4">
                       <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                          <Zap className="w-4 h-4 fill-[#D4AF37]" /> AI Insight
                       </h4>
                       <p className="text-lg text-white/60 font-light leading-relaxed italic">
                         "{liquor.aiInsight}"
                       </p>
                    </div>

                    <div className="data-row grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                       <div className="space-y-6">
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Taste Profile</h4>
                          <RadarChart data={liquor.tasteProfile} size={220} />
                       </div>
                       <div className="space-y-6">
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Distillery Notes</h4>
                          <p className="text-sm text-white/40 leading-relaxed font-light line-clamp-6">
                            {liquor.distilleryNotes}
                          </p>
                       </div>
                    </div>
                 </div>

                 <div className="data-row mt-16 flex items-center gap-6">
                    <button className="flex-grow py-5 bg-[#D4AF37] text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-xl hover:scale-105 transition-all shadow-2xl shadow-[#D4AF37]/20">
                       CHECK STOCK IN NAGPUR
                    </button>
                    <button className="p-5 glass-morphism border-white/10 text-white rounded-xl hover:bg-white/5 transition-all group">
                       <ShieldCheck className="w-5 h-5 group-hover:text-[#D4AF37] transition-all" />
                    </button>
                 </div>
              </div>

           </div>
        </div>

        {/* Pairings Section - Simplified */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
           {liquor.foodPairing.map((food, i) => (
             <div key={i} className="data-row flex items-center gap-4 p-6 glass-morphism rounded-3xl border-white/5 hover:border-[#D4AF37]/30 transition-all cursor-crosshair group">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                   <Utensils className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                   <span className="text-[8px] text-white/30 font-bold tracking-widest uppercase">Pairing Recommendation</span>
                   <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">{food}</span>
                </div>
             </div>
           ))}
        </div>

      </main>

      <footer className="py-20 text-center opacity-30 text-[10px] font-bold uppercase tracking-[0.5em] border-t border-white/5 mt-20">
         LiquorIX &copy; Elite Distillery Collective
      </footer>
    </div>
  );
};

export default LiquorDetail;
