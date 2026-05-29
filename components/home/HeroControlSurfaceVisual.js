"use client";

import {
  HOME_EYEBROW_MUTED,
  HOME_EYEBROW_VIOLET,
} from "@/components/home/home-tokens";

const PANEL_FRAME =
  "relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] sm:p-4";

const GRID_OVERLAY =
  "pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_88%)]";

const STATUS_LIVE =
  "inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/[0.08] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-300/90";

const STATUS_PENDING =
  "inline-flex shrink-0 items-center rounded border border-[#FACC15]/35 bg-[#FACC15]/[0.08] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-[#FDE68A]/90";

const STATUS_ACTIVE =
  "inline-flex shrink-0 items-center rounded border border-white/20 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-white/75";

const LANE =
  "relative flex min-h-[88px] flex-col rounded-lg border border-white/[0.08] bg-white/[0.02] p-2.5 sm:min-h-[96px] sm:p-3";

const LANE_LABEL =
  "font-mono text-[8px] uppercase tracking-[0.18em] text-white/45 sm:text-[9px]";

const ROW_ITEM =
  "flex items-center justify-between gap-2 rounded border border-white/[0.06] bg-black/40 px-2 py-1.5";

const FLOW_STEPS = [
  { key: "signal", label: "Signal", rows: [{ id: "SIG-2841", label: "Handoff stall", state: "DETECTED" }] },
  { key: "review", label: "Review", rows: [{ id: "REV-1092", label: "Scope revision", state: "WAITING" }] },
  { key: "approval", label: "Approval", rows: [{ id: "APR-1091", label: "Client escalation", state: "APPROVED" }] },
  { key: "action", label: "Action", rows: [{ id: "EXE-7741", label: "Delivery lane", state: "ACTIVE" }] },
  { key: "proof", label: "Proof", rows: [{ id: "PRF-3310", label: "Closeout record", state: "DONE" }] },
];

function statusClass(state) {
  if (state === "APPROVED" || state === "WAITING") return STATUS_PENDING;
  if (state === "ACTIVE" || state === "DETECTED") return STATUS_ACTIVE;
  return STATUS_PENDING;
}

function ConnectionLines() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-2 top-[52%] hidden h-8 -translate-y-1/2 xl:block"
      viewBox="0 0 480 32"
      preserveAspectRatio="none"
      fill="none"
    >
      <line
        x1="48"
        y1="16"
        x2="432"
        y2="16"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
        strokeDasharray="4 6"
        className="hero-pipeline-pulse"
      />
    </svg>
  );
}

export default function HeroControlSurfaceVisual({ className = "" }) {
  return (
    <div className={className}>
      <div className={PANEL_FRAME}>
        <div className={GRID_OVERLAY} aria-hidden="true" />

        <div className="relative z-10 flex items-start justify-between gap-3">
          <div>
            <p className={HOME_EYEBROW_VIOLET}>Runtime flow</p>
            <p className={`mt-1 ${HOME_EYEBROW_MUTED}`}>Signal → Review → Approval → Action → Proof</p>
          </div>
          <span className={STATUS_LIVE}>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            Live
          </span>
        </div>

        <div className="relative z-10 mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-5 xl:gap-2">
          <ConnectionLines />
          {FLOW_STEPS.map((lane) => (
            <div key={lane.key} className={LANE}>
              <p className={LANE_LABEL}>{lane.label}</p>
              <div className="mt-2 space-y-1.5">
                {lane.rows.map((row) => (
                  <div key={row.id} className={ROW_ITEM}>
                    <span className="truncate font-mono text-[9px] text-white/55">{row.id}</span>
                    <span className="hidden truncate text-[10px] text-white/72 sm:inline">{row.label}</span>
                    <span className={statusClass(row.state)}>{row.state}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hero-pipeline-pulse {
          animation: hero-pipeline-flow 8s ease-in-out infinite;
        }
        @keyframes hero-pipeline-flow {
          0%,
          100% {
            stroke-opacity: 0.25;
          }
          50% {
            stroke-opacity: 0.55;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-pipeline-pulse {
            animation: none;
            stroke-opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}
