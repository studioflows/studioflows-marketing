"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { REM_COPY } from "@/lib/real-estate-media/rem-landing-content";
import {
  RemSection,
  RemTerminalChrome,
  useRemReducedMotion,
} from "@/components/real-estate-media/rem-noir-primitives";
import { REM_BODY, REM_BODY_SM, REM_H2, REM_RESOLVED } from "@/components/real-estate-media/rem-noir-tokens";

const FIELD_STEPS = [
  { mobile: "Field complete", owner: "87 Pine · field complete", tone: "neutral" },
  { mobile: "Upload pending · drone", owner: "Waiting on upload", tone: "warn" },
  { mobile: "Upload landed", owner: "Files on job · editor notified", tone: "resolved" },
];

export function RemNoirFieldFlowSection() {
  const reduce = useRemReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % FIELD_STEPS.length);
    }, 3600);
    return () => window.clearInterval(id);
  }, [reduce]);

  const current = FIELD_STEPS[step];

  return (
    <RemSection id="fieldflow-preview">
      <div className="lg:grid lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-12">
        <div>
          <h2 className={REM_H2}>{REM_COPY.fieldflow.headline}</h2>
          <div className={`mt-4 space-y-3 lg:max-w-xl ${REM_BODY}`}>
            {REM_COPY.fieldflow.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:mt-0">
          <RemTerminalChrome title={REM_COPY.fieldflow.mobileLabel} right="alex · 2:14p">
            <motion.div
              key={`mobile-${step}`}
              initial={reduce ? false : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-sm font-medium text-zinc-100">87 Pine Street</p>
              <p className={`mt-2 ${REM_BODY_SM}`}>{current.mobile}</p>
            </motion.div>
          </RemTerminalChrome>

          <RemTerminalChrome title={REM_COPY.fieldflow.ownerLabel} right="live sync">
            <motion.div
              key={`owner-${step}`}
              initial={reduce ? false : { opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
            >
              <p
                className={`text-sm ${
                  current.tone === "resolved"
                    ? REM_RESOLVED
                    : current.tone === "warn"
                      ? "text-red-300/80"
                      : "text-zinc-300"
                }`}
              >
                {current.owner}
              </p>
              <p className={`mt-2 ${REM_BODY_SM}`}>No group text. Same record.</p>
            </motion.div>
          </RemTerminalChrome>
        </div>
      </div>
    </RemSection>
  );
}
