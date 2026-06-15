"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { RevealSection } from "@/components/home/InitiationMotionPrimitives";
import { VessaProductScreen } from "@/components/vessa/VessaProductMocks";
import {
  VESSA_BG,
  VESSA_BODY,
  VESSA_BODY_SM,
  VESSA_CARD,
  VESSA_CARD_PAD,
  VESSA_CTA,
  VESSA_CTA_BLOCK,
  VESSA_CTA_SECONDARY,
  VESSA_EYEBROW,
  VESSA_EYEBROW_DOT,
  VESSA_FLOW_NODE,
  VESSA_FLOW_NODE_ACTIVE,
  VESSA_H1_HERO,
  VESSA_H2,
  VESSA_H3,
  VESSA_LANE_ACTION,
  VESSA_LANE_DELIVERABLE,
  VESSA_MUTED,
  VESSA_OPEN_SECTION,
  VESSA_PANEL,
  VESSA_PLACEHOLDER_BADGE,
  VESSA_SECTION,
  VESSA_SECTION_TIGHT,
  VESSA_STRIP_SECTION,
} from "@/components/vessa/vessa-tokens";
import { VESSA_PRODUCT_SCREENS } from "@/lib/vessa-homepage-content";

function PlaceholderFlag({ show }) {
  if (!show) return null;
  return <span className={VESSA_PLACEHOLDER_BADGE}>[Copy placeholder]</span>;
}

function SectionEyebrow({ children }) {
  return (
    <div className={VESSA_EYEBROW}>
      <span className={VESSA_EYEBROW_DOT} />
      {children}
    </div>
  );
}

function ScrollCue({ targetId, label = "Keep scrolling" }) {
  return (
    <div className="flex justify-center py-6 sm:py-8">
      <a
        href={targetId ? `#${targetId}` : undefined}
        className="group flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/30 transition hover:text-white/50"
      >
        <span>{label}</span>
        <span className="block h-8 w-px bg-gradient-to-b from-white/25 to-transparent transition group-hover:from-[#D4A853]/50" />
      </a>
    </div>
  );
}

function FlowChain({ label, steps, variant = "muted" }) {
  return (
    <div className="space-y-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">{label}</p>
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        {steps.map((step, i) => (
          <div key={step} className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className={variant === "active" && i > 0 && i < steps.length - 1 ? VESSA_FLOW_NODE_ACTIVE : VESSA_FLOW_NODE}>
              {step}
            </div>
            {i < steps.length - 1 ? (
              <span className="hidden px-1 text-white/25 sm:inline" aria-hidden="true">
                →
              </span>
            ) : null}
            {i < steps.length - 1 ? (
              <span className="pl-3 font-mono text-[10px] text-white/20 sm:hidden" aria-hidden="true">
                ↓
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function VessaFrameworkBackground({ mouseGlow }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background: `radial-gradient(circle at ${mouseGlow.x}% ${mouseGlow.y}%, rgba(219,39,119,0.05), transparent 18%), radial-gradient(circle at 50% 0%, rgba(212,168,83,0.06), transparent 28%)`,
        }}
      />
    </>
  );
}

export function VessaFrameworkNav({ content }) {
  return (
    <nav className="flex items-center justify-between gap-4 py-4 sm:py-5">
      <Link href="/vessa" className="shrink-0">
        <img
          src="/vessa white v2.svg"
          alt="Vessa"
          className="h-20 w-auto object-contain opacity-90 sm:h-24"
        />
      </Link>
      <Link href={content.ctaTarget} className={`${VESSA_CTA} hidden min-h-[44px] px-4 text-[10px] sm:inline-flex sm:px-5 sm:text-[11px]`}>
        {content.cta}
      </Link>
    </nav>
  );
}

/** 1 — Hero */
export function FrameworkHeroSection({ content }) {
  return (
    <section id="hero" className={`${VESSA_SECTION_TIGHT} pb-8 sm:pb-12`}>
      <RevealSection>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-10">
          <div className="max-w-xl">
            <PlaceholderFlag show={content.placeholder} />
            <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
            <h1 className={VESSA_H1_HERO}>
              {content.headline}
              <br />
              <span className={VESSA_MUTED}>{content.headlineMuted}</span>
            </h1>
            <p className={`mt-4 text-[0.95rem] leading-6 text-white/68 sm:mt-5 sm:text-base sm:leading-7`}>
              {content.category}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Link href={content.primaryCtaTarget} className={`${VESSA_CTA} min-h-[48px] w-full sm:w-auto`}>
                {content.primaryCta}
              </Link>
              <Link href={content.secondaryCtaTarget} className={VESSA_CTA_SECONDARY}>
                {content.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-dashed border-white/20 bg-black/50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
              {content.visualLabel}
            </div>
            <VessaProductScreen screen={VESSA_PRODUCT_SCREENS.workstream} active priority />
          </div>
        </div>
      </RevealSection>
      <ScrollCue targetId="founder-moments" label="Sound familiar?" />
    </section>
  );
}

/** 1b — Founder moments */
export function FrameworkFounderMomentsSection({ content }) {
  return (
    <section id={content.id} className="border-b border-white/[0.06] pb-10 pt-2 sm:pb-12">
      <RevealSection>
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#DB2777]/80">{content.label}</p>
        <div className="mt-5 space-y-3">
          {content.scenarios.map((scenario) => (
            <div key={scenario.title} className={`${VESSA_PANEL} py-4 sm:px-5`}>
              <h3 className="text-sm font-semibold text-white">{scenario.title}</h3>
              <p className={`mt-2 ${VESSA_BODY_SM}`}>{scenario.body}</p>
            </div>
          ))}
        </div>
      </RevealSection>
      <ScrollCue targetId="execution-gap" label="The gap" />
    </section>
  );
}

/** 2 — Execution gap */
export function FrameworkExecutionGapSection({ content }) {
  return (
    <section id={content.id} className={VESSA_STRIP_SECTION}>
      <RevealSection className="mx-auto max-w-[980px]">
        <PlaceholderFlag show={content.placeholder} />
        <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
        <h2 className={`${VESSA_H2} max-w-3xl`}>{content.headline}</h2>
        <p className={`mt-4 max-w-2xl ${VESSA_BODY}`}>{content.subhead}</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className={`${VESSA_CARD} ${VESSA_CARD_PAD}`}>
            <FlowChain label={content.before.label} steps={content.before.steps} variant="muted" />
          </div>
          <div className={`${VESSA_CARD} border-[#D4A853]/15 ${VESSA_CARD_PAD}`}>
            <FlowChain label={content.after.label} steps={content.after.steps} variant="active" />
          </div>
        </div>
        <p className="mt-8 border-l-2 border-[#DB2777]/40 pl-4 text-base text-white/72">{content.closing}</p>
      </RevealSection>
      <ScrollCue targetId="category" label="The category" />
    </section>
  );
}

/** 3 — Category definition */
export function FrameworkCategorySection({ content }) {
  return (
    <section id={content.id} className={VESSA_OPEN_SECTION}>
      <RevealSection>
        <PlaceholderFlag show={content.placeholder} />
        <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
        <h2 className={`${VESSA_H2} max-w-4xl`}>{content.headline}</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {content.blocks.map((block, i) => (
            <div
              key={block.title}
              className={
                i === 3
                  ? `${VESSA_LANE_ACTION} min-h-[140px]`
                  : `${VESSA_PANEL} min-h-[140px] py-4 sm:px-5`
              }
            >
              <h3 className="text-sm font-semibold text-white">{block.title}</h3>
              <p className={`mt-2 ${VESSA_BODY_SM}`}>{block.body}</p>
            </div>
          ))}
        </div>
      </RevealSection>
      <ScrollCue targetId="differentiation" label="The comparison" />
    </section>
  );
}

/** 4 — Differentiation (before execution loop in page order) */
export function FrameworkDifferentiationSection({ content }) {
  return (
    <section id={content.id} className={VESSA_OPEN_SECTION}>
      <RevealSection>
        <PlaceholderFlag show={content.placeholder} />
        <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
        <h2 className={VESSA_H2}>{content.headline}</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className={`${VESSA_PANEL} py-5 sm:px-5`}>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">{content.mostTools.label}</p>
            <ul className="mt-4 space-y-3">
              {content.mostTools.items.map((item) => (
                <li key={item} className={`flex gap-3 ${VESSA_BODY_SM}`}>
                  <span className="text-white/25">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${VESSA_LANE_ACTION} sm:p-6`}>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#DB2777]">{content.vessa.label}</p>
            <ul className="mt-4 space-y-3">
              {content.vessa.items.map((item) => (
                <li key={item} className={`flex gap-3 ${VESSA_BODY_SM}`}>
                  <span className="text-[#D4A853]">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </RevealSection>
      <ScrollCue targetId="execution-loop" label="One loop" />
    </section>
  );
}

/** 5 — Execution loop */
export function FrameworkExecutionLoopSection({ content }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id={content.id} className={VESSA_STRIP_SECTION}>
      <RevealSection>
        <PlaceholderFlag show={content.placeholder} />
        <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
        <h2 className={VESSA_H2}>{content.headline}</h2>
        <p className={`mt-3 inline-block rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-[11px] text-white/55`}>
          {content.scenario}
        </p>

        <div className="mt-8 lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
          <div className="mb-4 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {content.steps.map((step, i) => (
              <button
                key={step.num}
                type="button"
                onClick={() => setActiveStep(i)}
                className={`shrink-0 rounded-xl border px-3 py-2.5 text-left transition lg:w-full ${
                  activeStep === i
                    ? "border-[#D4A853]/35 bg-[#D4A853]/10 text-white"
                    : "border-white/10 bg-black/20 text-white/50 hover:border-white/20"
                }`}
              >
                <span className="font-mono text-[10px] text-white/35">{step.num}</span>
                <span className="mt-1 block text-sm font-medium">{step.title}</span>
              </button>
            ))}
          </div>

          <div className={`${VESSA_CARD} ${VESSA_CARD_PAD} min-h-[220px]`}>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#D4A853]/80">
              {content.steps[activeStep].num}
            </p>
            <h3 className={`mt-2 ${VESSA_H3}`}>{content.steps[activeStep].title}</h3>
            <p className={`mt-4 ${VESSA_BODY}`}>{content.steps[activeStep].body}</p>
            <div className="mt-8 flex h-32 items-center justify-center rounded-2xl border border-dashed border-white/15 bg-black/25 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              [Placeholder step visual]
            </div>
          </div>
        </div>
      </RevealSection>
      <ScrollCue targetId="outputs" label="Outputs" />
    </section>
  );
}

/** 5 — Outputs gallery */
export function FrameworkOutputsSection({ content }) {
  return (
    <section id={content.id} className={VESSA_OPEN_SECTION}>
      <RevealSection>
        <PlaceholderFlag show={content.placeholder} />
        <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
        <h2 className={VESSA_H2}>{content.headline}</h2>
        <p className={`mt-4 max-w-2xl text-base text-white/72`}>{content.lead}</p>

        <div className="mt-8 flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3 xl:grid-cols-4">
          {content.cards.map((card, i) => (
            <div
              key={card.title}
              className={`min-w-[72vw] snap-start sm:min-w-0 ${
                i % 3 === 0 ? VESSA_LANE_ACTION : i % 3 === 1 ? VESSA_LANE_DELIVERABLE : `${VESSA_PANEL} py-5`
              }`}
            >
              <div className="mb-6 flex h-24 items-center justify-center rounded-xl border border-dashed border-white/12 bg-black/30 font-mono text-[9px] uppercase tracking-[0.16em] text-white/28">
                {card.hint}
              </div>
              <h3 className="text-sm font-semibold text-white">{card.title}</h3>
            </div>
          ))}
        </div>
      </RevealSection>
      <ScrollCue targetId="controlled-autonomy" label="Control model" />
    </section>
  );
}

/** 6 — Controlled autonomy */
export function FrameworkControlledAutonomySection({ content }) {
  return (
    <section id={content.id} className={VESSA_SECTION}>
      <RevealSection>
        <PlaceholderFlag show={content.placeholder} />
        <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
        <h2 className={VESSA_H2}>{content.headline}</h2>
        <p className={`mt-4 max-w-2xl ${VESSA_BODY}`}>{content.lead}</p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {content.points.map((point) => (
            <li key={point} className={`${VESSA_PANEL} text-sm text-white/58`}>
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className={VESSA_LANE_ACTION}>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#DB2777]">{content.lane1.tag}</p>
            <h3 className={`mt-2 ${VESSA_H3}`}>{content.lane1.title}</h3>
            <p className={`mt-2 ${VESSA_BODY_SM}`}>{content.lane1.body}</p>
            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <VessaProductScreen screen={VESSA_PRODUCT_SCREENS.decide} active className="shadow-none" />
            </div>
          </div>
          <div className={VESSA_LANE_DELIVERABLE}>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#3B82F6]">{content.lane2.tag}</p>
            <h3 className={`mt-2 ${VESSA_H3}`}>{content.lane2.title}</h3>
            <p className={`mt-2 ${VESSA_BODY_SM}`}>{content.lane2.body}</p>
            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <VessaProductScreen screen={VESSA_PRODUCT_SCREENS.decide} active className="shadow-none" />
            </div>
          </div>
        </div>
      </RevealSection>
      <ScrollCue targetId="stack" label="Across your stack" />
    </section>
  );
}

/** 7 — Stack layer */
export function FrameworkStackSection({ content }) {
  return (
    <section id={content.id} className={VESSA_STRIP_SECTION}>
      <RevealSection>
        <PlaceholderFlag show={content.placeholder} />
        <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
        <h2 className={VESSA_H2}>{content.headline}</h2>
        <p className={`mt-4 max-w-2xl ${VESSA_BODY}`}>{content.lead}</p>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-start">
          <div className={`${VESSA_CARD} ${VESSA_CARD_PAD}`}>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">Inputs</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {content.inputs.map((item) => (
                <li key={item} className="rounded-lg border border-white/10 bg-black/30 px-2.5 py-1 text-xs text-white/55">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 px-2 py-4 lg:py-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#D4A853]">Vessa layer</span>
            <div className="hidden h-12 w-px bg-gradient-to-b from-transparent via-[#D4A853]/40 to-transparent lg:block" />
            <ul className="flex flex-wrap justify-center gap-2 lg:flex-col lg:items-center">
              {content.vessaSteps.map((step) => (
                <li key={step} className={VESSA_FLOW_NODE_ACTIVE}>
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <div className={`${VESSA_CARD} ${VESSA_CARD_PAD}`}>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">Outputs</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {content.outputs.map((item) => (
                <li key={item} className="rounded-lg border border-[#D4A853]/20 bg-[#D4A853]/[0.06] px-2.5 py-1 text-xs text-[#D4A853]/90">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </RevealSection>
      <ScrollCue targetId="use-cases" label="Use cases" />
    </section>
  );
}

/** 9 — Use cases */
export function FrameworkUseCasesSection({ content }) {
  return (
    <section id={content.id} className={VESSA_SECTION}>
      <RevealSection>
        <PlaceholderFlag show={content.placeholder} />
        <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
        <h2 className={VESSA_H2}>{content.headline}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {content.cards.map((card) => (
            <div key={card.title} className={`${VESSA_CARD} ${VESSA_CARD_PAD}`}>
              <h3 className="text-base font-semibold text-white">{card.title}</h3>
              <dl className="mt-4 space-y-2 text-sm">
                {[
                  ["Signal", card.signal],
                  ["Prepares", card.prepares],
                  ["Decision", card.decision],
                  ["Outcome", card.outcome],
                ].map(([term, value]) => (
                  <div key={term} className="grid grid-cols-[88px_1fr] gap-2">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">{term}</dt>
                    <dd className="text-white/55">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </RevealSection>
      <ScrollCue targetId="future-model" label="Operating model" />
    </section>
  );
}

/** 10 — Future model */
export function FrameworkFutureModelSection({ content }) {
  return (
    <section id={content.id} className={VESSA_STRIP_SECTION}>
      <RevealSection>
        <PlaceholderFlag show={content.placeholder} />
        <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
        <h2 className={VESSA_H2}>{content.headline}</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className={`${VESSA_PANEL} py-5 sm:px-5`}>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">{content.old.label}</p>
            <ul className="mt-4 space-y-2">
              {content.old.lines.map((line) => (
                <li key={line} className={`${VESSA_BODY_SM} line-through decoration-white/15`}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#D4A853]/20 bg-[#D4A853]/[0.04] p-5 sm:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D4A853]/80">{content.next.label}</p>
            <ul className="mt-4 space-y-2">
              {content.next.lines.map((line) => (
                <li key={line} className="text-sm leading-6 text-white/72">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </RevealSection>
      <ScrollCue targetId="trust" label="Proof" />
    </section>
  );
}

/** 11 — Trust / proof */
export function FrameworkTrustSection({ content }) {
  const screenFor = (key) => (key ? VESSA_PRODUCT_SCREENS[key] : null);

  return (
    <section id={content.id} className={VESSA_OPEN_SECTION}>
      <RevealSection>
        <PlaceholderFlag show={content.placeholder} />
        <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
        <h2 className={VESSA_H2}>{content.headline}</h2>
        <p className={`mt-4 max-w-2xl ${VESSA_BODY}`}>{content.lead}</p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {content.slots.map((slot) => {
            const screen = screenFor(slot.screen);
            return (
              <div
                key={slot.title}
                className={`min-h-[160px] ${VESSA_PANEL} flex flex-col justify-between py-4 sm:px-5`}
              >
                <div>
                  <h3 className="text-sm font-semibold text-white">{slot.title}</h3>
                  <p className={`mt-2 ${VESSA_BODY_SM}`}>{slot.note}</p>
                </div>
                {screen ? (
                  <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                    <div className="relative aspect-[16/9] bg-black/40">
                      <Image
                        src={screen.src}
                        alt={screen.alt}
                        fill
                        className="object-cover object-left-top"
                        sizes="400px"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </RevealSection>
      <ScrollCue targetId="final-cta" label="Next step" />
    </section>
  );
}

/** 12 — Final CTA */
export function FrameworkFinalCtaSection({ content }) {
  return (
    <section id={content.id} className={`${VESSA_SECTION} pb-16 sm:pb-20`}>
      <RevealSection>
        <div className={`mx-auto max-w-2xl text-center ${VESSA_CARD} ${VESSA_CARD_PAD} sm:p-10`}>
          <PlaceholderFlag show={content.placeholder} />
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">{content.headline}</h2>
          <p className={`mx-auto mt-4 max-w-lg ${VESSA_BODY}`}>{content.body}</p>
          <div className="mt-8 flex flex-col gap-3">
            <Link href={content.primaryCtaTarget} className={VESSA_CTA_BLOCK}>
              {content.primaryCta}
            </Link>
            <Link href={content.secondaryCtaTarget} className={VESSA_CTA_SECONDARY}>
              {content.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <Link href="/privacy-policy" className="text-[11px] uppercase tracking-[0.24em] text-white/45 hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-[11px] uppercase tracking-[0.24em] text-white/45 hover:text-white">
            Terms of Service
          </Link>
        </div>
      </RevealSection>
    </section>
  );
}

export function useVessaFrameworkState() {
  const [mouseGlow, setMouseGlow] = useState({ x: 50, y: 18 });

  useEffect(() => {
    const onMove = (e) => {
      setMouseGlow({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return { mouseGlow };
}

export { VESSA_BG };
