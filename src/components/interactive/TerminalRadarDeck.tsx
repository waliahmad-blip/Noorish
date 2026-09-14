import React from 'react';
import { Database, RefreshCw, X, Download } from 'lucide-react';
import { RemoteTelemetryRecord } from '../../config/supabase';
import { getSovereignAuditLedger } from '../../utils/visitorTelemetry';
import { SOVEREIGN_ENCLAVE_CONFIG } from '../../config/sovereignEnclave';
import { audioEngine } from '../../utils/audioSynth';

interface TerminalRadarDeckProps {
  isOpen: boolean;
  onClose: () => void;
  radarLogs: RemoteTelemetryRecord[];
  loadingRadar: boolean;
}

export const TerminalRadarDeck: React.FC<TerminalRadarDeckProps> = ({
  isOpen,
  onClose,
  radarLogs,
  loadingRadar
}) => {
  if (!isOpen) return null;

  const handleExportForensicLedger = () => {
    audioEngine.playTactileClick();
    const dataToExport = radarLogs.length > 0 ? radarLogs : getSovereignAuditLedger();
    const affidavit = {
      title: "OFFICIAL VISITOR TELEMETRY & ATTRIBUTES LEDGER",
      principal: "Noorish Sabah, PAS",
      authorized_command: "Commander Wali & Noorish Sabah, PAS",
      enclave_node: SOVEREIGN_ENCLAVE_CONFIG.nodeId,
      exported_at: new Date().toISOString(),
      records: dataToExport
    };

    const blob = new Blob([JSON.stringify(affidavit, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NOORIX_TELEMETRY_LEDGER_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-quantum rounded-2xl p-5 border border-cyan-400/50 bg-obsidian-950/95 space-y-4 font-mono text-xs shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-500/20 pb-3">
        <div className="flex items-center gap-2 text-cyan-400">
          <Database className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="font-bold text-sm tracking-wider text-white">SUPABASE TELEMETRY RADAR</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 text-xs">Table: <strong className="text-cyan-300">sovereign_visitor_ledger</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportForensicLedger}
            className="px-2.5 py-1 rounded bg-obsidian-900 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-xs flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
          <button
            onClick={onClose}
            aria-label="Close Telemetry Radar Deck"
            className="p-1 rounded bg-obsidian-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loadingRadar ? (
        <div className="py-8 text-center text-slate-400 flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
          <span>Interrogating Supabase remote telemetry records...</span>
        </div>
      ) : radarLogs.length === 0 ? (
        <div className="py-6 text-center text-slate-400 space-y-1">
          <div>Awaiting first remote ledger synchronization.</div>
          <div className="text-[11px] text-slate-500">Local fallback buffer is active.</div>
        </div>
      ) : (
        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-left text-[11px]">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2 pr-3">TIMESTAMP</th>
                <th className="py-2 pr-3">SESSION ID</th>
                <th className="py-2 pr-3">IP / ISP</th>
                <th className="py-2 pr-3">GEOLOCATION</th>
                <th className="py-2 pr-3">GPU RENDERER</th>
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
                    <div className="text-[10px] text-slate-500">{log.isp || 'CELLULAR'}</div>
                  </td>
                  <td className="py-2 pr-3 whitespace-nowrap text-slate-300">
                    {log.city && log.city !== 'UNKNOWN' ? `${log.city}, ${log.country}` : 'Protected'}
                  </td>
                  <td className="py-2 pr-3 whitespace-nowrap max-w-[200px] truncate text-slate-400" title={log.gpu_renderer}>
                    {log.gpu_renderer || 'WebGL Probed'}
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
  );
};
