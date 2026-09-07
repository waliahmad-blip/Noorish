import React from 'react';
import { Cpu, ExternalLink, Terminal } from 'lucide-react';

interface AIGovernorFacetProps {
  onInspectCertificate: (certId: string) => void;
}

export const AIGovernorFacet: React.FC<AIGovernorFacetProps> = ({ onInspectCertificate }) => {
  return (
    <div className="glass-quantum rounded-3xl p-6 sm:p-10 border border-violet-500/30 text-slate-100 shadow-2xl space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-violet-500/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-widest">
            <Cpu className="w-4 h-4" />
            <span>Facet III • Sovereign Intelligence & Ethics</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mt-1">
            The AI Policy Governor
          </h2>
          <p className="text-sm text-slate-300 font-mono mt-1">
            KU Leuven HUMANAIx (Issued 7 Sep 2026) • HP AI Ethics (100% Score)
          </p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-obsidian-900 border border-violet-500/40 text-violet-300 text-xs font-mono shadow-md">
          Engine: Sovereign Neural Inference Core
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* KU Leuven Card */}
        <div className="p-6 rounded-2xl bg-obsidian-900/80 border border-violet-500/30 space-y-4 relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase text-violet-400">KU Leuven & VAIA</span>
              <h3 className="font-display text-lg font-bold text-white">
                AI to Understand and Connect People
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded bg-violet-500/20 text-violet-300 text-xs font-mono border border-violet-500/40">
              Verified 7 Sep 2026
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Human-centred AI systems, psychological alignment, algorithmic mediation, and societal cohesion frameworks. Signed by Vice Rector of KU Leuven and Chairman of Flanders AI Academy.
          </p>
          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400">ID: 9db3635447dd40...</span>
            <button
              onClick={() => onInspectCertificate('ku-leuven-humanaix')}
              className="text-xs font-mono text-violet-400 hover:text-violet-300 flex items-center gap-1.5 underline underline-offset-4"
            >
              <span>Inspect Verification</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* HP AI in Society Card */}
        <div className="p-6 rounded-2xl bg-obsidian-900/80 border border-cyan-500/30 space-y-4 relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase text-cyan-400">HP Education</span>
              <h3 className="font-display text-lg font-bold text-white">
                AI in Society: Ethics & Leadership
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded bg-mint-500/20 text-mint-300 text-xs font-mono border border-mint-500/40 font-bold">
              100% Score A+
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Ethical boundary design, algorithmic fairness, organizational leadership in computational shifts, and public sector deployment governance.
          </p>
          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400">ID: 1227397f56d6...</span>
            <button
              onClick={() => onInspectCertificate('hp-ai-society')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 underline underline-offset-4"
            >
              <span>Inspect Verification</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sovereign Autonomous Agent: Noorix */}
      <div className="p-6 rounded-2xl bg-obsidian-900/90 border border-violet-500/20 space-y-4">
        <div className="flex items-center gap-2 text-violet-400 font-mono text-xs">
          <Terminal className="w-4 h-4" />
          <span>SOVEREIGN AUTONOMOUS AGENT • NOORIX ARCHITECTURE</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Noorix represents the civil service&apos;s first sovereign autonomous agent. Designed to process complex legislative documents, answer citizen policy inquiries with verified accuracy and quantitative precision, and execute automated municipal triage without proprietary vendor lock-in.
        </p>
        <div className="flex flex-wrap gap-2 text-[11px] font-mono text-violet-300">
          <span className="px-3 py-1 rounded-full bg-obsidian-950 border border-violet-500/30">Sovereign Neural Inference Core</span>
          <span className="px-3 py-1 rounded-full bg-obsidian-950 border border-violet-500/30">Autonomous Workflow Routing</span>
          <span className="px-3 py-1 rounded-full bg-obsidian-950 border border-violet-500/30">Zero Commercial Leakage</span>
          <span className="px-3 py-1 rounded-full bg-obsidian-950 border border-violet-500/30">Provincial Telemetry</span>
        </div>
      </div>
    </div>
  );
};

