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
  InitiationOperationalDiagnosticSection,
  InitiationServiceLoopsSection,
  InitiationStudioFlowsRevealSection,
  InitiationWhatYouGetSection,
  InlineCtaAnchor,
  MobileStickyPrimaryCta,
  ProgressionProvider,
  SystemResetTransition,
} from "@/components/home/InitiationHomeSections";

const C = INITIATION_HOMEPAGE_CONTENT;

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#030304] pb-[calc(5rem+env(safe-area-inset-bottom))] text-[#E8E6E3] lg:pb-0">
      <ProgressionProvider>
        <InitiationHeroSection content={C.hero} />
        <MobileStickyPrimaryCta href={C.hero.primaryCtaTarget} label={C.hero.primaryCta} />
        <InitiationFounderPainSection content={C.founderPain} />
        <InitiationDependencySelectorSection content={C.dependencySelector} />
        <InitiationFounderStorySection content={C.founderStory} />
        <InitiationContinuityReframeSection
          content={C.continuityReframe}
          inlineCta={{ href: C.warmAuditCtaTarget, label: C.warmAuditCta }}
        />
        <InitiationAICategorySection content={C.aiCategorySeparation} />

        <InitiationStudioFlowsRevealSection content={C.studioFlowsReveal} />

        <InitiationFridayReportSection content={C.fridayReportSimulation} />
        <InitiationWhatYouGetSection content={C.whatYouGet} />
        <InitiationServiceLoopsSection content={C.serviceLoops} />
        {/* lightly-sprinkled anchor after the service-loops fit check (dark) */}
        <InlineCtaAnchor
          href={C.warmAuditCtaTarget}
          label={C.warmAuditCta}
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
