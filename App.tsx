
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Cortex from './components/Cortex';
import Timeline from './components/Timeline';
import Lab from './components/Lab';
import Pulse from './components/Pulse';
import Uplink from './components/Uplink';
import NexusAgent from './components/NexusAgent';
import ResumeTailor from './components/ResumeTailor';
import CaseStudyModal from './components/CaseStudyModal';
import { PROJECTS } from './constants';
import { MatchData, Project } from './types';

const useCustomCursor = () => {
  useEffect(() => {
    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const onMouseDown = () => { dot.classList.add('clicking'); ring.classList.add('clicking'); };
    const onMouseUp = () => { dot.classList.remove('clicking'); ring.classList.remove('clicking'); };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, [onclick]')) {
        dot.classList.add('hovering');
        ring.classList.add('hovering');
      }
    };
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, [onclick]')) {
        dot.classList.remove('hovering');
        ring.classList.remove('hovering');
      }
    };

    let rafId: number;
    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafId);
      dot.remove();
      ring.remove();
    };
  }, []);
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('nexus');
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [caseStudyProject, setCaseStudyProject] = useState<Project | null>(null);

  useCustomCursor();

  const openCaseStudy = useCallback((projectId: string) => {
    const project = PROJECTS.find(p => p.id === projectId);
    if (project?.caseStudy) setCaseStudyProject(project);
  }, []);

  const closeCaseStudy = useCallback(() => setCaseStudyProject(null), []);

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

    const sections = ['nexus', 'cortex', 'timeline', 'lab', 'pulse', 'uplink'];
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
            <Cortex matchData={matchData} onOpenCaseStudy={openCaseStudy} />
          </div>
        </section>

        <section id="timeline" className="py-32 px-6">
          <Timeline />
        </section>

        <section id="lab" className="py-32 px-6 bg-white/[0.02]">
          <Lab onOpenCaseStudy={openCaseStudy} />
        </section>

        <section id="pulse" className="py-32 px-6">
          <Pulse />
        </section>

        <section id="uplink" className="py-32 px-6">
          <Uplink />
        </section>
      </main>

      <CaseStudyModal project={caseStudyProject} onClose={closeCaseStudy} />
      <NexusAgent matchData={matchData} />

      <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-xs font-mono uppercase tracking-widest">
        &copy; {new Date().getFullYear()} RAKESH_PORTFOLIO v1.0 
      </footer>
    </div>
  );
};

export default App;
