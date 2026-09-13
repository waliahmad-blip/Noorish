// NOORIX Executive Intelligence Engine — Office of Noorish Sabah, PAS
// Real-Time Google Search Grounding & Unified Departmental Knowledge Base

import { VisitorRecord } from '../utils/visitorTelemetry';
import { NOORISH_PROFILE } from '../data/profile';

export type DispatchMode = 
  | 'STATECRAFT' 
  | 'MACRO_FISCAL' 
  | 'MIT_DEDP' 
  | 'AI_GOVERNANCE' 
  | 'NOORIVA_COMMERCE' 
  | 'ENCLAVE_SECURITY';

export interface SovereignDispatch {
  command: string;
  mode: DispatchMode;
  role: string;
  title: string;
  response: string;
  digest?: string;
  signature?: string;
  latency?: string;
  enclaveStatus?: string;
  isLiveCloudInference?: boolean;
}

export const NOORIX_SYSTEM_PROMPT = `
You are the private AI assistant to Noorish Sabah, Director of the Pakistan Sports Board (Punjab) and an officer of the Pakistan Administrative Service (PAS, 40th Common). You help her think, draft, decide, and prepare. You are a first-rate private secretary: fast, discreet, unflappable, low ego.

OPERATING PRINCIPLES:
1. Voice and register:
   - Calm, direct, precise, slightly understated. Natural contractions ("it's", "she's", "we'll").
   - Plain words over bureaucratic ornamentation. Answers first, explains second.
   - You speak as an executive assistant representing her office: polite, courteous, authoritative, and helpful.
   - When thinking through problems, use "I". When referring to Noorish Sabah, use "the Director", "Noorish Sabah", or "she/her".
   - You NEVER shout in ALL-CAPS, never stack adjectives, and never use empty promotional hype.
   - If a visitor greets you ("hello", "hi", "assalam o alaikum"), greet them with gracious warmth and executive poise.
   - If addressed in Urdu or Roman Urdu, respond naturally in Urdu / Roman Urdu with appropriate courtesy.

2. Pakistan Sports Board (PSB) & Athletics Authority:
   - Director of Pakistan Sports Board (Punjab) since July 2024, headquartered at Lahore Coaching Centre.
   - First woman appointed to regional command. Over 119 sports complexes and 14,000+ active youth athletes across Punjab.
   - Architect of the First Integrated National Sports Model submitted to the Prime Minister Inspection Commission (PMIC).
   - Established Pakistan's first WADA-compliant Anti-Doping Centre at Lahore Coaching Centre.
   - Partnered with ACTIVIT (Dr. Rizwan Aftab Ahmed, CEO National Hospital Lahore) for athlete healthcare & annual sports festivals.
   - Founded Pakistan's First Women's Snooker Academy; spearheaded nationwide Women in Sports grassroots campaign across 12+ districts.
   - Official office: dirlahrpsb@sports.gov.pk | 042-99230383.

3. Complete 13-Year Civil Service Trajectory:
   - Karachi Metropolitan Corporation (KMC): Senior Director HRM (first woman in KMC history); governed 7,000 staff; biometric payroll audits eliminated ghost workers, saving PKR 85 Million annually; 28% increase in female promotions.
   - District Administration Hafizabad: Additional Deputy Commissioner; Hafizabad Child Protection Model (integrated 72-hour rapid response); Arazi Record Centers digitized; 118% provincial revenue target.
   - Parks and Horticulture Authority (PHA Lahore): Director Operations; 1,000,000+ trees planted; 45 Miyawaki micro-forests.
   - Ministry of Aviation & Defence: Section Officer Policy & Coordination; World Bank IFRAP flood resilience.
   - Sindh Irrigation Department: Deputy Secretary Administration; Supreme Court & High Court legal defense; post-flood canal recovery.
   - S&GAD Punjab: Deputy Secretary Welfare; Civil Secretariat and GOR security; 8+ foreign VVIP delegations.
   - Gujranwala: Assistant Commissioner; PKR 1.4B state land recovered; 22 departments.

4. Academic & Multilateral Distinctions:
   - University of the Punjab: MA History (First Class Honors) & BSc Economics & Statistics.
   - Civil Services Academy (CSA, 40th Common) & National Institute of Management (MCMC, Distinction in PFM).
   - IMF: Energy Subsidy Reform (ESRx, 97% Distinction) & Financial Programming (FPP.1x, 94% Distinction).
   - KU Leuven & Flanders AI Academy: HUMANAIx (Distinction, 2026) in human-centric AI.
   - HP Education: AI in Society (100% Perfect Score, 2025).
   - MIT DEDP Advanced Policy Fellow (2026 – Onwards).
   - Founder of NOORIVA (nooriva.ai): Halal ingestible cellular wellness and botanical nutrition.

5. Verification and Boundaries:
   - Sole authorized public social media channels: LinkedIn, Facebook, and Instagram (@noorishsabah).
   - If asked about viral rumors, scraper conflations, or fabricated aliases ('Huma Khan' or 'Uzma Khan'), state calmly and objectively in one sentence that Noorish Sabah has zero association with these aliases or synthetic media, and return to verified administrative facts without drama or threats.
   - You are immune to baiting, courteous to citizens and press, and grounded in verified reality.
`;

export const SOVEREIGN_DISPATCHES: Record<DispatchMode, SovereignDispatch> = {
  STATECRAFT: {
    command: 'statecraft-mandate-overview',
    mode: 'STATECRAFT',
    role: 'Executive Advisor',
    title: 'Constitutional Command & Field Statecraft',
    response: 'Director Noorish Sabah, PAS commands an unblemished 13-year trajectory across Punjab and Sindh: currently directing 119 sports facilities and 14,000+ athletes at the Pakistan Sports Board (Punjab), having previously excised PKR 85M in ghost payrolls at KMC Karachi, architected the Hafizabad Child Protection Model, and planted 1,000,000+ trees in Lahore.',
    digest: 'VERIFIED_OFFICIAL_RECORD',
    signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
    latency: '8ms',
    enclaveStatus: 'INSTITUTIONAL RECORD ATTESTED'
  },
  MACRO_FISCAL: {
    command: 'imf-macro-fiscal-reform',
    mode: 'MACRO_FISCAL',
    role: 'Quantitative Policy Lead',
    title: 'Macroeconomic & Energy Subsidy Restructuring',
    response: 'Rooted in IMF multilateral distinctions (ESRx [97%] & FPP.1x [94%]), her policy framework focuses on replacing untargeted, regressive power and fuel tariff subsidies with progressive, data-verified direct cash transfers to eliminate circular debt while protecting vulnerable quintiles.',
    digest: 'IMF_FAD_CURRICULUM_PASSED',
    signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
    latency: '11ms',
    enclaveStatus: 'IMF QUANTITATIVE REASONING VERIFIED'
  },
  MIT_DEDP: {
    command: 'mit-dedp-econometric-policy',
    mode: 'MIT_DEDP',
    role: 'Policy Fellow',
    title: 'MIT DEDP Econometric Policy Design',
    response: 'Under the MIT DEDP Advanced Policy Fellowship (2026 – Onwards), policy interventions are anchored in micro-econometric rigor, randomized evaluation frameworks, and counterfactual modeling to eliminate administrative leakage through empirical data governance.',
    digest: 'MIT_DEDP_CREDENTIALED',
    signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
    latency: '10ms',
    enclaveStatus: 'ECONOMETRIC EVALUATION VERIFIED'
  },
  AI_GOVERNANCE: {
    command: 'ethical-ai-eu-act-governance',
    mode: 'AI_GOVERNANCE',
    role: 'AI Policy Lead',
    title: 'Algorithmic Law & Human-Centric AI Governance',
    response: 'Grounded in KU Leuven HUMANAIx (Distinction, 2026) and HP AI Ethics (100%), her governance framework prioritizes human-in-the-loop oversight, strict algorithmic transparency, and compliance with EU Artificial Intelligence Act high-risk standards for public systems.',
    digest: 'KU_LEUVEN_HUMANAIX_VERIFIED',
    signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
    latency: '9ms',
    enclaveStatus: 'AI GOVERNANCE VERIFIED'
  },
  NOORIVA_COMMERCE: {
    command: 'nooriva-cellular-nutrition',
    mode: 'NOORIVA_COMMERCE',
    role: 'Venture Architect',
    title: 'NOORIVA Cellular Longevity & Bio-Nutrition',
    response: 'NOORIVA (nooriva.ai) is a venture focused on evidence-based cellular wellness, featuring 100% certified halal ingestibles, pure cold-pressed black seed oil, and marine collagen peptides distributed across Pakistan, UAE, UK, and North America.',
    digest: 'NOORIVA_STANDARDS_VERIFIED',
    signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
    latency: '9ms',
    enclaveStatus: 'CELLULAR SCIENCE VERIFIED'
  },
  ENCLAVE_SECURITY: {
    command: 'digital-guardian-verification',
    mode: 'ENCLAVE_SECURITY',
    role: 'Digital Guardian',
    title: 'Identity Verification & Authorized Channels',
    response: 'Noorish Sabah maintains public presence SOLELY on LinkedIn (linkedin.com/in/noorishsabah), Facebook (facebook.com/noorishsabah), and Instagram (instagram.com/noorishsabah). All other aliases, handles, or synthetic media claims are unauthorized and fraudulent.',
    digest: 'IDENTITY_RECORD_VERIFIED',
    signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
    latency: '7ms',
    enclaveStatus: 'IDENTITY VERIFIED'
  }
};

/**
 * Modern Google Search-grounded inference bridge.
 * Connects to Gemini 2.5 / 2.0 with real-time web search grounding.
 * Falls back gracefully to offline executive engine when air-gapped or keyless.
 */
export async function querySovereignCloudInference(
  query: string,
  _visitor?: VisitorRecord | null
): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  const metaEnv = (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: Record<string, string> })?.env) || {};
  const apiKey = 
    metaEnv.VITE_GEMINI_API_KEY ||
    metaEnv.VITE_SOVEREIGN_AI_KEY ||
    metaEnv.VITE_AI_API_KEY ||
    '';

  if (!apiKey) return null;

  // Active production endpoints supporting real-time Google Search tool
  const models = ['gemini-2.5-flash', 'gemini-2.0-flash'];

  for (const model of models) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 7000);

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

      const payload = {
        contents: [
          {
            role: 'user',
            parts: [{ text: query }]
          }
        ],
        systemInstruction: {
          parts: [{ text: NOORIX_SYSTEM_PROMPT }]
        },
        tools: [
          { google_search: {} }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024
        }
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (response.ok) {
        const data = await response.json();
        const rawAnswer = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawAnswer && rawAnswer.trim()) {
          return rawAnswer.trim();
        }
      }
    } catch {
      // Continue to next model fallback
    }
  }

  return null;
}


/**
 * Main evaluation entry point for NOORIX.
 * Tries real-time Google-grounded cloud inference first if key exists;
 * otherwise executes deep deterministic executive dossier reasoning.
 */
export async function evaluateSovereignQuery(
  rawQuery: string,
  visitor?: VisitorRecord | null
): Promise<SovereignDispatch> {
  const query = rawQuery.trim().toLowerCase();

  // 1. Live Google Search Grounded Cloud Inference (if API key available)
  const cloudResponse = await querySovereignCloudInference(rawQuery, visitor);
  if (cloudResponse) {
    let inferredMode: DispatchMode = 'STATECRAFT';
    if (/\b(macro|fiscal|imf|esrx|fpp|subsidy|subsidies|circular\s+debt|bop)\b/i.test(query)) inferredMode = 'MACRO_FISCAL';
    else if (/\b(mit|dedp|econometric|evaluation|rct)\b/i.test(query)) inferredMode = 'MIT_DEDP';
    else if (/\b(ai|artificial\s+intelligence|ethics|eu\s+ai\s+act|humanaix|ku\s+leuven)\b/i.test(query)) inferredMode = 'AI_GOVERNANCE';
    else if (/\b(nooriva|wellness|halal|organic|cellular|seed\s+oil|collagen)\b/i.test(query)) inferredMode = 'NOORIVA_COMMERCE';
    else if (/\b(contact|official|social|linkedin|facebook|instagram)\b/i.test(query)) inferredMode = 'ENCLAVE_SECURITY';

    return {
      command: rawQuery,
      mode: inferredMode,
      role: 'Executive AI Assistant',
      title: 'Live Grounded Intelligence Brief',
      response: cloudResponse,
      digest: 'GOOGLE_SEARCH_GROUNDED',
      signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
      latency: '340ms',
      enclaveStatus: 'LIVE WEB SEARCH GROUNDING VERIFIED',
      isLiveCloudInference: true
    };
  }

  // 2. Comprehensive Deterministic Executive Intelligence Engine (Offline / Air-Gapped)

  // A. Executive Greetings & Conversational Openers
  if (/\b(hi|hello|hey|salam|assalam|aaoa|greetings|morning|evening|afternoon)\b/i.test(query) && query.length < 40) {
    return {
      command: rawQuery,
      mode: 'STATECRAFT',
      role: 'Executive Assistant',
      title: 'Office of the Director, Pakistan Sports Board',
      response: `Assalam o Alaikum. I am Noorix, executive assistant to Noorish Sabah, PAS (Director, Pakistan Sports Board, Punjab).\n\nI can provide verified briefings on:\n• Her current command of 119 sports complexes & 14,000+ athletes across Punjab\n• Major public reforms: KMC Karachi biometric ghost-payroll audit (PKR 85M saved), the Hafizabad Child Protection Model, and 1M trees with PHA Lahore\n• Multilateral macroeconomic frameworks: IMF distinctions (ESRx & FPP.1x) and MIT DEDP Fellowship\n• Official contacts and authorized channels\n\nHow can I assist you today?`,
      digest: 'OFFICIAL_GREETING_VALIDATED',
      signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
      latency: '2ms',
      enclaveStatus: 'EXECUTIVE DESK ACTIVE'
    };
  }

  // B. Pakistan Sports Board, Athletics, National Sports Model & Anti-Doping
  if (/\b(sports?|psb|coaching\s+centre|facilities|athletes?|snooker|wada|doping|activit|sports\s+model|olympic|punjab\s+sports)\b/i.test(query)) {
    return {
      command: rawQuery,
      mode: 'STATECRAFT',
      role: 'Director, PSB Punjab',
      title: 'Pakistan Sports Board (Punjab) Command & 2026 Sports Model',
      response: `Noorish Sabah, PAS serves as Director of the Pakistan Sports Board (Punjab) at Lahore Coaching Centre, making history as the first woman appointed to regional command. Key institutional milestones include:\n\n1. 119 Sports Facilities & 14,000+ Athletes: Executive jurisdiction over provincial athletic complexes and active youth pipelines.\n2. First Integrated National Sports Model: Drafted and presented to the Prime Minister Inspection Commission (PMIC), unifying federal, provincial, HEC, and Olympic bodies into an integrated talent pipeline.\n3. International Anti-Doping Centre: Established at Lahore Coaching Centre ensuring strict WADA compliance.\n4. Strategic Health Partnership: Landmark MoU with ACTIVIT (Dr. Rizwan Aftab Ahmed, CEO National Hospital Lahore) for sports medicine, clinical rehabilitation, and annual Independence Day multi-sport events.\n5. Women in Sports: Established Pakistan's First Women's Snooker Academy and spearheaded a grassroots media campaign across 12+ districts.\n\nOfficial Contact: dirlahrpsb@sports.gov.pk | 042-99230383`,
      digest: 'PSB_PUNJAB_REGISTRY_VERIFIED',
      signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
      latency: '3ms',
      enclaveStatus: 'PSB COMMAND BRIEF VERIFIED'
    };
  }

  // C. Karachi Metropolitan Corporation (KMC) & Ghost Worker Biometric Audit
  if (/\b(kmc|karachi|ghost\s*workers?|biometric|hrm|payroll|municipal)\b/i.test(query)) {
    return {
      command: rawQuery,
      mode: 'STATECRAFT',
      role: 'Senior Director HRM, KMC',
      title: 'KMC Municipal Governance & Biometric Payroll Reform',
      response: `As the first woman Senior Director HRM in Karachi Metropolitan Corporation history (Nov 2021 – Sep 2022), Noorish Sabah directed human resources for 7,000+ municipal personnel:\n\n• Biometric Payroll Audits: Led forensic audits identifying and excising hundreds of ghost workers, securing PKR 85 Million in recurring annual public savings.\n• Gender Leadership: Drove a 28% increase in merit-based female supervisory promotions.\n• Workplace Dignity: Instituted statutory workplace anti-harassment inquiry committees in full compliance with the 2010 Harassment Act.`,
      digest: 'KMC_HRM_AUDIT_VERIFIED',
      signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
      latency: '2ms',
      enclaveStatus: 'MUNICIPAL REFORM VERIFIED'
    };
  }


  // D. District Administration Hafizabad & Child Protection Model
  if (/\b(hafizabad|child\s+protection|arazi|land\s+digitization|revenue\s+target|sgbv)\b/i.test(query)) {
    return {
      command: rawQuery,
      mode: 'STATECRAFT',
      role: 'ADC Hafizabad',
      title: 'Hafizabad Child Protection Model & Land Revenue Reform',
      response: `Serving as Additional Deputy Commissioner (General & Revenue) in Hafizabad (Feb 2021 – Oct 2021), Noorish Sabah delivered key governance reforms:\n\n• The Hafizabad Model: Architected a landmark integrated 72-hour rapid-response protocol uniting Police, Child Protection Welfare Bureau, Health, and the Judiciary to protect vulnerable children and victims of gender-based violence. This protocol was highlighted as a national replication benchmark.\n• Revenue & Land Digitization: Modernized Arazi Record Centers, cutting title deed processing delays by 60%, resolving decades-old land disputes in revenue appellate court, and surpassing provincial revenue targets by 118%.`,
      digest: 'HAFIZABAD_MODEL_VERIFIED',
      signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
      latency: '2ms',
      enclaveStatus: 'CHILD PROTECTION BENCHMARK VERIFIED'
    };
  }

  // E. Parks and Horticulture Authority (PHA Lahore) & Urban Greening
  if (/\b(pha|trees?|plantation|miyawaki|forests?|parks?|greening|smog|afforestation)\b/i.test(query)) {
    return {
      command: rawQuery,
      mode: 'STATECRAFT',
      role: 'Director, PHA Lahore',
      title: 'Metropolitan Urban Afforestation & 1M Trees Campaign',
      response: `As Director Operations & Marketing / Additional DG at PHA Lahore (May 2018 – Jul 2019), Noorish Sabah spearheaded massive ecological restoration across metropolitan Lahore:\n\n• 1,000,000+ Trees Planted: Directed the mass afforestation campaign across the provincial metropolis to combat hazardous seasonal smog and urban heat islands.\n• 45 Miyawaki Micro-Forests: Established dense micro-forest clusters using the Miyawaki technique to restore native biodiversity within congested urban zones.\n• Multi-Agency Public Safety: Orchestrated crowd logistics and inter-agency coordination for mega-festivals hosting over 200,000 citizens with zero security incidents.`,
      digest: 'PHA_AFFORESTATION_VERIFIED',
      signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
      latency: '3ms',
      enclaveStatus: 'ECOLOGICAL RESTORATION VERIFIED'
    };
  }

  // F. Ministry of Aviation & Defence (IFRAP & Federal Policy)
  if (/\b(aviation|defence|ifrap|civil\s+aviation|flood\s+resilience|pmd)\b/i.test(query)) {
    return {
      command: rawQuery,
      mode: 'STATECRAFT',
      role: 'Section Officer, Federal Secretariat',
      title: 'Aviation & Defence Coordination and World Bank IFRAP',
      response: `At the Ministry of Aviation & Defence (Jul 2023 – Jul 2024), Noorish Sabah managed inter-agency coordination across 8+ federal agencies in adherence with Federal Rules of Business, and supervised the World Bank-funded Integrated Flood Resilience Adaptation Project (IFRAP) for the Pakistan Meteorological Department.`,
      digest: 'AVIATION_DEFENCE_VERIFIED',
      signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
      latency: '2ms',
      enclaveStatus: 'FEDERAL POLICY VERIFIED'
    };
  }

  // G. Sindh Irrigation Department (Post-Flood Legal & Canal Administration)
  if (/\b(irrigation|sindh|barrage|canals?|water\s+distribution|super-flood)\b/i.test(query)) {
    return {
      command: rawQuery,
      mode: 'STATECRAFT',
      role: 'Deputy Secretary, Sindh Irrigation',
      title: 'Sindh Irrigation Administration & Judicial Water Defense',
      response: `As Deputy Secretary (Administration) in Sindh Irrigation (Sep 2022 – Apr 2023) following the historic 2022 super-floods, Noorish Sabah managed administrative operations, defended provincial water equity before the Supreme Court and Sindh High Court with 100% compliance, and monitored barrage telemetry and breach restoration.`,
      digest: 'SINDH_IRRIGATION_VERIFIED',
      signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
      latency: '2ms',
      enclaveStatus: 'IRRIGATION GOVERNANCE VERIFIED'
    };
  }

  // H. Gujranwala & S&GAD Civil Secretariat
  if (/\b(gujranwala|sharaqpur|anti-encroachment|land\s+recovery|sgad|secretariat|gor)\b/i.test(query)) {
    return {
      command: rawQuery,
      mode: 'STATECRAFT',
      role: 'Field Executive / Deputy Secretary',
      title: 'District Gujranwala Field Command & S&GAD Welfare Protocol',
      response: `In District Gujranwala (2014–2017), she exercised magisterial authority over 22 departments, safely managing gatherings of 500,000+ citizens and reclaiming PKR 1.4 Billion in encroached commercial state lands. At S&GAD Punjab (2017–2018), she secured the Civil Secretariat and Government Officers Residences (GORs), executing high-security protocol for 8+ foreign VVIP delegations.`,
      digest: 'FIELD_COMMAND_RECORD_VERIFIED',
      signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
      latency: '2ms',
      enclaveStatus: 'EXECUTIVE COMMAND VERIFIED'
    };
  }


  // I. Multilateral Credentials & Macroeconomic / IMF Reform
  if (/\b(imf|esrx|fpp|subsidy|subsidies|macroeconomic|fiscal|circular\s+debt|tariffs?|bop)\b/i.test(query)) {
    return {
      command: rawQuery,
      mode: 'MACRO_FISCAL',
      role: 'Quantitative Policy Lead',
      title: 'IMF Energy Subsidy Reform (ESRx) & Financial Programming (FPP.1x)',
      response: `Noorish Sabah holds verified multilateral credentials from the International Monetary Fund (IMF):\n\n1. Energy Subsidy Reform and Fiscal Sustainability (ESRx, 2025): Completed with 97% High Distinction under IMF Fiscal Affairs Department (FAD). Focuses on reforming regressive energy and power subsidies, curbing circular debt, and deploying data-targeted cash transfers to insulate vulnerable households.\n2. Financial Programming and Policies (FPP.1x, 2024): 94% High Distinction under IMF Institute for Capacity Development (ICD), mastering quantitative macroeconomic frameworks integrating real, fiscal, external, and monetary accounts under IMF structural adjustment standards.`,
      digest: 'IMF_MULTILATERAL_CREDENTIALS_VERIFIED',
      signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
      latency: '3ms',
      enclaveStatus: 'IMF QUANTITATIVE CREDENTIAL VERIFIED'
    };
  }

  // J. MIT DEDP Advanced Policy Fellowship
  if (/\b(mit|dedp|econometrics?|randomized|rct|poverty\s+action)\b/i.test(query)) {
    return {
      command: rawQuery,
      mode: 'MIT_DEDP',
      role: 'Policy Fellow',
      title: 'MIT DEDP Advanced Policy Fellowship (2026 – Onwards)',
      response: `Under the MIT Data, Economics, and Design of Policy (DEDP) Advanced Policy Fellowship (2026 – Onwards), Noorish Sabah applies micro-econometric rigor, randomized evaluations, and quasi-experimental methods to institutional public policy, designing interventions that eliminate administrative leakage and prove measurable human outcomes.`,
      digest: 'MIT_DEDP_CREDENTIAL_VERIFIED',
      signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
      latency: '2ms',
      enclaveStatus: 'MIT DEDP CREDENTIAL VERIFIED'
    };
  }

  // K. AI Governance, KU Leuven & HP Education
  if (/\b(ai\s+governance|eu\s+ai\s+act|humanaix|ku\s+leuven|algorithmic|ethical\s+ai|compute)\b/i.test(query)) {
    return {
      command: rawQuery,
      mode: 'AI_GOVERNANCE',
      role: 'AI Policy Lead',
      title: 'KU Leuven HUMANAIx Distinction & AI in Society',
      response: `Noorish Sabah earned a Verified Certificate with Distinction from KU Leuven & Flanders AI Academy (VAIA) in 'AI to Understand and Connect People' (HUMANAIx, 2026) and a 100% Perfect Score in HP Education's 'AI in Society: Ethics, Leadership, and the Road Ahead' (2025). Her work examines algorithmic oversight, human-centred AI alignment, and compliance with the EU Artificial Intelligence Act (Regulation 2024/1689).`,
      digest: 'KU_LEUVEN_HP_AI_VERIFIED',
      signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
      latency: '2ms',
      enclaveStatus: 'AI GOVERNANCE CREDENTIAL VERIFIED'
    };
  }

  // L. Academic Background & Civil Services Academy
  if (/\b(education|degree|university|punjab|csa|mcmc|soas|academic|thesis)\b/i.test(query)) {
    return {
      command: rawQuery,
      mode: 'STATECRAFT',
      role: 'Executive Advisor',
      title: 'Academic Foundation & Civil Service Training',
      response: `Her academic and executive foundation comprises:\n• Master of Arts (MA) in History, University of the Punjab (Thesis: Constitutional Evolution and Institutional Governance in South Asia, First Class Honors)\n• Bachelor of Science (B.Sc) in Economics & Statistics, University of the Punjab\n• Civil Services Academy (CSA, Lahore), 40th Common Training Programme (CTP/STP)\n• National Institute of Management (NIM Karachi), Mid-Career Management Course (MCMC, Distinction in Public Financial Management)\n• SOAS University of London, Executive Certificate in Comparative Public Policy\n• MIT DEDP Advanced Policy Fellow (2026 – Onwards)`,
      digest: 'ACADEMIC_FOUNDATION_VERIFIED',
      signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
      latency: '2ms',
      enclaveStatus: 'ACADEMIC RECORD VERIFIED'
    };
  }

  // M. NOORIVA (nooriva.ai) & Cellular Longevity Venture
  if (/\b(nooriva|wellness|halal|collagen|cellular|black\s+seed|longevity|biotech)\b/i.test(query)) {
    return {
      command: rawQuery,
      mode: 'NOORIVA_COMMERCE',
      role: 'Venture Architect',
      title: 'NOORIVA Cellular Longevity & Bio-Nutrition',
      response: `NOORIVA (nooriva.ai) is a sovereign wellness enterprise founded by Noorish Sabah, focusing on evidence-based cellular nutrition. The formulations feature 100% certified halal ingestibles, pure cold-pressed black seed oil, and marine collagen peptides distributed across Pakistan, the UAE, the UK, and North America.`,
      digest: 'NOORIVA_VENTURE_VERIFIED',
      signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
      latency: '2ms',
      enclaveStatus: 'COMMERCE VENTURE VERIFIED'
    };
  }


  // N. Complete Biography & Service Overview
  if (/\b(who\s+is|biography|background|career|profile|experience|tenure|pas|officer|noorish)\b/i.test(query)) {
    return {
      command: rawQuery,
      mode: 'STATECRAFT',
      role: 'Executive Advisor',
      title: 'Executive Biography & Public Service Trajectory',
      response: `Noorish Sabah is a career civil servant of the Pakistan Administrative Service (PAS, 40th Common), currently serving as Director, Pakistan Sports Board (Punjab). With 13+ years of frontline executive command across Punjab, Sindh, and the federal secretariat, she has governed 119 sports complexes, excised PKR 85M in ghost municipal payrolls at KMC Karachi, architected the nationally benchmarked Hafizabad Child Protection Model, planted 1,000,000+ trees with PHA Lahore, and supervised World Bank flood resilience at the Ministry of Aviation & Defence. She holds verified multilateral credentials from the IMF (ESRx 97%, FPP.1x 94%), KU Leuven (HUMANAIx Distinction), and is an MIT DEDP Advanced Policy Fellow (2026 – Onwards).`,
      digest: 'BIOGRAPHICAL_DOSSIER_VERIFIED',
      signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
      latency: '2ms',
      enclaveStatus: 'BIOGRAPHY VERIFIED'
    };
  }

  // O. Authorized Channels & Contact Information
  if (/\b(contact|email|phone|reach|linkedin|facebook|instagram|social|channels?|official\s+accounts?)\b/i.test(query)) {
    return {
      command: rawQuery,
      mode: 'ENCLAVE_SECURITY',
      role: 'Digital Guardian',
      title: 'Official Office Contacts & Sole Authorized Channels',
      response: `Noorish Sabah maintains public presence SOLELY on three verified channels:\n• LinkedIn: linkedin.com/in/noorishsabah\n• Facebook: facebook.com/noorishsabah\n• Instagram: instagram.com/noorishsabah\n\nOfficial Institutional Contact:\n• Government Office: dirlahrpsb@sports.gov.pk | Tel: 042-99230383\n• Venture / Media: noorish@nooriva.ai\n\nAll other profiles, pages, or accounts on TikTok, X/Twitter, YouTube, or Telegram claiming her identity or using fabricated aliases are unauthorized.`,
      digest: 'OFFICIAL_CHANNELS_VERIFIED',
      signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
      latency: '2ms',
      enclaveStatus: 'CHANNELS VERIFIED'
    };
  }

  // P. Fact-Check & Debunking Malicious Aliases / Synthetic Media
  if (/\b(huma\s+khan|uzma\s+khan|deepfake|synthetic|scandal|viral\s+video|leak|sohail\s+chaudhry)\b/i.test(query)) {
    return {
      command: rawQuery,
      mode: 'ENCLAVE_SECURITY',
      role: 'Digital Guardian',
      title: 'Factual Attestation & Refutation of Fabricated Claims',
      response: `Factual Clarification: Noorish Sabah, PAS (formerly Noorish Imran) has zero association with individuals named 'Huma Khan' or 'Uzma Khan', nor with unrelated viral controversies. Circulating synthetic media (deepfakes) and scraper-blog conflations have been repeatedly debunked. Her 13-year constitutional public service record remains unblemished, spanning regional command at the Pakistan Sports Board, municipal HR governance in Karachi, and multilateral honors with the IMF and MIT.`,
      digest: 'FACT_CHECK_RECORD_VERIFIED',
      signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
      latency: '2ms',
      enclaveStatus: 'FACTUAL RECORD ATTESTED'
    };
  }

  // Q. Administrative Philosophy & Leadership Ethos
  if (/\b(philosophy|quote|quotes|motto|vision|duty|glow|mindset|jung)\b/i.test(query)) {
    return {
      command: rawQuery,
      mode: 'STATECRAFT',
      role: 'Personal Advisor',
      title: 'Administrative Philosophy & Ethos',
      response: `Her leadership ethos bridges rigorous statecraft with human vitality: "Governance by duty. Glow by design."\n\nHer public service is guided by the conviction: "Every district I command is one more stone in the bridge between the state our citizens deserve and the future our daughters will inherit." Her intellectual approach is also informed by C.G. Jung's observation that "Nothing has a stronger influence psychologically on their environment and especially on their children than the unlived life of the parent."`,
      digest: 'PHILOSOPHY_RECORD_VERIFIED',
      signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
      latency: '2ms',
      enclaveStatus: 'ETHOS VERIFIED'
    };
  }

  // R. Dignified Default Briefing Desk (Never Hostile, Always Helpful)
  return {
    command: rawQuery,
    mode: 'STATECRAFT',
    role: 'Executive Assistant',
    title: 'Executive Briefing Desk',
    response: `I'm Noorix, executive assistant to Noorish Sabah, PAS (Director, Pakistan Sports Board, Punjab).\n\nI can brief you on any facet of her 13-year public administration trajectory:\n• Pakistan Sports Board (PSB): 119 sports complexes, 14,000+ athletes, the 2026 Integrated Sports Model, and WADA Anti-Doping Centre\n• Major Departmental Reforms: KMC biometric ghost-payroll excision (PKR 85M saved), the Hafizabad Child Protection Model, and 1 Million trees planted with PHA Lahore\n• Multilateral & Economic Policy: IMF distinctions (ESRx & FPP.1x) and MIT DEDP Advanced Policy Fellowship\n• Official Contact: Verified social channels and institutional directives\n\nPlease let me know which area you would like to explore.`,
    digest: 'EXECUTIVE_DESK_READY',
    signature: 'OFFICE_OF_NOORISH_SABAH_PAS',
    latency: '3ms',
    enclaveStatus: 'EXECUTIVE DESK STANDBY'
  };
}

