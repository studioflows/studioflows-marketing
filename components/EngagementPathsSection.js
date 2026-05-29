"use client";

import Link from "next/link";
import { Layers, Sparkles, Wrench } from "lucide-react";

import {
  HOME_BODY,
  HOME_BODY_SM,
  HOME_CARD,
  HOME_CARD_ACCENT,
  HOME_CARD_PAD,
  HOME_CTA_PRIMARY,
  HOME_CTA_SECONDARY,
  HOME_EYEBROW_ACCENT,
  HOME_H2,
  HOME_H3,
} from "@/components/home/home-tokens";
import { ENGAGEMENT_PATHS, SECTION_INTRO, getEngagementPathStatusLabel } from "@/lib/offerings";

const PATH_ICONS = {
  optimize: Sparkles,
  accelerate: Layers,
  custom_command: Wrench,
};

export default function EngagementPathsSection({
  heading = SECTION_INTRO.heading,
  subcopy = SECTION_INTRO.subcopy,
  highlightId,
  compact = false,
}) {
  return (
    <section id="ways-to-work" aria-labelledby="ways-to-work-heading">
      <p className={HOME_EYEBROW_ACCENT}>How we work</p>
      <h2 id="ways-to-work-heading" className={`mt-4 max-w-[900px] ${HOME_H2}`}>
        {heading}
      </h2>
      {!compact && <p className={`mt-4 max-w-[820px] ${HOME_BODY}`}>{subcopy}</p>}

      <div className={`mt-8 grid gap-4 ${compact ? "md:grid-cols-3" : "lg:grid-cols-3"}`}>
        {ENGAGEMENT_PATHS.map((path) => {
          const highlighted = highlightId === path.id;
          const Icon = PATH_ICONS[path.id] ?? Sparkles;
          return (
            <article
              key={path.id}
              className={`flex flex-col ${highlighted ? HOME_CARD_ACCENT : HOME_CARD} ${HOME_CARD_PAD}`}
            >
              <div className="mb-4 flex h-28 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] sm:h-32">
                <Icon className="h-12 w-12 text-[#C4B5FD]" strokeWidth={1.25} aria-hidden />
              </div>
              <h3 className={`${HOME_H3} text-xl`}>{path.label}</h3>
              <p className="mt-1 text-sm font-medium text-white/72">{path.tagline}</p>
              {path.highlight && <p className="mt-2 text-sm text-[#FACC15]/90">{path.highlight}</p>}
              <p className={`mt-3 flex-1 ${HOME_BODY_SM}`}>{path.description}</p>
              <p className="mt-4 text-xs uppercase tracking-wider text-white/45">
                {getEngagementPathStatusLabel(path.status)}
              </p>
              <Link
                href={path.url}
                className={`mt-4 inline-flex justify-center px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] transition ${
                  highlighted ? HOME_CTA_PRIMARY : HOME_CTA_SECONDARY
                }`}
              >
                {path.cta}
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
