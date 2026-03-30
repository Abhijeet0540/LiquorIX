import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { liquors } from '../data/liquors';
import { Search, ChevronDown, CheckCircle2, X, ArrowRight, Zap, Star, MapPin, Calendar, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import RadarChart from '../components/RadarChart';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Compare = () => {
  const [leftLiquor, setLeftLiquor] = useState(liquors[0]);
  const [rightLiquor, setRightLiquor] = useState(liquors[1]);
  const [showSearch, setShowSearch] = useState({ side: null, query: '' });

  useGSAP(() => {
    gsap.from(".compare-header", { y: -30, opacity: 0, duration: 1, ease: "power4.out" });
    gsap.from(".compare-item", { scale: 0.95, opacity: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" });
    gsap.from(".compare-table", { y: 20, opacity: 0, duration: 1, delay: 0.4, ease: "power3.out" });
  }, [leftLiquor, rightLiquor]);

  const filteredLiquors = liquors.filter(l => 
    l.name.toLowerCase().includes(showSearch.query.toLowerCase())
  );

  const selectLiquor = (liquor) => {
    if (showSearch.side === 'left') setLeftLiquor(liquor);
    else setRightLiquor(liquor);
    setShowSearch({ side: null, query: '' });
  };

  const SpecRow = ({ label, left, right, highlight = false }) => (
    <div className={`grid grid-cols-3 gap-4 py-8 border-b border-white/5 items-center ${highlight ? 'bg-white/[0.02]' : ''}`}>
      <div className="text-right px-4 space-y-1">
         <span className="text-xl font-bold text-white tracking-tight">{left}</span>
      </div>
      <div className="text-center">
         <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.4em]">{label}</span>
      </div>
      <div className="text-left px-4 space-y-1">
         <span className="text-xl font-bold text-white tracking-tight">{right}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      <Navbar />

      <main className="pt-32 pb-20 px-4 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="compare-header text-center mb-24 space-y-6">
          <h1 className="text-5xl md:text-8xl font-serif font-bold tracking-tighter">
            The <span className="gold-gradient-text italic font-normal">Duel</span>
          </h1>
          <p className="text-white/40 text-lg font-light tracking-wide max-w-2xl mx-auto">
            Parallel analytical comparison between premier distillery expressions. Data-driven decision making for the refined palate.
          </p>
        </div>

        {/* Dual Selector Interface */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start relative">
          {/* Connector Element for Desktop */}
          <div className="hidden lg:flex absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#050505] border border-white/10 items-center justify-center z-20">
             <span className="text-[#D4AF37] font-serif italic text-2xl">vs</span>
          </div>

          {/* Left Side */}
          <div className="compare-item space-y-8">
            <div 
              onClick={() => setShowSearch({ side: 'left', query: '' })}
              className="group relative cursor-pointer glass-morphism rounded-3xl p-8 border-white/5 hover:border-[#D4AF37]/30 transition-all overflow-hidden h-[500px] lg:h-[600px] flex flex-col justify-end"
            >
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black to-transparent z-10"></div>
              <img 
                src={leftLiquor.images?.[0] || leftLiquor.image} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="relative z-20 space-y-4">
                 <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4AF37]">Candidate alpha</span>
                 <h2 className="text-4xl lg:text-5xl font-serif font-bold">{leftLiquor.name}</h2>
                 <p className="text-white/40 text-sm font-medium uppercase tracking-widest flex items-center gap-2">
                    RE-SELECT BRAND <ChevronDown className="w-4 h-4" />
                 </p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="compare-item space-y-8">
            <div 
              onClick={() => setShowSearch({ side: 'right', query: '' })}
              className="group relative cursor-pointer glass-morphism rounded-3xl p-8 border-white/5 hover:border-[#D4AF37]/30 transition-all overflow-hidden h-[500px] lg:h-[600px] flex flex-col justify-end"
            >
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black to-transparent z-10"></div>
              <img 
                src={rightLiquor.images?.[0] || rightLiquor.image} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="relative z-20 space-y-4">
                 <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4AF37]">Candidate beta</span>
                 <h2 className="text-4xl lg:text-5xl font-serif font-bold">{rightLiquor.name}</h2>
                 <p className="text-white/40 text-sm font-medium uppercase tracking-widest flex items-center gap-2">
                    RE-SELECT BRAND <ChevronDown className="w-4 h-4" />
                 </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Spec Comparison Table */}
        <div className="compare-table mt-32 space-y-12">
            <div className="text-center py-10 border-y border-white/5">
                <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20">Analytical Breakdown</span>
            </div>
            
            <div className="glass-morphism rounded-[32px] border-white/5 overflow-hidden">
                <SpecRow label="Tast Score" left={leftLiquor.rating} right={rightLiquor.rating} highlight={true} />
                <SpecRow label="Nagpur Index Price" left={`₹${leftLiquor.price}`} right={`₹${rightLiquor.price}`} />
                <SpecRow label="Alcohol content" left={`${leftLiquor.alcoholPercent}%`} right={`${rightLiquor.alcoholPercent}%`} highlight={true} />
                <SpecRow label="Distillery Location" left={leftLiquor.origin} right={rightLiquor.origin} />
                <SpecRow label="Age Statement" left={leftLiquor.age} right={rightLiquor.age} highlight={true} />
            </div>
        </div>

        {/* Taste Profile Head-to-Head */}
        <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
                <div className="space-y-4">
                    <h3 className="text-4xl font-serif font-bold tracking-tight">Taste <span className="gold-gradient-text italic">Fingerprints</span></h3>
                    <p className="text-white/40 leading-relaxed font-light">
                        Comparing the multi-dimensional flavor profiles of {leftLiquor.name} and {rightLiquor.name}. 
                        Each axis represents a distinct aromatic quality identified by our AI analytics.
                    </p>
                </div>

                {/* Left Mini Highlights */}
                <div className="flex gap-4">
                    <div className="p-6 bg-white/5 rounded-2xl flex-grow border-l-4 border-[#D4AF37]">
                        <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Alpha Profile</span>
                        <h4 className="text-sm font-bold mt-2 uppercase">{leftLiquor.name}</h4>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl flex-grow border-l-4 border-red-500/40">
                        <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Beta Profile</span>
                        <h4 className="text-sm font-bold mt-2 uppercase">{rightLiquor.name}</h4>
                    </div>
                </div>
            </div>

            <div className="relative h-[400px] flex items-center justify-center p-10 glass-morphism rounded-[40px] border-white/10">
                <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[#D4AF37] to-transparent"></div>
                <div className="scale-125">
                   <RadarChart data={leftLiquor.tasteProfile} size={250} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                    <RadarChart data={rightLiquor.tasteProfile} size={400} />
                </div>
            </div>
        </div>

        {/* Brand Link CTAs */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-2 gap-10">
            <Link to={`/liquor/${leftLiquor.id}`} className="p-10 glass-morphism rounded-3xl border-white/5 hover:border-[#D4AF37]/40 transition-all text-center group">
               <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-[#D4AF37] transition-colors">See Complete Spec</span>
               <h4 className="text-2xl font-bold mt-4 uppercase group-hover:translate-x-2 transition-transform inline-flex items-center gap-4">
                  {leftLiquor.name} <ArrowRight className="w-6 h-6" />
               </h4>
            </Link>
            <Link to={`/liquor/${rightLiquor.id}`} className="p-10 glass-morphism rounded-3xl border-white/5 hover:border-[#D4AF37]/40 transition-all text-center group">
               <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-[#D4AF37] transition-colors">See Complete Spec</span>
               <h4 className="text-2xl font-bold mt-4 uppercase group-hover:translate-x-2 transition-transform inline-flex items-center gap-4">
                  {rightLiquor.name} <ArrowRight className="w-6 h-6" />
               </h4>
            </Link>
        </div>
      </main>

      {/* Search Overlay Selector */}
      {showSearch.side && (
        <div className="fixed inset-0 z-[100] backdrop-blur-2xl bg-black/80 flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
           <div className="w-full max-w-2xl bg-white/[0.03] border border-white/10 rounded-[40px] shadow-3xl flex flex-col p-8 lg:p-12 max-h-[80vh]">
              <div className="flex items-center justify-between mb-10">
                 <h2 className="text-3xl font-serif font-bold">Select <span className="gold-gradient-text italic font-normal">Expression</span></h2>
                 <button onClick={() => setShowSearch({ side: null, query: '' })} className="p-3 hover:bg-white/10 rounded-full transition-colors">
                    <X className="w-6 h-6" />
                 </button>
              </div>

              <div className="relative mb-12">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                 <input 
                   autoFocus
                   type="text" 
                   placeholder="Type to search brands..." 
                   className="w-full bg-white/5 border border-white/20 rounded-2xl pl-16 pr-6 py-6 text-lg outline-none focus:border-[#D4AF37]/50 transition-all"
                   value={showSearch.query}
                   onChange={(e) => setShowSearch({...showSearch, query: e.target.value})}
                 />
              </div>

              <div className="flex-grow overflow-y-auto space-y-4 pr-4 custom-scrollbar">
                 {filteredLiquors.map(liquor => (
                   <div 
                     key={liquor.id} 
                     onClick={() => selectLiquor(liquor)}
                     className="flex items-center gap-6 p-6 rounded-2xl hover:bg-white/5 cursor-pointer border border-transparent hover:border-[#D4AF37]/20 transition-all group"
                   >
                     <div className="w-16 h-16 rounded-xl bg-white/5 overflow-hidden">
                        <img src={liquor.images?.[0] || liquor.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                     </div>
                     <div className="flex-grow">
                        <span className="text-[8px] font-bold text-[#D4AF37] uppercase tracking-widest">{liquor.type}</span>
                        <h4 className="text-xl font-bold mt-1 uppercase">{liquor.name}</h4>
                     </div>
                     <CheckCircle2 className={`w-6 h-6 ${liquor.id === (showSearch.side === 'left' ? leftLiquor.id : rightLiquor.id) ? 'text-[#D4AF37] opacity-100' : 'opacity-0'}`} />
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Compare;
