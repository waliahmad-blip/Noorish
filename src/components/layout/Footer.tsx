import React from 'react';
import { ShieldCheck, Mail, Globe, ArrowUp, Linkedin, Facebook, Instagram, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-obsidian-950 text-slate-300 border-t border-cyan-500/20 pt-16 pb-28 md:pb-12">
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
              Director, Pakistan Sports Board (Punjab) • Pakistan Administrative Service (40th Common) • Founder, NOORIVA • MIT DEDP Advanced Policy Fellow (2026 – Onwards). Dedicated to constitutional statecraft, multilateral economic design, and autonomous intelligence governance.
            </p>
            <div className="text-xs font-mono text-cyan-400 pt-1">
              Motto: Governance by duty. Glow by design.
            </div>

            {/* Sole Authorized Social Profiles */}
            <div className="space-y-1.5 pt-2">
              <div className="text-[11px] font-mono text-cyan-400 font-semibold flex items-center gap-1.5 uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-mint-400" />
                <span>Sole Authorized Social Channels</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <a 
                  href="https://www.linkedin.com/in/noorishsabah/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-obsidian-900 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://www.facebook.com/noorishsabah" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-obsidian-900 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5 text-blue-400" />
                  <span>Facebook</span>
                </a>
                <a 
                  href="https://www.instagram.com/noorishsabah/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-obsidian-900 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-rose-400" />
                  <span>Instagram</span>
                </a>
              </div>
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
                <a href="https://nooriva.ai" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <Globe className="w-4 h-4 text-violet-400/80" />
                  <span>Venture Node: nooriva.ai</span>
                </a>
              </li>
              <li>
                <a href="#authenticity" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-mint-400/80" />
                  <span>Authenticity Ledger</span>
                </a>
              </li>
              <li>
                <a href="mailto:noorish@nooriva.ai" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-400/80" />
                  <span>Executive: noorish@nooriva.ai</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Verification & Security Integrity */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold text-cyan-400 tracking-wider uppercase">
              Legal & Forensic Protocol
            </h4>
            <div className="p-4 rounded-xl bg-obsidian-900/90 border border-cyan-500/20 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-1.5 text-cyan-400 font-medium">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>Synthetic Media Immunity</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Strict legal deterrence under Budapest Convention ETS No. 185 and Title 18 U.S.C. § 2261A against non-consensual deepfakes, scraper blogs, or impersonation aliases.
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

