// ── CTA destinations ─────────────────────────────────────────────────────────
// Single source of truth for where every homepage CTA points. Swap these two
// values with the StudioFlows OS tenant redirect links so leads + appointments
// land inside the OS account:
//   OS_DIAGNOSTIC_URL  → the OS quiz funnel / booking flow (every "diagnostic" CTA)
//   VESSA_WAITLIST_URL → the OS Vessa invitation / waitlist flow
// Interim values keep the on-site routes working until the OS links are provided.
const OS_DIAGNOSTIC_URL = "/apply";
const VESSA_WAITLIST_URL = "/vessa";
// "Book a workflow review" — qualified applicants are routed to booking through
// the same fit-check funnel today, so this mirrors OS_DIAGNOSTIC_URL. Swap to a
// dedicated booking link if/when qualified routing splits off.
const WORKFLOW_REVIEW_URL = OS_DIAGNOSTIC_URL;

export const INITIATION_HOMEPAGE_CONTENT = {
  hero: {
    eyebrow: "Built for owners who run service businesses",
    headline: "Your business knows when you disappear.",
    supportingCopy: [
      "Jobs fall behind.",
      "Schedules get messy.",
      "Customers feel delays.",
      "Your team keeps asking you things the system should already know.",
      "It's not because your team is lazy.",
      "It's because the business still runs on people remembering to hold it together.",
    ],
    primaryCta: "See if StudioFlows is a fit",
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
      "A project starts slipping, and no one catches it in time.",
      "And the worst part? Most of your people are trying really hard.",
      "The problem isn't effort.",
      "Good people are stuck in a setup that can't hold the weight.",
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
      "Behind the scenes, the work was scattered.",
      "Client messages lived in one place.",
      "Project tracking lived somewhere else.",
      "The actual work lived in another tool.",
      "The details lived in people's heads.",
      "Everyone was busy.",
      "But being busy is not the same as being in control.",
      "One missed handoff became a late delivery.",
      "A late delivery became a tense client call.",
      "A tense call became a lost client.",
      "It wasn't that people didn't care.",
      "The system was not strong enough to keep good people from failing.",
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
    headline: "Most software tracks the work. It doesn't run the business.",
    body: [
      "Most owners already have tools. The work still slips through the cracks.",
      "The CRM has the customer.",
      "The calendar has the appointment.",
      "The inbox has the request.",
      "The spreadsheet has the job list.",
      "The group chat has the latest update.",
      "But the address is in a text. The change never reached the field. You're the only one who can connect it all.",
      "Another CRM will not fix broken handoffs.",
      "Another scheduling tool will not fix missing information.",
      "Most owners are not missing software. They are missing one place where the business actually runs.",
    ],
    requiredLine: "Tracking work is not the same as running it.",
  },
  studioFlowsReveal: {
    anchor: "system",
    headline: "StudioFlows becomes the operating system for the work.",
    body: [
      "It brings the moving parts of a service business into one connected system.",
      "Jobs and scheduling. Customers and teams. Field updates, files, payments, and customer portals.",
      "Visibility from the first request to the final invoice.",
      "Instead of work scattered across tools, spreadsheets, inboxes, texts, and memory —",
      "one place to run the business.",
    ],
  },
  fridayReportSimulation: {
    headline: "The difference shows up before the work slips.",
    intro: "Same job. Two versions of the night before.",
    // unaidedBeats stream one short line at a time as the tape advances.
    unaidedBeats: [
      "A job is set for the morning.",
      "The address is in one text.",
      "The note is somewhere else.",
      "Someone swapped off the job.",
      "Not everyone got the memo.",
      "Now the team is scrambling.",
    ],
    panicLine: "Again.",
    // systemBeats stream one short line at a time on the StudioFlows tape.
    systemBeats: [
      "One job. One source of truth.",
      "The schedule is visible.",
      "The crew is clear.",
      "Customer details are attached.",
      "Files and status live on the job.",
      "The owner sees it early.",
    ],
    systemResolve: [
      "You still run the business.",
      "Nothing hides in a text now.",
    ],
    closer: {
      lead: "The difference?",
      strike: "More software.",
      gold: "Less weight on you.",
    },
    scrubLabelUnaided: "the night before — unaided",
    scrubLabelSystem: "what StudioFlows keeps on the job",
    revealItems: [
      "One source of truth",
      "Schedule visible",
      "Crew assigned",
      "Customer details",
      "Files & status",
      "Owner sees it early",
    ],
  },
  // NOTE: 08 Compounding Memory, 09 Trust Architecture, and 10 Doctrine were
  // moved to lib/vessa-homepage-content.ts (FUTURE_VESSA_SECTION_DO_NOT_DELETE)
  // during the v1 OS repositioning. They sell the future intelligence layer and
  // are preserved there for reuse on /vessa or /studioflows-iq.

  // 08 / WHAT YOU GET — the concrete StudioFlows OS product surface.
  whatYouGet: {
    headline: "One system for the way service work actually moves.",
    intro: "StudioFlows OS gives owner-led service businesses one connected place to run the operation.",
    features: [
      { name: "Jobs & Work Orders", blurb: "Every job in one place, from request to done.", icon: "jobs" },
      { name: "Scheduling & Calendar", blurb: "See the whole week and what's coming.", icon: "calendar" },
      { name: "Customer & Company Records", blurb: "Every customer, contact, and history together.", icon: "records" },
      { name: "Team Assignments", blurb: "Who's on what, with no guessing.", icon: "team" },
      { name: "FieldFlow Mobile App", blurb: "The field updates the job in real time.", icon: "mobile" },
      { name: "Files & Deliverables", blurb: "Photos, docs, and proofs live on the job.", icon: "files" },
      { name: "Customer Portal", blurb: "Customers see status without calling you.", icon: "portal" },
      { name: "Payments & Invoices", blurb: "Bill and get paid from the same system.", icon: "payments" },
      { name: "Activity Timeline", blurb: "A clear record of what happened, and when.", icon: "timeline" },
      { name: "Operational Dashboard", blurb: "The whole operation, visible at once.", icon: "dashboard" },
    ],
    body: [
      "Your team doesn't need another place to check.",
      "They need one place where the work lives.",
    ],
    proofIntro: "Real StudioFlows OS, running a live service operation:",
    proof: [
      {
        src: "/product/dashboard.png",
        label: "Operations dashboard",
        caption: "Action center, today's schedule, exceptions, and business health in one view.",
      },
      {
        src: "/product/calendar.png",
        label: "Calendar",
        caption: "A month of jobs, color-coded from pending to complete.",
      },
      {
        src: "/product/staff-schedule.png",
        label: "Staff schedule",
        caption: "A live staffing matrix — who's working, and what's still unassigned.",
      },
      {
        src: "/product/job-workspace.png",
        label: "Job workspace",
        caption: "One job from booking to delivery: lifecycle, crew, status, and notes.",
      },
    ],
    experienceIntro: "And the customer side — booking to paid, in your brand:",
    experience: [
      {
        src: "/product/booking-cart.png",
        label: "Book",
        caption: "Customers pick a package and start checkout.",
      },
      {
        src: "/product/booking-pick-time.png",
        label: "Schedule",
        caption: "They choose a real, open time slot.",
      },
      {
        src: "/product/booking-checkout.png",
        label: "Pay",
        caption: "Secure payment, captured on confirmation.",
      },
    ],
  },

  // 08.5 / FOUNDING CUSTOMER PROGRAM — remove pricing uncertainty, keep the
  // consultative workflow-review sale. One guided offer, not a SaaS tier grid.
  foundingProgram: {
    availability: "Founding cohort · limited onboarding",
    headline: "Built for businesses that need operational clarity now.",
    body: [
      "We're onboarding a small number of founding customers.",
      "We don't hand you software and wish you luck.",
      "We configure StudioFlows around how your business actually runs.",
    ],
    programLabel: "Launch program",
    terms: [
      { label: "Setup", value: "$0" },
      { label: "First month", value: "$99" },
      { label: "Monthly after", value: "$199" },
    ],
    included: [
      "Founder-led onboarding",
      "StudioFlows OS included",
      "FieldFlow mobile app included",
      "White-label branding included",
    ],
    supporting: [
      "This is not a self-service trial.",
      "We map your workflow, set up the system, and help your team adopt it.",
    ],
    lockNote: "Founding customer pricing is locked in as long as your account stays active.",
    primaryCta: "See if StudioFlows is a fit",
    primaryCtaTarget: OS_DIAGNOSTIC_URL,
    secondaryCta: "Book a workflow review",
    secondaryCtaTarget: WORKFLOW_REVIEW_URL,
  },

  // 09 / BUILT FOR SERVICE LOOPS — ICP + lifecycle fit.
  serviceLoops: {
    headline: "Built for businesses where work moves from request to completion.",
    body: [
      "StudioFlows is strongest when your work repeats.",
      "Jobs, service calls, bookings, installs, inspections, shoots, projects.",
    ],
    lifecycleIntro: "The loop every service business runs:",
    lifecycle: ["Request", "Schedule", "Assign", "Execute", "Complete", "Follow up"],
    fitIntro: "Best fit:",
    fitExamples: [
      "Field service",
      "Home services",
      "Property services",
      "Real estate media",
      "Inspection services",
      "Specialty service teams",
    ],
    qualifier:
      "If your work repeats and the owner is still the safety net, StudioFlows is probably a fit.",
  },
  operationalDiagnostic: {
    anchor: "diagnostic",
    headline: "Find where your operations still depend on you.",
    body: [
      "Before StudioFlows recommends a path, it checks how your business actually runs.",
      "This quick check looks at:",
    ],
    bullets: [
      "how jobs or service calls enter the business",
      "where scheduling breaks down",
      "where handoffs fail",
      "where customer updates get stuck",
      "where the owner still has to remember everything",
      "whether StudioFlows OS is a fit now, or Vessa early access later",
    ],
    cta: "See if StudioFlows is a fit",
    ctaTarget: OS_DIAGNOSTIC_URL,
  },
  entryPaths: {
    headline: "One goal. Two ways to start.",
    body: [
      "Some businesses need an operating system now.",
      "Others aren't ready for the full OS but want early access to the intelligence layer as it opens.",
    ],
    card1: {
      tag: "Available now · StudioFlows OS",
      headline: "StudioFlows OS",
      subheadline: "Run your service business from one place.",
      body: [
        "One connected system instead of scattered tools, paper, and memory.",
        "Jobs, scheduling, customers, teams, files, and payments in one place.",
        "Right now, we help set it up with you.",
      ],
      bestFor:
        "Owner-led service businesses ready to clean up operations now.",
      cta: "Start the check",
      ctaTarget: OS_DIAGNOSTIC_URL,
    },
    card2: {
      tag: "Coming soon · Vessa",
      headline: "Vessa",
      subheadline: "AI operations assistance is opening later.",
      body: [
        "Vessa is the future intelligence layer for StudioFlows. It is not the main product today.",
        "Join the early-access list if you want updates as it opens.",
      ],
      bestFor:
        "Owners interested in future AI assistance, even if StudioFlows OS isn't the right fit today.",
      cta: "Ask for a Vessa invite",
      ctaTarget: VESSA_WAITLIST_URL,
    },
  },
  finalCta: {
    headline: "Your business shouldn't feel heavier every time it grows.",
    body: [
      "Built for owner-led service businesses.",
      "The kind that outgrew paper, spreadsheets, and needing the owner for everything.",
      "Not another tool to babysit.",
      "One operating system for the work.",
    ],
    primaryCta: "See if StudioFlows is a fit",
    primaryCtaTarget: OS_DIAGNOSTIC_URL,
    secondaryCta: "Ask for a Vessa invite",
    secondaryCtaTarget: VESSA_WAITLIST_URL,
  },
} as const;
