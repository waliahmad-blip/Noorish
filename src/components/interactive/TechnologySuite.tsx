import React from 'react';
import { Cpu, Terminal, Database, CheckCircle2, Radio, ShieldAlert } from 'lucide-react';
import { TECHNOLOGY_SUITE } from '../../data';

export const TechnologySuite: React.FC = () => {
  return (
    <section className="py-16 bg-obsidian-950 text-slate-100 border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-xs font-mono text-cyan-400 border border-cyan-500/20">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNOLOGY SUITE • DATA ARCHITECTURE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Sovereign Computational Architecture
          </h2>
          <p className="text-sm text-slate-400">
            Pioneering the application of modern autonomous intelligence and quantitative data systems to public administration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Deep Think Card */}
          <div className="glass-quantum rounded-2xl p-6 border border-cyan-500/30 space-y-4 hover:border-cyan-400/50 transition-all">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
              <Cpu className="w-4 h-4" />
              <span>REASONING ARCHITECTURE</span>
            </div>
            <h3 className="font-display text-xl font-bold text-white">
              {TECHNOLOGY_SUITE.deepThinkAI.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {TECHNOLOGY_SUITE.deepThinkAI.description}
            </p>
            <div className="p-3.5 rounded-xl bg-obsidian-900 border border-cyan-500/20 text-xs text-cyan-300 font-mono">
              Use Cases: Legislative Briefing Synthesis • Provincial ADP Audit Analysis • Tariff Sensitivity Modeling
            </div>
          </div>

          {/* Autonomous Agent Card: Harmo AI Sovereign Command & Noorix Vanguard */}
          <div className="glass-quantum rounded-2xl p-6 border border-violet-500/40 space-y-4 hover:border-violet-400/60 transition-all bg-gradient-to-br from-obsidian-900 via-obsidian-950 to-violet-950/20 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-violet-500/20 pb-3">
              <div className="flex items-center gap-2 text-violet-400 font-mono text-xs">
                <Terminal className="w-4 h-4 text-violet-400" />
                <span className="font-bold tracking-wider">{TECHNOLOGY_SUITE.autonomousAgent.badge}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono text-amber-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>{TECHNOLOGY_SUITE.autonomousAgent.swarmStatus}</span>
              </div>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>Autonomous Sovereign Node: {TECHNOLOGY_SUITE.autonomousAgent.name}</span>
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              {TECHNOLOGY_SUITE.autonomousAgent.description}
            </p>

            <div className="p-3.5 rounded-xl bg-obsidian-900/90 border border-violet-500/30 text-xs text-violet-300 font-mono flex items-center gap-2">
              <Radio className="w-4 h-4 text-violet-400 shrink-0 animate-pulse" />
              <span>
                Operational Base: <strong className="text-white">{TECHNOLOGY_SUITE.autonomousAgent.operationalBase}</strong> ({TECHNOLOGY_SUITE.autonomousAgent.domain}) • Sovereign Multi-Agent Core
              </span>
            </div>

            {/* Lethal Mobilization Doctrine Block */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-violet-950/50 via-obsidian-900 to-amber-950/30 border border-amber-500/40 space-y-2 text-xs font-mono shadow-inner">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-[11px] tracking-wider uppercase">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>SOVEREIGN MULTI-AGENT MOBILIZATION DOCTRINE</span>
              </div>
              <p className="text-slate-200 text-xs italic leading-relaxed pl-5 border-l-2 border-amber-400/60">
                &ldquo;{TECHNOLOGY_SUITE.autonomousAgent.doctrine}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Data Stack Ledger */}
        <div className="p-6 rounded-2xl bg-obsidian-900/80 border border-cyan-500/20 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Applied Field Data Stack</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-slate-300">
            {TECHNOLOGY_SUITE.dataStack.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-obsidian-950 border border-cyan-500/15">
                <CheckCircle2 className="w-3.5 h-3.5 text-mint-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

