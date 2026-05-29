"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  FINAL_ARCHITECTURE,
  FINAL_AI_TOOLS_FAIL,
  FINAL_COMPOUNDING,
  FINAL_CONFIDENCE,
  FINAL_CTA,
  FINAL_EXAMPLE,
  FINAL_FOOTER,
  FINAL_FOUNDER_PAIN,
  FINAL_HERO,
  FINAL_HOMEPAGE_CTA,
  FINAL_NAV_LINKS,
  FINAL_PILLARS,
  FINAL_REFRAME,
  FINAL_TWIST,
  FINAL_WHAT_IS,
} from "@/lib/final-homepage-content";
import {
  FINAL_BODY,
  FINAL_BODY_SM,
  FINAL_CARD,
  FINAL_CTA_PRIMARY,
  FINAL_CTA_SECONDARY,
  FINAL_EYEBROW,
  FINAL_H1,
  FINAL_H2,
  FINAL_SECTION,
} from "@/components/home/final-home-tokens";

export function FinalHomeNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition ${
        scrolled ? "border-white/10 bg-[#0C1110]/95 backdrop-blur" : "border-transparent bg-transparent"
      }`}
    >
      <NavBarInner />
    </header>
  );
}

function NavBarInner() {
  return (
    <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9FE7C3]">StudioFlows</p>
      <nav className="hidden items-center gap-5 text-sm text-[#B3BDC9] sm:flex" aria-label="Primary">
        {FINAL_NAV_LINKS.map((link) =>
          link.href.startsWith("/") ? (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ) : (
            <a key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </a>
          )
        )}
      </nav>
    </div>
  );
}

export function FinalHomeHero() {
  return (
    <section className={`${FINAL_SECTION} border-t-0 pt-4`}>
      <p className={FINAL_EYEBROW}>{FINAL_HERO.eyebrow}</p>
      <h1 className={`mt-4 max-w-3xl ${FINAL_H1}`}>{FINAL_HERO.headline}</h1>
      <p className={`mt-5 max-w-2xl text-base sm:text-lg ${FINAL_BODY}`}>{FINAL_HERO.subcopy}</p>
      <p className={`mt-4 max-w-2xl ${FINAL_BODY_SM} text-[#9FE7C3]/90`}>{FINAL_HERO.closing}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href={FINAL_HOMEPAGE_CTA.primaryHref} className={FINAL_CTA_PRIMARY}>
          {FINAL_HOMEPAGE_CTA.primaryLabel}
        </a>
        <Link href={FINAL_HOMEPAGE_CTA.secondaryHref} className={FINAL_CTA_SECONDARY}>
          {FINAL_HOMEPAGE_CTA.secondaryLabel}
        </Link>
      </div>
    </section>
  );
}

export function FinalHomeFounderPainSection() {
  return (
    <section id={FINAL_FOUNDER_PAIN.id} className={FINAL_SECTION}>
      <p className={FINAL_EYEBROW}>{FINAL_FOUNDER_PAIN.eyebrow}</p>
      <h2 className={`mt-3 ${FINAL_H2}`}>{FINAL_FOUNDER_PAIN.heading}</h2>
      <div className="mt-5 max-w-3xl space-y-4">
        {FINAL_FOUNDER_PAIN.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className={FINAL_BODY}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

export function FinalHomeReframeSection() {
  return (
    <section className={FINAL_SECTION}>
      <p className={FINAL_EYEBROW}>{FINAL_REFRAME.eyebrow}</p>
      <h2 className={`mt-3 ${FINAL_H2}`}>{FINAL_REFRAME.heading}</h2>
      <p className={`mt-4 max-w-3xl ${FINAL_BODY}`}>{FINAL_REFRAME.subcopy}</p>
      <ul className="mt-6 max-w-3xl space-y-3">
        {FINAL_REFRAME.bullets.map((bullet) => (
          <li key={bullet} className={`${FINAL_CARD} ${FINAL_BODY_SM}`}>
            {bullet}
          </li>
        ))}
      </ul>
      <p className="mt-6 font-medium text-white">{FINAL_REFRAME.closing}</p>
    </section>
  );
}

export function FinalHomeAiToolsFailSection() {
  return (
    <section className={FINAL_SECTION}>
      <p className={FINAL_EYEBROW}>{FINAL_AI_TOOLS_FAIL.eyebrow}</p>
      <h2 className={`mt-3 ${FINAL_H2}`}>{FINAL_AI_TOOLS_FAIL.heading}</h2>
      <p className={`mt-4 max-w-3xl ${FINAL_BODY}`}>{FINAL_AI_TOOLS_FAIL.subcopy}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {FINAL_AI_TOOLS_FAIL.contrast.map((item) => (
          <div key={item.label} className={FINAL_CARD}>
            <p className="text-xs uppercase tracking-[0.18em] text-[#9FE7C3]">{item.label}</p>
            <p className={`mt-3 ${FINAL_BODY_SM}`}>{item.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 max-w-3xl font-medium text-white">{FINAL_AI_TOOLS_FAIL.closing}</p>
    </section>
  );
}

export function FinalHomeTwistSection() {
  return (
    <section className={FINAL_SECTION}>
      <p className={FINAL_EYEBROW}>{FINAL_TWIST.eyebrow}</p>
      <h2 className={`mt-3 ${FINAL_H2}`}>{FINAL_TWIST.heading}</h2>
      <p className={`mt-4 max-w-3xl ${FINAL_BODY}`}>{FINAL_TWIST.subcopy}</p>
      <p className="mt-5 font-medium text-[#9FE7C3]">{FINAL_TWIST.closing}</p>
    </section>
  );
}

export function FinalHomeWhatIsSection() {
  return (
    <section id={FINAL_WHAT_IS.id} className={FINAL_SECTION}>
      <p className={FINAL_EYEBROW}>{FINAL_WHAT_IS.eyebrow}</p>
      <h2 className={`mt-3 max-w-3xl ${FINAL_H2}`}>{FINAL_WHAT_IS.heading}</h2>
      <p className={`mt-4 max-w-3xl ${FINAL_BODY}`}>{FINAL_WHAT_IS.subcopy}</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {FINAL_WHAT_IS.outcomes.map((outcome) => (
          <li key={outcome} className={`${FINAL_CARD} ${FINAL_BODY_SM}`}>
            {outcome}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FinalHomeExampleSection() {
  return (
    <section className={FINAL_SECTION}>
      <p className={FINAL_EYEBROW}>{FINAL_EXAMPLE.eyebrow}</p>
      <h2 className={`mt-3 ${FINAL_H2}`}>{FINAL_EXAMPLE.heading}</h2>
      <div className="mt-5 max-w-3xl space-y-4">
        {FINAL_EXAMPLE.scenario.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className={FINAL_BODY}>
            {paragraph}
          </p>
        ))}
      </div>
      <p className="mt-5 max-w-3xl font-medium text-white">{FINAL_EXAMPLE.closing}</p>
    </section>
  );
}

export function FinalHomeCompoundingSection() {
  return (
    <section id={FINAL_COMPOUNDING.id} className={FINAL_SECTION}>
      <p className={FINAL_EYEBROW}>{FINAL_COMPOUNDING.eyebrow}</p>
      <h2 className={`mt-3 ${FINAL_H2}`}>{FINAL_COMPOUNDING.heading}</h2>
      <p className={`mt-4 max-w-3xl ${FINAL_BODY}`}>{FINAL_COMPOUNDING.subcopy}</p>
      <ul className="mt-6 max-w-3xl space-y-3">
        {FINAL_COMPOUNDING.points.map((point) => (
          <li key={point} className={`flex gap-3 ${FINAL_BODY_SM}`}>
            <span className="font-mono text-xs text-[#9FE7C3]">+</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FinalHomeConfidenceSection() {
  return (
    <section className={FINAL_SECTION}>
      <p className={FINAL_EYEBROW}>{FINAL_CONFIDENCE.eyebrow}</p>
      <h2 className={`mt-3 ${FINAL_H2}`}>{FINAL_CONFIDENCE.heading}</h2>
      <p className={`mt-4 max-w-3xl ${FINAL_BODY}`}>{FINAL_CONFIDENCE.subcopy}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {FINAL_CONFIDENCE.lanes.map((lane) => (
          <div key={lane.title} className={FINAL_CARD}>
            <h3 className="text-sm font-semibold text-white">{lane.title}</h3>
            <p className={`mt-2 ${FINAL_BODY_SM}`}>{lane.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FinalHomePillarsSection() {
  return (
    <section className={FINAL_SECTION}>
      <p className={FINAL_EYEBROW}>{FINAL_PILLARS.eyebrow}</p>
      <h2 className={`mt-3 ${FINAL_H2}`}>{FINAL_PILLARS.heading}</h2>
      <p className={`mt-4 max-w-3xl ${FINAL_BODY}`}>{FINAL_PILLARS.subcopy}</p>
      <div className="mt-6 space-y-3">
        {FINAL_PILLARS.pillars.map((pillar) => (
          <div key={pillar.number} className={`${FINAL_CARD} flex gap-4`}>
            <span className="font-mono text-xs text-[#9FE7C3]">{pillar.number}</span>
            <div>
              <h3 className="text-sm font-semibold text-white">{pillar.title}</h3>
              <p className={`mt-1 ${FINAL_BODY_SM}`}>{pillar.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FinalHomeArchitectureSection() {
  return (
    <section id={FINAL_ARCHITECTURE.id} className={FINAL_SECTION}>
      <p className={FINAL_EYEBROW}>{FINAL_ARCHITECTURE.eyebrow}</p>
      <h2 className={`mt-3 ${FINAL_H2}`}>{FINAL_ARCHITECTURE.heading}</h2>
      <p className={`mt-4 max-w-3xl ${FINAL_BODY}`}>{FINAL_ARCHITECTURE.subcopy}</p>
      <div className="mt-6 space-y-4">
        {FINAL_ARCHITECTURE.layers.map((layer) => (
          <div
            key={layer.name}
            className={`rounded-xl border p-5 ${
              layer.name === "Vessa"
                ? "border-[#FF2FB3]/30 bg-[radial-gradient(circle_at_10%_0%,rgba(255,47,179,0.1),rgba(12,17,16,0.95)_50%)]"
                : layer.name === "StudioFlows OS"
                  ? "border-[#9FE7C3]/30 bg-[radial-gradient(circle_at_10%_0%,rgba(159,231,195,0.08),rgba(12,17,16,0.95)_50%)]"
                  : "border-white/15 bg-white/[0.02]"
            }`}
          >
            <p className="text-xs uppercase tracking-[0.18em] text-[#B3BDC9]">{layer.role}</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{layer.name}</h3>
            <p className={`mt-2 ${FINAL_BODY_SM}`}>{layer.detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {FINAL_ARCHITECTURE.vessaSurfaces.map((surface) => (
          <div key={surface.name} className="rounded-lg border border-[#FF2FB3]/25 bg-[#10101A]/60 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#FF2FB3]">{surface.name}</p>
            <p className={`mt-2 ${FINAL_BODY_SM}`}>{surface.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FinalHomeFinalCtaSection() {
  return (
    <section className={`${FINAL_SECTION} border-b-0`}>
      <h2 className={`max-w-3xl ${FINAL_H2}`}>{FINAL_CTA.heading}</h2>
      <p className={`mt-4 max-w-2xl ${FINAL_BODY}`}>{FINAL_CTA.subcopy}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href={FINAL_HOMEPAGE_CTA.primaryHref} className={FINAL_CTA_PRIMARY}>
          {FINAL_HOMEPAGE_CTA.primaryLabel}
        </a>
        <Link href={FINAL_HOMEPAGE_CTA.secondaryHref} className={FINAL_CTA_SECONDARY}>
          {FINAL_HOMEPAGE_CTA.secondaryLabel}
        </Link>
      </div>
    </section>
  );
}

export function FinalHomeFooter() {
  return (
    <footer className="border-t border-white/10 py-10">
      <p className={`${FINAL_BODY_SM} text-white/55`}>{FINAL_FOOTER.tagline}</p>
      <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#B3BDC9]" aria-label="Footer">
        {FINAL_FOOTER.links.map((link) =>
          link.href.startsWith("/") ? (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ) : (
            <a key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </a>
          )
        )}
      </nav>
      <p className="mt-8 text-xs text-white/40">© {new Date().getFullYear()} StudioFlows</p>
    </footer>
  );
}
