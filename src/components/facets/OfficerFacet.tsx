import React from 'react';
import { Shield, CheckCircle2 } from 'lucide-react';

export const OfficerFacet: React.FC = () => {
  return (
    <div className="glass-quantum rounded-3xl p-6 sm:p-10 border border-cyan-500/30 text-slate-100 shadow-2xl space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Shield className="w-4 h-4" />
            <span>Facet I • Constitutional Statecraft</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mt-1">
            The State Strategist
          </h2>
          <p className="text-sm text-slate-300 font-mono mt-1">
            Thirteen years of front-line field administration across Punjab and Sindh
          </p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-obsidian-900 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-md">
          Cadre: PAS • 40th Common
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-obsidian-900/80 border border-cyan-500/20 space-y-2">
          <div className="text-3xl font-display font-bold text-cyan-400">
            1,000,000+
          </div>
          <div className="text-sm font-semibold text-white">
            Trees Planted in Lahore
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Directed metropolitan urban forestry initiative across 45 Miyawaki clusters as Director, PHA Lahore.
          </p>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-obsidian-900/80 border border-cyan-500/20 space-y-2">
          <div className="text-3xl font-display font-bold text-cyan-400">
            7,000+
          </div>
          <div className="text-sm font-semibold text-white">
            KMC Workforce Governed
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            First woman Senior Director HRM in Karachi Metropolitan Corporation history, eliminating ghost payrolls.
          </p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-obsidian-900/80 border border-cyan-500/20 space-y-2">
          <div className="text-3xl font-display font-bold text-cyan-400">
            72-Hour
          </div>
          <div className="text-sm font-semibold text-white">
            Hafizabad Model Speed
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Pioneered integrated multi-agency child protection framework uniting police, healthcare, and judiciary.
          </p>
        </div>
      </div>

      {/* Institutional Highlights */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
          Pillars of Administrative Authority
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-obsidian-900/50 border border-cyan-500/15">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>Appointed first woman Director of Pakistan Sports Board in Punjab (119 athletic complexes).</span>
          </div>
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-obsidian-900/50 border border-cyan-500/15">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>Exercised sub-divisional magisterial powers over 1.2M citizens in Gujranwala City.</span>
          </div>
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-obsidian-900/50 border border-cyan-500/15">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>Recovered state commercial land valued at PKR 1.4 Billion from illegal encroachments.</span>
          </div>
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-obsidian-900/50 border border-cyan-500/15">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>Supervised PKR 2.0B municipal infrastructure Annual Development Programme (ADP).</span>
          </div>
        </div>
      </div>
    </div>
  );
};

