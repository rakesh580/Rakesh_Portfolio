
import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Constructing Intelligence";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative px-6 overflow-hidden">
      {/* Mesh Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 text-center flex flex-col items-center gap-8 max-w-5xl">
        <h1 className="font-mono text-5xl md:text-8xl font-bold tracking-tighter text-white leading-none">
          <span className="inline-block min-h-[1em]">{displayText}</span>
          <span className="animate-pulse text-mint">_</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl font-light max-w-3xl leading-relaxed">
          <span className="text-white font-bold">Rakesh Chintanippu.</span> Software Engineer @ <span className="text-mint">Cruxito Tech Solutions</span>.
          Building production-grade <span className="text-white">AI platforms</span>, <span className="text-white">real-time systems</span>, and <span className="text-white">cloud-native microservices</span>, with 5+ shipped case studies spanning LLM orchestration, RAG pipelines, and full-stack engineering.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button onClick={() => {
            const el = document.getElementById('cortex');
            if (el) {
              const offset = 80;
              const top = el.getBoundingClientRect().top + window.scrollY - offset;
              window.scrollTo({ top, behavior: 'smooth' });
            }
          }} className="h-14 px-10 bg-white text-void font-mono font-bold text-xs tracking-widest uppercase hover:bg-mint transition-colors rounded-sm shadow-xl flex items-center gap-2">
            View Skill Map
            <span className="material-symbols-outlined text-sm">map</span>
          </button>
          <button onClick={() => {
            const el = document.getElementById('uplink');
            if (el) {
              const offset = 80;
              const top = el.getBoundingClientRect().top + window.scrollY - offset;
              window.scrollTo({ top, behavior: 'smooth' });
            }
          }} className="h-14 px-10 border border-white/10 font-mono font-bold text-xs tracking-widest uppercase text-white hover:border-mint/50 transition-colors rounded-sm flex items-center justify-center gap-2">
            Establish Uplink
            <span className="material-symbols-outlined text-sm">wifi_tethering</span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 hover:opacity-100 transition-opacity cursor-pointer">
        <span className="material-symbols-outlined text-white text-3xl animate-bounce">keyboard_double_arrow_down</span>
      </div>
    </div>
  );
};

export default Hero;
