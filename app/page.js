"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const QUALIFIER_URL = "#diagnosis";
const QUALIFIED_AUDIT_URL = "/services/custom-ops-hub";
const WAITLIST_URL = "/vessa";

const QUIZ_QUESTIONS = [
  {
    id: "team-size",
    prompt: "Team size?",
    options: [
      { label: "1-4", score: 0 },
      { label: "5-9", score: 1 },
      { label: "10-14", score: 2 },
      { label: "15-24", score: 3 },
      { label: "25+", score: 3 },
    ],
  },
  {
    id: "founder-routes",
    prompt: "Does the founder still route most handoffs and approvals?",
    options: [
      { label: "No", score: 0 },
      { label: "Sometimes", score: 2 },
      { label: "Yes", score: 3 },
    ],
  },
  {
    id: "sales-disappear",
    prompt: "Do sales promises regularly disappear in delivery?",
    options: [
      { label: "No", score: 0 },
      { label: "Occasionally", score: 2 },
      { label: "Yes", score: 3 },
    ],
  },
  {
    id: "scheduling-manual",
    prompt: "Is scheduling/crew/freelancer work mostly manual?",
    options: [
      { label: "No", score: 0 },
      { label: "Partially", score: 2 },
      { label: "Yes", score: 3 },
    ],
  },
  {
    id: "week-off",
    prompt: "Can you take a full week off without things slipping?",
    options: [
      { label: "Yes", score: 0 },
      { label: "Not reliably", score: 2 },
      { label: "No", score: 3 },
    ],
  },
  {
    id: "work-lives",
    prompt: "Where does most work currently live?",
    options: [
      { label: "Structured workflows", score: 0 },
      { label: "Slack + PM tools", score: 2 },
      { label: "Founder’s head / ad hoc", score: 3 },
    ],
  },
];

const DRAG_SYMPTOMS = [
  {
    title: "Sales promises vanish in delivery",
    signal: "Sales closed fast, delivery slows down.",
    leak: "Delivery inherits ambiguity, delays, and margin erosion.",
    outcome: "Rework climbs, client trust drops, and margin gets squeezed.",
    pressure: "Revenue Pressure: High",
  },
  {
    title: "Founder becomes the router",
    signal: "Approvals and escalations route through you all day.",
    leak: "Execution speed gets capped by your personal throughput.",
    outcome: "You become the bottleneck and the fallback system.",
    pressure: "Revenue Pressure: High",
  },
  {
    title: "Tools track work but do not move it",
    signal: "Dashboards show activity, but output stalls.",
    leak: "Critical work sits in Slack threads and email limbo.",
    outcome: "You have visibility, but no reliable velocity.",
    pressure: "Revenue Pressure: Medium",
  },
  {
    title: "Nobody owns the handoff",
    signal: "Ownership changes hands, but no one owns the handoff.",
    leak: "Deadlines slip, rework multiplies, and accountability gets blurry.",
    outcome: "Chaos hides in transitions and appears when clients are waiting.",
    pressure: "Revenue Pressure: Medium",
  },
];

const REC_FEATURES = [
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
  },
];

const VESSA_CARDS = [
  {
    title: "MosaIQ",
    body: "Connects to email, Slack, AI notetakers, and project tools to ingest signals, learn context, and qualify high-impact work.",
  },
  {
    title: "WorkStream",
    body: "Turns qualified work into live execution lanes and runs actions autonomously across your operating system.",
  },
  {
    title: "Decide",
    body: "Delivers completed execution output to you for final approval with strict approve/edit/reject governance.",
  },
];

const OPERATING_LAYER = [
  {
    title: "Control",
    body: "Clear ownership, enforced approvals, deterministic paths from decision to action.",
    before: "Everything funnels through you.",
    after: "Decisions move automatically with clear accountability.",
  },
  {
    title: "Execution",
    body: "Scheduling, job flow, and runbook logic that holds under real pressure.",
    before: "Heroic manual follow-up and constant context switching.",
    after: "Work moves itself. Deadlines hold without founder intervention.",
  },
  {
    title: "Visibility",
    body: "Live bottleneck exposure and accountability without dashboard theater.",
    before: "You learn it is broken after it is already on fire.",
    after: "You see blockers, ownership, and priority instantly.",
  },
];

const HERO_SIGNALS = [
  "Missed handoffs compound fast",
  "Approval bottlenecks kill throughput",
  "Context switching drains margin",
  "Founder dependency caps growth",
  "Ops drag is measurable",
];

const HERO_METRICS = [
  { label: "Revenue leakage", value: "20-40%" },
  { label: "Pre-qualifier time", value: "30 sec" },
  { label: "Audit conversion focus", value: "Operator-led" },
];

const SECTION_REVEAL = {
  initial: { opacity: 0, y: 28, filter: "blur(8px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

function getAssessment(score) {
  if (score >= 13) {
    return {
      title: "High Operational Drag",
      body: "You likely have margin leakage and founder bottlenecking in your core execution flow.",
      qualified: true,
    };
  }
  if (score >= 8) {
    return {
      title: "Moderate Operational Drag",
      body: "You have partial structure, but handoffs and ownership still leak execution.",
      qualified: true,
    };
  }
  return {
    title: "Low to Moderate Drag",
    body: "You may not need a full audit slot yet. We recommend waitlist and follow-up first.",
    qualified: false,
  };
}

function DiagnosisQuiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const isComplete = questionIndex >= QUIZ_QUESTIONS.length;
  const score = answers.reduce((sum, item) => sum + item.score, 0);
  const assessment = getAssessment(score);
  const currentQuestion = QUIZ_QUESTIONS[questionIndex];

  const selectAnswer = (option) => {
    const next = [...answers];
    next[questionIndex] = option;
    setAnswers(next);
    setQuestionIndex((prev) => prev + 1);
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="rounded-2xl bg-black/35 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.12)] sm:p-7"
      >
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#FACC15]">Pre-Qualifier Complete</p>
        <h3 className="mt-3 text-2xl font-bold">{assessment.title}</h3>
        <p className="mt-3 text-sm leading-7 text-white/80">{assessment.body}</p>
        <p className="mt-2 text-sm text-white/65">Ops Drag Snapshot: {score} / 18</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {assessment.qualified ? (
            <motion.div whileHover={{ y: -1.5 }} whileTap={{ scale: 0.99 }}>
              <Link
              href={QUALIFIED_AUDIT_URL}
              className="rounded-xl bg-[#FACC15] px-6 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition hover:brightness-105"
            >
              Book an OPS Drag Audit
            </Link>
            </motion.div>
          ) : (
            <motion.div whileHover={{ y: -1.5 }} whileTap={{ scale: 0.99 }}>
              <Link
              href={WAITLIST_URL}
              className="rounded-xl bg-[#FACC15] px-6 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition hover:brightness-105"
            >
              Join Vessa Waitlist
            </Link>
            </motion.div>
          )}
          <motion.button
            type="button"
            onClick={() => {
              setQuestionIndex(0);
              setAnswers([]);
            }}
            className="rounded-xl border border-white/30 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/[0.08]"
            whileHover={{ y: -1.5 }}
            whileTap={{ scale: 0.99 }}
          >
            Retake Pre-Qualifier
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="rounded-2xl bg-black/35 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.12)] sm:p-7">
      <div className="flex items-center justify-between text-xs text-white/65">
        <span>
          Question {questionIndex + 1} of {QUIZ_QUESTIONS.length}
        </span>
        <span>{Math.round((questionIndex / QUIZ_QUESTIONS.length) * 100)}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
        <motion.div
          className="h-1.5 rounded-full bg-[#FACC15]"
          animate={{ width: `${(questionIndex / QUIZ_QUESTIONS.length) * 100}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="mt-5 text-xl font-semibold leading-8">{currentQuestion.prompt}</h3>
          <div className="mt-4 space-y-2.5">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={option.label}
                type="button"
                onClick={() => selectAnswer(option)}
                className="w-full rounded-xl bg-black/45 px-4 py-3 text-left text-sm text-white/88 shadow-[0_0_0_1px_rgba(255,255,255,0.12)] transition hover:bg-white/[0.08]"
                whileHover={{ y: -2, scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * index, duration: 0.22 }}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="mt-5">
        <button
          type="button"
          disabled={questionIndex === 0}
          onClick={() => setQuestionIndex((prev) => Math.max(prev - 1, 0))}
          className="rounded-lg border border-white/25 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-white/75 disabled:opacity-45"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activeRecFeature, setActiveRecFeature] = useState(0);
  const [activeSymptom, setActiveSymptom] = useState(0);
  const [activeLayerCard, setActiveLayerCard] = useState(0);
  const [showTransform, setShowTransform] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [showMobileBar, setShowMobileBar] = useState(false);
  const [showDesktopDiagnosis, setShowDesktopDiagnosis] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      setShowMobileBar(y > 420);
      setShowDesktopDiagnosis(y > 420);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#0A0A0A] pb-24 text-white md:pb-16">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(99,102,241,0.2),transparent_26%),radial-gradient(circle_at_82%_0%,rgba(168,85,247,0.15),transparent_32%)]" />
      <motion.div
        className="pointer-events-none fixed -left-24 top-[18%] h-72 w-72 rounded-full bg-indigo-500/20 blur-[90px]"
        animate={{ x: [0, 24, -12, 0], y: [0, -18, 8, 0], opacity: [0.38, 0.55, 0.42, 0.38] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none fixed -right-24 top-[44%] h-80 w-80 rounded-full bg-purple-500/20 blur-[100px]"
        animate={{ x: [0, -30, 16, 0], y: [0, 20, -12, 0], opacity: [0.32, 0.5, 0.4, 0.32] }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <header
        className={`fixed inset-x-0 top-0 z-40 transition ${
          scrolled ? "border-b border-white/10 bg-[#0A0A0A]/88 backdrop-blur" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-5 py-3 sm:px-8 lg:px-10">
          <img src="/StudioFlows logo white (1200 x 675 px).png" alt="StudioFlows" className="h-10 w-auto object-contain sm:h-11" />
          <nav className="hidden items-center gap-6 text-sm text-white/82 md:flex">
            <a href="#diagnosis" className="transition hover:text-white">
              Start Pre-Qualifier
            </a>
            <a href="#diagnosis" className="transition hover:text-white">
              Watch Breakdown
            </a>
            <a href="#vessa" className="transition hover:text-white">
              See Products
            </a>
            <Link
              href={QUALIFIER_URL}
              className={`rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                scrolled
                  ? "bg-[#FACC15] text-black shadow-[0_10px_30px_rgba(250,204,21,0.35)] hover:brightness-105"
                  : "border border-white/25 text-white hover:bg-white/[0.08]"
              }`}
            >
              Book Audit
            </Link>
          </nav>
        </div>
      </header>

      {showDesktopDiagnosis && (
        <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
          <a
            href="#diagnosis"
            className="rounded-full bg-[#FACC15] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_10px_30px_rgba(250,204,21,0.35)] transition hover:brightness-105"
          >
            Start Pre-Qualifier
          </a>
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pt-20 sm:px-8 lg:px-10">
        <motion.section className="flex min-h-[92vh] flex-col justify-center py-10" {...SECTION_REVEAL}>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#FACC15]">STUDIOFLOWS</p>
          <h1 className="mt-6 max-w-[1080px] text-[clamp(2.5rem,8vw,6.4rem)] font-bold leading-[0.93] tracking-[-0.03em]">
            Growth didn&apos;t break your business.
            <br />
            <span className="bg-[linear-gradient(90deg,#FACC15,#C4B5FD,#7DD3FC)] bg-clip-text text-transparent">
              Operational drag did.
            </span>
          </h1>
          <p className="mt-7 max-w-[1080px] text-[clamp(1.05rem,2.1vw,1.7rem)] font-light leading-[1.38] text-white/84">
            Most founder-led teams bleed 20-40% of revenue through missed handoffs, approval bottlenecks, Slack chaos,
            and work that gets tracked but never moves.
            <br />
            Take this 30-second pre-qualifier and get a quick ops drag readout.
          </p>
          <motion.div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <motion.a
              href="#diagnosis"
              className="w-full rounded-xl bg-[#FACC15] px-5 py-3.5 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-black shadow-[0_12px_35px_rgba(250,204,21,0.35)] transition hover:brightness-105 sm:w-auto sm:px-7 sm:text-[11px] sm:tracking-[0.2em]"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
            >
              Start the 30-Second Pre-Qualifier
            </motion.a>
            <motion.a
              href="#diagnosis"
              className="w-full rounded-xl border border-white/35 px-5 py-3.5 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-white/[0.08] sm:w-auto sm:px-7 sm:text-[11px] sm:tracking-[0.2em]"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
            >
              Watch the Full Breakdown
            </motion.a>
          </motion.div>
          <p className="mt-5 max-w-[880px] text-sm text-white/68">
            Built for agencies, consultancies, service businesses, and B2B SaaS teams.
          </p>
          <motion.div
            className="mt-7 overflow-hidden rounded-xl bg-[linear-gradient(125deg,rgba(17,24,39,0.8),rgba(30,27,75,0.7))] p-3 shadow-[inset_0_0_0_1px_rgba(196,181,253,0.25)]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex w-max items-center gap-2"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              {[...HERO_SIGNALS, ...HERO_SIGNALS].map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="rounded-full bg-white/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-[#C7D2FE] shadow-[inset_0_0_0_1px_rgba(199,210,254,0.2)]"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {HERO_METRICS.map((item, index) => (
              <motion.div
                key={item.label}
                className="rounded-xl bg-[linear-gradient(145deg,rgba(8,12,24,0.88),rgba(17,24,39,0.72))] p-4 shadow-[0_14px_30px_rgba(0,0,0,0.45),inset_0_0_0_1px_rgba(125,211,252,0.18)]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.3 }}
                whileHover={{ y: -3, scale: 1.01 }}
              >
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/62">{item.label}</p>
                <p className="mt-1 text-lg font-semibold text-[#E0E7FF]">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section id="diagnosis" className="pt-32 sm:pt-36 lg:pt-40" {...SECTION_REVEAL}>
          <h2 className="max-w-[980px] text-left text-[clamp(2rem,4vw,4rem)] font-bold leading-tight tracking-[-0.02em]">
            The 30-Second Pre-Qualifier: Do You Have Operational Drag?
          </h2>
          <p className="mt-4 max-w-[980px] text-left text-lg leading-8 text-white/80">
            Six quick questions to show where execution is leaking and whether an audit makes sense.
          </p>
          <div className="mt-7">
            <DiagnosisQuiz />
          </div>
          <p className="mt-4 text-sm text-white/62">
            Answer honestly. If it looks like a fit, you can book an audit.
          </p>
        </motion.section>

        <motion.section className="pt-32 sm:pt-36 lg:pt-40" {...SECTION_REVEAL}>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#C4B5FD]">Revenue Leakage Signals</p>
          <h2 className="text-left text-[clamp(2rem,4vw,4rem)] font-bold leading-tight tracking-[-0.02em]">
            Operational drag is expensive.
            <br />
            <span className="text-[#DDD6FE]">It shows up fast, and it hurts.</span>
          </h2>
          <p className="mt-4 max-w-[900px] text-left text-lg leading-8 text-white/82">
            Every week you tolerate these, you&apos;re leaking revenue, time, and sanity.
          </p>
          <p className="mt-1 text-sm font-medium text-[#C4B5FD]/90">Tap each signal to see where the leak compounds.</p>
          <div className="mt-7 rounded-[26px] bg-[linear-gradient(150deg,rgba(20,18,42,0.9),rgba(7,12,24,0.95),rgba(14,11,33,0.92))] p-4 shadow-[0_24px_70px_rgba(8,8,20,0.7),inset_0_0_0_1px_rgba(196,181,253,0.2)] sm:p-6">
            <div className="grid gap-2 sm:grid-cols-2">
              {DRAG_SYMPTOMS.map((item, index) => {
                const isActive = activeSymptom === index;
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveSymptom(index)}
                    onMouseEnter={() => setActiveSymptom(index)}
                    className={`rounded-xl px-4 py-3 text-left transition ${
                      isActive
                        ? "bg-[linear-gradient(125deg,rgba(99,102,241,0.35),rgba(168,85,247,0.32))] shadow-[0_0_0_1px_rgba(196,181,253,0.58),0_14px_30px_rgba(79,70,229,0.25)]"
                        : "bg-black/25 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] hover:bg-white/[0.05]"
                    }`}
                  >
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#C4B5FD]/88">Signal {index + 1}</p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-white">{item.title}</p>
                  </button>
                );
              })}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={DRAG_SYMPTOMS[activeSymptom].title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.26, ease: "easeOut" }}
                className="mt-4 rounded-2xl bg-[linear-gradient(160deg,rgba(11,15,30,0.95),rgba(13,13,20,0.95))] p-5 shadow-[inset_0_0_0_1px_rgba(129,140,248,0.3)] sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#A5B4FC]">Live Signal Readout</p>
                  <span className="rounded-full bg-[#312E81]/55 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-[#C7D2FE]">
                    {DRAG_SYMPTOMS[activeSymptom].pressure}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">{DRAG_SYMPTOMS[activeSymptom].title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/78">{DRAG_SYMPTOMS[activeSymptom].signal}</p>
                <p className="mt-2 rounded-lg bg-[#0F172A]/58 px-3 py-2 text-sm leading-7 text-[#C7D2FE]">
                  Leak pattern: {DRAG_SYMPTOMS[activeSymptom].leak}
                </p>
                <p className="mt-2 text-sm leading-7 text-[#93C5FD]">Impact: {DRAG_SYMPTOMS[activeSymptom].outcome}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>

        <motion.section className="pt-32 sm:pt-36 lg:pt-40" {...SECTION_REVEAL}>
          <h2 className="max-w-[1000px] text-left text-[clamp(2rem,4vw,4rem)] font-bold leading-tight tracking-[-0.02em]">
            We install the operating layer your tools were supposed to give you.
          </h2>
          <p className="mt-4 max-w-[920px] text-left text-lg leading-8 text-white/82">
            From founder dependency and chaos to control, velocity, and peace of mind.
          </p>
          <motion.button
            type="button"
            onClick={() => setShowTransform((prev) => !prev)}
            className="mt-4 w-full rounded-full border border-white/25 px-4 py-2 text-center text-[10px] uppercase tracking-[0.12em] text-white/78 transition hover:bg-white/[0.08] sm:w-auto sm:text-[11px] sm:tracking-[0.18em]"
            whileHover={{ y: -1.5 }}
            whileTap={{ scale: 0.99 }}
          >
            {showTransform ? "Hide Before → After" : "Show Before → After Transformations"}
          </motion.button>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {OPERATING_LAYER.map((item, index) => (
              <motion.button
                key={item.title}
                type="button"
                onClick={() => setActiveLayerCard(index)}
                className={`group rounded-xl bg-black/35 p-5 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.1)] transition hover:-translate-y-[2px] hover:shadow-[0_0_0_1px_rgba(168,85,247,0.45),0_16px_32px_rgba(99,102,241,0.25)] ${
                  activeLayerCard === index ? "shadow-[0_0_0_1px_rgba(168,85,247,0.55),0_18px_34px_rgba(99,102,241,0.28)]" : ""
                }`}
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.995 }}
              >
                <p className="text-2xl">✦</p>
                <p className="mt-3 text-lg font-semibold">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-white/75">{item.body}</p>
                {showTransform && (
                  <div className="mt-4 space-y-2 rounded-lg bg-black/35 p-3 text-xs text-white/78">
                    <p>
                      <span className="font-semibold text-rose-200">Before:</span> {item.before}
                    </p>
                    <p>
                      <span className="font-semibold text-emerald-200">After:</span> {item.after}
                    </p>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.section>

        <motion.section className="pt-32 sm:pt-36 lg:pt-40" {...SECTION_REVEAL}>
          <div className="rounded-[30px] bg-[linear-gradient(160deg,rgba(99,102,241,0.18),rgba(168,85,247,0.08),rgba(10,10,10,0.92))] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.55)] sm:p-8">
            <h2 className="text-left text-[clamp(1.9rem,3.8vw,3.4rem)] font-bold leading-tight">
              Real Build Spotlight: REC Ops Control Surface
            </h2>
            <p className="mt-3 text-left text-base leading-7 text-white/78">
              Custom production ops system built for a real estate media studio.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-2 sm:flex sm:gap-2 sm:overflow-x-auto">
              {REC_FEATURES.map((item, index) => {
                const active = activeRecFeature === index;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveRecFeature(index)}
                    className={`w-full rounded-lg px-4 py-2 text-center text-[10px] uppercase tracking-[0.12em] transition sm:w-auto sm:whitespace-nowrap sm:text-xs sm:tracking-[0.16em] ${
                      active
                        ? "bg-[#FACC15] text-black"
                        : "bg-black/35 text-white/75 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
                    }`}
                    whileHover={{ y: -1.5 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={REC_FEATURES[activeRecFeature].id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                  className="rounded-2xl bg-black/45 p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
                >
                  <img src={REC_FEATURES[activeRecFeature].image} alt={REC_FEATURES[activeRecFeature].label} className="w-full rounded-xl object-cover" />
                </motion.div>
              </AnimatePresence>
              <div className="space-y-3">
                <div className="rounded-xl bg-black/40 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#FACC15]">BEFORE</p>
                  <p className="mt-2 text-sm leading-6 text-white/76">{REC_FEATURES[activeRecFeature].before}</p>
                </div>
                <div className="rounded-xl bg-black/40 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#FACC15]">INSTALLED</p>
                  <p className="mt-2 text-sm leading-6 text-white/76">{REC_FEATURES[activeRecFeature].installed}</p>
                </div>
                <div className="rounded-xl bg-black/40 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#FACC15]">OUTCOME</p>
                  <ul className="mt-2 space-y-1">
                    {REC_FEATURES[activeRecFeature].outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2 text-sm text-white/76">
                        <span className="mt-[2px] text-emerald-400">✓</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section id="vessa" className="pt-32 sm:pt-36 lg:pt-40" {...SECTION_REVEAL}>
          <h2 className="text-left text-[clamp(1.9rem,3.8vw,3.2rem)] font-bold leading-tight">
            Vessa Suite: Launching Late Spring 2026
          </h2>
          <p className="mt-3 max-w-[1000px] text-base leading-7 text-white/78">
            Vessa is an AI execution layer for operators. Connect email, Slack, AI notetakers, and your PM stack.
            Vessa pulls in signal, flags high-impact work, executes what it can, then sends you the final decision.
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {VESSA_CARDS.map((item) => (
              <motion.div
                key={item.title}
                className="rounded-xl bg-black/35 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-white/75">{item.body}</p>
              </motion.div>
            ))}
          </div>
          <motion.div className="mt-6" whileHover={{ y: -1.5 }} whileTap={{ scale: 0.99 }}>
            <Link
              href="/vessa"
              className="inline-flex rounded-xl bg-[#FACC15] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition hover:brightness-105"
            >
              See Vessa
            </Link>
          </motion.div>
        </motion.section>

        <motion.section className="pt-32 sm:pt-36 lg:pt-40" {...SECTION_REVEAL}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-black/35 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.12),inset_2px_0_0_rgba(74,222,128,0.45)]">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#FACC15]">GOOD FIT</p>
              <p className="mt-3 text-sm leading-7 text-white/78">
                Founder-led teams with recurring bottlenecks and high-value workflows that need tighter control.
              </p>
            </div>
            <div className="rounded-xl bg-black/35 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.12),inset_2px_0_0_rgba(251,113,133,0.45)]">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#FACC15]">NOT A FIT</p>
              <p className="mt-3 text-sm leading-7 text-white/78">
                Teams wanting quick hacks, one-off automations, or advisory without implementation ownership.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section className="pb-12 pt-32 sm:pt-36 lg:pt-40" {...SECTION_REVEAL}>
          <div className="rounded-[30px] bg-[linear-gradient(145deg,rgba(250,204,21,0.18),rgba(16,16,18,0.92))] p-6 shadow-[0_32px_90px_rgba(0,0,0,0.55)] sm:p-10">
            <h2 className="max-w-[920px] text-left text-[clamp(2rem,4.4vw,4rem)] font-bold leading-tight tracking-[-0.02em]">
              Stop being the operating system of your business.
            </h2>
            <p className="mt-4 max-w-[980px] text-base leading-8 text-white/82">
              If execution still depends on you translating, routing, approving, and remembering everything, your
              business is not scaling. It is borrowing your nervous system.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <motion.div whileHover={{ y: -1.5 }} whileTap={{ scale: 0.99 }}>
                <Link
                href={QUALIFIER_URL}
                className="block w-full rounded-xl bg-[#FACC15] px-5 py-3.5 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-black transition hover:brightness-105 sm:w-auto sm:px-7 sm:text-[11px] sm:tracking-[0.2em]"
              >
                Book an OPS Drag Audit
              </Link>
              </motion.div>
              <motion.div whileHover={{ y: -1.5 }} whileTap={{ scale: 0.99 }}>
                <Link
                href={WAITLIST_URL}
                className="block w-full rounded-xl border border-white/35 px-5 py-3.5 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-white/[0.08] sm:w-auto sm:px-7 sm:text-[11px] sm:tracking-[0.2em]"
              >
                Join Vessa Waitlist
              </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>

      {showMobileBar && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#111115]/95 p-3 backdrop-blur lg:hidden">
          <a
            href="#diagnosis"
            className="block w-full rounded-lg bg-[#FACC15] px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-black sm:text-[11px] sm:tracking-[0.2em]"
          >
            Start the 30-Second Pre-Qualifier
          </a>
        </div>
      )}
    </main>
  );
}
