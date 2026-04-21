
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'nexus', label: 'NEXUS' },
    { id: 'cortex', label: 'CORTEX' },
    { id: 'timeline', label: 'TIMELINE' },
    { id: 'lab', label: 'LAB' },
    { id: 'pulse', label: 'PULSE' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      window.history.pushState(null, '', `#${id}`);
    }
  };

  // Scroll lock + Esc to close when mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-void/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-mint flex items-center justify-center rounded-sm shadow-[0_0_10px_#00FF8840]">
              <span className="material-symbols-outlined text-void text-xl font-bold">terminal</span>
            </div>
            <span className="font-mono font-bold text-lg tracking-tighter text-white">
              RAKESH_<span className="text-mint">PORTFOLIO</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`text-[10px] font-mono font-bold tracking-[0.2em] transition-all duration-300 hover:text-white ${
                  activeSection === item.id ? 'text-mint' : 'text-gray-400'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#uplink"
              onClick={(e) => scrollToSection(e, 'uplink')}
              className="hidden md:flex items-center gap-2 px-6 py-2 border border-mint/30 rounded-sm text-mint text-[10px] font-mono font-bold tracking-widest hover:bg-mint hover:text-void hover:shadow-[0_0_15px_#00FF8860] transition-all duration-300"
            >
              <span className="material-symbols-outlined text-sm">wifi_tethering</span>
              UPLINK
            </a>

            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              className="md:hidden size-10 flex items-center justify-center border border-white/10 rounded-sm text-white hover:border-mint/50 transition-colors"
            >
              <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-void/95 backdrop-blur-xl animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <div className="h-20"></div>
          <nav className="flex flex-col items-center gap-2 pt-10 px-6" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`w-full max-w-xs text-center py-4 rounded-sm border font-mono font-bold text-sm tracking-[0.2em] transition-all ${
                  activeSection === item.id
                    ? 'text-mint border-mint/40 bg-mint/5'
                    : 'text-white border-white/10 hover:border-mint/30 hover:text-mint'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#uplink"
              onClick={(e) => scrollToSection(e, 'uplink')}
              className="w-full max-w-xs mt-6 py-4 bg-mint text-void text-center rounded-sm font-mono font-bold text-sm tracking-[0.2em] flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">wifi_tethering</span>
              ESTABLISH UPLINK
            </a>
            <p className="text-[10px] font-mono text-gray-500 tracking-widest mt-8 uppercase">
              Press Esc to close
            </p>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
