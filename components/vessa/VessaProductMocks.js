"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { VESSA_CARD } from "@/components/vessa/vessa-tokens";
import { VESSA_PRODUCT_SCREENS } from "@/lib/vessa-homepage-content";

function MockWindowChrome({ title }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-black/40 px-4 py-2.5">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[#DB2777]/70" />
        <span className="h-2 w-2 rounded-full bg-[#D4A853]/70" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">{title}</span>
    </div>
  );
}

export function VessaProductScreen({ screen, active = true, priority = false, className = "" }) {
  const { src, alt, label } = screen;

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: active ? 1 : 0,
        y: active ? 0 : 12,
        scale: active ? 1 : 0.985,
        filter: active ? "blur(0px)" : "blur(5px)",
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`${VESSA_CARD} overflow-hidden ${active ? "relative" : "pointer-events-none absolute inset-0"} ${className}`}
      aria-hidden={!active}
    >
      <MockWindowChrome title={label} />
      <div className="relative aspect-[16/10] w-full bg-[#050507]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 680px"
          className="object-cover object-left-top"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#030304]/80 to-transparent" />
      </div>
    </motion.div>
  );
}

export function VessaChatMock({ active }) {
  return <VessaProductScreen screen={VESSA_PRODUCT_SCREENS.chat} active={active} priority />;
}

export function VessaDecideMock({ active = true }) {
  return <VessaProductScreen screen={VESSA_PRODUCT_SCREENS.decide} active={active} />;
}

export function VessaWorkstreamMock() {
  return <VessaProductScreen screen={VESSA_PRODUCT_SCREENS.workstream} active />;
}

export function VessaMosaIQScreen() {
  return <VessaProductScreen screen={VESSA_PRODUCT_SCREENS.mosaiq} active />;
}

export function VessaOnboardingScreen() {
  return <VessaProductScreen screen={VESSA_PRODUCT_SCREENS.onboarding} active />;
}

export function VessaCircuitMap({ nodes, intensity }) {
  const activeCount = Math.max(1, Math.min(nodes.length, Math.round((intensity / 100) * nodes.length)));

  return (
    <div className="relative mx-auto h-[360px] w-full max-w-[760px] overflow-hidden rounded-[28px] border border-white/10 bg-black/35 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(219,39,119,0.16),transparent_22%),radial-gradient(circle_at_50%_45%,rgba(212,168,83,0.08),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:34px_34px]" />

      <motion.div
        animate={{ scale: [1, 1.04, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4A853]/30 bg-[#D4A853]/[0.08] shadow-[0_0_120px_rgba(212,168,83,0.28),0_0_80px_rgba(219,39,119,0.18)]"
      >
        <div className="absolute inset-3 rounded-full border border-white/10 bg-black/50" />
        <div className="absolute inset-[26px] rounded-full bg-gradient-to-br from-[#D4A853]/70 via-[#D4A853]/15 to-transparent blur-[1px]" />
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] uppercase tracking-[0.2em] text-[#D4A853]">
          Vessa
        </span>
      </motion.div>

      {nodes.map((node, index) => {
        const angle = (index / nodes.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 128;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const isActive = index < activeCount;

        return (
          <div key={node}>
            <motion.div
              initial={false}
              animate={{ opacity: isActive ? 1 : 0.2 }}
              className="absolute left-1/2 top-1/2 h-px origin-left"
              style={{ width: radius, transform: `translate(0,-50%) rotate(${angle}rad)` }}
            >
              <div
                className={`h-px w-full ${
                  isActive ? "bg-gradient-to-r from-[#D4A853]/80 to-transparent" : "bg-white/10"
                }`}
              />
            </motion.div>

            <motion.div
              initial={false}
              animate={{
                x,
                y,
                opacity: isActive ? 1 : 0.38,
                scale: isActive ? 1 : 0.94,
                boxShadow: isActive ? "0 0 40px rgba(212,168,83,0.16)" : "0 0 0 rgba(0,0,0,0)",
              }}
              transition={{ duration: 0.35 }}
              className="absolute left-1/2 top-1/2 -ml-12 -mt-7 w-24 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 text-center text-xs uppercase tracking-[0.18em] text-white/55"
            >
              {node}
            </motion.div>
          </div>
        );
      })}

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-black/35 px-4 py-3 text-xs text-white/45">
        <span>Infrastructure always on</span>
        <span className="font-mono tabular-nums text-[#D4A853]">{intensity}%</span>
      </div>
    </div>
  );
}
