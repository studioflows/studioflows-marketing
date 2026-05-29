"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";

type Feature = { title: string; body: string };

type Props = {
  features: Feature[];
};

export default function VessaTeaserSection({ features }: Props) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="pt-24 sm:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
      >
        <p className="text-[11px] uppercase tracking-[0.24em] text-[#C4B5FD]">Vessa Teaser</p>
        <h2 className="mt-3 max-w-[980px] text-[clamp(2rem,4vw,3.4rem)] font-bold leading-tight tracking-[-0.02em]">
          Autonomous execution intelligence, operator controlled.
        </h2>
      </motion.div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <motion.div key={feature.title} whileHover={reducedMotion ? undefined : { y: -8, scale: 1.02 }}>
            <Card className="h-full border-white/15 bg-black/35">
              <CardContent>
                <p className="text-lg font-semibold">{feature.title}</p>
                <p className="mt-2 text-sm leading-7 text-white/78">{feature.body}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-6">
        <Link
          href="/vessa"
          className="inline-flex rounded-xl bg-[#FACC15] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition hover:brightness-105"
        >
          Explore Vessa
        </Link>
      </div>
    </section>
  );
}
