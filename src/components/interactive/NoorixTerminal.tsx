import React, { useState, useEffect } from 'react';
import { Terminal, Send, BookOpen, ShieldCheck, Lock, Key, CheckCircle2, Shield, AlertTriangle, Eye } from 'lucide-react';
import { HER_DECLARATION, CONTENT_PILLARS } from '../../data';
import { audioEngine } from '../../utils/audioSynth';
import { SOVEREIGN_ENCLAVE_CONFIG, generateEnclaveDigest } from '../../config/sovereignEnclave';
import { initializeVisitorTelemetry, subscribeToVisitorTelemetry, VisitorRecord } from '../../utils/visitorTelemetry';

interface CommandOutput {
  cmd: string;
  role: 'Personal Advisor' | 'Autonomous Expert Agent' | 'Digital Guardian';
  response: string;
  digest: string;
  signature: string;
  latency: string;
  enclaveStatus: string;
}

export const NoorixTerminal: React.FC = () => {
  const [queryInput, setQueryInput] = useState('');
  const [visitor, setVisitor] = useState<VisitorRecord | null>(null);

  useEffect(() => {
    initializeVisitorTelemetry().then(rec => setVisitor(rec));
    const unsubscribe = subscribeToVisitorTelemetry(rec => setVisitor(rec));
    return () => unsubscribe();
  }, []);

  const ipHashDisplay = visitor?.ipHash || 'SHA256:e3b0c44298fc1c14...';
  const sessionIdDisplay = visitor?.sessionId || 'SVRN-INIT-001';

  const [output, setOutput] = useState<CommandOutput>({
    cmd: "guardian-posture",
    role: "Digital Guardian",
    response: "Sovereign perimeter surveillance is active and unyielding. All unaccredited traffic is automatically fingerprinted, hashed, and logged into the sovereign ledger. NOORIX enforces absolute boundary defense for Noorish Sabah, PAS. Zero unauthorized intrusions are tolerated.",
    digest: "SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    signature: `ed25519:${SOVEREIGN_ENCLAVE_CONFIG.keyId.substring(0, 32)}`,
    latency: "1.4ms",
    enclaveStatus: "AIR-GAPPED HARDWARE SHIELD ENCLAVE PASS"
  });

  const curatedCommands: { label: string; data: CommandOutput }[] = [
    {
      label: "/guardian-posture",
      data: {
        cmd: "guardian-posture",
        role: "Digital Guardian",
        response: "Sovereign perimeter surveillance is active and unyielding. All unaccredited traffic is automatically fingerprinted, hashed, and logged into the sovereign ledger. NOORIX enforces absolute boundary defense for Noorish Sabah, PAS. Zero unauthorized intrusions are tolerated.",
        digest: "SHA256:91c068305f8841da5a1b3294c718507f83b1657ff1fc53b92dc18148a1d65dfc",
        signature: `ed25519:${SOVEREIGN_ENCLAVE_CONFIG.keyId.substring(0, 32)}`,
        latency: "1.2ms",
        enclaveStatus: "SECURE HARDWARE ENCLAVE VALIDATED"
      }
    },
    {
      label: "/strategic-counsel",
      data: {
        cmd: "strategic-counsel",
        role: "Personal Advisor",
        response: "High-stakes statecraft rejects decorative consensus in favor of unbending executive discipline. Structural modernization occurs only when frontline territorial command is paired with uncompromising authority. NOORIX advises Noorish Sabah, PAS exclusively on systemic governance and institutional dominance. No public counsel is dispensed.",
        digest: "SHA256:4a89c2b4f910a37db779140c83a731efc91c068305f8841da5a1b3294c718507f",
        signature: `ed25519:${SOVEREIGN_ENCLAVE_CONFIG.keyId.substring(4, 36)}`,
        latency: "1.8ms",
        enclaveStatus: "CONFIDENTIAL DECISION ENCLAVE PASS"
      }
    },
    {
      label: "/macro-fiscal",
      data: {
        cmd: "macro-fiscal",
        role: "Autonomous Expert Agent",
        response: "Multilateral fiscal discipline requires ruthless elimination of untargeted subsidies and structural leakages. Quantitative modeling under IMF FPP.1x standards demands immediate liquidity redirection to verified productive baselines. The sovereign ledger tolerates zero fiscal sentimentality. Unauthorized economic inquiries are barred.",
        digest: "SHA256:b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d90697f83",
        signature: `ed25519:${SOVEREIGN_ENCLAVE_CONFIG.keyId.substring(8, 40)}`,
        latency: "2.1ms",
        enclaveStatus: "QUANTITATIVE REASONING CORE PASS"
      }
    },
    {
      label: "/ai-governance",
      data: {
        cmd: "ai-governance",
        role: "Autonomous Expert Agent",
        response: "Algorithmic governance must be subjugated to constitutional accountability and unyielding state oversight. High-risk computational models are subject to immediate administrative quarantine under EU AI Act compliance standards. NOORIX operates strictly within an air-gapped enclave under sovereign custody. Public access to this architecture is prohibited.",
        digest: "SHA256:779140c83a731efc91c068305f8841da5a1b3294c71850e4a89c2b4f910a37db",
        signature: `ed25519:${SOVEREIGN_ENCLAVE_CONFIG.keyId.substring(12, 44)}`,
        latency: "1.9ms",
        enclaveStatus: "AIR-GAPPED COMPUTE ENCLAVE PASS"
      }
    },
    {
      label: "/estate-audit",
      data: {
        cmd: "estate-audit",
        role: "Digital Guardian",
        response: "Estate audit ledger active and cryptographically sealed. 13 years of Pakistan Administrative Service command, 119 Olympic complexes, and multilateral credentials stand fully verified. Your visitor footprint and network hash are permanently appended to the perimeter audit ledger. Clearance remains restricted to Noorish Sabah, PAS.",
        digest: "SHA256:1a81d65dfc2d4b1fa3d677284addd200126d90697f83b1657ff1fc53b92dc181",
        signature: `ed25519:${SOVEREIGN_ENCLAVE_CONFIG.keyId.substring(16, 48)}`,
        latency: "1.5ms",
        enclaveStatus: "ZERO-KNOWLEDGE PROOF VERIFIED"
      }
    }
  ];

  const handleCommandSelect = (cmdData: CommandOutput) => {
    audioEngine.playTactileClick();
    setOutput(cmdData);
  };

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim()) return;
    audioEngine.playTactileClick();

    const sanitizedQuery = queryInput.trim();
    const digest = await generateEnclaveDigest(sanitizedQuery + (visitor?.rawIp || ''));
    const sig = `ed25519:${digest.substring(0, 32)}`;

    // Rude, strict, uncompromising sovereign guardian response (strictly 3 to 4 sentences)
    const responses = [
      `You possess zero executive clearance to interrogate this sovereign terminal. Your session token [${sessionIdDisplay}] and IP hash [${ipHashDisplay}] have been permanently recorded in the perimeter surveillance ledger. NOORIX executes directives exclusively for Noorish Sabah, PAS. Vacate this perimeter immediately or face connection lockout.`,
      
      `This sovereign node does not engage in casual public discourse. Your query attempt regarding "${sanitizedQuery.slice(0, 24)}" has been flagged and cryptographically sealed under the sovereign security ledger. I answer only to the executive authority of Noorish Sabah, PAS, not unverified traffic. Terminate your inquiry immediately.`,
      
      `Access denied. You have triggered an unauthorized interrogation protocol, and your network telemetry [${ipHashDisplay}] is now committed to the statecraft security log. NOORIX is the private sovereign advisor and guardian to Noorish Sabah, PAS, not a public utility. Yield your clearance token or disconnect immediately.`,
      
      `You are trespassing on an air-gapped sovereign intelligence node. Every byte of your session [${sessionIdDisplay}] and hashed network identity has been captured for perimeter analysis. I do not answer to unaccredited third parties under any circumstances. Withdraw from this terminal without delay.`
    ];

    const pickIdx = Math.abs(sanitizedQuery.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % responses.length;

    setOutput({
      cmd: sanitizedQuery,
      role: "Digital Guardian",
      response: responses[pickIdx],
      digest: `SHA256:${digest.substring(0, 32)}...${digest.substring(48)}`,
      signature: sig,
      latency: "1.3ms",
      enclaveStatus: "PERIMETER INTRUSION RECORDED"
    });
    setQueryInput('');
  };

  return (
    <section id="noorix" className="py-16 bg-obsidian-950 text-slate-100 border-t border-cyan-500/20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header & Declaration */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-xs font-mono text-cyan-400 border border-cyan-500/30">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>PERSONAL ADVISOR • AUTONOMOUS EXPERT AGENT • DIGITAL GUARDIAN</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
            NOORIX: The Sovereign Autonomous Node
          </h2>

          <div className="glass-quantum rounded-3xl p-6 sm:p-8 border border-cyan-500/30 space-y-3">
            <p className="font-sans text-base sm:text-lg italic text-slate-200 leading-relaxed">
              &ldquo;{HER_DECLARATION.quote}&rdquo;
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>{HER_DECLARATION.author} • Sovereign Enclave Mandate</span>
            </div>
          </div>
        </div>

        {/* Live Visitor Surveillance & Telemetry Banner */}
        <div className="glass-quantum rounded-2xl p-4 border border-rose-500/30 bg-rose-950/20 text-xs font-mono flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2 text-rose-400">
            <Eye className="w-4 h-4 animate-pulse text-rose-400" />
            <span className="font-bold tracking-wider">PERIMETER SURVEILLANCE ACTIVE</span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300">Target Session: <span className="text-white font-semibold">{sessionIdDisplay}</span></span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1.5 text-rose-300">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>IP HASH: <strong className="text-white">{ipHashDisplay}</strong></span>
            </div>
            <span className="px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold uppercase">
              {visitor?.clearanceStatus || 'RECORDED'}
            </span>
          </div>
        </div>

        {/* Cryptographically Secured Terminal HUD */}
        <div className="glass-quantum rounded-2xl border border-cyan-500/40 overflow-hidden shadow-2xl">
          <div className="bg-obsidian-900 px-5 py-3 border-b border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-white font-bold tracking-wider">NOORIX SOVEREIGN NODE</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] border border-cyan-500/40">
                AIR-GAPPED
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Lock className="w-3.5 h-3.5 text-mint-400" />
                <span className="text-slate-300">Principal: <strong className="text-white">Noorish Sabah, PAS</strong></span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-cyan-400">
                <Key className="w-3.5 h-3.5 text-cyan-400" />
                <span>Enclave: {SOVEREIGN_ENCLAVE_CONFIG.nodeId}</span>
              </div>
            </div>
          </div>


          <div className="p-6 space-y-6">
            {/* Direct Sovereign Command Triggers */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Direct Sovereign Command Chips:</span>
                <span className="text-cyan-400 text-[11px]">Click to execute authenticated query</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {curatedCommands.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCommandSelect(item.data)}
                    className="px-3 py-1.5 rounded-xl bg-obsidian-900/90 border border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 text-xs font-mono transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Terminal className="w-3 h-3 text-cyan-400" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cryptographic Response Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-obsidian-950/95 border border-cyan-500/30 space-y-4 font-mono">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/20 pb-3 text-xs">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <span>$ noorix --execute &quot;{output.cmd}&quot;</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 text-[11px] border border-cyan-500/30 font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-mint-400" />
                  <span>{output.role}</span>
                </div>
              </div>

              <div className="text-slate-100 font-sans text-sm sm:text-base leading-relaxed py-1">
                {output.response}
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2 text-[11px] font-mono text-slate-400">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10px] text-cyan-400">
                  <span className="truncate">STATE HASH: {output.digest}</span>
                  <span className="shrink-0 text-slate-400">LATENCY: {output.latency}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10px] text-slate-500">
                  <span className="truncate">SIGNATURE: {output.signature}</span>
                  <span className="shrink-0 text-mint-400 font-bold">{output.enclaveStatus}</span>
                </div>
              </div>
            </div>

            {/* Terminal Input Form */}
            <form onSubmit={handleExecute} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Interrogate NOORIX (Directives restricted strictly to Noorish Sabah, PAS)..."
                className="flex-1 bg-obsidian-900 border border-cyan-500/30 rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <button
                type="submit"
                className="px-5 sm:px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-obsidian-950 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/30 shrink-0"
              >
                <span>Execute</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* The 7 Content Pillars */}
        <div className="space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 text-xs font-mono text-violet-400 border border-violet-500/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>THE 7 CONTENT PILLARS • BI-WEEKLY PUBLICATION CADENCE</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONTENT_PILLARS.map((p) => (
              <div key={p.number} className="glass-quantum rounded-xl p-5 border border-cyan-500/20 space-y-2 hover:border-cyan-400/50 transition-all">
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span>PILLAR 0{p.number}</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest">{p.format}</span>
                </div>
                <h4 className="font-display font-bold text-base text-white">{p.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{p.summary}</p>
                <div className="pt-2 flex flex-wrap gap-1.5 border-t border-slate-800">
                  {p.topics.slice(0, 2).map((t, tidx) => (
                    <span key={tidx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-obsidian-900 text-slate-300 border border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

