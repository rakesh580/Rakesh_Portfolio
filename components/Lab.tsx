
import React, { useState, useEffect, useCallback } from 'react';
import { PROJECTS } from '../constants';
import ArchitectureDiagram from './ArchitectureDiagram';

interface LabProps {
  onOpenCaseStudy: (projectId: string) => void;
}

const Lab: React.FC<LabProps> = ({ onOpenCaseStudy }) => {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const closeModal = useCallback(() => setExpandedProjectId(null), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (expandedProjectId) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [expandedProjectId, closeModal]);

  const toggleExpansion = (id: string) => {
    setExpandedProjectId(prev => prev === id ? null : id);
  };

  const expandedProject = PROJECTS.find(p => p.id === expandedProjectId);

  return (
    <div className="max-w-7xl mx-auto space-y-16">
      <div className="flex items-end justify-between border-b border-white/5 pb-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-mono font-bold tracking-tighter text-white">THE_LAB</h2>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.4em]">Experimental Prototypes</p>
        </div>
        <div className="hidden md:block text-[10px] font-mono text-mint opacity-50 uppercase tracking-widest">
          S_ID: 9841 // PROJECT_RESOURCES_LIVE
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project) => (
          <div key={project.id} className="group glass-panel rounded-sm overflow-hidden flex flex-col hover:border-mint/40 transition-all">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={`${project.title} — ${project.mission}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void to-transparent opacity-80"></div>
              <div className="absolute bottom-4 left-4 flex gap-2">
                {project.tech.slice(0, 3).map(t => (
                  <span key={t} className="px-2 py-0.5 bg-mint/10 text-mint text-[9px] font-mono border border-mint/20 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 flex-grow space-y-4">
              <h3 className="text-xl font-bold text-white group-hover:text-mint transition-colors">{project.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="p-6 pt-0 flex gap-4">
              <button
                onClick={() => toggleExpansion(project.id)}
                className="flex-1 h-10 border border-mint/20 bg-mint/5 rounded-sm flex items-center justify-center gap-2 text-xs font-mono font-bold text-mint hover:bg-mint hover:text-void transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">account_tree</span>
                VIEW ARCHITECTURE
              </button>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="size-10 border border-white/10 rounded-sm flex items-center justify-center text-white hover:bg-white hover:text-void transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">open_in_new</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Expansion Overlay (Modal) */}
      {expandedProject && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 md:p-12">
          <div
            className="absolute inset-0 bg-void/90 backdrop-blur-xl cursor-pointer"
            onClick={() => setExpandedProjectId(null)}
          ></div>

          <div className="relative glass-panel w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-lg border border-mint/20 flex flex-col animate-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="p-8 border-b border-white/10 flex items-start justify-between bg-void/40">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-mint">hub</span>
                  <h2 className="text-3xl font-mono font-bold tracking-tighter text-white">{expandedProject.title}</h2>
                </div>
                <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">{expandedProject.mission}</p>
              </div>
              <button
                onClick={() => setExpandedProjectId(null)}
                className="size-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-mint transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <div className="text-xs font-mono font-bold text-mint uppercase tracking-[0.3em]">System Architecture Diagram</div>
                  <div className="glass-panel border-white/5 rounded-md overflow-hidden bg-void/20">
                    {expandedProject.diagram ? (
                      <ArchitectureDiagram
                        nodes={expandedProject.diagram.nodes}
                        edges={expandedProject.diagram.edges}
                      />
                    ) : (
                      <div className="h-[400px] flex flex-col items-center justify-center text-gray-500 font-mono text-xs italic gap-2">
                        <span className="material-symbols-outlined text-gray-600 text-3xl">schema</span>
                        Architecture diagram coming soon.
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="text-xs font-mono font-bold text-mint uppercase tracking-[0.3em]">Architecture Summary</div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {expandedProject.architecture}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="text-xs font-mono font-bold text-mint uppercase tracking-[0.3em]">Technical Stack</div>
                    <div className="flex flex-wrap gap-2">
                      {expandedProject.tech.map(t => (
                        <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 text-[11px] font-mono text-white/60 rounded-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="text-xs font-mono font-bold text-mint uppercase tracking-[0.3em]">Core Outcome</div>
                  <div className="p-6 bg-mint/5 border border-mint/20 rounded-md">
                    <div className="text-4xl font-black text-mint tracking-tighter">{expandedProject.impact}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-xs font-mono font-bold text-mint uppercase tracking-[0.3em]">Performance Metrics</div>
                  <div className="space-y-3">
                    {expandedProject.metrics?.map((metric, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-sm">
                        <span className="material-symbols-outlined text-mint text-sm">bolt</span>
                        <span className="text-[11px] font-mono text-gray-300">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <a
                    href={expandedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full h-12 bg-white text-void font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-mint transition-colors rounded-sm"
                  >
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                    VIEW_PROJECT
                  </a>
                  {expandedProject.caseStudy ? (
                    <button
                      onClick={() => { onOpenCaseStudy(expandedProject.id); setExpandedProjectId(null); }}
                      className="w-full h-12 border border-mint/30 bg-mint/5 text-mint font-mono font-bold text-[10px] uppercase tracking-widest rounded-sm hover:bg-mint/20 transition-colors flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">menu_book</span>
                      OPEN_CASE_STUDY
                    </button>
                  ) : (
                    <button className="w-full h-12 border border-white/10 text-gray-500 font-mono font-bold text-[10px] uppercase tracking-widest rounded-sm cursor-not-allowed">
                      CASE_STUDY_LOCKED
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lab;
