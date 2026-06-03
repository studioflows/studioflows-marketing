"use client";

import Image from "next/image";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  FINAL_BODY,
  FINAL_BODY_BEAT,
  FINAL_BODY_LEAD,
  FINAL_BODY_PUNCH,
  FINAL_BODY_SM,
  FINAL_CARD,
  FINAL_CARD_ACTIVE,
  FINAL_CLUSTER_GAP,
  FINAL_CLUSTER_INNER,
  FINAL_CONTAINER,
  FINAL_CONTAINER_SINGLE,
  FINAL_CTA_PRIMARY,
  FINAL_CTA_SECONDARY,
  FINAL_EYEBROW,
  FINAL_H1,
  FINAL_H2,
  FINAL_H3,
  FINAL_INDEX,
  FINAL_MUTED_PANEL,
  FINAL_PAUSE,
  FINAL_ROLE_LINE,
  FINAL_SECTION,
  FINAL_SECTION_DRAMATIC,
  FINAL_SECTION_TIGHT,
  FINAL_SIGNAL_DOT,
  FINAL_STAGE,
  FINAL_STAGE_DARK,
} from "@/components/home/final-home-tokens";
import { RevealLine, RevealSection } from "@/components/home/InitiationMotionPrimitives";

/*
  ───────────────────────────────────────────────────────────────────────────
  PROGRESSION — the page is access-gated. Each micro-action the viewer takes
  (tracing a symptom, naming a dependency, breaking the surface, asking the
  system what it saw) logs a SIGNAL and raises CLEARANCE. Downstream parts of
  the page stay sealed until clearance is earned, then decrypt on screen.

  Psychology: you don't get to meet the system, or get the ask, until you've
  confronted the pattern yourself. Engagement compounds. (Mr. Robot: clearance,
  daemons, override.)  Reduced-motion / no-provider → everything open.
  ───────────────────────────────────────────────────────────────────────────
*/

// Total trackable micro-actions across the journey (drives the clearance meter).
const PROGRESSION_TOTAL = 4;

const ProgressionFallback = {
  count: PROGRESSION_TOTAL,
  has: () => true,
  mark: () => {},
};

const ProgressionContext = createContext(ProgressionFallback);

function useProgression() {
  return useContext(ProgressionContext);
}

export function ProgressionProvider({ children }) {
  const [actions, setActions] = useState(() => new Set());

  const mark = useCallback((key) => {
    setActions((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      count: actions.size,
      has: (key) => actions.has(key),
      mark,
    }),
    [actions, mark],
  );

  return (
    <ProgressionContext.Provider value={value}>
      {children}
      <ClearanceHud count={value.count} />
    </ProgressionContext.Provider>
  );
}

// Fixed, low-key terminal readout. Appears only after the first signal so it
// doesn't clutter the cold open; reinforces "there is more to unlock."
function ClearanceHud({ count }) {
  if (count <= 0) return null;
  const cells = Array.from({ length: PROGRESSION_TOTAL });
  const full = count >= PROGRESSION_TOTAL;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pointer-events-none fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-[#05070B]/80 px-3 py-2 backdrop-blur-sm"
      aria-hidden="true"
    >
      <span
        className="font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: full ? "#D4A853" : "#DB2777" }}
      >
        {full ? "clearance" : "access"}
      </span>
      <span className="flex gap-1">
        {cells.map((_, i) => (
          <span
            key={i}
            className="h-2 w-2"
            style={{
              backgroundColor: i < count ? (full ? "#D4A853" : "#DB2777") : "rgba(255,255,255,0.14)",
              boxShadow: i < count ? `0 0 10px ${full ? "rgba(212,168,83,0.6)" : "rgba(219,39,119,0.6)"}` : "none",
            }}
          />
        ))}
      </span>
      <span className="font-mono text-[10px] tabular-nums tracking-[0.1em] text-[#9B9894]">
        {Math.min(count, PROGRESSION_TOTAL)}/{PROGRESSION_TOTAL}
      </span>
    </motion.div>
  );
}

// Seals a downstream part of the page until CLEARANCE >= minCount. The viewer
// either earns it upstream (auto-decrypts — the dopamine hit) or overrides the
// lock manually (one tap). Reduced-motion or no provider → always open.
export function LockedReveal({ minCount = 1, code = "section", children }) {
  const reduce = useReducedMotion();
  const { count } = useProgression();
  const [override, setOverride] = useState(false);
  const open = reduce || count >= minCount || override;
  const remaining = Math.max(minCount - count, 0);

  return (
    <div className="relative">
      <div
        className={
          open
            ? "transition-all duration-[900ms] ease-out"
            : "pointer-events-none select-none opacity-25 blur-[9px] saturate-0 transition-all duration-700"
        }
        aria-hidden={open ? undefined : true}
      >
        {children}
      </div>

      <AnimatePresence>
        {!open ? (
          <motion.button
            type="button"
            onClick={() => setOverride(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(12px)" }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-[#05070B]/72 px-6 text-center backdrop-blur-[2px]"
            aria-label={`Locked. ${remaining} more signal${remaining === 1 ? "" : "s"} required, or override to continue.`}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#DB2777]">
              [ access locked · {code} ]
            </span>
            <span className="font-mono text-[11px] leading-5 tracking-[0.08em] text-[#9B9894]">
              {remaining} signal{remaining === 1 ? "" : "s"} required to decrypt
            </span>
            <span className="mt-1 inline-flex items-center gap-2 rounded-full border border-[#D4A853]/40 bg-[#D4A853]/[0.06] px-4 py-2 font-mono text-[11px] tracking-[0.14em] text-[#D4A853]">
              &gt; override_lock
            </span>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function AmbientShell({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030304] text-[#E8E6E3]">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:72px_72px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-32 bg-gradient-to-b from-[#030304] to-transparent"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

const STUDIOFLOWS_LOGO_SRC = "/StudioFlows logo white (1200 x 675 px).png";

function StudioFlowsLogoMark({ className = "" }) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <Image
        src={STUDIOFLOWS_LOGO_SRC}
        alt="StudioFlows"
        width={1200}
        height={675}
        className="h-7 w-auto sm:h-8"
        priority
      />
    </div>
  );
}

// Abstract pressure field. No traceable line, no literal mark. A current in the
// dark that breathes, drifts toward the pointer, and intensifies then dissolves
// across the hero scroll. Felt more than seen.
function HeroForceField({ progress }) {
  const reduce = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const driftX = useSpring(px, { stiffness: 32, damping: 22, mass: 1.1 });
  const driftY = useSpring(py, { stiffness: 32, damping: 22, mass: 1.1 });

  // Pressure rises through the first half of the hero, then dissolves as the
  // reader is handed off to recognition.
  const fieldOpacity = useTransform(progress, [0, 0.55, 1], [0.92, 1, 0]);
  const bloomScale = useTransform(progress, [0, 1], [1, 1.12]);
  const fieldShift = useTransform(progress, [0, 1], [0, -70]);

  // Layered parallax depths so the field has dimensionality, not flatness.
  const nearX = useTransform(driftX, (v) => v);
  const nearY = useTransform(driftY, (v) => v);
  const farX = useTransform(driftX, (v) => v * -0.45);
  const farY = useTransform(driftY, (v) => v * -0.45);

  useEffect(() => {
    if (reduce) return undefined;
    function onMove(event) {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      px.set(nx * 46);
      py.set(ny * 34);
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, px, py]);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ opacity: reduce ? 0.7 : fieldOpacity, y: reduce ? 0 : fieldShift }}
      aria-hidden="true"
    >
      {/* Primary pressure bloom — magenta, off-center, the dominant signal. */}
      <motion.div
        className="absolute left-[56%] top-[14%] h-[86vh] w-[86vh] -translate-x-1/2 rounded-full blur-[110px]"
        style={{
          x: reduce ? 0 : nearX,
          y: reduce ? 0 : nearY,
          scale: reduce ? 1 : bloomScale,
          background:
            "radial-gradient(circle at 50% 50%, rgba(219,39,119,0.20) 0%, rgba(219,39,119,0.08) 38%, transparent 68%)",
        }}
        animate={reduce ? undefined : { opacity: [0.82, 1, 0.82] }}
        transition={
          reduce
            ? undefined
            : { duration: 12, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Intelligence undertone — blue, lower, quieter, counter-phase. */}
      <motion.div
        className="absolute left-[30%] top-[58%] h-[64vh] w-[64vh] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          x: reduce ? 0 : farX,
          y: reduce ? 0 : farY,
          background:
            "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.13) 0%, rgba(59,130,246,0.05) 42%, transparent 70%)",
        }}
        animate={reduce ? undefined : { opacity: [0.55, 0.85, 0.55] }}
        transition={
          reduce
            ? undefined
            : { duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1.6 }
        }
      />

      {/* Gold ember — emphasis only, a single warm point of truth. */}
      <motion.div
        className="absolute left-[64%] top-[40%] h-[26vh] w-[26vh] -translate-x-1/2 rounded-full blur-[80px]"
        style={{
          x: reduce ? 0 : nearX,
          y: reduce ? 0 : nearY,
          background:
            "radial-gradient(circle at 50% 50%, rgba(212,168,83,0.12) 0%, transparent 66%)",
        }}
        animate={reduce ? undefined : { opacity: [0.4, 0.7, 0.4] }}
        transition={
          reduce
            ? undefined
            : { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
        }
      />

      {/* Pressure signal line — magenta, right. The instrument is live. */}
      <motion.div
        className="absolute right-[16%] top-0 hidden h-full w-px sm:block"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(219,39,119,0.22) 32%, rgba(219,39,119,0.22) 68%, transparent 100%)",
        }}
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: [0, 0.9, 0.55, 0.9] }}
        transition={
          reduce
            ? undefined
            : { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
        }
      />

      {/* Intelligence signal line — blue, left, quieter. */}
      <motion.div
        className="absolute left-[9%] top-[18%] hidden h-[46%] w-px lg:block"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.16) 50%, transparent 100%)",
        }}
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: [0, 0.7, 0.4, 0.7] }}
        transition={
          reduce
            ? undefined
            : { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
        }
      />
    </motion.div>
  );
}

// The system's voice: one quiet line of telemetry. Not a dashboard — a single
// ambient readout that the operational layer is already watching.
function HeroPressureReadout() {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0.61);
  const [rising, setRising] = useState(true);

  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(() => {
      setValue((prev) => {
        const next = Math.min(0.94, Math.max(0.43, prev + (Math.random() - 0.42) * 0.06));
        setRising(next >= prev);
        return next;
      });
    }, 1500);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9B9894]/80">
      <span className="relative flex h-1.5 w-1.5">
        {!reduce ? (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#DB2777]/50" />
        ) : null}
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#DB2777]" />
      </span>
      <span>operational pressure</span>
      <span className="tabular-nums text-[#D4A853]">{value.toFixed(2)}</span>
      <span className="text-[#9B9894]/55" aria-hidden="true">
        {rising ? "/ rising" : "/ easing"}
      </span>
    </div>
  );
}

const GLITCH_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}=+*^?#%$&";

function randomGlyph() {
  return GLITCH_GLYPHS[Math.floor(Math.random() * GLITCH_GLYPHS.length)];
}

// Decode-on-load: each glyph churns through noise, then locks left-to-right into
// the real character. SSR/reduced-motion render the final text immediately.
function ScrambleText({ text, className = "", as: Tag = "span", delayMs = 0 }) {
  const reduce = useReducedMotion();
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (reduce) {
      setOutput(text);
      return undefined;
    }

    const len = text.length;
    const offset = Math.round(delayMs / 16);
    const queue = text.split("").map((char, index) => ({
      char,
      settle: offset + 26 + Math.round((index / Math.max(len, 1)) * 60) + Math.floor(Math.random() * 20),
      rand: randomGlyph(),
    }));

    let frame = 0;
    let raf = 0;

    const tick = () => {
      let settled = 0;
      const next = queue
        .map((q) => {
          if (q.char === " ") return " ";
          if (frame >= q.settle) {
            settled += 1;
            return q.char;
          }
          if (Math.random() < 0.3) q.rand = randomGlyph();
          return q.rand;
        })
        .join("");

      setOutput(next);
      frame += 1;

      if (settled < queue.length) {
        raf = requestAnimationFrame(tick);
      } else {
        setOutput(text);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delayMs, reduce]);

  return <Tag className={className}>{output}</Tag>;
}

function BlinkingCaret({ className = "" }) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <span className={`inline-block ${className}`} aria-hidden="true">
        &#9613;
      </span>
    );
  }
  return (
    <motion.span
      className={`inline-block ${className}`}
      aria-hidden="true"
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1.05, times: [0, 0.5, 0.5, 1], repeat: Infinity, ease: "linear" }}
    >
      &#9613;
    </motion.span>
  );
}

// The centerpiece. The word decodes in, holds long enough to read, then
// corrupts and dissolves letter-by-letter (right to left) into ghosts — the
// business without you — holds the absence, then reassembles. Plays once.
function HeadlineDisappear({ text, className = "", startDelayMs = 0 }) {
  const reduce = useReducedMotion();
  const chars = useMemo(() => text.split(""), [text]);
  const [display, setDisplay] = useState(chars);
  const [vis, setVis] = useState(() => chars.map(() => true));

  useEffect(() => {
    if (reduce) {
      setDisplay(chars);
      setVis(chars.map(() => true));
      return undefined;
    }

    const len = chars.length;
    const settle = chars.map(
      (_, i) => 24 + Math.round((i / Math.max(len, 1)) * 56) + Math.floor(Math.random() * 18),
    );
    let frame = 0;
    let raf = 0;
    const timers = [];

    const reform = () => {
      chars.forEach((_, i) => {
        timers.push(
          window.setTimeout(() => {
            setDisplay((d) => {
              const n = [...d];
              n[i] = chars[i];
              return n;
            });
            setVis((v) => {
              const n = [...v];
              n[i] = true;
              return n;
            });
          }, i * 95),
        );
      });
    };

    const dissolve = () => {
      const order = chars.map((_, i) => i).reverse();
      order.forEach((idx, k) => {
        timers.push(
          window.setTimeout(() => {
            setDisplay((d) => {
              const n = [...d];
              if (chars[idx] !== " ") n[idx] = randomGlyph();
              return n;
            });
            setVis((v) => {
              const n = [...v];
              n[idx] = false;
              return n;
            });
          }, k * 135),
        );
      });
      const goneAt = order.length * 135;
      timers.push(window.setTimeout(reform, goneAt + 1150));
    };

    const decodeIn = () => {
      let settled = 0;
      setDisplay(
        chars.map((c, i) => {
          if (c === " " || frame >= settle[i]) {
            settled += 1;
            return c;
          }
          return Math.random() < 0.32 ? randomGlyph() : display[i];
        }),
      );
      frame += 1;
      if (settled < len) {
        raf = requestAnimationFrame(decodeIn);
      } else {
        setDisplay(chars);
        timers.push(window.setTimeout(dissolve, 1900));
      }
    };

    timers.push(
      window.setTimeout(() => {
        raf = requestAnimationFrame(decodeIn);
      }, startDelayMs),
    );

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, chars, startDelayMs]);

  return (
    <span className={className} aria-label={text}>
      {display.map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          animate={{
            opacity: vis[i] ? 1 : 0.07,
            filter: vis[i] ? "blur(0px)" : "blur(11px)",
            y: vis[i] ? 0 : -5,
          }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

// Unpredictability. At irregular intervals the system "twitches" — a scanline
// tear and a magenta pressure flash — as if it noticed you reading. Never on a
// fixed beat, so it never feels like a loop. Reduced-motion: silent.
function SystemInterrupt() {
  const reduce = useReducedMotion();
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    let timer = 0;
    const schedule = () => {
      const wait = 5200 + Math.random() * 7600;
      timer = window.setTimeout(() => {
        setPulse((p) => p + 1);
        schedule();
      }, wait);
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [reduce]);

  if (reduce || pulse === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden="true">
      <motion.div
        key={`flash-${pulse}`}
        className="absolute inset-0 bg-[#DB2777]/[0.05]"
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: [0, 0.6, 0, 0.3, 0], x: [0, -5, 4, -2, 0] }}
        transition={{ duration: 0.5, ease: "linear" }}
      />
      <motion.div
        key={`tear-${pulse}`}
        className="absolute left-0 right-0 h-px bg-white/45 mix-blend-screen shadow-[0_0_18px_rgba(255,255,255,0.4)]"
        initial={{ top: "34%", opacity: 0 }}
        animate={{ top: ["34%", "58%", "47%"], opacity: [0, 0.85, 0] }}
        transition={{ duration: 0.55, times: [0, 0.55, 1], ease: "easeOut" }}
      />
    </div>
  );
}

// Covert-terminal surface: CRT scanlines, corner vignette for unease, and a
// rare flicker. The lander should feel like a feed you weren't cleared to see.
function HeroInterfaceOverlay() {
  const reduce = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 [background:radial-gradient(125%_92%_at_50%_36%,transparent_50%,rgba(0,0,0,0.6)_100%)]" />
      <motion.div
        className="absolute inset-0 opacity-[0.05] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.6)_0px,rgba(255,255,255,0.6)_1px,transparent_1px,transparent_3px)]"
        animate={reduce ? undefined : { opacity: [0.04, 0.065, 0.04] }}
        transition={reduce ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {!reduce ? (
        <motion.div
          className="absolute inset-0 bg-white/[0.018]"
          animate={{ opacity: [0, 0, 0.6, 0, 0.25, 0, 0] }}
          transition={{
            duration: 7,
            times: [0, 0.8, 0.82, 0.85, 0.88, 0.9, 1],
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ) : null}
    </div>
  );
}

// Intercept feed (no container). The founder's symptoms print in one by one
// like an intercepted transmission — the system has been listening all along.
function HeroInterceptFeed({ lines }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? lines.length : 0);

  useEffect(() => {
    if (reduce) {
      setCount(lines.length);
      return undefined;
    }

    let timeouts = [];
    const run = () => {
      timeouts.forEach((t) => window.clearTimeout(t));
      timeouts = [];
      setCount(0);
      lines.forEach((_, i) => {
        timeouts.push(window.setTimeout(() => setCount(i + 1), 1300 + i * 1600));
      });
    };

    run();
    const cycleMs = 1300 + lines.length * 1600 + 6500;
    const loop = window.setInterval(run, cycleMs);

    return () => {
      timeouts.forEach((t) => window.clearTimeout(t));
      window.clearInterval(loop);
    };
  }, [reduce, lines]);

  return (
    <div className="w-full max-w-sm font-mono">
      <div className="mb-5 flex items-center gap-2.5 text-[9px] uppercase tracking-[0.28em] text-[#DB2777]/75">
        <span className="relative flex h-1.5 w-1.5">
          {!reduce ? (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#DB2777]/60" />
          ) : null}
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#DB2777]" />
        </span>
        intercepting signal
        <span className="text-[#9B9894]/40">— founder channel</span>
      </div>

      <div className="space-y-3.5">
        {lines.map((line, i) => {
          const visible = reduce || i < count;
          const isPunch = i === lines.length - 1;
          const isHinge = i === lines.length - 2;
          return (
            <motion.div
              key={line}
              className={`flex gap-3 ${
                isPunch ? "text-[0.92rem] leading-7 sm:text-[0.98rem]" : "text-[0.78rem] leading-6 sm:text-[0.82rem]"
              }`}
              initial={false}
              animate={{
                opacity: visible ? 1 : 0,
                filter: visible ? "blur(0px)" : "blur(7px)",
                x: visible ? 0 : -10,
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className={`shrink-0 tabular-nums ${isPunch ? "text-[#DB2777]" : "text-[#DB2777]/45"}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={
                  isPunch
                    ? "font-medium text-[#F3EFEC]"
                    : isHinge
                      ? "italic text-[#C2BFBA]"
                      : "text-[#8E8B87]"
                }
              >
                {line}
              </span>
            </motion.div>
          );
        })}
        <div className="flex gap-3 pt-1 text-[0.78rem] leading-6 text-[#9B9894]/45">
          <span className="shrink-0 tabular-nums text-[#DB2777]/40">&gt;</span>
          <BlinkingCaret className="text-[#DB2777]/70" />
        </div>
      </div>
    </div>
  );
}

function ContinuityAct1({ children }) {
  return (
    <div className="relative overflow-x-hidden bg-[#030304] text-[#E8E6E3]">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:72px_72px]"
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function CopyBlocks({ paragraphs, className = "" }) {
  return paragraphs.map((text) => (
    <p key={text} className={`mt-5 max-w-3xl ${FINAL_BODY} ${className}`}>
      {text}
    </p>
  ));
}

function ChapterAside({ index, label, children }) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="border-l border-[#9FE7C3]/20 pl-5">
        <p className={FINAL_INDEX}>{index}</p>
        <p className="mt-3 max-w-xs text-sm uppercase tracking-[0.22em] text-[#AAB5AE]/70">
          {label}
        </p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </aside>
  );
}

function SectionGrid({ index, label, children, aside, className = FINAL_SECTION }) {
  return (
    <section className={className}>
      <RevealSection>
        <div className={FINAL_CONTAINER}>
          <ChapterAside index={index} label={label}>
            {aside}
          </ChapterAside>
          <div>{children}</div>
        </div>
      </RevealSection>
    </section>
  );
}

function PainBeatCluster({ lines, lead = false }) {
  return (
    <div className={`${FINAL_CLUSTER_GAP} ${FINAL_CLUSTER_INNER}`}>
      {lines.map((text, index) => (
        <p
          key={text}
          className={
            lead && index === 0
              ? FINAL_BODY_LEAD
              : index === lines.length - 1 && lines.length > 1
                ? FINAL_BODY_PUNCH
                : FINAL_BODY_BEAT
          }
        >
          {text}
        </p>
      ))}
    </div>
  );
}

function PainRoleList({ lines }) {
  return (
    <ul className={`${FINAL_CLUSTER_GAP} ${FINAL_CLUSTER_INNER} list-none`}>
      {lines.map((text) => (
        <li key={text} className={FINAL_ROLE_LINE}>
          {text}
        </li>
      ))}
    </ul>
  );
}

function SignalCard({ eyebrow, title, body }) {
  return (
    <div className={FINAL_MUTED_PANEL}>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9FE7C3]/75">
        {eyebrow}
      </p>
      <p className="mt-4 text-xl font-semibold leading-tight tracking-[-0.02em] text-[#F3F7F4]">
        {title}
      </p>
      {body ? <p className={`mt-3 ${FINAL_BODY_SM}`}>{body}</p> : null}
    </div>
  );
}

function SystemGlyph() {
  const nodes = [
    { label: "deadline", className: "left-[18%] top-[26%]" },
    { label: "approval", className: "right-[18%] top-[30%]" },
    { label: "context", className: "left-[24%] bottom-[28%]" },
    { label: "handoff", className: "right-[22%] bottom-[24%]" },
  ];

  return (
    <div className="relative hidden min-h-[520px] overflow-hidden rounded-[2.25rem] border border-white/[0.09] bg-black/[0.20] shadow-[0_40px_160px_rgba(0,0,0,0.42)] lg:block">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(159,231,195,0.18),transparent_25%),radial-gradient(circle_at_50%_46%,rgba(159,231,195,0.08),transparent_44%)]"
        aria-hidden="true"
      />

      <div
        className="absolute left-1/2 top-1/2 h-[21rem] w-[21rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#9FE7C3]/10"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]"
        aria-hidden="true"
      />

      <div
        className="absolute left-1/2 top-1/2 h-px w-[68%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#9FE7C3]/20 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 h-[68%] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#9FE7C3]/20 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#9FE7C3]/18"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 h-[12rem] w-[12rem] -translate-x-1/2 -translate-y-1/2 rotate-45 border border-white/[0.08]"
        aria-hidden="true"
      />

      {nodes.map((node) => (
        <div key={node.label} className={`absolute ${node.className}`}>
          <div className="flex items-center gap-2 rounded-full border border-white/[0.09] bg-[#07100D]/75 px-3 py-2 shadow-[0_12px_50px_rgba(0,0,0,0.28)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9FE7C3]/75 shadow-[0_0_18px_rgba(159,231,195,0.45)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#B8C2BC]">
              {node.label}
            </span>
          </div>
        </div>
      ))}

      <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9FE7C3] shadow-[0_0_70px_rgba(159,231,195,0.75)]" />
      <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#9FE7C3]/20" />

      <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/[0.08] bg-black/[0.22] p-5">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#9FE7C3]/75">
              Dependency map
            </p>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#B8C2BC]">
              The business looks calm until the invisible routes still depend on one person.
            </p>
          </div>
          <div className="hidden rounded-full border border-[#9FE7C3]/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9FE7C3]/80 xl:block">
            signal forming
          </div>
        </div>
      </div>
    </div>
  );
}

const DEPENDENCY_OPTION_SELECTED =
  "rounded-full border border-[#9FE7C3]/45 bg-[#9FE7C3]/[0.08] px-4 py-2.5 text-sm leading-7 text-[#F3F7F4] shadow-[0_0_26px_rgba(159,231,195,0.08)] transition";
const DEPENDENCY_OPTION_IDLE =
  "rounded-full border border-white/10 bg-white/[0.025] px-4 py-2.5 text-sm leading-7 text-[#B3BDC9] transition hover:border-white/20 hover:text-[#F3F7F4]";

export function InitiationHeroSection({ content }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Scroll-dissolve handoff: the cold open recedes into the dark rather than
  // ending at a hard edge, then recognition rises underneath.
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -64]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.985]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  const contentStyle = reduce
    ? undefined
    : { opacity: contentOpacity, y: contentY, scale: contentScale };

  return (
    <ContinuityAct1>
      <section
        ref={sectionRef}
        aria-labelledby="initiation-hero-heading"
        className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-9 pt-6 sm:px-8 sm:pb-12 lg:px-20"
      >
        <HeroForceField progress={scrollYProgress} />
        <HeroInterfaceOverlay />
        <SystemInterrupt />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-[#030304] to-transparent"
          aria-hidden="true"
        />

        {/* Header — logo + clearance strip */}
        <header className="relative z-10 flex items-center justify-between gap-4">
          <StudioFlowsLogoMark />
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#D4A853]/70">
            <span className="relative flex h-1.5 w-1.5">
              {!reduce ? (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4A853]/50" />
              ) : null}
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#D4A853]" />
            </span>
            <span className="hidden sm:inline">restricted</span>
            <span className="hidden text-[#9B9894]/40 sm:inline">/</span>
            <span>operator access</span>
          </div>
        </header>

        {/* Main content — headline / diamond / actions */}
        <motion.div
          className="relative z-10 flex flex-1 flex-col justify-center gap-9 py-8 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14"
          style={contentStyle}
        >
          {/* A — headline */}
          <div className="order-1 max-w-xl lg:col-start-1 lg:row-start-1">
            <div className="mb-6 flex items-center gap-2.5">
              <span className="font-mono text-[12px] leading-none text-[#D4A853]/80">&gt;</span>
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#9B9894] sm:text-[11px]">
                {content.eyebrow}
              </p>
              <BlinkingCaret className="font-mono text-[12px] leading-none text-[#D4A853]/80" />
            </div>

            <h1
              id="initiation-hero-heading"
              className="max-w-[13ch] font-serif text-[2.85rem] font-semibold leading-[0.9] tracking-[-0.045em] text-[#E8E6E3] sm:text-[4rem] lg:text-[5rem]"
            >
              <ScrambleText as="span" className="block" text="Your business" delayMs={300} />
              <ScrambleText as="span" className="block" text="knows when you" delayMs={1600} />
              <HeadlineDisappear className="block text-[#DB2777]" text="disappear." startDelayMs={3300} />
            </h1>
          </div>

          {/* B — intercept feed */}
          <div className="order-2 flex justify-start lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center lg:justify-start lg:pl-6">
            <HeroInterceptFeed lines={content.supportingCopy} />
          </div>

          {/* C — actions */}
          <div className="order-3 max-w-xl lg:col-start-1 lg:row-start-2">
            <p className="font-mono text-[11px] leading-6 tracking-[0.02em] text-[#D4A853]/70">
              // most operators never see the layer underneath.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={content.primaryCtaTarget}
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#E8E6E3] px-7 py-3 text-sm font-semibold text-[#030304] transition hover:bg-white"
              >
                {content.primaryCta}
              </Link>
              <Link
                href={content.secondaryCtaTarget}
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-7 py-3 text-sm font-semibold text-[#E8E6E3] transition hover:border-[#DB2777]/40 hover:bg-[#DB2777]/[0.06]"
              >
                {content.secondaryCta}
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Telemetry footer: the system's voice + scroll cue */}
        <motion.footer
          className="relative z-10 flex items-end justify-between gap-4"
          style={reduce ? undefined : { opacity: cueOpacity }}
        >
          <HeroPressureReadout />
          <div className="hidden items-center gap-2.5 sm:flex" aria-hidden="true">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#9B9894]/45">
              scroll
            </span>
            <span className="flex h-7 w-4 justify-center rounded-full border border-white/15 pt-1.5">
              {!reduce ? (
                <motion.span
                  className="h-1.5 w-1 rounded-full bg-[#DB2777]"
                  animate={{ y: [0, 7, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
              ) : (
                <span className="h-1.5 w-1 rounded-full bg-[#DB2777]" />
              )}
            </span>
          </div>
        </motion.footer>
      </section>
    </ContinuityAct1>
  );
}

// The founder dependency core. A conic gauge that fills as the reader traces
// each symptom to themselves, then overloads — the "you didn't see that coming"
// payoff of routing your own business through one person.
function FounderCore({ count, total, full, reduce }) {
  const deg = (count / total) * 360;

  // Magnetic pull: the core leans toward the cursor (within tight limits) and
  // tilts in 3D — a small psychological tug that makes it feel sentient.
  const anchorRef = useRef(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const mvRx = useMotionValue(0);
  const mvRy = useMotionValue(0);
  const springCfg = { stiffness: 130, damping: 15, mass: 0.4 };
  const x = useSpring(mvX, springCfg);
  const y = useSpring(mvY, springCfg);
  const rotateX = useSpring(mvRx, springCfg);
  const rotateY = useSpring(mvRy, springCfg);

  useEffect(() => {
    if (reduce) return undefined;
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    function onMove(e) {
      const el = anchorRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      mvX.set(clamp(dx / 14, -20, 20));
      mvY.set(clamp(dy / 14, -20, 20));
      mvRy.set(clamp(dx / 26, -10, 10));
      mvRx.set(clamp(-dy / 26, -10, 10));
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mvX, mvY, mvRx, mvRy]);

  return (
    <div className="flex flex-col items-center" style={{ perspective: 700 }}>
      <div ref={anchorRef} className="relative">
      <motion.div
        className="relative grid h-44 w-44 place-items-center rounded-full sm:h-48 sm:w-48"
        style={{
          background: `conic-gradient(#DB2777 ${deg}deg, rgba(255,255,255,0.05) ${deg}deg)`,
          transition: "background 0.5s ease",
          x: reduce ? 0 : x,
          y: reduce ? 0 : y,
          rotateX: reduce ? 0 : rotateX,
          rotateY: reduce ? 0 : rotateY,
          transformPerspective: 700,
        }}
        animate={full && !reduce ? { scale: [1, 1.035, 1] } : { scale: 1 }}
        transition={full && !reduce ? { duration: 0.7, repeat: Infinity, repeatType: "reverse" } : { duration: 0.3 }}
      >
        {full && !reduce ? (
          <span className="absolute -inset-1 rounded-full ring-2 ring-[#DB2777]/40 animate-pulse" aria-hidden="true" />
        ) : null}
        <div className="grid h-[9.5rem] w-[9.5rem] place-items-center rounded-full bg-[#070409] text-center shadow-[inset_0_0_44px_rgba(0,0,0,0.65)] sm:h-[10.5rem] sm:w-[10.5rem]">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#9B9894]/55">
              routed through you
            </p>
            <p className="mt-1 font-mono text-4xl font-semibold tabular-nums text-[#F3EFEC]">
              {String(count).padStart(2, "0")}
              <span className="text-lg text-[#DB2777]/60">/0{total}</span>
            </p>
            <p
              className={`mt-1 font-mono text-[9px] uppercase tracking-[0.24em] ${
                full ? "text-[#DB2777]" : "text-[#9B9894]/45"
              }`}
            >
              {full ? "overloaded" : "dependency load"}
            </p>
          </div>
        </div>
      </motion.div>
      </div>
      <p className="mt-6 max-w-[230px] text-center text-sm leading-6 text-[#9B9894]/75">
        {full
          ? "Every signal terminates at one person. That is not a workflow. That is you."
          : "The founder quietly became the operating layer. Trace where each signal really goes."}
      </p>
    </div>
  );
}

export function InitiationFounderPainSection({ content }) {
  const reduce = useReducedMotion();
  const symptoms = content.body.slice(0, 5);
  const reflection = content.body.slice(5);
  const reflectionLead = reflection.slice(0, -1);
  const reflectionPunch = reflection[reflection.length - 1];

  const { mark } = useProgression();
  const [traced, setTraced] = useState(() => new Set());
  const [flash, setFlash] = useState(0);
  const count = traced.size;
  const total = symptoms.length;
  const pct = total ? count / total : 0;
  const full = count === total;

  // Unconventional parallax: each layer rides scroll at a different speed AND
  // direction, so the field destabilizes while the core stays pinned.
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bloomY = useTransform(scrollYProgress, [0, 1], [-120, 170]);
  const bloomRotate = useTransform(scrollYProgress, [0, 1], [-8, 10]);
  const bloomScale = useTransform(scrollYProgress, [0, 1], [1.18, 0.9]);
  const deepY = useTransform(scrollYProgress, [0, 1], [150, -180]);
  const streakX = useTransform(scrollYProgress, [0, 1], [-260, 260]);
  const headY = useTransform(scrollYProgress, [0, 1], [30, -42]);

  function trace(index) {
    setTraced((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
    setFlash((f) => f + 1);
    mark("recognition");
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="initiation-founder-pain-heading"
      className="relative -mt-20 overflow-hidden bg-[#040406] pb-24 pt-28 sm:-mt-24 sm:pb-28 sm:pt-36"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-36 bg-gradient-to-b from-[#030304] via-[#030304]/92 to-transparent sm:h-32"
        aria-hidden="true"
      />

      {/* Parallax layer 1 — magenta pressure, drifts DOWN against the read, rotating
          and shrinking; opacity rises with the dependency load. */}
      <motion.div
        className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 z-0 bg-[radial-gradient(58%_55%_at_72%_42%,rgba(219,39,119,0.18),transparent_60%)] transition-opacity duration-700"
        style={{
          opacity: 0.25 + pct * 0.75,
          y: reduce ? 0 : bloomY,
          rotate: reduce ? 0 : bloomRotate,
          scale: reduce ? 1 : bloomScale,
        }}
        aria-hidden="true"
      />
      {/* Parallax layer 2 — blue intelligence, deeper, moves UP (opposite). */}
      <motion.div
        className="pointer-events-none absolute left-[10%] top-[52%] z-0 h-[42vh] w-[42vh] rounded-full blur-[120px]"
        style={{
          y: reduce ? 0 : deepY,
          background: "radial-gradient(circle, rgba(96,165,250,0.10), transparent 70%)",
        }}
        aria-hidden="true"
      />
      {/* Parallax layer 3 — a horizontal pressure streak that slides across as you scroll down. */}
      <motion.div
        className="pointer-events-none absolute left-0 top-[28%] z-0 h-px w-[62%] bg-gradient-to-r from-transparent via-[#DB2777]/30 to-transparent"
        style={{ x: reduce ? 0 : streakX }}
        aria-hidden="true"
      />

      {!reduce && flash > 0 ? (
        <motion.div
          key={flash}
          className="pointer-events-none absolute inset-0 z-[1] bg-[#DB2777]/[0.06]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, full ? 0.7 : 0.45, 0] }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          aria-hidden="true"
        />
      ) : null}

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.56fr_0.44fr] lg:gap-16">
        <div className="relative">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5">
              {!reduce ? (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#DB2777]/50" />
              ) : null}
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#DB2777]" />
            </span>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#9B9894]/60">
              01 / recognition — scanning
            </p>
          </div>

          <motion.div style={reduce ? undefined : { y: headY }}>
            <RevealLine
              as="h2"
              id="initiation-founder-pain-heading"
              className="mt-6 max-w-xl font-serif text-3xl font-semibold leading-[1.02] tracking-[-0.035em] text-[#E8E6E3] sm:text-4xl"
            >
              {content.headline}
            </RevealLine>
          </motion.div>

          <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-[#DB2777]/55">
            &gt; trace each signal to its source
          </p>

          <div className="mt-4 space-y-2.5">
            {symptoms.map((line, i) => {
              const isTraced = traced.has(i);
              return (
                <motion.button
                  key={line}
                  type="button"
                  onClick={() => trace(i)}
                  aria-pressed={isTraced}
                  initial={reduce ? false : { opacity: 0, x: -18 }}
                  whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={reduce ? undefined : { duration: 0.5, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                  className={`group flex w-full items-start gap-3.5 rounded-xl border px-4 py-3.5 text-left transition ${
                    isTraced
                      ? "border-[#DB2777]/45 bg-[#DB2777]/[0.07]"
                      : "border-white/[0.07] bg-white/[0.012] hover:border-[#DB2777]/25 hover:bg-white/[0.03]"
                  }`}
                >
                  <span
                    className={`mt-0.5 shrink-0 font-mono text-[10px] tabular-nums ${
                      isTraced ? "text-[#DB2777]" : "text-[#DB2777]/40"
                    }`}
                  >
                    SIG{String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 text-[15px] leading-7 transition-colors ${
                      isTraced ? "text-[#E8E6E3]" : "text-[#9B9894] group-hover:text-[#C2BFBA]"
                    }`}
                  >
                    {line}
                  </span>
                  <span
                    className={`mt-0.5 shrink-0 font-mono text-[9px] uppercase tracking-[0.16em] transition-colors ${
                      isTraced ? "text-[#DB2777]" : "text-[#6B6864] group-hover:text-[#9B9894]"
                    }`}
                  >
                    {isTraced ? "→ you" : "trace"}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-10 border-l-2 border-[#DB2777]/40 pl-6">
            {reflectionLead.map((line, i) => (
              <p
                key={line}
                className={
                  i === 0
                    ? "text-lg leading-8 text-[#C9C4BE]"
                    : "mt-3 text-lg leading-8 text-[#9B9894]"
                }
              >
                {line}
              </p>
            ))}
            <p
              className={`mt-4 text-xl font-semibold leading-8 transition-all duration-700 sm:text-2xl ${
                full
                  ? "text-[#D4A853] [text-shadow:0_0_26px_rgba(212,168,83,0.45)]"
                  : "text-[#9B9894]"
              }`}
            >
              {reflectionPunch}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center lg:sticky lg:top-28 lg:h-fit lg:self-start lg:pt-4">
          <FounderCore count={count} total={total} full={full} reduce={reduce} />
        </div>
      </div>
    </section>
  );
}

// ── 02 THE MIRROR · break the glass ──────────────────────────────────────────
// Not abstract geometry — a real mirror you have to BREAK. It is whole at first
// ("break the glass"); the impact shatters it into IRREGULAR shards of varied
// size and shape (off-center impact, jagged kinked cracks, real gaps between
// pieces). Then each piece you touch REVEALS what still depends on you. Sporadic
// involuntary twitches + a stress flash keep it alive and unnerving; scroll
// parallax and a pointer tilt give it physical depth. Reduced-motion safe.
const MIRROR_IMPACT = [61, 33];
const MIRROR_PERIM = [
  [44, 0],
  [100, 0],
  [100, 40],
  [100, 100],
  [50, 100],
  [0, 100],
  [0, 58],
  [0, 0],
];
const MIRROR_KINKS = [
  [0.5, 3],
  [0.44, -4.5],
  [0.56, 3.5],
  [0.6, -5],
  [0.5, 4],
  [0.46, -3],
  [0.54, 4.5],
  [0.48, -4],
];

const MIRROR_RAYS = MIRROR_PERIM.map(([x, y], i) => {
  const vx = x - MIRROR_IMPACT[0];
  const vy = y - MIRROR_IMPACT[1];
  const len = Math.hypot(vx, vy) || 1;
  const [t, o] = MIRROR_KINKS[i];
  return {
    perim: [x, y],
    k: [MIRROR_IMPACT[0] + vx * t + (-vy / len) * o, MIRROR_IMPACT[1] + vy * t + (vx / len) * o],
  };
});

const MIRROR_SHARDS = MIRROR_PERIM.map((_, i) => {
  const [px, py] = MIRROR_IMPACT;
  const a = MIRROR_RAYS[i];
  const b = MIRROR_RAYS[(i + 1) % MIRROR_RAYS.length];
  const pts = [[px, py], a.k, a.perim, b.perim, b.k];
  const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
  const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
  // inset toward centroid → thin dark crack seams + a pulverized core hole
  const inset = pts.map(([x, y]) => [cx + (x - cx) * 0.962, cy + (y - cy) * 0.962]);
  const dx = cx - px;
  const dy = cy - py;
  const dl = Math.hypot(dx, dy) || 1;
  const push = 9 + ((i * 5) % 13);
  return {
    clip: `polygon(${inset.map(([x, y]) => `${x.toFixed(1)}% ${y.toFixed(1)}%`).join(", ")})`,
    cx,
    cy,
    bx: (dx / dl) * push,
    by: (dy / dl) * push,
    r: (i % 2 ? 1 : -1) * (2.5 + (i % 4)),
    sx: (dx / dl) * push * 3.2,
    sy: (dy / dl) * push * 3.2,
    sr: (i % 2 ? 1 : -1) * (10 + (i % 5) * 3),
  };
});

const MIRROR_GLASS = {
  backgroundImage:
    "linear-gradient(125deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 20%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.4) 100%), linear-gradient(135deg, #0c0d13 0%, #070709 54%, #0e0a11 100%)",
};

export function InitiationDependencySelectorSection({ content }) {
  const reduce = useReducedMotion();
  const { mark } = useProgression();
  const sectionRef = useRef(null);
  const paneRef = useRef(null);

  const [broken, setBroken] = useState(false);
  const [selected, setSelected] = useState(() => new Set());
  const [twitch, setTwitch] = useState(-1);
  const [flash, setFlash] = useState(0);
  const [stress, setStress] = useState(null);

  const count = content.options.filter((option) => selected.has(option)).length;
  const hasSelection = count > 0;
  const frac = content.options.length ? count / content.options.length : 0;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const paneY = useTransform(scrollYProgress, [0, 1], [44, -44]);
  const glowY = useTransform(scrollYProgress, [0, 1], [-70, 90]);
  const glowX = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 20 });
  const sry = useSpring(ry, { stiffness: 120, damping: 20 });

  function onPaneMove(event) {
    const el = paneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    if (!reduce) {
      rx.set(ny * -9);
      ry.set(nx * 9);
      if (!broken) {
        setStress({ x: (nx + 0.5) * 100, y: (ny + 0.5) * 100 });
      }
    }
  }

  function onPaneLeave() {
    rx.set(0);
    ry.set(0);
    setStress(null);
  }

  function breakGlass() {
    if (broken) return;
    setBroken(true);
    mark("mirror");
  }

  function toggleShard(option) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(option)) next.delete(option);
      else next.add(option);
      return next;
    });
  }

  // Involuntary: a random shard flinches at irregular intervals.
  useEffect(() => {
    if (reduce || !broken) return undefined;
    let timer;
    const schedule = () => {
      timer = window.setTimeout(() => {
        setTwitch(Math.floor(Math.random() * content.options.length));
        window.setTimeout(() => setTwitch(-1), 200);
        schedule();
      }, 2200 + Math.random() * 3800);
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [reduce, broken, content.options.length]);

  // Involuntary: a magenta pulse rips across the glass on no fixed beat.
  useEffect(() => {
    if (reduce || !broken) return undefined;
    let timer;
    const schedule = () => {
      timer = window.setTimeout(() => {
        setFlash((f) => f + 1);
        schedule();
      }, 6000 + Math.random() * 7000);
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [reduce, broken]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="initiation-dependency-heading"
      className="relative z-10 scroll-mt-24 overflow-hidden bg-[#050507] py-20 sm:py-24 lg:py-28"
    >
      <SectionBleed />
      <motion.div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none"
        style={{
          opacity: 0.18 + frac * 0.6,
          x: reduce ? 0 : glowX,
          y: reduce ? 0 : glowY,
          background: "radial-gradient(50% 50% at 72% 44%, rgba(219,39,119,0.13), transparent 62%)",
        }}
        aria-hidden="true"
      />

      <RevealSection>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-14">
          <div>
            <div className="flex items-center gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#DB2777]/75">02 / the mirror</p>
              <span className="h-px flex-1 bg-gradient-to-r from-[#DB2777]/30 to-transparent" />
            </div>

            <h2
              id="initiation-dependency-heading"
              className="mt-6 font-serif text-4xl font-semibold leading-[1.0] tracking-[-0.04em] text-[#F3EFEC] sm:text-5xl lg:text-6xl"
            >
              {content.title}
            </h2>

            <p className="mt-5 max-w-md text-base leading-8 text-[#9B9894] sm:text-[17px]">{content.prompt}</p>

            <div
              className={
                hasSelection
                  ? "mt-9 border-l-2 border-[#DB2777] bg-gradient-to-r from-[#DB2777]/[0.08] to-transparent py-4 pl-5"
                  : "mt-9 border-l-2 border-white/10 py-4 pl-5"
              }
              aria-live="polite"
              aria-atomic="true"
            >
              {hasSelection ? (
                content.resultCopy.map((line, index) => (
                  <p
                    key={line}
                    className={
                      index === 0
                        ? "font-mono text-[11px] uppercase tracking-[0.24em] text-[#DB2777]"
                        : "mt-3 text-base leading-8 text-[#D8D4CE]"
                    }
                  >
                    {line}
                  </p>
                ))
              ) : (
                <>
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#DB2777]/55">
                    {broken ? "glass broken" : "reflection intact"}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#7E7B77]">
                    {broken
                      ? "Touch a piece. Name what still routes through you."
                      : "The glass holds everything you carry. Break it to see what it is hiding."}
                  </p>
                </>
              )}
            </div>

            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.24em] text-[#6F6C68]">
              <span className="text-[#DB2777]">{String(count).padStart(2, "0")}</span> /{" "}
              {String(content.options.length).padStart(2, "0")} revealed
            </p>
          </div>

          {/* THE MIRROR — break it, then touch the pieces */}
          <motion.div
            className="relative aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/3]"
            style={{ y: reduce ? 0 : paneY }}
          >
            <motion.div
              ref={paneRef}
              onMouseMove={onPaneMove}
              onMouseLeave={onPaneLeave}
              className="relative h-full w-full [transform-style:preserve-3d]"
              style={{
                rotateX: srx,
                rotateY: sry,
                transformPerspective: 1000,
                filter: "drop-shadow(0 40px 90px rgba(0,0,0,0.65))",
              }}
            >
              {!broken ? (
                <button
                  type="button"
                  onClick={breakGlass}
                  aria-label="Break the glass to reveal what depends on you"
                  className="group absolute inset-0 cursor-pointer overflow-hidden focus:outline-none"
                >
                  <span className="absolute inset-0" style={MIRROR_GLASS} aria-hidden="true" />
                  <span
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.05) 49%, transparent 57%)",
                    }}
                    aria-hidden="true"
                  />
                  {stress && !reduce ? (
                    <svg
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      className="absolute inset-0 h-full w-full"
                      aria-hidden="true"
                    >
                      {[0, 1, 2, 3, 4, 5].map((kk) => {
                        const ang = (kk / 6) * Math.PI * 2 + 0.5;
                        const len = 5 + (kk % 3) * 4;
                        return (
                          <line
                            key={kk}
                            x1={stress.x}
                            y1={stress.y}
                            x2={stress.x + Math.cos(ang) * len}
                            y2={stress.y + Math.sin(ang) * len}
                            stroke="rgba(220,225,235,0.35)"
                            strokeWidth="0.28"
                          />
                        );
                      })}
                    </svg>
                  ) : null}
                  <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-6">
                    <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#DB2777]/50">
                      {!reduce ? (
                        <span className="absolute inset-0 animate-ping rounded-full border border-[#DB2777]/40" />
                      ) : null}
                      <span className="h-2 w-2 rounded-full bg-[#DB2777] shadow-[0_0_18px_rgba(219,39,119,0.85)]" />
                    </span>
                    <span className="font-mono text-[12px] uppercase tracking-[0.34em] text-[#DB2777] transition group-hover:text-[#F7D7E6]">
                      break the glass
                    </span>
                    <span className="max-w-[13rem] text-center text-xs leading-5 text-white/45">
                      Tap to shatter the reflection and see what it is hiding.
                    </span>
                  </span>
                  <span
                    className="absolute inset-0"
                    style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.7)" }}
                    aria-hidden="true"
                  />
                </button>
              ) : (
                <>
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "radial-gradient(20% 20% at 61% 33%, rgba(219,39,119,0.22), transparent 70%)" }}
                    aria-hidden="true"
                  />

                  {content.options.map((option, i) => {
                    const shard = MIRROR_SHARDS[i % MIRROR_SHARDS.length];
                    const active = selected.has(option);
                    const tw = twitch === i;
                    return (
                      <motion.button
                        key={option}
                        type="button"
                        aria-pressed={active}
                        aria-label={option}
                        onClick={() => toggleShard(option)}
                        className="absolute inset-0 focus:outline-none focus-visible:[filter:brightness(1.25)_drop-shadow(0_0_14px_rgba(219,39,119,0.9))]"
                        style={{ clipPath: shard.clip, zIndex: active ? 6 : 2 }}
                        initial={reduce ? false : { x: shard.sx, y: shard.sy, rotate: shard.sr, opacity: 0 }}
                        animate={{
                          x: (active ? shard.bx : 0) + (tw ? 2.5 : 0),
                          y: (active ? shard.by : 0) + (tw ? -2 : 0),
                          rotate: (active ? shard.r : 0) + (tw ? 1.2 : 0),
                          opacity: tw ? 0.76 : 1,
                          filter: active
                            ? "brightness(1.18) drop-shadow(0 0 16px rgba(219,39,119,0.5))"
                            : "brightness(0.92)",
                        }}
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 160, damping: 15, opacity: { duration: 0.18 } }
                        }
                      >
                        <span className="absolute inset-0" style={MIRROR_GLASS} aria-hidden="true" />
                        <span
                          className="absolute inset-0"
                          style={{
                            backgroundImage:
                              "linear-gradient(135deg, rgba(255,255,255,0.1), transparent 26%, transparent 74%, rgba(0,0,0,0.55))",
                          }}
                          aria-hidden="true"
                        />
                        {active ? (
                          <span
                            className="absolute inset-0"
                            style={{ background: "rgba(219,39,119,0.17)" }}
                            aria-hidden="true"
                          />
                        ) : null}
                      </motion.button>
                    );
                  })}

                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute inset-0 z-[7] h-full w-full transition-opacity duration-700"
                    style={{ opacity: 0.5 + frac * 0.4 }}
                    aria-hidden="true"
                  >
                    {MIRROR_RAYS.map((rayItem, i) => (
                      <polyline
                        key={i}
                        points={`${MIRROR_IMPACT[0]},${MIRROR_IMPACT[1]} ${rayItem.k[0].toFixed(1)},${rayItem.k[1].toFixed(1)} ${rayItem.perim[0]},${rayItem.perim[1]}`}
                        fill="none"
                        stroke="rgba(220,225,235,0.22)"
                        strokeWidth="0.3"
                      />
                    ))}
                    <polygon
                      points={MIRROR_RAYS.map((r) => `${r.k[0].toFixed(1)},${r.k[1].toFixed(1)}`).join(" ")}
                      fill="none"
                      stroke="rgba(219,39,119,0.22)"
                      strokeWidth="0.3"
                    />
                  </svg>

                  {content.options.map((option, i) => {
                    const shard = MIRROR_SHARDS[i % MIRROR_SHARDS.length];
                    const active = selected.has(option);
                    return (
                      <span
                        key={`lbl-${option}`}
                        className="pointer-events-none absolute z-10 max-w-[6.5rem] text-center font-mono text-[9px] uppercase leading-tight tracking-[0.16em] transition-all duration-300 sm:text-[10px]"
                        style={{
                          left: `${shard.cx}%`,
                          top: `${shard.cy}%`,
                          transform: `translate(-50%, -50%) translate(${active ? shard.bx : 0}px, ${active ? shard.by : 0}px)`,
                          color: active ? "#F7D7E6" : "rgba(255,255,255,0.18)",
                          textShadow: active ? "0 0 12px rgba(219,39,119,0.85)" : "none",
                        }}
                      >
                        {active ? option : "·"}
                      </span>
                    );
                  })}

                  {flash > 0 && !reduce ? (
                    <motion.div
                      key={flash}
                      className="pointer-events-none absolute inset-0 z-[8] bg-[#DB2777]/[0.06]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.7, 0, 0.3, 0] }}
                      transition={{ duration: 0.5 }}
                      aria-hidden="true"
                    />
                  ) : null}

                  <div
                    className="pointer-events-none absolute inset-0 z-[9]"
                    style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.72)" }}
                    aria-hidden="true"
                  />
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </RevealSection>
    </section>
  );
}

// THE PRISON FAKE-OUT. The reader is shown a calm, polished "everything is
// healthy" surface and given a beat to believe it — then it glitches, tears,
// and dissolves to expose the scattered truth underneath. After this, the reader
// distrusts every calm surface the page shows. Reduced-motion: truth shown plainly.
function ConfessionRealityBreak({ surface, breakLine, scattered }) {
  const reduce = useReducedMotion();
  const { mark } = useProgression();
  const ref = useRef(null);
  const nearView = useInView(ref, { margin: "0px 0px -15% 0px" });
  const wasNear = useRef(false);
  const [broken, setBroken] = useState(reduce);
  const brokenRef = useRef(reduce);

  // The reader breaks the surface themselves — a deliberate click / tap (or
  // Enter/Space) shatters the "nominal" facade. Hover no longer fires it, so the
  // reader gets to read the calm surface before they choose to break it.
  const trigger = useCallback(() => {
    if (brokenRef.current) return;
    brokenRef.current = true;
    setBroken(true);
    mark("confession");
  }, [mark]);

  // Reduced motion: skip straight to the exposed reality.
  useEffect(() => {
    if (reduce) trigger();
  }, [reduce, trigger]);

  // Fallback ONLY if they scroll past without interacting — so the copy is never
  // permanently hidden, but the reveal never auto-fires while it's on screen.
  // The reader's hover/tap/focus stays the intended trigger.
  useEffect(() => {
    if (reduce) return;
    if (nearView) {
      wasNear.current = true;
    } else if (wasNear.current && !broken) {
      trigger();
    }
  }, [nearView, reduce, broken, trigger]);

  return (
    <div ref={ref} className="relative mt-12 min-h-[460px] sm:min-h-[430px]">
      <AnimatePresence>
        {!broken ? (
          <motion.div
            key="surface"
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            exit={{ opacity: 0, scale: 1.06, filter: "blur(13px)", x: [0, -9, 7, -3, 0] }}
            transition={{ duration: 0.55, ease: "easeIn" }}
          >
            <motion.div
              role="button"
              tabIndex={0}
              aria-label="Click to break the surface and reveal what was underneath"
              onClick={trigger}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  trigger();
                }
              }}
              initial={false}
              animate={
                reduce
                  ? {}
                  : {
                      x: [0, 0, 0, 0, -2.5, 3, -1.5, 1, 0],
                      skewX: [0, 0, 0, 0, -1.4, 1.1, 0, 0, 0],
                      opacity: [1, 1, 1, 1, 0.82, 1, 0.9, 1, 1],
                    }
              }
              transition={
                reduce
                  ? undefined
                  : {
                      duration: 3.6,
                      repeat: Infinity,
                      repeatDelay: 1,
                      times: [0, 0.55, 0.78, 0.84, 0.87, 0.9, 0.93, 0.96, 1],
                      ease: "easeInOut",
                    }
              }
              whileHover={reduce ? undefined : { scale: 1.012 }}
              whileTap={reduce ? undefined : { scale: 0.985 }}
              className="group relative w-full max-w-xl cursor-pointer rounded-[2rem] border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 text-center shadow-[0_34px_130px_rgba(0,0,0,0.45)] transition-[border-color] duration-300 hover:border-[#DB2777]/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB2777]/50 sm:p-10"
            >
              {!reduce ? (
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[2rem] mix-blend-screen"
                  style={{ background: "linear-gradient(160deg, rgba(219,39,119,0.16), transparent 42%)" }}
                  animate={{ opacity: [0, 0, 0, 0, 0.7, 0, 0.45, 0, 0] }}
                  transition={{
                    duration: 3.6,
                    repeat: Infinity,
                    repeatDelay: 1,
                    times: [0, 0.55, 0.78, 0.84, 0.87, 0.9, 0.93, 0.96, 1],
                    ease: "easeOut",
                  }}
                />
              ) : null}
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#6FB58E]">
                  <span className="relative flex h-1.5 w-1.5">
                    {!reduce ? (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6FB58E]/50" />
                    ) : null}
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#6FB58E]" />
                  </span>
                  system status — all good
                </div>
                <p className="mt-7 text-sm leading-7 text-[#9B9894]">{surface[0]}</p>
                <p className="mt-3 font-serif text-2xl font-semibold leading-tight tracking-[-0.02em] text-[#EEF1ED] sm:text-3xl">
                  {surface[1]}
                </p>
                <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.26em] text-[#9B9894]/40">
                  the version everyone saw
                </p>
                {!reduce ? (
                  <motion.span
                    animate={{ opacity: [0.55, 1, 0.55] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="mt-6 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#DB2777] group-hover:text-[#F7D7E6]"
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#DB2777] shadow-[0_0_10px_rgba(219,39,119,0.8)]" />
                    <span className="sm:hidden">tap to break the surface</span>
                    <span className="hidden sm:inline">click to break the surface</span>
                  </motion.span>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {broken ? (
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.26em] text-[#DB2777]">
            // surface integrity lost
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-8 text-[#E8E6E3] sm:text-xl">
            {breakLine}
          </p>
          <div className="mx-auto mt-9 grid max-w-3xl grid-cols-2 gap-3 sm:gap-4">
            {scattered.map((line, i) => {
              const rot = [-3, 2.5, -2, 3][i % 4];
              return (
                <motion.div
                  key={line}
                  initial={reduce ? false : { opacity: 0, y: 20, rotate: rot * 2.2 }}
                  animate={{ opacity: 1, y: 0, rotate: rot }}
                  transition={{ duration: 0.5, delay: 0.28 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-xl border border-[#DB2777]/25 bg-[#120A10]/75 px-4 py-4 shadow-[0_14px_50px_rgba(0,0,0,0.4)]"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#DB2777]/55">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#C2BFBA]">{line}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ) : null}

      {broken && !reduce ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="absolute left-0 right-0 top-[34%] h-px bg-white/55 mix-blend-screen shadow-[0_0_22px_rgba(255,255,255,0.55)]" />
          <div className="absolute inset-0 bg-[#DB2777]/[0.04]" />
        </motion.div>
      ) : null}
    </div>
  );
}

// Eerie watcher for the confession's dead left column (desktop only): the dusty
// CRT that "everyone saw" — pinned, dead static, scanlines, a slow vertical roll
// and a ghost that bleeds in and out as the section scrolls. The screen reads
// STATUS: NOMINAL over a flatline — the calm lie, made visible. Reduced-motion:
// a still, dim screen. Purely atmospheric (aria-hidden).
function FounderCrtTv({ progressTarget }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: progressTarget,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-7%", "7%"]);
  // The TV now sits low in the section, so it's on screen in the latter part of
  // the scroll — peak the ghost there.
  const ghost = useTransform(scrollYProgress, [0.45, 0.62, 0.85, 0.98], [0, 0.92, 0.92, 0]);
  const ghostX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-7, 7]);
  // Screen-glass rectangle inside the TV photo (percentages, tuned to the asset).
  const screen = { left: "13.5%", top: "31.5%", width: "59%", height: "36%" };

  return (
    <div className="relative hidden lg:mt-auto lg:block lg:pl-5" aria-hidden="true">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-6 h-40 bg-[radial-gradient(ellipse_at_center,rgba(219,39,119,0.14),transparent_70%)] blur-2xl"
      />
      <motion.div style={{ y }} className="relative">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src="/founder/crt-tv.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 360px, 1px"
            className="select-none object-contain"
            style={{
              // Feather the photo's dark surround into the page so there's no
              // visible rectangle around the TV (no mix-blend trick needed).
              WebkitMaskImage:
                "radial-gradient(115% 115% at 50% 50%, #000 58%, transparent 90%)",
              maskImage:
                "radial-gradient(115% 115% at 50% 50%, #000 58%, transparent 90%)",
            }}
          />

          {/* live screen */}
          <div
            className="absolute overflow-hidden rounded-[10%]"
            style={screen}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,42,38,0.95),rgba(5,6,8,1)_72%)]" />

            {!reduce ? (
              <motion.div
                className="absolute inset-0 mix-blend-screen"
                style={{ backgroundImage: RANSOM_GRAIN, backgroundSize: "110px 110px" }}
                animate={{ opacity: [0.05, 0.17, 0.08, 0.14, 0.06] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{ backgroundImage: RANSOM_GRAIN, backgroundSize: "110px 110px" }}
              />
            )}

            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, rgba(0,0,0,0.55) 0 1px, transparent 1px 3px)",
              }}
            />

            {!reduce ? (
              <motion.div
                className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-white/12 to-transparent"
                animate={{ y: ["-40%", "140%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
            ) : null}

            <motion.div
              style={{ opacity: reduce ? 0.24 : ghost, x: ghostX }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-3"
            >
              <span className="font-mono text-[8px] uppercase tracking-[0.34em] text-[#6FB58E]/85 [text-shadow:0_0_8px_rgba(111,181,142,0.7)]">
                status: nominal
              </span>
              <svg viewBox="0 0 100 20" className="w-4/5 text-[#6FB58E]/75" fill="none">
                <motion.path
                  d="M0 10 H38 l2.5 -7 l2 9 l2.5 -8 l2 6 H100"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: "drop-shadow(0 0 4px rgba(111,181,142,0.6))" }}
                  animate={reduce ? {} : { opacity: [0.55, 1, 0.55] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>

            {/* glass curvature + vignette */}
            <div
              className="absolute inset-0"
              style={{ boxShadow: "inset 0 0 34px 8px rgba(0,0,0,0.85)" }}
            />
          </div>
        </div>
      </motion.div>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-[#9B9894]/35">
        the channel no one switched off
      </p>
    </div>
  );
}

export function InitiationFounderStorySection({ content }) {
  const sectionRef = useRef(null);
  const body = content.body;

  const surface = body.slice(1, 3);
  const breakLine = body[3];
  const scattered = body.slice(4, 8);
  const movement = body.slice(8, 10);
  const consequenceChain = body.slice(10, 13);
  const finalTruth = body.slice(13);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="initiation-founder-story-heading"
      className="relative z-10 scroll-mt-24 overflow-hidden bg-[#07070C] py-24 sm:py-28 lg:py-36"
    >
      <SectionBleed />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(219,39,119,0.08),transparent_30%),radial-gradient(circle_at_82%_72%,rgba(96,165,250,0.05),transparent_32%)]"
        aria-hidden="true"
      />

      <RevealSection>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.76fr_1.24fr] lg:gap-16">
            <aside className="lg:flex lg:flex-col">
              <div className="border-l border-[#DB2777]/25 pl-5 lg:sticky lg:top-24">
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#DB2777]/70">
                  03 / the private version
                </p>
                <p className="mt-3 max-w-xs text-sm uppercase tracking-[0.22em] text-[#9B9894]/70">
                  The business looked strong from the outside.
                </p>

                <div className="mt-8 rounded-2xl border border-white/[0.08] bg-black/[0.3] p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#DB2777]/65">
                    Behind the scenes
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#B8B5B0]">Being busy wasn't being in control.</p>
                </div>
              </div>

              <FounderCrtTv progressTarget={sectionRef} />
            </aside>

            <div>
              <RevealLine
                as="h2"
                id="initiation-founder-story-heading"
                className="max-w-4xl font-serif text-3xl font-semibold leading-[1.02] tracking-[-0.035em] text-[#F3EFEC] sm:text-4xl lg:text-5xl"
              >
                {content.headline}
              </RevealLine>

              <p className="mt-10 max-w-3xl text-xl leading-9 tracking-[-0.015em] text-[#E8E6E3] sm:text-2xl">
                {body[0]}
              </p>

              <ConfessionRealityBreak surface={surface} breakLine={breakLine} scattered={scattered} />

              <div className="mt-16 border-l-2 border-[#DB2777]/40 pl-6">
                <p className="text-lg leading-8 text-[#9B9894]">{movement[0]}</p>
                <p className="mt-2 text-2xl font-semibold leading-9 tracking-[-0.02em] text-[#F3EFEC] sm:text-3xl">
                  {movement[1]}
                </p>
              </div>

              <div className="mt-12 space-y-px overflow-hidden rounded-2xl border border-white/[0.08]">
                {consequenceChain.map((line, index) => (
                  <div
                    key={line}
                    className="flex items-start gap-4 bg-white/[0.02] px-5 py-4"
                  >
                    <span className="mt-1 font-mono text-[10px] tabular-nums text-[#DB2777]/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-base leading-7 text-[#B8B5B0]">{line}</p>
                  </div>
                ))}
              </div>

              {(() => {
                // Ransom carries only the gut-punch kernel — massive. The rest of
                // the locked sentence stays in clean, readable type around it.
                const truthLine = finalTruth[finalTruth.length - 1];
                const KERNEL = "not strong enough";
                const idx = truthLine.indexOf(KERNEL);
                const pre = idx >= 0 ? truthLine.slice(0, idx).trim() : truthLine;
                const post = idx >= 0 ? truthLine.slice(idx + KERNEL.length).trim() : "";
                return (
                  <div className="mt-16 rounded-[2rem] border border-[#DB2777]/15 bg-[#120A10]/40 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)] sm:p-8 lg:p-10">
                    <p className="text-base leading-8 text-[#9B9894]">{finalTruth[0]}</p>
                    {pre ? (
                      <p className="mt-8 max-w-2xl text-xl leading-9 text-[#C2BFBA] sm:text-2xl">{pre}</p>
                    ) : null}
                    <div className="mt-4 text-[2.4rem] leading-[1.02] sm:text-[3.75rem] lg:text-[5.25rem]">
                      <RansomText text={KERNEL} baseSize={1} scrollReveal />
                    </div>
                    {post ? (
                      <p className="mt-5 max-w-2xl text-xl leading-9 text-[#C2BFBA] sm:text-2xl">{post}</p>
                    ) : null}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}

// Ransom-note treatment. Each letter is a torn scrap from a different source —
// mismatched fonts, papers, rotations — assembled into an accusation. Styling is
// deterministic (seeded by index) so server and client render identically.
const RANSOM_FONTS = [
  "Georgia, 'Times New Roman', serif",
  "'Courier New', Courier, monospace",
  "Arial, Helvetica, sans-serif",
  "Impact, 'Arial Narrow Bold', sans-serif",
  "'Times New Roman', Times, serif",
  "'Trebuchet MS', Verdana, sans-serif",
];

const RANSOM_PAPERS = [
  { bg: "#ECE6D8", fg: "#15110B" },
  { bg: "#F3F0E6", fg: "#1A1A1A" },
  { bg: "#1B1A17", fg: "#EDE8DC" },
  { bg: "#DED7C5", fg: "#1A1712" },
  { bg: "#0B0B0C", fg: "#E8E6E3" },
  { bg: "#C7C0AE", fg: "#16130D" },
  { bg: "#DB2777", fg: "#0B0B0C" },
];

// Hand-tuned torn-paper silhouettes (kept slightly irregular but never
// degenerate). Picked per letter so every scrap looks ripped from elsewhere.
const RANSOM_CLIPS = [
  "polygon(2% 6%, 38% 0%, 72% 5%, 100% 2%, 97% 44%, 100% 92%, 64% 100%, 30% 96%, 3% 100%, 0% 58%)",
  "polygon(0% 8%, 30% 2%, 68% 0%, 98% 7%, 100% 50%, 96% 96%, 62% 100%, 26% 94%, 4% 99%, 2% 50%)",
  "polygon(4% 2%, 40% 6%, 74% 0%, 96% 6%, 100% 46%, 98% 90%, 70% 98%, 34% 100%, 6% 95%, 0% 52%)",
  "polygon(0% 4%, 34% 0%, 70% 6%, 100% 0%, 96% 48%, 100% 94%, 66% 100%, 28% 98%, 2% 100%, 4% 50%)",
  "polygon(3% 0%, 36% 8%, 70% 2%, 100% 8%, 95% 50%, 99% 88%, 60% 100%, 32% 92%, 0% 98%, 2% 46%)",
];

// Inline fractal-noise grain, multiplied over each scrap so paper reads as fiber
// and ink rather than flat fill.
const RANSOM_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

function ransomRand(seed) {
  const x = Math.sin(seed) * 43758.5453;
  return x - Math.floor(x);
}

function RansomText({ text, className = "", baseSize = 1.6, scrollReveal = false }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  // Scroll-linked assembly: each torn scrap slams into place tied to scroll
  // position, so the accusation builds slow and painful at the reader's own pace
  // (no auto-play). The window is intentionally long so it takes real scrolling.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "start 22%"] });
  const [p, setP] = useState(reduce || !scrollReveal ? 1 : 0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce || !scrollReveal) return;
    setP(Math.min(1, Math.max(0, v)));
  });

  const letters = useMemo(
    () =>
      text.split("").map((ch, i) => {
        const font = RANSOM_FONTS[Math.floor(ransomRand(i * 12.9898 + 1) * RANSOM_FONTS.length)];
        const paper = RANSOM_PAPERS[Math.floor(ransomRand(i * 78.233 + 2) * RANSOM_PAPERS.length)];
        const clip = RANSOM_CLIPS[Math.floor(ransomRand(i * 21.41 + 6) * RANSOM_CLIPS.length)];
        const rotate = (ransomRand(i * 37.719 + 3) - 0.5) * 15;
        const size = 0.82 + ransomRand(i * 9.137 + 4) * 0.54;
        const yShift = (ransomRand(i * 5.117 + 5) - 0.5) * 10;
        const taped = ransomRand(i * 3.77 + 7) > 0.74;
        const tapeRot = (ransomRand(i * 8.21 + 8) - 0.5) * 22;
        return { ch, font, paper, clip, rotate, size, yShift, taped, tapeRot, key: i };
      }),
    [text],
  );

  // How many scraps are mid-landing at once — smaller = more strictly one-by-one.
  const SPREAD = 1.8;
  const total = text.length || 1;
  const easeOut = (x) => 1 - Math.pow(1 - x, 2.2);

  return (
    <span
      ref={ref}
      className={`inline-flex flex-wrap items-center gap-x-1.5 gap-y-3 ${className}`}
      aria-label={text}
    >
      {letters.map((l) => {
        if (l.ch === " ") {
          return <span key={l.key} className="w-2.5 sm:w-3.5" aria-hidden="true" />;
        }

        const scrap = (
          <>
            <span
              className="block px-2 py-1 font-bold leading-none"
              style={{
                fontFamily: l.font,
                color: l.paper.fg,
                backgroundColor: l.paper.bg,
                backgroundImage: RANSOM_GRAIN,
                backgroundBlendMode: "multiply",
                fontSize: `${l.size * baseSize}em`,
                clipPath: l.clip,
              }}
            >
              {l.ch}
            </span>
            {l.taped ? (
              <span
                aria-hidden="true"
                className="absolute left-1/2 -top-1.5 h-2.5 w-7 -translate-x-1/2"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(228,222,205,0.42), rgba(200,193,173,0.30))",
                  transform: `translateX(-50%) rotate(${l.tapeRot}deg)`,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.28)",
                }}
              />
            ) : null}
          </>
        );

        if (scrollReveal && !reduce) {
          const lp = easeOut(Math.min(1, Math.max(0, (p * (total + SPREAD) - l.key) / SPREAD)));
          return (
            <span
              key={l.key}
              aria-hidden="true"
              className="relative inline-block"
              style={{
                opacity: lp,
                transform: `translateY(${-22 + (l.yShift + 22) * lp}px) rotate(${
                  l.rotate * 2.3 + (l.rotate - l.rotate * 2.3) * lp
                }deg) scale(${0.44 + 0.56 * lp})`,
                filter: "drop-shadow(2px 5px 4px rgba(0,0,0,0.55))",
                willChange: "transform, opacity",
              }}
            >
              {scrap}
            </span>
          );
        }

        return (
          <motion.span
            key={l.key}
            aria-hidden="true"
            className="relative inline-block"
            style={{
              filter: "drop-shadow(2px 5px 4px rgba(0,0,0,0.55))",
              ...(reduce ? { transform: `rotate(${l.rotate}deg)` } : null),
            }}
            initial={reduce ? false : { opacity: 0, y: -18, rotate: l.rotate * 2.2, scale: 0.5 }}
            whileInView={reduce ? undefined : { opacity: 1, y: l.yShift, rotate: l.rotate, scale: 1 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={
              reduce ? undefined : { duration: 0.4, delay: l.key * 0.055, ease: [0.34, 1.56, 0.64, 1] }
            }
          >
            {scrap}
          </motion.span>
        );
      })}
    </span>
  );
}

/*
  ───────────────────────────────────────────────────────────────────────────
  ARC — luminance + tension. The page IS the product: pressure made visible,
  then lifted. Dark → light = "a business that becomes lighter to operate."

  ACT I · THE WEIGHT (near-black, magenta pressure) — dig the pain.
    Hero · 01 Recognition · 02 Mirror · 03 Confession
  ACT II · THE TURN (black, blue intelligence + first amber) — the reveal.
    04 Reframe · 05 Category · 06 System appears (eyes / light pivot)
  ACT III · LIGHTER TO OPERATE (graphite warming to bone) — proof → relief.
    07 Friday · 08 Compounding · 09 Confidence · 10 Pillars
    11 Diagnostic · 12 Entry · 13 Final CTA (full light payoff)

  Accent language: magenta #DB2777 = pressure · blue #60A5FA = intelligence
  · amber #D4A853 = the system / truth / relief.
  ───────────────────────────────────────────────────────────────────────────
*/

// Smoky seam: soft fade to near-black at top and bottom so adjacent dark
// sections dissolve into each other instead of meeting at a hard line. Tall and
// translucent on purpose — the transitions should feel murky, not organized.
function SectionBleed({ strength = 0.7 }) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 sm:h-40"
        style={{ background: `linear-gradient(to bottom, rgba(3,3,4,${strength}), transparent)` }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 sm:h-40"
        style={{ background: `linear-gradient(to top, rgba(3,3,4,${strength}), transparent)` }}
        aria-hidden="true"
      />
    </>
  );
}

// Reusable involuntary trigger: a sporadic glitch that fires on no fixed beat.
// To avoid the "same horizontal line on every slide" feel, it rotates through
// several flavors — scanline, TV vertical-roll, fractal static, a sound-wave
// equalizer, and a terminal trace. variant="auto" picks a random one per pulse;
// pass a specific name to pin a section. Reduced-motion: silent.
const GLITCH_VARIANTS = ["scanline", "roll", "static", "wave", "terminal"];

function SectionGlitchOverlay({ accent = "#DB2777", variant = "auto", z = "z-[3]" }) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const [pulse, setPulse] = useState(0);
  const [kind, setKind] = useState("scanline");

  useEffect(() => {
    if (reduce) return undefined;
    let timer;
    const loop = () => {
      timer = window.setTimeout(
        () => {
          setKind(
            variant === "auto"
              ? GLITCH_VARIANTS[Math.floor(Math.random() * GLITCH_VARIANTS.length)]
              : variant,
          );
          setPulse((p) => p + 1);
          loop();
        },
        4200 + Math.random() * 7200,
      );
    };
    loop();
    return () => window.clearTimeout(timer);
  }, [reduce, variant]);

  if (reduce || pulse === 0) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${z}`} aria-hidden="true">
      {kind === "scanline" ? (
        <motion.div
          key={pulse}
          className="absolute inset-x-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            boxShadow: `0 0 12px ${accent}`,
          }}
          initial={{ top: "-2%", opacity: 0 }}
          animate={{ top: ["0%", "100%"], opacity: [0, 0.85, 0] }}
          transition={{ duration: 0.5, ease: "linear" }}
        />
      ) : kind === "roll" ? (
        <motion.div
          key={pulse}
          className="absolute inset-x-0 h-20"
          style={{ background: `linear-gradient(to bottom, transparent, ${accent}26, transparent)` }}
          initial={{ top: "-25%", opacity: 0 }}
          animate={{ top: ["-25%", "110%"], opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: 0.7, ease: "linear" }}
        />
      ) : kind === "static" ? (
        <motion.svg
          key={pulse}
          className="absolute inset-0 h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.16, 0.05, 0.14, 0] }}
          transition={{ duration: 0.42 }}
        >
          <filter id={`gn-${uid}-${pulse}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              stitchTiles="stitch"
              seed={pulse}
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#gn-${uid}-${pulse})`} />
        </motion.svg>
      ) : kind === "wave" ? (
        <motion.div
          key={pulse}
          className="absolute inset-x-0 top-1/2 flex h-16 -translate-y-1/2 items-center justify-center gap-[3px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.55, 0] }}
          transition={{ duration: 0.6 }}
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.span
              key={i}
              className="w-[2px] rounded-full"
              style={{ backgroundColor: accent }}
              initial={{ height: 2 }}
              animate={{
                height: [2, 4 + Math.abs(Math.sin(i * 0.5)) * 30 * (0.4 + Math.random() * 0.6), 2],
              }}
              transition={{ duration: 0.5, delay: i * 0.004, ease: "easeOut" }}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          key={pulse}
          className="absolute bottom-5 left-5 font-mono text-[10px] tracking-[0.2em]"
          style={{ color: accent }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.2, 1, 0] }}
          transition={{ duration: 0.7 }}
        >
          {`› 0x${Math.floor(Math.random() * 0xffffff)
            .toString(16)
            .padStart(6, "0")} :: trace`}
          <span
            className="ml-1 inline-block h-3 w-[7px] translate-y-[2px] align-middle"
            style={{ backgroundColor: accent }}
          />
        </motion.div>
      )}
    </div>
  );
}

// Reusable scroll parallax: a MotionValue that drifts `from`→`to` as the target
// scrolls through the viewport. Pair with style={{ y }} on a motion element.
function useParallaxValue(ref, from, to) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return useTransform(scrollYProgress, [0, 1], [from, to]);
}

// Shared noir section shell for the reframed page: sticky chapter index + rail,
// act-driven accent and background. Replaces the retired SectionGrid/mint shell.
function StorySection({ id, index, label, accent = "#DB2777", bg = "#0A0A11", aside, children }) {
  return (
    <section
      id={id}
      className="relative z-10 scroll-mt-24 overflow-hidden py-24 sm:py-28 lg:py-32"
      style={{ backgroundColor: bg }}
    >
      <SectionBleed />
      <RevealSection>
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.26fr_0.74fr] lg:gap-14">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border-l pl-5" style={{ borderColor: `${accent}40` }}>
              <p className="font-mono text-xs uppercase tracking-[0.28em]" style={{ color: `${accent}cc` }}>
                {index}
              </p>
              <p className="mt-3 max-w-[14rem] text-sm uppercase tracking-[0.2em] text-[#9B9894]/65">
                {label}
              </p>
              {aside ? <div className="mt-8">{aside}</div> : null}
            </div>
          </aside>
          <div>{children}</div>
        </div>
      </RevealSection>
    </section>
  );
}

// ── 04 REFRAME · "That is dependency." ───────────────────────────────────────
// UNIQUE (Layer 3): the founder-roles stack ONTO one figure and physically pile
// up (weight) until the word "scale" buckles into "dependency." Mind-fuck:
// success reframed as a trap. Verdict lands in clean type after the pile-up.
export function InitiationContinuityReframeSection({ content }) {
  const reduce = useReducedMotion();
  const { mark } = useProgression();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-25% 0px" });

  const roles = content.body.slice(0, 6);
  const smallTruth = content.body[6];
  const liability = content.body[7];
  const realization = content.body[8];
  const notScale = content.body[9];
  const dependency = content.body[10];

  const [loaded, setLoaded] = useState(reduce ? roles.length : 0);
  const [buckled, setBuckled] = useState(false);
  const [crushed, setCrushed] = useState(false);

  const drift = useParallaxValue(sectionRef, reduce ? 0 : 36, reduce ? 0 : -36);
  const fullyLoaded = loaded >= roles.length;
  const loadPct = Math.round((loaded / roles.length) * 100);
  const tilts = [-1.4, 1.1, -0.8, 1.5, -1.1, 0.7];

  // The weight piles on, one responsibility at a time, as you arrive.
  useEffect(() => {
    if (reduce || !inView || buckled || loaded >= roles.length) return undefined;
    const timer = window.setTimeout(() => setLoaded((n) => n + 1), 480);
    return () => window.clearTimeout(timer);
  }, [inView, loaded, buckled, reduce, roles.length]);

  // After the buckle, "scale" crushes and reforms as "dependency".
  useEffect(() => {
    if (!buckled) return undefined;
    if (reduce) {
      setCrushed(true);
      return undefined;
    }
    const timer = window.setTimeout(() => setCrushed(true), 900);
    return () => window.clearTimeout(timer);
  }, [buckled, reduce]);

  function buckle() {
    if (buckled) return;
    setBuckled(true);
    mark("reframe");
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="initiation-continuity-heading"
      className="relative z-10 scroll-mt-24 overflow-hidden bg-[#09090F] py-24 sm:py-28 lg:py-32"
    >
      <SectionBleed />
      <SectionGlitchOverlay accent="#DB2777" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(219,39,119,0.08),transparent_32%)]"
        aria-hidden="true"
      />

      <RevealSection>
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#DB2777]/75">
              04 / the reframe
            </p>
            <h2
              id="initiation-continuity-heading"
              className="mt-7 font-serif text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-[#F3EFEC] sm:text-5xl lg:text-6xl"
            >
              {content.headline}
            </h2>
            <RevealLine
              as="p"
              delayMs={120}
              className="mx-auto mt-7 max-w-3xl text-2xl font-semibold leading-tight tracking-[-0.035em] text-[#D4A853] sm:text-3xl lg:text-4xl"
            >
              {content.subheadline}
            </RevealLine>
          </div>

          {/* THE PILE — responsibilities stack onto one bearer until it buckles */}
          <div className="relative mx-auto mt-14 max-w-lg" style={{ perspective: 1000 }}>
            <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em]">
              <span style={{ color: fullyLoaded ? "#DB2777" : "#9B9894" }}>load</span>
              <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.span
                  className="block h-full rounded-full"
                  style={{ backgroundColor: fullyLoaded ? "#DB2777" : "#D4A853" }}
                  animate={{ width: `${loadPct}%` }}
                  transition={{ ease: "easeOut", duration: 0.4 }}
                />
              </span>
              <span style={{ color: fullyLoaded ? "#DB2777" : "#9B9894" }}>{loadPct}%</span>
            </div>

            <motion.div
              style={{ y: drift, transformOrigin: "bottom" }}
              animate={
                buckled
                  ? { scaleY: reduce ? 1 : 0.8, y: reduce ? 0 : 12 }
                  : fullyLoaded && !reduce
                    ? { x: [0, -1.5, 1.5, -1, 0] }
                    : {}
              }
              transition={
                buckled
                  ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                  : { duration: 0.45, repeat: Infinity, repeatDelay: 1.6 }
              }
            >
              <div className="flex flex-col gap-1.5">
                {roles.map((_, i) => {
                  const idx = roles.length - 1 - i;
                  const role = roles[idx];
                  const on = idx < loaded;
                  const tilt = tilts[idx] || 0;
                  return (
                    <motion.div
                      key={role}
                      initial={false}
                      animate={
                        on
                          ? { opacity: 1, y: 0, rotate: buckled ? 0 : tilt, scaleY: buckled ? 0.9 : 1 }
                          : { opacity: 0, y: -26, rotate: tilt * 2 }
                      }
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="rounded-lg border border-white/[0.1] bg-gradient-to-b from-white/[0.07] to-white/[0.02] px-4 py-3"
                      style={{ boxShadow: "0 8px 20px rgba(0,0,0,0.4)" }}
                    >
                      <p className="text-sm leading-6 text-[#D8D4CE] sm:text-[15px]">{role}</p>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                className="relative mt-1.5 overflow-hidden rounded-lg border border-[#DB2777]/30 bg-[#DB2777]/[0.06]"
                style={{ transformOrigin: "bottom" }}
                animate={{ scaleY: buckled ? (reduce ? 0.7 : 0.5) : 1 - (loaded / roles.length) * 0.4 }}
                transition={{ ease: "easeOut", duration: 0.4 }}
              >
                <div className="flex items-center justify-between px-4 py-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#DB2777]">
                    the founder
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#DB2777]/70">
                    {buckled ? "buckling" : "bearing the load"}
                  </span>
                </div>
                {buckled ? (
                  <svg
                    viewBox="0 0 100 6"
                    preserveAspectRatio="none"
                    className="absolute inset-x-0 top-0 h-1.5 w-full"
                    aria-hidden="true"
                  >
                    <polyline
                      points="0,3 14,1 26,5 38,2 52,5 64,1 78,4 90,2 100,4"
                      fill="none"
                      stroke="#DB2777"
                      strokeWidth="0.6"
                    />
                  </svg>
                ) : null}
              </motion.div>
            </motion.div>

            <div className="mt-7 min-h-[3.5rem] text-center">
              {!fullyLoaded ? (
                <p className="text-sm leading-7 text-[#7E7B77]">{smallTruth}</p>
              ) : !buckled ? (
                <div className="flex flex-col items-center gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#DB2777]">
                    structure straining
                  </p>
                  <button
                    type="button"
                    onClick={buckle}
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#D4A853] px-7 py-3 text-sm font-semibold text-[#1a1205] transition hover:bg-[#e0b766] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853]"
                  >
                    Scale it
                    <span aria-hidden="true">↑</span>
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          {/* THE TRAP SPRINGS — growth is the load that breaks it */}
          <AnimatePresence>
            {buckled ? (
              <motion.div
                key="trap"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mx-auto mt-14 max-w-3xl text-center"
              >
                <RevealLine
                  as="p"
                  className="font-serif text-2xl font-semibold leading-snug tracking-[-0.025em] text-[#F3EFEC] sm:text-3xl"
                >
                  {liability}
                </RevealLine>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#B8B5B0] sm:text-[17px]">
                  {realization}
                </p>

                <div className="relative mt-10 flex h-[4.5rem] items-center justify-center sm:h-24">
                  <AnimatePresence mode="wait">
                    {!crushed ? (
                      <motion.p
                        key="notscale"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { scaleY: 0.12, opacity: 0, filter: "blur(5px)" }}
                        transition={{ duration: 0.35 }}
                        style={{ transformOrigin: "center 65%" }}
                        className="font-serif text-3xl font-semibold tracking-[-0.03em] text-[#F3EFEC] sm:text-5xl"
                      >
                        {notScale}
                      </motion.p>
                    ) : (
                      <motion.p
                        key="dep"
                        initial={reduce ? false : { scale: 1.25, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 420, damping: 16 }}
                        className="font-serif text-4xl font-semibold tracking-[-0.04em] text-[#DB2777] sm:text-6xl"
                        style={{ textShadow: "0 0 30px rgba(219,39,119,0.4)" }}
                      >
                        {dependency}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </RevealSection>
    </section>
  );
}

// ── 05 CATEGORY BREAK · "Prompting is still work." ───────────────────────────
// UNIQUE (Layer 3): the SITCOM device — render a bright, cheerful "AI dashboard"
// fantasy (fake wins, laugh-track energy), then strip the set away to expose the
// work that still lands on the founder. Mind-fuck: the comforting AI illusion,
// killed on screen.
export function InitiationAICategorySection({ content }) {
  const reduce = useReducedMotion();
  const { mark } = useProgression();
  const sectionRef = useRef(null);

  const items = content.body.slice(1, 6);
  const reality = content.body[6];
  const aftermath = content.body.slice(7);

  const [completed, setCompleted] = useState(reduce ? items.length : 0);
  const [killed, setKilled] = useState(false);
  const [glitchRow, setGlitchRow] = useState(-1);

  const setDrift = useParallaxValue(sectionRef, reduce ? 0 : 30, reduce ? 0 : -30);
  const allDone = completed >= items.length;

  // The set assembles itself — work ticks to "done" one satisfying row at a time.
  useEffect(() => {
    if (reduce || killed || completed >= items.length) return undefined;
    const timer = window.setTimeout(() => setCompleted((c) => c + 1), 520);
    return () => window.clearTimeout(timer);
  }, [completed, killed, reduce, items.length]);

  // Involuntary: once it looks "handled", a random row keeps flickering back to
  // YOU. The comfort never quite holds. (Foreshadows the strike.)
  useEffect(() => {
    if (reduce || killed || !allDone) return undefined;
    let timer;
    const loop = () => {
      timer = window.setTimeout(() => {
        setGlitchRow(Math.floor(Math.random() * items.length));
        window.setTimeout(() => setGlitchRow(-1), 260);
        loop();
      }, 1800 + Math.random() * 2600);
    };
    loop();
    return () => window.clearTimeout(timer);
  }, [reduce, killed, allDone, items.length]);

  function strike() {
    if (killed) return;
    setKilled(true);
    mark("category");
  }

  const accent = killed ? "#DB2777" : "#60A5FA";

  return (
    <section
      ref={sectionRef}
      aria-labelledby="initiation-ai-category-heading"
      className="relative z-10 scroll-mt-24 overflow-hidden bg-[#0B0B12] py-24 sm:py-28 lg:py-32"
    >
      <SectionBleed />
      <SectionGlitchOverlay accent={accent} />
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-700"
        style={{
          background: killed
            ? "radial-gradient(60% 50% at 50% 30%, rgba(219,39,119,0.09), transparent 62%)"
            : "radial-gradient(60% 50% at 50% 22%, rgba(96,165,250,0.08), transparent 62%)",
        }}
        aria-hidden="true"
      />

      <RevealSection>
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <p
              className="font-mono text-xs uppercase tracking-[0.3em] transition-colors duration-500"
              style={{ color: killed ? "rgba(219,39,119,0.8)" : "rgba(96,165,250,0.8)" }}
            >
              05 / category break
            </p>
            <span
              className="h-px flex-1 transition-[background] duration-500"
              style={{
                background: `linear-gradient(to right, ${
                  killed ? "rgba(219,39,119,0.3)" : "rgba(96,165,250,0.3)"
                }, transparent)`,
              }}
            />
          </div>

          <h2
            id="initiation-ai-category-heading"
            className="mt-6 max-w-4xl font-serif text-4xl font-semibold leading-[1.0] tracking-[-0.04em] text-[#F3EFEC] sm:text-5xl lg:text-6xl"
          >
            {content.headline}
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#9B9894] sm:text-[17px]">
            {content.body[0]}
          </p>

          <motion.div style={{ y: setDrift }} className="relative mt-12 min-h-[26rem]">
            <AnimatePresence mode="wait" initial={false}>
              {!killed ? (
                <motion.div
                  key="set"
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    reduce
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          y: 70,
                          scale: 0.95,
                          filter: "grayscale(1) brightness(0.55)",
                          rotate: -1.4,
                        }
                  }
                  transition={{ duration: reduce ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden rounded-[1.75rem] border border-black/10 bg-gradient-to-br from-[#FDFBF5] to-[#ECE3D2] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.5)] sm:p-8"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                    <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.24em] text-black/45">
                      your tools — synced
                    </span>
                    <span className="ml-auto inline-flex items-center gap-2 rounded-full bg-[#28C840]/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#1c7a32]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
                      {allDone ? "all tracked" : "syncing"}
                    </span>
                  </div>

                  <ul className="mt-7 space-y-2.5">
                    {items.map((item, i) => {
                      const done = i < completed;
                      const glitched = glitchRow === i;
                      return (
                        <motion.li
                          key={item}
                          animate={glitched ? { x: [0, -3, 3, 0] } : { x: 0 }}
                          transition={{ duration: 0.24 }}
                          className="flex items-center justify-between rounded-xl border px-4 py-3 transition-colors duration-200"
                          style={{
                            opacity: done ? 1 : 0.5,
                            borderColor: glitched ? "rgba(192,57,43,0.5)" : "rgba(0,0,0,0.06)",
                            backgroundColor: glitched ? "rgba(192,57,43,0.06)" : "rgba(255,255,255,0.7)",
                          }}
                        >
                          <span className="text-sm font-medium text-black/75">{item}</span>
                          {glitched ? (
                            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#c0392b]">
                              still on you
                            </span>
                          ) : done ? (
                            <motion.span
                              initial={reduce ? false : { scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 18 }}
                              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#1c7a32]"
                            >
                              done
                              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#28C840] text-[9px] text-white">
                                ✓
                              </span>
                            </motion.span>
                          ) : (
                            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/30">
                              ···
                            </span>
                          )}
                        </motion.li>
                      );
                    })}
                  </ul>

                  <div className="mt-6">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/10">
                      <motion.div
                        className="h-full rounded-full bg-[#28C840]"
                        animate={{ width: `${(completed / items.length) * 100}%` }}
                        transition={{ ease: "easeOut", duration: 0.4 }}
                      />
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-black/35">
                        {allDone ? "[ looks handled ]" : "tracking…"}
                      </p>
                      {allDone ? (
                        <motion.button
                          type="button"
                          onClick={strike}
                          initial={reduce ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB2777]"
                        >
                          Strike the set
                        </motion.button>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="reality"
                  initial={reduce ? false : { opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-[1.75rem] border border-[#DB2777]/20 bg-[#08080d] p-7 shadow-[0_40px_120px_rgba(0,0,0,0.6)] sm:p-10"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#DB2777]/70">
                    — laugh track cuts —
                  </p>
                  <p className="mt-6 max-w-3xl font-serif text-2xl font-semibold leading-snug tracking-[-0.025em] text-[#F3EFEC] sm:text-3xl">
                    {reality}
                  </p>
                  <div className="mt-8 max-w-2xl space-y-4">
                    {aftermath.map((line) => (
                      <p key={line} className="text-base leading-8 text-[#B8B5B0] sm:text-[17px]">
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="mt-10 border-l-2 border-[#DB2777] pl-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#DB2777]/70">
                      the line in the sand
                    </p>
                    <RevealLine
                      as="p"
                      className="mt-3 font-serif text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-[#DB2777] sm:text-6xl"
                    >
                      {content.requiredLine}
                    </RevealLine>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </RevealSection>
    </section>
  );
}

// Premium black smoke around the eyes. Not a puff sprite — it's built from real
// fractal-noise turbulence: a fine layer that CHURNS (animated baseFrequency)
// masked into a ring so the eyes peer through, a coarse slow plume layer that
// drifts, and two large heavily-blurred dark masses for depth. Reduced-motion:
// static, no churn/drift.
function EyesSmoke({ reduce }) {
  const uid = useId().replace(/:/g, "");
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {!reduce ? (
        <>
          <motion.div
            className="absolute -inset-[25%] blur-[90px]"
            style={{ background: "radial-gradient(38% 46% at 32% 62%, rgba(0,0,0,0.92), transparent 70%)" }}
            animate={{ x: [0, 38, -18, 0], y: [0, -26, 18, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -inset-[25%] blur-[100px]"
            style={{ background: "radial-gradient(42% 50% at 70% 56%, rgba(0,0,0,0.94), transparent 72%)" }}
            animate={{ x: [0, -46, 26, 0], y: [0, 22, -14, 0], scale: [1.06, 1, 1.1, 1.06] }}
            transition={{ duration: 44, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      ) : (
        <div
          className="absolute -inset-[25%] blur-[90px]"
          style={{ background: "radial-gradient(40% 48% at 50% 60%, rgba(0,0,0,0.9), transparent 72%)" }}
        />
      )}

      <svg
        className="absolute inset-0 h-full w-full"
        style={{
          WebkitMaskImage: "radial-gradient(56% 46% at 50% 40%, transparent 24%, black 68%)",
          maskImage: "radial-gradient(56% 46% at 50% 40%, transparent 24%, black 68%)",
        }}
      >
        <filter id={`smk-${uid}`} colorInterpolationFilters="sRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.013 0.021"
            numOctaves="3"
            seed="7"
            stitchTiles="stitch"
            result="n"
          >
            {!reduce ? (
              <animate
                attributeName="baseFrequency"
                dur="26s"
                values="0.013 0.021;0.018 0.027;0.013 0.021"
                repeatCount="indefinite"
              />
            ) : null}
          </feTurbulence>
          <feColorMatrix
            in="n"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.34 0.34 0.34 0 0"
            result="blk"
          />
          <feComponentTransfer in="blk">
            <feFuncA type="gamma" amplitude="1" exponent="1.7" offset="0" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter={`url(#smk-${uid})`} />
      </svg>

      <motion.svg
        className="absolute inset-0 h-full w-full"
        style={{
          mixBlendMode: "multiply",
          WebkitMaskImage: "radial-gradient(72% 60% at 50% 46%, transparent 16%, black 82%)",
          maskImage: "radial-gradient(72% 60% at 50% 46%, transparent 16%, black 82%)",
        }}
        animate={reduce ? {} : { scale: [1, 1.07, 1], x: [0, 14, 0], y: [0, -10, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      >
        <filter id={`smk2-${uid}`} colorInterpolationFilters="sRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.006 0.01"
            numOctaves="2"
            seed="3"
            stitchTiles="stitch"
            result="n2"
          />
          <feColorMatrix
            in="n2"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.4 0.4 0.4 0 0"
            result="blk2"
          />
          <feComponentTransfer in="blk2">
            <feFuncA type="gamma" amplitude="1" exponent="1.3" offset="0" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter={`url(#smk2-${uid})`} />
      </motion.svg>
    </div>
  );
}

// Hypnagogic copy: each line blurs up out of nothing, then keeps a slow float +
// opacity shimmer on its OWN out-of-sync clock so the block breathes like a
// half-remembered thought rather than sitting as a static frame. Headline gets a
// soft amber glow-pulse. Reduced-motion: plain static text.
function DreamLine({ as = "p", id, className, children, index = 0, reduce, glow = false }) {
  if (reduce) {
    const Plain = as;
    return (
      <Plain id={id} className={className}>
        {children}
      </Plain>
    );
  }
  const M = motion[as];
  const dur = 7 + (index % 3) * 1.7;
  const phase = (index % 4) * 0.8;
  const floatAnim = glow
    ? {
        y: [0, -4, 0, 3, 0],
        scale: [1, 1.012, 1],
        opacity: [1, 0.92, 1],
        textShadow: [
          "0 0 24px rgba(212,168,83,0)",
          "0 0 30px rgba(212,168,83,0.22)",
          "0 0 24px rgba(212,168,83,0)",
        ],
      }
    : {
        y: [0, -5, 0, 4, 0],
        opacity: [1, 0.8, 1],
        filter: ["blur(0px)", "blur(0.6px)", "blur(0px)"],
      };
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 1.7, delay: 0.18 * index, ease: [0.16, 1, 0.3, 1] }}
    >
      <M
        id={id}
        className={className}
        animate={floatAnim}
        transition={{ duration: dur, delay: 1.6 + phase, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </M>
    </motion.div>
  );
}

export function InitiationStudioFlowsRevealSection({ content }) {
  const reduce = useReducedMotion();
  const stageRef = useRef(null);
  // offset start/start → end/end maps progress 0→1 to EXACTLY the window the
  // sticky stage is pinned to the screen, so the whole fade + parallax happens
  // in place (not before it pins or after it has scrolled away).
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  // Scroll in → eyes rise out of black; hold; scroll out → dissolve back to black
  // (fully gone by ~0.85 so there's a clean black beat before the copy enters).
  const eyesOpacity = useTransform(scrollYProgress, [0, 0.16, 0.64, 0.9], [0, 1, 1, 0]);
  const smokeOpacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 0.9], [0, 1, 1, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.45, 0.82], [0, 1, 0]);
  // Parallax — the gaze drifts (Ken Burns) while the smoke drifts the other way.
  const eyesY = useTransform(scrollYProgress, [0, 1], ["-7%", "9%"]);
  const eyesScale = useTransform(scrollYProgress, [0, 1], [1.18, 1.0]);
  const smokeY = useTransform(scrollYProgress, [0, 1], ["12%", "-14%"]);

  return (
    <section
      id={content.anchor}
      aria-labelledby="initiation-studioflows-reveal-heading"
      className="relative z-10 scroll-mt-24 bg-black"
    >
      {/* THE WATCHER — a scroll-pinned stage so the gaze rises and dissolves */}
      <div ref={stageRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* graded eyes, parallax drift + scroll-driven fade */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: reduce ? 1 : eyesOpacity,
              y: reduce ? 0 : eyesY,
              scale: reduce ? 1 : eyesScale,
            }}
            aria-hidden="true"
          >
            <Image
              src="/vessa-watching.png"
              alt=""
              fill
              sizes="100vw"
              priority={false}
              className="object-cover"
              style={{
                objectPosition: "50% 38%",
                filter: "grayscale(0.95) contrast(1.14) brightness(0.68)",
              }}
            />
            <div className="absolute inset-0 bg-[#D4A853]/[0.04] mix-blend-overlay" />
          </motion.div>

          {/* iris glow — the gaze breathing (fades with scroll) */}
          <motion.div
            className="pointer-events-none absolute inset-0 flex items-start justify-center"
            style={{ opacity: reduce ? 0.5 : glowOpacity }}
            aria-hidden="true"
          >
            <motion.div
              className="mt-[24vh] h-44 w-[62%] rounded-full blur-[90px]"
              style={{ background: "radial-gradient(circle, rgba(212,168,83,0.14), transparent 70%)" }}
              animate={reduce ? {} : { opacity: [0.3, 0.62, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* the smoke — drifts opposite the gaze, fades with scroll */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{ opacity: reduce ? 0.85 : smokeOpacity, y: reduce ? 0 : smokeY }}
            aria-hidden="true"
          >
            <EyesSmoke reduce={reduce} />
          </motion.div>

          {/* hold everything inside black: edges + top/bottom always resolve to #050509 */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(62% 58% at 50% 40%, transparent 26%, rgba(0,0,0,0.7) 60%, #000 100%)",
            }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-black" aria-hidden="true" />

          <p className="absolute inset-x-0 bottom-[12vh] text-center font-mono text-xs uppercase tracking-[0.3em] text-[#D4A853]/70">
            06 / the system appears
          </p>
        </div>
      </div>

      {/* the statement — surfaces like a half-dream once the gaze dissolves */}
      <div className="relative z-10 mx-auto max-w-3xl px-5 pb-24 pt-4 text-center sm:px-8 lg:pb-32">
        <DreamLine
          as="h2"
          id="initiation-studioflows-reveal-heading"
          index={0}
          reduce={reduce}
          glow
          className="font-serif text-3xl font-semibold leading-[1.04] tracking-[-0.035em] text-[#F3EFEC] sm:text-4xl lg:text-5xl"
        >
          {content.headline}
        </DreamLine>
        <div className="mt-8 space-y-5">
          {content.body.map((text, i) => (
            <DreamLine
              key={text}
              index={i + 1}
              reduce={reduce}
              className="mx-auto max-w-2xl text-base leading-8 text-[#C2BFBA] sm:text-[17px]"
            >
              {text}
            </DreamLine>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 07 FRIDAY REPORT · "Again." ──────────────────────────────────────────────
// UNIQUE (Layer 3): the REWIND. A scrubbable VHS "tape" of Thursday night races
// to the panic, stamps "Again.", auto-rewinds and LOOPS (Angela's compulsive
// rewind — rewinding fixes nothing). Hit "Run it with StudioFlows" and the same
// timeline replays, but the system flags the drift EARLY and the emergency never
// lands. Reduced-motion: static end-state, manual mode toggle, no loop.
const FRIDAY_MARKERS = [0.1, 0.22, 0.34, 0.46, 0.58, 0.7];

function fridayTimecode(p) {
  const total = 23 * 60 + 6 + Math.round(p * 252); // THU 23:06 → ~03:18
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export function InitiationFridayReportSection({ content }) {
  const reduce = useReducedMotion();
  const { mark } = useProgression();
  const sectionRef = useRef(null);
  // Fire only once the section is well into the viewport — so the tape starts
  // "when you get here", not while it's still scrolling up from below.
  const inView = useInView(sectionRef, { margin: "-35% 0px -35% 0px" });
  const trackRef = useRef(null);
  const dragging = useRef(false);
  const started = useRef(false);

  const [mode, setMode] = useState("unaided");
  const [progress, setProgress] = useState(reduce ? 1 : 0);
  const [playing, setPlaying] = useState(false);
  const [rewinding, setRewinding] = useState(false);

  // autoplay loop forward
  useEffect(() => {
    if (reduce || !playing) return undefined;
    const iv = window.setInterval(() => {
      setProgress((p) => Math.min(1, p + 0.00375));
    }, 60);
    return () => window.clearInterval(iv);
  }, [reduce, playing]);

  // play once, then HOLD on the climax — no infinite loop. The visitor is left
  // stuck on "Again." (or on the resolved system view) with the controls + the
  // "Run it with StudioFlows" CTA to move forward at their own pace.
  useEffect(() => {
    if (reduce || progress < 1) return undefined;
    setPlaying(false);
    return undefined;
  }, [progress, reduce]);

  // come alive when scrolled into view
  useEffect(() => {
    if (reduce || !inView || started.current) return;
    started.current = true;
    setPlaying(true);
  }, [inView, reduce]);

  function setFromClientX(cx) {
    const el = trackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setProgress(Math.min(1, Math.max(0, (cx - r.left) / r.width)));
  }
  function onPointerDown(e) {
    dragging.current = true;
    setPlaying(false);
    if (e.currentTarget.setPointerCapture) e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  }
  function onPointerMove(e) {
    if (dragging.current) setFromClientX(e.clientX);
  }
  function endDrag() {
    dragging.current = false;
  }

  function runWithSystem() {
    setMode("system");
    setProgress(0);
    setRewinding(false);
    setPlaying(!reduce);
    mark("friday");
  }
  function replayUnaided() {
    setMode("unaided");
    setProgress(reduce ? 1 : 0);
    setPlaying(!reduce);
  }

  const isSystem = mode === "system";
  const accent = isSystem ? "#D4A853" : "#DB2777";
  const seen = FRIDAY_MARKERS.filter((m) => progress > m).length;
  const systemDone = isSystem && progress >= 0.98;
  const panic = !isSystem && progress >= 0.92;

  // narration streams one short beat at a time as the tape advances
  const unaidedBeat = content.unaidedBeats[Math.min(seen, content.unaidedBeats.length - 1)];
  const systemBeat = content.systemBeats[Math.min(seen, content.systemBeats.length - 1)];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="initiation-friday-report-heading"
      className="relative z-10 scroll-mt-24 overflow-hidden bg-[#0A0B12] py-24 sm:py-28 lg:py-32"
    >
      <SectionBleed />
      <SectionGlitchOverlay accent={accent} variant="roll" />

      <RevealSection>
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#D4A853]/80">
              07 / before the scramble
            </p>
            <span className="h-px flex-1 bg-gradient-to-r from-[#D4A853]/30 to-transparent" />
          </div>

          <h2
            id="initiation-friday-report-heading"
            className="mt-6 max-w-3xl font-serif text-3xl font-semibold leading-[1.02] tracking-[-0.035em] text-[#F3EFEC] sm:text-4xl lg:text-5xl"
          >
            {content.headline}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#C2BFBA] sm:text-[17px]">{content.intro}</p>

          {/* THE TAPE */}
          <div
            className="relative mt-10 overflow-hidden rounded-[1.5rem] border bg-[#070810]"
            style={{ borderColor: isSystem ? "rgba(212,168,83,0.25)" : "rgba(219,39,119,0.25)" }}
          >
            {/* scanlines */}
            <div
              className="pointer-events-none absolute inset-0 z-[2] opacity-[0.14]"
              style={{
                backgroundImage: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.5) 0 1px, transparent 1px 3px)",
              }}
              aria-hidden="true"
            />
            {/* rewind streak */}
            {rewinding && !reduce ? (
              <motion.div
                className="pointer-events-none absolute inset-0 z-[3] bg-[#DB2777]/[0.07]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 1.1 }}
                aria-hidden="true"
              >
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-mono text-xs uppercase tracking-[0.4em] text-[#DB2777]">
                  ◀◀ rewind
                </div>
              </motion.div>
            ) : null}

            {/* monitor header */}
            <div className="relative z-[2] flex items-center justify-between border-b border-white/[0.06] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em]">
              <span className="flex items-center gap-2" style={{ color: accent }}>
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }}
                />
                {isSystem ? "studioflows" : "field crew"} · {fridayTimecode(progress)}
              </span>
              <span className="text-[#9B9894]/70">job — 08:00 tomorrow</span>
            </div>

            {/* scene */}
            <div className="relative z-[1] min-h-[13rem] px-6 py-8 sm:min-h-[12rem] sm:px-8">
              {!isSystem ? (
                <AnimatePresence mode="wait">
                  {panic ? (
                    <motion.div
                      key="again"
                      initial={reduce ? false : { opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center text-center"
                    >
                      <motion.p
                        animate={reduce ? {} : { opacity: [1, 0.55, 1] }}
                        transition={{ duration: 1.1, repeat: Infinity }}
                        className="font-serif text-6xl font-semibold tracking-[-0.04em] text-[#DB2777] sm:text-8xl"
                        style={{ textShadow: "0 0 40px rgba(219,39,119,0.45)" }}
                      >
                        {content.panicLine}
                      </motion.p>
                    </motion.div>
                  ) : (
                    <motion.p
                      key={unaidedBeat}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="max-w-2xl font-serif text-2xl font-semibold leading-snug tracking-[-0.02em] text-[#E8E4DE] sm:text-3xl"
                    >
                      {unaidedBeat}
                    </motion.p>
                  )}
                </AnimatePresence>
              ) : (
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#D4A853]/60">
                    studioflows · scanning
                  </p>
                  {!systemDone ? (
                    <div className="mt-5 min-h-[3.5rem]">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={seen}
                          initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(4px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                          transition={{ duration: 0.4 }}
                          className="font-serif text-2xl font-semibold leading-snug tracking-[-0.02em] text-[#F3EFEC] sm:text-3xl"
                        >
                          {systemBeat}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4"
                    >
                      <p className="text-base leading-8 text-[#D8D4CE] sm:text-lg">{content.systemResolve[0]}</p>
                      <p className="mt-2 text-base leading-8 text-[#D8D4CE] sm:text-lg">{content.systemResolve[1]}</p>
                      <div className="mt-6 flex flex-wrap items-baseline gap-x-3">
                        <span className="font-serif text-2xl font-semibold tracking-[-0.025em] text-[#F3EFEC] sm:text-3xl">
                          {content.closer.lead}
                        </span>
                        <span className="text-[#9B9894] line-through decoration-[#DB2777]/60">
                          {content.closer.strike}
                        </span>
                        <span className="font-serif text-2xl font-semibold tracking-[-0.025em] text-[#D4A853] sm:text-3xl">
                          {content.closer.gold}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* scrub track */}
            <div className="relative z-[2] px-6 pb-3 sm:px-8">
              <div
                ref={trackRef}
                role="slider"
                tabIndex={0}
                aria-label="Scrub the timeline"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress * 100)}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                className="relative h-8 cursor-pointer touch-none select-none focus:outline-none"
              >
                <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/12" />
                <div
                  className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full"
                  style={{ width: `${progress * 100}%`, backgroundColor: accent }}
                />
                {/* markers */}
                {(isSystem ? FRIDAY_MARKERS : [0.74, 0.83, 0.91]).map((m, i) => {
                  const lit = isSystem && progress > m;
                  const col = isSystem ? (lit ? "#D4A853" : "rgba(212,168,83,0.4)") : "#DB2777";
                  return (
                    <span
                      key={i}
                      className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{ left: `${m * 100}%`, backgroundColor: col, opacity: isSystem ? 1 : 0.85 }}
                    />
                  );
                })}
                <div
                  className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
                  style={{ left: `${progress * 100}%`, backgroundColor: accent }}
                />
              </div>
              <p className="mt-1 text-center font-mono text-[9px] uppercase tracking-[0.3em] text-[#9B9894]/50">
                {isSystem ? content.scrubLabelSystem : content.scrubLabelUnaided}
              </p>

              {isSystem ? (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {content.revealItems.map((item, i) => {
                    const lit = progress > (FRIDAY_MARKERS[i] ?? 0.7);
                    return (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-300"
                        style={{
                          borderColor: lit ? "rgba(212,168,83,0.45)" : "rgba(255,255,255,0.08)",
                          backgroundColor: lit ? "rgba(212,168,83,0.08)" : "transparent",
                          color: lit ? "#E8E6E3" : "rgba(155,152,148,0.35)",
                        }}
                      >
                        <span style={{ color: lit ? "#D4A853" : "transparent" }} aria-hidden="true">
                          ✓
                        </span>
                        {item}
                      </span>
                    );
                  })}
                </div>
              ) : null}
            </div>

            {/* controls */}
            <div className="relative z-[2] flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] px-5 py-4 sm:px-8">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setProgress(0)}
                  aria-label="Rewind"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#C9C4BE] transition hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  ◀◀
                </button>
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  aria-label={playing ? "Pause" : "Play"}
                  disabled={reduce}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#C9C4BE] transition hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:opacity-40"
                >
                  {playing ? "❚❚" : "▶"}
                </button>
              </div>

              {isSystem ? (
                <button
                  type="button"
                  onClick={replayUnaided}
                  className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9B9894] transition hover:text-[#C9C4BE] focus:outline-none"
                >
                  ↺ replay unaided
                </button>
              ) : (
                <button
                  type="button"
                  onClick={runWithSystem}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#D4A853] px-6 py-2.5 text-sm font-semibold text-[#1a1205] transition hover:bg-[#e0b766] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853]"
                >
                  Run it with StudioFlows
                  <span aria-hidden="true">→</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}

// ── 08 COMPOUNDING · the system remembers ────────────────────────────────────
// UNIQUE (Layer 3): operational memory visibly ACCUMULATES as you scroll — a
// lattice wires itself together node by node, the "it learns…" lines ignite in
// sequence, and the outcome meters climb/drop in real time. The system gets
// smarter the longer you stay. Reduced-motion: fully-formed, static.
const MEMORY_NODES = [
  [50, 50],
  [27, 31],
  [73, 29],
  [19, 61],
  [41, 18],
  [63, 65],
  [82, 51],
  [34, 77],
  [58, 35],
  [70, 81],
  [15, 41],
  [45, 63],
];
const MEMORY_EDGES = [
  [0, 1],
  [0, 2],
  [0, 5],
  [0, 8],
  [1, 4],
  [1, 10],
  [1, 3],
  [2, 8],
  [2, 6],
  [5, 6],
  [5, 9],
  [5, 11],
  [3, 7],
  [8, 2],
  [6, 9],
  [11, 7],
  [3, 11],
  [4, 8],
];
const MEMORY_METERS = {
  "Approvals decrease": "down",
  "Routing improves": "up",
  "Execution speeds up": "up",
  "Coordination friction drops": "down",
  "Operational trust increases": "up",
};

// Line-icon set for the "what you get" feature lattice. Every stroke is a motion
// primitive that redraws itself on hover (driven by the parent svg's variant
// state), so the whole icon "writes itself" when the card lights up.
const FEATURE_ICON_DRAW = {
  rest: { pathLength: 1, opacity: 1 },
  draw: { pathLength: [0, 1], opacity: [0.25, 1] },
};

function FeatureIcon({ name, active, reduce }) {
  const p = {
    variants: FEATURE_ICON_DRAW,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  };
  const glyphs = {
    jobs: (
      <>
        <motion.rect x="5" y="4" width="14" height="17" rx="2" {...p} />
        <motion.rect x="9" y="2.5" width="6" height="3" rx="1" {...p} />
        <motion.line x1="9" y1="11" x2="15" y2="11" {...p} />
        <motion.line x1="9" y1="15" x2="15" y2="15" {...p} />
      </>
    ),
    calendar: (
      <>
        <motion.rect x="3" y="4.5" width="18" height="16" rx="2" {...p} />
        <motion.line x1="3" y1="9" x2="21" y2="9" {...p} />
        <motion.line x1="8" y1="2.5" x2="8" y2="6" {...p} />
        <motion.line x1="16" y1="2.5" x2="16" y2="6" {...p} />
        <motion.line x1="11" y1="13.5" x2="13" y2="13.5" {...p} />
      </>
    ),
    records: (
      <>
        <motion.rect x="3" y="5" width="18" height="14" rx="2" {...p} />
        <motion.circle cx="8" cy="11" r="2.1" {...p} />
        <motion.path d="M5 16.2 a3 3 0 0 1 6 0" {...p} />
        <motion.line x1="14" y1="10" x2="18" y2="10" {...p} />
        <motion.line x1="14" y1="14" x2="18" y2="14" {...p} />
      </>
    ),
    team: (
      <>
        <motion.circle cx="9" cy="8" r="3" {...p} />
        <motion.path d="M3 19 a6 6 0 0 1 12 0" {...p} />
        <motion.path d="M16 5.4 a3 3 0 0 1 0 5.2" {...p} />
        <motion.path d="M17.2 14.2 a6 6 0 0 1 3.8 4.8" {...p} />
      </>
    ),
    mobile: (
      <>
        <motion.rect x="7" y="2.5" width="10" height="19" rx="2.5" {...p} />
        <motion.line x1="11" y1="18.5" x2="13" y2="18.5" {...p} />
      </>
    ),
    files: (
      <>
        <motion.path d="M14 3 H7 a1 1 0 0 0 -1 1 v16 a1 1 0 0 0 1 1 h10 a1 1 0 0 0 1 -1 V7 z" {...p} />
        <motion.path d="M14 3 v4 h4" {...p} />
        <motion.line x1="9.5" y1="13" x2="14.5" y2="13" {...p} />
        <motion.line x1="9.5" y1="16.5" x2="14.5" y2="16.5" {...p} />
      </>
    ),
    portal: (
      <>
        <motion.circle cx="12" cy="12" r="9" {...p} />
        <motion.line x1="3" y1="12" x2="21" y2="12" {...p} />
        <motion.path d="M12 3 c4 4 4 14 0 18 c-4 -4 -4 -14 0 -18" {...p} />
      </>
    ),
    payments: (
      <>
        <motion.rect x="3" y="6" width="18" height="12" rx="2" {...p} />
        <motion.line x1="3" y1="10" x2="21" y2="10" {...p} />
        <motion.line x1="7" y1="14.5" x2="11" y2="14.5" {...p} />
      </>
    ),
    timeline: (
      <>
        <motion.path d="M2 12 h4 l2 -6 l3 12 l2 -8 l2 4 h5" {...p} />
      </>
    ),
    dashboard: (
      <>
        <motion.rect x="4" y="4" width="7" height="7" rx="1.5" {...p} />
        <motion.rect x="13" y="4" width="7" height="4" rx="1.5" {...p} />
        <motion.rect x="13" y="11" width="7" height="9" rx="1.5" {...p} />
        <motion.rect x="4" y="14" width="7" height="6" rx="1.5" {...p} />
      </>
    ),
  };

  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      initial="rest"
      animate={active && !reduce ? "draw" : "rest"}
      aria-hidden="true"
    >
      {glyphs[name] ?? glyphs.dashboard}
    </motion.svg>
  );
}

function FeatureCard({ feature, index, reduce }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.li
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduce ? undefined : { y: -4 }}
      className="group flex items-start gap-3.5 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5 transition-colors duration-300 hover:border-[#60A5FA]/30 hover:bg-[#60A5FA]/[0.04]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#60A5FA] transition-all duration-300 group-hover:scale-[1.07] group-hover:border-[#60A5FA]/45 group-hover:bg-[#60A5FA]/10 group-hover:text-[#9FC3F5] group-hover:shadow-[0_0_22px_rgba(96,165,250,0.3)]">
        <FeatureIcon name={feature.icon} active={hovered} reduce={reduce} />
      </span>
      <span>
        <span className="block text-[15px] font-semibold tracking-[-0.01em] text-[#EDEBE8]">
          {feature.name}
        </span>
        <span className="mt-0.5 block text-[13px] leading-6 text-[#8E8B87]">
          {feature.blurb}
        </span>
      </span>
    </motion.li>
  );
}

function MagnifyGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15.5 15.5 L21 21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10.5 7.5 V13.5 M7.5 10.5 H13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// Mobile-first magnifier. Tap any screenshot to open a full-screen viewer; tap the
// image to zoom 2.4x, then drag (pointer/touch) to pan. Arrows/Esc on desktop,
// swipe-friendly buttons on mobile. Reduced-motion safe.
function ProductLightbox({ state, onClose, onNavigate }) {
  const reduce = useReducedMotion();
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const open = Boolean(state);
  const item = state ? state.items[state.index] : null;
  const count = state ? state.items.length : 0;

  useEffect(() => {
    setZoom(false);
    setOrigin({ x: 50, y: 50 });
  }, [state?.index, open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNavigate(1);
      else if (e.key === "ArrowLeft") onNavigate(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, onNavigate]);

  function handlePointerMove(e) {
    if (!zoom) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  }

  const stop = (e) => e.stopPropagation();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[95] flex flex-col bg-black/92 backdrop-blur-md"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={item?.label ? `${item.label} — enlarged` : "Enlarged screenshot"}
          onClick={onClose}
        >
          <div
            className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6"
            onClick={stop}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#60A5FA]/80">
              {item?.label}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-lg text-[#E8E6E3] transition hover:bg-white/10"
            >
              ✕
            </button>
          </div>

          <div className="relative flex-1 overflow-hidden px-3 sm:px-6">
            <div
              className="relative mx-auto h-full w-full max-w-5xl select-none"
              style={{ cursor: zoom ? "zoom-out" : "zoom-in", touchAction: "none" }}
              onClick={(e) => {
                stop(e);
                setZoom((z) => !z);
                handlePointerMove(e);
              }}
              onPointerMove={handlePointerMove}
            >
              <motion.div
                className="relative h-full w-full"
                animate={{ scale: zoom ? 2.4 : 1 }}
                transition={{ duration: reduce ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `${origin.x}% ${origin.y}%` }}
              >
                {item ? (
                  <Image
                    src={item.src}
                    alt={item.label ? `StudioFlows — ${item.label}` : "StudioFlows screenshot"}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                ) : null}
              </motion.div>
            </div>
          </div>

          <div className="px-4 py-4 sm:px-6" onClick={stop}>
            {item?.caption ? (
              <p className="mx-auto max-w-3xl text-center text-[13px] leading-6 text-[#C2BFBA]">
                {item.caption}
              </p>
            ) : null}
            <div className="mt-3 flex items-center justify-center gap-5">
              {count > 1 ? (
                <button
                  type="button"
                  onClick={() => onNavigate(-1)}
                  aria-label="Previous screenshot"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#E8E6E3] transition hover:bg-white/10"
                >
                  ‹
                </button>
              ) : null}
              <span className="font-mono text-[11px] tracking-[0.2em] text-[#9B9894]">
                {count > 1
                  ? `${String(state.index + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`
                  : "tap image to magnify"}
              </span>
              {count > 1 ? (
                <button
                  type="button"
                  onClick={() => onNavigate(1)}
                  aria-label="Next screenshot"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#E8E6E3] transition hover:bg-white/10"
                >
                  ›
                </button>
              ) : null}
            </div>
            <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.24em] text-[#9B9894]/50">
              {zoom ? "drag to pan · tap to shrink" : "tap image to magnify"}
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

// ── 08 WHAT YOU GET · the product surfaces (DARK) ────────────────────────────
// The concrete StudioFlows OS. Feature lattice + real product screenshots framed
// like a live operator console. Noir, but the first time the page shows the
// product itself — proof, not promise.
export function InitiationWhatYouGetSection({ content }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const drift = useParallaxValue(sectionRef, reduce ? 0 : 26, reduce ? 0 : -26);
  const accent = "#60A5FA";

  const [lightbox, setLightbox] = useState(null);
  const openLightbox = useCallback((items, index) => setLightbox({ items, index }), []);
  const navigateLightbox = useCallback(
    (dir) =>
      setLightbox((s) =>
        s ? { ...s, index: (s.index + dir + s.items.length) % s.items.length } : s
      ),
    []
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="initiation-what-you-get-heading"
      className="relative z-10 scroll-mt-24 overflow-hidden bg-[#0B0B12] py-24 sm:py-28 lg:py-32"
    >
      <SectionBleed />
      <SectionGlitchOverlay accent={accent} variant="terminal" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 18%, rgba(96,165,250,0.08), transparent 62%)",
        }}
        aria-hidden="true"
      />

      <RevealSection>
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#60A5FA]/80">
              08 / what you get
            </p>
            <span className="h-px flex-1 bg-gradient-to-r from-[#60A5FA]/30 to-transparent" />
          </div>

          <h2
            id="initiation-what-you-get-heading"
            className="mt-6 max-w-4xl font-serif text-4xl font-semibold leading-[1.0] tracking-[-0.04em] text-[#F3EFEC] sm:text-5xl lg:text-6xl"
          >
            {content.headline}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#9B9894] sm:text-[17px]">
            {content.intro}
          </p>

          <motion.ul style={{ y: drift }} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
            {content.features.map((feature, i) => (
              <FeatureCard key={feature.name} feature={feature} index={i} reduce={reduce} />
            ))}
          </motion.ul>

          <div className="mt-10 max-w-2xl space-y-1.5">
            {content.body.map((line, i) => (
              <p
                key={line}
                className={
                  i === content.body.length - 1
                    ? "font-serif text-xl font-semibold leading-snug tracking-[-0.02em] text-[#F3EFEC] sm:text-2xl"
                    : "text-base leading-8 text-[#9B9894] sm:text-[17px]"
                }
              >
                {line}
              </p>
            ))}
          </div>

          <p className="mt-14 font-mono text-[11px] uppercase tracking-[0.24em] text-[#60A5FA]/70">
            {content.proofIntro}
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {content.proof.map((shot, i) => (
              <motion.figure
                key={shot.src}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#06060a] shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
              >
                <button
                  type="button"
                  onClick={() => openLightbox(content.proof, i)}
                  aria-label={`Enlarge ${shot.label} screenshot`}
                  className="group/zoom block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]/70"
                >
                  <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/80" />
                    <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9B9894]/70">
                      {shot.label}
                    </span>
                  </div>
                  <div className="relative aspect-[16/9] w-full cursor-zoom-in overflow-hidden bg-[#0b0b12]">
                    <Image
                      src={shot.src}
                      alt={`StudioFlows OS — ${shot.label}`}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-500 ease-out group-hover/zoom:scale-[1.04]"
                    />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/zoom:opacity-100" />
                    <span className="pointer-events-none absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/55 text-[#E8E6E3] opacity-70 backdrop-blur-sm transition duration-300 group-hover/zoom:scale-110 group-hover/zoom:opacity-100">
                      <MagnifyGlyph />
                    </span>
                  </div>
                </button>
                <figcaption className="px-4 py-3 text-[13px] leading-6 text-[#9B9894]">
                  {shot.caption}
                </figcaption>
              </motion.figure>
            ))}
          </div>

          {content.experience ? (
            <>
              <p className="mt-14 font-mono text-[11px] uppercase tracking-[0.24em] text-[#60A5FA]/70">
                {content.experienceIntro}
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-6">
                {content.experience.map((shot, i) => (
                  <motion.figure
                    key={shot.src}
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group"
                  >
                    <button
                      type="button"
                      onClick={() => openLightbox(content.experience, i)}
                      aria-label={`Enlarge ${shot.label} screen`}
                      className="group/zoom relative block w-full overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#06060a] p-1.5 shadow-[0_24px_70px_rgba(0,0,0,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA]/70 sm:rounded-[1.75rem] sm:p-2"
                    >
                      <div className="relative aspect-[9/18] w-full cursor-zoom-in overflow-hidden rounded-[0.9rem] bg-[#0b0b12] sm:rounded-[1.25rem]">
                        <Image
                          src={shot.src}
                          alt={`StudioFlows booking — ${shot.label}`}
                          fill
                          sizes="(min-width: 640px) 30vw, 33vw"
                          className="object-cover object-top transition-transform duration-500 ease-out group-hover/zoom:scale-[1.05]"
                        />
                        <span className="pointer-events-none absolute bottom-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/55 text-[#E8E6E3] opacity-70 backdrop-blur-sm transition duration-300 group-hover/zoom:scale-110 group-hover/zoom:opacity-100">
                          <MagnifyGlyph />
                        </span>
                      </div>
                    </button>
                    <figcaption className="mt-3 px-0.5">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-[#60A5FA]/80">
                        {String(i + 1).padStart(2, "0")} · {shot.label}
                      </span>
                      <span className="mt-1 block text-[12px] leading-5 text-[#8E8B87] sm:text-[13px] sm:leading-6">
                        {shot.caption}
                      </span>
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </RevealSection>

      <ProductLightbox
        state={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={navigateLightbox}
      />
    </section>
  );
}

// ── 08.5 FOUNDING CUSTOMER PROGRAM · the offer (DARK) ─────────────────────────
// Pricing made visible without a SaaS tier grid. One guided founding offer,
// framed as a partnership — a ledger of terms, not a comparison table. Premium,
// scarce, founder-led. Removes uncertainty; still sells the workflow review.
export function InitiationFoundingProgramSection({ content }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const drift = useParallaxValue(sectionRef, reduce ? 0 : 22, reduce ? 0 : -22);
  const accent = "#60A5FA";

  return (
    <section
      ref={sectionRef}
      aria-labelledby="initiation-founding-program-heading"
      className="relative z-10 scroll-mt-24 overflow-hidden bg-[#09090f] py-24 sm:py-28 lg:py-32"
    >
      <SectionBleed />
      <SectionGlitchOverlay accent={accent} variant="scanline" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 48% at 50% 16%, rgba(96,165,250,0.07), transparent 62%)",
        }}
        aria-hidden="true"
      />

      <RevealSection>
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#60A5FA]/80">
              08.5 / founding customer program
            </p>
            <span className="h-px flex-1 bg-gradient-to-r from-[#60A5FA]/30 to-transparent" />
          </div>

          <div className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-[#60A5FA]/25 bg-[#60A5FA]/[0.06] px-4 py-1.5">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              {!reduce ? (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#60A5FA]/60" />
              ) : null}
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#60A5FA]" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#9FC3F5]">
              {content.availability}
            </span>
          </div>

          <h2
            id="initiation-founding-program-heading"
            className="mt-6 max-w-3xl font-serif text-4xl font-semibold leading-[1.0] tracking-[-0.04em] text-[#F3EFEC] sm:text-5xl lg:text-[3.4rem]"
          >
            {content.headline}
          </h2>
          <div className="mt-6 max-w-2xl space-y-4">
            {content.body.map((line) => (
              <p key={line} className="text-base leading-8 text-[#9B9894] sm:text-[17px]">
                {line}
              </p>
            ))}
          </div>

          {/* the offer — a ledger of terms, not a pricing tier */}
          <motion.div
            style={{ y: drift }}
            className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] shadow-[0_40px_120px_rgba(0,0,0,0.55)] lg:grid-cols-[1.05fr_0.95fr]"
          >
            {/* terms ledger */}
            <div className="relative bg-[#07070c] p-7 sm:p-9">
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(120% 80% at 0% 0%, rgba(96,165,250,0.08), transparent 55%)",
                }}
                aria-hidden="true"
              />
              <div className="relative">
                <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-[#60A5FA]/75">
                  {content.programLabel}
                </p>
                <dl className="mt-6 divide-y divide-white/[0.07]">
                  {content.terms.map((term, i) => {
                    const isLast = i === content.terms.length - 1;
                    return (
                      <motion.div
                        key={term.label}
                        initial={reduce ? false : { opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-12% 0px" }}
                        transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-baseline justify-between gap-4 py-4"
                      >
                        <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8E8B87]">
                          {term.label}
                        </dt>
                        <dd
                          className={
                            isLast
                              ? "font-serif text-3xl font-semibold tracking-[-0.03em] text-[#F3EFEC] sm:text-4xl"
                              : "font-serif text-2xl font-semibold tracking-[-0.02em] text-[#D8D5D0] sm:text-[1.75rem]"
                          }
                        >
                          {term.value}
                          {isLast ? (
                            <span className="ml-1 align-baseline font-mono text-[11px] font-normal uppercase tracking-[0.18em] text-[#8E8B87]">
                              /mo
                            </span>
                          ) : null}
                        </dd>
                      </motion.div>
                    );
                  })}
                </dl>
                <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-[#60A5FA]/15 bg-[#60A5FA]/[0.04] px-4 py-3">
                  <span className="mt-0.5 font-mono text-[12px] text-[#60A5FA]/80" aria-hidden="true">
                    ✶
                  </span>
                  <p className="text-[13px] leading-6 text-[#9FC3F5]">{content.lockNote}</p>
                </div>
              </div>
            </div>

            {/* what's included + partnership framing */}
            <div className="bg-[#0b0b12] p-7 sm:p-9">
              <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-[#60A5FA]/75">
                What it includes
              </p>
              <ul className="mt-6 space-y-3">
                {content.included.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-3"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#60A5FA]"
                      style={{ boxShadow: "0 0 8px rgba(96,165,250,0.7)" }}
                      aria-hidden="true"
                    />
                    <span className="text-[15px] leading-7 text-[#D8D5D0]">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-7 space-y-3 border-t border-white/[0.07] pt-6">
                {content.supporting.map((line, i) => (
                  <p
                    key={line}
                    className={
                      i === 0
                        ? "text-[15px] font-semibold leading-7 text-[#EDEBE8]"
                        : "text-[14px] leading-7 text-[#9B9894]"
                    }
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={content.primaryCtaTarget}
              className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#F3EFEC] px-8 py-3.5 text-sm font-semibold tracking-wide text-[#0B0B0C] transition hover:bg-white"
            >
              {content.primaryCta}
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
            <Link
              href={content.secondaryCtaTarget}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-[#E8E6E3] transition hover:border-white/40 hover:bg-white/[0.04]"
            >
              {content.secondaryCta}
            </Link>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}

// ── 09 BUILT FOR SERVICE LOOPS · the fit (DARK) ──────────────────────────────
// ICP + the request→follow-up lifecycle as an animated chain. Tells the visitor,
// fast, whether the product is for them — the qualifier before the diagnostic.
export function InitiationServiceLoopsSection({ content }) {
  const reduce = useReducedMotion();
  const accent = "#60A5FA";

  return (
    <section
      aria-labelledby="initiation-service-loops-heading"
      className="relative z-10 scroll-mt-24 overflow-hidden bg-[#08080d] py-24 sm:py-28 lg:py-32"
    >
      <SectionBleed />
      <SectionGlitchOverlay accent={accent} variant="wave" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 24%, rgba(96,165,250,0.07), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <RevealSection>
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#60A5FA]/80">
              09 / built for service loops
            </p>
            <span className="h-px flex-1 bg-gradient-to-r from-[#60A5FA]/30 to-transparent" />
          </div>

          <h2
            id="initiation-service-loops-heading"
            className="mt-6 max-w-4xl font-serif text-4xl font-semibold leading-[1.0] tracking-[-0.04em] text-[#F3EFEC] sm:text-5xl lg:text-6xl"
          >
            {content.headline}
          </h2>
          <div className="mt-6 max-w-2xl space-y-4">
            {content.body.map((line) => (
              <p key={line} className="text-base leading-8 text-[#9B9894] sm:text-[17px]">
                {line}
              </p>
            ))}
          </div>

          <p className="mt-14 font-mono text-[11px] uppercase tracking-[0.24em] text-[#60A5FA]/70">
            {content.lifecycleIntro}
          </p>
          <ol className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-3">
            {content.lifecycle.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <motion.span
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center rounded-full border border-[#60A5FA]/25 bg-[#60A5FA]/[0.06] px-4 py-2 text-sm font-semibold tracking-[-0.01em] text-[#EDEBE8]"
                >
                  {step}
                </motion.span>
                {i < content.lifecycle.length - 1 ? (
                  <motion.span
                    aria-hidden="true"
                    initial={reduce ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : i * 0.12 + 0.1 }}
                    className="font-mono text-[#60A5FA]/60"
                  >
                    →
                  </motion.span>
                ) : null}
              </li>
            ))}
          </ol>

          <p className="mt-14 font-mono text-[11px] uppercase tracking-[0.24em] text-[#60A5FA]/70">
            {content.fitIntro}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {content.fitExamples.map((example, i) => (
              <motion.li
                key={example}
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : i * 0.05 }}
                className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2 text-sm text-[#C2BFBA]"
              >
                {example}
              </motion.li>
            ))}
          </ul>

          <div className="mt-12 border-l-2 border-[#60A5FA]/50 pl-6">
            <RevealLine
              as="p"
              className="max-w-2xl font-serif text-2xl font-semibold leading-snug tracking-[-0.025em] text-[#F3EFEC] sm:text-3xl"
            >
              {content.qualifier}
            </RevealLine>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}

export function InitiationCompoundingIntelligenceSection({ content }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  // The lattice wires itself together once the graph scrolls into view — a single
  // ~2.8s eased build so it always completes on screen, instead of being tied to
  // scroll distance (which made it easy to scroll past and miss the completion).
  const graphRef = useRef(null);
  const inView = useInView(graphRef, { once: true, margin: "-18% 0px -18% 0px" });
  const [growth, setGrowth] = useState(reduce ? 1 : 0);

  useEffect(() => {
    if (reduce || !inView) return undefined;
    const start = performance.now();
    const dur = 3920;
    let raf = 0;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setGrowth(eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]);

  const learn = content.body.slice(2, 7);
  const nodesLinked = Math.round(growth * MEMORY_NODES.length);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="initiation-compounding-heading"
      className="relative z-10 scroll-mt-24 overflow-hidden bg-[#0B0C14] py-24 sm:py-28 lg:py-32"
    >
      <SectionBleed />
      <SectionGlitchOverlay accent="#D4A853" variant="terminal" />

      <RevealSection>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#D4A853]/80">
                  08 / compounding memory
                </p>
                <span className="h-px flex-1 bg-gradient-to-r from-[#D4A853]/30 to-transparent" />
              </div>

              <p className="mt-6 font-mono text-xs uppercase tracking-[0.28em] text-[#9B9894]/70">
                {content.headline}
              </p>
              <h2
                id="initiation-compounding-heading"
                className="mt-3 font-serif text-3xl font-semibold tracking-[-0.03em] text-[#F3EFEC] sm:text-5xl"
              >
                {content.subheadline}
              </h2>

              <p className="mt-7 max-w-xl text-base leading-8 text-[#C2BFBA] sm:text-[17px]">
                {content.body[0]}
              </p>
              <p className="mt-4 max-w-xl text-base leading-8 text-[#C2BFBA] sm:text-[17px]">
                {content.body[1]}
              </p>

              <ul className="mt-8 space-y-2.5">
                {learn.map((line, i) => {
                  const lit = growth > (i + 0.5) / learn.length;
                  return (
                    <li
                      key={line}
                      className="flex items-start gap-3 transition-colors duration-500"
                      style={{ color: lit ? "#E8E6E3" : "rgba(155,152,148,0.4)" }}
                    >
                      <span
                        className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full border text-[9px] transition-all duration-500"
                        style={{
                          borderColor: lit ? "#D4A853" : "rgba(255,255,255,0.15)",
                          backgroundColor: lit ? "rgba(212,168,83,0.18)" : "transparent",
                          color: lit ? "#D4A853" : "transparent",
                        }}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span className="text-sm leading-6 sm:text-[15px]">{line}</span>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-8 max-w-xl font-serif text-xl font-semibold leading-snug tracking-[-0.02em] text-[#F3EFEC] sm:text-2xl">
                {content.body[7]}
              </p>
            </div>

            <div>
              <div ref={graphRef} className="relative aspect-square w-full overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-[#08090f]">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
                  {MEMORY_EDGES.map((e, i) => {
                    const a = Math.min(1, Math.max(0, growth * MEMORY_EDGES.length - i));
                    const [x1, y1] = MEMORY_NODES[e[0]];
                    const [x2, y2] = MEMORY_NODES[e[1]];
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#D4A853"
                        strokeWidth="0.3"
                        style={{ opacity: a * 0.45 }}
                      />
                    );
                  })}
                  {MEMORY_NODES.map((p, i) => {
                    const a = Math.min(1, Math.max(0, growth * MEMORY_NODES.length - i));
                    const isHub = i === 0;
                    return (
                      <g key={i} style={{ opacity: a }}>
                        <circle cx={p[0]} cy={p[1]} r={(isHub ? 2.4 : 1.4) * (0.5 + a * 0.5)} fill="#D4A853" />
                        <circle
                          cx={p[0]}
                          cy={p[1]}
                          r={(isHub ? 5 : 3) * a}
                          fill="none"
                          stroke="#D4A853"
                          strokeWidth="0.25"
                          style={{ opacity: 0.4 * a }}
                        />
                      </g>
                    );
                  })}
                </svg>
                <p className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#D4A853]/70">
                  operational memory
                </p>
                <p className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9B9894]/70">
                  {String(nodesLinked).padStart(2, "0")} / {MEMORY_NODES.length} linked
                </p>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#D4A853]/80">
                  {content.outcomeIntro}
                </p>
                <div className="mt-5 space-y-3.5">
                  {content.outcomeItems.map((item) => {
                    const dir = MEMORY_METERS[item] || "up";
                    const w = dir === "down" ? 90 - growth * 73 : 14 + growth * 78;
                    return (
                      <div key={item}>
                        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
                          <span className="text-[#C9C4BE]">{item}</span>
                          <span className="text-[#D4A853]">{dir === "down" ? "↓" : "↑"}</span>
                        </div>
                        <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-[#D4A853]"
                            style={{ width: `${w}%`, transition: "width 0.12s linear" }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-3xl text-center">
            {content.outcomeClosing.map((t, i) => (
              <p
                key={t}
                className={
                  i === content.outcomeClosing.length - 1
                    ? "mt-3 font-serif text-2xl font-semibold leading-tight tracking-[-0.025em] text-[#D4A853] sm:text-4xl"
                    : "text-base leading-8 text-[#C2BFBA] sm:text-[17px]"
                }
              >
                {t}
              </p>
            ))}
          </div>
        </div>
      </RevealSection>
    </section>
  );
}

// ── 09 CONFIDENCE · earned autonomy ──────────────────────────────────────────
// UNIQUE (Layer 3): the tactile peak. A confidence dial you DRAG up — as you
// grant autonomy the ring morphs magenta→amber (dependency→light), interruptions
// /approvals/oversight fall away, and autonomous execution climbs. You hand over
// control yourself. Reduced-motion: slider still works, no flourish.
const CONFIDENCE_METERS = [
  { label: "Interruptions", dir: "down" },
  { label: "Approvals", dir: "down" },
  { label: "Manual oversight", dir: "down" },
  { label: "Execution handled autonomously", dir: "up" },
];

function mixColor(a, b, t) {
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

export function InitiationConfidenceModelSection({ content }) {
  const reduce = useReducedMotion();
  const { mark } = useProgression();
  const [value, setValue] = useState(8);
  const marked = useRef(false);
  const trackRef = useRef(null);
  const dragging = useRef(false);
  // Come-alive: the dial demonstrates itself once when scrolled into view, then
  // hands control to the viewer the moment they touch it (so it never sits dead).
  const dialRef = useRef(null);
  const inView = useInView(dialRef, { once: true, margin: "-25% 0px -25% 0px" });
  const touched = useRef(false);
  const demoed = useRef(false);

  const t = value / 100;
  const ring = mixColor([219, 39, 119], [212, 168, 83], t);
  const C = 2 * Math.PI * 42;

  useEffect(() => {
    if (!marked.current && value > 40) {
      marked.current = true;
      mark("confidence");
    }
  }, [value, mark]);

  useEffect(() => {
    if (reduce || !inView || demoed.current || touched.current) return undefined;
    demoed.current = true;
    const target = 76;
    const start = performance.now();
    const from = 8;
    const dur = 1900;
    let raf = 0;
    const tick = (now) => {
      if (touched.current) return;
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]);

  function setFromClientX(cx) {
    const el = trackRef.current;
    if (!el) return;
    touched.current = true;
    const r = el.getBoundingClientRect();
    setValue(Math.round(Math.min(1, Math.max(0, (cx - r.left) / r.width)) * 100));
  }

  function onPointerDown(e) {
    dragging.current = true;
    touched.current = true;
    if (e.currentTarget.setPointerCapture) e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  }

  function onPointerMove(e) {
    if (dragging.current) setFromClientX(e.clientX);
  }

  function endDrag() {
    dragging.current = false;
  }

  function onKeyDown(e) {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      touched.current = true;
      setValue((v) => Math.min(100, v + 4));
      e.preventDefault();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      touched.current = true;
      setValue((v) => Math.max(0, v - 4));
      e.preventDefault();
    }
  }

  return (
    <section
      aria-labelledby="initiation-confidence-heading"
      className="relative z-10 scroll-mt-24 overflow-hidden bg-[#0C0D15] py-24 sm:py-28 lg:py-32"
    >
      <SectionBleed />
      <SectionGlitchOverlay accent="#D4A853" variant="wave" />

      <RevealSection>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#D4A853]/80">
                  09 / trust architecture
                </p>
                <span className="h-px flex-1 bg-gradient-to-r from-[#D4A853]/30 to-transparent" />
              </div>

              <h2
                id="initiation-confidence-heading"
                className="mt-6 font-serif text-3xl font-semibold leading-[1.04] tracking-[-0.035em] text-[#F3EFEC] sm:text-4xl lg:text-5xl"
              >
                {content.headline}
              </h2>

              <div className="mt-7 max-w-xl space-y-4">
                <p className="text-base leading-8 text-[#C2BFBA] sm:text-[17px]">{content.body[0]}</p>
                <p className="text-base leading-8 text-[#C2BFBA] sm:text-[17px]">{content.body[1]}</p>
                <p className="text-base leading-8 text-[#C2BFBA] sm:text-[17px]">{content.body[2]}</p>
              </div>

              <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-[#D4A853]/30 bg-[#D4A853]/[0.06] px-5 py-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D4A853]" />
                <span className="text-sm font-semibold text-[#F3EFEC]">{content.body[3]}</span>
              </div>

              <AnimatePresence>
                {value >= 66 ? (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 max-w-xl font-serif text-xl font-semibold leading-snug tracking-[-0.02em] text-[#D4A853] sm:text-2xl"
                  >
                    {content.body[4]}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>

            <div ref={dialRef} className="rounded-[1.75rem] border border-white/[0.07] bg-[#08090f] p-7 sm:p-9">
              <div className="relative mx-auto aspect-square w-full max-w-[18rem]">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke={ring}
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={C}
                    strokeDashoffset={C * (1 - t)}
                    style={{ transition: "stroke-dashoffset 0.12s linear, stroke 0.2s linear" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className="font-serif text-5xl font-semibold tracking-[-0.04em] sm:text-6xl"
                    style={{ color: ring }}
                  >
                    {value}
                    <span className="text-2xl">%</span>
                  </span>
                  <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-[#9B9894]/70">
                    confidence
                  </span>
                </div>
              </div>

              <div className="mt-7">
                <span className="mb-2 block text-center font-mono text-[10px] uppercase tracking-[0.24em] text-[#D4A853]/80">
                  drag to grant autonomy
                </span>
                <div
                  ref={trackRef}
                  role="slider"
                  tabIndex={0}
                  aria-label="Confidence level"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={value}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={endDrag}
                  onPointerCancel={endDrag}
                  onKeyDown={onKeyDown}
                  className="relative mt-2 h-9 cursor-pointer touch-none select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090f]"
                >
                  <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/12" />
                  <div
                    className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full"
                    style={{ width: `${value}%`, backgroundColor: ring, transition: "background-color 0.2s linear" }}
                  />
                  <div
                    className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                    style={{ left: `${value}%`, backgroundColor: ring, transition: "background-color 0.2s linear" }}
                  />
                </div>
              </div>

              <div className="mt-7 space-y-3">
                {CONFIDENCE_METERS.map((m) => {
                  const w = m.dir === "down" ? 88 - t * 74 : 12 + t * 80;
                  const col = m.dir === "down" ? "#DB2777" : "#D4A853";
                  return (
                    <div key={m.label}>
                      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
                        <span className="text-[#C9C4BE]">{m.label}</span>
                        <span style={{ color: col }}>{m.dir === "down" ? "↓" : "↑"}</span>
                      </div>
                      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${w}%`, backgroundColor: col, transition: "width 0.12s linear" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}

// ── 10 PILLARS · signal vs noise ─────────────────────────────────────────────
// UNIQUE (Layer 3): a sorting MACHINE. A live stream of signals is judged against
// the five pillars — anything that strengthens one is kept; the rest is spat out
// as noise. Cold, mechanical, the machine deciding. Feed it noise yourself and
// watch it get rejected. Reduced-motion: idle machine, manual feed only.
const SORTER_LABELS = ["notification", "task", "request"];

export function InitiationFivePillarsSection({ content }) {
  const reduce = useReducedMotion();
  const { mark } = useProgression();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { margin: "-20% 0px -20% 0px" });
  const idRef = useRef(0);

  const pillars = content.pillars;
  const [items, setItems] = useState([]);
  const [kept, setKept] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [counts, setCounts] = useState(() => pillars.map(() => 0));
  const [pulse, setPulse] = useState({ idx: -1, n: 0 });

  const spawn = useCallback(
    (forceNoise) => {
      const label = SORTER_LABELS[Math.floor(Math.random() * SORTER_LABELS.length)];
      const noise = forceNoise || Math.random() < 0.55;
      const verdict = noise ? "noise" : Math.floor(Math.random() * pillars.length);
      idRef.current += 1;
      const id = idRef.current;
      setItems((prev) => [{ id, label, verdict }, ...prev].slice(0, 5));
      if (noise) {
        setRejected((r) => r + 1);
      } else {
        setKept((k) => k + 1);
        setCounts((prev) => {
          const next = [...prev];
          next[verdict] += 1;
          return next;
        });
        setPulse((p) => ({ idx: verdict, n: p.n + 1 }));
      }
    },
    [pillars.length],
  );

  useEffect(() => {
    if (reduce || !inView) return undefined;
    const timer = window.setInterval(() => spawn(false), 1600);
    return () => window.clearInterval(timer);
  }, [reduce, inView, spawn]);

  function feedNoise() {
    spawn(true);
    mark("pillars");
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="initiation-pillars-heading"
      className="relative z-10 scroll-mt-24 overflow-hidden bg-[#0D0E17] py-24 sm:py-28 lg:py-32"
    >
      <SectionBleed />
      <SectionGlitchOverlay accent="#D4A853" variant="static" />

      <RevealSection>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#D4A853]/80">10 / doctrine</p>
            <span className="h-px flex-1 bg-gradient-to-r from-[#D4A853]/30 to-transparent" />
          </div>

          <h2
            id="initiation-pillars-heading"
            className="mt-6 max-w-3xl font-serif text-3xl font-semibold leading-[1.04] tracking-[-0.035em] text-[#F3EFEC] sm:text-4xl lg:text-5xl"
          >
            {content.headline}
          </h2>
          <div className="mt-7 max-w-2xl space-y-4">
            {content.body.map((para) => (
              <p key={para} className="text-base leading-8 text-[#C2BFBA] sm:text-[17px]">
                {para}
              </p>
            ))}
          </div>

          {/* THE SORTER */}
          <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-[#08090f]">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#D4A853]/80">
                signal / noise filter
              </p>
              <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em]">
                <span className="text-[#D4A853]">kept {String(kept).padStart(2, "0")}</span>
                <span className="text-[#DB2777]">rejected {String(rejected).padStart(2, "0")}</span>
              </div>
            </div>

            <div className="grid gap-6 p-5 sm:grid-cols-[1fr_1fr] sm:p-6">
              <div className="min-h-[14rem]">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9B9894]/60">
                  intake
                </p>
                <div className="space-y-2">
                  <AnimatePresence initial={false}>
                    {items.map((item) => {
                      const noise = item.verdict === "noise";
                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={reduce ? false : { opacity: 0, y: -14 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduce ? { opacity: 0 } : { opacity: 0, x: noise ? 60 : -10, filter: "blur(3px)" }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center justify-between rounded-lg border px-3 py-2"
                          style={{
                            borderColor: noise ? "rgba(219,39,119,0.4)" : "rgba(212,168,83,0.4)",
                            backgroundColor: noise ? "rgba(219,39,119,0.06)" : "rgba(212,168,83,0.06)",
                          }}
                        >
                          <span className="font-mono text-xs text-[#C9C4BE]">{item.label}</span>
                          <span
                            className="font-mono text-[10px] uppercase tracking-[0.12em]"
                            style={{ color: noise ? "#DB2777" : "#D4A853" }}
                          >
                            {noise ? "✕ noise" : `→ ${pillars[item.verdict]}`}
                          </span>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                  {items.length === 0 ? (
                    <p className="font-mono text-xs text-[#9B9894]/40">awaiting signal…</p>
                  ) : null}
                </div>
              </div>

              <div>
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9B9894]/60">
                  {content.body[1]}
                </p>
                <div className="space-y-2">
                  {pillars.map((p, i) => (
                    <motion.div
                      key={p}
                      animate={pulse.idx === i ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-center justify-between rounded-xl border px-4 py-3"
                      style={{
                        borderColor: `rgba(212,168,83,${0.18 + Math.min(0.5, counts[i] * 0.06)})`,
                        backgroundColor: `rgba(212,168,83,${0.03 + Math.min(0.12, counts[i] * 0.02)})`,
                      }}
                    >
                      <span className="text-sm font-semibold text-[#F3EFEC]">{p}</span>
                      <span className="font-mono text-[10px] text-[#D4A853]">{counts[i]}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center border-t border-white/[0.06] px-5 py-4">
              <button
                type="button"
                onClick={feedNoise}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#DB2777]/40 bg-[#DB2777]/[0.06] px-6 py-2.5 text-sm font-semibold text-[#F3EFEC] transition hover:bg-[#DB2777]/[0.14] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB2777]"
              >
                Feed it noise
              </button>
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-base leading-8 text-[#C2BFBA] sm:text-[17px]">{content.closing}</p>
          <p className="mt-3 max-w-3xl font-serif text-xl font-semibold leading-snug tracking-[-0.02em] text-[#F3EFEC] sm:text-2xl">
            {content.closing2}
          </p>
        </div>
      </RevealSection>
    </section>
  );
}

// ── THE TURN · crash to light ────────────────────────────────────────────────
// The hinge of the whole arc. After the system has proven itself in the dark, the
// noir gets KILLED: a terminal override executes, a green cascade rips down, the
// screen whites out and the page is reborn in light. Everything below operates
// lighter. Reduced-motion: static "deployed" state, no sequence. Decorative.
export function SystemResetTransition() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px -25% 0px" });
  const [phase, setPhase] = useState(reduce ? 4 : 0);

  useEffect(() => {
    if (reduce) {
      setPhase(4);
      return undefined;
    }
    if (!inView) return undefined;
    const timers = [
      window.setTimeout(() => setPhase(1), 250),
      window.setTimeout(() => setPhase(2), 1500),
      window.setTimeout(() => setPhase(3), 2500),
      window.setTimeout(() => setPhase(4), 3450),
    ];
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [inView, reduce]);

  const lines = [
    { at: 1, text: "root@studioflows:~# checking what depends on you...", tone: "muted" },
    { at: 1, text: "[ alert ] found it — the business waits on one person", tone: "alert" },
    { at: 2, text: "root@studioflows:~# taking the weight off the owner", tone: "bright" },
    { at: 2, text: "you no longer have to hold it all up", tone: "muted" },
    { at: 3, text: "root@studioflows:~# turning on the system", tone: "bright" },
    { at: 3, text: "starting the layer that runs the work...", tone: "amber" },
  ];

  const whiteout = phase >= 4;

  return (
    <section
      ref={ref}
      aria-hidden="true"
      className="relative z-10 flex min-h-[82vh] items-center justify-center overflow-hidden bg-[#06070C]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_1px,transparent_1px,transparent_3px)]" />

      <div className="relative z-10 w-full max-w-2xl px-6 font-mono text-[12px] leading-7 sm:text-sm">
        {lines.map((l, i) => (
          <motion.p
            key={i}
            initial={false}
            animate={{ opacity: phase >= l.at && !whiteout ? 1 : 0, x: phase >= l.at ? 0 : -6 }}
            transition={{ duration: 0.25 }}
            className={
              l.tone === "alert"
                ? "text-[#DB2777]"
                : l.tone === "amber"
                  ? "text-[#D4A853]"
                  : l.tone === "bright"
                    ? "text-[#E8E6E3]"
                    : "text-[#5F6675]"
            }
          >
            {l.text}
          </motion.p>
        ))}
      </div>

      <AnimatePresence>
        {phase === 3 && !reduce ? (
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(180deg,rgba(110,255,180,0),rgba(110,255,180,0.14),rgba(110,255,180,0))]"
            initial={{ opacity: 0, y: "-120%" }}
            animate={{ opacity: [0, 1, 0], y: ["-120%", "260%"] }}
            transition={{ duration: 0.9, ease: "linear" }}
          />
        ) : null}
      </AnimatePresence>

      <motion.div
        className="pointer-events-none absolute inset-0 origin-center bg-[#F4F1EA]"
        initial={false}
        animate={{ scaleY: whiteout ? 1 : 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.55, ease: [0.7, 0, 0.3, 1] }}
      />
      {whiteout ? (
        <motion.p
          className="absolute z-10 font-mono text-[11px] uppercase tracking-[0.34em] text-[#8A6A1F]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 0.45, duration: 0.5 }}
        >
          [ ok ] the system is running
        </motion.p>
      ) : null}
    </section>
  );
}

// Light-act atmosphere: motes of warm light rising into the light — the visual
// of operational weight lifting. Deterministic, decorative, reduced-motion off.
const LIGHT_MOTES = Array.from({ length: 16 }).map((_, i) => ({
  left: (i * 37 + 11) % 100,
  size: 2 + (i % 3),
  delay: (i % 8) * 0.85,
  dur: 9 + (i % 5) * 2.3,
  rise: 260 + (i % 4) * 90,
  drift: (i % 2 ? 1 : -1) * (8 + (i % 4) * 6),
}));

function RisingMotes({ reduce }) {
  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {LIGHT_MOTES.map((m, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[#8A6A1F]/30"
          style={{ left: `${m.left}%`, bottom: -12, width: m.size, height: m.size }}
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{ opacity: [0, 0.55, 0], y: [0, -m.rise], x: [0, m.drift] }}
          transition={{ duration: m.dur, delay: m.delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// ── 11 DIAGNOSTIC · the first ask (LIGHT) ────────────────────────────────────
// The page is reborn: near-white, velvet-black type, paper grain. UNIQUE
// (Layer 3): the diagnostic SURFACES its findings live — a scan walks the list,
// each finding settles into place — then the CTA reads as the authorized command.
export function InitiationOperationalDiagnosticSection({ content }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30% 0px -15% 0px" });
  const [scan, setScan] = useState(reduce ? content.bullets.length : 0);

  useEffect(() => {
    if (reduce || !inView || scan >= content.bullets.length) return undefined;
    const t = window.setTimeout(() => setScan((n) => n + 1), 460);
    return () => window.clearTimeout(t);
  }, [inView, scan, reduce, content.bullets.length]);

  const done = scan >= content.bullets.length;

  return (
    <section
      ref={ref}
      id={content.anchor}
      aria-labelledby="initiation-diagnostic-heading"
      className="relative z-10 scroll-mt-24 overflow-hidden bg-[#F4F1EA] py-24 text-[#0B0B0C] sm:py-28 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-multiply"
        style={{ backgroundImage: RANSOM_GRAIN }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,168,83,0.16),transparent_55%)]"
        animate={reduce ? {} : { opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <RevealSection>
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8A6A1F]">11 / the path opens</p>
          <h2
            id="initiation-diagnostic-heading"
            className="mt-6 font-serif text-3xl font-semibold leading-[1.04] tracking-[-0.035em] text-[#0B0B0C] sm:text-4xl lg:text-5xl"
          >
            {content.headline}
          </h2>
          <div className="mt-8 space-y-5">
            {content.body.map((t, i) => (
              <p key={t} className="mx-auto max-w-2xl text-base leading-8 text-[#3A352C] sm:text-[17px]">
                {t}
                {i === content.body.length - 1 && !reduce ? (
                  <motion.span
                    className="ml-2 inline-block h-2 w-2 rounded-full bg-[#8A6A1F] align-middle"
                    animate={{ opacity: done ? 1 : [0.3, 1, 0.3], scale: done ? 1 : [1, 1.3, 1] }}
                    transition={done ? { duration: 0.3 } : { duration: 1.1, repeat: Infinity }}
                  />
                ) : null}
              </p>
            ))}
          </div>

          <div className="mx-auto mt-4 flex max-w-2xl items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-[#8A6A1F]/70">
            <span>{done ? "diagnostic surfaced" : "scanning operations…"}</span>
            <span>
              {String(Math.min(scan, content.bullets.length)).padStart(2, "0")} /{" "}
              {String(content.bullets.length).padStart(2, "0")}
            </span>
          </div>

          <ul className="mx-auto mt-4 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
            {content.bullets.map((bullet, i) => {
              const lit = i < scan;
              return (
                <motion.li
                  key={bullet}
                  initial={false}
                  animate={{
                    opacity: lit ? 1 : 0.28,
                    x: lit ? 0 : -6,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden rounded-xl border bg-white/60 px-4 py-3 pl-5 text-sm leading-6 text-[#2A2722] shadow-[0_1px_0_rgba(0,0,0,0.04)]"
                  style={{ borderColor: lit ? "rgba(138,106,31,0.35)" : "rgba(0,0,0,0.1)" }}
                >
                  <motion.span
                    className="absolute inset-y-0 left-0 w-[3px] origin-top bg-[#D4A853]"
                    initial={false}
                    animate={{ scaleY: lit ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    aria-hidden="true"
                  />
                  {bullet}
                </motion.li>
              );
            })}
          </ul>

          <div className="relative mt-12 inline-block">
            {!reduce ? (
              <motion.span
                className="pointer-events-none absolute -inset-2 rounded-full bg-[#D4A853]/30 blur-xl"
                animate={{ opacity: [0.25, 0.6, 0.25], scale: [0.96, 1.04, 0.96] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
            ) : null}
            <Link
              href={content.ctaTarget}
              className="group relative inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#0B0B0C] px-8 py-3.5 text-sm font-semibold tracking-wide text-[#F4F1EA] shadow-[0_18px_50px_rgba(0,0,0,0.25)] transition hover:bg-black"
            >
              {content.cta}
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}

// ── 12 ENTRY · two doors (LIGHT) ─────────────────────────────────────────────
// In the light now. UNIQUE (Layer 3): two paths (IQ / OS) as doors the viewer
// chooses; the picked one opens, the other recedes. Velvet-black on near-white.
export function InitiationEntryPathsSection({ content }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(null);

  return (
    <section
      aria-labelledby="initiation-entry-paths-heading"
      className="relative z-10 scroll-mt-24 overflow-hidden bg-[#F4F1EA] py-24 text-[#0B0B0C] sm:py-28 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-multiply"
        style={{ backgroundImage: RANSOM_GRAIN }}
        aria-hidden="true"
      />
      <RevealSection>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8A6A1F]">12 / two entry paths</p>
          <h2
            id="initiation-entry-paths-heading"
            className="mt-6 max-w-3xl font-serif text-3xl font-semibold leading-[1.04] tracking-[-0.035em] text-[#0B0B0C] sm:text-4xl lg:text-5xl"
          >
            {content.headline}
          </h2>
          <div className="mt-6 max-w-3xl space-y-4">
            {content.body.map((t) => (
              <p key={t} className="text-base leading-8 text-[#3A352C] sm:text-[17px]">
                {t}
              </p>
            ))}
          </div>

          {/* the story forks — one line splits into two doors */}
          <svg
            viewBox="0 0 200 36"
            preserveAspectRatio="none"
            className="mx-auto mt-10 h-9 w-full max-w-md text-[#8A6A1F]"
            aria-hidden="true"
          >
            <motion.path
              d="M100 0 L100 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            />
            <motion.path
              d="M100 14 C100 26, 40 22, 30 36"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: open === 1 ? 0.25 : 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            />
            <motion.path
              d="M100 14 C100 26, 160 22, 170 36"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: open === 0 ? 0.25 : 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            />
          </svg>

          <div
            className="mt-2 grid gap-6 lg:grid-cols-2"
            onMouseLeave={() => setOpen(null)}
          >
            {[content.card1, content.card2].map((card, i) => {
              const isOpen = open === i;
              const isOther = open !== null && open !== i;
              return (
                <motion.article
                  key={card.headline}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isOpen}
                  onMouseEnter={() => setOpen(i)}
                  onFocus={() => setOpen(i)}
                  onClick={() => setOpen(isOpen ? null : i)}
                  initial={false}
                  animate={
                    reduce
                      ? {}
                      : {
                          y: isOpen ? -8 : 0,
                          scale: isOpen ? 1.02 : isOther ? 0.98 : 1,
                          opacity: isOther ? 0.55 : 1,
                        }
                  }
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border bg-white/70 p-6 outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[#8A6A1F] sm:p-7"
                  style={{
                    borderColor: isOpen ? "rgba(138,106,31,0.5)" : "rgba(0,0,0,0.1)",
                    boxShadow: isOpen
                      ? "0 34px 90px rgba(0,0,0,0.16)"
                      : "0 18px 60px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* top accent — the door opening */}
                  <motion.span
                    className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-[#D4A853] to-[#8A6A1F]"
                    initial={false}
                    animate={{ scaleX: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    aria-hidden="true"
                  />
                  {/* warm inner glow on open */}
                  <span
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,168,83,0.12),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ opacity: isOpen ? 1 : undefined }}
                    aria-hidden="true"
                  />

                  <div className="relative">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.26em] text-[#8A6A1F]">
                        {card.headline}
                      </p>
                      {card.tag ? (
                        <span className="inline-flex items-center rounded-full border border-[#8A6A1F]/30 bg-[#8A6A1F]/[0.06] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#8A6A1F]">
                          {card.tag}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-[#0B0B0C] sm:text-2xl">
                      {card.subheadline}
                    </h3>
                    <div className="mt-4 space-y-3">
                      {card.body.map((t) => (
                        <p key={t} className="text-sm leading-7 text-[#3A352C]">
                          {t}
                        </p>
                      ))}
                    </div>
                    <p className="mt-6 text-sm font-semibold text-[#8A6A1F]">Best for:</p>
                    <p className="mt-2 text-sm leading-7 text-[#3A352C]">{card.bestFor}</p>
                    {card.cta ? (
                      <Link
                        href={card.ctaTarget}
                        onClick={(event) => event.stopPropagation()}
                        className={
                          i === 0
                            ? "mt-7 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#0B0B0C] px-6 py-3 text-sm font-semibold text-[#F4F1EA] transition hover:bg-black"
                            : "mt-7 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#0B0B0C]/25 px-6 py-3 text-sm font-semibold text-[#0B0B0C] transition hover:bg-black/5"
                        }
                      >
                        {card.cta}
                        <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    ) : null}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </RevealSection>
    </section>
  );
}

// ── 13 FINAL CTA · the weight lifts (LIGHT) ──────────────────────────────────
// Full light. The page that opened in near-black ends near-white, velvet-black,
// textured — the business "lighter to operate." The main CTA is the quiz funnel,
// framed as the earned command. Callback to the hero's pressure readout, resolved.
export function InitiationFinalCtaSection({ content }) {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="initiation-final-cta-heading"
      className="relative z-10 overflow-hidden bg-[#F4F1EA] py-24 text-[#0B0B0C] sm:py-28 lg:py-36"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-multiply"
        style={{ backgroundImage: RANSOM_GRAIN }}
        aria-hidden="true"
      />
      <RisingMotes reduce={reduce} />
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-1/4 mx-auto h-[60vh] w-[80%] max-w-3xl rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.18),transparent_68%)] blur-2xl"
        animate={reduce ? {} : { opacity: [0.5, 0.9, 0.5], scale: [0.96, 1.05, 0.96] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <RevealSection fadeOnly>
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <motion.div
            className="relative rounded-[2rem] border border-black/10 bg-white/70 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.1)] sm:p-10 lg:p-14"
            animate={reduce ? {} : { y: [0, -7, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8A6A1F]">13 / lighter to operate</p>
            <h2
              id="initiation-final-cta-heading"
              className="mt-6 font-serif text-3xl font-semibold leading-[1.04] tracking-[-0.035em] text-[#0B0B0C] sm:text-4xl lg:text-5xl"
            >
              {content.headline}
            </h2>
            <div className="mt-6 space-y-4">
              {content.body.map((t) => (
                <p key={t} className="max-w-2xl text-base leading-8 text-[#3A352C] sm:text-[17px]">
                  {t}
                </p>
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                {!reduce ? (
                  <motion.span
                    className="pointer-events-none absolute -inset-1.5 rounded-full bg-[#D4A853]/35 blur-lg"
                    animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.97, 1.05, 0.97] }}
                    transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden="true"
                  />
                ) : null}
                <Link
                  href={content.primaryCtaTarget}
                  className="group relative inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-[#0B0B0C] px-9 py-4 text-sm font-semibold tracking-wide text-[#F4F1EA] shadow-[0_18px_50px_rgba(0,0,0,0.25)] transition hover:bg-black"
                >
                  {content.primaryCta}
                  <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
              <Link
                href={content.secondaryCtaTarget}
                className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-black/20 bg-transparent px-9 py-4 text-sm font-semibold text-[#0B0B0C] transition hover:bg-black/5"
              >
                {content.secondaryCta}
              </Link>
            </div>
          </motion.div>
          <footer className="mt-12 border-t border-black/10 pt-8 text-sm text-[#6B6557]">StudioFlows</footer>
        </div>
      </RevealSection>
    </section>
  );
}
