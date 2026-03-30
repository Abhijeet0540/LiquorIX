import React, { useState, useEffect } from 'react';
import { Search, MapPin, Menu, X, ShoppingCart, User, Bell, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to(".mobile-menu-overlay", { opacity: 1, duration: 0.5, pointerEvents: "auto", ease: "power4.out" });
      gsap.from(".mobile-link", { x: 50, opacity: 0, stagger: 0.1, duration: 0.8, ease: "back.out(1.7)" });
    } else {
      gsap.to(".mobile-menu-overlay", { opacity: 0, duration: 0.3, pointerEvents: "none", ease: "power4.in" });
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Discover', path: '/' },
    { name: 'Collective', path: '/gallery' },
    { name: 'Compare', path: '/compare' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled || isMobileMenuOpen ? 'glass-morphism py-4 shadow-2xl' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center space-x-2 no-underline relative z-[60]"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#996515] rounded-lg flex items-center justify-center shadow-lg transform rotate-45 group hover:rotate-90 transition-transform duration-500">
               <span className="text-black font-bold text-xl -rotate-45 group-hover:-rotate-90 transition-transform duration-500">L</span>
            </div>
            <span className="text-2xl font-bold tracking-tighter uppercase gold-gradient-text hidden md:block">LIQUORIX</span>
          </Link>

          {/* Center Navigation (Desktop) */}
          <div className="hidden lg:flex items-center space-x-10 text-sm font-medium tracking-[0.2em] uppercase opacity-90">
            {navLinks.map(link => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`hover:text-[#D4AF37] transition-colors no-underline ${location.pathname === link.path ? 'text-[#D4AF37]' : 'text-white'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6 relative z-[60]">
            <div className="hidden sx:flex flex-col items-end opacity-60 text-[10px] tracking-widest font-mono mr-4">
               <span className="uppercase">{format(currentTime, 'EEEE, MMM do')}</span>
               <span className="text-[#D4AF37]">{format(currentTime, 'pp')}</span>
            </div>
            
            <div className="lg:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-[#D4AF37]" />}
              </button>
            </div>

            <div className="hidden lg:flex items-center space-x-6">
              <div className="relative cursor-pointer group">
                <Bell className="w-5 h-5 text-[#D4AF37] opacity-80 group-hover:opacity-100 transition-opacity" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              </div>
              <User className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer text-white" />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className="mobile-menu-overlay fixed inset-0 z-[55] bg-black opacity-0 pointer-events-none transition-opacity duration-300">
         <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent"></div>
         
         {/* Dedicated Close Button for Overlay */}
         <button 
           onClick={() => setIsMobileMenuOpen(false)}
           className="absolute top-10 right-10 z-[70] p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all group lg:hidden"
         >
            <X className="w-8 h-8 text-[#D4AF37] group-hover:scale-110 transition-transform" />
         </button>

         <div className="h-full flex flex-col justify-start px-8 md:px-12 pt-32 pb-12 space-y-8 md:space-y-12 relative z-10 overflow-y-auto">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.8em] opacity-40">Menu Navigation</span>
            <div className="flex flex-col space-y-6 md:space-y-8">
               {navLinks.map((link, i) => (
                 <Link 
                   key={link.name} 
                   to={link.path} 
                   onClick={() => setIsMobileMenuOpen(false)}
                   className="mobile-link text-4xl md:text-6xl font-serif font-bold text-white no-underline hover:text-[#D4AF37] transition-all flex items-center justify-between group py-3 border-b border-white/5 last:border-0"
                 >
                   <span>{link.name}</span>
                   <ChevronRight className="w-8 h-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all" />
                 </Link>
               ))}
            </div>

            <div className="pt-20 border-t border-white/5 flex flex-col space-y-6">
               <div className="flex items-center gap-4">
                  <User className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-sm font-bold uppercase tracking-widest">Guest Account</span>
               </div>
               <div className="text-[10px] text-white/20 uppercase tracking-[0.5em]">Nagpur Index Platform &copy; 2026</div>
            </div>
         </div>
      </div>
    </>
  );
};

export default Navbar;
