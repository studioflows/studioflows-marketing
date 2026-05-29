"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";

type Props = {
  signals: string[];
};

export default function LiveSignalsSection({ signals }: Props) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="pt-24 sm:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
      >
        <p className="text-[11px] uppercase tracking-[0.24em] text-[#C4B5FD]">Live Signals From The Field</p>
        <h2 className="mt-3 text-[clamp(2rem,4vw,3.4rem)] font-bold leading-tight tracking-[-0.02em]">
          Evidence wall: active founder distress signals.
        </h2>
      </motion.div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {signals.map((signal, index) => (
          <motion.div
            key={signal}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.04, duration: 0.28 }}
            whileHover={reducedMotion ? undefined : { y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.995 }}
          >
            <Card className="group relative overflow-hidden border-[#6366F1]/30 bg-[linear-gradient(150deg,rgba(16,16,24,0.95),rgba(8,8,11,0.98))] shadow-[0_14px_35px_rgba(0,0,0,0.5)]">
              <motion.div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A855F7] to-transparent"
                animate={reducedMotion ? undefined : { opacity: [0.28, 0.85, 0.28] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.4, delay: index * 0.15 }}
              />
              <CardContent className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#A5B4FC]">Intercept {String(index + 1).padStart(2, "0")}</p>
                <p className="text-sm leading-7 text-white/80">{signal}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
