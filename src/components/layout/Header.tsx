import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Compass, Award, Cpu, Sparkles } from 'lucide-react';
import { audioEngine } from '../../utils/audioSynth';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timePK, setTimePK] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimePK(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Karachi', hour12: false, hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { id: 'cartography', label: '13-Year Cartography', icon: Compass },
    { id: 'credentials', label: 'Verified Credentials', icon: Award },
    { id: 'uniqueness', label: 'Uniqueness Thesis', icon: Sparkles },
    { id: 'noorix', label: 'Noorix Terminal', icon: Cpu }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-quantum border-b border-cyan-500/20 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Sovereign Monogram Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl border border-cyan-500/50 bg-obsidian-900 flex items-center justify-center text-cyan-400 font-display font-bold text-lg shadow-lg shadow-cyan-500/10">
            NS
          </div>
          <div>
            <div className="font-display text-lg font-bold tracking-wide text-white flex items-center gap-2">
              Noorish Sabah <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">PAS</span>
            </div>
            <div className="text-[11px] font-mono text-cyan-400/80 tracking-wider">
              SOVEREIGN DIGITAL ESTATE
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                audioEngine.playTactileClick();
                onNavigate(link.id);
              }}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-1"
            >
              <link.icon className="w-4 h-4 text-cyan-400/80" />
              <span>{link.label}</span>
            </button>
          ))}
        </nav>

        {/* Global Telemetry & Audio Synthesizer */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-obsidian-900 border border-cyan-500/20 text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-mint-400 animate-pulse" />
            <span>LHE/ISB {timePK} PKT</span>
          </div>

          <button
            onClick={toggleSound}
            aria-label="Toggle Quantum Harmonic Audio"
            className={`px-3.5 py-1.5 rounded-full border text-xs font-mono flex items-center gap-2 transition-all ${
              !isMuted 
                ? 'bg-cyan-500 text-obsidian-950 border-cyan-400 shadow-md shadow-cyan-500/30 font-bold' 
                : 'bg-obsidian-900 text-cyan-400 border-cyan-500/30 hover:border-cyan-400'
            }`}
          >
            {!isMuted ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{!isMuted ? 'AUDIO ACTIVE' : 'AUDIO MUTED'}</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-200 hover:text-cyan-400 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-quantum border-b border-cyan-500/20 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                audioEngine.playTactileClick();
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-400 flex items-center gap-3 font-medium text-sm transition-all"
            >
              <link.icon className="w-4 h-4 text-cyan-400" />
              <span>{link.label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

