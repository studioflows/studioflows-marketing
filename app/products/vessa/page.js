"use client";

import { VESSA_FRAMEWORK } from "@/lib/vessa-framework-content";
import {
  FrameworkCategorySection,
  FrameworkControlledAutonomySection,
  FrameworkDifferentiationSection,
  FrameworkExecutionGapSection,
  FrameworkExecutionLoopSection,
  FrameworkFinalCtaSection,
  FrameworkFounderMomentsSection,
  FrameworkFutureModelSection,
  FrameworkHeroSection,
  FrameworkOutputsSection,
  FrameworkStackSection,
  FrameworkTrustSection,
  FrameworkUseCasesSection,
  useVessaFrameworkState,
  VESSA_BG,
  VessaFrameworkBackground,
  VessaFrameworkNav,
} from "@/components/vessa/VessaFrameworkSections";

const F = VESSA_FRAMEWORK;

export default function VessaPage() {
  const { mouseGlow } = useVessaFrameworkState();

  return (
    <main className={VESSA_BG}>
      <VessaFrameworkBackground mouseGlow={mouseGlow} />

      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 py-6 sm:px-8 lg:px-10">
        <VessaFrameworkNav content={F.nav} />

        <FrameworkHeroSection content={F.hero} />
        <FrameworkFounderMomentsSection content={F.founderMoments} />
        <FrameworkExecutionGapSection content={F.executionGap} />
        <FrameworkCategorySection content={F.category} />
        <FrameworkDifferentiationSection content={F.differentiation} />
        <FrameworkExecutionLoopSection content={F.executionLoop} />
        <FrameworkOutputsSection content={F.outputs} />
        <FrameworkControlledAutonomySection content={F.controlledAutonomy} />
        <FrameworkStackSection content={F.stack} />
        <FrameworkUseCasesSection content={F.useCases} />
        <FrameworkFutureModelSection content={F.futureModel} />
        <FrameworkTrustSection content={F.trust} />
        <FrameworkFinalCtaSection content={F.finalCta} />
      </div>
    </main>
  );
}
