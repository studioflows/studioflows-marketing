"use client";

import { motion } from "framer-motion";

import {
  HOME_BODY,
  HOME_BODY_SM,
  HOME_CARD,
  HOME_CARD_PAD,
  HOME_EYEBROW_VIOLET,
  HOME_H2,
  HOME_SECTION,
} from "@/components/home/home-tokens";
import { SECTION_REVEAL } from "@/components/home/section-reveal";
import { TOOLS_FAIL } from "@/lib/homepage-content";

export default function HomeToolsFailSection() {
  return (
    <motion.section id="tools-fail" className={HOME_SECTION} {...SECTION_REVEAL}>
      <p className={HOME_EYEBROW_VIOLET}>{TOOLS_FAIL.eyebrow}</p>
      <h2 className={`mt-4 max-w-[900px] ${HOME_H2}`}>{TOOLS_FAIL.heading}</h2>
      <p className={`mt-4 max-w-[820px] ${HOME_BODY}`}>{TOOLS_FAIL.subcopy}</p>

      <motion.div
        className={`mt-8 overflow-x-auto ${HOME_CARD}`}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <table className="w-full min-w-[520px] border-collapse text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th
                scope="col"
                className={`px-5 py-4 sm:px-6 ${HOME_BODY_SM} font-semibold text-white/55`}
              >
                {TOOLS_FAIL.comparisonHeaders.tracks}
              </th>
              <th
                scope="col"
                className={`px-5 py-4 sm:px-6 ${HOME_BODY_SM} font-semibold text-[#C4B5FD]`}
              >
                {TOOLS_FAIL.comparisonHeaders.moves}
              </th>
            </tr>
          </thead>
          <tbody>
            {TOOLS_FAIL.comparisonRows.map((row) => (
              <tr key={row.tracks} className="border-b border-white/10 last:border-b-0">
                <td className={`px-5 py-4 sm:px-6 ${HOME_BODY_SM} text-white/62`}>{row.tracks}</td>
                <td className={`px-5 py-4 sm:px-6 ${HOME_BODY_SM} text-white/88`}>{row.moves}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <p className={`mt-8 max-w-[900px] ${HOME_BODY} text-white/82`}>{TOOLS_FAIL.closing}</p>
    </motion.section>
  );
}
