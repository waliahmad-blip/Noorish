// Sovereign Visitor Surveillance & Telemetry Engine
// Attested Perimeter Surveillance for Noorish Sabah, PAS

export interface VisitorRecord {
  sessionId: string;
  timestamp: string;
  rawIp: string;
  ipHash: string;
  fingerprintHash: string;
  userAgent: string;
  screenResolution: string;
  timezone: string;
  platform: string;
  language: string;
  referrer: string;
  hardwareConcurrency: number;
  deviceMemory: string;
  clearanceStatus: 'TIER-0 UNVERIFIED' | 'REVOKED' | 'RECORDED_INTRUSION';
}

const LEDGER_STORAGE_KEY = 'noorish_sovereign_visitor_ledger';
const SESSION_STORAGE_KEY = 'noorish_sovereign_session_id';

// Fast SHA-256 computation using Web Crypto API
async function sha256(input: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    try {
      const msgBuffer = new TextEncoder().encode(input);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch {
      // Fallback
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
  let sid = sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (!sid) {
    sid = 'SVRN-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString(36).toUpperCase();
    sessionStorage.setItem(SESSION_STORAGE_KEY, sid);
  }
  return sid;
}

let cachedTelemetry: VisitorRecord | null = null;
const listeners: ((rec: VisitorRecord) => void)[] = [];

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

  // Attempt IP lookup with short timeout
  let detectedIp = '127.0.0.1';
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2200);
    const res = await fetch('https://api.ipify.org?format=json', { signal: controller.signal });
    clearTimeout(timer);
    if (res.ok) {
      const data = await res.json();
      if (data && data.ip) detectedIp = data.ip;
    }
  } catch {
    // Generate synthetic network hash based on connection characteristics
    detectedIp = `10.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  }

  const [ipHash, fpHash] = await Promise.all([
    sha256(`SOVEREIGN_SALT:${detectedIp}`),
    sha256(`${ua}:${screenRes}:${tz}:${platform}:${lang}:${concurrency}`)
  ]);

  const record: VisitorRecord = {
    sessionId,
    timestamp: new Date().toISOString(),
    rawIp: detectedIp,
    ipHash: `SHA256:${ipHash.substring(0, 16)}...${ipHash.substring(48)}`,
    fingerprintHash: `FP:${fpHash.substring(0, 16)}`,
    userAgent: ua,
    screenResolution: screenRes,
    timezone: tz,
    platform,
    language: lang,
    referrer: ref,
    hardwareConcurrency: concurrency,
    deviceMemory: memory,
    clearanceStatus: 'TIER-0 UNVERIFIED'
  };

  cachedTelemetry = record;

  // Commit to local sovereign ledger
  try {
    const existing = localStorage.getItem(LEDGER_STORAGE_KEY);
    const ledger: VisitorRecord[] = existing ? JSON.parse(existing) : [];
    ledger.unshift(record);
    if (ledger.length > 50) ledger.length = 50;
    localStorage.setItem(LEDGER_STORAGE_KEY, JSON.stringify(ledger));
  } catch {
    // Storage restricted
  }

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
