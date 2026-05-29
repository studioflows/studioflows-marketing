"use client";

import { motion } from "framer-motion";

import HeroControlSurfaceVisual from "@/components/home/HeroControlSurfaceVisual";
import {
  HOME_CTA_PRIMARY_BLOCK,
  HOME_CTA_SECONDARY_BLOCK,
  HOME_EYEBROW_ACCENT,
  HOME_H1,
} from "@/components/home/home-tokens";
import { SECTION_REVEAL } from "@/components/home/section-reveal";
import { HERO, HOMEPAGE_CTA } from "@/lib/homepage-content";

export default function HomeHero() {
  return (
    <motion.section
      id="hero"
      className="flex min-h-[88vh] flex-col justify-center py-10 lg:py-14"
      {...SECTION_REVEAL}
    >
      <div className="lg:grid lg:grid-cols-[1fr_minmax(280px,400px)] lg:items-start lg:gap-10 xl:grid-cols-[1fr_minmax(300px,420px)] xl:gap-14">
        <div>
          <p className={HOME_EYEBROW_ACCENT}>{HERO.eyebrow}</p>
          <h1 className={`mt-6 max-w-[1080px] ${HOME_H1}`}>
            {HERO.headline}
            <br />
            <span className="text-white">{HERO.headlineAccent}</span>
          </h1>
          <p className="mt-7 max-w-[900px] text-[clamp(1.05rem,2.1vw,1.55rem)] font-light leading-[1.38] text-white/84">
            {HERO.subcopy}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a href={HOMEPAGE_CTA.primaryHref} className={HOME_CTA_PRIMARY_BLOCK}>
              {HOMEPAGE_CTA.primaryLabel}
            </a>
            <a href={HOMEPAGE_CTA.secondaryHref} className={HOME_CTA_SECONDARY_BLOCK}>
              {HOMEPAGE_CTA.secondaryLabel}
            </a>
          </div>
          <p className="mt-5 max-w-[880px] text-sm text-white/68">{HERO.support}</p>
          <HeroControlSurfaceVisual className="mt-8 lg:hidden" />
        </div>

        <HeroControlSurfaceVisual className="hidden lg:mt-6 lg:block lg:sticky lg:top-24" />
      </div>
    </motion.section>
  );
}
