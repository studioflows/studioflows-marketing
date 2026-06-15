"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { REM_COPY, REM_FRICTION_STAGES } from "@/lib/real-estate-media/rem-landing-content";
import {
  RemSection,
  RemTerminalChrome,
  useRemReducedMotion,
} from "@/components/real-estate-media/rem-noir-primitives";
import { REM_BODY, REM_H2, REM_RESOLVED } from "@/components/real-estate-media/rem-noir-tokens";

function FrictionParticle({ x, y }) {
  return (
    <motion.span
      className="absolute h-1 w-1 rounded-full bg-red-500/70"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0.9, scale: 1 }}
      animate={{ opacity: 0, scale: 0, y: 12, x: (Math.random() - 0.5) * 24 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    />
  );
}

export function RemNoirFrictionSection() {
  const reduce = useRemReducedMotion();
  const [brokenIds, setBrokenIds] = useState(new Set());
  const [connected, setConnected] = useState(false);
  const [particles, setParticles] = useState([]);

  const toggleStage = (id) => {
    if (connected) return;
    setBrokenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    if (!reduce) {
      setParticles(
        Array.from({ length: 6 }, (_, i) => ({
          id: `${id}-${Date.now()}-${i}`,
          x: 20 + Math.random() * 60,
          y: 15 + Math.random() * 55,
        }))
      );
      window.setTimeout(() => setParticles([]), 600);
    }
  };

  const handleConnect = () => {
    setConnected(true);
    setBrokenIds(new Set());
  };

  return (
    <RemSection id="real-friction">
      <div className="lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-12">
        <div>
          <h2 className={REM_H2}>{REM_COPY.friction.headline}</h2>
          <div className={`mt-5 max-w-3xl space-y-3 ${REM_BODY}`}>
            {REM_COPY.friction.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div className="mt-8 lg:mt-0">
          <RemTerminalChrome
            title={connected ? REM_COPY.friction.connectedLabel : REM_COPY.friction.simulatorLabel}
            right={connected ? "synced" : "tap stages"}
          >
            <div className="relative min-h-[280px]">
              <AnimatePresence>
                {particles.map((p) => (
                  <FrictionParticle key={p.id} x={p.x} y={p.y} />
                ))}
              </AnimatePresence>

              <div className="flex flex-wrap gap-2">
                {REM_FRICTION_STAGES.map((stage) => {
                  const isBroken = brokenIds.has(stage.id);
                  const isResolved = connected;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => toggleStage(stage.id)}
                      className={`rounded border px-3 py-2 text-left transition ${
                        isResolved
                          ? "border-cyan-800/50 bg-cyan-950/20 text-cyan-200/90"
                          : isBroken
                            ? "border-red-900/60 bg-red-950/20 text-red-200/80"
                            : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-600"
                      }`}
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em]">{stage.label}</p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {isResolved ? stage.status : isBroken ? stage.broken : stage.status}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 rounded border border-zinc-800/80 bg-black/40 p-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-600">
                  124 maple · workflow trace
                </p>
                <motion.div
                  className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-900"
                  animate={connected ? { opacity: 1 } : { opacity: 0.7 }}
                >
                  <motion.div
                    className={`h-full ${connected ? "bg-cyan-500/70" : "bg-red-700/60"}`}
                    initial={{ width: "18%" }}
                    animate={{ width: connected ? "100%" : `${22 + brokenIds.size * 14}%` }}
                    transition={{ duration: connected ? 0.9 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                </motion.div>
              </div>

              <button
                type="button"
                onClick={handleConnect}
                className={`mt-4 w-full rounded border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] transition ${
                  connected
                    ? `border-cyan-700/50 bg-cyan-950/30 ${REM_RESOLVED}`
                    : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-cyan-700/40"
                }`}
              >
                {REM_COPY.friction.connectCta}
              </button>
            </div>
          </RemTerminalChrome>
        </div>
      </div>
    </RemSection>
  );
}
