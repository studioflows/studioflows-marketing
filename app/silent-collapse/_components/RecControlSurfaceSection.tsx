"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";

import { Card, CardContent } from "@/components/ui/card";
import { REC_TABS } from "../data";

export default function RecControlSurfaceSection() {
  return (
    <section className="pt-24 sm:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
      >
        <p className="text-[11px] uppercase tracking-[0.24em] text-[#C4B5FD]">REC Ops Control Surface</p>
        <h2 className="mt-3 max-w-[980px] text-[clamp(2rem,4vw,3.4rem)] font-bold leading-tight tracking-[-0.02em]">
          Real deployment. Real control. Real execution lift.
        </h2>
      </motion.div>

      <Tabs.Root defaultValue="dashboard" className="mt-8">
        <Tabs.List className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {REC_TABS.map((tab) => (
            <Tabs.Trigger
              key={tab.id}
              value={tab.id}
              className="rounded-xl border border-white/15 bg-black/35 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/80 transition data-[state=active]:border-[#FACC15]/55 data-[state=active]:bg-[#FACC15]/20 data-[state=active]:text-[#FDE68A]"
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {REC_TABS.map((tab) => (
          <Tabs.Content key={tab.id} value={tab.id} className="mt-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]"
            >
              <Card className="overflow-hidden border-white/15 bg-black/40 p-2">
                <Image src={tab.image} alt={tab.label} width={1540} height={890} className="h-auto w-full rounded-xl object-cover" priority={false} />
              </Card>
              <div className="space-y-3">
                <Card className="border-white/15 bg-black/40">
                  <CardContent>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#A5B4FC]">Before</p>
                    <p className="mt-2 text-sm leading-7 text-white/80">{tab.before}</p>
                  </CardContent>
                </Card>
                <Card className="border-white/15 bg-black/40">
                  <CardContent>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#A5B4FC]">Installed</p>
                    <p className="mt-2 text-sm leading-7 text-white/80">{tab.installed}</p>
                  </CardContent>
                </Card>
                <Card className="border-white/15 bg-black/40">
                  <CardContent>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#A5B4FC]">Outcome</p>
                    <ul className="mt-2 space-y-1.5">
                      {tab.outcomes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </section>
  );
}
