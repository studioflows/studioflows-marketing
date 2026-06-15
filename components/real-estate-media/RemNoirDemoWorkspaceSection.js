"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { REM_COPY, REM_DEMO_JOBS } from "@/lib/real-estate-media/rem-landing-content";
import {
  RemSection,
  RemTerminalChrome,
  useRemReducedMotion,
} from "@/components/real-estate-media/rem-noir-primitives";
import { REM_BODY, REM_H2, REM_RESOLVED } from "@/components/real-estate-media/rem-noir-tokens";

export function RemNoirDemoWorkspaceSection() {
  const reduce = useRemReducedMotion();
  const [connected, setConnected] = useState(false);
  const [activeJobId, setActiveJobId] = useState(REM_DEMO_JOBS[0].id);

  const activeJob = REM_DEMO_JOBS.find((j) => j.id === activeJobId) ?? REM_DEMO_JOBS[0];
  const lines = connected ? activeJob.connected : activeJob.chaos;

  return (
    <RemSection id="demo-workspace">
      <div className="lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-12">
        <div>
          <h2 className={REM_H2}>{REM_COPY.demo.headline}</h2>
          <div className={`mt-4 space-y-3 lg:max-w-xl ${REM_BODY}`}>
            {REM_COPY.demo.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={() => setConnected(false)}
              className={`rounded border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] ${
                !connected
                  ? "border-red-800/60 bg-red-950/25 text-red-200/90"
                  : "border-zinc-800 text-zinc-500"
              }`}
            >
              {REM_COPY.demo.chaosMode}
            </button>
            <button
              type="button"
              onClick={() => setConnected(true)}
              className={`rounded border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] ${
                connected
                  ? "border-cyan-800/50 bg-cyan-950/25 text-cyan-200/90"
                  : "border-zinc-800 text-zinc-500"
              }`}
            >
              {REM_COPY.demo.connectedMode}
            </button>
          </div>
        </div>

        <div className="mt-6 lg:mt-0">
          <RemTerminalChrome title="demo.workspace" right={connected ? "connected" : "chaos"}>
            <div className="mb-3 flex flex-wrap gap-2">
              {REM_DEMO_JOBS.map((job) => (
                <button
                  key={job.id}
                  type="button"
                  onClick={() => setActiveJobId(job.id)}
                  className={`rounded border px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] ${
                    job.id === activeJobId
                      ? "border-zinc-600 bg-zinc-900 text-zinc-200"
                      : "border-zinc-800 text-zinc-600"
                  }`}
                >
                  {job.address}
                </button>
              ))}
            </div>

            <motion.div
              key={`${activeJobId}-${connected}`}
              initial={reduce ? false : { opacity: 0.85 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className={`rounded border p-3 ${
                connected ? "border-cyan-900/40 bg-cyan-950/10" : "border-zinc-800 bg-zinc-950/50"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-zinc-100">{activeJob.address}</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-500">
                  {activeJob.window}
                </p>
              </div>
              <p className="mt-2 text-xs text-zinc-500">{activeJob.services.join(" · ")}</p>
              <ul className="mt-3 space-y-1.5">
                {lines.map((line) => (
                  <li
                    key={line}
                    className={`font-mono text-[11px] ${connected ? REM_RESOLVED : "text-red-300/75"}`}
                  >
                    {connected ? "✓" : "·"} {line}
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded border border-zinc-800 bg-black">
              <Image
                src="/product/dashboard.png"
                alt="Sample media operations workspace"
                fill
                className={`object-cover object-left-top transition duration-700 ${
                  connected ? "opacity-90 saturate-[0.85]" : "opacity-60 saturate-50 contrast-125"
                }`}
                sizes="(max-width: 1024px) 100vw, 520px"
              />
              {!connected ? (
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(248,113,113,0.12),transparent_55%)]" />
              ) : (
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,211,238,0.08),transparent_55%)]" />
              )}
            </div>
          </RemTerminalChrome>
        </div>
      </div>
    </RemSection>
  );
}
