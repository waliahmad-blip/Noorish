import React from 'react';
import { Target, Globe, Milestone } from 'lucide-react';
import { GROWTH_MILESTONES, LEGACY_KPIS } from '../../data';

export const BrandAndGrowthLedger: React.FC = () => {
  return (
    <section className="py-16 bg-obsidian-950 text-slate-100 border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section 10: Brand Architecture */}
        <div className="space-y-6">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-xs font-mono text-cyan-400 border border-cyan-500/20">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>DIGITAL INFRASTRUCTURE • SECURE SOVEREIGN NODES</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-white">
              Sovereign Digital Architecture
            </h2>
            <p className="text-sm text-slate-400">
              Sanitized, canonical online ecosystem anchored in public institutional governance, AI ethics, and subordinate enterprise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-quantum rounded-2xl p-5 border border-cyan-500/30 space-y-2">
              <span className="text-[11px] font-mono uppercase text-cyan-400 font-semibold">Primary Sovereign Node</span>
              <div className="font-display font-bold text-lg text-white">noorish.org</div>
              <p className="text-xs text-slate-300">Official executive dossier, certified credentials, and public policy intelligence matrix.</p>
            </div>

            <div className="glass-quantum rounded-2xl p-5 border border-violet-500/30 space-y-2">
              <span className="text-[11px] font-mono uppercase text-violet-400 font-semibold">Subordinate Venture Node</span>
              <div className="font-display font-bold text-lg text-white">nooriva.co</div>
              <p className="text-xs text-slate-300">Halal ingestible cellular wellness enterprise serving Pakistan, UAE, UK, and North America.</p>
            </div>

            <div className="glass-quantum rounded-2xl p-5 border border-mint-500/30 space-y-2">
              <span className="text-[11px] font-mono uppercase text-mint-400 font-semibold">Executive Transmission</span>
              <div className="font-display font-bold text-lg text-white">noorish@nooriva.co</div>
              <p className="text-xs text-slate-300">Direct executive communications, institutional correspondence, and verified verification protocols.</p>
            </div>
          </div>
        </div>

        {/* Section 11: Growth Milestones */}
        <div className="space-y-6 pt-4 border-t border-slate-800">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-xs font-mono text-cyan-400 border border-cyan-500/20">
              <Milestone className="w-3.5 h-3.5 text-cyan-400" />
              <span>CHRONOLOGICAL SERVICE TIMELINE • 2012 TO 2026</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-white">
              Chronological Service Progression
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {GROWTH_MILESTONES.map((item, idx) => (
              <div key={idx} className="glass-quantum rounded-xl p-4 border border-cyan-500/20 space-y-1.5 text-xs hover:border-cyan-400/50 transition-all">
                <span className="font-mono font-bold text-cyan-400 block text-xs">{item.year}</span>
                <p className="text-slate-300 leading-relaxed">{item.event}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 12: Legacy KPIs */}
        <div className="space-y-6 pt-4 border-t border-slate-800">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-xs font-mono text-cyan-400 border border-cyan-500/20">
              <Target className="w-3.5 h-3.5 text-cyan-400" />
              <span>LEGACY AUDIT & MEASURABLE IMPACT TARGETS</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-white">
              Institutional Legacy KPIs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LEGACY_KPIS.map((kpi, idx) => (
              <div key={idx} className="glass-quantum rounded-xl p-4 border border-cyan-500/30 space-y-2">
                <div className="text-xs font-mono text-cyan-300 font-semibold">{kpi.label}</div>
                <div className="text-lg font-display font-bold text-white">{kpi.current}</div>
                <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800 flex justify-between items-center">
                  <span>Target: {kpi.target}</span>
                  <span className="text-cyan-400 font-bold">{kpi.timeframe}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

