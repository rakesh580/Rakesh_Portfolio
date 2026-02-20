
import React from 'react';
import { TIMELINE } from '../constants';

const Timeline: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-20">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-mono font-bold tracking-tighter text-white">CHRONOS_PIPELINE</h2>
        <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.4em]">Career Milestones</p>
      </div>

      <div className="relative space-y-12">
        {/* Central Line */}
        <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>

        {TIMELINE.map((event, index) => (
          <div 
            key={index} 
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
              index % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className={`flex-1 w-full ${index % 2 === 1 ? 'md:text-left' : 'md:text-right'}`}>
              <div className="space-y-2">
                <span className="text-mint font-mono font-bold text-xs tracking-widest">{event.period}</span>
                <h3 className="text-2xl font-bold text-white">{event.company}</h3>
                <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">{event.role} | {event.location}</p>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-center">
              <div className="size-16 rounded-full glass-panel border border-mint/20 flex items-center justify-center bg-void group hover:border-mint transition-colors">
                <span className="material-symbols-outlined text-mint text-2xl">
                  {index === 0 ? 'terminal' : index === 1 ? 'school' : 'business'}
                </span>
              </div>
            </div>

            <div className="flex-1 w-full glass-panel p-6 rounded-sm border border-white/5 hover:border-mint/20 transition-all">
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {event.description}
              </p>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {event.stack.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-white/5 text-[10px] font-mono text-white/60 border border-white/10 rounded-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="text-[10px] font-mono text-mint uppercase tracking-widest">Measurable Impact:</div>
                  <ul className="space-y-1">
                    {event.impact?.map((imp, i) => (
                      <li key={i} className="text-[11px] text-gray-300 font-mono flex items-start gap-2">
                        <span className="text-mint">»</span>
                        {imp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
