"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  HOME_BODY,
  HOME_CARD,
  HOME_CARD_ACCENT,
  HOME_CARD_PAD,
  HOME_CTA_PRIMARY_BLOCK,
  HOME_EYEBROW_ACCENT,
  HOME_EYEBROW_VIOLET,
  HOME_H2,
  HOME_SECTION,
} from "@/components/home/home-tokens";
import RecFitExplorer from "@/components/RecFitExplorer";
import RecScreenshotLightbox, { RecScreenshotExpandHint } from "@/components/RecScreenshotLightbox";
import { HOMEPAGE_CTA } from "@/lib/homepage-content";
import { REC_FEATURES } from "@/lib/rec-case-study";

const SECTION_REVEAL = {
  initial: { opacity: 0, y: 28, filter: "blur(8px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

function getFeatureGallery(feature) {
  if (Array.isArray(feature.gallery) && feature.gallery.length > 0) {
    return feature.gallery;
  }
  if (feature.image) {
    return [{ src: feature.image, caption: null }];
  }
  return [];
}

function syncRecTabFromUrl(setActiveIndex, setGalleryIndex) {
  if (typeof window === "undefined") return;
  const rec = new URLSearchParams(window.location.search).get("rec");
  if (!rec) return;
  const index = REC_FEATURES.findIndex((feature) => feature.id === rec);
  if (index >= 0) {
    setActiveIndex(index);
    setGalleryIndex(0);
  }
}

export default function RecCaseStudySpotlight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    syncRecTabFromUrl(setActiveIndex, setGalleryIndex);
    const onPopState = () => syncRecTabFromUrl(setActiveIndex, setGalleryIndex);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const active = REC_FEATURES[activeIndex];
  const gallery = getFeatureGallery(active);
  const activeShot = gallery[galleryIndex] ?? gallery[0];

  return (
    <motion.section id="rec-spotlight" className={HOME_SECTION} {...SECTION_REVEAL}>
      <div className={`${HOME_CARD_ACCENT} ${HOME_CARD_PAD} sm:p-8 lg:p-10`}>
        <p className={HOME_EYEBROW_ACCENT}>REC proof</p>
        <h2 className={`mt-3 text-left ${HOME_H2}`}>Real Build Spotlight: REC Ops Control Surface</h2>
        <p className={`mt-3 max-w-[920px] text-left ${HOME_BODY}`}>
          Built for Real Estate Cinema. The same control layer fits any service business running crews, jobs,
          confirmations, and day-of exceptions.
        </p>

        <RecFitExplorer />

        <div className="mt-8">
          <p className={HOME_EYEBROW_VIOLET}>Test drive this week</p>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:gap-2">
            {REC_FEATURES.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveIndex(index);
                    setGalleryIndex(0);
                  }}
                  className={`w-full rounded-lg px-4 py-2 text-center text-[10px] uppercase tracking-[0.12em] transition sm:w-auto sm:whitespace-nowrap sm:text-xs sm:tracking-[0.16em] ${
                    isActive
                      ? "bg-[#FACC15] text-black"
                      : "bg-black/35 text-white/75 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
                  }`}
                  whileHover={{ y: -1.5 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {item.label}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.24 }}
              className={`mt-4 ${HOME_CARD} ${HOME_CARD_PAD}`}
            >
              <p className="text-sm font-semibold text-white/92">{active.scenarioTitle}</p>
              <ul className="mt-3 space-y-2">
                {active.scenarioSteps.map((step) => (
                  <li key={step} className="flex items-start gap-2 text-sm leading-6 text-white/76">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#FACC15]" aria-hidden />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-white/55">In your business this might read as</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-[#C7D2FE]">
                  Job → {active.yourLabels.job}
                </span>
                <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-[#C7D2FE]">
                  Crew → {active.yourLabels.crew}
                </span>
                <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-[#C7D2FE]">
                  Exception → {active.yourLabels.exception}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${active.id}-${galleryIndex}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              {gallery.length > 1 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {gallery.map((shot, index) => {
                    const isActiveShot = galleryIndex === index;
                    return (
                      <button
                        key={shot.src}
                        type="button"
                        onClick={() => setGalleryIndex(index)}
                        className={`rounded-lg px-3 py-1.5 text-left text-[10px] uppercase tracking-[0.14em] transition ${
                          isActiveShot
                            ? "bg-[#FACC15] text-black"
                            : "bg-black/35 text-white/70 shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:text-white"
                        }`}
                      >
                        {index === 0 ? "Lifecycle & confirm" : "Field → delivery"}
                      </button>
                    );
                  })}
                </div>
              )}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="group relative w-full cursor-zoom-in rounded-2xl bg-black/45 p-2 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.12)] transition hover:shadow-[0_0_0_1px_rgba(250,204,21,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FACC15]/70"
                aria-label={`Expand ${active.label} screenshot`}
              >
                <img
                  src={activeShot?.src}
                  alt={active.label}
                  className="w-full rounded-xl object-cover"
                />
                <RecScreenshotExpandHint />
              </button>
              {activeShot?.caption && (
                <p className="mt-3 text-sm leading-6 text-white/72">{activeShot.caption}</p>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="space-y-3">
            <div className={`${HOME_CARD} ${HOME_CARD_PAD}`}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#FACC15]">BEFORE</p>
              <p className="mt-2 text-sm leading-6 text-white/76">{active.before}</p>
            </div>
            <div className={`${HOME_CARD} ${HOME_CARD_PAD}`}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#FACC15]">INSTALLED</p>
              <p className="mt-2 text-sm leading-6 text-white/76">{active.installed}</p>
            </div>
            <div className={`${HOME_CARD} ${HOME_CARD_PAD}`}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#FACC15]">OUTCOME</p>
              <ul className="mt-2 space-y-1">
                {active.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2 text-sm text-white/76">
                    <span className="mt-[2px] text-emerald-400">✓</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[640px] text-sm leading-7 text-white/76">
            If your week looks like this, the 30-second pre-qualifier will tell you if an audit makes sense.
          </p>
          <motion.div whileHover={{ y: -1.5 }} whileTap={{ scale: 0.99 }}>
            <Link
              href={HOMEPAGE_CTA.primaryHref}
              className={HOME_CTA_PRIMARY_BLOCK}
            >
              {HOMEPAGE_CTA.primaryLabel}
            </Link>
          </motion.div>
        </div>
      </div>

      <RecScreenshotLightbox
        open={lightboxOpen}
        imageSrc={activeShot?.src}
        alt={active.label}
        onClose={() => setLightboxOpen(false)}
      />
    </motion.section>
  );
}
