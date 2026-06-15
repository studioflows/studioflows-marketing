"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { RevealSection } from "@/components/home/InitiationMotionPrimitives";
import {
  VESSA_BODY,
  VESSA_BODY_SM,
  VESSA_CARD,
  VESSA_CARD_PAD,
  VESSA_CTA,
  VESSA_CTA_BLOCK,
  VESSA_EYEBROW,
  VESSA_EYEBROW_DOT,
  VESSA_H1,
  VESSA_H2,
  VESSA_H3,
  VESSA_LANE_ACTION,
  VESSA_LANE_DELIVERABLE,
  VESSA_MUTED,
  VESSA_PANEL,
  VESSA_TAG_GOLD,
  VESSA_TAG_MUTED,
} from "@/components/vessa/vessa-tokens";
import {
  VessaChatMock,
  VessaCircuitMap,
  VessaDecideMock,
  VessaMosaIQScreen,
  VessaOnboardingScreen,
  VessaWorkstreamMock,
} from "@/components/vessa/VessaProductMocks";
import {
  VESSA_DECISIONS,
  VESSA_SCENARIOS,
  VESSA_STACK_NODES,
} from "@/lib/vessa-homepage-content";

function SectionEyebrow({ children }) {
  return (
    <div className={VESSA_EYEBROW}>
      <span className={VESSA_EYEBROW_DOT} />
      {children}
    </div>
  );
}

function GridCard({ className = "", children, id }) {
  return (
    <div id={id} className={`${VESSA_CARD} ${className}`}>
      {children}
    </div>
  );
}

export function VessaBackground({ mouseGlow }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(180deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_2px,transparent_4px)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background: `radial-gradient(circle at ${mouseGlow.x}% ${mouseGlow.y}%, rgba(219,39,119,0.06), transparent 18%), radial-gradient(circle at 50% 12%, rgba(255,255,255,0.08), transparent 18%), radial-gradient(circle at 50% 40%, rgba(212,168,83,0.08), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.02), transparent 30%)`,
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#DB2777]/[0.07] blur-[140px]" />
    </>
  );
}

export function VessaNav({ decideMode, onModeChange }) {
  return (
    <nav className="flex items-center justify-between py-4 sm:py-5">
      <div className="flex items-center">
        <img
          src="/vessa white v2.svg"
          alt="Vessa"
          className="h-12 w-auto object-contain opacity-90 drop-shadow-[0_0_14px_rgba(219,39,119,0.18)] sm:h-14"
        />
      </div>

      <div className="hidden items-center gap-3 md:flex">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-1.5 py-1.5">
          {[
            ["StudioFlows", "/"],
            ["Products", "/products"],
            ["Vessa", "/vessa"],
            ["Platform", "/platform"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-white/75 transition hover:bg-white/[0.07] hover:text-white"
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 px-1.5">
          <button
            type="button"
            onClick={() => onModeChange(false)}
            className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.24em] transition ${
              !decideMode ? "bg-[#D4A853] text-[#030304]" : "bg-black/20 text-white/60"
            }`}
          >
            Chat
          </button>
          <button
            type="button"
            onClick={() => onModeChange(true)}
            className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.24em] transition ${
              decideMode ? "bg-[#DB2777] text-white" : "bg-black/20 text-white/60"
            }`}
          >
            Decide
          </button>
        </div>
      </div>
    </nav>
  );
}

export function VessaHeroSection({ content, decideMode, onModeChange }) {
  return (
    <section className="pb-16 pt-12 lg:pt-16">
      <RevealSection>
        <div className="mx-auto max-w-[980px] text-center">
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h1 className={VESSA_H1}>
            {content.headline}
            <br />
            <span className={VESSA_MUTED}>{content.headlineMuted}</span>
          </h1>
          <p className={`mx-auto mt-5 max-w-[760px] text-balance ${VESSA_BODY}`}>{content.body}</p>
          <p className="mt-4 font-mono text-sm tracking-[0.06em] text-[#DB2777]">{content.tagline}</p>

          <div className="mx-auto mt-10 max-w-md text-center">
            <Link href={content.ctaTarget} className={VESSA_CTA}>
              {content.cta}
            </Link>
            <p className="mt-3 font-mono text-xs text-white/35">Open signup · connect your stack</p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {content.pills.map((pill, i) => (
              <span key={pill} className={i === 2 ? VESSA_TAG_GOLD : VESSA_TAG_MUTED}>
                {pill}
              </span>
            ))}
          </div>
        </div>
      </RevealSection>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <RevealSection className="relative min-h-[280px] sm:min-h-[360px]">
          <div className="relative min-h-[280px] sm:min-h-[360px]">
            <VessaChatMock active={!decideMode} />
            <VessaDecideMock active={decideMode} />
          </div>
          <div className="mt-4 flex justify-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => onModeChange(false)}
              className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.2em] ${
                !decideMode ? "bg-[#D4A853] text-[#030304]" : "border border-white/10 text-white/50"
              }`}
            >
              Chat
            </button>
            <button
              type="button"
              onClick={() => onModeChange(true)}
              className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.2em] ${
                decideMode ? "bg-[#DB2777] text-white" : "border border-white/10 text-white/50"
              }`}
            >
              Decide
            </button>
          </div>
        </RevealSection>

        <div className="space-y-6">
          <RevealSection>
            <GridCard className={VESSA_CARD_PAD}>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/38">Product surfaces</p>
              <p className="mt-4 text-[2rem] font-semibold leading-tight tracking-tight text-white sm:text-[2.2rem]">
                Chat for speed.
                <br />
                Decide for consequence.
              </p>
              <p className={`mt-4 ${VESSA_BODY_SM}`}>
                Lightweight action approvals happen in chat. High-impact checkpoints land on Decide with lane, risk,
                confidence, and full execution trace.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {["MosaIQ surface", "Workstream kanban", "Decide checkpoints", "My Conversations"].map((item) => (
                  <div key={item} className={VESSA_PANEL}>
                    <span className="text-sm text-white/58">{item}</span>
                  </div>
                ))}
              </div>
            </GridCard>
          </RevealSection>

          <RevealSection>
            <GridCard className={VESSA_CARD_PAD}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/38">Mode switch</p>
                  <p className="mt-2 text-xl font-semibold tracking-tight text-white">See the product surface</p>
                </div>
                <button
                  type="button"
                  onClick={() => onModeChange((v) => !v)}
                  className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.24em] transition ${
                    decideMode
                      ? "border-[#DB2777]/35 bg-[#DB2777] text-white"
                      : "border-[#D4A853]/35 bg-[#D4A853] text-[#030304]"
                  }`}
                >
                  {decideMode ? "Decide active" : "Chat active"}
                </button>
              </div>
              <div className={`mt-5 ${VESSA_PANEL}`}>
                <p className="text-sm text-white/52">
                  Vessa does the work first. You review the consequence — in chat or on Decide.
                </p>
              </div>
            </GridCard>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

export function VessaNotChatbotSection({ content }) {
  return (
    <section className="py-14">
      <RevealSection>
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
            <h2 className={VESSA_H2}>{content.headline}</h2>
            <p className={`mt-6 ${VESSA_BODY}`}>{content.body}</p>
          </div>
          <GridCard className={VESSA_CARD_PAD}>
            <ul className="space-y-4">
              {content.contrasts.map((line) => (
                <li key={line} className={`flex gap-3 ${VESSA_BODY_SM}`}>
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A853]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </GridCard>
        </div>
      </RevealSection>
    </section>
  );
}

export function VessaOperatingLayerSection({ content }) {
  return (
    <section className="py-14">
      <RevealSection>
        <GridCard className={`${VESSA_CARD_PAD} sm:p-8`}>
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2 className={VESSA_H2}>{content.headline}</h2>
          <p className={`mt-6 max-w-3xl ${VESSA_BODY}`}>{content.body}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {content.bullets.map((bullet) => (
              <li key={bullet} className={`${VESSA_PANEL} text-sm text-white/58`}>
                {bullet}
              </li>
            ))}
          </ul>
        </GridCard>
      </RevealSection>
    </section>
  );
}

export function VessaTwoLanesSection({ content }) {
  return (
    <section className="py-14">
      <RevealSection>
        <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
        <h2 className={VESSA_H2}>{content.headline}</h2>
        <p className={`mt-4 max-w-3xl ${VESSA_BODY}`}>{content.intro}</p>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className={VESSA_LANE_ACTION}>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#DB2777]">{content.lane1.tag}</p>
            <h3 className={`mt-3 ${VESSA_H3}`}>{content.lane1.headline}</h3>
            <p className={`mt-3 ${VESSA_BODY_SM}`}>{content.lane1.body}</p>
            <ul className="mt-4 space-y-2">
              {content.lane1.examples.map((ex) => (
                <li key={ex} className={`flex gap-2 ${VESSA_BODY_SM}`}>
                  <span className="text-[#DB2777]">·</span>
                  {ex}
                </li>
              ))}
            </ul>
          </div>
          <div className={VESSA_LANE_DELIVERABLE}>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#3B82F6]">{content.lane2.tag}</p>
            <h3 className={`mt-3 ${VESSA_H3}`}>{content.lane2.headline}</h3>
            <p className={`mt-3 ${VESSA_BODY_SM}`}>{content.lane2.body}</p>
            <ul className="mt-4 space-y-2">
              {content.lane2.examples.map((ex) => (
                <li key={ex} className={`flex gap-2 ${VESSA_BODY_SM}`}>
                  <span className="text-[#3B82F6]">·</span>
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}

export function VessaHowItWorksSection({ content }) {
  return (
    <section className="py-14">
      <RevealSection>
        <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
        <h2 className={VESSA_H2}>{content.headline}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.steps.map((step, i) => (
            <GridCard key={step.title} className={VESSA_CARD_PAD}>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#D4A853]/80">
                0{i + 1}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
              <p className={`mt-2 ${VESSA_BODY_SM}`}>{step.body}</p>
            </GridCard>
          ))}
        </div>
        <p className="mt-8 font-mono text-sm tracking-[0.06em] text-[#DB2777]">{content.closing}</p>
      </RevealSection>
    </section>
  );
}

export function VessaCircuitSection({ content, intensity, onIntensityChange }) {
  return (
    <section className="py-14">
      <RevealSection>
        <GridCard className={`overflow-hidden ${VESSA_CARD_PAD} sm:p-8`}>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
              <h2 className={VESSA_H2}>
                {content.headline}
                <br />
                <span className={VESSA_MUTED}>{content.headlineMuted}</span>
              </h2>
              <p className={`mt-6 max-w-[520px] ${VESSA_BODY}`}>{content.body}</p>
              <div className="mt-8">
                <div className="mb-3 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
                  <span>{content.sliderLabel}</span>
                  <span className="text-[#D4A853]">{intensity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={intensity}
                  onChange={(e) => onIntensityChange(Number(e.target.value))}
                  className="h-[3px] w-full accent-[#D4A853]"
                />
                <p className={`mt-3 ${VESSA_BODY_SM}`}>{content.sliderHint}</p>
              </div>
            </div>
            <VessaCircuitMap nodes={[...VESSA_STACK_NODES]} intensity={intensity} />
          </div>
        </GridCard>
      </RevealSection>
    </section>
  );
}

export function VessaMosaIQSection({ content }) {
  return (
    <section className="py-14">
      <RevealSection>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
            <h2 className={VESSA_H2}>{content.headline}</h2>
            <p className={`mt-4 max-w-3xl ${VESSA_BODY}`}>{content.intro}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {content.modules.map((mod) => (
                <GridCard key={mod.title} className={VESSA_CARD_PAD}>
                  <h3 className="text-lg font-semibold text-white">{mod.title}</h3>
                  <p className={`mt-2 ${VESSA_BODY_SM}`}>{mod.body}</p>
                </GridCard>
              ))}
            </div>
          </div>
          <VessaMosaIQScreen />
        </div>
      </RevealSection>
    </section>
  );
}

export function VessaDecideSection({ content }) {
  return (
    <section className="py-14">
      <RevealSection>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
            <h2 className={VESSA_H2}>{content.headline}</h2>
            <p className={`mt-6 ${VESSA_BODY}`}>{content.body}</p>
            <ul className="mt-6 space-y-3">
              {content.bullets.map((b) => (
                <li key={b} className={`flex gap-3 ${VESSA_BODY_SM}`}>
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#DB2777]" />
                  {b}
                </li>
              ))}
            </ul>
            <p className={`mt-6 ${VESSA_BODY}`}>{content.closing}</p>
          </div>
          <VessaDecideMock active />
        </div>
      </RevealSection>
    </section>
  );
}

export function VessaActionsSection({ content }) {
  return (
    <section className="py-14">
      <RevealSection>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
            <h2 className={VESSA_H2}>{content.headline}</h2>
            <p className={`mt-6 ${VESSA_BODY}`}>{content.body}</p>
          </div>
          <GridCard className={VESSA_CARD_PAD}>
            <ul className="space-y-3">
              {content.items.map((item) => (
                <li key={item} className={`flex gap-3 ${VESSA_PANEL} text-sm text-white/56`}>
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A853]" />
                  {item}
                </li>
              ))}
            </ul>
          </GridCard>
        </div>
      </RevealSection>
    </section>
  );
}

export function VessaAutonomySection({ content }) {
  return (
    <section className="py-14">
      <RevealSection>
        <GridCard className={`${VESSA_CARD_PAD} sm:p-8`}>
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2 className={VESSA_H2}>{content.headline}</h2>
          <div className="mt-6 max-w-3xl space-y-4">
            {content.body.map((p) => (
              <p key={p} className={VESSA_BODY}>
                {p}
              </p>
            ))}
          </div>
          <p className="mt-6 font-mono text-sm tracking-[0.06em] text-[#DB2777]">{content.closing}</p>
        </GridCard>
      </RevealSection>
    </section>
  );
}

export function VessaSimulationSection({ content }) {
  const reducedMotion = useReducedMotion();
  const [activeScenarioId, setActiveScenarioId] = useState(VESSA_SCENARIOS[0].id);
  const [decisionByScenario, setDecisionByScenario] = useState(() =>
    VESSA_SCENARIOS.reduce((acc, s) => ({ ...acc, [s.id]: "approve" }), {}),
  );

  const activeScenario = useMemo(
    () => VESSA_SCENARIOS.find((s) => s.id === activeScenarioId) ?? VESSA_SCENARIOS[0],
    [activeScenarioId],
  );
  const activeDecision = decisionByScenario[activeScenario.id] ?? "approve";

  return (
    <section className="py-14">
      <RevealSection>
        <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
        <h2 className={VESSA_H2}>{content.headline}</h2>
        <p className={`mt-4 max-w-3xl ${VESSA_BODY}`}>{content.body}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {VESSA_SCENARIOS.map((scenario) => {
            const isActive = scenario.id === activeScenario.id;
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => setActiveScenarioId(scenario.id)}
                className={`rounded-2xl border p-4 text-left text-sm transition ${
                  isActive
                    ? "border-[#D4A853]/40 bg-[#D4A853]/[0.08] text-white"
                    : "border-white/10 bg-black/20 text-white/55 hover:border-white/20"
                }`}
              >
                {scenario.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeScenario.id}-${activeDecision}`}
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className={`mt-6 ${VESSA_CARD} ${VESSA_CARD_PAD} sm:p-8`}
          >
            <h3 className="text-lg font-semibold text-white">{content.labels.sees}</h3>
            <p className={`mt-2 ${VESSA_BODY_SM}`}>{activeScenario.signal}</p>
            <p
              className={`mt-3 font-mono text-[10px] uppercase tracking-[0.22em] ${
                activeScenario.lane === "action" ? "text-[#DB2777]" : "text-[#3B82F6]"
              }`}
            >
              {activeScenario.laneLabel}
            </p>

            <h3 className="mt-6 text-lg font-semibold text-white">{content.labels.doing}</h3>
            <p className={`mt-2 ${VESSA_BODY_SM}`}>{activeScenario.vessaMove}</p>

            <h3 className="mt-6 text-lg font-semibold text-white">{content.labels.call}</h3>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              {VESSA_DECISIONS.map((decision) => {
                const isSelected = decision.id === activeDecision;
                return (
                  <button
                    key={decision.id}
                    type="button"
                    onClick={() =>
                      setDecisionByScenario((prev) => ({ ...prev, [activeScenario.id]: decision.id }))
                    }
                    className={`rounded-xl border px-4 py-2 text-sm transition ${
                      isSelected
                        ? "border-[#D4A853]/40 bg-[#D4A853]/10 text-white"
                        : "border-white/10 text-white/55 hover:border-white/20"
                    }`}
                  >
                    {decision.label}
                  </button>
                );
              })}
            </div>

            <h3 className="mt-6 text-lg font-semibold text-white">{content.labels.next}</h3>
            <ul className="mt-3 space-y-2">
              {activeScenario.outcomes[activeDecision].map((line) => (
                <li key={line} className={`flex gap-2 ${VESSA_BODY_SM}`}>
                  <span className="text-[#D4A853]">·</span>
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              {content.disclaimer}
            </p>
          </motion.div>
        </AnimatePresence>
      </RevealSection>
    </section>
  );
}

export function VessaAxiomSection({ content }) {
  return (
    <section className="py-14">
      <RevealSection>
        <GridCard className={`${VESSA_CARD_PAD} sm:p-8`}>
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2 className={VESSA_H2}>{content.headline}</h2>
          <p className={`mt-6 max-w-3xl ${VESSA_BODY}`}>{content.body}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {content.pillars.map((line) => (
              <div key={line} className={VESSA_PANEL}>
                <span className="text-sm text-white/56">{line}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[20px] border border-[#D4A853]/25 bg-[#D4A853]/[0.06] px-5 py-4">
            <p className="font-mono text-sm tracking-[0.06em] text-[#D4A853]">{content.closing}</p>
          </div>
        </GridCard>
      </RevealSection>
    </section>
  );
}

export function VessaOutcomesSection({ content }) {
  return (
    <section className="py-14">
      <RevealSection>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
            <h2 className={VESSA_H2}>{content.headline}</h2>
            <ul className="mt-6 space-y-2">
              {content.items.map((item) => (
                <li key={item} className={`flex gap-3 ${VESSA_BODY_SM}`}>
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A853]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <GridCard className={VESSA_CARD_PAD}>
            <h3 className={VESSA_H3}>{content.simpleVersion.headline}</h3>
            <ol className="mt-5 space-y-3">
              {content.simpleVersion.steps.map((step, i) => (
                <li key={step} className={`flex gap-3 ${VESSA_BODY_SM}`}>
                  <span className="font-mono text-[#D4A853]">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
            <p className={`mt-6 border-l border-[#DB2777]/20 pl-4 ${VESSA_BODY}`}>{content.closing}</p>
          </GridCard>
        </div>
      </RevealSection>
    </section>
  );
}

export function VessaFinalCtaSection({ content }) {
  return (
    <section className="py-14">
      <RevealSection>
        <GridCard id="start" className={`overflow-hidden ${VESSA_CARD_PAD} sm:p-8`}>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
              <h2 className={VESSA_H2}>{content.headline}</h2>
              <p className={`mt-5 max-w-xl ${VESSA_BODY}`}>{content.body}</p>
            </div>
            <div className="space-y-4">
              <VessaOnboardingScreen />
              <VessaWorkstreamMock />
              <Link href={content.ctaTarget} className={VESSA_CTA_BLOCK}>
                {content.cta}
              </Link>
            </div>
          </div>
        </GridCard>
      </RevealSection>

      <section className="py-12 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/30">End state</p>
        <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
          The business runs through Vessa.
        </h2>
        <p className="mx-auto mt-5 max-w-[720px] border-l border-[#D4A853]/25 pl-4 text-balance text-base leading-7 text-white/60 sm:text-lg">
          You stop being the routing layer. What should happen, does — with traceability.
        </p>
        <div className="mt-8 flex items-center justify-center gap-6">
          <Link
            href="/privacy-policy"
            className="text-[11px] uppercase tracking-[0.24em] text-white/45 transition hover:text-white"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="text-[11px] uppercase tracking-[0.24em] text-white/45 transition hover:text-white"
          >
            Terms of Service
          </Link>
        </div>
      </section>
    </section>
  );
}

export function useVessaPageState() {
  const [decideMode, setDecideMode] = useState(false);
  const [intensity, setIntensity] = useState(64);
  const [mouseGlow, setMouseGlow] = useState({ x: 50, y: 22 });

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

  return { decideMode, setDecideMode, intensity, setIntensity, mouseGlow };
}
