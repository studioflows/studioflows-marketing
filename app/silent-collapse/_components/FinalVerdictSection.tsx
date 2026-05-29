"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { buildOpsHubUrl } from "@/lib/lead-attribution";

const auditUrl = buildOpsHubUrl({ source: "silent-collapse" });

export default function FinalVerdictSection() {
  return (
    <section className="pb-16 pt-24 sm:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
        className="rounded-[28px] border border-[#FACC15]/35 bg-[linear-gradient(150deg,rgba(250,204,21,0.18),rgba(12,12,16,0.96))] p-6 shadow-[0_30px_85px_rgba(0,0,0,0.5)] sm:p-10"
      >
        <p className="text-[11px] uppercase tracking-[0.24em] text-black/75">Final Verdict</p>
        <h2 className="mt-3 max-w-[980px] text-[clamp(2rem,4.2vw,3.7rem)] font-bold leading-tight tracking-[-0.02em] text-white">
          High-collapse teams get limited audit clearance each week.
        </h2>
        <p className="mt-4 max-w-[900px] text-base leading-8 text-white/85">
          If the signal is clear, lock your OPS Drag Audit slot before the weekly window closes.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href={auditUrl}
            className="rounded-xl bg-[#FACC15] px-6 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition hover:brightness-105"
          >
            Claim Audit Clearance
          </Link>
          <Link
            href="/#diagnosis"
            className="rounded-xl border border-white/30 px-6 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/[0.08]"
          >
            Run Homepage Pre-Qual
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
