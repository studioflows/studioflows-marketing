// ── CTA destinations ─────────────────────────────────────────────────────────
// Single source of truth for where every homepage CTA points. Swap these two
// values with the StudioFlows OS tenant redirect links so leads + appointments
// land inside the OS account:
//   OS_DIAGNOSTIC_URL  → the OS quiz funnel / booking flow (every "diagnostic" CTA)
//   VESSA_WAITLIST_URL → the OS Vessa invitation / waitlist flow
// Interim values keep the on-site routes working until the OS links are provided.
const OS_DIAGNOSTIC_URL = "/apply";
const VESSA_WAITLIST_URL = "/vessa";

export const INITIATION_HOMEPAGE_CONTENT = {
  hero: {
    eyebrow: "Execution Infrastructure for Founder-Led Service Businesses",
    headline: "Your business knows when you disappear.",
    supportingCopy: [
      "Projects drift.",
      "Approvals pile up.",
      "Clients feel delays before anyone says it out loud.",
      "Not because your team is lazy.",
      "Because the business still depends on human coordination to hold itself together.",
    ],
    primaryCta: "Start the Operational Weight Diagnostic",
    primaryCtaTarget: OS_DIAGNOSTIC_URL,
    secondaryCta: "See how the system works",
    secondaryCtaTarget: "#system",
  },
  founderPain: {
    headline: "Somewhere along the way, you became the backup plan for everything.",
    body: [
      "The team asks questions the system should already answer.",
      "Client updates wait because the right context is buried somewhere else.",
      "Reports get rushed the morning they are due.",
      "Approvals sit until someone gets your attention.",
      "A project starts slipping, but nobody notices early enough to prevent the scramble.",
      "And the worst part is that most of the people around you are trying hard.",
      "The failure is not always effort.",
      "Sometimes good people are operating inside a structure that cannot carry the weight anymore.",
    ],
  },
  dependencySelector: {
    title: "What still depends on you?",
    prompt:
      "Select the parts of the business that still tend to route through your attention.",
    options: [
      "Client approvals",
      "Delivery reviews",
      "Escalations",
      "Reporting",
      "Scheduling",
      "Team accountability",
      "Follow-up",
      "Context routing",
    ],
    resultCopy: [
      "Operational dependency detected.",
      "If these decisions still depend on your memory, your business is not fully operating without you.",
    ],
  },
  founderStory: {
    headline:
      "The scariest part of scaling is realizing the business still depends on your memory.",
    body: [
      "StudioFlows was built from the kind of operational pressure most founders do not talk about publicly.",
      "Large contracts were coming in.",
      "The business looked strong from the outside.",
      "Behind the scenes, execution was scattered across project tools, inboxes, meetings, files, notes, and memory.",
      "Client communication lived in one place.",
      "Project tracking lived somewhere else.",
      "Deliverables were in another system.",
      "Context lived in calls, threads, and people's heads.",
      "Everyone was moving.",
      "But movement is not the same thing as operational control.",
      "One missed handoff could become a delayed delivery.",
      "A delayed delivery could become a tense client call.",
      "A tense client call could become churn risk, a refund, or a team scrambling to recover trust.",
      "The hard part was not that people did not care.",
      "The hard part was realizing the system was not strong enough to keep good people from failing.",
    ],
  },
  continuityReframe: {
    headline: "Most businesses do not have a software problem.",
    subheadline: "They have an operational continuity problem.",
    body: [
      "The founder becomes the reminder system.",
      "The escalation layer.",
      "The approval router.",
      "The quality control department.",
      "The institutional memory.",
      "The fallback plan when everything starts slipping.",
      "That works when the business is small.",
      "Then growth turns it into a liability.",
      "The company only feels organized when the founder is actively carrying it.",
      "That is not scale.",
      "That is dependency.",
    ],
  },
  aiCategorySeparation: {
    headline: "Most AI still leaves the founder responsible for the outcome.",
    body: [
      "A lot of AI tools help generate work.",
      "Summaries.",
      "Copy.",
      "Tasks.",
      "Automations.",
      "Suggestions.",
      "But someone still has to prompt it, check it, route it, approve it, fix the edge cases, and remember what should happen next.",
      "That is why so many AI tools feel exciting at first and heavy later.",
      "They make pieces of work faster.",
      "They do not remove the operational responsibility sitting on the founder.",
    ],
    requiredLine: "Prompting is still work.",
  },
  studioFlowsReveal: {
    anchor: "system",
    headline: "StudioFlows installs the execution layer underneath the business.",
    body: [
      "StudioFlows combines operational systems and compounding intelligence so work can move without everything routing through the founder's brain, calendar, inbox, or memory.",
      "It is not another dashboard.",
      "It is not another prompt box.",
      "It is not another app asking you to manage more software.",
      "It is execution infrastructure designed to reduce founder dependency over time.",
    ],
  },
  fridayReportSimulation: {
    headline: "The difference shows up before the emergency.",
    body: [
      "Imagine a client report is due Friday morning.",
      "In most businesses, the team realizes Thursday night that half the reporting data is incomplete, the summary is not written, last week's action items were never resolved, and the client asked for an extra section during a meeting that nobody captured properly.",
      "Now everyone is rushing.",
      "Again.",
      "StudioFlows is designed to catch the drift earlier.",
      "The system sees the deadline.",
      "It sees the missing dependencies.",
      "It sees unresolved action items.",
      "It connects the client request from the meeting notes.",
      "It prepares the draft before the team has to panic.",
      "It surfaces what still needs approval.",
      "The founder may still review it.",
      "But most of the work is already prepared before anyone had to ask.",
      "That is the point.",
      "Not more software.",
      "Less operational weight.",
    ],
    microInteraction2: {
      title: "What the system noticed before the team did.",
    },
    revealItems: [
      "Friday delivery deadline",
      "Missing reporting data",
      "Unresolved action items",
      "Client request from meeting notes",
      "Approval still required",
      "Delivery risk forming early",
    ],
  },
  compoundingIntelligence: {
    headline: "Most systems stay static.",
    subheadline: "StudioFlows compounds.",
    body: [
      "Every workflow, approval, escalation, client interaction, delivery pattern, correction, and decision strengthens the system's understanding of how the business actually operates.",
      "Over time, StudioFlows builds operational memory.",
      "It learns what matters.",
      "What breaks.",
      "Who owns what.",
      "What should be ignored.",
      "What usually becomes a problem before anyone says it out loud.",
      "That is the difference between a tool and an intelligence layer.",
    ],
    outcomeIntro: "As the system learns:",
    outcomeItems: [
      "Approvals decrease",
      "Routing improves",
      "Execution speeds up",
      "Coordination friction drops",
      "Operational trust increases",
    ],
    outcomeClosing: [
      "The goal is not more AI.",
      "The goal is a business that becomes lighter to operate.",
    ],
  },
  confidenceModel: {
    headline: "Autonomy should be earned.",
    body: [
      "StudioFlows does not ask you to trust the system blindly.",
      "Vessa uses a visible confidence model to show how strongly the system understands different parts of the business.",
      "Higher confidence means fewer interruptions, fewer approvals, and more execution handled without manual oversight.",
      "You stay in control.",
      "But the business stops depending on you for every operational decision.",
    ],
  },
  fivePillars: {
    headline: "Activity is not progress.",
    body: [
      "StudioFlows does not treat every notification, task, or request like it matters.",
      "Signals are evaluated against five business pillars:",
    ],
    pillars: ["Power", "Revenue", "Relationships", "Growth", "Resilience"],
    closing:
      "If an action does not strengthen at least one pillar, it is treated as noise instead of progress.",
    closing2:
      "That keeps the system focused on what actually makes the business stronger.",
  },
  operationalDiagnostic: {
    anchor: "diagnostic",
    headline: "Find where the business still depends on you.",
    body: [
      "Before StudioFlows recommends a path, the system should understand the shape of the operational weight.",
      "The diagnostic is designed to surface:",
    ],
    bullets: [
      "where execution depends on founder memory",
      "where handoffs break",
      "where approvals slow work down",
      "where software is tracking work but not carrying it",
      "where intelligence can reduce manual coordination",
      "whether the business needs StudioFlows IQ, StudioFlows OS, or both",
    ],
    cta: "Start the Operational Weight Diagnostic",
    ctaTarget: OS_DIAGNOSTIC_URL,
  },
  entryPaths: {
    headline: "One story. Two ways in.",
    body: [
      "StudioFlows does not force every business into the same starting point.",
      "Some are ready now to replace fragmented operations with a custom-built operating layer.",
      "Others want first access to the intelligence layer as it opens — by invitation.",
      "The diagnostic points you toward the right path.",
    ],
    card1: {
      tag: "Available now · custom build",
      headline: "StudioFlows OS",
      subheadline: "A native operating layer, built around your business.",
      body: [
        "StudioFlows OS replaces fragmented tools with a purpose-built operational environment — jobs, workflows, scheduling, approvals, client portals, and lifecycle management in one connected system.",
        "Today it is delivered as a custom build. We audit your operation, scope the system, and turn around a proposal.",
      ],
      bestFor:
        "Service businesses ready to install a cleaner operating backbone now, tailored to how they actually run.",
      cta: "Start the diagnostic",
      ctaTarget: OS_DIAGNOSTIC_URL,
    },
    card2: {
      tag: "Invitation only · in development",
      headline: "StudioFlows IQ",
      subheadline: "Compounding operational intelligence, opening by invitation.",
      body: [
        "An intelligence layer that learns from your workflows, decisions, escalations, and delivery patterns over time.",
        "Vessa, the execution surface inside StudioFlows IQ, is in private development and opening to a selective group first.",
      ],
      bestFor:
        "Founders who want first access when intelligent execution opens beyond custom builds.",
      cta: "Request a Vessa invitation",
      ctaTarget: VESSA_WAITLIST_URL,
    },
  },
  finalCta: {
    headline: "Your business should not feel heavier every time it grows.",
    body: [
      "StudioFlows was built for founder-led service businesses that have outgrown fragmented tools, manual coordination, and constant founder intervention.",
      "Not another AI tool.",
      "An execution system designed to remove operational weight over time.",
    ],
    primaryCta: "Start the Operational Weight Diagnostic",
    primaryCtaTarget: OS_DIAGNOSTIC_URL,
    secondaryCta: "Request a Vessa invitation",
    secondaryCtaTarget: VESSA_WAITLIST_URL,
  },
} as const;
