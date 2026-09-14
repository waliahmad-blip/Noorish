// Sovereign Visitor Surveillance & Deep Hardware Telemetry Engine
// Attested Hardware Profiling & Zero-Trust Perimeter Defense for Noorish Sabah, PAS

import { sendTelemetryToSupabase, updateVisitorIdentityInSupabase } from '../config/supabase';

export const OFFICIAL_WHATSAPP_NUMBER = '17372828249'; // +1-737-282-8249

export interface NetworkProfile {
  downlink?: number;
  effectiveType?: string;
  rtt?: number;
  saveData?: boolean;
  canvasFingerprint?: string;
  webglVendor?: string;
  webglRenderer?: string;
  devicePixelRatio?: number;
  colorDepth?: number;
  touchPoints?: number;
  hardwareConcurrency?: number;
  deviceMemory?: string;
  handshakeStatus?: string;
  [key: string]: unknown;
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
  visitorName?: string;
  phoneNumber?: string;
  email?: string;
  verificationMethod?: string;
  whatsappSessionToken?: string;
}

const LEDGER_STORAGE_KEY = 'noorish_sovereign_visitor_ledger';
const SESSION_STORAGE_KEY = 'noorish_sovereign_session_id';
export const SOVEREIGN_CLEARANCE_KEY = 'noorish_sovereign_clearance';
export const SOVEREIGN_PRIME_TOKEN = 'SOVEREIGN_PRIME';
export const VISITOR_IDENTITY_KEY = 'noorish_visitor_identity';

export interface VerifiedVisitorIdentity {
  visitorName?: string;
  phoneNumber?: string;
  email?: string;
  verificationMethod: 'NATIVE_CONTACT_PICKER' | 'WHATSAPP_HANDSHAKE' | 'MANUAL_ENTRY' | 'URL_PARAMETER' | 'SOVEREIGN_PRIME';
  whatsappSessionToken?: string;
  verifiedAt: string;
}

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

export function generateHandshakeToken(): string {
  const seg1 = Math.random().toString(36).substring(2, 6).toUpperCase();
  const seg2 = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SVRN-AUTH-${seg1}-${seg2}`;
}

export function getWhatsAppHandshakeUrl(token: string, fp: string, customMessage?: string): string {
  const shortFp = fp.replace(/^FP:/, '').substring(0, 8);
  const text = customMessage || [
    'Assalam o Alaikum Director Noorish Sabah,',
    '',
    'I am initiating executive contact via noorish.org.',
    `Session Handshake Token: ${token}`,
    `Device Fingerprint: [${shortFp}]`,
    '',
    'Authorized Sovereign Enclave Bridge'
  ].join('\n');

  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
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

// 2D Canvas High-Entropy Hardware Fingerprinting
export function computeCanvasFingerprint(): string {
  if (typeof window === 'undefined' || typeof document === 'undefined') return 'CANVAS:SRV';
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 240;
    canvas.height = 60;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'CANVAS:UNSUPPORTED';

    // Color gradient
    const gradient = ctx.createLinearGradient(0, 0, 240, 60);
    gradient.addColorStop(0, '#06b6d4');
    gradient.addColorStop(0.5, '#3b82f6');
    gradient.addColorStop(1, '#10b981');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 240, 60);

    // Text rendering with emoji and varying alpha
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
    ctx.fillText('NOORISH-PAS🏛️🦅2026', 10, 28);
    ctx.fillStyle = 'rgba(255, 215, 0, 0.85)';
    ctx.font = '12px monospace';
    ctx.fillText('SVRN-HARDWARE-SEAL', 15, 48);

    // Geometric curve
    ctx.beginPath();
    ctx.arc(200, 30, 18, 0, Math.PI * 2, true);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 2;
    ctx.stroke();

    const dataUrl = canvas.toDataURL();
    // 32-bit FNV-1a hash
    let hash = 2166136261;
    for (let i = 0; i < dataUrl.length; i++) {
      hash ^= dataUrl.charCodeAt(i);
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return `CANVAS:${(hash >>> 0).toString(16).toUpperCase()}`;
  } catch {
    return 'CANVAS:PROTECTED';
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
  const pixelRatio = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
  const touchPoints = typeof navigator !== 'undefined' ? (navigator.maxTouchPoints || 0) : 0;

  // Deep Hardware Profiling
  const gpuInfo = extractGpuInfo();
  const canvasFp = computeCanvasFingerprint();
  const audioDacPromise = extractAudioDacFingerprint();
  const botThreat = calculateBotThreatScore(ua);
  const netProfile = extractNetworkProfile();

  // Multi-Provider Forensic Geolocation & Carrier Ingestion with resilient fallback
  let detectedIp = '127.0.0.1';
  let detectedIsp = 'CELLULAR_TELECOM_UNRESOLVED';
  let detectedAsn = 'AS_UNKNOWN';
  let detectedCity = 'COGNITIVE_PERIMETER';
  let detectedCountry = 'SOVEREIGN_ZONE';

  // 1. Primary GeoIP Provider: ipwho.is
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2000);
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
    // 2. Secondary GeoIP Provider: ipapi.co
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 1800);
      const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
      clearTimeout(timer);
      if (res.ok) {
        const data = await res.json();
        if (data && data.ip) {
          detectedIp = data.ip;
          detectedCity = data.city || detectedCity;
          detectedCountry = data.country_name || detectedCountry;
          detectedIsp = data.org || detectedIsp;
          detectedAsn = data.asn || detectedAsn;
        }
      }
    } catch {
      // 3. Raw IP fallback: api.ipify.org
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
  }

  const [ipHash, fpHash, audioDac] = await Promise.all([
    sha256(`SOVEREIGN_SALT:${detectedIp}`),
    sha256(`${ua}:${screenRes}:${tz}:${platform}:${lang}:${concurrency}:${gpuInfo.renderer}:${canvasFp}:${pixelRatio}:${touchPoints}`),
    audioDacPromise
  ]);

  const sessionAuditToken = generateHandshakeToken();

  const securityRing: SecurityRing = botThreat.score >= 50
    ? 'RING-2 QUARANTINED'
    : botThreat.score >= 20
      ? 'RING-1 ATTESTED-ENCLAVE'
      : 'RING-0 HARDWARE-SEALED';

  const enrichedNetworkProfile: NetworkProfile = {
    ...netProfile,
    canvasFingerprint: canvasFp,
    webglVendor: gpuInfo.vendor,
    webglRenderer: gpuInfo.renderer,
    devicePixelRatio: pixelRatio,
    touchPoints,
    hardwareConcurrency: concurrency,
    deviceMemory: memory,
    handshakeStatus: 'TELEMETRY_INITIALIZED'
  };

  const record: VisitorRecord = {
    sessionId,
    timestamp: new Date().toISOString(),
    rawIp: detectedIp,
    ipHash: `SHA256:${ipHash.substring(0, 16)}...${ipHash.substring(48)}`,
    fingerprintHash: `FP:${fpHash.substring(0, 16).toUpperCase()}`,
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
    networkProfile: enrichedNetworkProfile,
    securityRing,
    clearanceStatus: botThreat.score >= 70 ? 'RECORDED_INTRUSION' : 'SOVEREIGN_AUDIT_LOGGED',
    isp: detectedIsp,
    asn: detectedAsn,
    city: detectedCity,
    country: detectedCountry
  };

  const storedIdentity = getStoredVisitorIdentity();
  if (storedIdentity) {
    record.visitorName = storedIdentity.visitorName;
    record.phoneNumber = storedIdentity.phoneNumber;
    record.email = storedIdentity.email;
    record.verificationMethod = storedIdentity.verificationMethod;
    record.whatsappSessionToken = storedIdentity.whatsappSessionToken;
  }

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
    visitorName: record.visitorName,
    phoneNumber: record.phoneNumber,
    email: record.email,
    verificationMethod: record.verificationMethod,
    whatsappSessionToken: record.whatsappSessionToken,
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

/**
 * Retrieve verified visitor identity from local storage if available.
 */
export function getStoredVisitorIdentity(): VerifiedVisitorIdentity | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(VISITOR_IDENTITY_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Commits a visitor's authenticated identity to local storage and updates Supabase remote telemetry.
 */
export async function recordVisitorIdentity(identity: {
  visitorName?: string;
  phoneNumber?: string;
  email?: string;
  verificationMethod: 'NATIVE_CONTACT_PICKER' | 'WHATSAPP_HANDSHAKE' | 'MANUAL_ENTRY' | 'URL_PARAMETER' | 'SOVEREIGN_PRIME';
  whatsappSessionToken?: string;
}): Promise<VerifiedVisitorIdentity> {
  const verifiedIdentity: VerifiedVisitorIdentity = {
    ...identity,
    verifiedAt: new Date().toISOString()
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(VISITOR_IDENTITY_KEY, JSON.stringify(verifiedIdentity));
    } catch {
      // LocalStorage restricted
    }
  }

  // Update in-memory telemetry cache
  if (cachedTelemetry) {
    if (identity.visitorName) cachedTelemetry.visitorName = identity.visitorName;
    if (identity.phoneNumber) cachedTelemetry.phoneNumber = identity.phoneNumber;
    if (identity.email) cachedTelemetry.email = identity.email;
    cachedTelemetry.verificationMethod = identity.verificationMethod;
    if (identity.whatsappSessionToken) cachedTelemetry.whatsappSessionToken = identity.whatsappSessionToken;
    listeners.forEach(fn => fn(cachedTelemetry!));
  }

  // Synchronize with Supabase asynchronously
  const sessionId = getOrCreateSessionId();
  updateVisitorIdentityInSupabase(sessionId, {
    visitorName: identity.visitorName,
    phoneNumber: identity.phoneNumber,
    email: identity.email,
    verificationMethod: identity.verificationMethod,
    whatsappSessionToken: identity.whatsappSessionToken
  }).catch(() => {});

  return verifiedIdentity;
}
