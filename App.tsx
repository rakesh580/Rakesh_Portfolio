
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Cortex from './components/Cortex';
import Timeline from './components/Timeline';
import Lab from './components/Lab';
import Uplink from './components/Uplink';
import NexusAgent from './components/NexusAgent';
import ResumeTailor from './components/ResumeTailor';
import { MatchData } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('nexus');
  const [matchData, setMatchData] = useState<MatchData | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );

    const sections = ['nexus', 'cortex', 'timeline', 'lab', 'uplink'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-void selection:bg-mint selection:text-void overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#00FF8815,transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,#7000FF10,transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <Header activeSection={activeSection} />

      <main className="relative z-10">
        <section id="nexus">
          <Hero />
        </section>
        
        <section id="cortex" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <ResumeTailor onMatch={setMatchData} />
            <Cortex matchData={matchData} />
          </div>
        </section>

        <section id="timeline" className="py-32 px-6">
          <Timeline />
        </section>

        <section id="lab" className="py-32 px-6 bg-white/[0.02]">
          <Lab />
        </section>

        <section id="uplink" className="py-32 px-6">
          <Uplink />
        </section>
      </main>

      <NexusAgent matchData={matchData} />

      <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-xs font-mono uppercase tracking-widest">
        &copy; {new Date().getFullYear()} RAKESH_PORTFOLIO v1.0 
      </footer>
    </div>
  );
};

export default App;
