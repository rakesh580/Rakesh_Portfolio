
import React from 'react';

interface HeaderProps {
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const navItems = [
    { id: 'nexus', label: 'NEXUS' },
    { id: 'cortex', label: 'CORTEX' },
    { id: 'timeline', label: 'TIMELINE' },
    { id: 'lab', label: 'LAB' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
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
      
      // Update URL hash without jumping
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
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

        <a 
          href="#uplink"
          onClick={(e) => scrollToSection(e, 'uplink')}
          className="flex items-center gap-2 px-6 py-2 border border-mint/30 rounded-sm text-mint text-[10px] font-mono font-bold tracking-widest hover:bg-mint hover:text-void hover:shadow-[0_0_15px_#00FF8860] transition-all duration-300"
        >
          <span className="material-symbols-outlined text-sm">wifi_tethering</span>
          UPLINK
        </a>
      </div>
    </header>
  );
};

export default Header;
