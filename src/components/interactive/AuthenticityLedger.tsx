import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Scale, 
  UserCheck, 
  Linkedin, 
  Facebook, 
  Instagram,
  FileText,
  Lock,
  ArrowUpRight
} from 'lucide-react';

export const AuthenticityLedger: React.FC = () => {
  return (
    <section id="authenticity" aria-label="Sovereign Authenticity and Biometric Anti-Deepfake Verification Ledger" className="py-20 bg-obsidian-950 text-slate-100 border-t border-cyan-500/20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Header & Attestation Banner */}
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 text-xs font-mono text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
            <ShieldCheck className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>AUTHENTICITY & SOVEREIGN IDENTITY LEDGER • GOOGLE KNOWLEDGE GRAPH CANONICAL NODE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Sovereign Identity & Authenticity Dossier
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Official public registry attestation certifying constitutional cadre status, administrative nomenclature history, authorized social channels, and forensic rebuttals against non-consensual synthetic media.
          </p>
        </div>
        {/* Grid 1: Biometric Portrait & Cadre Authority */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Canonical Portrait Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-500/40 bg-obsidian-900 shadow-2xl shadow-cyan-500/20 group">
              <picture>
                <source media="(max-width: 640px)" srcSet="/assets/noorish-sabah-executive-mobile.webp" type="image/webp" />
                <source srcSet="/assets/noorish-sabah-official-portrait-2026.webp" type="image/webp" />
                <img 
                  src="/assets/noorish-sabah-official-portrait-2026.jpg" 
                  alt="Noorish Sabah, PAS - Official Sovereign Portrait" 
                  className="w-full h-auto object-cover aspect-square transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width="1024"
                  height="1024"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-obsidian-900/90 border border-cyan-500/30 backdrop-blur-md space-y-1">
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-mint-400" />
                    CANONICAL LIKENESS
                  </span>
                  <span className="text-[10px] text-slate-400">2048 × 2048 PX</span>
                </div>
                <div className="text-xs text-slate-200 font-medium">
                  Official Executive Portrait • Director Pakistan Sports Board (Punjab)
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-900/80 border border-slate-800 text-xs font-mono text-slate-400 space-y-1.5">
              <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>BIOMETRIC ENTITY ANCHOR</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Indexed directly into Google Vision, Knowledge Graph, and reverse-image databases to permanently displace synthetic media and protect digital likeness rights.
              </p>
            </div>
          </div>
          {/* Cadre & Administrative Record Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Cadre Card */}
            <div className="glass-quantum rounded-2xl p-6 border border-cyan-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-mint-400" />
                  CONSTITUTIONAL CIVIL SERVICE COMMAND
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-mint-500/10 text-mint-300 border border-mint-500/30">
                  ACTIVE PAS CADRE
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-display font-bold text-white">
                  Noorish Sabah, PAS
                </div>
                <div className="text-sm text-cyan-300 font-medium">
                  Director, Pakistan Sports Board (Punjab) • Ministry of Inter-Provincial Coordination
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Member of the 40th Common Training Programme of the Pakistan Administrative Service (PAS). 13-year frontline trajectory across district magistracy, child protection frameworks, municipal human resources, and provincial sport ecosystems.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-obsidian-900/90 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase">Government Email Node</span>
                  <div className="text-white font-medium break-all">dirlahrpsb@sports.gov.pk</div>
                </div>
                <div className="p-3 rounded-xl bg-obsidian-900/90 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase">Sovereign Domain</span>
                  <div className="text-cyan-400 font-medium">https://noorish.org</div>
                </div>
              </div>
            </div>

            {/* Gazetted Continuity Notice */}
            <div className="glass-quantum rounded-2xl p-6 border border-slate-700/60 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-wider">
                <FileText className="w-4 h-4 text-violet-400" />
                <span>Administrative Nomenclature & Gazetted Continuity</span>
              </div>
              <div className="text-xs text-slate-300 leading-relaxed space-y-2">
                <p>
                  <strong>Nomenclature Continuity:</strong> Official executive postings across 2012–2026—including Assistant Commissioner Ferozewala, Additional Deputy Commissioner (Revenue) Lahore, Deputy Commissioner Hafizabad, Senior Director HRM KMC Karachi, and Director PHA Lahore—are canonically unified under <strong>Noorish Sabah</strong>, alongside matrimonial records under <strong>Noorish Ahmad</strong> and <strong>Noorish Wali</strong>.
                </p>
                <p className="text-slate-400 text-[11px]">
                  All historical state citations, governance initiatives, tree-planting records, and child protection awards belong strictly and unequivocally to <strong>Noorish Sabah, PAS</strong>.
                </p>
              </div>
            </div>

          </div>
        </div>
        {/* Section 2: The Three Sole Authorized Social Media Channels */}
        <div className="space-y-6">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint-500/10 text-xs font-mono text-mint-400 border border-mint-500/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-mint-400" />
              <span>CANONICAL SOCIAL ARCHITECTURE • 3 AUTHORIZED CHANNELS ONLY</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white">
              Official & Exclusively Authorized Social Profiles
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              To dismantle digital impersonation and fraudulent representation, the public record certifies that Noorish Sabah maintains presence solely on the three verified channels below. All other accounts on any platform are fraudulent clones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/noorishsabah/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-quantum rounded-2xl p-5 border border-cyan-500/30 hover:border-cyan-400 transition-all group block space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Linkedin className="w-4 h-4" />
                </div>
                <span className="flex items-center gap-1 text-[11px] font-mono text-cyan-400">
                  <span>VERIFIED NODE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <div className="font-display font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                  LinkedIn Verified
                </div>
                <div className="text-xs font-mono text-cyan-400/80">/in/noorishsabah</div>
              </div>
              <p className="text-xs text-slate-400 leading-normal">
                Executive leadership, administrative governance announcements, and public service credentials.
              </p>
            </a>

            {/* Facebook */}
            <a 
              href="https://www.facebook.com/noorishsabah" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-quantum rounded-2xl p-5 border border-cyan-500/30 hover:border-cyan-400 transition-all group block space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Facebook className="w-4 h-4" />
                </div>
                <span className="flex items-center gap-1 text-[11px] font-mono text-cyan-400">
                  <span>VERIFIED NODE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <div className="font-display font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                  Facebook Verified
                </div>
                <div className="text-xs font-mono text-cyan-400/80">/noorishsabah</div>
              </div>
              <p className="text-xs text-slate-400 leading-normal">
                Constituent communications, administrative outreach, and civic public notices.
              </p>
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/noorishsabah/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-quantum rounded-2xl p-5 border border-cyan-500/30 hover:border-cyan-400 transition-all group block space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                  <Instagram className="w-4 h-4" />
                </div>
                <span className="flex items-center gap-1 text-[11px] font-mono text-cyan-400">
                  <span>VERIFIED NODE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <div>
                <div className="font-display font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                  Instagram Verified
                </div>
                <div className="text-xs font-mono text-cyan-400/80">@noorishsabah</div>
              </div>
              <p className="text-xs text-slate-400 leading-normal">
                Sovereign lifestyle, wellness science architecture, and executive dispatches.
              </p>
            </a>

          </div>
          {/* Critical Warning Alert Banner */}
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-rose-300 uppercase tracking-wider font-mono text-[11px]">
                Critical Fraud & Digital Impersonation Warning
              </div>
              <p className="leading-relaxed text-slate-300">
                Any other accounts, channels, or groups on TikTok, X (Twitter), Telegram, YouTube, or Facebook claiming to represent Noorish Sabah, or operating under fabricated aliases (such as <strong>Huma Khan</strong>, <strong>Uzma Khan</strong>, or variations), are fraudulent clones and identity theft operations. All such unauthorized profiles are subject to active transnational legal enforcement.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Forensic Rebuttal & Legal Notice on Synthetic Media */}
        <div className="glass-quantum rounded-2xl p-6 sm:p-8 border border-rose-500/30 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-xs font-mono text-rose-400 border border-rose-500/20">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>FORENSIC ATTESTATION • SYNTHETIC MEDIA & DEFAMATION REFUTATION</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white">
              Public Legal & Forensic Notice on Defamatory Deepfakes
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
              Published pursuant to international cybercrime protocols, establishing formal evidentiary rebuttals against non-consensual synthetic media, search engine scraping syndicates, and identity theft vectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
            
            <div className="p-4 rounded-xl bg-obsidian-900/80 border border-slate-800 space-y-2">
              <div className="font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Refutation of 'Huma Khan' & 'Uzma Khan' Fabrications</span>
              </div>
              <p className="text-slate-300">
                Forensic investigation and administrative records confirm that civil servant Noorish Sabah (also recorded as Noorish Ahmad and Noorish Wali) has zero association with individuals named Huma Khan or Uzma Khan, nor with unrelated controversies in DHA Lahore. Malicious actors manufactured non-consensual synthetic face-swaps and clickbait conflations to defame a sitting constitutional officer.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-900/80 border border-slate-800 space-y-2">
              <div className="font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>June 2020 Scraper Blog Conflations Debunked</span>
              </div>
              <p className="text-slate-300">
                In June 2020, unverified scraper blogs harvested official administrative portraits of then-ADC Revenue Noorish Sabah to fabricate sensational headlines during an unrelated viral event. Judicial records and official service files confirm these claims were entirely fictitious. Her 13-year trajectory reflects an unblemished record of constitutional statecraft.
              </p>
            </div>

          </div>

          <div className="p-4 rounded-xl bg-obsidian-900/90 border border-slate-700/60 text-[11px] font-mono text-slate-400 space-y-2">
            <div className="text-slate-200 font-semibold flex items-center gap-2">
              <Scale className="w-4 h-4 text-rose-400" />
              <span>International Legal Framework & Criminal Penalties:</span>
            </div>
            <p className="leading-relaxed">
              The creation, hosting, indexing, or transmission of non-consensual synthetic media (deepfakes) and malicious impersonation constitutes criminal harassment prosecuted under the <strong>Council of Europe Budapest Convention on Cybercrime (ETS No. 185, Arts. 4 & 7)</strong>, <strong>Title 18 U.S. Code § 2261A</strong> (Transnational Cyber-Stalking), and the <strong>Computer Fraud and Abuse Act (CFAA § 1030)</strong>. Telemetry signatures and IP vectors from visitor sessions probing these terms are captured to our security incident ledger.
            </p>
          </div>
        </div>
        {/* Section 4: Cryptographic Credential Hashes */}
        <div className="glass-quantum rounded-2xl p-6 border border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              CRYPTOGRAPHIC CREDENTIAL LEDGER & EDX VERIFICATION HASHES
            </span>
            <span className="text-[10px] font-mono text-slate-400">CANONICAL EDX PROOFS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-obsidian-900/90 border border-slate-800 space-y-1">
              <div className="text-[10px] text-slate-400">University of Oxford (XFLSP01)</div>
              <div className="text-white font-medium text-[11px] truncate">oxford-xflsp01-strat-lead-77b1</div>
              <div className="text-[10px] text-cyan-400">Executive Leadership</div>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-900/90 border border-slate-800 space-y-1">
              <div className="text-[10px] text-slate-400">IMF Institute (FPP.1x)</div>
              <div className="text-white font-medium text-[11px] truncate">f20c995aaecf4bc2a7665eb2a3a0424b</div>
              <div className="text-[10px] text-mint-400">Macroeconomic Accounts</div>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-900/90 border border-slate-800 space-y-1">
              <div className="text-[10px] text-slate-400">IMF Institute (ESRx)</div>
              <div className="text-white font-medium text-[11px] truncate">f94c18ea72c442d881ab49c253de1984</div>
              <div className="text-[10px] text-mint-400">Energy Subsidy Reform</div>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-900/90 border border-slate-800 space-y-1">
              <div className="text-[10px] text-slate-400">KU Leuven (HUMANAIx)</div>
              <div className="text-white font-medium text-[11px] truncate">9db3635447dd40d9b13f395c17aabdc0</div>
              <div className="text-[10px] text-violet-400">Human-Centred AI</div>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-900/90 border border-slate-800 space-y-1">
              <div className="text-[10px] text-slate-400">HP (AI in Society)</div>
              <div className="text-white font-medium text-[11px] truncate">1227397f56d642e2983630a08493f39b</div>
              <div className="text-[10px] text-cyan-400">100% Final Grade</div>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-900/90 border border-slate-800 space-y-1">
              <div className="text-[10px] text-slate-400">Inter-American Development Bank</div>
              <div className="text-white font-medium text-[11px] truncate">9d3e06ea9e614656bed5b85d577c0936</div>
              <div className="text-[10px] text-cyan-400">Data for Effective Policy</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
