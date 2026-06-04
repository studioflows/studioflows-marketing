import { INITIATION_HOMEPAGE_CONTENT } from "@/lib/initiation-homepage-content";
import {
  InitiationAICategorySection,
  InitiationContinuityReframeSection,
  InitiationDependencySelectorSection,
  InitiationEntryPathsSection,
  InitiationFinalCtaSection,
  InitiationFounderPainSection,
  InitiationFounderStorySection,
  InitiationFridayReportSection,
  InitiationHeroSection,
  InitiationFoundingProgramSection,
  InitiationOperationalDiagnosticSection,
  InitiationServiceLoopsSection,
  InitiationStudioFlowsRevealSection,
  InitiationWhatYouGetSection,
  InlineCtaAnchor,
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
        <InitiationContinuityReframeSection
          content={C.continuityReframe}
          inlineCta={{ href: C.hero.primaryCtaTarget, label: C.hero.primaryCta }}
        />
        <InitiationAICategorySection content={C.aiCategorySeparation} />

        <InitiationStudioFlowsRevealSection content={C.studioFlowsReveal} />

        <InitiationFridayReportSection content={C.fridayReportSimulation} />
        <InitiationWhatYouGetSection content={C.whatYouGet} />
        <InitiationFoundingProgramSection content={C.foundingProgram} />
        <InitiationServiceLoopsSection content={C.serviceLoops} />
        {/* lightly-sprinkled anchor after the service-loops fit check (dark) */}
        <InlineCtaAnchor
          href={C.hero.primaryCtaTarget}
          label={C.hero.primaryCta}
          tone="dark"
        />

        {/* THE TURN — the noir is killed and the page is reborn in light. */}
        <SystemResetTransition />

        <InitiationOperationalDiagnosticSection content={C.operationalDiagnostic} />

        <InitiationEntryPathsSection content={C.entryPaths} />
        <InitiationFinalCtaSection content={C.finalCta} />
      </ProgressionProvider>
    </main>
  );
}
