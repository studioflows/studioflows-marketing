"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  HOME_BODY_LG,
  HOME_BODY_SM,
  HOME_CARD,
  HOME_CARD_ACTIVE,
  HOME_CARD_IDLE,
  HOME_CARD_PAD,
  HOME_EYEBROW_VIOLET,
  HOME_H2,
  HOME_H3,
  HOME_H3_CARD,
  HOME_SECTION,
} from "@/components/home/home-tokens";
import { SECTION_REVEAL } from "@/components/home/section-reveal";
import { DRAG_SYMPTOMS, PROBLEM } from "@/lib/homepage-content";

export default function HomeProblemSection() {
  const [activeSymptom, setActiveSymptom] = useState(0);
  const active = DRAG_SYMPTOMS[activeSymptom];

  return (
    <motion.section id="drag-tax" className={HOME_SECTION} {...SECTION_REVEAL}>
      <p className={HOME_EYEBROW_VIOLET}>{PROBLEM.eyebrow}</p>
      <h2 className={`mt-4 max-w-[900px] text-left ${HOME_H2}`}>
        {PROBLEM.heading}
        <br />
        <span className="text-white/88">{PROBLEM.headingAccent}</span>
      </h2>
      <p className={`mt-4 max-w-[900px] text-left ${HOME_BODY_LG}`}>{PROBLEM.subcopy}</p>
      <p className="mt-1 text-sm font-medium text-white/55">{PROBLEM.hint}</p>

      <div className={`mt-8 ${HOME_CARD} ${HOME_CARD_PAD}`}>
        <div className="grid gap-3 sm:grid-cols-2">
          {DRAG_SYMPTOMS.map((item, index) => {
            const isActive = activeSymptom === index;
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveSymptom(index)}
                onMouseEnter={() => setActiveSymptom(index)}
                className={`rounded-xl border px-4 py-4 text-left transition ${
                  isActive ? HOME_CARD_ACTIVE : HOME_CARD_IDLE
                }`}
              >
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/55">
                  Signal {index + 1}
                </p>
                <p className={`mt-2 ${HOME_H3_CARD}`}>{item.title}</p>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
            className={`mt-5 ${HOME_CARD} ${HOME_CARD_PAD}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">Live Signal Readout</p>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-white/72">
                {active.pressure}
              </span>
            </div>
            <h3 className={`mt-3 text-xl ${HOME_H3}`}>{active.title}</h3>
            <p className={`mt-4 ${HOME_BODY_SM}`}>{active.signal}</p>
            <p className="mt-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm leading-7 text-white/78">
              Leak pattern: {active.leak}
            </p>
            <p className={`mt-2 ${HOME_BODY_SM} text-white/78`}>Impact: {active.outcome}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
