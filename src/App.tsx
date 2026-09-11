import React, { useState, useEffect } from "react";
import { FacetId } from "./types/protocol";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { MobileCommandDock } from "./components/layout/MobileCommandDock";
import { HeroPrism } from "./components/hero/HeroPrism";
import { OfficerFacet } from "./components/facets/OfficerFacet";
import { EconomistFacet } from "./components/facets/EconomistFacet";
import { AIGovernorFacet } from "./components/facets/AIGovernorFacet";
import { FounderFacet } from "./components/facets/FounderFacet";
import { UniquenessMatrix } from "./components/interactive/UniquenessMatrix";
import { SpatialImpactMap } from "./components/interactive/SpatialImpactMap";
import { AcademicFoundation } from "./components/interactive/AcademicFoundation";
import { CredentialVault } from "./components/interactive/CredentialVault";
import { TechnologySuite } from "./components/interactive/TechnologySuite";
import { PartnershipAndFirsts } from "./components/interactive/PartnershipAndFirsts";
import { NoorixTerminal } from "./components/interactive/NoorixTerminal";
import { BrandAndGrowthLedger } from "./components/interactive/BrandAndGrowthLedger";
import { ClosingMonument } from "./components/interactive/ClosingMonument";
import { CertificateModal } from "./components/modals/CertificateModal";
import { initializeVisitorTelemetry } from "./utils/visitorTelemetry";

export const App: React.FC = () => {
  const [activeFacet, setActiveFacet] = useState<FacetId>("convergence");
  const [inspectCertId, setInspectCertId] = useState<string | null>(null);

  useEffect(() => {
    initializeVisitorTelemetry();
  }, []);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === "noorix" && activeFacet !== "convergence" && activeFacet !== "economist") {
      setActiveFacet("convergence");
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 60);
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
        <section className="py-12">
          {activeFacet === "officer" && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <OfficerFacet onInspectCertificate={setInspectCertId} />
            </div>
          )}

          {activeFacet === "economist" && (
            <div className="space-y-12">
              <NoorixTerminal />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <EconomistFacet onInspectCertificate={setInspectCertId} />
              </div>
            </div>
          )}

          {activeFacet === "ai-governor" && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AIGovernorFacet onInspectCertificate={setInspectCertId} />
            </div>
          )}

          {activeFacet === "founder" && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FounderFacet />
            </div>
          )}

          {activeFacet === "convergence" && (
            <div className="space-y-12">
              {/* Facet I: The State Strategist */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <OfficerFacet onInspectCertificate={setInspectCertId} />
              </div>

              {/* NOORIX Sovereign Command Terminal directly above the Macro-Economist */}
              <NoorixTerminal />

              {/* Facets II, III, & IV */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <EconomistFacet onInspectCertificate={setInspectCertId} />
                <AIGovernorFacet onInspectCertificate={setInspectCertId} />
                <FounderFacet />
              </div>
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

        {/* Sections 9 & 10: Digital Architecture & Growth Ledger */}
        <BrandAndGrowthLedger />

        {/* Section 11: Closing Monumental Statement */}
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
