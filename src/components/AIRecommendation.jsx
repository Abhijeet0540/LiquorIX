import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, MessageCircle, ArrowUpRight } from 'lucide-react';

const AIRecommendation = () => {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: "Hello! I'm your spirits sommelier. Looking for the perfect bottle for an occasion?",
      suggestions: ["Smooth Whiskey under ₹4000", "Party Vodka", "Gifting Ideas"]
    }
  ]);

  return (
    <section className="py-32 px-6 lg:px-12 bg-black overflow-hidden relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#D4AF37] opacity-[0.03] rounded-full blur-[150px]"></div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* Left side: Content */}
        <div className="space-y-10">
           <div className="inline-flex items-center gap-3 px-6 py-2 glass-morphism rounded-full border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase">
              <Sparkles className="w-4 h-4 fill-[#D4AF37]" />
              INTELLIGENT SELECTION
           </div>
           
           <h2 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight">
             Which one should <br />
             <span className="gold-gradient-text italic font-normal">YOU buy?</span>
           </h2>

           <p className="text-xl text-white/50 leading-relaxed font-light max-w-xl">
             Our AI engine analyzes thousands of reviews, taste profiles, and local price trends to give you a personalized recommendation in seconds.
           </p>

           <div className="space-y-6 pt-6">
              {[
                { label: 'Budget Focused', desc: 'Find the absolute best value spirits near you.' },
                { label: 'Taste Profiling', desc: 'Match with bottles that fit your unique palate.' },
                { label: 'Occasion Matching', desc: 'Party, Gifting, or personal collection.' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 group cursor-pointer hover:bg-white/5 p-4 -ml-4 rounded-2xl transition-all">
                   <div className="w-10 h-10 shrink-0 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                   </div>
                   <div>
                     <h4 className="font-bold text-white uppercase tracking-widest text-sm">{item.label}</h4>
                     <p className="text-white/40 text-sm">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Right side: Conversational UI */}
        <div className="glass-morphism rounded-[32px] border-white/10 shadow-3xl bg-black/40 h-[600px] flex flex-col overflow-hidden relative border-t border-l border-white/20">
           {/* Chat Header */}
           <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#996515] rounded-2xl flex items-center justify-center shadow-lg transform rotate-6 animate-pulse">
                    <Bot className="w-6 h-6 text-black" />
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-white">Spirits sommelier</h3>
                    <div className="flex items-center gap-2">
                       <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                       <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Active AI Agent</span>
                    </div>
                 </div>
              </div>
              <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer">
                 <MessageCircle className="w-5 h-5" />
              </div>
           </div>

           {/* Chat Messages */}
           <div className="flex-grow p-8 space-y-8 overflow-y-auto scrollbar-hide">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className="flex items-start gap-4 max-w-[85%] animate-slide-up">
                      {msg.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center">
                           <Bot className="w-4 h-4 text-[#D4AF37]" />
                        </div>
                      )}
                      <div className="space-y-4">
                        <div className={`p-5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[#D4AF37] text-black font-bold' : 'glass-morphism text-white/80'}`}>
                           {msg.content}
                        </div>
                        {msg.suggestions && msg.role === 'assistant' && (
                           <div className="flex flex-wrap gap-2">
                              {msg.suggestions.map((s, i) => (
                                <button key={i} className="px-4 py-2 rounded-full border border-white/10 text-[10px] font-bold text-white/40 uppercase tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all bg-white/[0.02]">
                                   {s}
                                </button>
                              ))}
                           </div>
                        )}
                      </div>
                   </div>
                </div>
              ))}
           </div>

           {/* Chat Input */}
           <div className="p-6 border-t border-white/5 bg-white/[0.02]">
              <div className="relative flex items-center">
                 <input 
                   type="text" 
                   placeholder="Ask me about brands, regions, or prices..." 
                   className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 pr-20 text-white placeholder-white/20 outline-none focus:border-[#D4AF37]/40 focus:bg-white/10 transition-all font-medium"
                 />
                 <button className="absolute right-3 p-3 bg-[#D4AF37] text-black rounded-xl shadow-lg hover:scale-110 active:scale-90 transition-all">
                    <Send className="w-5 h-5" />
                 </button>
              </div>
              <div className="mt-4 text-center">
                 <span className="text-[10px] text-white/20 uppercase font-bold tracking-[0.2em]">Powered by GPT-4 Spirits Model</span>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default AIRecommendation;
