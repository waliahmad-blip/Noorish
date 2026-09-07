import React from 'react';
import { Globe2, Trophy } from 'lucide-react';
import { INTERNATIONAL_PARTNERSHIPS, HISTORICAL_FIRSTS } from '../../data';

export const PartnershipAndFirsts: React.FC = () => {
  return (
    <section className="py-16 bg-obsidian-950 text-slate-100 border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section 7: International Partnerships */}
        <div className="space-y-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-xs font-mono text-cyan-400 border border-cyan-500/20">
              <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>MULTILATERAL ENGAGEMENT • INTERNATIONAL PARTNERSHIPS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Multilateral Collaboration Portfolio
            </h2>
            <p className="text-sm text-slate-400">
              Collaborative policy implementation with global development institutions across child welfare, environment, and urban infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INTERNATIONAL_PARTNERSHIPS.map((p, idx) => (
              <div key={idx} className="glass-quantum rounded-xl p-5 border border-cyan-500/20 shadow-md space-y-2 hover:border-cyan-400/50 transition-all">
                <div className="flex items-center gap-2.5 font-display font-bold text-base text-white">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>{p.entity}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-4">
                  {p.focus}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 8: Historical Firsts */}
        <div className="space-y-6 pt-6 border-t border-slate-800">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 text-xs font-mono text-violet-400 border border-violet-500/20">
              <Trophy className="w-3.5 h-3.5 text-violet-400" />
              <span>INSTITUTIONAL PRECEDENTS • HISTORICAL FIRSTS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Precedents Established on Public Record
            </h2>
            <p className="text-sm text-slate-400">
              Eight benchmark institutional achievements redefining public governance capability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {HISTORICAL_FIRSTS.map((item, idx) => (
              <div key={idx} className="glass-quantum rounded-2xl p-5 border border-cyan-500/20 shadow-md flex items-start gap-4 hover:border-cyan-400/50 transition-all">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  0{idx + 1}
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-display font-bold text-base text-white">{item.title}</h4>
                    <span className="text-xs font-mono text-cyan-400 font-semibold">{item.year}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

