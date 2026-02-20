
import React from 'react';
import { PROJECTS } from '../constants';
import { MatchData } from '../types';

interface CortexProps {
  matchData?: MatchData | null;
}

const Cortex: React.FC<CortexProps> = ({ matchData }) => {
  const isSkillRelevant = (skill: string) => {
    if (!matchData) return false;
    return matchData.relevantSkills.some(rs => 
      rs.toLowerCase().includes(skill.toLowerCase()) || 
      skill.toLowerCase().includes(rs.toLowerCase())
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-16">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <h2 className="text-4xl font-mono font-bold tracking-tighter text-white">SKILL_MAP [PROJECT_DRIVEN]</h2>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-mint/10 border border-mint/20 text-mint text-[10px] font-mono rounded-full uppercase tracking-widest">v2.0_ENGINEERING_IMPACT</span>
            {matchData && (
              <span className="px-3 py-1 bg-laser/10 border border-laser/20 text-laser text-[10px] font-mono rounded-full uppercase tracking-widest animate-pulse">NEURAL_MODE_ACTIVE</span>
            )}
          </div>
        </div>
        
        {matchData && (
          <div className="p-4 bg-laser/5 border border-laser/20 rounded-sm animate-in slide-in-from-left-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-laser">intelligence</span>
              <span className="text-[10px] font-mono font-bold text-laser uppercase tracking-widest">Tailored Match Summary</span>
            </div>
            <p className="text-gray-300 text-sm italic font-mono leading-relaxed">
              "{matchData.summary}"
            </p>
          </div>
        )}

        <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
          Skills visualized through actual production delivery. I measure success by 
          <span className="text-white"> reliability, latency, and scale</span>, not abstract percentages.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {PROJECTS.map((project) => {
          const projectScore = matchData?.projectScores[project.id];
          return (
            <div key={project.id} className={`group relative glass-panel rounded-md border overflow-hidden transition-all duration-500 ${
              projectScore && projectScore > 70 
                ? 'border-laser/50 shadow-[0_0_30px_#00C2FF20]' 
                : 'border-white/5 hover:border-mint/30'
            }`}>
              <div className="p-8 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold text-white group-hover:text-mint transition-colors">{project.title}</h3>
                      {projectScore && (
                        <div className="px-2 py-0.5 bg-laser/20 border border-laser/30 text-laser text-[9px] font-mono font-black rounded-sm">
                          MATCH: {projectScore}%
                        </div>
                      )}
                    </div>
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">{project.mission}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-mint">{project.impact}</div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase">CORE_OUTCOME</div>
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => {
                    const highlighted = isSkillRelevant(t);
                    return (
                      <span 
                        key={t} 
                        className={`px-2 py-1 transition-all duration-300 border text-[10px] font-mono rounded-sm ${
                          highlighted 
                            ? 'bg-mint/20 border-mint text-white shadow-[0_0_10px_#00FF8840] scale-110' 
                            : 'bg-white/5 border-white/10 text-white/60'
                        }`}
                      >
                        {t}
                      </span>
                    );
                  })}
                </div>

                {/* Hover Overlay for Architecture */}
                <div className="absolute inset-0 bg-void/95 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center p-8 space-y-6">
                  <div className="space-y-2">
                    <div className="text-mint font-mono font-bold text-[10px] tracking-[0.3em] uppercase">SYSTEM_ARCHITECTURE</div>
                    <p className="text-gray-300 text-sm leading-relaxed">{project.architecture}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-mint font-mono font-bold text-[10px] tracking-[0.3em] uppercase">PRODUCTION_METRICS</div>
                    <ul className="space-y-2">
                      {project.metrics?.map((m, i) => (
                        <li key={i} className="flex items-center gap-3 text-white text-sm font-mono">
                          <span className="size-1.5 bg-mint rounded-full"></span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button className="flex-1 h-10 bg-mint text-void font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-white transition-colors">
                      Open Case Study
                    </button>
                    <button className="size-10 border border-white/20 text-white rounded-sm flex items-center justify-center hover:border-mint transition-all">
                        <span className="material-symbols-outlined text-[18px]">account_tree</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Bottom Accent */}
              <div className={`h-1 transition-all duration-700 ${projectScore && projectScore > 70 ? 'bg-laser w-full' : 'bg-mint w-0 group-hover:w-full'}`}></div>
            </div>
          );
        })}

        {/* Aggregate Stats Card */}
        <div className="glass-panel rounded-md border border-white/5 p-8 flex flex-col justify-center gap-8 bg-mint/5">
           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <div className="text-4xl font-bold text-white tracking-tighter">30%</div>
                <div className="text-[10px] font-mono text-mint uppercase tracking-widest">Reliability Boost</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold text-white tracking-tighter">5K+</div>
                <div className="text-[10px] font-mono text-mint uppercase tracking-widest">Concurrent Users</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold text-white tracking-tighter">15+</div>
                <div className="text-[10px] font-mono text-mint uppercase tracking-widest">Client Successes</div>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold text-white tracking-tighter">3.9</div>
                <div className="text-[10px] font-mono text-mint uppercase tracking-widest">Academic GPA</div>
              </div>
           </div>
           <p className="text-gray-400 text-sm italic font-mono">
              "Code like you train: Precision, Resilience, and High-Impact Delivery."
           </p>
        </div>
      </div>
    </div>
  );
};

export default Cortex;
