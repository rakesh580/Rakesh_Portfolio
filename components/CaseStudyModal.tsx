
import React, { useState, useEffect } from 'react';
import { Project } from '../types';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const caseStudy = project?.caseStudy;
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (caseStudy) {
      setActiveSection(caseStudy.sections[0]?.id || '');
    }
  }, [caseStudy]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project || !caseStudy) return null;

  const currentSection = caseStudy.sections.find(s => s.id === activeSection);
  if (!currentSection) return null;

  const currentIdx = caseStudy.sections.findIndex(s => s.id === activeSection);
  const prevSection = currentIdx > 0 ? caseStudy.sections[currentIdx - 1] : null;
  const nextSection = currentIdx < caseStudy.sections.length - 1 ? caseStudy.sections[currentIdx + 1] : null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8">
      <div
        className="absolute inset-0 bg-void/95 backdrop-blur-xl cursor-pointer"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-lg border border-mint/20 overflow-hidden animate-in zoom-in duration-300 bg-[#0a0a0f]">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/10 bg-void/60 shrink-0">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-mint text-2xl">menu_book</span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-mono font-bold tracking-tighter text-white">{project.title}</h2>
                  <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-1">Case Study</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm italic mt-3">{caseStudy.tagline}</p>
            </div>
            <button
              onClick={onClose}
              className="size-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-mint transition-colors shrink-0"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 mt-6 overflow-x-auto pb-1 custom-scrollbar">
            {caseStudy.sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-sm text-[10px] font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeSection === section.id
                    ? 'bg-mint text-void'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="max-w-3xl mx-auto space-y-8">
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{currentSection.content.heading}</h3>

            {currentSection.content.paragraphs.map((p, i) => (
              <p key={i} className="text-gray-400 text-sm leading-relaxed">{p}</p>
            ))}

            {/* Steps */}
            {currentSection.content.steps && (
              <div className="space-y-4 mt-6">
                {currentSection.content.steps.map((step) => (
                  <div key={step.step} className="flex gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-md hover:border-mint/20 transition-colors">
                    <div className="size-10 shrink-0 rounded-full bg-mint/10 border border-mint/30 flex items-center justify-center text-mint font-mono font-bold text-sm">
                      {step.step}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-white font-bold text-sm">{step.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Highlights */}
            {currentSection.content.highlights && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                {currentSection.content.highlights.map((h, i) => (
                  <div key={i} className="p-4 bg-white/[0.03] border border-white/5 rounded-md hover:border-mint/20 transition-all group">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-mint text-lg mt-0.5 group-hover:scale-110 transition-transform">{h.icon}</span>
                      <div className="space-y-1">
                        <div className="text-white font-bold text-xs uppercase tracking-wider">{h.label}</div>
                        <div className="text-gray-400 text-[11px] leading-relaxed">{h.value}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center max-w-3xl mx-auto mt-10 pt-6 border-t border-white/5">
            {prevSection ? (
              <button
                onClick={() => setActiveSection(prevSection.id)}
                className="flex items-center gap-2 text-gray-500 hover:text-mint transition-colors text-xs font-mono"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                {prevSection.label}
              </button>
            ) : <div />}
            {nextSection ? (
              <button
                onClick={() => setActiveSection(nextSection.id)}
                className="flex items-center gap-2 text-gray-500 hover:text-mint transition-colors text-xs font-mono"
              >
                {nextSection.label}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-mint hover:text-white transition-colors text-xs font-mono font-bold"
              >
                CLOSE_STUDY
                <span className="material-symbols-outlined text-sm">check_circle</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;
