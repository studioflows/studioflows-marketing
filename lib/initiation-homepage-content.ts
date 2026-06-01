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
    eyebrow: "Built for owners who run service businesses",
    headline: "Your business knows the moment you step away.",
    supportingCopy: [
      "Projects fall behind.",
      "Approvals pile up.",
      "Clients feel the delays before anyone says a word.",
      "It's not because your team is lazy.",
      "It's because the whole thing still runs on people remembering to hold it together.",
    ],
    primaryCta: "See what your business needs you for",
    primaryCtaTarget: OS_DIAGNOSTIC_URL,
    secondaryCta: "See how it works",
    secondaryCtaTarget: "#system",
  },
  founderPain: {
    headline: "Somewhere along the way, you became the backup plan for everything.",
    body: [
      "Your team asks you things the system should already know.",
      "Client updates wait because the details are buried somewhere else.",
      "Reports get rushed the morning they're due.",
      "Approvals sit until someone grabs your attention.",
      "A project starts slipping, but no one catches it in time to stop the scramble.",
      "And the worst part? Most of your people are trying really hard.",
      "The problem isn't effort.",
      "It's that good people are stuck in a setup that can't hold the weight anymore.",
    ],
  },
  dependencySelector: {
    title: "What still depends on you?",
    prompt:
      "Pick the parts of the business that still wait on you.",
    options: [
      "Client approvals",
      "Work reviews",
      "Fires to put out",
      "Reports",
      "Scheduling",
      "Keeping the team on track",
      "Follow-ups",
      "Sharing info",
    ],
    resultCopy: [
      "You're the glue.",
      "If these still live in your head, the business can't really run without you.",
    ],
  },
  founderStory: {
    headline:
      "The scariest part of growing is seeing how much the business still runs on your memory.",
    body: [
      "StudioFlows came out of the kind of stress most owners don't talk about.",
      "Big contracts were coming in.",
      "From the outside, the business looked strong.",
      "Behind the scenes, the work was spread across apps, inboxes, meetings, files, notes, and memory.",
      "Client messages lived in one place.",
      "Project tracking lived somewhere else.",
      "The actual work lived in another tool.",
      "The details lived in calls, chats, and people's heads.",
      "Everyone was busy.",
      "But being busy is not the same as being in control.",
      "One missed handoff could turn into a late delivery.",
      "A late delivery could turn into a tense client call.",
      "A tense call could turn into a lost client, a refund, or a team scrambling to win back trust.",
      "The hard part wasn't that people didn't care.",
      "The hard part was that the system was not strong enough to keep good people from failing.",
    ],
  },
  continuityReframe: {
    headline: "Most businesses don't have a software problem.",
    subheadline: "They have a problem staying on track without the owner.",
    body: [
      "The owner becomes the reminder system.",
      "The one who handles problems.",
      "The one who approves things.",
      "The one who checks the work.",
      "The one who remembers everything.",
      "The backup plan when things start to slip.",
      "That works when the business is small.",
      "But growth turns it into a problem.",
      "The company only feels organized when the owner is carrying it.",
      "That is not growth.",
      "That is depending on one person.",
    ],
  },
  aiCategorySeparation: {
    headline: "Most AI still leaves you on the hook for the results.",
    body: [
      "A lot of AI tools help you make stuff.",
      "Summaries.",
      "Writing.",
      "Tasks.",
      "Automations.",
      "Suggestions.",
      "But someone still has to ask it, check it, send it, approve it, fix the odd cases, and remember what comes next.",
      "That's why so many AI tools feel exciting at first and tiring later.",
      "They make parts of the work faster.",
      "But they don't take the weight off the owner.",
    ],
    requiredLine: "Prompting is still work.",
  },
  studioFlowsReveal: {
    anchor: "system",
    headline: "StudioFlows puts a layer underneath the business that runs the work.",
    body: [
      "StudioFlows mixes smart systems that get better over time, so work keeps moving without going through your head, calendar, inbox, or memory.",
      "It's not another dashboard.",
      "It's not another chat box.",
      "It's not one more app to manage.",
      "It's a system built to slowly free the business from depending on you.",
    ],
  },
  fridayReportSimulation: {
    headline: "The difference shows up before the fire starts.",
    body: [
      "Picture a client report due Friday morning.",
      "At most companies, the team finds out Thursday night: half the data is missing, the summary isn't written, last week's to-dos were never done, and the client asked for an extra part in a meeting nobody wrote down.",
      "Now everyone is rushing.",
      "Again.",
      "StudioFlows is built to catch this early.",
      "It sees the deadline.",
      "It sees the missing data.",
      "It sees the unfinished to-dos.",
      "It catches the client's request from the meeting notes.",
      "It builds the draft before the team has to panic.",
      "It shows what still needs your okay.",
      "You can still review it.",
      "But most of the work is already done before anyone had to ask.",
      "That's the point.",
      "Not more software.",
      "Less weight on you.",
    ],
    microInteraction2: {
      title: "What the system caught before the team did.",
    },
    revealItems: [
      "Friday deadline",
      "Missing data",
      "Unfinished to-dos",
      "Client request in the notes",
      "Still needs your okay",
      "Delivery at risk",
    ],
  },
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
  operationalDiagnostic: {
    anchor: "diagnostic",
    headline: "Find where the business still depends on you.",
    body: [
      "Before StudioFlows suggests a path, it needs to see where the weight is.",
      "This quick check shows:",
    ],
    bullets: [
      "where the work depends on your memory",
      "where handoffs break",
      "where approvals slow things down",
      "where your tools track work but don't do it",
      "where smarter tools can cut the back-and-forth",
      "whether you need StudioFlows IQ, StudioFlows OS, or both",
    ],
    cta: "See what your business needs you for",
    ctaTarget: OS_DIAGNOSTIC_URL,
  },
  entryPaths: {
    headline: "One goal. Two ways to start.",
    body: [
      "StudioFlows doesn't push every business into the same starting point.",
      "Some are ready now to swap their scattered tools for one system built for them.",
      "Others want first access to the smart layer as it opens — by invite only.",
      "The quick check points you to the right one.",
    ],
    card1: {
      tag: "Available now · built for you",
      headline: "StudioFlows OS",
      subheadline: "One system built around how your business runs.",
      body: [
        "StudioFlows OS swaps your scattered tools for one connected system — jobs, workflows, scheduling, approvals, client portals, and tracking from start to finish.",
        "Right now we build it for you. We look at how you work, map out the system, and send you a plan.",
      ],
      bestFor:
        "Service businesses ready for a cleaner setup now, built around how they really work.",
      cta: "Start the check",
      ctaTarget: OS_DIAGNOSTIC_URL,
    },
    card2: {
      tag: "Invite only · in the works",
      headline: "StudioFlows IQ",
      subheadline: "A system that learns your business, opening by invite.",
      body: [
        "A smart layer that learns from your work, choices, problems, and deliveries over time.",
        "Vessa, the screen you work in inside StudioFlows IQ, is still private and opening to a small group first.",
      ],
      bestFor:
        "Owners who want first access when the smart system opens up.",
      cta: "Ask for a Vessa invite",
      ctaTarget: VESSA_WAITLIST_URL,
    },
  },
  finalCta: {
    headline: "Your business shouldn't feel heavier every time it grows.",
    body: [
      "StudioFlows is built for owner-led service businesses that have outgrown scattered tools, manual work, and needing the owner for everything.",
      "Not another AI tool.",
      "A system built to take weight off you over time.",
    ],
    primaryCta: "See what your business needs you for",
    primaryCtaTarget: OS_DIAGNOSTIC_URL,
    secondaryCta: "Ask for a Vessa invite",
    secondaryCtaTarget: VESSA_WAITLIST_URL,
  },
} as const;
