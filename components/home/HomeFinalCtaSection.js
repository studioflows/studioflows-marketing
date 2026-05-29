"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  HOME_BODY_LG,
  HOME_CTA_PRIMARY_BLOCK,
  HOME_CTA_SECONDARY_BLOCK,
  HOME_H2,
  HOME_SECTION,
} from "@/components/home/home-tokens";
import { SECTION_REVEAL } from "@/components/home/section-reveal";
import { FINAL_CTA, HOMEPAGE_CTA } from "@/lib/homepage-content";

export default function HomeFinalCtaSection() {
  return (
    <motion.section className={`${HOME_SECTION} pb-4`} {...SECTION_REVEAL}>
      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-6 sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(250,204,21,0.08),transparent_55%)]"
        />
        <div className="relative">
          <h2 className={`max-w-[920px] text-left ${HOME_H2}`}>{FINAL_CTA.heading}</h2>
          <p className={`mt-4 max-w-[980px] ${HOME_BODY_LG}`}>{FINAL_CTA.subcopy}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={HOMEPAGE_CTA.primaryHref} className={HOME_CTA_PRIMARY_BLOCK}>
              {HOMEPAGE_CTA.primaryLabel}
            </a>
            <Link href={HOMEPAGE_CTA.secondaryHref} className={HOME_CTA_SECONDARY_BLOCK}>
              {HOMEPAGE_CTA.secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
