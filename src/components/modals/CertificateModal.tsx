import React from 'react';
import { X, ExternalLink, ShieldCheck, Award } from 'lucide-react';
import { VERIFIED_CREDENTIALS } from '../../data';
import { audioEngine } from '../../utils/audioSynth';

interface CertificateModalProps {
  certId: string | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certId, onClose }) => {
  if (!certId) return null;

  const cert = VERIFIED_CREDENTIALS.find(c => c.id === certId);
  if (!cert) return null;

  const verificationUrl = cert.edxId ? `https://credentials.edx.org/credentials/${cert.edxId}/` : '#';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/85 backdrop-blur-xl">
      <div className="relative w-full max-w-xl glass-quantum rounded-3xl p-6 sm:p-8 border border-cyan-500/40 text-slate-100 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={() => { audioEngine.playTactileClick(); onClose(); }}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-obsidian-900 transition-colors"
          aria-label="Close Verification Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 border-b border-cyan-500/20 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase text-cyan-400 tracking-wider">Official Multilateral Key</span>
            <h3 className="font-display text-xl font-bold text-white">
              {cert.institution}
            </h3>
          </div>
        </div>

        {/* Course Details */}
        <div className="space-y-3">
          <h4 className="font-display text-lg font-bold text-white">
            {cert.title}
          </h4>
          <div className="flex flex-wrap gap-2 text-xs font-mono">

            <span className="px-2.5 py-1 rounded-lg bg-obsidian-900 border border-cyan-500/30 text-slate-300">
              Code: {cert.code}
            </span>
            {cert.score && (
              <span className="px-2.5 py-1 rounded-lg bg-mint-500/20 border border-mint-500/40 text-mint-300 font-bold">
                {cert.score}
              </span>
            )}
            {cert.issuedDate && (
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-900 border border-cyan-500/30 text-cyan-400">
                Issued: {cert.issuedDate}
              </span>
            )}
          </div>
        </div>

        {/* Cryptographic Key & Signatories */}
        <div className="p-4 rounded-xl bg-obsidian-900/90 border border-cyan-500/20 space-y-3 text-xs">
          <div>
            <span className="text-slate-400 font-mono text-[11px] block">Cryptographic edX Key ID:</span>
            <span className="font-mono text-cyan-400 select-all font-semibold break-all">
              {cert.edxId}
            </span>
          </div>

          {cert.signatories && cert.signatories.length > 0 && (
            <div>
              <span className="text-slate-400 font-mono text-[11px] block mb-1">Official Institutional Signatories:</span>
              <ul className="space-y-1 font-mono text-slate-300 text-[11px]">
                {cert.signatories.map((sig, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-mint-400 shrink-0" />
                    <span>{sig}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* External edX Verification Link */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-slate-400">
            Hosted on public edX decentralized ledger
          </span>
          <a
            href={verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-obsidian-950 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/20"
          >
            <span>Verify on edX Ledger</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
};

