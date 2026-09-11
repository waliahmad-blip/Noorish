import React, { useState } from "react";
import { TrendingUp, Calculator, ExternalLink } from "lucide-react";
import { audioEngine } from "../../utils/audioSynth";

interface EconomistFacetProps {
  onInspectCertificate?: (certId: string) => void;
}

export const EconomistFacet: React.FC<EconomistFacetProps> = ({ onInspectCertificate }) => {
  const [subsidyReformPct, setSubsidyReformPct] = useState(45);

  const annualSavingsPKR = Math.round((subsidyReformPct / 100) * 420);
  const protectedFamiliesM = (subsidyReformPct * 0.16).toFixed(1);
  const circularDebtMitigation = Math.round(subsidyReformPct * 0.85);

  return (
    <div className="glass-quantum rounded-3xl p-6 sm:p-10 border border-mint-500/30 text-slate-100 shadow-2xl space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-mint-500/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-mint-400 uppercase tracking-widest">
            <TrendingUp className="w-4 h-4" />
            <span>Facet II • Multilateral Quantitative Policy</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mt-1">
            The Macro-Economist
          </h2>
          <p className="text-sm text-slate-300 font-mono mt-1">
            IMF FPP.1x (A+) & ESRx • Oxford XFLSP01 • MIT DEDP Advanced Policy Fellow (2026 – Onwards)
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {onInspectCertificate && (
            <>
              <button
                onClick={() => {
                  audioEngine.playTactileClick();
                  onInspectCertificate("imf-esrx");
                }}
                className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 text-xs font-mono flex items-center gap-1.5 transition-all"
              >
                <span>IMF ESRx</span>
                <ExternalLink className="w-3 h-3" />
              </button>
              <button
                onClick={() => {
                  audioEngine.playTactileClick();
                  onInspectCertificate("imf-fpp1x");
                }}
                className="px-3 py-1.5 rounded-xl bg-mint-500/10 border border-mint-500/30 text-mint-300 hover:text-white hover:border-mint-400 text-xs font-mono flex items-center gap-1.5 transition-all"
              >
                <span>IMF FPP.1x (A+)</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-obsidian-900/80 border border-mint-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-mint-400" />
            <h3 className="font-display text-lg font-semibold text-white">
              Interactive Energy Subsidy & Targeted Transfer Simulator
            </h3>
          </div>
          <span className="text-xs font-mono text-mint-400">
            IMF ESRx & MIT Quantitative Policy Methodology
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
          Adjust the slider to simulate the fiscal outcome of rationalizing regressive power tariffs and redeploying savings into targeted unconditional cash transfers.
        </p>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-slate-200">
            <span>Regressive Tariff Subsidy Rationalization:</span>
            <span className="font-bold text-mint-400 text-sm">{subsidyReformPct}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={subsidyReformPct}
            onChange={(e) => {
              audioEngine.playTactileClick();
              setSubsidyReformPct(Number(e.target.value));
            }}
            className="w-full h-2 bg-obsidian-950 rounded-lg appearance-none cursor-pointer accent-mint-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-obsidian-950/90 border border-mint-500/20 text-center space-y-1">
            <div className="text-xs font-mono text-slate-400">Fiscal Savings Yield</div>
            <div className="text-2xl font-display font-bold text-mint-400">
              PKR {annualSavingsPKR}B
            </div>
            <div className="text-[10px] text-slate-400">Annual Sovereign Relief</div>
          </div>

          <div className="p-4 rounded-xl bg-obsidian-950/90 border border-mint-500/20 text-center space-y-1">
            <div className="text-xs font-mono text-slate-400">Direct Cash Expansion</div>
            <div className="text-2xl font-display font-bold text-cyan-400">
              {protectedFamiliesM}M
            </div>
            <div className="text-[10px] text-slate-400">Vulnerable Families Covered</div>
          </div>

          <div className="p-4 rounded-xl bg-obsidian-950/90 border border-mint-500/20 text-center space-y-1">
            <div className="text-xs font-mono text-slate-400">Circular Debt Relief</div>
            <div className="text-2xl font-display font-bold text-violet-400">
              -{circularDebtMitigation}%
            </div>
            <div className="text-[10px] text-slate-400">Energy Sector Balance Drain</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-200">
        <div className="p-4 rounded-xl bg-obsidian-900/60 border border-mint-500/15 space-y-1">
          <div className="font-semibold text-mint-400 font-mono">IMF Financial Programming (FPP.1x)</div>
          <p className="text-slate-300">
            Formulation of balance-of-payments projections, monetary survey equations, and macroeconomic stabilization envelopes.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-obsidian-900/60 border border-mint-500/15 space-y-1">
          <div className="font-semibold text-mint-400 font-mono">MIT DEDP Advanced Policy Fellow (2026 – Onwards)</div>
          <p className="text-slate-300">
            Rigorous econometric impact evaluation, randomized control trial (RCT) policy design, and targeted social welfare systems.
          </p>
        </div>
      </div>
    </div>
  );
};
