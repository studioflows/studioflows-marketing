export const FINAL_HOMEPAGE_CTA = {
  primaryLabel: "See the system in action",
  primaryHref: "#system",
  secondaryLabel: "Book an Operational Architecture Review",
  secondaryHref: "/apply",
} as const;

export const FINAL_NAV_LINKS = [
  { label: "Problem", href: "#problem" },
  { label: "System", href: "#system" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Vessa", href: "#vessa" },
  { label: "Review", href: "/apply" },
] as const;

export const FINAL_HERO = {
  eyebrow: "Execution Infrastructure for Founder-Led Service Businesses",
  headline: "The founder should not be the operating system.",
  subcopy:
    "You built the company. You still carry the routing, the context, and the last-mile decisions that keep client work moving. That weight is not ambition. It is structural.",
  closing:
    "StudioFlows installs execution infrastructure so the business can run without you holding every thread in your head.",
} as const;

export const FINAL_FOUNDER_PAIN = {
  id: "problem",
  eyebrow: "Founder pain",
  heading: "You know the Tuesday morning.",
  paragraphs: [
    "A client email lands. Your project lead asks for approval in Slack. Billing needs a number from a spreadsheet only you trust. A deliverable is due Friday and three people think someone else owns the next step.",
    "Nothing is on fire. That is the problem. The business runs, but it runs through you. Every handoff, escalation, and judgment call still routes back to the founder.",
    "You are not failing at delegation. The system was never built to carry operational weight without you.",
  ],
} as const;

export const FINAL_REFRAME = {
  eyebrow: "The real problem",
  heading: "This is not a hiring problem or a discipline problem.",
  subcopy:
    "Most founder-led service businesses do not lack talent or tools. They lack a connected execution layer that owns handoffs, approvals, and proof.",
  bullets: [
    "Client work lives in one place. Team assignments in another. Approvals in chat. Billing somewhere else.",
    "The real picture still lives in the founder's head.",
    "Scaling adds revenue before it adds operational relief.",
  ],
  closing: "That is not a people problem. It is a system problem.",
} as const;

export const FINAL_AI_TOOLS_FAIL = {
  eyebrow: "Why most AI tools still fail",
  heading: "More software did not remove the weight.",
  subcopy:
    "PM tools, CRMs, and dashboards were built to record activity. They do not own the handoff when context shifts or a client deadline moves.",
  contrast: [
    {
      label: "What teams try",
      body: "Another chat layer, another dashboard, another place to check. Prompting is still work. Someone still has to remember the thread.",
    },
    {
      label: "What execution requires",
      body: "Capture the signal, route it for review, hold approval at the right checkpoint, move the work, and leave proof behind.",
    },
  ],
  closing: "Tools that only surface information leave the founder as the router.",
} as const;

export const FINAL_TWIST = {
  eyebrow: "The twist",
  heading: "You do not need more places to look.",
  subcopy:
    "You need execution infrastructure: a connected layer that turns scattered signals into reviewable work your team can approve, release, and trace.",
  closing: "That is what StudioFlows installs.",
} as const;

export const FINAL_WHAT_IS = {
  id: "system",
  eyebrow: "What StudioFlows is",
  heading: "Execution infrastructure for founder-led service businesses.",
  subcopy:
    "StudioFlows captures opportunities, requests, decisions, and follow-ups from the places your team already works, then turns them into structured work with clear ownership, human checkpoints, and a record of what moved.",
  outcomes: [
    "Less founder-as-router",
    "Clearer ownership on active work",
    "Approvals that are visible, not buried in chat",
    "Execution you can trace after the fact",
  ],
} as const;

export const FINAL_EXAMPLE = {
  eyebrow: "A concrete example",
  heading: "Client report due Friday.",
  scenario: [
    "Thursday afternoon. A recurring client report is due tomorrow. The data lives in two tools. The draft is half-written. The founder is the only person who knows the full context and the approval path.",
    "In a connected system, the deadline becomes a signal. Work routes to the right owner. Draft review sits in a deliverable lane. Final send waits on an explicit approval checkpoint. The founder sees status without reconstructing the story from memory.",
  ],
  closing: "The report still gets done. The difference is who carries the operational weight to get there.",
} as const;

export const FINAL_COMPOUNDING = {
  id: "intelligence",
  eyebrow: "Compounding intelligence",
  heading: "The system gets sharper as work moves through it.",
  subcopy:
    "Every routed handoff, approval, and finished deliverable teaches the operating layer how your business actually runs. Patterns repeat. Routing gets faster. Fewer things die between tools.",
  points: [
    "Repeated work types route to the right owner faster",
    "Approval paths reflect how your team actually decides",
    "Context stays attached instead of disappearing at the handoff",
    "The founder stops re-explaining the same operational story",
  ],
} as const;

export const FINAL_CONFIDENCE = {
  eyebrow: "Confidence model",
  heading: "Control without constant presence.",
  subcopy:
    "StudioFlows is built for operators who need to step away without things slipping. High-impact moves get a human checkpoint. Nothing critical runs silently. Finished work leaves proof.",
  lanes: [
    {
      title: "Human checkpoints",
      body: "Judgment stays where it matters. The system holds work until the right person signs off.",
    },
    {
      title: "Traceable execution",
      body: "See what moved, who approved it, and what finished without rebuilding history from Slack.",
    },
    {
      title: "Founder relief",
      body: "Take a week off without becoming the fallback system for every stalled handoff.",
    },
  ],
} as const;

export const FINAL_PILLARS = {
  eyebrow: "Five pillars",
  heading: "How work moves through the system.",
  subcopy: "Five connected capabilities that turn scattered signals into finished work your team can trust.",
  pillars: [
    {
      number: "01",
      title: "Capture signals",
      body: "Pull requests, decisions, and follow-ups from the channels work already lives in.",
    },
    {
      number: "02",
      title: "Route for review",
      body: "Organize incoming work by priority, owner, and deadline before it becomes chaos.",
    },
    {
      number: "03",
      title: "Approval control",
      body: "High-impact moves get a human checkpoint. Nothing critical runs without sign-off.",
    },
    {
      number: "04",
      title: "Execution movement",
      body: "Release approved work into tasks, status changes, and client-facing updates.",
    },
    {
      number: "05",
      title: "Proof closure",
      body: "Show what moved, who approved it, and what finished without dashboard theater.",
    },
  ],
} as const;

export const FINAL_ARCHITECTURE = {
  id: "vessa",
  eyebrow: "The stack",
  heading: "StudioFlows OS, IQ, Vessa, and Axiom.",
  subcopy:
    "You interact with Vessa. StudioFlows OS holds your operating layer. StudioFlows IQ routes intelligence across the stack. Axiom structures the decision logic underneath.",
  layers: [
    {
      name: "StudioFlows OS",
      role: "Custom operating layer",
      detail:
        "Internal portals, jobs, teams, billing, and delivery workflows built around how you actually run.",
    },
    {
      name: "StudioFlows IQ",
      role: "Operational intelligence",
      detail:
        "Routing, pattern recognition, and context that compounds as work moves through your business.",
    },
    {
      name: "Vessa",
      role: "Operator interface",
      detail:
        "Where operators see signals, move work, and approve action. Two lanes: action approval and deliverable review.",
    },
    {
      name: "Axiom",
      role: "Decision engine",
      detail: "The logic layer that structures how signals become scoped moves and execution paths.",
    },
  ],
  vessaSurfaces: [
    { name: "MosaIQ", detail: "Signal surface: orient before you act." },
    { name: "Workstream", detail: "Execution lane: see flow, intervene early." },
    { name: "Decide", detail: "Approval control: judgment where it matters." },
  ],
} as const;

export const FINAL_CTA = {
  heading: "Stop being the router for your own business.",
  subcopy:
    "See how execution infrastructure fits your operating model, or book a review of where work is leaking today.",
} as const;

export const FINAL_FOOTER = {
  tagline: "StudioFlows. Execution infrastructure for founder-led service businesses.",
  links: [
    { label: "Problem", href: "#problem" },
    { label: "System", href: "#system" },
    { label: "Intelligence", href: "#intelligence" },
    { label: "Operational review", href: "/apply" },
  ],
} as const;
