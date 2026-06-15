"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  DEFAULT_ARRIVAL_MS,
  REM_EASE,
  useReducedMotionSafe,
} from "@/components/real-estate-media/rem-motion-primitives";

const FOCUS_CONTACT = "Agent, Harbor";
const STREAM_HOLD_MS = 1200;
const TRANSITION_MS = 500;

const CONTACT_COLORS = {
  "Alex (photo)": "#34C759",
  Editor: "#5AC8FA",
  "Agent, Harbor": "#FF9500",
  "Crew lead": "#AF52DE",
};

function contactInitial(from) {
  const trimmed = from.trim();
  return trimmed.charAt(0).toUpperCase();
}

function contactColor(from) {
  return CONTACT_COLORS[from] ?? "#8E8E93";
}

function SignalGlyph() {
  return (
    <svg aria-hidden="true" width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
      <rect x="0" y="7" width="3" height="4" rx="0.5" opacity="0.35" />
      <rect x="4.5" y="5" width="3" height="6" rx="0.5" opacity="0.55" />
      <rect x="9" y="2.5" width="3" height="8.5" rx="0.5" opacity="0.75" />
      <rect x="13.5" y="0" width="3" height="11" rx="0.5" />
    </svg>
  );
}

function WifiGlyph() {
  return (
    <svg aria-hidden="true" width="16" height="11" viewBox="0 0 16 11" fill="none">
      <path
        d="M8 9.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
        fill="currentColor"
      />
      <path
        d="M4.2 6.8a4.6 4.6 0 0 1 7.6 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M1.4 4.1a8.4 8.4 0 0 1 13.2 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  );
}

function BatteryGlyph() {
  return (
    <svg aria-hidden="true" width="25" height="12" viewBox="0 0 25 12" fill="none">
      <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" opacity="0.45" />
      <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor" />
      <path d="M22.5 4v4a1.8 1.8 0 0 0 0-4Z" fill="currentColor" opacity="0.45" />
    </svg>
  );
}

function RemPhoneStatusBar() {
  return (
    <div className="relative z-20 flex items-center justify-between px-5 pt-2.5 text-[11px] font-semibold tracking-tight text-white/92">
      <span>9:41</span>
      <div className="flex items-center gap-1.5 text-white/92">
        <SignalGlyph />
        <WifiGlyph />
        <BatteryGlyph />
      </div>
    </div>
  );
}

function RemPhoneDynamicIsland() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-2 z-30 h-[26px] w-[96px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
    />
  );
}

function RemPhoneHomeIndicator() {
  return (
    <div aria-hidden="true" className="absolute bottom-1.5 left-0 right-0 z-20 flex justify-center">
      <span className="h-[4px] w-[108px] rounded-full bg-white/55" />
    </div>
  );
}

function RemPhoneChrome({ children, className = "" }) {
  return (
    <div
      className={`mx-auto w-full max-w-[280px] sm:max-w-[320px] ${className}`}
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif' }}
    >
      <div className="rounded-[2.5rem] border border-white/15 bg-[#1a1a1e] p-[10px] shadow-[0_28px_80px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]">
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2rem] bg-black">
          <RemPhoneDynamicIsland />
          <RemPhoneStatusBar />
          <div className="relative h-full w-full">{children}</div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.07] mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 3px)",
            }}
          />
          <RemPhoneHomeIndicator />
        </div>
      </div>
    </div>
  );
}

function LockNotificationBanner({ item, index }) {
  const color = contactColor(item.from);
  const initial = contactInitial(item.from);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.42,
        ease: REM_EASE,
        delay: index > 0 ? 0.04 : 0,
      }}
      className="flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/10 px-3 py-2.5 backdrop-blur-md"
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white"
        style={{ backgroundColor: color }}
      >
        {initial}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-[12px] font-semibold text-white">{item.from}</p>
          <p className="shrink-0 text-[10px] text-white/45">now</p>
        </div>
        <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-white/78">{item.text}</p>
      </div>
    </motion.div>
  );
}

function RemPhoneLockScreen({ notifications, visibleIds, showTime = true }) {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#0B0B12]">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(212,168,83,0.12), transparent 60%), radial-gradient(ellipse 70% 50% at 80% 80%, rgba(219,39,119,0.08), transparent 55%)",
        }}
      />
      <div className="relative z-10 flex flex-1 flex-col px-4 pb-16 pt-14">
        {showTime ? (
          <div className="text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/45">
              Thursday
            </p>
            <p className="mt-1 text-[52px] font-light leading-none tracking-[-0.04em] text-white">
              9:41
            </p>
          </div>
        ) : null}

        <div className="mt-6 space-y-2">
          <AnimatePresence initial={false}>
            {notifications
              .filter((item) => visibleIds.has(item.text))
              .map((item, index) => (
                <LockNotificationBanner key={item.text} item={item} index={index} />
              ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ text, time }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[82%] rounded-[18px] rounded-bl-[4px] bg-[#3A3A3C] px-3.5 py-2">
        <p className="text-[14px] leading-[1.35] text-white">{text}</p>
        {time ? <p className="mt-1 text-[10px] text-white/35">{time}</p> : null}
      </div>
    </div>
  );
}

function RemPhoneMessagesThread({ notifications, focusContact }) {
  const focusItem = notifications.find((item) => item.from === focusContact) ?? notifications[2];
  const otherThreads = notifications.filter((item) => item.from !== focusContact);

  return (
    <div className="absolute inset-0 flex flex-col bg-[#000000]">
      <div className="relative z-10 border-b border-white/[0.08] bg-[#1C1C1E]/95 px-3 pb-2.5 pt-11 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="text-[#0A84FF]">
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path
                d="M8.5 1.5 1.5 8l7 6.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold text-white"
            style={{ backgroundColor: contactColor(focusItem.from) }}
          >
            {contactInitial(focusItem.from)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold text-white">{focusItem.from}</p>
            <p className="text-[11px] text-white/40">Messages</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-3 py-3">
        <div className="mb-3 space-y-1.5 border-b border-white/[0.06] pb-3">
          {otherThreads.map((item) => (
            <div key={item.text} className="flex items-center gap-2.5 rounded-lg px-1 py-1">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                style={{ backgroundColor: contactColor(item.from) }}
              >
                {contactInitial(item.from)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-medium text-white/88">{item.from}</p>
                <p className="truncate text-[11px] text-white/42">{item.text}</p>
              </div>
              <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#0A84FF] px-1 text-[10px] font-semibold text-white">
                1
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-2.5">
          <MessageBubble text="Hey — checking in on Harbor Lane." time="8:12 AM" />
          <MessageBubble text="Listing goes live tomorrow. Any update?" time="8:47 AM" />
          <MessageBubble text={focusItem.text} time="9:38 AM" />
        </div>
      </div>
    </div>
  );
}

export function RemOwnerPhone({ notifications }) {
  const reduced = useReducedMotionSafe();
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [phase, setPhase] = useState(reduced ? "lock" : "idle");
  const [visibleIds, setVisibleIds] = useState(() =>
    new Set(reduced ? notifications.map((n) => n.text) : [])
  );
  const timersRef = useRef([]);
  const streamStartedRef = useRef(false);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -15% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) {
      setPhase("lock");
      setVisibleIds(new Set(notifications.map((n) => n.text)));
      return;
    }

    if (!inView || streamStartedRef.current) return;
    streamStartedRef.current = true;

    setPhase("lock");
    setVisibleIds(new Set());

    notifications.forEach((item, index) => {
      const arrivalMs = item.arrivalMs ?? DEFAULT_ARRIVAL_MS[index] ?? index * 700;
      const timerId = window.setTimeout(() => {
        setVisibleIds((prev) => {
          const next = new Set(prev);
          next.add(item.text);
          return next;
        });
      }, arrivalMs);
      timersRef.current.push(timerId);
    });

    const lastArrival =
      notifications.reduce((max, item, index) => {
        const arrivalMs = item.arrivalMs ?? DEFAULT_ARRIVAL_MS[index] ?? index * 700;
        return Math.max(max, arrivalMs);
      }, 0) + STREAM_HOLD_MS;

    const transitionId = window.setTimeout(() => {
      setPhase("messages");
    }, lastArrival);
    timersRef.current.push(transitionId);

    return clearTimers;
  }, [clearTimers, inView, notifications, reduced]);

  const toggleMessages = useCallback(() => {
    if (!reduced) return;
    setPhase((current) => (current === "messages" ? "lock" : "messages"));
  }, [reduced]);

  return (
    <div ref={containerRef} className="flex justify-center lg:justify-start">
      {reduced ? (
        <button
          type="button"
          onClick={toggleMessages}
          aria-label={
            phase === "messages"
              ? "Show lock screen notifications"
              : "Open messages thread"
          }
          className="rounded-[2.75rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853]/70"
        >
          <RemPhoneChrome>
            <AnimatePresence mode="wait">
              {phase === "messages" ? (
                <motion.div
                  key="messages"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  <RemPhoneMessagesThread
                    notifications={notifications}
                    focusContact={FOCUS_CONTACT}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="lock"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  <RemPhoneLockScreen notifications={notifications} visibleIds={visibleIds} />
                </motion.div>
              )}
            </AnimatePresence>
          </RemPhoneChrome>
        </button>
      ) : (
        <div aria-label="Sample owner phone notifications" role="img">
          <RemPhoneChrome>
            <AnimatePresence mode="wait">
              {phase === "messages" ? (
                <motion.div
                  key="messages"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: TRANSITION_MS / 1000, ease: REM_EASE }}
                  className="absolute inset-0"
                >
                  <RemPhoneMessagesThread
                    notifications={notifications}
                    focusContact={FOCUS_CONTACT}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="lock"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: phase === "idle" ? 0.85 : 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: TRANSITION_MS / 1000, ease: REM_EASE }}
                  className="absolute inset-0"
                >
                  <RemPhoneLockScreen
                    notifications={notifications}
                    visibleIds={visibleIds}
                    showTime={phase !== "idle"}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </RemPhoneChrome>
        </div>
      )}
    </div>
  );
}
