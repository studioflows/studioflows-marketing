"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { OPERATING_LAYER_CARDS } from "@/app/silent-collapse/data";

export default function OperatingLayerSection() {
  const [activeCard, setActiveCard] = useState(0);
  const reducedMotion = useReducedMotion();

  return (
    <section className="pt-24 sm:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
      >
        <p className="text-[11px] uppercase tracking-[0.24em] text-[#C4B5FD]">The Operating Layer</p>
        <h2 className="mt-3 max-w-[980px] text-[clamp(2rem,4vw,3.4rem)] font-bold leading-tight tracking-[-0.02em]">
          Install the control layer your current tools never gave you.
        </h2>
      </motion.div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {OPERATING_LAYER_CARDS.map((card, index) => {
          const active = index === activeCard;
          return (
            <motion.button
              key={card.title}
              type="button"
              onClick={() => setActiveCard(index)}
              onMouseEnter={() => setActiveCard(index)}
              className="text-left"
              whileHover={reducedMotion ? undefined : { y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
            >
              <Card
                className={`h-full overflow-hidden transition ${
                  active
                    ? "border-[#A855F7]/55 shadow-[0_18px_40px_rgba(99,102,241,0.35)]"
                    : "border-white/10 shadow-[0_10px_26px_rgba(0,0,0,0.35)]"
                }`}
              >
                <CardContent>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#A5B4FC]">{card.title}</p>
                  <motion.div layout className="mt-4 space-y-2">
                    <p className="text-sm leading-7 text-white/78">
                      <span className="font-semibold text-rose-200">Before:</span> {card.before}
                    </p>
                    <p className="text-sm leading-7 text-[#C7D2FE]">
                      <span className="font-semibold text-emerald-300">After:</span> {card.after}
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
