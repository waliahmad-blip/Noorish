import { Credential } from '../types/protocol';

export interface AcademicInstitution {
  degree: string;
  institution: string;
  field: string;
  period: string;
  distinction: string;
}

export const ACADEMIC_FOUNDATION: AcademicInstitution[] = [
  {
    degree: "Master of Arts (MA)",
    institution: "University of the Punjab",
    field: "History (Thesis: Constitutional Evolution in South Asia)",
    period: "Postgraduate",
    distinction: "First Class Honors"
  },
  {
    degree: "Bachelor of Science (B.Sc)",
    institution: "University of the Punjab",
    field: "Economics & Statistics",
    period: "Undergraduate",
    distinction: "Quantitative Analytics Focus"
  },
  {
    degree: "Civil Services Academy (CSA)",
    institution: "Government of Pakistan, Lahore",
    field: "40th Common Training Programme (CTP/STP)",
    period: "2012 to 2014",
    distinction: "Top Percentile National Merit"
  },
  {
    degree: "Mid-Career Management Course (MCMC)",
    institution: "National Institute of Management (NIM), Karachi",
    field: "Senior Executive Policy & Administration",
    period: "Executive",
    distinction: "Distinction in Public Financial Management"
  },
  {
    degree: "Executive Certificate",
    institution: "SOAS University of London",
    field: "Public Policy & International Development",
    period: "Executive Education",
    distinction: "Global Comparative Governance"
  },
  {
    degree: "MIT DEDP Advanced Policy Fellow",
    institution: "Massachusetts Institute of Technology (MIT)",
    field: "Data, Economics, and Design of Policy (DEDP)",
    period: "2026 – Onwards",
    distinction: "Quantitative Macroeconomic Policy & Econometric Evaluation"
  }
];

export const VERIFIED_CREDENTIALS: Credential[] = [
  {
    id: 'imf-esrx',
    title: 'Energy Subsidy Reform and Fiscal Sustainability (ESRx)',
    code: 'IMF.ESRx',
    institution: 'International Monetary Fund (IMF)',
    status: 'Completed',
    achievement: 'Verified Multilateral Credential • Fiscal Policy Track',
    issuedDate: '2025',
    edxId: 'f94c18ea72c442d881ab49c253de1984',
    pillar: 'Macroeconomic & Fiscal Policy',
    signatories: [
      'Fiscal Affairs Department (FAD), IMF',
      'IMF Institute for Capacity Development (ICD)'
    ],
    score: 'Verified Official (Distinction)',
    benefitToPakistan: 'Architecting targeted cash transfer mechanisms that protect vulnerable families while eliminating regressive power and fuel tariff drains.'
  },
  {
    id: 'ku-leuven-humanaix',
    title: 'AI to Understand and Connect People (HUMANAIx)',
    code: 'HUMANAIx',
    institution: 'KU Leuven & Flanders AI Academy (VAIA)',
    status: 'Completed',
    achievement: 'Verified Certificate with Distinction',
    issuedDate: '7 September 2026',
    edxId: '9db3635447dd40d9b13f395c17aabdc0',
    pillar: 'AI Governance',
    signatories: [
      'Prof. Dr. Piet Desmet (Vice Rector, KU Leuven)',
      'Prof. Dr. Luc De Raedt (Chairman, Flanders AI Academy)'
    ],
    score: 'Verified Official'
  },
  {
    id: 'hp-ai-society',
    title: 'AI in Society: Ethics, Leadership, and the Road Ahead',
    code: 'HP.AI.101',
    institution: 'HP (Hewlett-Packard Education)',
    status: 'Completed',
    achievement: '100% Perfect Score, A+ Distinction',
    issuedDate: '2025',
    edxId: '1227397f56d642e2983630a08493f39b',
    pillar: 'AI Governance',
    signatories: ['HP Education Global Leadership Board'],
    score: '100% (A+)'
  },
  {
    id: 'idb-data-policy',
    title: 'Data for Effective Policy Making',
    code: 'IDBx.DATA.1x',
    institution: 'Inter-American Development Bank (IDB)',
    status: 'Completed',
    achievement: '95% Score, A+ Distinction',
    issuedDate: '2025',
    edxId: '9d3e06ea9e614656bed5b85d577c0936',
    pillar: 'Urban Futures',
    signatories: ['IDB Knowledge and Learning Sector Directorate'],
    score: '95% (A+)'
  },
  {
    id: 'imf-fpp1x',
    title: 'Financial Programming and Policies, Part 1: Macroeconomic Accounts & Analysis',
    code: 'FPP.1x',
    institution: 'International Monetary Fund (IMF)',
    status: 'Completed',
    achievement: 'A+ Grade, Macroeconomic Policy Track',
    issuedDate: '2024',
    edxId: 'f20c995aaecf4bc2a7665eb2a3a0424b',
    pillar: 'Macroeconomic & Fiscal Policy',
    signatories: ['IMF Institute for Capacity Development'],
    score: 'A+ Distinction'
  },
  {
    id: 'oxford-leadership',
    title: 'Executive Leadership: High-Performance Strategic Governance (XFLSP01)',
    code: 'XFLSP01',
    institution: 'Saïd Business School, University of Oxford',
    status: 'Completed',
    achievement: 'Verified Multilateral Credential • High-Performance Strategic Leadership',
    issuedDate: '2025',
    edxId: 'oxford-xflsp01-strat-lead-77b1',
    pillar: 'Strategic Leadership',
    signatories: [
      'Saïd Business School, University of Oxford',
      'Oxford Executive Leadership Directorate'
    ],
    score: 'Verified Official (Distinction)',
    benefitToPakistan: 'Institutional modernization models for provincial bureaucracy, conflict mitigation, and crisis-ready administrative cadres.'
  }
];

export const IN_PROGRESS_CREDENTIALS: Credential[] = [
  {
    id: 'adelaide-cybersecurity',
    title: 'Cybersecurity Governance and Digital Infrastructure',
    code: 'AdelaideX.CYB',
    institution: 'University of Adelaide',
    status: 'In Progress',
    pillar: 'AI Governance',
    benefitToPakistan: 'Securing provincial government databases, Arazi land registries, and biometric citizen services against sovereign cyber threats.'
  },
  {
    id: 'harvard-public-leadership',
    title: 'Public Leadership & Creating Public Value',
    code: 'HarvardX.PL',
    institution: 'Harvard Kennedy School / HarvardX',
    status: 'In Progress',
    pillar: 'Strategic Leadership',
    benefitToPakistan: 'Evidence-based design of cross-departmental delivery units with quantifiable citizen satisfaction KPIs.'
  },
  {
    id: 'usm-cloud-ai',
    title: 'Cloud Infrastructure and Enterprise AI Deployment',
    code: 'USMx.AI.CLOUD',
    institution: 'University System of Maryland',
    status: 'In Progress',
    pillar: 'AI Governance',
    benefitToPakistan: 'Decentralized provincial government cloud computing reducing public expenditure and eliminating data silos across 36 districts.'
  }
];
