"use client";

import Link from "next/link";

import {
  REM_CATEGORY_ITEMS,
  REM_CLEAN_UP,
  REM_COPY,
  REM_FIT_LINES,
  REM_KEEP_TOOLS,
  REM_PROOF_ITEMS,
  REM_SCORE_CARDS,
  REM_SCORE_HREF,
} from "@/lib/real-estate-media/rem-landing-content";
import {
  RemPrimaryCta,
  RemSection,
  RemTerminalChrome,
} from "@/components/real-estate-media/rem-noir-primitives";
import {
  REM_BODY,
  REM_BODY_SM,
  REM_CTA_SECONDARY,
  REM_EYEBROW,
  REM_H2,
  REM_PANEL,
} from "@/components/real-estate-media/rem-noir-tokens";

function ToolStack({ label, items, variant = "keep" }) {
  return (
    <div
      className={`${REM_PANEL} border px-4 py-4 ${
        variant === "clean" ? "border-cyan-900/30 bg-cyan-950/10" : "border-zinc-800"
      }`}
    >
      <p className={REM_EYEBROW}>{label}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm text-zinc-400">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RemNoirCategoryStrip() {
  return (
    <section id="category-proof" className="border-t border-zinc-800/80 py-6 lg:py-8" aria-label="Work categories">
      <RemTerminalChrome title="post.booking.pipeline">
        <h2 className="text-sm font-medium text-zinc-200">{REM_COPY.category.headline}</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {REM_CATEGORY_ITEMS.map((item) => (
            <li
              key={item}
              className="rounded border border-zinc-800 bg-zinc-950 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500"
            >
              {item}
            </li>
          ))}
        </ul>
      </RemTerminalChrome>
    </section>
  );
}

export function RemNoirToolsSection() {
  return (
    <RemSection id="existing-tools">
      <div className="lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-12">
        <div>
          <h2 className={REM_H2}>{REM_COPY.tools.headline}</h2>
          <div className={`mt-5 space-y-4 lg:max-w-xl ${REM_BODY}`}>
            {REM_COPY.tools.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <ul className="space-y-2 text-zinc-500">
              {REM_COPY.tools.bullets.map((line) => (
                <li key={line}>· {line}</li>
              ))}
            </ul>
            <p>{REM_COPY.tools.close}</p>
          </div>
        </div>
        <div className="mt-8 grid gap-3 lg:mt-0">
          <ToolStack label="Keep in place" items={REM_KEEP_TOOLS} />
          <ToolStack label="StudioFlows layer" items={REM_CLEAN_UP} variant="clean" />
        </div>
      </div>
    </RemSection>
  );
}

export function RemNoirScoreSection() {
  return (
    <RemSection id="media-ops-score">
      <h2 className={REM_H2}>{REM_COPY.score.headline}</h2>
      <div className={`mt-4 max-w-2xl space-y-3 ${REM_BODY}`}>
        {REM_COPY.score.body.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {REM_SCORE_CARDS.map((card) => (
          <div key={card.title} className={`${REM_PANEL} border border-zinc-800 px-3 py-3.5`}>
            <p className="text-sm font-medium text-zinc-200">{card.title}</p>
            <p className={`mt-1 ${REM_BODY_SM}`}>{card.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 lg:max-w-sm">
        <RemPrimaryCta ctaId="score_section_start">{REM_COPY.score.cta}</RemPrimaryCta>
      </div>
    </RemSection>
  );
}

export function RemNoirVoiceSection() {
  return (
    <RemSection id="voice-answer-preview">
      <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12">
        <div>
          <h2 className={REM_H2}>{REM_COPY.voice.headline}</h2>
          <div className={`mt-4 space-y-3 lg:max-w-xl ${REM_BODY}`}>
            {REM_COPY.voice.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
        <div className={`${REM_PANEL} mt-6 border border-zinc-800 px-4 py-4 lg:mt-0`}>
          <p className="text-sm leading-relaxed text-zinc-400">&ldquo;{REM_COPY.voice.example}&rdquo;</p>
          <div className="mt-4 flex items-center gap-2 rounded border border-zinc-800 bg-black/50 px-3 py-2.5">
            <span className="inline-block h-2 w-2 rounded-full bg-red-500/80" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">
              Tap to record or type
            </span>
          </div>
        </div>
      </div>
    </RemSection>
  );
}

export function RemNoirResultSection() {
  return (
    <RemSection id="result-preview">
      <h2 className={REM_H2}>{REM_COPY.result.headline}</h2>
      <div className={`mt-4 max-w-2xl space-y-3 ${REM_BODY}`}>
        {REM_COPY.result.body.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </RemSection>
  );
}

export function RemNoirFitSection() {
  return (
    <RemSection id="fit">
      <h2 className={REM_H2}>{REM_COPY.fit.headline}</h2>
      <p className={`mt-4 max-w-2xl ${REM_BODY}`}>{REM_COPY.fit.lead}</p>
      <ul className={`mt-6 grid gap-2.5 sm:grid-cols-2 ${REM_BODY}`}>
        {REM_FIT_LINES.map((line) => (
          <li key={line} className={`${REM_PANEL} border border-zinc-800 px-3 py-3 text-zinc-400`}>
            {line}
          </li>
        ))}
      </ul>
      <p className={`mt-6 max-w-2xl ${REM_BODY}`}>{REM_COPY.fit.close}</p>
    </RemSection>
  );
}

export function RemNoirPricingSection() {
  return (
    <RemSection id="pricing-preview">
      <p className={REM_EYEBROW}>{REM_COPY.pricing.eyebrow}</p>
      <p className="mt-3 font-mono text-3xl font-medium tracking-tight text-zinc-100 lg:text-4xl">
        {REM_COPY.pricing.price}
      </p>
      <div className={`mt-4 max-w-2xl space-y-3 ${REM_BODY}`}>
        {REM_COPY.pricing.body.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </RemSection>
  );
}

export function RemNoirProofSection() {
  return (
    <RemSection id="proof-strip">
      <h2 className={REM_H2}>{REM_COPY.proof.headline}</h2>
      <p className={`mt-4 max-w-2xl ${REM_BODY}`}>{REM_COPY.proof.body}</p>
      <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
        {REM_PROOF_ITEMS.map((item) => (
          <div key={item} className={`${REM_PANEL} border border-red-900/30 px-3 py-3.5`}>
            <p className="text-sm text-zinc-400">{item}</p>
          </div>
        ))}
      </div>
    </RemSection>
  );
}

export function RemNoirFinalCtaSection() {
  return (
    <RemSection id="final-cta" className="pb-28 lg:pb-20">
      <div className="lg:mx-auto lg:max-w-2xl lg:text-center">
        <h2 className={REM_H2}>{REM_COPY.final.headline}</h2>
        <div className={`mt-4 space-y-3 ${REM_BODY}`}>
          {REM_COPY.final.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="mt-8 lg:flex lg:justify-center">
          <RemPrimaryCta ctaId="final_cta_start">{REM_COPY.final.cta}</RemPrimaryCta>
        </div>
        <p className="mt-6 hidden text-center text-xs text-zinc-600 lg:block">
          <Link href={REM_SCORE_HREF} className={REM_CTA_SECONDARY}>
            Or jump straight to score
          </Link>
        </p>
      </div>
    </RemSection>
  );
}
