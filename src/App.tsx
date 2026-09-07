import React, { useState, useEffect } from 'react';
import { FacetId } from './types/protocol';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileCommandDock } from './components/layout/MobileCommandDock';
import { HeroPrism } from './components/hero/HeroPrism';
import { OfficerFacet } from './components/facets/OfficerFacet';
import { EconomistFacet } from './components/facets/EconomistFacet';
import { AIGovernorFacet } from './components/facets/AIGovernorFacet';
import { FounderFacet } from './components/facets/FounderFacet';
import { UniquenessMatrix } from './components/interactive/UniquenessMatrix';
import { SpatialImpactMap } from './components/interactive/SpatialImpactMap';
import { AcademicFoundation } from './components/interactive/AcademicFoundation';
import { CredentialVault } from './components/interactive/CredentialVault';
import { TechnologySuite } from './components/interactive/TechnologySuite';
import { PartnershipAndFirsts } from './components/interactive/PartnershipAndFirsts';
import { NoorixTerminal } from './components/interactive/NoorixTerminal';
import { BrandAndGrowthLedger } from './components/interactive/BrandAndGrowthLedger';
import { ClosingMonument } from './components/interactive/ClosingMonument';
import { CertificateModal } from './components/modals/CertificateModal';
import { initializeVisitorTelemetry } from './utils/visitorTelemetry';

export const App: React.FC = () => {
  const [activeFacet, setActiveFacet] = useState<FacetId>('convergence');
  const [inspectCertId, setInspectCertId] = useState<string | null>(null);

  useEffect(() => {
    initializeVisitorTelemetry();
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 selection:bg-cyan-500 selection:text-black relative">
      
      {/* Executive Sovereign Header */}
      <Header onNavigate={handleNavigate} />

      <main>
        {/* Concept 2: The Chromatic Hyper-Prism with 3D WebGL Canvas */}
        <HeroPrism
          activeFacet={activeFacet}
          onFacetChange={setActiveFacet}
          onNavigate={handleNavigate}
        />

        {/* Dynamic Facet Spotlight Container */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {activeFacet === 'officer' && <OfficerFacet />}
          {activeFacet === 'economist' && <EconomistFacet />}
          {activeFacet === 'ai-governor' && (
            <AIGovernorFacet onInspectCertificate={setInspectCertId} />
          )}
          {activeFacet === 'founder' && <FounderFacet />}
          {activeFacet === 'convergence' && (
            <div className="space-y-8">
              <OfficerFacet />
              <EconomistFacet />
              <AIGovernorFacet onInspectCertificate={setInspectCertId} />
              <FounderFacet />
            </div>
          )}
        </section>

        {/* Section 2: The Uniqueness Thesis */}
        <UniquenessMatrix />

        {/* Section 3: 13-Year Field Cartography of Impact */}
        <SpatialImpactMap />

        {/* Section 4: Academic Foundation */}
        <AcademicFoundation />

        {/* Section 5: Verified Multilateral Credential Vault */}
        <CredentialVault onInspectCertificate={setInspectCertId} />

        {/* Section 6: Technology & Data Command */}
        <TechnologySuite />

        {/* Sections 7 & 8: Multilateral Partnerships & Historical Firsts */}
        <PartnershipAndFirsts />

        {/* Section 9: Public Knowledge Engine & Autonomous Terminal */}
        <NoorixTerminal />

        {/* Sections 10, 11 & 12: Digital Architecture & Growth Ledger */}
        <BrandAndGrowthLedger />

        {/* Section 13: Closing Monumental Statement */}
        <ClosingMonument />
      </main>

      {/* Official Footprint */}
      <Footer />

      {/* Mobile 1-Thumb Command Dock */}
      <MobileCommandDock
        activeFacet={activeFacet}
        onSelectFacet={setActiveFacet}
      />

      {/* Cryptographic edX Credential Inspection Modal */}
      <CertificateModal
        certId={inspectCertId}
        onClose={() => setInspectCertId(null)}
      />

    </div>
  );
};

export default App;

