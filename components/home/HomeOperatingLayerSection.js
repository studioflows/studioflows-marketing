"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import {
  HOME_BODY_LG,
  HOME_BODY_SM,
  HOME_CARD,
  HOME_CARD_ACCENT,
  HOME_CARD_IDLE,
  HOME_CARD_PAD,
  HOME_EYEBROW_VIOLET,
  HOME_H2,
  HOME_H3,
  HOME_SECTION,
} from "@/components/home/home-tokens";
import { SECTION_REVEAL } from "@/components/home/section-reveal";
import { OPERATING_LAYER, OPERATING_LAYER_INTRO } from "@/lib/homepage-content";

export default function HomeOperatingLayerSection() {
  const [activeLayerCard, setActiveLayerCard] = useState(0);
  const [showTransform, setShowTransform] = useState(true);

  return (
    <motion.section id="operating-layer" className={HOME_SECTION} {...SECTION_REVEAL}>
      <h2 className={`max-w-[1000px] text-left ${HOME_H2}`}>{OPERATING_LAYER_INTRO.heading}</h2>
      <p className={`mt-4 max-w-[920px] text-left ${HOME_BODY_LG}`}>{OPERATING_LAYER_INTRO.subcopy}</p>
      <button
        type="button"
        onClick={() => setShowTransform((prev) => !prev)}
        className="mt-4 w-full rounded-full border border-white/25 px-4 py-2 text-center text-[10px] uppercase tracking-[0.12em] text-white/78 transition hover:bg-white/[0.08] sm:w-auto sm:text-[11px] sm:tracking-[0.18em]"
      >
        {showTransform ? "Hide Before → After" : "Show Before → After Transformations"}
      </button>
      <motion.div
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {OPERATING_LAYER.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActiveLayerCard(index)}
            className={`${HOME_CARD} ${HOME_CARD_PAD} text-left transition ${
              activeLayerCard === index ? HOME_CARD_ACCENT : HOME_CARD_IDLE
            }`}
          >
            <p className={HOME_EYEBROW_VIOLET}>[{item.number}]</p>
            <p className={`mt-3 ${HOME_H3}`}>{item.title}</p>
            <p className={`mt-2 ${HOME_BODY_SM}`}>{item.body}</p>
            {showTransform && (
              <div className="mt-4 space-y-2 rounded-lg border border-white/10 bg-white/[0.02] p-3 text-xs text-white/78">
                <p>
                  <span className="font-semibold text-rose-200">Before:</span> {item.before}
                </p>
                <p>
                  <span className="font-semibold text-emerald-200">After:</span> {item.after}
                </p>
              </div>
            )}
          </button>
        ))}
      </motion.div>
    </motion.section>
  );
}
