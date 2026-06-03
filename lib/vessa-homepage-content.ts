// ─────────────────────────────────────────────────────────────────────────────
// FUTURE_VESSA_SECTION_DO_NOT_DELETE
//
// Archived StudioFlows IQ / Vessa homepage sections.
//
// These sections were pulled OUT of the primary homepage flow during the
// `homepage_v1_os_repositioning_refresh` gate so the homepage sells the
// Version 1 product that exists today (StudioFlows OS). They imply a future
// intelligence layer (Vessa) that learns the business, earns autonomy, and
// handles execution — capabilities that are NOT live yet and must be framed as
// future / early-access only.
//
// DO NOT DELETE. Reuse this copy later on /vessa, /studioflows-iq, /future, or
// a dedicated IQ landing page when the intelligence layer ships. The matching
// renderers still live in components/home/InitiationHomeSections.js:
//   - InitiationCompoundingIntelligenceSection  (08 / compounding memory)
//   - InitiationConfidenceModelSection          (09 / trust architecture)
//   - InitiationFivePillarsSection              (10 / doctrine — signal vs noise)
// ─────────────────────────────────────────────────────────────────────────────

export const VESSA_HOMEPAGE_CONTENT = {
  // 08 / COMPOUNDING MEMORY — the system learns over time.
  compoundingIntelligence: {
    headline: "Most tools stay the same.",
    subheadline: "StudioFlows gets smarter.",
    body: [
      "Every task, approval, problem, client chat, delivery, fix, and choice teaches the system how your business really works.",
      "Over time, StudioFlows builds a memory of how you run.",
      "It learns what matters.",
      "What breaks.",
      "Who owns what.",
      "What to ignore.",
      "What usually turns into a problem before anyone says it out loud.",
      "That's the difference between a tool and a system that thinks.",
    ],
    outcomeIntro: "As the system learns:",
    outcomeItems: [
      "Fewer approvals",
      "Work goes to the right place",
      "Work gets faster",
      "Less back-and-forth",
      "More trust in the system",
    ],
    outcomeClosing: [
      "The goal isn't more AI.",
      "The goal is a business that's lighter to run.",
    ],
  },

  // 09 / TRUST ARCHITECTURE — earned autonomy via the Vessa confidence model.
  confidenceModel: {
    headline: "Trust should be earned.",
    body: [
      "StudioFlows doesn't ask you to trust it blindly.",
      "Vessa shows you, out in the open, how well it understands each part of your business.",
      "The more it understands, the fewer times it has to stop and ask you.",
      "You stay in control.",
      "But the business stops needing you for every little decision.",
    ],
  },

  // 10 / DOCTRINE — signal vs noise, judged against five business pillars.
  fivePillars: {
    headline: "Being busy is not progress.",
    body: [
      "StudioFlows doesn't treat every ping, task, or request like it matters.",
      "It checks each one against five things that make a business strong:",
    ],
    pillars: ["Power", "Revenue", "Relationships", "Growth", "Resilience"],
    closing:
      "If something doesn't help at least one of these, it's treated as noise, not progress.",
    closing2:
      "That keeps the system focused on what really makes the business stronger.",
  },
} as const;
