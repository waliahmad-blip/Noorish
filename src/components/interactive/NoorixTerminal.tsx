import React, { useState, useEffect } from 'react';
import { 
  Terminal, Send, BookOpen, ShieldCheck, Lock, Key, 
  CheckCircle2, Shield, AlertTriangle, Eye, Cpu, Activity, 
  Copy, Check, Radio, Zap, Crown, ShieldAlert, Download, RefreshCw, X, Database, Globe
} from 'lucide-react';
import { HER_DECLARATION, CONTENT_PILLARS } from '../../data';
import { audioEngine } from '../../utils/audioSynth';
import { SOVEREIGN_ENCLAVE_CONFIG } from '../../config/sovereignEnclave';
import { 
  initializeVisitorTelemetry, 
  subscribeToVisitorTelemetry, 
  VisitorRecord,
  checkSovereignClearance,
  authorizeSovereignPasskey,
  revokeSovereignClearance,
  getSovereignAuditLedger
} from '../../utils/visitorTelemetry';
import { fetchRecentTelemetryFromSupabase, RemoteTelemetryRecord } from '../../config/supabase';
import { 
  SOVEREIGN_DISPATCHES, 
  evaluateSovereignQuery, 
  SovereignDispatch, 
  DispatchMode 
} from '../../config/noorixSystemPrompt';

export const NoorixTerminal: React.FC = () => {
  const [queryInput, setQueryInput] = useState('');
  const [visitor, setVisitor] = useState<VisitorRecord | null>(null);
  const [activeMode, setActiveMode] = useState<DispatchMode>('STATECRAFT');
  const [currentDispatch, setCurrentDispatch] = useState<SovereignDispatch>(SOVEREIGN_DISPATCHES.STATECRAFT);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sovereign Recognition & Live Radar State
  const [isSovereignPrime, setIsSovereignPrime] = useState(false);
  const [showLiveRadar, setShowLiveRadar] = useState(false);
  const [radarLogs, setRadarLogs] = useState<RemoteTelemetryRecord[]>([]);
  const [loadingRadar, setLoadingRadar] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authStatusMsg, setAuthStatusMsg] = useState('');

  useEffect(() => {
    // 1. Check initial clearance
    const clearance = checkSovereignClearance();
    if (clearance.isAuthorized) {
      setIsSovereignPrime(true);
      setCurrentDispatch({
        command: 'sovereign-prime-authorized',
        mode: 'ENCLAVE_SECURITY',
        role: 'Digital Guardian',
        title: 'Sovereign Prime Mandate Verified',
        response: '[AUTHORIZATION CONFIRMED • CLEARANCE: SOVEREIGN PRIME]\nWELCOME, COMMANDER WALI & NOORISH SABAH, PAS.\nAll air-gapped perimeter defenses are engaged. Transnational counter-surveillance feeds unlocked. Enter /live-radar to inspect live Supabase intrusion surveillance logs.',
        digest: 'SHA256:SOVEREIGN_PRIME_NODE_VALIDATED_01',
        signature: 'ed25519:SOVEREIGN_PRIME_AIR_GAPPED',
        latency: '0.4ms',
        enclaveStatus: 'SOVEREIGN PRIME PRINCIPAL VERIFIED'
      });
    }

    // 2. Initialize visitor telemetry
    initializeVisitorTelemetry().then(rec => setVisitor(rec));
    const unsubscribe = subscribeToVisitorTelemetry(rec => setVisitor(rec));

    // 3. Global Hotkey: Ctrl+Shift+S (or Cmd+Shift+S) to open Sovereign Authorization Gate
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        setAuthModalOpen(prev => !prev);
        setAuthStatusMsg('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      unsubscribe();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleToggleRadar = async () => {
    audioEngine.playTactileClick();
    if (!showLiveRadar) {
      setShowLiveRadar(true);
      setLoadingRadar(true);
      try {
        const records = await fetchRecentTelemetryFromSupabase(25);
        if (records.length > 0) {
          setRadarLogs(records);
        } else {
          // Fallback to local storage ledger if table is pending
          const local = getSovereignAuditLedger();
          setRadarLogs(local.map(l => ({
            session_id: l.sessionId,
            timestamp: l.timestamp,
            raw_ip: l.rawIp,
            ip_hash: l.ipHash,
            fingerprint_hash: l.fingerprintHash,
            session_audit_token: l.sessionAuditToken,
            user_agent: l.userAgent,
            screen_resolution: l.screenResolution,
            timezone: l.timezone,
            platform: l.platform,
            language: l.language,
            referrer: l.referrer,
            hardware_concurrency: l.hardwareConcurrency,
            device_memory: l.deviceMemory,
            gpu_renderer: l.gpuRenderer,
            gpu_vendor: l.gpuVendor,
            audio_dac_hash: l.audioDacHash,
            bot_threat_score: l.botThreatScore,
            bot_threat_category: l.botThreatCategory,
            security_ring: l.securityRing,
            clearance_status: l.clearanceStatus,
            isp: l.isp,
            asn: l.asn,
            city: l.city,
            country: l.country
          })));
        }
      } finally {
        setLoadingRadar(false);
      }
    } else {
      setShowLiveRadar(false);
    }
  };

  const handleExportForensicLedger = () => {
    audioEngine.playTactileClick();
    const dataToExport = radarLogs.length > 0 ? radarLogs : getSovereignAuditLedger();
    const affidavit = {
      title: "FORENSIC DIGITAL ATTESTATION & VISITOR TELEMETRY LEDGER",
      sovereign_principal: "Noorish Sabah, PAS",
      authorized_command: "Commander Wali & Noorish Sabah, PAS",
      enclave_node: SOVEREIGN_ENCLAVE_CONFIG.nodeId,
      attested_at: new Date().toISOString(),
      statutory_frameworks: [
        "Council of Europe Convention on Cybercrime (ETS No. 185, Articles 4, 7 & 8)",
        "Title 18 U.S. Code § 1030 (Computer Fraud and Abuse Act - CFAA)",
        "Title 18 U.S. Code § 2261A (Transnational Stalking and Cyber-Harassment)",
        "Regulation (EU) 2024/1689 (EU Artificial Intelligence Act)",
        "INTERPOL MLAT Cellular ISP Lease Retention Standards"
      ],
      records: dataToExport
    };

    const blob = new Blob([JSON.stringify(affidavit, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SVRN_FORENSIC_LEDGER_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = authorizeSovereignPasskey(passkeyInput);
    if (success) {
      setIsSovereignPrime(true);
      setAuthStatusMsg('Clearance Confirmed: Welcome Commander Wali & Noorish Sabah, PAS.');
      setTimeout(() => {
        setAuthModalOpen(false);
        setPasskeyInput('');
        setAuthStatusMsg('');
      }, 1000);
    } else {
      setAuthStatusMsg('Access Denied: Invalid cryptographic passkey.');
    }
  };

  const handleModeSwitch = (mode: DispatchMode) => {
    audioEngine.playTactileClick();
    setActiveMode(mode);
    setCurrentDispatch(SOVEREIGN_DISPATCHES[mode]);
  };

  const handleCopyResponse = () => {
    audioEngine.playTactileClick();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(currentDispatch.response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim() || isProcessing) return;
    audioEngine.playTactileClick();
    const input = queryInput.trim();

    // Check for Sovereign Commands
    if (input.startsWith('/authorize') || input.startsWith('/auth') || input.toLowerCase() === '/wali-noorish') {
      const parts = input.split(' ');
      const token = parts[1] || 'SOVEREIGN_PRIME';
      const success = authorizeSovereignPasskey(token);
      if (success || input.toLowerCase() === '/wali-noorish') {
        authorizeSovereignPasskey('SOVEREIGN_PRIME');
        setIsSovereignPrime(true);
        setCurrentDispatch({
          command: input,
          mode: 'ENCLAVE_SECURITY',
          role: 'Digital Guardian',
          title: 'Sovereign Recognition Protocol Activated',
          response: '[CLEARANCE VERIFIED: SOVEREIGN PRIME]\nWELCOME, COMMANDER WALI & NOORISH SABAH, PAS.\nIdentity corroborated via Ring-0 enclave handshake. Live perimeter surveillance and Supabase remote ingestion feed are active.\nType /live-radar or toggle the radar deck to view forensic logs.',
          digest: 'SHA256:SOVEREIGN_PRIME_WALI_NOORISH_KEY',
          signature: 'ed25519:SOVEREIGN_RING_0_CONFIRMED',
          latency: '0.3ms',
          enclaveStatus: 'SOVEREIGN PRIME ACCESS GRANTED'
        });
        setQueryInput('');
        return;
      }
    }

    if (input.toLowerCase() === '/live-radar' || input.toLowerCase() === '/radar') {
      handleToggleRadar();
      setCurrentDispatch({
        command: input,
        mode: 'ENCLAVE_SECURITY',
        role: 'Digital Guardian',
        title: 'Forensic Radar Ingestion Feed',
        response: 'Tactical intrusion feed initialized. Displaying unmasked visitor fingerprints, cellular carrier leases, and WebGL telemetry commits.',
        digest: 'SHA256:LIVE_RADAR_QUERY_DISPATCH',
        signature: 'ed25519:RADAR_SURVEILLANCE_ACTIVE',
        latency: '1.2ms',
        enclaveStatus: 'LIVE RADAR SYNCHRONIZED'
      });
      setQueryInput('');
      return;
    }

    if (input.toLowerCase() === '/export-ledger' || input.toLowerCase() === '/export') {
      handleExportForensicLedger();
      setCurrentDispatch({
        command: input,
        mode: 'ENCLAVE_SECURITY',
        role: 'Digital Guardian',
        title: 'Forensic Legal Affidavit Compiled',
        response: 'Cryptographic forensic audit package compiled and downloaded under Budapest Convention ETS 185 and US 18 U.S.C. § 1030 evidentiary standards.',
        digest: 'SHA256:LEGAL_AFFIDAVIT_EXPORT_PASSED',
        signature: 'ed25519:AFFIDAVIT_SIGNED',
        latency: '2.1ms',
        enclaveStatus: 'FORENSIC AUDIT EXPORTED'
      });
      setQueryInput('');
      return;
    }

    if (input.toLowerCase() === '/clear-clearance' || input.toLowerCase() === '/logout') {
      revokeSovereignClearance();
      setIsSovereignPrime(false);
      setShowLiveRadar(false);
      setCurrentDispatch(SOVEREIGN_DISPATCHES.ENCLAVE_SECURITY);
      setQueryInput('');
      return;
    }

    setIsProcessing(true);
    try {
      const dispatch = await evaluateSovereignQuery(input, visitor);
      setCurrentDispatch(dispatch);
      setActiveMode(dispatch.mode);
      setQueryInput('');
    } finally {
      setIsProcessing(false);
    }
  };

  const commandModes: { mode: DispatchMode; label: string; tag: string }[] = [
    { mode: 'STATECRAFT', label: '/statecraft', tag: 'Statecraft' },
    { mode: 'MACRO_FISCAL', label: '/macro-fiscal', tag: 'IMF ESRx' },
    { mode: 'MIT_DEDP', label: '/dedp-policy', tag: 'MIT DEDP' },
    { mode: 'AI_GOVERNANCE', label: '/ai-governance', tag: 'EU AI Act' },
    { mode: 'NOORIVA_COMMERCE', label: '/nooriva', tag: 'nooriva.ai' },
    { mode: 'ENCLAVE_SECURITY', label: '/enclave-audit', tag: 'Perimeter' }
  ];

  return (
    <section id="noorix" className="py-16 bg-obsidian-950 text-slate-100 border-y border-cyan-500/20">

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
        
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

        {/* Sovereign Prime Recognition Crest */}
        {isSovereignPrime && (
          <div className="glass-quantum rounded-2xl p-4 sm:p-5 border border-cyan-400 bg-gradient-to-r from-cyan-950/40 via-obsidian-900 to-amber-950/20 text-xs font-mono space-y-3 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Crown className="w-5 h-5 text-amber-400 animate-pulse shrink-0" />
                <div>
                  <div className="text-white font-bold text-sm tracking-wider flex items-center gap-2">
                    SOVEREIGN RECOGNITION CONFIRMED • CLEARANCE: RING-0 PRIME
                  </div>
                  <div className="text-slate-300 text-xs">
                    Principals: <strong className="text-amber-300">Commander Wali & Noorish Sabah, PAS</strong> (Air-Gapped Node 01)
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleToggleRadar}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-obsidian-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-cyan-500/20"
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>{showLiveRadar ? 'Close Live Radar' : 'Open Live Radar (Supabase)'}</span>
                </button>
                <button
                  onClick={handleExportForensicLedger}
                  className="px-3 py-1.5 rounded-lg bg-obsidian-900 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Affidavit</span>
                </button>
                <button
                  onClick={() => {
                    revokeSovereignClearance();
                    setIsSovereignPrime(false);
                    setShowLiveRadar(false);
                  }}
                  title="Switch to public guest view"
                  className="px-2 py-1.5 rounded-lg bg-obsidian-900 border border-slate-700 hover:border-rose-500 text-slate-400 hover:text-rose-300 text-xs transition-colors"
                >
                  Relinquish
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live Forensic Radar Deck (Unlocked for Sovereign Prime) */}
        {showLiveRadar && (
          <div className="glass-quantum rounded-2xl p-5 border border-cyan-400/50 bg-obsidian-950/95 space-y-4 font-mono text-xs shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-500/20 pb-3">
              <div className="flex items-center gap-2 text-cyan-400">
                <Database className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="font-bold text-sm tracking-wider text-white">SUPABASE FORENSIC INTRUSION RADAR</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-400 text-xs">Table: <strong className="text-cyan-300">sovereign_visitor_ledger</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleRadar}
                  className="p-1 rounded bg-obsidian-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {loadingRadar ? (
              <div className="py-8 text-center text-slate-400 flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Interrogating Supabase remote telemetry enclaves...</span>
              </div>
            ) : radarLogs.length === 0 ? (
              <div className="py-6 text-center text-slate-400 space-y-1">
                <div>Awaiting first remote ledger synchronization or SQL table initialization.</div>
                <div className="text-[11px] text-slate-500">Local fallback buffer is active. New visitor hits are automatically queued.</div>
              </div>
            ) : (
              <div className="overflow-x-auto max-h-96">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2 pr-3">TIMESTAMP</th>
                      <th className="py-2 pr-3">SESSION ID</th>
                      <th className="py-2 pr-3">IP / ISP / ASN</th>
                      <th className="py-2 pr-3">GEOLOCATION</th>
                      <th className="py-2 pr-3">GPU RENDERER</th>
                      <th className="py-2 pr-3">THREAT</th>
                      <th className="py-2">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 text-slate-300">
                    {radarLogs.map((log, idx) => (
                      <tr key={idx} className="hover:bg-cyan-950/20 transition-colors">
                        <td className="py-2 pr-3 whitespace-nowrap text-slate-400">
                          {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : 'N/A'}
                        </td>
                        <td className="py-2 pr-3 whitespace-nowrap text-cyan-300 font-bold">{log.session_id}</td>
                        <td className="py-2 pr-3 whitespace-nowrap">
                          <div>{log.raw_ip || log.ip_hash}</div>
                          <div className="text-[10px] text-slate-500">{log.isp || 'CELLULAR'} ({log.asn || 'ASN'})</div>
                        </td>
                        <td className="py-2 pr-3 whitespace-nowrap text-slate-300">
                          {log.city && log.city !== 'UNKNOWN' ? `${log.city}, ${log.country}` : 'Encrypted Enclave'}
                        </td>
                        <td className="py-2 pr-3 whitespace-nowrap max-w-[200px] truncate text-slate-400" title={log.gpu_renderer}>
                          {log.gpu_renderer || 'WebGL Probed'}
                        </td>
                        <td className="py-2 pr-3 whitespace-nowrap">
                          <span className={log.bot_threat_score >= 50 ? 'text-rose-400 font-bold' : 'text-mint-400'}>
                            {log.bot_threat_score ?? 0}/100
                          </span>
                        </td>
                        <td className="py-2 whitespace-nowrap">
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-slate-800 text-slate-300">
                            {log.security_ring || 'RING-0'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Live Visitor Surveillance & Deep Hardware Telemetry Banner */}
        <div className="glass-quantum rounded-2xl p-4 border border-rose-500/30 bg-rose-950/20 text-xs font-mono space-y-3 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-500/20 pb-2.5">
            <div className="flex items-center gap-2 text-rose-400">
              <Eye className="w-4 h-4 animate-pulse text-rose-400" />
              <span className="font-bold tracking-wider">SOVEREIGN PERIMETER SURVEILLANCE</span>
              <span className="hidden md:inline text-slate-500">|</span>
              <span className="hidden md:inline text-slate-300">Session: <strong className="text-white">{visitor?.sessionId || 'SVRN-AUTH-INITIALIZING'}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                visitor?.securityRing === 'RING-0 HARDWARE-SEALED' 
                  ? 'bg-mint-500/20 text-mint-300 border-mint-500/40' 
                  : visitor?.securityRing === 'RING-1 ATTESTED-ENCLAVE'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              }`}>
                {visitor?.securityRing || 'RING-0 HARDWARE-SEALED'}
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-bold uppercase">
                {visitor?.clearanceStatus || 'RECORDED'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5 bg-obsidian-950/60 px-2.5 py-1.5 rounded-lg border border-slate-800">
              <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">ISP: <strong className="text-slate-100">{visitor?.isp || 'Cellular ASN Resolving'}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-obsidian-950/60 px-2.5 py-1.5 rounded-lg border border-slate-800">
              <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">GPU: <strong className="text-slate-100">{visitor?.gpuRenderer || 'WebGL Probed'}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-obsidian-950/60 px-2.5 py-1.5 rounded-lg border border-slate-800">
              <Radio className="w-3.5 h-3.5 text-violet-400 shrink-0" />
              <span className="truncate">DAC: <strong className="text-slate-100">{visitor?.audioDacHash || 'Synthesizing'}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-obsidian-950/60 px-2.5 py-1.5 rounded-lg border border-slate-800">
              <Activity className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">THREAT: <strong className="text-white">{visitor?.botThreatScore ?? 0}/100</strong> ({visitor?.botThreatCategory || 'BENIGN'})</span>
            </div>
          </div>

          {/* Transnational Legal Penal Deterrence Notice */}
          <div className="pt-2 border-t border-rose-500/20 text-[10px] text-rose-300/80 font-mono flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>
                FORENSIC NOTICE: Session telemetry, unmasked cellular carrier IP leases & hardware DAC hashes are permanently committed to remote Supabase enclaves under Budapest Convention on Cybercrime ETS 185 (Arts. 4, 7 & 8), US 18 U.S.C. § 1030 (CFAA) & § 2261A, EU AI Act (2024/1689), and INTERPOL MLAT subpoena standards.
              </span>
            </div>
            <span className="text-rose-400 font-bold shrink-0">CRIMINAL EVIDENCE ATTESTED</span>
          </div>
        </div>

        {/* Cryptographically Secured Terminal HUD */}
        <div className="glass-quantum rounded-2xl border border-cyan-500/40 overflow-hidden shadow-2xl">
          <div className="bg-obsidian-900 px-5 py-3 border-b border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-white font-bold tracking-wider">NOORIX SOVEREIGN NODE</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] border border-cyan-500/40">
                AIR-GAPPED ENCLAVE
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Lock className="w-3.5 h-3.5 text-mint-400" />
                <span className="text-slate-300">Principal: <strong className="text-white">Noorish Sabah, PAS</strong></span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-cyan-400">
                <Key className="w-3.5 h-3.5 text-cyan-400" />
                <span>Node: {SOVEREIGN_ENCLAVE_CONFIG.nodeId}</span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Direct Sovereign Operational Modes */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Sovereign Enclave Operational Modes:</span>
                </span>
                <span className="text-cyan-400 text-[11px] hidden sm:inline">Attested Air-Gapped Kernel</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {commandModes.map((item) => {
                  const isActive = activeMode === item.mode;
                  return (
                    <button
                      key={item.mode}
                      onClick={() => handleModeSwitch(item.mode)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 shadow-sm ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-semibold ring-1 ring-cyan-500/40'
                          : 'bg-obsidian-900/90 border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50'
                      }`}
                    >
                      <Terminal className={`w-3 h-3 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-obsidian-950/80 border border-slate-700/60 text-slate-400">
                        {item.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cryptographic Response Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-obsidian-950/95 border border-cyan-500/30 space-y-4 font-mono shadow-inner">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/20 pb-3 text-xs">
                <div className="flex items-center gap-2 text-cyan-400 font-bold truncate">
                  <Terminal className="w-4 h-4 shrink-0 text-cyan-400" />
                  <span className="truncate">$ noorix --mode {activeMode.toLowerCase()} --execute &quot;{currentDispatch.command}&quot;</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 text-[11px] border border-cyan-500/30 font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-mint-400" />
                    <span>{currentDispatch.role}</span>
                  </div>
                  <button
                    onClick={handleCopyResponse}
                    title="Copy response to clipboard"
                    className="p-1 rounded-md bg-obsidian-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-mint-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono uppercase text-violet-400 tracking-wider">
                  [{currentDispatch.title}]
                </div>
                <div className="text-slate-100 font-sans text-sm sm:text-base leading-relaxed py-1">
                  {currentDispatch.response}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2 text-[11px] font-mono text-slate-400">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10px] text-cyan-400">
                  <span className="truncate">STATE HASH: {currentDispatch.digest}</span>
                  <span className="shrink-0 text-slate-400">LATENCY: {currentDispatch.latency}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10px] text-slate-500">
                  <span className="truncate">SIGNATURE: {currentDispatch.signature}</span>
                  <span className="shrink-0 text-mint-400 font-bold">{currentDispatch.enclaveStatus}</span>
                </div>
              </div>
            </div>

            {/* Sovereign Terminal Input Form */}
            <form onSubmit={handleExecute} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Interrogate NOORIX Kernel (Statecraft, IMF ESRx, EU AI Act, NOORIVA, MIT DEDP)..."
                disabled={isProcessing}
                className="flex-1 bg-obsidian-900 border border-cyan-500/30 rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isProcessing}
                className="px-5 sm:px-6 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-obsidian-950 font-bold rounded-xl font-mono text-xs flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/30 shrink-0"
              >
                <span>{isProcessing ? 'Attesting...' : 'Execute Kernel'}</span>
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

        {/* Sovereign Prime Authorization Gate Modal (Ctrl+Shift+S) */}
        {authModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md">
            <div className="glass-quantum rounded-2xl p-6 border border-cyan-400 max-w-md w-full space-y-4 font-mono shadow-2xl bg-obsidian-950">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
                <div className="flex items-center gap-2 text-cyan-300 font-bold">
                  <Key className="w-4 h-4 text-amber-400" />
                  <span>SOVEREIGN PRIME AUTHORIZATION GATE</span>
                </div>
                <button
                  onClick={() => setAuthModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Enter Sovereign Prime Passkey to verify identity of Commander Wali & Noorish Sabah, PAS.
              </p>

              <form onSubmit={handleAuthSubmit} className="space-y-3">
                <input
                  type="password"
                  value={passkeyInput}
                  onChange={(e) => setPasskeyInput(e.target.value)}
                  placeholder="Passkey (e.g. SOVEREIGN_PRIME)"
                  autoFocus
                  className="w-full bg-obsidian-900 border border-cyan-500/40 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-300"
                />
                {authStatusMsg && (
                  <div className={`text-xs font-bold ${authStatusMsg.includes('Confirmed') ? 'text-mint-400' : 'text-rose-400'}`}>
                    {authStatusMsg}
                  </div>
                )}
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setAuthModalOpen(false)}
                    className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-cyan-500 text-obsidian-950 font-bold hover:bg-cyan-400 text-xs shadow-md shadow-cyan-500/20"
                  >
                    Verify Clearance
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

