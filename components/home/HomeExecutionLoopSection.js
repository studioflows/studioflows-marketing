"use client";

import { motion } from "framer-motion";

import {
  HOME_BODY,
  HOME_BODY_SM,
  HOME_CARD,
  HOME_CARD_PAD,
  HOME_EYEBROW_ACCENT,
  HOME_H2,
  HOME_H3,
  HOME_SECTION,
  HOME_STEP_NUMBER,
} from "@/components/home/home-tokens";
import { SECTION_REVEAL } from "@/components/home/section-reveal";
import { EXECUTION_LOOP } from "@/lib/homepage-content";

export default function HomeExecutionLoopSection() {
  return (
    <motion.section id="execution-loop" className={HOME_SECTION} {...SECTION_REVEAL}>
      <p className={HOME_EYEBROW_ACCENT}>{EXECUTION_LOOP.eyebrow}</p>
      <h2 className={`mt-4 max-w-[900px] ${HOME_H2}`}>{EXECUTION_LOOP.heading}</h2>
      <p className={`mt-4 max-w-[820px] ${HOME_BODY}`}>{EXECUTION_LOOP.subcopy}</p>

      <ol className="relative mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
        <div
          aria-hidden
          className="pointer-events-none absolute left-[10%] top-5 hidden h-px w-[80%] bg-white/10 lg:block"
        />
        {EXECUTION_LOOP.steps.map((step, index) => (
          <li key={step.id} className={`relative ${HOME_CARD} ${HOME_CARD_PAD}`}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, delay: index * 0.06, ease: "easeOut" }}
              className="flex flex-col gap-3"
            >
              <span className={HOME_STEP_NUMBER}>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className={HOME_H3}>{step.label}</h3>
                <p className={`mt-2 ${HOME_BODY_SM}`}>{step.body}</p>
              </div>
            </motion.div>
            {index < EXECUTION_LOOP.steps.length - 1 && (
              <motion.div
                aria-hidden
                className="mx-auto mt-4 h-6 w-px bg-white/10 lg:hidden"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: index * 0.06 }}
              />
            )}
          </li>
        ))}
      </ol>
    </motion.section>
  );
}
