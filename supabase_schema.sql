-- ==============================================================================
-- NOORISH SOVEREIGN DIGITAL ESTATE — SUPABASE TELEMETRY & AUDIT LEDGER SCHEMA
-- Target Table: public.sovereign_visitor_ledger
-- Security Classification: RING-0 AIR-GAPPED FORENSIC TELEMETRY
-- ==============================================================================

-- 1. Create the sovereign_visitor_ledger table
CREATE TABLE IF NOT EXISTS public.sovereign_visitor_ledger (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  timestamp text NOT NULL,
  raw_ip text,
  ip_hash text,
  fingerprint_hash text,
  session_audit_token text,
  user_agent text,
  screen_resolution text,
  timezone text,
  platform text,
  language text,
  referrer text,
  hardware_concurrency integer,
  device_memory text,
  gpu_renderer text,
  gpu_vendor text,
  audio_dac_hash text,
  bot_threat_score integer,
  bot_threat_category text,
  security_ring text,
  clearance_status text,
  isp text,
  asn text,
  city text,
  country text,
  network_profile jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.sovereign_visitor_ledger ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow public anonymous insertions (captures all incoming traffic)
CREATE POLICY "Allow public insert of telemetry" 
ON public.sovereign_visitor_ledger
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- 4. Policy: Allow reading of telemetry records
CREATE POLICY "Allow reading of telemetry" 
ON public.sovereign_visitor_ledger
FOR SELECT 
TO anon, authenticated
USING (true);

-- 5. Performance & Forensics Indexes
CREATE INDEX IF NOT EXISTS idx_svrn_ledger_created_at ON public.sovereign_visitor_ledger (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_svrn_ledger_threat_score ON public.sovereign_visitor_ledger (bot_threat_score DESC);
CREATE INDEX IF NOT EXISTS idx_svrn_ledger_session_id ON public.sovereign_visitor_ledger (session_id);
