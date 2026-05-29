/** Shared static visual tokens for homepage sections. */

export const HOME_EYEBROW = "text-[11px] uppercase tracking-[0.24em]";
export const HOME_EYEBROW_MUTED = `${HOME_EYEBROW} text-white/55`;
export const HOME_EYEBROW_ACCENT = `${HOME_EYEBROW} text-[#FACC15]`;
export const HOME_EYEBROW_VIOLET = `${HOME_EYEBROW} text-[#C4B5FD]`;

export const HOME_H1 =
  "text-[clamp(2.5rem,8vw,5.6rem)] font-semibold leading-[0.93] tracking-[-0.03em]";
export const HOME_H2 =
  "text-[clamp(2rem,4vw,3.4rem)] font-bold leading-tight tracking-[-0.02em]";
export const HOME_H3 = "text-lg font-semibold text-white";
export const HOME_H3_CARD = "text-base font-semibold text-white";

export const HOME_BODY = "text-base leading-7 text-white/72";
export const HOME_BODY_LG = "text-lg leading-8 text-white/80";
export const HOME_BODY_SM = "text-sm leading-7 text-white/72";

export const HOME_SECTION = "scroll-mt-24 pt-32 sm:pt-36 lg:pt-40";

export const HOME_CARD = "rounded-2xl border border-white/10 bg-white/[0.03]";
export const HOME_CARD_PAD = "p-5 sm:p-6";
export const HOME_CARD_ACCENT =
  "rounded-2xl border border-[#FACC15]/25 bg-[linear-gradient(160deg,rgba(250,204,21,0.06),rgba(255,255,255,0.03))]";

export const HOME_CARD_ACTIVE =
  "border-[#FACC15]/35 bg-white/[0.06] shadow-[0_0_0_1px_rgba(250,204,21,0.18)]";
export const HOME_CARD_IDLE =
  "border-white/10 bg-white/[0.02] hover:border-white/16 hover:bg-white/[0.04]";

export const HOME_CTA_PRIMARY =
  "rounded-xl bg-[#FACC15] px-5 py-3.5 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-black shadow-[0_12px_35px_rgba(250,204,21,0.35)] transition hover:brightness-105 sm:px-7 sm:text-[11px] sm:tracking-[0.2em]";
export const HOME_CTA_PRIMARY_BLOCK = `${HOME_CTA_PRIMARY} block w-full sm:w-auto`;

export const HOME_CTA_SECONDARY =
  "rounded-xl border border-white/35 px-5 py-3.5 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-white/[0.08] sm:px-7 sm:text-[11px] sm:tracking-[0.2em]";
export const HOME_CTA_SECONDARY_BLOCK = `${HOME_CTA_SECONDARY} block w-full sm:w-auto`;

export const HOME_STEP_NUMBER =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#FACC15]/40 bg-[#FACC15]/10 text-[11px] font-semibold text-[#FACC15]";
