export const REC_FIT_BUSINESSES = [
  {
    category: "Media and production",
    items: [
      {
        name: "Real estate photo and video",
        pain: "Shoot days slip when confirmations and crew coverage live in different threads.",
      },
      {
        name: "Creative studios",
        pain: "Producers chase status across Slack while jobs wait on founder approval.",
      },
      {
        name: "AV and event crews",
        pain: "Day-of changes stack up before anyone sees the full week at once.",
      },
    ],
  },
  {
    category: "Home and field service",
    items: [
      {
        name: "HVAC, plumbing, electrical",
        pain: "Unassigned visits surface after travel windows already tightened.",
      },
      {
        name: "Cleaning and landscaping",
        pain: "Route changes and no-shows get handled reactively, not from one queue.",
      },
      {
        name: "Inspections and audits",
        pain: "Technician coverage and client confirmations are hard to scan by day.",
      },
    ],
  },
  {
    category: "Mobile and appointment ops",
    items: [
      {
        name: "Med spa and aesthetics",
        pain: "Provider schedules and pending confirmations split across tools.",
      },
      {
        name: "Mobile clinics",
        pain: "Staff lanes and location context do not stay visible through the week.",
      },
      {
        name: "In-home care routing",
        pain: "Exceptions pile up before coordinators see who is actually uncovered.",
      },
    ],
  },
  {
    category: "Agency delivery",
    items: [
      {
        name: "Retainers with production coordinators",
        pain: "Client work is tracked, but dispatch and ownership still route through the founder.",
      },
      {
        name: "Implementation and onboarding teams",
        pain: "Handoffs between sales and delivery hide in threads until deadlines slip.",
      },
    ],
  },
  {
    category: "Property and facilities",
    items: [
      {
        name: "Staging and prep crews",
        pain: "Job status by property is scattered before the day starts.",
      },
      {
        name: "Property management inspections",
        pain: "Technician assignments and exceptions need one morning control surface.",
      },
      {
        name: "Maintenance dispatch",
        pain: "Open tickets and unassigned work are easy to miss until clients call.",
      },
    ],
  },
];

export const REC_FEATURES = [
  {
    id: "dashboard",
    label: "OPERATIONS DASHBOARD",
    image: "/case-studies/rec/operations-dashboard.png",
    before: "Confirmations, exceptions, and today's schedule lived in separate threads.",
    installed: "One operations dashboard with pending confirmations, dispatch, live schedule, and exception queue.",
    outcomes: [
      "Faster morning triage",
      "Clearer exception handling",
      "Less founder firefighting",
      "Production days locked earlier",
    ],
    scenarioTitle: "Monday 6:00 AM: lock the production day",
    scenarioSteps: [
      "Open pending confirmations and clear the queue before crews roll out.",
      "Check unassigned jobs against today's travel window.",
      "Work the exception panel until nothing critical is still open.",
    ],
    yourLabels: { job: "Visit", crew: "Technician", exception: "Escalation" },
  },
  {
    id: "calendar",
    label: "CALENDAR",
    image: "/case-studies/rec/calendar.png",
    before: "Job status and location context were hard to scan across the month.",
    installed: "Month view with status-coded jobs, quick add, and searchable production calendar.",
    outcomes: [
      "Faster scheduling decisions",
      "Cleaner status visibility",
      "Fewer double-book risks",
      "Better month-level planning",
    ],
    scenarioTitle: "Planning the month: see status and location in one pass",
    scenarioSteps: [
      "Scan confirmed vs pending work across the full month.",
      "Spot double-book risk before it becomes a day-of fire drill.",
      "Add or move jobs without leaving the calendar view.",
    ],
    yourLabels: { job: "Appointment", crew: "Provider", exception: "Hold" },
  },
  {
    id: "staff",
    label: "STAFF SCHEDULE",
    image: "/case-studies/rec/staff-schedule.png",
    before: "Crew coverage gaps surfaced late, often after travel windows tightened.",
    installed: "Live staffing matrix with unassigned lane, crew filters, and week-level job placement.",
    outcomes: [
      "Faster dispatch decisions",
      "Cleaner team assignments",
      "Reduced scheduling drift",
      "Founder time freed",
    ],
    scenarioTitle: "Wednesday dispatch: cover the gap before someone drives out",
    scenarioSteps: [
      "Filter to the crew member or role you need to fill.",
      "Pull unassigned work into the right day column.",
      "Confirm coverage without a separate spreadsheet thread.",
    ],
    yourLabels: { job: "Job", crew: "Crew", exception: "Coverage gap" },
  },
  {
    id: "workspace",
    label: "JOB WORKSPACE",
    image: "/case-studies/rec/job-workspace.png",
    before: "Rescheduling, weather checks, and assignment changes were fragmented and slow.",
    installed: "Side-panel job workspace with status actions, weather context, and teammate assignment.",
    outcomes: [
      "Faster job rerouting",
      "Fewer assignment misses",
      "Cleaner handoffs",
      "Less founder intervention",
    ],
    scenarioTitle: "On-site change: update the job without losing context",
    scenarioSteps: [
      "Open the job workspace from the schedule grid.",
      "Check weather and client details before you change status.",
      "Assign or remove crew in the same panel, then close and move on.",
    ],
    yourLabels: { job: "Work order", crew: "Field tech", exception: "Reroute" },
  },
];
