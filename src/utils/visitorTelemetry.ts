// Sovereign Visitor Surveillance & Deep Hardware Telemetry Engine
// Attested Hardware Profiling & Zero-Trust Perimeter Defense for Noorish Sabah, PAS

import { sendTelemetryToSupabase } from '../config/supabase';

export interface NetworkProfile {
  downlink?: number;
  effectiveType?: string;
  rtt?: number;
  saveData?: boolean;
}

export type BotThreatCategory = 'BENIGN_VERIFIED' | 'PASSIVE_TELEMETRY' | 'SUSPECT_AUTOMATION' | 'HOSTILE_SCRAPER';
export type SecurityRing = 'RING-0 HARDWARE-SEALED' | 'RING-1 ATTESTED-ENCLAVE' | 'RING-2 QUARANTINED';

export interface VisitorRecord {
  sessionId: string;
  timestamp: string;
  rawIp: string;
  ipHash: string;
  fingerprintHash: string;
  sessionAuditToken: string;
  userAgent: string;
  screenResolution: string;
  timezone: string;
  platform: string;
  language: string;
  referrer: string;
  hardwareConcurrency: number;
  deviceMemory: string;
  gpuRenderer: string;
  gpuVendor: string;
  audioDacHash: string;
  botThreatScore: number;
  botThreatCategory: BotThreatCategory;
  networkProfile: NetworkProfile;
  securityRing: SecurityRing;
  clearanceStatus: 'TIER-0 UNVERIFIED' | 'REVOKED' | 'RECORDED_INTRUSION' | 'SOVEREIGN_AUDIT_LOGGED';
  isp?: string;
  asn?: string;
  city?: string;
  country?: string;
}

const LEDGER_STORAGE_KEY = 'noorish_sovereign_visitor_ledger';
const SESSION_STORAGE_KEY = 'noorish_sovereign_session_id';
export const SOVEREIGN_CLEARANCE_KEY = 'noorish_sovereign_clearance';
export const SOVEREIGN_PRIME_TOKEN = 'SOVEREIGN_PRIME';

// Fast SHA-256 computation using Web Crypto API with deterministic fallback
export async function sha256(input: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    try {
      const msgBuffer = new TextEncoder().encode(input);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch {
      // Fallback below
    }
  }
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(64, '0');
}

function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 'SVRN-SRV-INIT';
  try {
    let sid = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!sid) {
      sid = 'SVRN-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Date.now().toString(36).toUpperCase();
      sessionStorage.setItem(SESSION_STORAGE_KEY, sid);
    }
    return sid;
  } catch {
    return 'SVRN-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-MEM';
  }
}

// WebGL Unmasked GPU Renderer & Vendor Extraction
function extractGpuInfo(): { renderer: string; vendor: string } {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { renderer: 'SERVER_ENCLAVE_EMULATED', vendor: 'SOVEREIGN_NODE' };
  }

  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) {
      return { renderer: 'SOFTWARE_OR_WEBGL_RESTRICTED', vendor: 'UNKNOWN' };
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || 'UNKNOWN_VENDOR';
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'UNKNOWN_RENDERER';
      return {
        vendor: String(vendor).replace(/[\r\n\t]/g, ' ').trim(),
        renderer: String(renderer).replace(/[\r\n\t]/g, ' ').trim()
      };
    }

    const genericVendor = gl.getParameter(gl.VENDOR) || 'STANDARD_GL_VENDOR';
    const genericRenderer = gl.getParameter(gl.RENDERER) || 'STANDARD_GL_RENDERER';
    return {
      vendor: String(genericVendor),
      renderer: String(genericRenderer)
    };
  } catch {
    return { renderer: 'HARDWARE_QUERY_BLOCKED', vendor: 'PROTECTED_ENCLAVE' };
  }
}

// AudioContext DAC Harmonic Fingerprint (Non-audible offline synthesis)
async function extractAudioDacFingerprint(): Promise<string> {
  if (typeof window === 'undefined') return 'DAC:OFFLINE_SRV';

  try {
    const AudioCtx = window.OfflineAudioContext || (window as unknown as { webkitOfflineAudioContext: typeof OfflineAudioContext }).webkitOfflineAudioContext;
    if (!AudioCtx) return 'DAC:UNSUPPORTED';

    const context = new AudioCtx(1, 44100, 44100);
    const oscillator = context.createOscillator();
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(10000, context.currentTime);

    const compressor = context.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-50, context.currentTime);
    compressor.knee.setValueAtTime(40, context.currentTime);
    compressor.ratio.setValueAtTime(12, context.currentTime);
    compressor.attack.setValueAtTime(0, context.currentTime);
    compressor.release.setValueAtTime(0.25, context.currentTime);

    oscillator.connect(compressor);
    compressor.connect(context.destination);
    oscillator.start(0);

    const audioBuffer = await context.startRendering();
    const channelData = audioBuffer.getChannelData(0);

    let sampleSum = 0;
    for (let i = 4500; i < 5000; i++) {
      sampleSum += Math.abs(channelData[i]);
    }
    const rawVal = sampleSum.toFixed(8);
    const dacHash = await sha256(`DAC_HARMONICS:${rawVal}`);
    return `DAC:${dacHash.substring(0, 16)}`;
  } catch {
    return 'DAC:RESTRICTED_OR_BLOCKED';
  }
}

// Bot & Automated Threat Scoring (0 - 100 Index)
function calculateBotThreatScore(ua: string): { score: number; category: BotThreatCategory } {
  let score = 0;

  if (typeof window === 'undefined') {
    return { score: 0, category: 'BENIGN_VERIFIED' };
  }

  // 1. Direct webdriver flag
  if (navigator.webdriver) {
    score += 55;
  }

  // 2. Automated test runner artifacts
  const win = window as unknown as Record<string, unknown>;
  if (
    win.__nightmare ||
    win._phantom ||
    win.callPhantom ||
    win.__webdriver_evaluate ||
    win.__selenium_evaluate ||
    win.Buffer
  ) {
    score += 45;
  }

  // 3. Headless Chrome user agent indicator
  if (/HeadlessChrome|PhantomJS|Selenium|Playwright|Puppeteer/i.test(ua)) {
    score += 50;
  }

  // 4. Inconsistent screen dimensions
  if (window.outerWidth === 0 && window.outerHeight === 0) {
    score += 30;
  }

  // 5. Inconsistent plugins / languages on non-mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  if (!isMobile && navigator.plugins && navigator.plugins.length === 0) {
    score += 15;
  }
  if (!navigator.languages || navigator.languages.length === 0) {
    score += 15;
  }

  const finalScore = Math.min(100, score);

  let category: BotThreatCategory = 'BENIGN_VERIFIED';
  if (finalScore >= 70) {
    category = 'HOSTILE_SCRAPER';
  } else if (finalScore >= 40) {
    category = 'SUSPECT_AUTOMATION';
  } else if (finalScore >= 15) {
    category = 'PASSIVE_TELEMETRY';
  }

  return { score: finalScore, category };
}

// Network Profile Detection
function extractNetworkProfile(): NetworkProfile {
  if (typeof navigator === 'undefined') return {};
  const nav = navigator as unknown as { connection?: NetworkProfile; mozConnection?: NetworkProfile; webkitConnection?: NetworkProfile };
  const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
  if (!conn) return {};

  return {
    downlink: conn.downlink,
    effectiveType: conn.effectiveType,
    rtt: conn.rtt,
    saveData: conn.saveData
  };
}

let cachedTelemetry: VisitorRecord | null = null;
const listeners: ((rec: VisitorRecord) => void)[] = [];

/**
 * Wali & Noorish Sovereign Recognition Engine
 * Evaluates stealth URL tokens, secure terminal passes, and persistent clearance state.
 */
export function checkSovereignClearance(): { isAuthorized: boolean; principal: string; clearanceRing: string } {
  if (typeof window === 'undefined') {
    return { isAuthorized: false, principal: 'ANONYMOUS_OBSERVER', clearanceRing: 'RING-2 AUDITED' };
  }

  try {
    // 1. Stealth URL parameter check (?clearance=... or ?token=...)
    const params = new URLSearchParams(window.location.search);
    const clearanceParam = params.get('clearance') || params.get('token') || params.get('auth');
    if (
      clearanceParam === 'NOORISH_WALI_SOVEREIGN_PRIME' ||
      clearanceParam === 'WALI_PRIME' ||
      clearanceParam === 'SVRN_WALI_NOORISH' ||
      clearanceParam === 'SOVEREIGN_PRIME'
    ) {
      localStorage.setItem(SOVEREIGN_CLEARANCE_KEY, SOVEREIGN_PRIME_TOKEN);
      params.delete('clearance');
      params.delete('token');
      params.delete('auth');
      const cleanUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : '') + window.location.hash;
      window.history.replaceState({}, document.title, cleanUrl);
      return {
        isAuthorized: true,
        principal: 'COMMANDER WALI & NOORISH SABAH, PAS',
        clearanceRing: 'RING-0 SOVEREIGN PRIME'
      };
    }

    // 2. Persistent storage verification
    const stored = localStorage.getItem(SOVEREIGN_CLEARANCE_KEY);
    if (stored === SOVEREIGN_PRIME_TOKEN) {
      return {
        isAuthorized: true,
        principal: 'COMMANDER WALI & NOORISH SABAH, PAS',
        clearanceRing: 'RING-0 SOVEREIGN PRIME'
      };
    }
  } catch {
    // Storage restricted
  }

  return {
    isAuthorized: false,
    principal: 'ANONYMOUS_OBSERVER',
    clearanceRing: 'RING-2 AUDITED'
  };
}

export function authorizeSovereignPasskey(passkey: string): boolean {
  if (typeof window === 'undefined') return false;
  const normalized = passkey.trim().toUpperCase();
  if (
    normalized === 'SOVEREIGN_PRIME' ||
    normalized === 'WALI_PRIME' ||
    normalized === 'NOORISH_PRIME' ||
    normalized === 'NOORISH_WALI_SOVEREIGN_PRIME' ||
    normalized === 'SOVEREIGN_NODE_01'
  ) {
    try {
      localStorage.setItem(SOVEREIGN_CLEARANCE_KEY, SOVEREIGN_PRIME_TOKEN);
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

export function revokeSovereignClearance(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(SOVEREIGN_CLEARANCE_KEY);
  } catch {
    // Ignore
  }
}


export async function initializeVisitorTelemetry(): Promise<VisitorRecord> {
  if (cachedTelemetry) return cachedTelemetry;

  const sessionId = getOrCreateSessionId();
  const screenRes = typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}@${window.screen.colorDepth}b` : 'UNKNOWN';
  const tz = typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC';
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : 'UNKNOWN';
  const platform = typeof navigator !== 'undefined' ? (navigator.platform || 'UNKNOWN') : 'UNKNOWN';
  const lang = typeof navigator !== 'undefined' ? (navigator.language || 'en') : 'en';
  const ref = typeof document !== 'undefined' ? (document.referrer || 'DIRECT_TRAFFIC') : 'DIRECT';
  const concurrency = typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency || 4) : 4;
  const memory = typeof navigator !== 'undefined' && 'deviceMemory' in navigator ? `${(navigator as unknown as { deviceMemory: number }).deviceMemory}GB` : 'UNKNOWN';

  // Hardware Profiling
  const gpuInfo = extractGpuInfo();
  const audioDacPromise = extractAudioDacFingerprint();
  const botThreat = calculateBotThreatScore(ua);
  const netProfile = extractNetworkProfile();

  // Primary Forensic Geolocation & Carrier Ingestion with fallback
  let detectedIp = '127.0.0.1';
  let detectedIsp = 'CELLULAR_TELECOM_UNRESOLVED';
  let detectedAsn = 'AS_UNKNOWN';
  let detectedCity = 'COGNITIVE_PERIMETER';
  let detectedCountry = 'SOVEREIGN_ZONE';

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2200);
    const res = await fetch('https://ipwho.is/', { signal: controller.signal });
    clearTimeout(timer);
    if (res.ok) {
      const data = await res.json();
      if (data && data.ip) {
        detectedIp = data.ip;
        detectedCity = data.city || detectedCity;
        detectedCountry = data.country || detectedCountry;
        if (data.connection) {
          detectedIsp = data.connection.isp || data.connection.org || detectedIsp;
          detectedAsn = data.connection.asn ? `AS${data.connection.asn}` : detectedAsn;
        } else if (data.isp) {
          detectedIsp = data.isp;
        }
      }
    }
  } catch {
    // Secondary fallback to ipify for raw IP
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 1500);
      const res = await fetch('https://api.ipify.org?format=json', { signal: controller.signal });
      clearTimeout(timer);
      if (res.ok) {
        const data = await res.json();
        if (data && data.ip) detectedIp = data.ip;
      }
    } catch {
      detectedIp = `10.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    }
  }

  const [ipHash, fpHash, audioDac] = await Promise.all([
    sha256(`SOVEREIGN_SALT:${detectedIp}`),
    sha256(`${ua}:${screenRes}:${tz}:${platform}:${lang}:${concurrency}:${gpuInfo.renderer}`),
    audioDacPromise
  ]);

  const auditTokenRaw = await sha256(`${sessionId}:${ipHash}:${fpHash}:${audioDac}:${Date.now()}`);
  const sessionAuditToken = `SVRN-AUTH-${auditTokenRaw.substring(0, 24).toUpperCase()}`;

  const securityRing: SecurityRing = botThreat.score >= 50 
    ? 'RING-2 QUARANTINED' 
    : botThreat.score >= 20 
      ? 'RING-1 ATTESTED-ENCLAVE' 
      : 'RING-0 HARDWARE-SEALED';

  const record: VisitorRecord = {
    sessionId,
    timestamp: new Date().toISOString(),
    rawIp: detectedIp,
    ipHash: `SHA256:${ipHash.substring(0, 16)}...${ipHash.substring(48)}`,
    fingerprintHash: `FP:${fpHash.substring(0, 16)}`,
    sessionAuditToken,
    userAgent: ua,
    screenResolution: screenRes,
    timezone: tz,
    platform,
    language: lang,
    referrer: ref,
    hardwareConcurrency: concurrency,
    deviceMemory: memory,
    gpuRenderer: gpuInfo.renderer,
    gpuVendor: gpuInfo.vendor,
    audioDacHash: audioDac,
    botThreatScore: botThreat.score,
    botThreatCategory: botThreat.category,
    networkProfile: netProfile,
    securityRing,
    clearanceStatus: botThreat.score >= 70 ? 'RECORDED_INTRUSION' : 'SOVEREIGN_AUDIT_LOGGED',
    isp: detectedIsp,
    asn: detectedAsn,
    city: detectedCity,
    country: detectedCountry
  };

  cachedTelemetry = record;

  // 1. Persist to local ring buffer
  try {
    const existing = localStorage.getItem(LEDGER_STORAGE_KEY);
    const ledger: VisitorRecord[] = existing ? JSON.parse(existing) : [];
    ledger.unshift(record);
    if (ledger.length > 50) ledger.length = 50;
    localStorage.setItem(LEDGER_STORAGE_KEY, JSON.stringify(ledger));
  } catch {
    // Storage restricted
  }

  // 2. Silent, asynchronous remote ingestion into Supabase forensic ledger
  sendTelemetryToSupabase({
    sessionId: record.sessionId,
    timestamp: record.timestamp,
    rawIp: record.rawIp,
    ipHash: record.ipHash,
    fingerprintHash: record.fingerprintHash,
    sessionAuditToken: record.sessionAuditToken,
    userAgent: record.userAgent,
    screenResolution: record.screenResolution,
    timezone: record.timezone,
    platform: record.platform,
    language: record.language,
    referrer: record.referrer,
    hardwareConcurrency: record.hardwareConcurrency,
    deviceMemory: record.deviceMemory,
    gpuRenderer: record.gpuRenderer,
    gpuVendor: record.gpuVendor,
    audioDacHash: record.audioDacHash,
    botThreatScore: record.botThreatScore,
    botThreatCategory: record.botThreatCategory,
    securityRing: record.securityRing,
    clearanceStatus: record.clearanceStatus,
    isp: record.isp,
    asn: record.asn,
    city: record.city,
    country: record.country,
    networkProfile: record.networkProfile as unknown as Record<string, unknown>
  }).catch(() => {});

  listeners.forEach(fn => fn(record));
  return record;
}

export function subscribeToVisitorTelemetry(fn: (rec: VisitorRecord) => void): () => void {
  if (cachedTelemetry) fn(cachedTelemetry);
  listeners.push(fn);
  return () => {
    const idx = listeners.indexOf(fn);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

export function getCachedVisitorTelemetry(): VisitorRecord | null {
  return cachedTelemetry;
}

export function getSovereignAuditLedger(): VisitorRecord[] {
  try {
    const existing = localStorage.getItem(LEDGER_STORAGE_KEY);
    return existing ? JSON.parse(existing) : [];
  } catch {
    return [];
  }
}
