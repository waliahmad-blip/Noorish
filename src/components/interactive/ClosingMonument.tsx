import React from 'react';
import { Sparkles } from 'lucide-react';
import { CLOSING_STATEMENT } from '../../data';

export const ClosingMonument: React.FC = () => {
  return (
    <section className="py-20 bg-obsidian-950 text-slate-100 relative overflow-hidden border-t border-cyan-500/30">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-10">
        
        {/* Monogram Crest */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl border-2 border-cyan-400 bg-obsidian-900 flex items-center justify-center text-cyan-400 font-display font-bold text-2xl shadow-xl shadow-cyan-500/20">
            NS
          </div>
        </div>

        {/* Monument Statement */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-xs font-mono text-cyan-400 tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SOVEREIGN ARCHITECTURE • THE MONUMENTAL PRECEDENT</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            &ldquo;{CLOSING_STATEMENT.quote}&rdquo;
          </h2>

          <div className="pt-2">
            <div className="font-display font-bold text-lg text-white">
              {CLOSING_STATEMENT.author}
            </div>
            <div className="text-xs font-mono text-cyan-400/90 mt-1">
              Director, Pakistan Sports Board (Punjab) • Pakistan Administrative Service (40th Common)
            </div>
          </div>
        </div>

        {/* Appendix Summary */}
        <div className="pt-8 border-t border-cyan-500/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="p-4 rounded-xl bg-obsidian-900/80 border border-cyan-500/20 text-xs space-y-1 hover:border-cyan-400/40 transition-all">
            <div className="font-mono text-cyan-400 text-[11px] uppercase">Architecture</div>
            <div className="font-display font-bold text-white">Concept 2 Chromatic Hyper-Prism</div>
          </div>
          <div className="p-4 rounded-xl bg-obsidian-900/80 border border-cyan-500/20 text-xs space-y-1 hover:border-cyan-400/40 transition-all">
            <div className="font-mono text-cyan-400 text-[11px] uppercase">Engine</div>
            <div className="font-display font-bold text-white">Three.js WebGL & Web Audio</div>
          </div>
          <div className="p-4 rounded-xl bg-obsidian-900/80 border border-cyan-500/20 text-xs space-y-1 hover:border-cyan-400/40 transition-all">
            <div className="font-mono text-cyan-400 text-[11px] uppercase">Reputation</div>
            <div className="font-display font-bold text-white">Multi-Entity Schema Graph</div>
          </div>
          <div className="p-4 rounded-xl bg-obsidian-900/80 border border-cyan-500/20 text-xs space-y-1 hover:border-cyan-400/40 transition-all">
            <div className="font-mono text-cyan-400 text-[11px] uppercase">Integrity</div>
            <div className="font-display font-bold text-white">100% Cryptographic Audit</div>
          </div>
        </div>

      </div>
    </section>
  );
};

