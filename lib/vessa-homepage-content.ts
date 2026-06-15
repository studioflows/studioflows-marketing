/** Vessa product landing page — copy source of truth for /vessa */

export const VESSA_SIGNUP_URL =
  "https://vessa.studioflows.co/vessa/login?intent=signup";

/** Product UI captures — swap paths when new screenshots land in public/vessa/ */
export const VESSA_PRODUCT_SCREENS = {
  chat: {
    src: "/vessa/workstream-conversations.png",
    alt: "Vessa Workstream with My Conversations chat panel",
    label: "Workstream · My Conversations",
  },
  decide: {
    src: "/vessa/decide-deliverable-review.png",
    alt: "Vessa Decide deliverable review checkpoint with artifact approval",
    label: "Decide · Deliverable review",
  },
  workstream: {
    src: "/vessa/workstream-kanban-detail.png",
    alt: "Vessa Workstream kanban board with task detail and Review in Decide action",
    label: "Workstream · Operations theatre",
  },
  mosaiq: {
    src: "/vessa/mosaiq-dashboard.png",
    alt: "Vessa MosaIQ live surface with signal ingestion modules and confidence readouts",
    label: "MosaIQ · Live surface",
  },
  onboarding: {
    src: "/vessa/onboarding-ramp-up.png",
    alt: "Vessa onboarding ramp-up mapping the business system before first actions",
    label: "Ramp-up · First session",
  },
} as const;

export const VESSA_STACK_NODES = [
  "Slack",
  "ClickUp",
  "CRM",
  "Email",
  "Docs",
  "Billing",
] as const;

export type VessaScenarioLane = "action" | "deliverable";

export type VessaScenario = {
  id: string;
  label: string;
  lane: VessaScenarioLane;
  laneLabel: string;
  signal: string;
  vessaMove: string;
  outcomes: {
    approve: string[];
    adjust: string[];
    hold: string[];
  };
};

export const VESSA_SCENARIOS: VessaScenario[] = [
  {
    id: "client-delivery-risk",
    label: "Client delivery risk",
    lane: "action",
    laneLabel: "Lane 1 · Action approval",
    signal:
      "Two client projects are within 24 hours of deadline. One key asset is still pending review and the owner is offline.",
    vessaMove:
      "Vessa creates tasks to reassign review ownership, send a team status sync, and open a time-boxed QA checkpoint, then routes those actions for your approval. No deliverable artifact.",
    outcomes: {
      approve: [
        "You approve the reassignment action. Vessa updates ownership in Workstream.",
        "You approve the comms action. Vessa sends the team status sync.",
        "You approve the checkpoint action. Vessa creates the QA task and assigns it.",
      ],
      adjust: [
        "You revise the reassignment target before approval.",
        "Vessa holds the comms action and escalates to a manager instead.",
        "Vessa shortens the QA window and resubmits the action set.",
      ],
      hold: [
        "No actions run. The deadline risk stays open.",
        "Vessa logs the risk and keeps the action queue paused.",
        "Execution stays blocked until leadership decides.",
      ],
    },
  },
  {
    id: "delivery-package-review",
    label: "Delivery package review",
    lane: "deliverable",
    laneLabel: "Lane 2 · Deliverable review",
    signal:
      "A client milestone is due tomorrow. The delivery package draft is incomplete and no one has pulled the final asset summary together.",
    vessaMove:
      "Vessa executes the work, builds the delivery package artifact, and sends it to review. You approve the deliverable, then she delivers it.",
    outcomes: {
      approve: [
        "You review the delivery package Vessa built.",
        "You approve the artifact as-is.",
        "Vessa delivers the package to the client workflow and marks the milestone complete.",
      ],
      adjust: [
        "You request revisions on the package summary.",
        "Vessa updates the artifact and resubmits for review.",
        "After your approval, Vessa delivers the revised package.",
      ],
      hold: [
        "The deliverable stays in review. Nothing is sent.",
        "Vessa flags the milestone risk on Decide.",
        "Delivery waits for your manual override.",
      ],
    },
  },
  {
    id: "team-capacity-crunch",
    label: "Team capacity crunch",
    lane: "action",
    laneLabel: "Lane 1 · Action approval",
    signal:
      "This week has a 34% workload spike, but two senior operators are at capacity and ticket response time is slipping.",
    vessaMove:
      "Vessa creates reassignment tasks, defers low-impact work in ClickUp, and opens a rapid-response lane, then routes those operational actions for your sign-off.",
    outcomes: {
      approve: [
        "You approve reassignment. Vessa moves priority tickets to available operators.",
        "You approve deferrals. Vessa pushes low-impact tasks to next sprint.",
        "You approve the rapid-response lane. Vessa creates it with clear ownership.",
      ],
      adjust: [
        "You keep most assignments intact and approve a smaller reassignment set.",
        "Vessa defers fewer tasks and resubmits the action batch.",
        "You approve rapid-response with a narrower ticket scope.",
      ],
      hold: [
        "No routing changes run. Response lag is likely to grow.",
        "Vessa records capacity risk and alerts leadership.",
        "The action queue stays paused.",
      ],
    },
  },
];

export const VESSA_DECISIONS = [
  { id: "approve" as const, label: "Approve" },
  { id: "adjust" as const, label: "Adjust and continue" },
  { id: "hold" as const, label: "Hold and escalate" },
];

export const VESSA_PAGE_CONTENT = {
  meta: {
    title: "Vessa — Autonomous AI COO for Service Operations",
    description:
      "Vessa creates work, routes the right approval checkpoint, and moves operations forward across the tools you already use. Chat is the interface. Execution is the product.",
  },

  hero: {
    eyebrow: "Autonomous execution intelligence",
    headline: "You bring the chaos.",
    headlineMuted: "I will bring the clean move.",
    body: "Meet Vessa, the autonomous AI COO that manages your Ops Hub. She creates tasks on her own, operates in two lanes — action approval and deliverable review — and moves work forward with traceability.",
    tagline: "Chat is the interface. Execution is the product.",
    cta: "Start with Vessa",
    ctaTarget: VESSA_SIGNUP_URL,
    pills: ["Action approval", "Deliverable review", "Cross-system execution"],
  },

  modeToggle: {
    observeLabel: "Chat",
    observeHint: "Where you talk to Vessa and approve lightweight actions.",
    decideLabel: "Decide",
    decideHint: "Where high-impact checkpoints land — lane, risk, and trace.",
  },

  notChatbot: {
    eyebrow: "Not a chatbot",
    headline: "An execution interface.",
    body: "Most AI tools help you think. Vessa creates work, executes in the right lane, and routes the checkpoint that actually matters.",
    contrasts: [
      "A chatbot waits for prompts. Vessa creates tasks and moves on what she sees.",
      "A chatbot generates text. Vessa takes action or builds deliverables, then asks when needed.",
      "A chatbot helps you think. Vessa helps your business operate.",
    ],
  },

  operatingLayer: {
    eyebrow: "Operating layer",
    headline: "Between decisions and done.",
    body: "Businesses usually do not break because nobody knows what is happening. They break because too much is happening at once. Vessa catches the signal, creates the work, picks the lane, and routes the right approval checkpoint.",
    bullets: [
      "High-impact decisions appear on the Decide page.",
      "Lightweight approvals can happen inside chat.",
      "Completed actions move into the execution feed.",
      "Everything important is traceable.",
    ],
  },

  twoLanes: {
    eyebrow: "Two execution lanes",
    headline: "Always approving the right thing.",
    intro:
      "Vessa does not pitch tasks for you to approve from scratch. She creates tasks on her own and operates in two lanes.",
    lane1: {
      tag: "Lane 1 · Action approval",
      headline: "Approve the action, not a deliverable",
      body: "Vessa takes an operational action that needs your sign-off before it runs. There is no deliverable artifact. You approve the action itself.",
      examples: [
        "Creating a task in ClickUp and assigning teammates",
        "Sending team comms",
        "Reassigning or adjusting existing tasks",
      ],
    },
    lane2: {
      tag: "Lane 2 · Deliverable review",
      headline: "Review the artifact, then she delivers",
      body: "Vessa executes the work, builds the artifact, and sends it to review. Once you approve the deliverable, she delivers it.",
      examples: [
        "Client update drafts and delivery packages",
        "Proof-of-completion summaries staged for release",
        "Revision-ready outputs that need a final human pass",
      ],
    },
  },

  howItWorks: {
    eyebrow: "How Vessa works",
    headline: "Observe → Create → Route → Execute → Learn",
    steps: [
      {
        title: "Observe",
        body: "Ingests operational signals, context, workflow state, and execution history.",
      },
      {
        title: "Create",
        body: "Creates tasks on her own: action batches in Lane 1 or executable work in Lane 2.",
      },
      {
        title: "Route",
        body: "Sends action approvals or deliverable reviews to Decide, chat, or Workstream as appropriate.",
      },
      {
        title: "Execute / Deliver",
        body: "Lane 1: runs approved actions. Lane 2: delivers the artifact after final approval.",
      },
      {
        title: "Learn",
        body: "Every decision, action, and outcome strengthens operating memory.",
      },
    ],
    closing: "Compounding execution intelligence.",
  },

  mosaiq: {
    eyebrow: "MosaIQ engine",
    headline: "Signal in. Execution out.",
    intro:
      "The intelligence layer that filters noise, flags governance moments, and keeps execution moving across your stack.",
    modules: [
      {
        title: "Signal Ingestion",
        body: "Vessa processes chaos, ingesting signals and filtering noise automatically.",
      },
      {
        title: "The Governor's Desk",
        body: "Flags governance-sensitive moments like lost handoffs before they become operational failures.",
      },
      {
        title: "Active Ops",
        body: "Flags blockers and forces command assignment so execution does not stall.",
      },
      {
        title: "MosaIQ Gateway",
        body: "Universal inter-product gateway that lets Vessa coordinate and govern execution across systems.",
      },
    ],
  },

  decide: {
    eyebrow: "Decide page",
    headline: "Where operations stop drifting.",
    body: "No noise. No raw logs. Just the checkpoint that matches the lane: action approval or deliverable review.",
    bullets: [
      "What Vessa created and which lane it is in",
      "Why it matters",
      "Risk, confidence, and expected impact",
      "Your approval, revision, or hold, plus the execution trace",
    ],
    closing:
      "Leadership leverage comes from approving actions and reviewing deliverables, not re-deciding work Vessa should already be doing.",
  },

  actionsArtifacts: {
    eyebrow: "Actions & artifacts",
    headline: "Not AI answers.",
    body: "Vessa does not stop at suggestions. In Lane 1 she routes operational actions for approval. In Lane 2 she builds reviewable artifacts, waits for your sign-off, then delivers.",
    items: [
      "ClickUp task creation, assignment, and reassignment actions",
      "Team comms queued for approval before send",
      "Delivery packages and client-ready drafts in review",
      "Proof-of-completion summaries staged for release",
      "Operator-ready context tied to each checkpoint",
    ],
  },

  autonomy: {
    eyebrow: "Controlled autonomy",
    headline: "Not chaos.",
    body: [
      "Vessa does not blindly automate meaningful business actions. She creates the work, picks the lane, and records every approval before anything runs or ships.",
      "Lane 1 actions and Lane 2 deliverables route through Decide when impact is high. Lower-friction action approvals can happen in chat.",
    ],
    closing: "You stay in control. The business moves faster.",
  },

  simulation: {
    eyebrow: "Try a simulation",
    headline: "See which lane Vessa is in.",
    body: "Pick a realistic scenario. Make the call, and trace what happens next.",
    disclaimer:
      "Experience demo. Representative of workflow logic, not a claim of exact live output.",
    labels: {
      sees: "What Vessa sees",
      doing: "What Vessa is doing",
      call: "Make the call",
      next: "What happens next",
    },
  },

  circuit: {
    eyebrow: "Live circuit",
    headline: "The stack is not the problem.",
    headlineMuted: "The missing layer is execution.",
    body: "Vessa sits above the tools you already use, identifies what matters, prepares the work, stages the outcome, and learns from what happens next.",
    sliderLabel: "Autonomy intensity",
    sliderHint: "Slide from visibility to autonomy. Watch isolated nodes become one operating system.",
    footerLeft: "Infrastructure always on",
  },

  axiom: {
    eyebrow: "Powered by Axiom",
    headline: "Intelligence underneath every workflow.",
    body: "Vessa is powered by Axiom, the intelligence and execution engine that structures decisions, playbooks, validations, approvals, and traceable outcomes underneath every workflow.",
    closing: "Business intelligence that moves work forward.",
    pillars: ["Connected by design", "Compounding execution", "Friction removed at the system level"],
  },

  outcomes: {
    eyebrow: "The real outcome",
    headline: "Less founder dependency. More work moving.",
    items: [
      "Fewer dropped decisions",
      "Fewer missed follow-ups",
      "Clearer ownership",
      "Faster approval cycles",
      "Stronger execution visibility",
      "Less founder dependency",
      "More work moving without more meetings",
    ],
    simpleVersion: {
      headline: "The simple version",
      steps: [
        "Vessa watches the business.",
        "Vessa creates tasks and picks the lane.",
        "You approve actions or review deliverables.",
        "Vessa executes or delivers after approval.",
        "Vessa tracks what happened.",
      ],
    },
    closing:
      "Not another chatbot. Not another dashboard. The interface where business work moves.",
  },

  finalCta: {
    eyebrow: "Start now",
    headline: "Run your first execution loop.",
    body: "Open signup. Vessa maps your system on ramp-up, then creates the work — you approve the consequence on Decide.",
    cta: "Start with Vessa",
    ctaTarget: VESSA_SIGNUP_URL,
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// ARCHIVED — pulled from primary homepage during OS repositioning. Reusable on
// /vessa or future IQ pages. Renderers: InitiationHomeSections.js (08–10).
// ─────────────────────────────────────────────────────────────────────────────

export const VESSA_IQ_ARCHIVED_CONTENT = {
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
} as const;

/** @deprecated Use VESSA_PAGE_CONTENT — kept for any legacy imports */
export const VESSA_HOMEPAGE_CONTENT = VESSA_IQ_ARCHIVED_CONTENT;
