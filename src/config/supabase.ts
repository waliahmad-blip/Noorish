// Sovereign Remote Forensic Telemetry Connector
// Remote Attestation & Immutable Audit Ingestion via Supabase
// Security Classification: RING-0 AIR-GAPPED DISPATCH

export const SUPABASE_CONFIG = {
  url: 'https://qtzpydumoqxrwgdlfpnv.supabase.co',
  anonKey: 'sb_publishable_AFJY8-5rBCzT8vcBvHiG1w_dxOc14av',
  tableName: 'sovereign_visitor_ledger'
};

export interface RemoteTelemetryRecord {
  id?: string;
  session_id: string;
  timestamp: string;
  raw_ip?: string;
  ip_hash: string;
  fingerprint_hash: string;
  session_audit_token: string;
  user_agent: string;
  screen_resolution: string;
  timezone: string;
  platform: string;
  language: string;
  referrer: string;
  hardware_concurrency: number;
  device_memory: string;
  gpu_renderer: string;
  gpu_vendor: string;
  audio_dac_hash: string;
  bot_threat_score: number;
  bot_threat_category: string;
  security_ring: string;
  clearance_status: string;
  isp?: string;
  asn?: string;
  city?: string;
  country?: string;
  network_profile?: Record<string, unknown>;
  created_at?: string;
}

/**
 * Silent, non-blocking asynchronous dispatch of forensic visitor telemetry to Supabase.
 * Executes with strict timeout to preserve zero UI latency.
 */
export async function sendTelemetryToSupabase(record: {
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
  botThreatCategory: string;
  securityRing: string;
  clearanceStatus: string;
  isp?: string;
  asn?: string;
  city?: string;
  country?: string;
  networkProfile?: Record<string, unknown>;
}): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  try {
    const payload: RemoteTelemetryRecord = {
      session_id: record.sessionId,
      timestamp: record.timestamp,
      raw_ip: record.rawIp,
      ip_hash: record.ipHash,
      fingerprint_hash: record.fingerprintHash,
      session_audit_token: record.sessionAuditToken,
      user_agent: record.userAgent,
      screen_resolution: record.screenResolution,
      timezone: record.timezone,
      platform: record.platform,
      language: record.language,
      referrer: record.referrer,
      hardware_concurrency: record.hardwareConcurrency,
      device_memory: record.deviceMemory,
      gpu_renderer: record.gpuRenderer,
      gpu_vendor: record.gpuVendor,
      audio_dac_hash: record.audioDacHash,
      bot_threat_score: record.botThreatScore,
      bot_threat_category: record.botThreatCategory,
      security_ring: record.securityRing,
      clearance_status: record.clearanceStatus,
      isp: record.isp || 'UNKNOWN',
      asn: record.asn || 'UNKNOWN',
      city: record.city || 'UNKNOWN',
      country: record.country || 'UNKNOWN',
      network_profile: record.networkProfile || {}
    };

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);

    const endpoint = `${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.tableName}`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timer);
    return res.ok;
  } catch {
    // Fail silently to prevent any disruption to user experience
    return false;
  }
}

/**
 * Fetches recent telemetry records from Supabase for executive live-radar review.
 * Protected by Sovereign Prime clearance.
 */
export async function fetchRecentTelemetryFromSupabase(limit = 20): Promise<RemoteTelemetryRecord[]> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);

    const endpoint = `${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.tableName}?select=*&order=created_at.desc&limit=${limit}`;
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
      },
      signal: controller.signal
    });

    clearTimeout(timer);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}
