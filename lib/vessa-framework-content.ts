import { VESSA_SIGNUP_URL } from "@/lib/vessa-homepage-content";

/** Vessa landing framework copy — messaging & believability pass. */

export const VESSA_FRAMEWORK = {
  meta: {
    title: "Vessa — Business Intelligence Execution System",
    description:
      "Vessa turns business signals into prepared work, approvals, deliverables, and a record of what happened.",
  },

  nav: {
    cta: "Take Vessa for a Test Drive",
    ctaTarget: VESSA_SIGNUP_URL,
  },

  hero: {
    placeholder: false,
    eyebrow: "Vessa",
    headline: "The problem isn't knowing.",
    headlineMuted: "It's follow-through.",
    category: "A Business Intelligence Execution System",
    primaryCta: "Take Vessa for a Test Drive",
    primaryCtaTarget: VESSA_SIGNUP_URL,
    secondaryCta: "See How It Works",
    secondaryCtaTarget: "#differentiation",
    visualLabel: "Product preview",
  },

  founderMoments: {
    id: "founder-moments",
    placeholder: false,
    label: "Sound familiar?",
    scenarios: [
      {
        title: "The approval that never moved",
        body: "A client approves something. Nobody updates the project. Nobody notifies the team. The deadline slips. Three weeks later everyone is asking what happened.",
      },
      {
        title: "The scope change in email",
        body: "A client adds scope in a thread. Everyone sees it. Nobody turns it into a task, a billing note, or an owner. It resurfaces at delivery — as a surprise.",
      },
      {
        title: "The follow-up nobody owns",
        body: "A warm lead goes quiet after a positive reply. The CRM shows activity. No one is assigned to the next move. The deal ages out while the inbox keeps moving.",
      },
      {
        title: "The status request scramble",
        body: "A client asks for an update. Three people search email, Slack, and the project tool. Each gives a partial answer. The founder still has to reconstruct the truth.",
      },
      {
        title: "The meeting that didn't become work",
        body: "Action items get noted in a doc or a chat. No tasks created. No owners. No due dates. The same issues show up in the next meeting — unchanged.",
      },
    ],
  },

  executionGap: {
    id: "execution-gap",
    placeholder: false,
    eyebrow: "The problem",
    headline: "The execution gap",
    subhead:
      "Reports, dashboards, alerts, and messages show you what needs attention. They do not create the work, assign the owner, or record what got done.",
    before: {
      label: "Before",
      steps: ["Signal", "Notification", "Human bottleneck", "Maybe action"],
    },
    after: {
      label: "After",
      steps: [
        "Signal",
        "Vessa",
        "Execution-ready work",
        "Approval / delivery",
        "Recorded outcome",
      ],
    },
    closing:
      "Important things drop here — not because you missed the signal, but because follow-through still depends on someone remembering to drive it.",
  },

  category: {
    id: "category",
    placeholder: false,
    eyebrow: "The category",
    headline: "What is a Business Intelligence Execution System?",
    blocks: [
      {
        title: "Traditional BI",
        body: "Explains what happened. The next move is still on you.",
      },
      {
        title: "Workflow tools",
        body: "Hold tasks once someone creates them. They do not create work from the signal.",
      },
      {
        title: "Prompt-based assistants",
        body: "Respond when asked. You still decide what to do with the output.",
      },
      {
        title: "Vessa",
        body: "Turns signals into prepared work — with approval when it matters and a record of what happened.",
      },
    ],
  },

  differentiation: {
    id: "differentiation",
    placeholder: false,
    eyebrow: "Comparison",
    headline: "Different from most prompt-based tools",
    mostTools: {
      label: "Most prompt-based tools",
      items: [
        "Wait for you to ask",
        "Generate answers",
        "Need you to manage the output",
        "Add more to organize",
      ],
    },
    vessa: {
      label: "Vessa",
      items: [
        "Picks up operational signals",
        "Prepares work ready to act on",
        "Routes approval when consequence is real",
        "Hands back artifacts — not homework",
        "Records what happened",
      ],
    },
  },

  executionLoop: {
    id: "execution-loop",
    placeholder: false,
    eyebrow: "One loop",
    headline: "Walk through one execution loop",
    scenario: "A client request arrives by email — a change, update, or next step.",
    steps: [
      {
        num: "01",
        title: "Signal detected",
        body: "The request is picked up from email and matched to open work.",
      },
      {
        num: "02",
        title: "Context matched",
        body: "Client, project, and thread history surface in one place.",
      },
      {
        num: "03",
        title: "Execution item created",
        body: "A concrete item is prepared — owner, context, and next move included.",
      },
      {
        num: "04",
        title: "Response prepared",
        body: "A draft reply, action set, or deliverable is staged for review.",
      },
      {
        num: "05",
        title: "Approval routed",
        body: "If the move carries consequence, it hits your approval checkpoint.",
      },
      {
        num: "06",
        title: "Outcome recorded",
        body: "What was approved, sent, or completed is logged — so nobody has to reconstruct it later.",
      },
    ],
  },

  outputs: {
    id: "outputs",
    placeholder: false,
    eyebrow: "Tangible outputs",
    headline: "What lands on your desk",
    lead: "Not more to read. Items you can approve, send, assign, or reject — with context attached.",
    cards: [
      {
        title: "Execution item",
        hint: "Defined work tied to the signal — owner, context, and next move included.",
      },
      {
        title: "Approval request",
        hint: "A consequential move held for sign-off before anything runs.",
      },
      {
        title: "Drafted response",
        hint: "A reply prepared from thread and project context — ready for your edit or send.",
      },
      {
        title: "Deliverable review",
        hint: "Work product built and held for review before release.",
      },
      {
        title: "Follow-up task",
        hint: "The next move assigned with enough context that nobody rebuilds the thread.",
      },
      {
        title: "Decision record",
        hint: "What was decided, who approved it, and what happened after.",
      },
    ],
  },

  controlledAutonomy: {
    id: "controlled-autonomy",
    placeholder: false,
    eyebrow: "Accountability",
    headline: "You stay in control",
    lead: "Vessa prepares and routes work by consequence. Nothing consequential runs without a checkpoint you can see.",
    points: [
      "Your approval before consequential moves",
      "Review before anything ships",
      "Decisions stay traceable",
      "A clear record of what happened",
    ],
    lane1: {
      tag: "Lane 1",
      title: "Action approval",
      body: "Reassignments, sends, and task changes are staged for sign-off before they run.",
    },
    lane2: {
      tag: "Lane 2",
      title: "Deliverable review",
      body: "Work product is built and held for your review before it goes to a client or team.",
    },
  },

  stack: {
    id: "stack",
    placeholder: false,
    eyebrow: "Your stack",
    headline: "A layer across the tools you already run",
    lead: "Email, CRM, projects, and chat stay where they are. Vessa connects signal to prepared work between them.",
    inputs: ["Email", "CRM", "Project tools", "Documents", "Calendar", "Chat", "Forms"],
    vessaSteps: ["Detects", "Interprets", "Creates", "Routes", "Records"],
    outputs: ["Tasks", "Approvals", "Deliverables", "Follow-ups", "Execution history"],
  },

  useCases: {
    id: "use-cases",
    placeholder: false,
    eyebrow: "Use cases",
    headline: "Where this shows up in the week",
    cards: [
      {
        title: "Missed follow-up risk",
        signal: "A client email sits past the usual response window.",
        prepares: "Follow-up draft, owner, and due checkpoint.",
        decision: "Approve send, revise, or hold.",
        outcome: "Follow-up sent or escalated — logged either way.",
      },
      {
        title: "Client approval received",
        signal: "A client signs off in email.",
        prepares: "Next-step tasks, team notice, and project update.",
        decision: "Confirm the move set or adjust before it runs.",
        outcome: "Work moves without someone re-entering the thread.",
      },
      {
        title: "Proposal needs next step",
        signal: "A positive reply — then silence.",
        prepares: "Follow-up sequence, CRM update, and owner task.",
        decision: "Approve outreach or change approach.",
        outcome: "The deal keeps moving instead of aging in the inbox.",
      },
      {
        title: "Deliverable ready for review",
        signal: "A milestone approaches with no package ready.",
        prepares: "Delivery artifact from project context and threads.",
        decision: "Review, revise, or approve release.",
        outcome: "Deliverable ships with your sign-off on record.",
      },
    ],
  },

  futureModel: {
    id: "future-model",
    placeholder: false,
    eyebrow: "Operating model",
    headline: "How operating work should run",
    old: {
      label: "Today",
      lines: [
        "Founders chase signals across tools",
        "Context lives in threads and memory",
        "Work gets created by hand",
        "Follow-through depends on who remembers",
      ],
    },
    next: {
      label: "With Vessa",
      lines: [
        "Signals become prepared paths",
        "Work arrives with context attached",
        "You approve what carries consequence",
        "Direction stays with leadership",
      ],
    },
  },

  trust: {
    id: "trust",
    placeholder: false,
    eyebrow: "Transparency",
    headline: "See how it works before you trust a metric",
    lead: "No customer proof on this page yet. What we can show now: how the product works, what it prepares, and how approval is built in.",
    slots: [
      {
        title: "Founder story",
        note: "Built because follow-through kept breaking between signal and done — not because the business lacked dashboards.",
      },
      {
        title: "Product philosophy",
        note: "Prepare first. Approve when consequence is real. Record what happened. No black-box moves.",
      },
      {
        title: "Workstream surface",
        note: "Real product — where prepared work lands before approval or completion.",
        screen: "workstream",
      },
      {
        title: "Example execution loop",
        note: "Real product — ramp-up maps your stack before the first prepared item.",
        screen: "onboarding",
      },
      {
        title: "Approval checkpoint",
        note: "Real product — action approval before a consequential move runs.",
        screen: "decide",
      },
      {
        title: "Deliverable review",
        note: "Real product — review the artifact before release.",
        screen: "decide",
      },
    ],
  },

  finalCta: {
    id: "final-cta",
    placeholder: false,
    eyebrow: "Next step",
    headline: "Walk one loop on your stack.",
    body: "No pitch deck required. See what gets prepared, what needs your approval, and what gets recorded.",
    primaryCta: "Take Vessa for a Test Drive",
    primaryCtaTarget: VESSA_SIGNUP_URL,
    secondaryCta: "See a Sample Execution Loop",
    secondaryCtaTarget: "#execution-loop",
  },
} as const;

/** Review options — not all rendered; selected picks are live in VESSA_FRAMEWORK above. */
export const VESSA_COPY_STRATEGY = {
  heroOptions: [
    { headline: "The problem isn't knowing.", headlineMuted: "It's follow-through." },
    { headline: "You already know what matters.", headlineMuted: "Vessa closes the follow-through gap." },
    { headline: "The signal is rarely missing.", headlineMuted: "The completed work is." },
    { headline: "Your business generates enough signal.", headlineMuted: "Not enough gets finished." },
    { headline: "Most leaks aren't information leaks.", headlineMuted: "They're follow-through leaks." },
    { headline: "You don't need more alerts.", headlineMuted: "You need more things to actually get done." },
    { headline: "The inbox shows the problem.", headlineMuted: "Nobody owns the next move." },
    { headline: "Important work keeps surfacing.", headlineMuted: "It doesn't keep closing." },
    { headline: "You see what needs attention.", headlineMuted: "Making it happen is still manual." },
    { headline: "Knowing isn't the bottleneck.", headlineMuted: "Doing is." },
  ],
  outputTitleOptions: [
    "What lands on your desk",
    "What arrives ready for review",
    "What Vessa hands back",
    "What you get back — prepared",
    "Prepared work, not prompts",
    "Artifacts ready to act on",
    "What shows up with context attached",
    "What gets prepared for you",
    "Ready-to-run outputs",
    "What comes back from a signal",
    "The work product — not the summary",
    "Items you approve, send, or assign",
    "What moves from signal to something concrete",
    "Prepared outputs",
    "What you receive — not what you have to build",
  ],
} as const;
