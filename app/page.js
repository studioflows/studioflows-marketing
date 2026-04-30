"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../lib/supabase";

const OFFERING_POINTS = [
  "Deterministic workflows",
  "Enforced validation",
  "No silent failure",
  "Full traceability",
];

const FLOW_STEPS = [
  "Intent",
  "Structured Plan",
  "Validation",
  "Execution",
  "Evidence",
  "Verified Outcome",
];

const SYSTEMS = [
  {
    name: "Client Systems",
    role: "Deployed",
    title: "Built for controlled execution.",
    body: "Production systems designed to hold under pressure.",
    href: "/products/vessa",
  },
  {
    name: "Internal Systems",
    role: "Operated",
    title: "Run continuously in the wild.",
    body: "Used daily to validate structure, reliability, and control.",
  },
  {
    name: "Execution Layer",
    role: "Coordinated",
    title: "Intent becomes action.",
    body: "Decisions are enforced through deterministic flow.",
  },
  {
    name: "Validation Layer",
    role: "Enforced",
    title: "No silent failure paths.",
    body: "Each step is verified before the next one can move.",
  },
  {
    name: "Evidence Layer",
    role: "Traceable",
    title: "Outcomes are attributable.",
    body: "What happened, why, and by whom remains visible.",
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const COMPANY_SIZE_OPTIONS = ["1-10", "11-50", "51-200", "201-500", "500+"];
const REVENUE_BAND_OPTIONS = ["Pre-revenue", "$0-1M", "$1M-10M", "$10M-50M", "$50M+"];
const BUDGET_BAND_OPTIONS = ["<$25k", "$25k-75k", "$75k-150k", "$150k-300k", "$300k+"];
const URGENCY_OPTIONS = ["Now (0-30 days)", "Near term (1-3 months)", "This year (3-12 months)"];
const COMPLIANCE_OPTIONS = ["SOC 2", "HIPAA", "GDPR", "PCI", "FINRA/SEC", "Internal policy only"];

const INITIAL_ACCESS_FORM = {
  fullName: "",
  workEmail: "",
  roleTitle: "",
  companyName: "",
  companyWebsite: "",
  industry: "",
  companySizeBand: "",
  annualRevenueBand: "",
  implementationBudgetBand: "",
  urgencyWindow: "",
  decisionAuthority: "",
  primaryUseCase: "",
  currentSystems: "",
  criticalBreakdown: "",
  complianceScope: [],
  notes: "",
};

function SectionBlock({ id, tone = "default", children }) {
  const toneClass =
    tone === "offset"
      ? "bg-[#2E2E2E]/70 border-[#BC9A2D]/35"
      : "bg-white/[0.02] border-white/10";

  return (
    <motion.section id={id} {...fadeIn} className={`rounded-[28px] border p-7 sm:p-10 lg:p-12 ${toneClass}`}>
      {children}
    </motion.section>
  );
}

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [accessForm, setAccessForm] = useState(INITIAL_ACCESS_FORM);

  const openDrawer = () => {
    setSubmitState("idle");
    setSubmitMessage("");
    setIsDrawerOpen(true);
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setAccessForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCompliance = (value) => {
    setAccessForm((prev) => {
      const alreadySelected = prev.complianceScope.includes(value);
      return {
        ...prev,
        complianceScope: alreadySelected
          ? prev.complianceScope.filter((item) => item !== value)
          : [...prev.complianceScope, value],
      };
    });
  };

  const handleAccessSubmit = async (event) => {
    event.preventDefault();
    setSubmitState("idle");
    setSubmitMessage("");

    const requiredFields = [
      ["fullName", "Full name"],
      ["workEmail", "Work email"],
      ["roleTitle", "Role title"],
      ["companyName", "Company name"],
      ["industry", "Industry"],
      ["companySizeBand", "Company size"],
      ["implementationBudgetBand", "Implementation budget"],
      ["urgencyWindow", "Urgency window"],
      ["decisionAuthority", "Decision authority"],
      ["primaryUseCase", "Primary use case"],
      ["criticalBreakdown", "Current execution breakdown"],
    ];

    const missingField = requiredFields.find(([field]) => !accessForm[field].trim());
    if (missingField) {
      setSubmitState("error");
      setSubmitMessage(`${missingField[1]} is required.`);
      return;
    }

    if (!supabase) {
      setSubmitState("error");
      setSubmitMessage("Submission is unavailable. Supabase environment variables are missing.");
      return;
    }

    setIsSubmitting(true);
    const payload = {
      full_name: accessForm.fullName.trim(),
      work_email: accessForm.workEmail.trim().toLowerCase(),
      role_title: accessForm.roleTitle.trim(),
      company_name: accessForm.companyName.trim(),
      company_website: accessForm.companyWebsite.trim() || null,
      industry: accessForm.industry.trim(),
      company_size_band: accessForm.companySizeBand,
      annual_revenue_band: accessForm.annualRevenueBand || null,
      implementation_budget_band: accessForm.implementationBudgetBand,
      urgency_window: accessForm.urgencyWindow,
      decision_authority: accessForm.decisionAuthority.trim(),
      primary_use_case: accessForm.primaryUseCase.trim(),
      current_systems: accessForm.currentSystems.trim() || null,
      critical_breakdown: accessForm.criticalBreakdown.trim(),
      compliance_scope: accessForm.complianceScope,
      notes: accessForm.notes.trim() || null,
      source_page: "home",
      metadata: {
        path: typeof window !== "undefined" ? window.location.pathname : "/",
      },
    };

    const { error } = await supabase.from("access_interest_leads").insert([payload]);
    setIsSubmitting(false);

    if (error) {
      setSubmitState("error");
      setSubmitMessage(error.message || "Unable to submit interest at this time.");
      return;
    }

    setSubmitState("success");
    setSubmitMessage("Access request submitted. Our team will pre-vet and follow up.");
    setAccessForm(INITIAL_ACCESS_FORM);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#272727] text-[#F7F7F7]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(188,154,45,0.18),transparent_28%),radial-gradient(circle_at_20%_35%,rgba(188,154,45,0.08),transparent_32%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-8 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between py-4 sm:py-5">
          <img
            src="/StudioFlows logo white (1200 x 675 px).png"
            alt="StudioFlows"
            className="h-12 w-auto object-contain opacity-90 sm:h-14"
          />
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-1.5 py-1.5 md:flex">
            {[
              ["StudioFlows", "/"],
              ["Axiom", "/axiom"],
              ["Products", "/products"],
              ["Enterprise", "/enterprise"],
              ["Apply", "/apply"],
              ["Vessa", "/vessa"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-white/75 transition hover:bg-white/[0.07] hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>

        <section className="py-14 text-center lg:py-20">
          <motion.div {...fadeIn} className="mx-auto max-w-[920px]">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#D7C48A]">StudioFlows</p>
            <h1 className="mt-6 text-balance text-[2.4rem] font-semibold leading-[0.96] tracking-[-0.03em] sm:text-[3.1rem] lg:text-[5.8rem]">
              Most companies don&apos;t have a growth problem.
              <br />
              <span className="text-white/58">They have a control problem.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-[760px] text-balance text-[1.05rem] leading-7 text-white/75 sm:text-[1.15rem]">
              StudioFlows builds controlled AI execution systems for companies that can&apos;t afford to drift.
            </p>
            <p className="mt-4 text-[12px] uppercase tracking-[0.24em] text-[#D7C48A]/85">
              Legal. Finance. Healthcare. High-stakes SaaS.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={openDrawer}
                className="rounded-xl bg-[#BC9A2D] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-black transition hover:brightness-105"
              >
                Apply for Access
              </button>
              <Link
                href="#how-it-works"
                className="rounded-xl border border-white/20 bg-transparent px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-white/85 transition hover:bg-white/[0.04]"
              >
                Explore the System
              </Link>
            </div>
          </motion.div>
        </section>

        <div className="space-y-10 pb-16">
          <SectionBlock>
            <div className="max-w-[780px] space-y-5">
              <p className="text-2xl font-semibold tracking-tight text-white">You&apos;ve been told to:</p>
              <p className="text-lg text-white/72">automate more</p>
              <p className="text-lg text-white/72">move faster</p>
              <p className="text-lg text-white/72">leverage AI</p>
              <p className="pt-2 text-base text-white/75">But here&apos;s what actually happens:</p>
              <p className="text-white/62">Decisions don&apos;t translate into execution</p>
              <p className="text-white/62">Systems drift out of alignment</p>
              <p className="text-white/62">Teams operate on outdated context</p>
              <p className="text-white/62">Automation multiplies chaos</p>
              <p className="pt-2 text-xl font-medium text-[#F1E2B6]">Until it&apos;s expensive.</p>
            </div>
          </SectionBlock>

          <SectionBlock>
            <p className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              This isn&apos;t a tooling problem.
              <br />
              <span className="text-white/58">It&apos;s a control problem.</span>
            </p>
            <p className="mt-6 max-w-[900px] text-base leading-7 text-white/68 sm:text-lg">
              Most software helps you do more. Almost none of it guarantees: what you intend is what actually happens.
            </p>
          </SectionBlock>

          <SectionBlock>
            <div className="grid gap-6 lg:grid-cols-3">
              <p className="text-2xl font-semibold text-white">Speed without control is fragile.</p>
              <p className="text-2xl font-semibold text-white">Control without speed is slow.</p>
              <p className="text-2xl font-semibold text-[#F1E2B6]">We build systems that do both.</p>
            </div>
          </SectionBlock>

          <SectionBlock id="how-it-works">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#D7C48A]">What StudioFlows Does</p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                  We design and deploy controlled execution infrastructure.
                </h2>
              </div>
              <div className="space-y-3">
                {OFFERING_POINTS.map((point) => (
                  <div key={point} className="rounded-2xl border border-white/12 bg-black/20 px-4 py-3 text-sm text-white/78">
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </SectionBlock>

          <SectionBlock tone="offset">
            <div className="mx-auto max-w-[880px] text-center">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#D7C48A]">Axiom</p>
              <p className="mt-6 text-lg leading-8 text-white/75">There&apos;s a layer behind everything we build.</p>
              <p className="mt-3 text-white/72">You won&apos;t see it.</p>
              <p className="text-white/72">You won&apos;t configure it.</p>
              <p className="text-white/72">But it&apos;s always there.</p>
              <p className="mt-8 text-4xl font-semibold tracking-tight text-[#F1E2B6]">Axiom</p>
              <div className="mt-8 space-y-2 text-white/72">
                <p>no drift</p>
                <p>no silent failure</p>
                <p>no system breakdown</p>
              </div>
            </div>
          </SectionBlock>

          <SectionBlock>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#D7C48A]">Enterprise Offering</p>
            <h2 className="mt-4 max-w-[900px] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              We partner with SaaS companies to build production-grade AI capabilities.
            </h2>
            <p className="mt-8 text-base text-white/60">This is not adding AI.</p>
            <p className="mt-2 text-2xl font-semibold text-[#F1E2B6]">This is building a production line for intelligence.</p>
          </SectionBlock>

          <SectionBlock>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#D7C48A]">Products Bridge</p>
            <p className="mt-4 text-lg text-white/76">We don&apos;t just build systems for clients.</p>
            <p className="mt-2 text-lg text-[#F1E2B6]">We build them for ourselves and deploy them in the wild.</p>
          </SectionBlock>

          <SectionBlock>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#D7C48A]">Operational Systems</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Controlled systems.
              <br />
              <span className="text-white/58">Deployed with discipline.</span>
            </h3>
            <p className="mt-6 max-w-[900px] text-base leading-7 text-white/72 sm:text-lg">
              StudioFlows systems are designed to preserve control as complexity scales.
            </p>
            <p className="mt-8 text-[11px] uppercase tracking-[0.24em] text-[#D7C48A]">System Properties</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {SYSTEMS.map((system) => {
                const CardTag = system.href ? Link : "div";
                return (
                  <CardTag
                    key={system.name}
                    href={system.href || undefined}
                    className="rounded-2xl border border-white/12 bg-black/20 p-4 transition hover:border-[#BC9A2D]/45 hover:bg-[#BC9A2D]/[0.06]"
                  >
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/44">
                      {system.name} — {system.role}
                    </p>
                    <p className="mt-3 text-lg font-semibold tracking-tight text-white">{system.title}</p>
                    <p className="mt-2 text-sm leading-6 text-white/68">{system.body}</p>
                  </CardTag>
                );
              })}
            </div>
            <p className="mt-7 text-base text-white/72">System-first execution. Control-first outcomes.</p>
          </SectionBlock>

          <SectionBlock>
            <p className="text-2xl font-semibold tracking-tight text-white">We don&apos;t ship experiments.</p>
            <p className="mt-5 text-white/72">We ship systems that hold under pressure, scale without breaking, and produce predictable outcomes.</p>
            <p className="mt-5 text-[#F1E2B6]">That&apos;s the difference.</p>
          </SectionBlock>

          <SectionBlock>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#D7C48A]">Private Engagements</p>
            <p className="mt-4 max-w-[900px] text-xl leading-8 text-white/78">
              We work with a small number of companies directly. This is not advisory.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {["system architecture", "full implementation", "deep integration"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/12 bg-black/20 px-4 py-3 text-sm uppercase tracking-[0.16em] text-white/76">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-7 text-base text-[#F1E2B6]">We don&apos;t give recommendations. We build the machine.</p>
          </SectionBlock>

          <SectionBlock>
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">If you&apos;re looking for:</p>
                <div className="mt-4 space-y-2 text-white/68">
                  <p>quick automation hacks</p>
                  <p>generic AI integrations</p>
                  <p>surface-level improvements</p>
                </div>
                <p className="mt-5 text-white/78">This isn&apos;t for you.</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">If you need:</p>
                <div className="mt-4 space-y-2 text-[#F1E2B6]">
                  <p>precision</p>
                  <p>control</p>
                  <p>systems that actually hold</p>
                </div>
                <p className="mt-5 text-white/92">Then we should talk.</p>
              </div>
            </div>
          </SectionBlock>

          <SectionBlock>
            <p className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Most companies move fast.
              <br />
              <span className="text-white/60">Very few stay aligned.</span>
              <br />
              <span className="text-white/60">Almost none maintain control as they scale.</span>
            </p>
            <p className="mt-6 text-[#F1E2B6]">We solve that.</p>
          </SectionBlock>

          <SectionBlock>
            <div className="text-center">
              <button
                type="button"
                onClick={openDrawer}
                className="inline-flex rounded-xl bg-[#BC9A2D] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-black transition hover:brightness-105"
              >
                Apply for Access
              </button>
              <p className="mt-4 text-sm text-white/60">We review every request.</p>
            </div>
          </SectionBlock>
        </div>
      </div>

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]"
              aria-label="Close access drawer"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-[680px] overflow-y-auto border-l border-white/10 bg-[#1F1F1F] p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#D7C48A]">Access Qualification</p>
                  <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white">
                    Tell us about your business.
                  </h2>
                  <p className="mt-3 max-w-[520px] text-sm leading-7 text-white/68">
                    We use this intake to pre-vet fit, urgency, implementation readiness, and compliance constraints.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="rounded-lg border border-white/15 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/72 transition hover:bg-white/[0.05]"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleAccessSubmit} className="mt-8 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-white/46">Full Name *</span>
                    <input name="fullName" value={accessForm.fullName} onChange={handleFieldChange} className="w-full rounded-xl border border-white/12 bg-black/25 px-3 py-2.5 text-sm text-white outline-none focus:border-[#BC9A2D]/55" />
                  </label>
                  <label className="space-y-2">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-white/46">Work Email *</span>
                    <input name="workEmail" type="email" value={accessForm.workEmail} onChange={handleFieldChange} className="w-full rounded-xl border border-white/12 bg-black/25 px-3 py-2.5 text-sm text-white outline-none focus:border-[#BC9A2D]/55" />
                  </label>
                  <label className="space-y-2">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-white/46">Role Title *</span>
                    <input name="roleTitle" value={accessForm.roleTitle} onChange={handleFieldChange} className="w-full rounded-xl border border-white/12 bg-black/25 px-3 py-2.5 text-sm text-white outline-none focus:border-[#BC9A2D]/55" />
                  </label>
                  <label className="space-y-2">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-white/46">Decision Authority *</span>
                    <input name="decisionAuthority" value={accessForm.decisionAuthority} onChange={handleFieldChange} placeholder="Final decision maker, recommender, or evaluator" className="w-full rounded-xl border border-white/12 bg-black/25 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#BC9A2D]/55" />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-white/46">Company Name *</span>
                    <input name="companyName" value={accessForm.companyName} onChange={handleFieldChange} className="w-full rounded-xl border border-white/12 bg-black/25 px-3 py-2.5 text-sm text-white outline-none focus:border-[#BC9A2D]/55" />
                  </label>
                  <label className="space-y-2">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-white/46">Company Website</span>
                    <input name="companyWebsite" value={accessForm.companyWebsite} onChange={handleFieldChange} placeholder="https://example.com" className="w-full rounded-xl border border-white/12 bg-black/25 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#BC9A2D]/55" />
                  </label>
                  <label className="space-y-2">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-white/46">Industry *</span>
                    <input name="industry" value={accessForm.industry} onChange={handleFieldChange} placeholder="Fintech, Healthtech, Legal SaaS..." className="w-full rounded-xl border border-white/12 bg-black/25 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#BC9A2D]/55" />
                  </label>
                  <label className="space-y-2">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-white/46">Company Size *</span>
                    <select name="companySizeBand" value={accessForm.companySizeBand} onChange={handleFieldChange} className="w-full rounded-xl border border-white/12 bg-black/25 px-3 py-2.5 text-sm text-white outline-none focus:border-[#BC9A2D]/55">
                      <option value="">Select</option>
                      {COMPANY_SIZE_OPTIONS.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                  <label className="space-y-2">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-white/46">Annual Revenue</span>
                    <select name="annualRevenueBand" value={accessForm.annualRevenueBand} onChange={handleFieldChange} className="w-full rounded-xl border border-white/12 bg-black/25 px-3 py-2.5 text-sm text-white outline-none focus:border-[#BC9A2D]/55">
                      <option value="">Select</option>
                      {REVENUE_BAND_OPTIONS.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                  <label className="space-y-2">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-white/46">Implementation Budget *</span>
                    <select name="implementationBudgetBand" value={accessForm.implementationBudgetBand} onChange={handleFieldChange} className="w-full rounded-xl border border-white/12 bg-black/25 px-3 py-2.5 text-sm text-white outline-none focus:border-[#BC9A2D]/55">
                      <option value="">Select</option>
                      {BUDGET_BAND_OPTIONS.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/46">Urgency Window *</span>
                  <select name="urgencyWindow" value={accessForm.urgencyWindow} onChange={handleFieldChange} className="w-full rounded-xl border border-white/12 bg-black/25 px-3 py-2.5 text-sm text-white outline-none focus:border-[#BC9A2D]/55">
                    <option value="">Select</option>
                    {URGENCY_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/46">Compliance Scope</span>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {COMPLIANCE_OPTIONS.map((item) => {
                      const active = accessForm.complianceScope.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleCompliance(item)}
                          className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                            active
                              ? "border-[#BC9A2D]/55 bg-[#BC9A2D]/12 text-[#F1E2B6]"
                              : "border-white/12 bg-black/20 text-white/72 hover:bg-white/[0.04]"
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/46">Primary Use Case *</span>
                  <textarea name="primaryUseCase" value={accessForm.primaryUseCase} onChange={handleFieldChange} rows={3} placeholder="What outcome do you need this system to own?" className="w-full rounded-xl border border-white/12 bg-black/25 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#BC9A2D]/55" />
                </label>

                <label className="space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/46">Current Systems</span>
                  <textarea name="currentSystems" value={accessForm.currentSystems} onChange={handleFieldChange} rows={2} placeholder="Current stack (CRM, ticketing, billing, internal tooling)" className="w-full rounded-xl border border-white/12 bg-black/25 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#BC9A2D]/55" />
                </label>

                <label className="space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/46">Current Execution Breakdown *</span>
                  <textarea name="criticalBreakdown" value={accessForm.criticalBreakdown} onChange={handleFieldChange} rows={3} placeholder="Where are decisions getting lost or delayed today?" className="w-full rounded-xl border border-white/12 bg-black/25 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/28 focus:border-[#BC9A2D]/55" />
                </label>

                <label className="space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/46">Additional Notes</span>
                  <textarea name="notes" value={accessForm.notes} onChange={handleFieldChange} rows={2} className="w-full rounded-xl border border-white/12 bg-black/25 px-3 py-2.5 text-sm text-white outline-none focus:border-[#BC9A2D]/55" />
                </label>

                {submitState !== "idle" && (
                  <div
                    className={`rounded-lg border px-3 py-2 text-sm ${
                      submitState === "success"
                        ? "border-emerald-300/35 bg-emerald-300/10 text-emerald-200"
                        : "border-red-300/35 bg-red-300/10 text-red-200"
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}

                <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <p className="text-xs text-white/52">Fields marked * are required for pre-vetting.</p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl bg-[#BC9A2D] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-black transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </button>
                </div>
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
