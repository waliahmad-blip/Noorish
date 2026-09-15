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
import { NoorixFloatingHUD } from "./components/interactive/NoorixFloatingHUD";
import { BrandAndGrowthLedger } from "./components/interactive/BrandAndGrowthLedger";
import { AuthenticityLedger } from "./components/interactive/AuthenticityLedger";
import { ClosingMonument } from "./components/interactive/ClosingMonument";
import { CertificateModal } from "./components/modals/CertificateModal";
import { NoorixConciergeModal } from "./components/interactive/NoorixConciergeModal";
import { initializeVisitorTelemetry } from "./utils/visitorTelemetry";

export const App: React.FC = () => {
  const [activeFacet, setActiveFacet] = useState<FacetId>("convergence");
  const [inspectCertId, setInspectCertId] = useState<string | null>(null);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  useEffect(() => {
    // Build-time pre-render guard. During the headless pre-render pass we must
    // not initialise visitor telemetry (it would write a phantom visitor record
    // to Supabase on every production build) and must not arm the auto-greeting
    // timer, which would otherwise capture an open modal into the static HTML.
    const isPrerenderPass =
      typeof window !== "undefined" &&
      (window as unknown as { __NOORISH_PRERENDER__?: boolean }).__NOORISH_PRERENDER__ === true;

    if (isPrerenderPass) return;

    initializeVisitorTelemetry();

    // Diplomatic auto-greeting for first-time visitors
    try {
      const dismissed = localStorage.getItem("noorish_concierge_dismissed");
      if (!dismissed) {
        const timer = setTimeout(() => {
          setIsConciergeOpen(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage restricted
    }
  }, []);

  useEffect(() => {
    const handleOpenConcierge = () => {
      setIsConciergeOpen(true);
    };
    window.addEventListener("open-noorix-concierge", handleOpenConcierge);
    return () => window.removeEventListener("open-noorix-concierge", handleOpenConcierge);
  }, []);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === "noorix" && activeFacet !== "convergence" && activeFacet !== "economist") {
      setActiveFacet("convergence");
    } else if (sectionId === "field-command" && activeFacet !== "convergence" && activeFacet !== "officer") {
      setActiveFacet("convergence");
    } else if (sectionId === "ai-governance" && activeFacet !== "convergence" && activeFacet !== "ai-governor") {
      setActiveFacet("convergence");
    } else if (sectionId === "nooriva" && activeFacet !== "convergence" && activeFacet !== "founder") {
      setActiveFacet("convergence");
    }
    // Reflect the target in the address bar so every section is a shareable,
    // crawlable deep link (sitemap.xml advertises these anchors).
    if (typeof window !== "undefined" && window.history && window.history.replaceState) {
      window.history.replaceState(null, "", `#${sectionId}`);
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
            <div id="field-command" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
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
            <div id="ai-governance" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
              <AIGovernorFacet onInspectCertificate={setInspectCertId} />
            </div>
          )}

          {activeFacet === "founder" && (
            <div id="nooriva" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
              <FounderFacet />
            </div>
          )}

          {activeFacet === "convergence" && (
            <div className="space-y-12">
              {/* Facet I: The State Strategist */}
              <div id="field-command" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
                <OfficerFacet onInspectCertificate={setInspectCertId} />
              </div>

              {/* NOORIX Sovereign Command Terminal directly above the Macro-Economist */}
              <NoorixTerminal />

              {/* Facets II, III, & IV */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <EconomistFacet onInspectCertificate={setInspectCertId} />
                <div id="ai-governance" className="scroll-mt-24">
                  <AIGovernorFacet onInspectCertificate={setInspectCertId} />
                </div>
                <div id="nooriva" className="scroll-mt-24">
                  <FounderFacet />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section 2: The Uniqueness Thesis */}
        <div className="section-deferred">
          <UniquenessMatrix />
        </div>

        {/* Section 3: 13-Year Field Cartography of Impact */}
        <div className="section-deferred">
          <SpatialImpactMap />
        </div>

        {/* Section 4: Academic Foundation */}
        <div className="section-deferred">
          <AcademicFoundation />
        </div>

        {/* Section 5: Verified Multilateral Credential Vault */}
        <div className="section-deferred">
          <CredentialVault onInspectCertificate={setInspectCertId} />
        </div>

        {/* Section 6: Technology & Data Command */}
        <div className="section-deferred">
          <TechnologySuite />
        </div>

        {/* Sections 7 & 8: Multilateral Partnerships & Historical Firsts */}
        <div className="section-deferred">
          <PartnershipAndFirsts />
        </div>

        {/* Sections 9 & 10: Digital Architecture & Growth Ledger */}
        <div id="intelligence" className="scroll-mt-24 section-deferred">
          <BrandAndGrowthLedger />
        </div>

        {/* Section 11: Sovereign Authenticity & Identity Ledger */}
        <div className="section-deferred">
          <AuthenticityLedger />
        </div>

        {/* Section 12: Closing Monumental Statement */}
        <div className="section-deferred">
          <ClosingMonument />
        </div>
      </main>

      {/* Official Footprint */}
      <Footer />

      {/* Mobile 1-Thumb Command Dock */}
      <MobileCommandDock
        activeFacet={activeFacet}
        onSelectFacet={setActiveFacet}
      />

      {/* Global Floating Executive HUD Drawer */}
      <NoorixFloatingHUD />

      {/* Cryptographic edX Credential Inspection Modal */}
      <CertificateModal
        certId={inspectCertId}
        onClose={() => setInspectCertId(null)}
      />

      {/* Sovereign NOORIX Executive Concierge & Identity Gateway */}
      <NoorixConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />

    </div>
  );
};

export default App;
