/**
 * Shared visual language for the StudioFlows qualifier funnel (/apply and
 * /services/custom-ops-hub). Mirrors the homepage "reborn in light" system used
 * by the Diagnostic / Entry Paths / Final CTA sections so the funnel reads as a
 * seamless continuation: warm parchment, ink type, gold accent, serif heads.
 */

export const QUALIFIER_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

export const QUALIFIER_PAGE = "relative min-h-screen overflow-hidden bg-[#F4F1EA] text-[#0B0B0C]";

export const Q_EYEBROW = "font-mono text-[11px] font-semibold uppercase tracking-[0.26em] text-[#6B5212]";
export const Q_EYEBROW_MUTED = "font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B5212]/85";

export const Q_HEADLINE =
  "font-serif font-semibold leading-[1.04] tracking-[-0.035em] text-[#100F0C]";
export const Q_BODY = "text-base leading-8 text-[#2A2620]";
export const Q_MUTED = "text-[#4E483D]";

export const Q_CARD =
  "rounded-[28px] border border-black/15 bg-[#FBF9F4] shadow-[0_28px_80px_rgba(20,15,5,0.14)]";

export const Q_OPTION_IDLE =
  "border-black/18 bg-white text-[#1C1813] hover:border-[#8A6A1F]/70 hover:bg-[#FFFDF7]";
export const Q_OPTION_ACTIVE =
  "border-[#8A6A1F] bg-[#D4A853]/28 text-[#3E2D06] font-medium shadow-[0_0_0_1px_rgba(138,106,31,0.35)]";

export const Q_INPUT =
  "w-full rounded-xl border border-black/18 bg-white px-4 py-3 text-sm text-[#100F0C] outline-none placeholder:text-[#4E483D]/70 transition focus:border-[#8A6A1F] focus:ring-2 focus:ring-[#D4A853]/30";

export const Q_CTA_PRIMARY =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#0B0B0C] px-8 py-3.5 text-sm font-semibold tracking-wide text-[#F4F1EA] shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-55";

export const Q_CTA_SECONDARY =
  "inline-flex min-h-[52px] items-center justify-center rounded-full border border-black/20 px-7 py-3.5 text-sm font-semibold text-[#0B0B0C] transition hover:bg-black/[0.05] disabled:cursor-not-allowed disabled:opacity-45";

/**
 * Warm parchment backdrop: page grain + a soft breathing gold bloom near the top,
 * matching the homepage light sections. Purely decorative.
 */
export function QualifierAtmosphere() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-multiply"
        style={{ backgroundImage: QUALIFIER_GRAIN }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(circle_at_50%_-10%,rgba(212,168,83,0.20),transparent_60%)]"
        aria-hidden="true"
      />
    </>
  );
}
