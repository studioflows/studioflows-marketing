import { INITIATION_HOMEPAGE_CONTENT } from "@/lib/initiation-homepage-content";
import {
  InitiationAICategorySection,
  InitiationCompoundingIntelligenceSection,
  InitiationConfidenceModelSection,
  InitiationContinuityReframeSection,
  InitiationDependencySelectorSection,
  InitiationEntryPathsSection,
  InitiationFinalCtaSection,
  InitiationFivePillarsSection,
  InitiationFounderPainSection,
  InitiationFounderStorySection,
  InitiationFridayReportSection,
  InitiationHeroSection,
  InitiationOperationalDiagnosticSection,
  InitiationStudioFlowsRevealSection,
  ProgressionProvider,
  SystemResetTransition,
} from "@/components/home/InitiationHomeSections";

const C = INITIATION_HOMEPAGE_CONTENT;

export default function FinalHomePage() {
  return (
    <main className="min-h-screen bg-[#030304] text-[#E8E6E3]">
      <ProgressionProvider>
        <InitiationHeroSection content={C.hero} />
        <InitiationFounderPainSection content={C.founderPain} />
        <InitiationDependencySelectorSection content={C.dependencySelector} />
        <InitiationFounderStorySection content={C.founderStory} />
        <InitiationContinuityReframeSection content={C.continuityReframe} />
        <InitiationAICategorySection content={C.aiCategorySeparation} />

        <InitiationStudioFlowsRevealSection content={C.studioFlowsReveal} />

        <InitiationFridayReportSection content={C.fridayReportSimulation} />
        <InitiationCompoundingIntelligenceSection content={C.compoundingIntelligence} />
        <InitiationConfidenceModelSection content={C.confidenceModel} />
        <InitiationFivePillarsSection content={C.fivePillars} />

        {/* THE TURN — the noir is killed and the page is reborn in light. */}
        <SystemResetTransition />

        <InitiationOperationalDiagnosticSection content={C.operationalDiagnostic} />

        <InitiationEntryPathsSection content={C.entryPaths} />
        <InitiationFinalCtaSection content={C.finalCta} />
      </ProgressionProvider>
    </main>
  );
}
