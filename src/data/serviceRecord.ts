import { Posting } from '../types/protocol';

export const SERVICE_POSTINGS: Posting[] = [
  {
    id: 'psb-punjab',
    role: 'Director, Pakistan Sports Board (Punjab)',
    department: 'Ministry of Inter-Provincial Coordination, Government of Pakistan',
    period: '2024 to Present',
    location: 'Lahore, Punjab',
    coordinates: { x: 74, y: 31 },
    isFirstWoman: true,
    highlights: [
      'First woman to direct Pakistan Sports Board operations in Punjab.',
      'Oversight of federal sports facilities, high-performance coaching academies, and national athlete pipelines.',
      'Spearheaded modern sports analytics modernization, anti-doping educational frameworks, and private-public training sponsorships.',
      'Initiated nationwide Women in Sports campaign, raising competitive female athlete enrollment by 35%.'
    ],
    metrics: [
      { label: 'Athletic Complexes', value: '119 Facilities' },
      { label: 'Athlete Pipeline', value: '14,000+ Youth' },
      { label: 'Public-Private Yield', value: 'PKR 140M+' },
      { label: 'Female Participation', value: '+35%' }
    ]
  },
  {
    id: 'lgcd-punjab',
    role: 'Deputy Secretary',
    department: 'Local Government & Community Development Department, Punjab',
    period: '2023 to 2024',
    location: 'Lahore, Punjab',
    coordinates: { x: 73, y: 32 },
    highlights: [
      'Supervised legislative, financial, and policy coordination for municipal corporations and district councils across 36 districts.',
      'Managed Annual Development Programme (ADP) municipal infrastructure portfolio valued over PKR 2 Billion.',
      'Digitized local government service portals, driving complaint resolution rates to 95% on Prime Minister and Chief Minister portals.'
    ],
    metrics: [
      { label: 'ADP Portfolio', value: 'PKR 2.0B' },
      { label: 'Districts Coordinated', value: '36' },
      { label: 'Resolution Rate', value: '95%' }
    ]
  },
  {
    id: 'adcg-hafizabad',
    role: 'Additional Deputy Commissioner (General)',
    department: 'District Administration Hafizabad, Government of Punjab',
    period: '2022 to 2023',
    location: 'Hafizabad, Punjab',
    coordinates: { x: 73.6, y: 32.06 },
    highlights: [
      'Architected the Hafizabad Model: an integrated inter-agency child protection and female victim support unit uniting police, healthcare, and judiciary.',
      'Supervised price control magistrates and food supply chain monitoring, securing district ranking in top 5 Punjab compliance audits.',
      'Led disaster management and pandemic resilience units with zero supply chain interruption across rural tehsils.'
    ],
    metrics: [
      { label: 'Case Disposal Speed', value: '72 Hours' },
      { label: 'District Compliance', value: 'Top 5' },
      { label: 'Model Adoption', value: 'National' }
    ]
  },
  {
    id: 'adcr-hafizabad',
    role: 'Additional Deputy Commissioner (Revenue)',
    department: 'Board of Revenue Punjab / District Administration Hafizabad',
    period: '2021 to 2022',
    location: 'Hafizabad, Punjab',
    coordinates: { x: 73.5, y: 32.1 },
    highlights: [
      'Presided over appellate revenue courts, resolving long-standing land ownership disputes dating back over 20 years.',
      'Executed digital land records modernization (Arazi Record Centers), reducing land registry processing delays by 60%.',
      'Surpassed provincial revenue recovery targets by 118% through automated registry auditing.'
    ],
    metrics: [
      { label: 'Target Realization', value: '118%' },
      { label: 'Latency Cut', value: '-60%' },
      { label: 'Disputes Resolved', value: '4,200+' }
    ]
  },
  {
    id: 'pha-lahore',
    role: 'Director',
    department: 'Parks & Horticulture Authority (PHA), Lahore',
    period: '2020 to 2021',
    location: 'Lahore, Punjab',
    coordinates: { x: 74.3, y: 31.5 },
    highlights: [
      'Pioneered the Urban Forest Expansion initiative, overseeing the plantation of 1 Million indigenous trees across metropolitan Lahore.',
      'Designed Miyawaki urban forest clusters to combat smog and urban heat island effects.',
      'Modernized public green space security and waste recovery protocols across historic parks.'
    ],
    metrics: [
      { label: 'Trees Planted', value: '1,000,000+' },
      { label: 'Miyawaki Clusters', value: '45 Sites' },
      { label: 'Canopy Density', value: '+14%' }
    ]
  },
  {
    id: 'kmc-karachi',
    role: 'Senior Director (HRM)',
    department: 'Karachi Metropolitan Corporation (KMC), Sindh',
    period: '2019 to 2020',
    location: 'Karachi, Sindh',
    coordinates: { x: 67.0, y: 24.8 },
    isFirstWoman: true,
    highlights: [
      'First woman Senior Director of Human Resource Management in the history of Karachi Metropolitan Corporation.',
      'Directed personnel administration, pensions, and industrial relations for over 7,000 municipal employees across megacity departments.',
      'Conducted forensic payroll audits, eliminating ghost workforce allocations and establishing biometric attendance verification.',
      'Promoted female municipal leaders, achieving a 28% increase in female senior supervisory postings.'
    ],
    metrics: [
      { label: 'Workforce Governed', value: '7,000+' },
      { label: 'Female Promotions', value: '+28%' },
      { label: 'Audit Savings', value: 'PKR 85M' }
    ]
  },
  {
    id: 'food-punjab',
    role: 'Deputy Director',
    department: 'Punjab Food Department',
    period: '2018 to 2019',
    location: 'Lahore, Punjab',
    coordinates: { x: 74.2, y: 31.4 },
    highlights: [
      'Governed strategic wheat procurement, flour mill monitoring, and provincial food grain reserves.',
      'Implemented anti-hoarding digital inspection tracking during seasonal market shortages, stabilizing wheat flour supply.'
    ],
    metrics: [
      { label: 'Grain Supervised', value: '450K Tons' },
      { label: 'Price Variance', value: '<2.5%' }
    ]
  },
  {
    id: 'ac-gujranwala',
    role: 'Assistant Commissioner',
    department: 'Gujranwala City Sub-Division, Government of Punjab',
    period: '2017 to 2018',
    location: 'Gujranwala, Punjab',
    coordinates: { x: 74.1, y: 32.18 },
    highlights: [
      'Sub-divisional executive magistrate exercising criminal, judicial, and municipal regulatory authority over 1.2 million citizens.',
      'Spearheaded state land anti-encroachment operations, recovering commercial state property worth PKR 1.4 Billion.',
      'Led public municipal sanitization, industrial pollution enforcement, and emergency flood readiness operations.'
    ],
    metrics: [
      { label: 'Citizens Served', value: '1.2 Million' },
      { label: 'Recovered Land', value: 'PKR 1.4B' }
    ]
  },
  {
    id: 'ac-murree',
    role: 'Assistant Commissioner (Under Training)',
    department: 'District Administration Rawalpindi / Murree Sub-Division',
    period: '2016 to 2017',
    location: 'Murree & Rawalpindi, Punjab',
    coordinates: { x: 73.3, y: 33.9 },
    highlights: [
      'Field training in high-altitude tourism management, crowd control logistics, disaster response, and winter road accessibility.',
      'Coordinated multi-agency emergency rescue operations during peak snow tourist seasons.'
    ],
    metrics: [
      { label: 'Peak Tourist Traffic', value: '250K/Week' },
      { label: 'Clearance Protocol', value: '24/7 Rapid' }
    ]
  },
  {
    id: 'so-punjab',
    role: 'Section Officer',
    department: 'Finance / Services & General Administration Department (S&GAD), Punjab',
    period: '2014 to 2016',
    location: 'Civil Secretariat, Lahore',
    coordinates: { x: 74.31, y: 31.56 },
    highlights: [
      'Drafted executive policy summaries, provincial cabinet briefs, and financial rules interpretations.',
      'Managed cadre postings, civil service rule formulations, and inter-provincial officer allocations.'
    ],
    metrics: [
      { label: 'Cabinet Briefs', value: '160+' },
      { label: 'Rule Compliance', value: '100%' }
    ]
  },
  {
    id: 'csa-lahore',
    role: 'Civil Service Trainee Officer (PAS)',
    department: 'Civil Services Academy (CSA) Lahore, 40th Common Training Programme',
    period: '2012 to 2014',
    location: 'Lahore, Punjab',
    coordinates: { x: 74.34, y: 31.52 },
    highlights: [
      'Selected into the premier Pakistan Administrative Service (PAS) through nationwide Competitive Superior Services (CSS) examination.',
      'Completed foundational training in constitutional law, public administration, national security, economics, and criminal procedure code.'
    ],
    metrics: [
      { label: 'National CSS Cohort', value: 'Top Percentile' },
      { label: 'CTP / STP Rating', value: 'Distinction' }
    ]
  }
];
