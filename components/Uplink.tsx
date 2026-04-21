
import React, { useState } from 'react';
import { CONTACT } from '../constants';

const Uplink: React.FC = () => {
  const [copied, setCopied] = useState(false);

  // Vite respects import.meta.env.BASE_URL for GitHub Pages subpath deploys.
  // Falls back to root in dev.
  const RESUME_URL = `${import.meta.env.BASE_URL}Rakesh_Chintanippu_Resume.pdf`;

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-mono font-bold tracking-tighter text-white">THE_UPLINK</h2>
        <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.4em]">Establish Secure Connection</p>
      </div>

      <div className="glass-panel border-mint/10 overflow-hidden rounded-md shadow-2xl">
        {/* Terminal Header */}
        <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between">
          <div className="flex gap-2">
            <div className="size-2 rounded-full bg-red-500/50"></div>
            <div className="size-2 rounded-full bg-yellow-500/50"></div>
            <div className="size-2 rounded-full bg-green-500/50"></div>
          </div>
          <div className="text-[10px] font-mono text-gray-500">nexus-terminal --user rak_c --host nc_at</div>
          <div className="w-10"></div>
        </div>

        <div className="p-8 space-y-8 font-mono">
          <div className="space-y-4 text-xs md:text-sm">
            <div className="flex gap-3">
              <span className="text-mint font-bold">~</span>
              <span className="text-white">whoami</span>
            </div>
            <div className="text-gray-400 pl-6 border-l border-white/10 ml-1">
              {`{`}
              <br />
              &nbsp;&nbsp;"name": "{CONTACT.name}",
              <br />
              &nbsp;&nbsp;"phone": "{CONTACT.phone}",
              <br />
              &nbsp;&nbsp;"status": "{CONTACT.availability}",
              <br />
              &nbsp;&nbsp;"focus": ["LLM & RAG Systems", "Agentic Workflows", "Real-time Platforms", "API Design", "Cloud-Native Microservices", "SSO/SAML", "Vector Search"]
              <br />
              {`}`}
            </div>

            <div className="flex gap-3">
              <span className="text-mint font-bold">~</span>
              <span className="text-white">nexus --contact</span>
            </div>
            
            <div className="pl-6 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <button 
                  onClick={copyEmail}
                  className="flex items-center gap-3 px-6 py-3 border border-mint/20 rounded-sm bg-mint/5 hover:bg-mint/10 transition-colors relative group overflow-hidden"
                >
                  <span className="material-symbols-outlined text-mint">mail</span>
                  <span className="text-white text-xs">{CONTACT.email}</span>
                  {copied && (
                    <div className="absolute inset-0 bg-mint flex items-center justify-center text-void font-bold text-[10px] tracking-widest">
                      COPIED_TO_CLIPBOARD
                    </div>
                  )}
                </button>

                <div className="flex gap-4">
                  <a
                    href={CONTACT.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-12 border border-white/10 rounded-sm flex items-center justify-center text-gray-400 hover:text-mint hover:border-mint transition-all group"
                    title="GitHub"
                  >
                    <svg className="w-6 h-6 fill-current transition-colors" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </a>
                  <a
                    href={CONTACT.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-12 border border-white/10 rounded-sm flex items-center justify-center text-gray-400 hover:text-mint hover:border-mint transition-all group"
                    title="LinkedIn"
                  >
                    <svg className="w-6 h-6 fill-current transition-colors" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <a
                  href={RESUME_URL}
                  download="Rakesh_Chintanippu_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-3 bg-mint text-void rounded-sm font-mono font-bold text-xs tracking-widest uppercase hover:bg-white transition-colors"
                >
                  <span className="material-symbols-outlined text-base">download</span>
                  DOWNLOAD_RESUME
                </a>
                <a
                  href="#pulse"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('pulse');
                    if (el) {
                      const top = el.getBoundingClientRect().top + window.scrollY - 80;
                      window.scrollTo({ top, behavior: 'smooth' });
                    }
                  }}
                  className="flex items-center justify-center gap-3 px-6 py-3 border border-white/10 rounded-sm font-mono font-bold text-xs tracking-widest uppercase text-white hover:border-mint/40 hover:text-mint transition-colors"
                >
                  <span className="material-symbols-outlined text-base">monitoring</span>
                  VIEW_LIVE_PULSE
                </a>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-sm flex items-center gap-4">
                <div className="size-3 bg-mint rounded-full animate-pulse"></div>
                <div className="text-[10px] text-gray-500 tracking-wider">
                  SYSTEM READY: WAITING FOR UPLINK...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uplink;
