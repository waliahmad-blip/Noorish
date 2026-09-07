export type FacetId = 'officer' | 'economist' | 'ai-governor' | 'founder' | 'convergence';

export interface FacetInfo {
  id: FacetId;
  name: string;
  tagline: string;
  color: string;
  accentHex: string;
  frequencyHz: number;
  description: string;
}

export interface Posting {
  id: string;
  role: string;
  department: string;
  period: string;
  location: string;
  coordinates: { x: number; y: number }; // Percentage for tactical map
  highlights: string[];
  metrics: { label: string; value: string }[];
  isFirstWoman?: boolean;
}

export interface Credential {
  id: string;
  title: string;
  code: string;
  institution: string;
  status: 'Completed' | 'In Progress';
  achievement?: string;
  issuedDate?: string;
  edxId?: string;
  signatories?: string[];
  benefitToPakistan?: string;
  pillar: 'AI Governance' | 'Macroeconomic & Fiscal Policy' | 'Urban Futures' | 'Strategic Leadership';
  score?: string;
}

export interface ContentPillar {
  number: number;
  title: string;
  summary: string;
  format: string;
  topics: string[];
}

export interface UniquenessRow {
  dimension: string;
  womenInPAS: string;
  noorishSabah: string;
  verifiedStatus: string;
}

export interface LegacyKPI {
  label: string;
  target: string;
  current: string;
  timeframe: string;
}
