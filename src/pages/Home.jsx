import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import ComparisonCard from '../components/ComparisonCard';
import LivePriceTicker from '../components/LivePriceTicker';
import AIRecommendation from '../components/AIRecommendation';
import { liquors } from '../data/liquors';
import { Trophy, ChevronDown, Zap, Globe, Package, ExternalLink, Mail, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const SectionHeader = ({ title, subtitle, badge }) => (
  <div className="text-center space-y-4 mb-20 relative z-10 px-6">
    {badge && (
      <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 glass-morphism rounded-full text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em]">
         <Zap className="w-3 h-3 fill-[#D4AF37]" />
         {badge}
      </div>
    )}
    <h2 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight">
       {title.split(' ').map((word, i) => (
         <span key={i} className={i % 2 !== 0 ? 'gold-gradient-text italic font-normal' : ''}> {word} </span>
       ))}
    </h2>
    <p className="text-xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
       {subtitle}
    </p>
  </div>
);

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLiquors = liquors.filter(liquor => 
    liquor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    liquor.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    liquor.origin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Live Price Ticker (Secondary Visibility) */}
        <section className="relative z-20 py-10 bg-black/40 backdrop-blur-3xl border-y border-white/5">
           <LivePriceTicker />
        </section>

        {/* Global Search Experience */}
        <div id="search-section">
          <SearchBar onSearchChange={setSearchQuery} />
        </div>

        {/* Core Feature: Comparison Gallery */}
        <section className="pb-32 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-[-10%] w-[40vw] h-[40vw] bg-[#D4AF37] opacity-[0.03] rounded-full blur-[200px]"></div>
          <div className="absolute bottom-0 left-[-10%] w-[30vw] h-[30vw] bg-[#996515] opacity-[0.03] rounded-full blur-[150px]"></div>

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <SectionHeader 
               title="Elite Collection" 
               subtitle={`Browse our top ${filteredLiquors.length} index-rated spirits curated for Nagpur enthusiasts.`} 
               badge="MARKET ANALYTICS LIVE" 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 relative z-10">
              {filteredLiquors.slice(0, 6).map((liquor, index) => (
                <Link 
                  key={liquor.id} 
                  to={`/liquor/${liquor.id}`} 
                  className="block no-underline transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ComparisonCard 
                     liquor={liquor} 
                     isHighlighted={index === 0} 
                  />
                </Link>
              ))}
            </div>

            <div className="mt-24 text-center">
              <Link to="/gallery" className="inline-block no-underline">
                <button className="px-12 py-5 border border-white/10 glass-morphism rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all group flex items-center justify-center gap-3 mx-auto text-white">
                   SEE ALL 450+ BRANDS
                   <ChevronDown className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-y-1 transition-all" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* AI Recommendation Context */}
        <AIRecommendation />

        {/* Award Winning Visualization Component (Popularity/Trends) */}
        <section className="py-32 px-6 lg:px-12 border-t border-white/5 bg-gradient-to-b from-black to-[#0a0604]">
           <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                 <div className="space-y-10 order-2 lg:order-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       {[
                         { icon: <Globe className="w-8 h-8 text-[#D4AF37]" />, title: 'Real-time API', desc: 'Syncing prices across 12,000+ local retailers daily.' },
                         { icon: <Package className="w-8 h-8 text-[#D4AF37]" />, title: 'Smart Inventory', desc: 'Track stock availability in your immediate zip code.' },
                         { icon: <Trophy className="w-8 h-8 text-[#D4AF37]" />, title: 'Expert Rated', desc: 'Curated scores from award-winning master blenders.' },
                         { icon: <Zap className="w-8 h-8 text-[#D4AF37]" />, title: 'Instant Compare', desc: 'Powerful side-by-side metrics in milliseconds.' }
                       ].map((feat, i) => (
                         <div key={i} className="p-8 glass-morphism rounded-3xl border-white/5 space-y-4 hover:border-[#D4AF37]/20 transition-all cursor-pointer group">
                            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center group-hover:scale-110 transition-transform">{feat.icon}</div>
                            <h4 className="text-xl font-bold font-serif text-white">{feat.title}</h4>
                            <p className="text-sm text-white/40 leading-relaxed font-light">{feat.desc}</p>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="order-1 lg:order-2 space-y-10">
                    <SectionHeader 
                       badge="DATA DRIVEN"
                       title="Live pricing engine"
                       subtitle="Experience the most advanced liquor intelligence platform ever built. We don't just show prices, we provide context."
                    />
                    <div className="space-y-8">
                       {[
                         { label: 'DELHI PRICE TRENDS', value: 88, color: '#D4AF37' },
                         { label: 'GLOBAL POPULARITY', value: 94, color: '#FFBF00' },
                         { label: 'LOCAL AVAILABILITY', value: 65, color: '#D4AF37' }
                       ].map((bar, i) => (
                         <div key={i} className="space-y-2">
                           <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/50">
                              <span>{bar.label}</span>
                              <span className="text-[#D4AF37]">{bar.value}%</span>
                           </div>
                           <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                              <div 
                                 className="h-full rounded-full transition-all duration-1000 delay-500 bg-gradient-to-r from-[#D4AF37] to-[#996515] shadow-[0_0_15px_#D4AF37]" 
                                 style={{ width: `${bar.value}%` }} 
                              />
                           </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </main>

      {/* Premium Footer */}
      <footer className="pt-32 pb-16 px-6 lg:px-12 border-t border-white/10 bg-black">
         <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
               <div className="space-y-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#996515] rounded-xl flex items-center justify-center transform rotate-45">
                       <span className="text-black font-bold text-2xl -rotate-45">L</span>
                    </div>
                    <span className="text-3xl font-bold tracking-tighter uppercase gold-gradient-text">LIQUORIX</span>
                  </div>
                  <p className="text-white/40 font-light leading-relaxed">
                     The world's premium spirits comparison platform. Discover, compare, and collect with intelligence.
                  </p>
                  <div className="flex items-center gap-6">
                     <Instagram className="w-5 h-5 text-white/40 hover:text-[#D4AF37] transition-all cursor-pointer" />
                     <Twitter className="w-5 h-5 text-white/40 hover:text-[#D4AF37] transition-all cursor-pointer" />
                  </div>
               </div>

               <div className="space-y-8">
                  <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">The Collection</h4>
                  <ul className="space-y-4 text-sm font-light text-white/40">
                     <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all h-3" /> Rare Whiskeys
                     </li>
                     <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all h-3" /> Vintage Vodkas
                     </li>
                  </ul>
               </div>

               <div className="space-y-8">
                  <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Region Guides</h4>
                  <ul className="space-y-4 text-sm font-light text-white/40">
                     <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all h-3" /> Bengaluru Guide
                     </li>
                     <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all h-3" /> Mumbai Spirits
                     </li>
                  </ul>
               </div>

               <div className="space-y-8">
                  <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Join The Vault</h4>
                  <p className="text-sm font-light text-white/40 leading-relaxed">
                     Get invited to rare bottle drops and exclusive tasting events.
                  </p>
                  <div className="relative">
                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                     <input 
                        type="email" 
                        placeholder="your@email.com" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-sm text-white placeholder-white/20 outline-none focus:border-[#D4AF37]/40 transition-all"
                     />
                  </div>
               </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
               <span className="text-[10px] font-medium text-white/20 uppercase tracking-widest">
                  &copy; {new Date().getFullYear()} LIQUORIX SPIRITS PLATFORM. ALL RIGHTS RESERVED.
               </span>
               <div className="flex gap-10 text-[10px] font-medium text-white/20 uppercase tracking-widest">
                  <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default Home;
