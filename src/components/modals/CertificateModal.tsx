import React, { useState, useEffect } from "react";
import { X, ExternalLink, ShieldCheck, Award, Copy, Check, FileCheck, Landmark, Globe } from "lucide-react";
import { VERIFIED_CREDENTIALS, IN_PROGRESS_CREDENTIALS } from "../../data";
import { Credential } from "../../types/protocol";
import { audioEngine } from "../../utils/audioSynth";

interface CertificateModalProps {
  certId: string | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certId, onClose }) => {
  const [copiedProof, setCopiedProof] = useState(false);

  useEffect(() => {
    if (certId) {
      audioEngine.playAttestationChime();
    }
  }, [certId]);

  if (!certId) return null;

  const allCredentials: Credential[] = [
    ...VERIFIED_CREDENTIALS,
    ...IN_PROGRESS_CREDENTIALS,
    {
      id: "mit-dedp",
      title: "Data, Economics, and Design of Policy (DEDP) Advanced Policy Fellow",
      code: "MIT.DEDP.2026",
      institution: "Massachusetts Institute of Technology (MIT)",
      status: "In Progress",
      achievement: "MIT DEDP Advanced Policy Fellow (2026 – Onwards)",
      issuedDate: "2026 – Onwards",
      pillar: "Macroeconomic & Fiscal Policy",
      score: "Fellow Track",
      benefitToPakistan: "Architecting randomized control trials (RCTs), econometric fiscal evaluations, and algorithmic social safety nets for provincial planning.",
      signatories: [
        "Department of Economics, Massachusetts Institute of Technology",
        "Abdul Latif Jameel Poverty Action Lab (J-PAL)"
      ]
    }
  ];

  const cert = allCredentials.find(c => c.id === certId);
  if (!cert) return null;

  const isVerified = cert.status === "Completed";
  const verificationUrl = cert.edxId ? ("https://credentials.edx.org/credentials/" + cert.edxId + "/") : "#";

  const copyAttestationProof = () => {
    const proofText = "[NOORIX-SOVEREIGN-PROOF]\n" +
      "CREDENTIAL: " + cert.title + "\n" +
      "CODE: " + cert.code + "\n" +
      "ISSUING_BODY: " + cert.institution + "\n" +
      "STATUS: " + cert.status.toUpperCase() + "\n" +
      "PILLAR: " + cert.pillar + "\n" +
      "KEY_ID: " + (cert.edxId || "SOVEREIGN-IN-PROGRESS-2026") + "\n" +
      "ISSUED: " + (cert.issuedDate || "2026") + "\n" +
      "VERIFICATION_STATUS: ATTESTED_OFFICIAL\n" +
      "SIGNATURE_CADRE: PAS-40TH-COMMON";

    navigator.clipboard.writeText(proofText);
    audioEngine.playTactileClick();
    setCopiedProof(true);
    setTimeout(() => setCopiedProof(false), 2400);
  };

  const getBadgeTheme = (inst: string) => {
    if (inst.includes("Oxford")) return "border-amber-500/40 bg-amber-500/10 text-amber-300";
    if (inst.includes("IMF")) return "border-cyan-500/40 bg-cyan-500/10 text-cyan-300";
    if (inst.includes("KU Leuven")) return "border-violet-500/40 bg-violet-500/10 text-violet-300";
    if (inst.includes("HP")) return "border-mint-500/40 bg-mint-500/10 text-mint-300";
    if (inst.includes("MIT")) return "border-rose-500/40 bg-rose-500/10 text-rose-300";
    return "border-cyan-500/40 bg-cyan-500/10 text-cyan-300";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/85 backdrop-blur-xl">
      <div className="relative w-full max-w-xl glass-quantum rounded-3xl p-6 sm:p-8 border border-cyan-500/40 text-slate-100 shadow-2xl space-y-6 max-h-[88vh] overflow-y-auto">
        
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
          <div className={"w-12 h-12 rounded-2xl border flex items-center justify-center shadow-lg " + getBadgeTheme(cert.institution)}>
            {cert.institution.includes("Oxford") || cert.institution.includes("IMF") ? (
              <Landmark className="w-6 h-6" />
            ) : (
              <Award className="w-6 h-6" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase text-cyan-400 tracking-wider">
                Official Multilateral Key
              </span>
              <span className={"px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase " + (
                isVerified
                  ? "bg-mint-500/20 text-mint-300 border border-mint-500/40"
                  : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
              )}>
                {isVerified ? "Verified Sovereign" : "Active Fellowship"}
              </span>
            </div>
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
            <span className="px-2.5 py-1 rounded-lg bg-obsidian-900 border border-cyan-500/30 text-slate-300">
              Pillar: {cert.pillar}
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

        {/* Strategic Benefit to Pakistan */}
        {cert.benefitToPakistan && (
          <div className="p-4 rounded-xl bg-obsidian-900/90 border border-cyan-500/25 space-y-1.5 text-xs">
            <span className="font-mono font-semibold text-cyan-400 uppercase text-[10px] block tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              Strategic Public Value & Administrative Impact:
            </span>
            <p className="text-slate-300 leading-relaxed font-sans">{cert.benefitToPakistan}</p>
          </div>
        )}

        {/* Cryptographic Key & Signatories */}
        <div className="p-4 rounded-xl bg-obsidian-900/90 border border-cyan-500/20 space-y-3 text-xs">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-slate-400 font-mono text-[11px] block">Cryptographic Public Ledger Key ID:</span>
              <span className="font-mono text-cyan-400 select-all font-semibold break-all">
                {cert.edxId || "SOVEREIGN-IN-PROGRESS-2026"}
              </span>
            </div>
            <button
              onClick={copyAttestationProof}
              className="px-2.5 py-1 rounded-lg bg-obsidian-950 border border-cyan-500/30 text-slate-300 hover:text-white hover:border-cyan-400 text-[11px] font-mono flex items-center gap-1.5 transition-all"
            >
              {copiedProof ? <Check className="w-3.5 h-3.5 text-mint-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copiedProof ? "Copied Proof" : "Copy Attestation"}</span>
            </button>
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

        {/* External Ledger Verification Link */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
            {isVerified ? "Attested on public edX decentralized ledger" : "Institutional academic candidate record"}
          </span>
          {cert.edxId ? (
            <a
              href={verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-obsidian-950 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/20"
            >
              <span>Verify on edX Ledger</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <span className="px-4 py-2 rounded-xl bg-obsidian-900 border border-cyan-500/20 text-slate-400 font-mono text-xs">
              Attestation Active
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
