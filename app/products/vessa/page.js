"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useLocalStorage } from "react-use";
import { supabase } from "../../../lib/supabase";

const INSIGHT_CARDS = [
  {
    title: "Revenue Pulse",
    value: "$148.2K",
    sub: "+12.4% vs last month",
    bars: [42, 64, 58, 80, 74],
  },
  {
    title: "Team Throughput",
    value: "71%",
    sub: "Execution capacity fragmented",
    bars: [84, 62, 48, 56, 43],
  },
  {
    title: "Pipeline Velocity",
    value: "19 days",
    sub: "Decision latency increasing",
    bars: [30, 34, 38, 41, 46],
  },
  {
    title: "Retention Signals",
    value: "At Risk",
    sub: "3 accounts need action",
    bars: [72, 68, 61, 58, 48],
  },
];

const EXECUTION_LOGS = [
  "Detected stalled onboarding handoff in client operations.",
  "Assigned owner and generated action brief.",
  "Drafted retention follow-up for at-risk account.",
  "Recovered unbilled change order from project thread.",
  "Reallocated spend toward highest-LTV acquisition segment.",
  "Generated SOP for repeated fulfillment exception.",
  "Resolved approval bottleneck before escalation.",
  "Execution loop closed. Founder approval ready.",
];

const SIGNALS = [
  {
    label: "Work about work",
    value: "60%",
    body: "of the week spent coordinating, chasing, switching, and reconstructing reality.",
  },
  {
    label: "Revenue leakage",
    value: "7%",
    body: "lost to complexity, friction, and execution drag hiding in plain sight.",
  },
  {
    label: "Toggle tax",
    value: "1,200",
    body: "tool switches a day in fragmented environments. That is not work. That is re-entry.",
  },
  {
    label: "Time loss",
    value: "6.8 hrs",
    body: "vanishing weekly into coordination overhead instead of forward motion.",
  },
];

const STACK_NODES = ["Slack", "ClickUp", "CRM", "Email", "Docs", "Billing"];

function SectionEyebrow({ children }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/45">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(74,222,128,0.8)]" />
      {children}
    </div>
  );
}

function GridCard({ className = "", children, ...props }) {
  return (
    <div
      {...props}
      className={`rounded-[24px] border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

function InsightCard({ card, index, executionMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, rotate: index % 2 === 0 ? -2 : 2, scale: 0.98 }}
      animate={
        executionMode
          ? {
              opacity: 0,
              y: -50,
              x: index % 2 === 0 ? -160 : 160,
              rotate: index % 2 === 0 ? -10 : 10,
              scale: 0.9,
              filter: "blur(8px)",
            }
          : {
              opacity: 1,
              y: 0,
              x: 0,
              rotate: index % 2 === 0 ? -1.25 : 1.25,
              scale: 1,
              filter: "blur(0px)",
            }
      }
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      className="pointer-events-none absolute"
      style={{
        top: `${index * 44}px`,
        left: index % 2 === 0 ? `${index * 20}px` : `auto`,
        right: index % 2 !== 0 ? `${index * 16}px` : `auto`,
        width: "min(100%, 420px)",
      }}
    >
      <GridCard className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/35">{card.title}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{card.value}</p>
            <p className="mt-1 text-sm text-white/45">{card.sub}</p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-white/40">
            Insight
          </div>
        </div>

        <div className="mt-5 flex h-24 items-end gap-2">
          {card.bars.map((bar, i) => (
            <motion.div
              key={`${card.title}-${i}`}
              initial={{ height: 10 }}
              animate={{ height: `${bar}%` }}
              transition={{ duration: 0.8, delay: i * 0.04 }}
              className="relative flex-1 overflow-hidden rounded-t-md border border-white/5 bg-white/[0.05]"
            >
              <div className="absolute inset-x-0 bottom-0 rounded-t-md bg-gradient-to-t from-white/50 via-white/15 to-transparent" />
            </motion.div>
          ))}
        </div>
      </GridCard>
    </motion.div>
  );
}

function ExecutionPanel({ logs }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 18, scale: 0.98 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <GridCard className="overflow-hidden">
        <div className="border-b border-white/10 bg-black/40 px-5 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-white/35">
              Execution Mode // Closed Loop Active
            </div>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r">
            <div className="rounded-[18px] border border-emerald-400/20 bg-emerald-400/[0.06] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-300/70">
                    Decision Log
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
                    Stop looking at data. Start deploying it.
                  </p>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-gradient-to-r from-emerald-400/10 to-fuchsia-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white">
                  Live
                </div>
              </div>

              <div className="mt-4 space-y-3 font-mono text-[13px] leading-5 text-emerald-200/85">
                {logs.map((log, i) => (
                  <motion.div
                    key={`${log}-${i}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                    className="flex gap-3"
                  >
                    <span className={i === logs.length - 1 ? "text-fuchsia-300" : "text-emerald-400"}>&gt;</span>
                    <span>{log}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">Staged Outcome</p>
            <div className="mt-4 rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-white/45">Recovered revenue</p>
                  <p className="mt-1 text-3xl font-semibold tracking-tight text-white">+$14,200</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/40">
                  Prepared
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm text-white/60">
                <div className="flex items-center justify-between rounded-xl border border-white/8 bg-black/20 px-3 py-2">
                  <span>Unbilled scope change surfaced</span>
                  <span className="text-white">Ready</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/8 bg-black/20 px-3 py-2">
                  <span>Client follow-up drafted</span>
                  <span className="text-white">Ready</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/8 bg-black/20 px-3 py-2">
                  <span>Task owner reassigned</span>
                  <span className="text-white">Executed</span>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] px-3 py-2 text-xs text-emerald-200/90">
                StudioFlows does the work first. You review the consequence.
              </div>
            </div>
          </div>
        </div>
      </GridCard>
    </motion.div>
  );
}

function CircuitMap({ intensity }) {
  const activeCount = Math.max(1, Math.min(STACK_NODES.length, Math.round((intensity / 100) * STACK_NODES.length)));

  return (
    <div className="relative mx-auto h-[360px] w-full max-w-[760px] overflow-hidden rounded-[28px] border border-white/10 bg-black/35 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(74,222,128,0.22),transparent_20%),radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.05),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:34px_34px]" />

      <motion.div
        animate={{ scale: [1, 1.045, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/30 bg-emerald-400/[0.08] shadow-[0_0_120px_rgba(74,222,128,0.35),0_0_80px_rgba(232,121,249,0.25)]"
      >
        <div className="absolute inset-3 rounded-full border border-white/10 bg-black/50" />
        <div className="absolute inset-[26px] rounded-full bg-gradient-to-br from-emerald-300/80 via-emerald-200/20 to-transparent blur-[1px]" />
      </motion.div>

      {STACK_NODES.map((node, index) => {
        const angle = (index / STACK_NODES.length) * Math.PI * 2 - Math.PI / 2;
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
              <div className={`h-px w-full ${isActive ? "bg-gradient-to-r from-emerald-400/80 to-transparent" : "bg-white/10"}`} />
            </motion.div>

            <motion.div
              initial={false}
              animate={{
                x,
                y,
                opacity: isActive ? 1 : 0.38,
                scale: isActive ? 1 : 0.94,
                boxShadow: isActive
                  ? "0 0 40px rgba(74,222,128,0.18)"
                  : "0 0 0 rgba(0,0,0,0)",
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
        <span>Intensity: {intensity}%</span>
      </div>
    </div>
  );
}

export default function Home() {
  const auditCardRef = useRef(null);
  const heroEmailRef = useRef(null);
  const auditEmailRef = useRef(null);
  const auditTextareaRef = useRef(null);
  const [email, setEmail] = useState("");
  const [audit, setAudit] = useState("");
  const [status, setStatus] = useState("idle");
  const [executionMode, setExecutionMode] = useState(false);
  const [intensity, setIntensity] = useState(64);
  const [hydrated, setHydrated] = useState(false);
  const [slots, setSlots] = useLocalStorage("sf_protocol_slots", 42);
  const [founderNumber, setFounderNumber] = useLocalStorage("sf_founder_number", null);
  const [logs, setLogs] = useState(EXECUTION_LOGS.slice(0, 5));
  const [mouseGlow, setMouseGlow] = useState({ x: 50, y: 22 });

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    heroEmailRef.current?.focus();
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMouseGlow({ x, y });
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    let index = 5;
    const interval = setInterval(() => {
      setLogs((prev) => {
        const next = EXECUTION_LOGS[index % EXECUTION_LOGS.length];
        index += 1;
        return [...prev.slice(-5), next];
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const runCounter = () => {
      const timeout = window.setTimeout(() => {
        setSlots((prev) => {
          if (typeof prev !== "number") return 42;
          if (prev <= 5) return prev;
          const r = Math.random();
          if (r > 0.94) return prev + 1;
          if (r > 0.72) return prev - 2;
          return prev - 1;
        });
        runCounter();
      }, Math.random() * 50000 + 18000);

      return timeout;
    };

    const timeout = runCounter();
    return () => window.clearTimeout(timeout);
  }, [setSlots]);

  const activeFounderNumber = useMemo(() => {
    if (founderNumber) return founderNumber;
    return null;
  }, [founderNumber]);

  const visibleSlots = hydrated && typeof slots === "number" ? slots : 42;
  const visibleFounderNumber = hydrated ? activeFounderNumber : null;

  const handleIntent = () => {
    setSlots((prev) => {
      if (typeof prev !== "number") return 41;
      return prev > 5 ? prev - 1 : prev;
    });
  };

  const scrollToAuditForm = () => {
    const target = window.innerWidth < 1024 ? auditCardRef.current : document.getElementById("audit-form");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const focusAuditQuestion = () => {
    window.setTimeout(() => {
      auditTextareaRef.current?.focus();
    }, 250);
  };

  const handleHeroSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) {
      heroEmailRef.current?.focus();
      return;
    }

    scrollToAuditForm();
    focusAuditQuestion();
  };

  const handleSubmit = async () => {
    const normalizedEmail = email.trim();
    const normalizedAudit = audit.trim();

    if (!normalizedEmail || !normalizedAudit) return;

    setStatus("loading");
    if (!supabase) {
      setStatus("error");
      return;
    }

    const { data, error } = await supabase
      .from("vessa_sessions")
      .insert([
        {
          email: normalizedEmail,
          bottleneck: normalizedAudit,
          status: "initiated",
        },
      ])
      .select()
      .single();

    if (error || !data) {
      setStatus("error");
      return;
    }

    setTimeout(() => {
      const params = new URLSearchParams({
        session: String(data.id),
        email: normalizedEmail,
      });

      window.location.href = `https://vessa.studioflows.co/?${params.toString()}`;
    }, 200);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050607] text-[#F5F7F7]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(180deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_2px,transparent_4px)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background: `radial-gradient(circle at ${mouseGlow.x}% ${mouseGlow.y}%, rgba(232,121,249,0.06), transparent 18%), radial-gradient(circle at 50% 12%, rgba(255,255,255,0.08), transparent 18%), radial-gradient(circle at 50% 40%, rgba(16,185,129,0.09), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.02), transparent 30%)`,
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[140px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-8 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between py-4 sm:py-5">
          <div className="flex items-center">
            <img
              src="/vessa white v2.svg"
              alt="Vessa"
              className="h-12 w-auto object-contain opacity-90 drop-shadow-[0_0_14px_rgba(232,121,249,0.22)] sm:h-14"
            />
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-1.5 py-1.5">
              {[
                ["StudioFlows", "/"],
                ["Axiom", "/axiom"],
                ["Products", "/products"],
                ["Enterprise", "/enterprise"],
                ["Apply", "/apply"],
                ["Vessa", "/vessa"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-white/75 transition hover:bg-white/[0.07] hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 px-1.5">
              <button
                onClick={() => setExecutionMode(false)}
                className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.24em] transition ${
                  !executionMode ? "bg-white text-black" : "bg-black/20 text-white/60"
                }`}
              >
                Insight Mode
              </button>
              <button
                onClick={() => setExecutionMode(true)}
                className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.24em] transition ${
                  executionMode ? "bg-emerald-400 text-black" : "bg-black/20 text-white/60"
                }`}
              >
                Execution Mode
              </button>
            </div>
          </div>
        </nav>

        <section className="pb-16 pt-12 lg:pt-16">
          <div className="mx-auto max-w-[980px] text-center">
            <SectionEyebrow>Protocol Access Queue</SectionEyebrow>
            <h1 className="text-balance text-[2.4rem] font-semibold leading-[0.92] tracking-[-0.04em] sm:text-[3rem] lg:text-[6.5rem]">
              The founder is the operating system.
              <br />
              <span className="text-white/42">Until they’re not.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-[760px] text-balance text-[1.05rem] leading-7 text-white/70 sm:text-[1.15rem]">
              Most businesses do not break from lack of effort. They break because execution never closes.
              StudioFlows turns operational noise into ready-to-release outcomes across the tools you already use.
            </p>

            <p className="mt-4 text-lg text-white">
              This isn’t inefficiency.
            </p>
            <p className="text-lg text-white/30">
              It’s execution decay.
            </p>
            <p className="mt-4 font-mono text-xs text-white/35">
              Not every system qualifies for execution.
            </p>

            <div className="mx-auto mt-10 max-w-md">
              <form
                onSubmit={handleHeroSubmit}
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-2"
              >
                <input
                  ref={heroEmailRef}
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-white/30"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-fuchsia-400 px-4 py-2 text-xs uppercase tracking-[0.2em] text-black"
                >
                  Start
                </button>
              </form>

              <p className="mt-3 text-center text-xs text-white/35">
                Enter the execution layer
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-[11px] uppercase tracking-[0.26em] text-white/38">
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">Decision-Driven</span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">Approval-Based</span>
              <span className="rounded-full border border-emerald-400/30 bg-gradient-to-r from-emerald-400/10 via-fuchsia-400/10 to-transparent px-3 py-2 text-white">Cross-System Control</span>
            </div>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <div className="relative min-h-[420px]">
                <AnimatePresence mode="wait">
                  {!executionMode ? (
                    <motion.div
                      key="insight"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                      className="relative h-[420px]"
                    >
                      {INSIGHT_CARDS.map((card, index) => (
                        <InsightCard key={card.title} card={card} index={index} executionMode={executionMode} />
                      ))}
                    </motion.div>
                  ) : (
                    <ExecutionPanel key="execution" logs={logs} />
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-6">
              <GridCard className="p-5 sm:p-6">
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/38">The Gap</p>
                <div className="mt-4 space-y-4">
                  <p className="text-[2.2rem] font-semibold leading-tight tracking-tight text-white sm:text-[2rem]">
                    You don’t have a data problem.
                    <br />
                    You have an execution gap.
                  </p>
                  <p className="text-sm leading-7 text-white/55 sm:text-[15px]">
                    Dashboards show metrics. CRMs track activity. Project tools organize tasks. None of them decide what matters, package the action, and close the loop.
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Stalled work",
                    "Unclear ownership",
                    "Scope drift",
                    "Revenue sitting in threads",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/8 bg-black/25 px-4 py-3 text-sm text-white/58">
                      {item}
                    </div>
                  ))}
                </div>
              </GridCard>

              <GridCard className="p-6 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-white/38">Mode Switch</p>
                    <p className="mt-2 text-xl font-semibold tracking-tight text-white">From insight to execution</p>
                  </div>
                  <button
                    onClick={() => setExecutionMode((v) => !v)}
                    className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.24em] transition ${
                      executionMode
                        ? "border-emerald-400/30 bg-gradient-to-r from-emerald-400 to-fuchsia-400 text-black"
                        : "border-white/10 bg-white/[0.03] text-white/58"
                    }`}
                  >
                    {executionMode ? "Execution Active" : "Deploy Execution"}
                  </button>
                </div>

                <div className="mt-5 rounded-2xl border border-white/8 bg-black/25 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-white/52">The system does the work first. You review the consequence.</p>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-white/35">
                      {executionMode ? "Closed Loop" : "Observation Layer"}
                    </span>
                  </div>
                </div>
              </GridCard>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <SectionEyebrow>Founder Reality</SectionEyebrow>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Work doesn’t slow down.
                <br />
                <span className="text-white/42">It waits.</span>
              </h2>
              <div className="mt-6 space-y-4 text-base leading-7 text-white/56">
                <p>On decisions. On follow-up. On ownership. On context nobody else fully has.</p>
                <p>The founder becomes the router for correctness. That works until complexity compounds. Then the business starts moving at the speed of manual follow-through.</p>
              </div>
            </div>

            <GridCard className="p-6 sm:p-7">
              <div className="grid gap-5 sm:grid-cols-2">
                {SIGNALS.map((signal) => (
                  <div
                    key={signal.label}
                    className={
                      signal.label === "Work about work"
                        ? "rounded-[20px] border border-emerald-400/30 bg-emerald-400/[0.06] p-4"
                        : "rounded-[20px] border border-white/8 bg-black/20 p-4"
                    }
                  >
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">{signal.label}</p>
                    <p className="mt-3 text-4xl font-semibold tracking-tight text-white">{signal.value}</p>
                    <p className="mt-3 text-sm leading-5 text-white/50">{signal.body}</p>
                  </div>
                ))}
              </div>
            </GridCard>
          </div>
        </section>

        <section className="py-14">
          <GridCard className="overflow-hidden p-6 sm:p-8">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <SectionEyebrow>Live Circuit</SectionEyebrow>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  The stack is not the problem.
                  <br />
                  <span className="text-white/42">The missing layer is execution.</span>
                </h2>
                <p className="mt-6 max-w-[520px] text-base leading-7 text-white/56">
                  StudioFlows sits above the tools you already use, identifies what matters, prepares the work, stages the outcome, and learns from what happens next.
                </p>

                <div className="mt-8">
                  <div className="mb-3 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.24em] text-white/35">
                    <span>Intelligence Slider</span>
                    <span>{intensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={intensity}
                    onChange={(e) => setIntensity(Number(e.target.value))}
                    className="h-[3px] w-full accent-fuchsia-400"
                  />
                  <p className="mt-3 text-sm text-white/45">
                    Slide from visibility to autonomy. Watch isolated nodes become one operating system.
                  </p>
                </div>
              </div>

              <CircuitMap intensity={intensity} />
            </div>
          </GridCard>
        </section>

        <section className="py-14">
          <GridCard className="p-6 sm:p-8">
            <div className="mx-auto max-w-[980px]">
              <SectionEyebrow>Axiom Layer</SectionEyebrow>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                The quiet force behind every product.
              </h2>

              <div className="mt-6 space-y-5 text-base leading-7 text-white/58 sm:text-[17px]">
                <p>
                  While most platforms are busy adding features, we focused on something else: a system that gets
                  things done. Not just ideas or insights, but real movement that compounds over time.
                </p>
                <p>
                  Products like Vessa are what you see on the surface: clean, intuitive, responsive. Underneath,
                  Axiom is always working, connecting context, preserving alignment, and making sure nothing critical
                  falls through the cracks.
                </p>
                <p>
                  We built this foundation intentionally. Instead of isolated tools, each product is launched on top of
                  shared intelligence, so everything starts smarter, moves faster, and works together from day one.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  "Connected by design",
                  "Compounding execution",
                  "Friction removed at the system level",
                ].map((line) => (
                  <div
                    key={line}
                    className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-white/56"
                  >
                    {line}
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[20px] border border-emerald-400/25 bg-emerald-400/[0.06] px-5 py-4">
                <p className="text-sm uppercase tracking-[0.22em] text-emerald-200/70">That is the difference</p>
                <p className="mt-2 text-lg leading-7 text-white">
                  Not more software.
                  <br />
                  <span className="text-white/72">A better system underneath it.</span>
                </p>
              </div>
            </div>
          </GridCard>
        </section>

        <section className="py-14">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
            <GridCard className="p-6 sm:p-7">
              <SectionEyebrow>Execution Loop</SectionEyebrow>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["01", "Detect", "What is broken, stalled, late, unclear, or leaking value."],
                  ["02", "Prepare", "Draft the message, build the task, structure the handoff, package the action."],
                  ["03", "Approve", "The human checkpoint where consequence stays accountable."],
                  ["04", "Execute", "StudioFlows runs the action inside your stack and records the result."],
                ].map(([step, title, body]) => (
                  <div
                    key={step}
                    className={
                      title === "Approve"
                        ? "rounded-[20px] border border-emerald-400/30 bg-emerald-400/[0.06] p-4"
                        : "rounded-[20px] border border-white/8 bg-black/20 p-4"
                    }
                  >
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/30">{step}</p>
                    <p className="mt-3 text-2xl font-semibold tracking-tight text-white">{title}</p>
                    <p className="mt-3 text-sm leading-5 text-white/50">{body}</p>
                  </div>
                ))}
              </div>
            </GridCard>

            <GridCard className="p-6 sm:p-7">
              <SectionEyebrow>What it feels like</SectionEyebrow>
              <h3 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                A high-functioning COO that doesn’t miss, doesn’t delay, and doesn’t need to be chased.
              </h3>
              <div className="mt-7 space-y-3">
                {[
                  "Finds the work nobody formally owns.",
                  "Surfaces revenue hidden inside operational drag.",
                  "Prepares the action before the decision meeting happens.",
                  "Turns fragmented activity into a morning brief of what is already handled.",
                ].map((line) => (
                  <div key={line} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-white/56">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </GridCard>
          </div>
        </section>

        <section className="py-14">
          <GridCard id="audit-form" className="overflow-hidden p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div>
                <SectionEyebrow>Protocol Access</SectionEyebrow>
                <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                  Run your first execution audit.
                </h2>
                <p className="mt-5 max-w-full text-base leading-7 text-white/56 sm:max-w-[640px]">
                  Don’t join a waitlist. Enter the queue with a real operational bottleneck. We want the decision that still depends on you every week and should not.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[20px] border border-white/8 bg-black/20 p-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/30">Available invites</p>
                    <p className="mt-3 text-4xl font-semibold tracking-tight text-white">{visibleSlots}</p>
                    <p className="mt-3 text-sm text-white/45">Execution slots unassigned.</p>
                    <p className="mt-2 text-xs text-white/30">Active founders being processed: 17</p>
                  </div>
                  <div className="rounded-[20px] border border-white/8 bg-black/20 p-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/30">System Architect</p>
                    <p className="mt-3 text-4xl font-semibold tracking-tight text-white">{visibleFounderNumber || "Pending"}</p>
                    <p className="mt-3 text-sm text-white/45">Assigned when identity clears.</p>
                  </div>
                </div>
              </div>

              <div
                ref={auditCardRef}
                className="rounded-[24px] border border-emerald-400/14 bg-emerald-400/[0.04] p-5 shadow-[0_0_0_1px_rgba(74,222,128,0.06),0_20px_80px_rgba(0,0,0,0.45)]"
              >
                <form
                  className="space-y-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit();
                  }}
                >
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-white/35">Email</label>
                    <input
                      ref={auditEmailRef}
                      value={email}
                      onFocus={handleIntent}
                      onMouseEnter={handleIntent}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Verify Identity"
                      className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-emerald-400/45"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-white/35">Founder Audit</label>
                    <textarea
                      ref={auditTextareaRef}
                      value={audit}
                      onFocus={handleIntent}
                      onChange={(e) => setAudit(e.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          handleSubmit();
                        }
                      }}
                      rows={5}
                      placeholder="What is the one operational decision you make every week that you wish was automated?"
                      className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-emerald-400/45"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-fuchsia-400 px-5 py-4 text-sm font-medium uppercase tracking-[0.22em] text-black transition hover:translate-y-[-1px] hover:shadow-[0_0_40px_rgba(74,222,128,0.18)]"
                  >
                    {status === "loading" ? "Initializing..." : "Start"}
                  </button>

                  <div className="rounded-2xl border border-white/8 bg-black/30 p-4 font-mono text-[12px] leading-5 text-white/58">
                    {status === "idle" && (
                      <>
                        <div>&gt; Intake open.</div>
                        <div>&gt; Unverified identities are ignored.</div>
                        <div>&gt; Founder audit improves queue priority.</div>
                      </>
                    )}
                    {status === "loading" && (
                      <>
                        <div>&gt; Analyzing execution bottleneck...</div>
                        <div>&gt; Detecting repetitive decision loop...</div>
                        <div>&gt; Estimating recoverable hours...</div>
                      </>
                    )}
                    {status === "submitted" && (
                      <>
                        <div>&gt; Bottleneck classified.</div>
                        <div>&gt; Estimated recovery: 9.4 hrs/week.</div>
                        <div>&gt; Status: Under review.</div>
                        <div>&gt; Identity submitted to protocol.</div>
                      </>
                    )}
                    {status === "duplicate" && (
                      <>
                        <div>&gt; Identity already present in queue.</div>
                        <div>&gt; Status preserved. No duplicate created.</div>
                      </>
                    )}
                    {status === "error" && (
                      <>
                        <div>&gt; Verification failed.</div>
                        <div>&gt; Retry once systems stabilize.</div>
                      </>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </GridCard>
        </section>

        <section className="py-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">End State</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
            The business runs through StudioFlows.
          </h2>
          <p className="mx-auto mt-5 max-w-[720px] border-l border-fuchsia-400/20 pl-4 text-balance text-base leading-7 text-white/60 sm:text-lg">
            You stop checking five systems. You stop being the routing layer. What should happen, does.
          </p>
          <div className="mt-8 flex items-center justify-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-[11px] uppercase tracking-[0.24em] text-white/45 transition hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-[11px] uppercase tracking-[0.24em] text-white/45 transition hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
