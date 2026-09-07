import React from 'react';
import { ShieldCheck, Mail, Globe, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-obsidian-950 text-slate-300 border-t border-cyan-500/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Identity Monogram */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl border border-cyan-500/50 bg-obsidian-900 flex items-center justify-center text-cyan-400 font-display font-bold text-lg shadow-lg shadow-cyan-500/10">
                NS
              </div>
              <span className="font-display text-xl font-bold tracking-wide text-white">
                Noorish Sabah, PAS
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Director, Pakistan Sports Board (Punjab) • Pakistan Administrative Service (40th Common) • Founder, NOORIVA • MIT MicroMasters Candidate. Dedicated to constitutional statecraft, multilateral economic design, and autonomous intelligence governance.
            </p>
            <div className="text-xs font-mono text-cyan-400 pt-1">
              Motto: Governance by duty. Glow by design.
            </div>
          </div>

          {/* Canonical Verified Domains */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold text-cyan-400 tracking-wider uppercase">
              Canonical Architecture
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://noorish.org" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-400/80" />
                  <span>Primary Node: noorish.org</span>
                </a>
              </li>
              <li>
                <a href="https://nooriva.co" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <Globe className="w-4 h-4 text-violet-400/80" />
                  <span>Venture Node: nooriva.co</span>
                </a>
              </li>
              <li>
                <a href="mailto:noorish@nooriva.co" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4 text-mint-400/80" />
                  <span>Executive: noorish@nooriva.co</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Verification & Security Integrity */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold text-cyan-400 tracking-wider uppercase">
              Institutional Protocol
            </h4>
            <div className="p-4 rounded-xl bg-obsidian-900/90 border border-cyan-500/20 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-1.5 text-cyan-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-mint-400" />
                <span>Verified Entity Cryptography</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Multilateral credentials cryptographically verified via public registry identifiers issued by KU Leuven, IMF, IDB, and HP Education.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div>
            The Sovereign Matrix • noorish.org • Official Sovereign Digital Estate • English Only
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-obsidian-900 border border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 transition-all shadow-md"
          >
            <span>Return to Summit</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

