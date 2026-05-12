
import React from 'react';
import { OSS_CONTRIBUTIONS } from '../constants';

const Forge: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-16">
      <div className="flex items-end justify-between border-b border-white/5 pb-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-mono font-bold tracking-tighter text-white">THE_FORGE</h2>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.4em]">Open Source Contributions</p>
        </div>
        <div className="hidden md:block text-[10px] font-mono text-mint opacity-50 uppercase tracking-widest">
          S_ID: 3992 // PUBLIC_COMMITS_LIVE
        </div>
      </div>

      <div className="space-y-10">
        {OSS_CONTRIBUTIONS.map((c) => {
          const statusColor =
            c.status === 'MERGED'
              ? 'text-mint border-mint/40 bg-mint/10'
              : c.status === 'OPEN'
              ? 'text-yellow-300 border-yellow-300/40 bg-yellow-300/10'
              : 'text-gray-400 border-white/10 bg-white/5';

          return (
            <article
              key={c.id}
              className="group glass-panel rounded-sm border border-white/5 hover:border-mint/30 transition-all overflow-hidden"
            >
              {/* Top strip */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 md:px-8 py-5 border-b border-white/5 bg-void/40">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`px-2.5 py-1 border ${statusColor} text-[10px] font-mono font-bold tracking-widest rounded-sm`}
                  >
                    {c.status}
                  </span>
                  <a
                    href={c.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-sm text-white hover:text-mint transition-colors"
                  >
                    {c.repo}
                  </a>
                  <span className="text-gray-600 font-mono text-xs">/</span>
                  <a
                    href={c.prUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-mint hover:underline"
                  >
                    PR #{c.prNumber}
                  </a>
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-[10px] font-mono text-white/60 rounded-sm">
                    {c.repoStars} stars
                  </span>
                  {c.mergedDate && (
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                      Merged · {c.mergedDate}
                    </span>
                  )}
                </div>
                <a
                  href={c.prUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 border border-mint/30 bg-mint/5 text-mint text-[10px] font-mono font-bold tracking-widest rounded-sm hover:bg-mint hover:text-void transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                  VIEW_PR
                </a>
              </div>

              {/* Body */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 md:px-8 py-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono font-bold text-mint uppercase tracking-[0.3em]">
                      Contribution
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-mint transition-colors">
                      {c.prTitle}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{c.tagline}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono font-bold text-red-400/80 uppercase tracking-[0.3em]">
                        Problem
                      </div>
                      <p className="text-gray-400 text-[13px] leading-relaxed">{c.problem}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono font-bold text-mint uppercase tracking-[0.3em]">
                        Solution
                      </div>
                      <p className="text-gray-400 text-[13px] leading-relaxed">{c.solution}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-[10px] font-mono font-bold text-mint uppercase tracking-[0.3em]">
                      Highlights
                    </div>
                    <ul className="space-y-1.5">
                      {c.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="text-[12px] text-gray-300 font-mono flex items-start gap-2 leading-relaxed"
                        >
                          <span className="text-mint flex-shrink-0">»</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-white/5">
                    <div className="text-[10px] font-mono font-bold text-mint uppercase tracking-[0.3em]">
                      Modules Touched
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-white/70 rounded-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Side panel */}
                <div className="space-y-6">
                  {(c.filesChanged !== undefined ||
                    c.linesAdded !== undefined ||
                    c.linesRemoved !== undefined) && (
                    <div className="space-y-3">
                      <div className="text-[10px] font-mono font-bold text-mint uppercase tracking-[0.3em]">
                        Diff Stats
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {c.filesChanged !== undefined && (
                          <div className="p-3 bg-white/5 border border-white/10 rounded-sm text-center">
                            <div className="text-xl font-black text-white tracking-tighter">
                              {c.filesChanged}
                            </div>
                            <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-1">
                              files
                            </div>
                          </div>
                        )}
                        {c.linesAdded !== undefined && (
                          <div className="p-3 bg-mint/5 border border-mint/20 rounded-sm text-center">
                            <div className="text-xl font-black text-mint tracking-tighter">
                              +{c.linesAdded}
                            </div>
                            <div className="text-[9px] font-mono text-mint/70 uppercase tracking-widest mt-1">
                              added
                            </div>
                          </div>
                        )}
                        {c.linesRemoved !== undefined && (
                          <div className="p-3 bg-red-400/5 border border-red-400/20 rounded-sm text-center">
                            <div className="text-xl font-black text-red-400 tracking-tighter">
                              −{c.linesRemoved}
                            </div>
                            <div className="text-[9px] font-mono text-red-400/70 uppercase tracking-widest mt-1">
                              removed
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {c.issueUrl && c.issueNumber !== undefined && (
                    <div className="space-y-3">
                      <div className="text-[10px] font-mono font-bold text-mint uppercase tracking-[0.3em]">
                        Closed Issue
                      </div>
                      <a
                        href={c.issueUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="block p-4 bg-white/5 border border-white/10 rounded-sm hover:border-mint/30 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-mint text-sm">
                            check_circle
                          </span>
                          <span className="font-mono text-sm text-white">
                            Issue #{c.issueNumber}
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-gray-500 mt-1 uppercase tracking-widest">
                          Resolved
                        </div>
                      </a>
                    </div>
                  )}

                  {c.reviewer && (
                    <div className="space-y-3">
                      <div className="text-[10px] font-mono font-bold text-mint uppercase tracking-[0.3em]">
                        Reviewed By
                      </div>
                      <a
                        href={c.reviewerUrl || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="block p-4 bg-white/5 border border-white/10 rounded-sm hover:border-mint/30 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-mint text-sm">
                            verified
                          </span>
                          <span className="font-mono text-sm text-white">{c.reviewer}</span>
                        </div>
                        <div className="text-[10px] font-mono text-gray-500 mt-1 uppercase tracking-widest">
                          Maintainer
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="text-center text-[11px] font-mono text-gray-500 italic">
        More contributions in progress — focused on developer-experience improvements, error
        handling, and test coverage in widely-used AI/ML frameworks.
      </p>
    </div>
  );
};

export default Forge;
