import React, { useState } from 'react';
import { Award, CheckCircle, Clock, ExternalLink, ShieldCheck } from 'lucide-react';
import { VERIFIED_CREDENTIALS, IN_PROGRESS_CREDENTIALS } from '../../data';
import { Credential } from '../../types/protocol';
import { audioEngine } from '../../utils/audioSynth';

interface CredentialVaultProps {
  onInspectCertificate: (certId: string) => void;
}

export const CredentialVault: React.FC<CredentialVaultProps> = ({ onInspectCertificate }) => {
  const [tab, setTab] = useState<'completed' | 'in-progress'>('completed');
  const [pillar, setPillar] = useState<string>('All');

  const pillars = ['All', 'AI Governance', 'Macroeconomic & Fiscal Policy', 'Urban Futures', 'Strategic Leadership'];

  const filterList = (list: Credential[]) => {
    if (pillar === 'All') return list;
    return list.filter(c => c.pillar === pillar);
  };

  const list = tab === 'completed' ? filterList(VERIFIED_CREDENTIALS) : filterList(IN_PROGRESS_CREDENTIALS);

  return (
    <section id="credentials" className="py-16 bg-obsidian-950 text-slate-100 border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-xs font-mono text-cyan-400 border border-cyan-500/20">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>SPECIALIZATION REGISTER • VERIFIED MULTILATERAL VAULT</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Cryptographically Verified Credentials
          </h2>
          <p className="text-sm text-slate-400">
            Official multilateral certifications across AI ethics, macroeconomic programming, and urban policy design.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-1.5 bg-obsidian-900 p-1.5 rounded-xl border border-cyan-500/20">
            <button
              onClick={() => { audioEngine.playTactileClick(); setTab('completed'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                tab === 'completed' ? 'bg-cyan-500 text-obsidian-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Verified ({VERIFIED_CREDENTIALS.length})</span>
            </button>
            <button
              onClick={() => { audioEngine.playTactileClick(); setTab('in-progress'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                tab === 'in-progress' ? 'bg-cyan-500 text-obsidian-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>In-Progress ({IN_PROGRESS_CREDENTIALS.length})</span>
            </button>
          </div>


          <div className="flex flex-wrap items-center gap-1.5">
            {pillars.map((p) => (
              <button
                key={p}
                onClick={() => { audioEngine.playTactileClick(); setPillar(p); }}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  pillar === p
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 font-semibold'
                    : 'bg-obsidian-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {list.map((cred) => (
            <div key={cred.id} className="glass-quantum rounded-2xl p-6 border border-cyan-500/20 shadow-xl space-y-4 flex flex-col justify-between hover:border-cyan-400/50 transition-all">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                    {cred.institution}
                  </span>
                  {cred.score && (
                    <span className="px-2.5 py-1 rounded-md bg-mint-500/15 border border-mint-500/30 text-mint-400 font-bold text-xs font-mono">
                      {cred.score}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg font-bold text-white">{cred.title}</h3>
                {cred.achievement && (
                  <p className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{cred.achievement}</span>
                  </p>
                )}
                {cred.benefitToPakistan && (
                  <div className="p-3 rounded-xl bg-obsidian-900/90 border border-cyan-500/20 text-xs text-slate-300 space-y-1">
                    <span className="font-mono font-semibold text-cyan-400 uppercase text-[10px] block tracking-wider">
                      Strategic Impact:
                    </span>
                    <p className="leading-relaxed">{cred.benefitToPakistan}</p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                {cred.edxId ? (
                  <>
                    <span className="text-slate-400 text-xs">edX: {cred.edxId.substring(0, 12)}...</span>
                    <button
                      onClick={() => onInspectCertificate(cred.id)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400 flex items-center gap-1.5 transition-all"
                    >
                      <span>Inspect Details</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </>
                ) : (
                  <span className="text-xs font-mono text-slate-400">MIT DEDP Active Enrollment</span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

