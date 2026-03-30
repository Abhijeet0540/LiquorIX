import React, { useRef, useEffect, useState } from 'react';
import { Search, MapPin, ArrowRight, Play, Globe, Sparkles, TrendingUp, X } from 'lucide-react';
import { gsap } from 'gsap';

const Hero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial State
    gsap.set(".loader-text", { opacity: 0, scale: 0.2, filter: "blur(60px)" });

    // Phase 1: Appear + Scale Up
    tl.to(".loader-text", {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power4.out"
    });

    // Phase 2: Shimmer Effect
    tl.to(".loader-shimmer", {
      x: "100%",
      duration: 1.5,
      ease: "power2.inOut"
    }, "-=0.5");

    // Phase 3: 3D Depth Zoom Out + Darken
    tl.to(".loader-logo-container", {
      z: -100,
      scale: 0.85,
      opacity: 0.4,
      filter: "blur(40px)",
      duration: 1.5,
      ease: "power3.inOut"
    }, "+=0.3");

    tl.to(".loader-panel", {
      backgroundColor: "#c2a23c",
      duration: 1.2,
      ease: "power2.inOut"
    }, "-=1.2");

    // Phase 4: Bottom-to-Top Reveal
    tl.to(".loader-panel", { y: "-100%", duration: 1.2, ease: "power4.inOut" });
    tl.to(".loader-logo-container", { y: "-100px", opacity: 0, duration: 1, ease: "power4.in" }, "-=1.2");

    // Hide the loader container finally
    tl.to(".hero-loader", { opacity: 0, pointerEvents: "none", duration: 0.1 });

    // Reveal Hero Content
    tl.from(".hero-content-reveal", {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1.2,
      ease: "power4.out"
    }, "-=0.8");

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;
      if (imageRef.current) {
        gsap.to(imageRef.current, { rotateY: xPos, rotateX: -yPos, duration: 1.2 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      gsap.to(".video-modal", { opacity: 1, duration: 0.5, pointerEvents: "auto", ease: "power4.out" });
      gsap.from(".video-content", { scale: 0.9, opacity: 0, duration: 1, ease: "power4.out" });
    } else {
      gsap.to(".video-modal", { opacity: 0, duration: 0.5, pointerEvents: "none", ease: "power4.in" });
    }
  }, [isModalOpen]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden bg-black selection:bg-[#D4AF37] selection:text-black">
      {/* Cinematic Intro Loader Animation */}
      <div className="hero-loader fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-auto" style={{ perspective: '1000px' }}>
        <div className="loader-panel absolute inset-0 bg-[#c2a23c] z-[101]"></div>
        <div className="loader-logo-container relative z-[102] flex flex-col items-center px-6">
          <h2 className="loader-text text-black font-serif font-black text-4xl md:text-8xl tracking-[0.4em] md:tracking-[0.8em] uppercase relative overflow-hidden text-center">
            LiquorIX
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full loader-shimmer"></span>
          </h2>
          <div className="loader-tag mt-8 opacity-0 h-[1px] w-12 md:w-24 bg-black/40"></div>
        </div>
      </div>

      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[#0a0a0a] z-0">
        <div className="absolute inset-0 opacity-[0.1] md:opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px md:80px 80px' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-[#D4AF37]/5 via-transparent to-black z-0"></div>
        <div className="absolute top-[10%] right-[-10%] w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] bg-[#FFD700] opacity-[0.15] md:opacity-[0.25] rounded-full blur-[100px] md:blur-[180px] animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10 py-10 md:py-20">
        <div className="text-center lg:text-left space-y-8 md:space-y-12 order-2 lg:order-1">
          {/* Status Badge */}
          <div className=" hero-tag inline-flex items-center space-x-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full glass-morphism hover:bg-white/10 transition-colors cursor-pointer group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Live In Nagpur, MH</span>
          </div>

          {/* Epic Heading */}
          <div className="space-y-6">
            <h1 ref={titleRef} className="text-[clamp(3rem,8vw,9rem)] leading-[1] md:leading-[0.9] font-serif font-bold text-white tracking-tighter relative group">
              Elevate <br className="hidden md:block" />
              <span className="italic font-light text-white mr-2">Your</span>
              <span className="gold-gradient-text italic font-normal inline-block">Senses</span>
            </h1>
            <p ref={subtitleRef} className="text-lg md:text-2xl text-white font-light max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans border-l-0 md:border-l-2 border-[#D4AF37] md:pl-8">
              The ultimate multi-dimensional spirits index. Real-time pricing, expert profiles, and high-fidelity discovery.
            </p>
          </div>

          {/* Refined Actions */}
          <div className=" flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 md:gap-8 pt-4">
            <button
              onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-10 py-5 md:px-12 md:py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] md:text-xs rounded shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:bg-[#D4AF37] hover:scale-105 active:scale-95 transition-all group flex items-center justify-center gap-4"
            >
              START COMPARISON
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <div
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-4 group cursor-pointer py-2"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center p-1 group-hover:border-[#D4AF37] transition-colors">
                <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-colors">
                  <Play className="w-4 h-4 fill-white group-hover:fill-[#D4AF37] text-transparent ml-1" />
                </div>
              </div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">Watch Film</span>
            </div>
          </div>
        </div>

        {/* Immersive Product Visual */}
        <div className=" relative group perspective-2000 order-1 lg:order-2 px-10 lg:px-0">
          <div ref={imageRef} className="relative z-20 transform-gpu cursor-grab active:cursor-grabbing flex justify-center">
            <img
              src="/Amrut_Fusion/cover.png"
              alt="Elite Spirits"
              className="max-h-[50vh] md:max-h-[80vh] lg:max-h-[100vh] w-auto drop-shadow-[0_45px_100px_rgba(212,175,55,0.2)] select-none hover:drop-shadow-[0_45px_100px_rgba(212,175,55,0.4)] transition-all duration-1000"
            />
          </div>

          {/* High-Fi Floating Data Points (Hidden on very small screens, visible from md up) */}
          <div className="hero-tag absolute top-[10%] right-[0%] md:right-[-5%] p-4 md:p-8 glass-morphism rounded-2xl md:rounded-[32px] border-white/10 shadow-3xl bg-black/60 backdrop-blur-3xl animate-float-slow transform hover:scale-110 transition-all cursor-crosshair z-30 max-w-[160px] md:max-w-[240px] hidden sm:block">
            <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-[#D4AF37] mb-2 md:mb-4" />
            <h4 className="text-[10px] md:text-sm font-bold text-white uppercase tracking-widest mb-1 md:mb-2 text-wrap">Amrut Fusion</h4>
            <div className="flex items-center justify-between">
              <span className="text-[#D4AF37] text-lg md:text-2xl font-black font-sans">₹3,400</span>
              <span className="text-[8px] md:text-[10px] text-green-500 font-bold">+2.4%</span>
            </div>
          </div>

          <div className="hero-tag absolute bottom-[10%] left-[0%] md:left-[-10%] p-4 md:p-8 glass-morphism rounded-2xl md:rounded-[32px] border-white/10 shadow-3xl bg-black/40 backdrop-blur-3xl animate-float-slower transform hover:scale-110 transition-all cursor-crosshair z-30 hidden md:block">
            <div className="flex items-center gap-3 md:gap-5">
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#884422] flex items-center justify-center p-2 md:p-3 shadow-xl transform rotate-12">
                <Globe className="w-5 h-5 md:w-8 md:h-8 text-black" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] md:text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest leading-none mb-1">Global Sourcing</span>
                <span className="text-sm md:text-lg font-bold text-white">Speyside, SC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Film Modal */}
      <div className="video-modal fixed inset-0 z-[100] bg-black opacity-0 pointer-events-none flex items-center justify-center p-4 lg:p-20 backdrop-blur-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent"></div>
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] p-3 md:p-4 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-all group overflow-hidden"
        >
          <X className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        <div className="video-content relative z-[110] w-full max-w-5xl aspect-video rounded-2xl md:rounded-[40px] overflow-hidden border border-white/5 shadow-3xl bg-black">
          {isModalOpen && (
            <>
              <video
                src="/Amrut_Fusion/Watch_Film.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 space-y-1 md:space-y-2">
                <span className="text-[8px] md:text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em] md:tracking-[0.5em]">Global Cinematic</span>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white uppercase italic">The Alchemy of Oak</h3>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Hero Bottom Scroll Hint */}
      <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:gap-4 opacity-50">
        <div className="w-[1.5px] md:w-[2px] h-8 md:h-12 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
        <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-white/40 mt-1 md:mt-2">Scroll To Explore</span>
      </div>
    </section>
  );
};

export default Hero;
