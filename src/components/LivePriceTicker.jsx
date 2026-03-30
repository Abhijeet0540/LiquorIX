import React, { useState, useEffect } from 'react';
import { AlertCircle, TrendingDown, TrendingUp, Clock, MapPin } from 'lucide-react';

const cities = [
  { name: 'Nagpur, MH', price: 3475, change: +2.4, status: 'Stable Market' },
  { name: 'Mumbai, MH', price: 3250, change: +2.5, status: 'High Demand' },
  { name: 'Delhi, DL', price: 3100, change: -1.2, status: 'Lowest Nearby' },
  { name: 'Bangalore, KA', price: 3450, change: +0.8, status: 'Limited Stock' },
  { name: 'Goa, GA', price: 2900, change: 0, status: 'Cheapest in India' }
];

const LivePriceTicker = () => {
  const [prices, setPrices] = useState(cities);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Randomize some figures every 10s to simulate live data
    const interval = setInterval(() => {
      setPrices(prev => prev.map(city => ({
        ...city,
        price: city.price + (Math.floor(Math.random() * 21) - 10)
      })));
      setLastUpdated(new Date());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0a0a0a]/80 border-y border-white/5 py-3 overflow-hidden whitespace-nowrap relative group">
      <div className="container mx-auto px-6 mb-2 flex items-center justify-between opacity-80">
         <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></span>
            LIVE PRICE NETWORK
         </div>
         <div className="flex items-center gap-2 text-[10px] font-mono">
            <Clock className="w-3 h-3" />
            UPDATED: {lastUpdated.toLocaleTimeString()}
         </div>
      </div>

      <div className="flex items-center gap-20 animate-marquee-slower group-hover:pause transition-all">
        {prices.concat(prices).map((city, i) => (
          <div key={i} className="flex items-center gap-6 group/item cursor-pointer">
             <div className="flex items-center gap-2">
               <MapPin className="w-4 h-4 text-white/40 group-hover/item:text-[#D4AF37] transition-colors" />
               <span className="text-sm font-bold text-white tracking-tighter uppercase">{city.name}</span>
             </div>
             
             <div className="flex items-center gap-4">
               <span className="text-lg font-bold font-serif text-white">₹{city.price}</span>
               <div className={`flex items-center gap-1 text-[10px] font-bold ${city.change >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                 {city.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                 {Math.abs(city.change)}%
               </div>
             </div>

             <div className="px-3 py-1 rounded border border-white/5 text-[8px] font-bold uppercase tracking-widest text-white/20 group-hover/item:text-[#D4AF37] group-hover/item:border-[#D4AF37]/30">
               {city.status}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LivePriceTicker;
