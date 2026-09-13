/**
 * SOVEREIGN EXECUTIVE DOSSIER: NOORISH SABAH, PAS
 * Single source of truth for biographical facts, civil service postings,
 * quantitative metrics, multilateral credentials, and institutional mandates.
 */

export interface DepartmentRecord {
  id: string;
  department: string;
  role: string;
  period: string;
  location: string;
  keyResponsibilities: string[];
  quantitativeAchievements: { metric: string; value: string }[];
  summary: string;
}

export interface MultilateralCredential {
  id: string;
  title: string;
  institution: string;
  year: string;
  distinction: string;
  significance: string;
}

export const NOORISH_PROFILE = {
  fullName: "Noorish Sabah, PAS",
  preferredName: "Noorish Sabah",
  cadre: "Pakistan Administrative Service (PAS)",
  commonBatch: "40th Common Training Programme (CTP/STP)",
  currentRole: "Director, Pakistan Sports Board (Punjab)",
  parentMinistry: "Ministry of Inter-Provincial Coordination (IPC), Government of Pakistan",
  fieldHeadquarters: "Lahore Coaching Centre, Ferozepur Road, Lahore",
  serviceTenureYears: "13+ Years (Field Command & Federal Policy)",
  
  officialContact: {
    governmentEmail: "dirlahrpsb@sports.gov.pk",
    officialPhone: "042-99230383",
    enterpriseEmail: "noorish@nooriva.ai",
    domain: "https://noorish.org",
    commerceDomain: "https://nooriva.ai"
  },

  authorizedSocialMedia: [
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/noorishsabah/" },
    { platform: "Facebook", url: "https://www.facebook.com/noorishsabah" },
    { platform: "Instagram", url: "https://www.instagram.com/noorishsabah/" }
  ],

  authorizedNotice: "Noorish Sabah maintains public digital presence SOLELY on LinkedIn, Facebook, and Instagram. All other accounts are unauthorized.",

  corePhilosophy: {
    motto: "Governance by duty. Glow by design.",
    governancePillar: "Every district I command is one more stone in the bridge between the state our citizens deserve and the future our daughters will inherit.",
    psychologicalEthos: "Nothing has a stronger influence psychologically on their environment and especially on their children than the unlived life of the parent. — C.G. Jung"
  },

  academicFoundations: [
    {
      degree: "Master of Arts (MA) in History",
      institution: "University of the Punjab",
      thesis: "Constitutional Evolution and Institutional Governance in South Asia",
      distinction: "First Class Honors"
    },
    {
      degree: "Bachelor of Science (B.Sc) in Economics & Statistics",
      institution: "University of the Punjab",
      distinction: "Quantitative Analytics Focus"
    },
    {
      degree: "Civil Services Academy (CSA)",
      institution: "Government of Pakistan, Lahore",
      field: "40th Common Training Programme (CTP & STP)",
      distinction: "High National Cadre Standing"
    },
    {
      degree: "Mid-Career Management Course (MCMC)",
      institution: "National Institute of Management (NIM), Karachi",
      field: "Senior Executive Policy, Budgetary Control & Governance",
      distinction: "Distinction in Public Financial Management"
    },
    {
      degree: "MIT DEDP Advanced Policy Fellowship",
      institution: "Massachusetts Institute of Technology (MIT)",
      field: "Data, Economics, and Design of Policy (DEDP)",
      period: "2026 – Onwards",
      distinction: "Quantitative Policy, Microeconomics & Econometrics"
    }
  ],

  multilateralCredentials: [
    {
      id: "imf-esrx",
      title: "Energy Subsidy Reform and Fiscal Sustainability (ESRx)",
      institution: "International Monetary Fund (IMF)",
      year: "2025",
      distinction: "97% High Distinction • edX Verified",
      significance: "Targeted cash transfers design to eliminate circular debt and reform regressive energy subsidies while shielding lower quintiles."
    },
    {
      id: "imf-fpp",
      title: "Financial Programming and Policies (FPP.1x)",
      institution: "International Monetary Fund (IMF)",
      year: "2024",
      distinction: "94% High Distinction • edX Verified",
      significance: "Quantitative macroeconomic programming integrating real, fiscal, external, and monetary sector balances under IMF SBA / EFF parameters."
    },
    {
      id: "ku-leuven-humanaix",
      title: "AI to Understand and Connect People (HUMANAIx)",
      institution: "KU Leuven & Flanders AI Academy (VAIA)",
      year: "2026",
      distinction: "Verified Certificate with Distinction",
      significance: "Human-centric artificial intelligence alignment, algorithmic governance, and EU Artificial Intelligence Act compliance."
    },
    {
      id: "hp-ai-ethics",
      title: "AI in Society: Ethics, Leadership, and the Road Ahead",
      institution: "HP Education Global",
      year: "2025",
      distinction: "100% Perfect Score • Grade A+",
      significance: "Ethical compute governance, algorithmic accountability, and sovereign technology deployment."
    },
    {
      id: "oxford-said",
      title: "Oxford Executive Leadership & Strategy",
      institution: "Saïd Business School, University of Oxford (XFLSP01)",
      year: "2024",
      distinction: "Executive Certificate",
      significance: "Strategic statecraft, multilateral stakeholder management, and institutional transformation."
    }
  ] as MultilateralCredential[],

  departmentalDossier: [
    {
      id: "psb-punjab",
      department: "Pakistan Sports Board (PSB), Ministry of Inter-Provincial Coordination (IPC)",
      role: "Director, Pakistan Sports Board (Punjab)",
      period: "July 2024 – Present",
      location: "Lahore Coaching Centre, Punjab",
      summary: "First woman appointed as Regional Director of Pakistan Sports Board (Punjab). Exercises executive jurisdiction over 119 national sports complexes and an athlete pipeline of over 14,000 youth athletes across Punjab.",
      keyResponsibilities: [
        "Executive oversight of 119 Olympic, provincial, and district athletic complexes across Punjab.",
        "Formulated and submitted the First Integrated National Sports Model to the Prime Minister Inspection Commission (PMIC), harmonizing federal, provincial, HEC, and Pakistan Olympic Association (POA) frameworks.",
        "Established Pakistan's first state-of-the-art, WADA-compliant Anti-Doping Centre at Lahore Coaching Centre.",
        "Negotiated landmark public-private partnership MoU with ACTIVIT (Dr. Rizwan Aftab Ahmed, CEO National Hospital Lahore) for sports medicine, performance nutrition, and athlete injury rehabilitation.",
        "Inaugurated Pakistan's First Women's Snooker Academy at Lahore Coaching Centre.",
        "Spearheaded nationwide Women in Sports grassroots initiative across 12+ districts to accelerate female athletic participation."
      ],
      quantitativeAchievements: [
        { metric: "Governed Athletic Complexes", value: "119 Facilities" },
        { metric: "Governed Youth Athletes", value: "14,000+ Active" },
        { metric: "Grassroots Campaign Reach", value: "12+ Districts" },
        { metric: "Official Contact", value: "042-99230383 / dirlahrpsb@sports.gov.pk" }
      ]
    },
    {
      id: "aviation-defence",
      department: "Ministry of Aviation & Defence, Government of Pakistan",
      role: "Section Officer (Policy & Coordination)",
      period: "July 2023 – July 2024",
      location: "Federal Secretariat, Islamabad",
      summary: "Managed high-level civil aviation and defense inter-agency policy coordination across 8 federal agencies, aligning projects with federal Rules of Business.",
      keyResponsibilities: [
        "Supervised the World Bank-funded Integrated Flood Resilience Adaptation Project (IFRAP) for the Pakistan Meteorological Department (PMD).",
        "Inter-agency coordination between Ministry of Defence, Civil Aviation Authority, and national security organs.",
        "Formulated quantitative policy briefs and statutory compliance dossiers for federal Cabinet review."
      ],
      quantitativeAchievements: [
        { metric: "Coordinated Federal Agencies", value: "8+ Agencies" },
        { metric: "World Bank Project Portfolio", value: "IFRAP Supervised" }
      ]
    },
    {
      id: "sindh-irrigation",
      department: "Irrigation Department, Government of Sindh",
      role: "Deputy Secretary (Administration)",
      period: "September 2022 – April 2023",
      location: "Karachi, Sindh",
      summary: "Directed administrative and judicial legal defense during the catastrophic 2022 super-floods, defending provincial water distribution equity before the High Courts and Supreme Court of Pakistan.",
      keyResponsibilities: [
        "Led judicial litigation team representing Sindh Irrigation before the High Court of Sindh and Supreme Court of Pakistan with 100% statutory compliance.",
        "Administered post-flood canal infrastructure restoration and barrage water telemetry across the Indus River basin.",
        "Streamlined emergency procurement protocols to reinforce breached dykes and protect riparian communities."
      ],
      quantitativeAchievements: [
        { metric: "Judicial Legal Compliance", value: "100% Disposal" },
        { metric: "Water Infrastructure Grid", value: "Provincial Scale" }
      ]
    },
    {
      id: "kmc-karachi",
      department: "Karachi Metropolitan Corporation (KMC)",
      role: "Senior Director HRM",
      period: "November 2021 – September 2022",
      location: "Karachi, Sindh",
      summary: "First woman in KMC history appointed as Senior Director HRM, governing human resource administration for over 7,000 municipal employees across Karachi megacity.",
      keyResponsibilities: [
        "Executed forensic biometric payroll audit that identified and excised ghost workers, generating PKR 85 Million in recurring annual fiscal savings.",
        "Restructured departmental human resources, driving a 28% increase in merit-based female supervisory promotions.",
        "Instituted statutory workplace anti-harassment inquiry committees in full compliance with the 2010 Protection Against Harassment at the Workplace Act."
      ],
      quantitativeAchievements: [
        { metric: "Municipal Workforce Governed", value: "7,000+ Personnel" },
        { metric: "Recurring Annual Payroll Savings", value: "PKR 85 Million" },
        { metric: "Female Supervisory Promotions", value: "+28% Surge" }
      ]
    },
    {
      id: "hafizabad-district",
      department: "District Administration Hafizabad, Government of Punjab",
      role: "Additional Deputy Commissioner (Revenue & General) / AC",
      period: "February 2021 – October 2021",
      location: "Hafizabad, Punjab",
      summary: "Pioneered the nationally recognized Hafizabad Child Protection Model and modernized district land revenue administration.",
      keyResponsibilities: [
        "Architected the landmark Hafizabad Model: an integrated 72-hour rapid response protocol uniting Police, Child Protection Bureau, Health, and Judiciary.",
        "Presided over appellate revenue courts, resolving disputed land claims stagnant for over 20 years.",
        "Upgraded Arazi Record Centers, slashing citizen processing delays by 60% and exceeding provincial revenue collection targets by 118%."
      ],
      quantitativeAchievements: [
        { metric: "Child Protection Rapid Response", value: "72-Hour Benchmark" },
        { metric: "Provincial Revenue Target", value: "118% Realized" },
        { metric: "Citizen Land Processing Speed", value: "60% Accelerated" }
      ]
    },
    {
      id: "pha-lahore",
      department: "Parks and Horticulture Authority (PHA), Lahore",
      role: "Director (Operations & Marketing) / Additional DG",
      period: "May 2018 – July 2019",
      location: "Lahore, Punjab",
      summary: "Spearheaded metropolitan ecological restoration, planting 1,000,000+ trees and 45 Miyawaki micro-forests across Lahore.",
      keyResponsibilities: [
        "Directed the mass urban plantation campaign that successfully planted 1,000,000+ trees across metropolitan Lahore.",
        "Established 45 Miyawaki ultra-dense micro-forest clusters across urban heat islands.",
        "Orchestrated multi-agency security and crowd-control logistics for mega cultural festivals hosting 200,000+ attendees."
      ],
      quantitativeAchievements: [
        { metric: "Trees Planted in Lahore", value: "1,000,000+ Trees" },
        { metric: "Miyawaki Forests Created", value: "45 Clusters" }
      ]
    },
    {
      id: "sgad-punjab",
      department: "Services & General Administration Department (S&GAD), Government of the Punjab",
      role: "Deputy Secretary (Welfare)",
      period: "September 2017 – May 2018",
      location: "Civil Secretariat, Lahore",
      summary: "Managed welfare, administrative estates, and high-security protocol for the Punjab Civil Secretariat and official enclaves.",
      keyResponsibilities: [
        "Fortified security infrastructure for the Punjab Civil Secretariat and Government Officers Residences (GORs).",
        "Managed diplomatic protocol and logistics for 8+ foreign VVIP delegations with zero incidents."
      ],
      quantitativeAchievements: [
        { metric: "Foreign VVIP Delegations", value: "8+ Delegations" },
        { metric: "Security Breaches", value: "Zero" }
      ]
    },
    {
      id: "field-gujranwala",
      department: "District Administration Gujranwala & Sharaqpur, Punjab",
      role: "Assistant Commissioner / Administrator & ADC (Finance & Planning)",
      period: "October 2014 – September 2017",
      location: "Gujranwala & Sharaqpur, Punjab",
      summary: "Frontline magisterial and municipal authority across 22 departments, recovering PKR 1.4 Billion in state land.",
      keyResponsibilities: [
        "Spearheaded state anti-encroachment operations reclaiming PKR 1.4 Billion in state lands.",
        "Chaired District Security Committees for mass democratic gatherings managing 500,000+ citizens."
      ],
      quantitativeAchievements: [
        { metric: "Encroached Land Reclaimed", value: "PKR 1.4 Billion" },
        { metric: "Departments Commanded", value: "22 State Bodies" }
      ]
    }
  ] as DepartmentRecord[],

  nooriva: {
    brand: "NOORIVA",
    domain: "https://nooriva.ai",
    positioning: "Halal Ingestible Cellular Beauty & Evidence-Based Longevity Science",
    formulationEthos: "Cold-pressed black seed oil, Marine Collagen peptides, adaptogens, and cellular micronutrients.",
    crossBorderMarkets: ["Pakistan", "United Arab Emirates", "United Kingdom", "North America"]
  }
};
