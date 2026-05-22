"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../../../lib/supabase";

const QUIZ_SECTIONS = [
  {
    id: "company-context",
    title: "Context first. Precision follows.",
    challenger:
      "Most teams try to fix execution with more effort. We start by exposing the operating design behind the effort.",
    fields: [
      {
        name: "businessModel",
        label: "What best describes your business model?",
        type: "single",
        autoAdvance: true,
        required: true,
        options: ["Service business", "Agency", "Consultancy", "B2B SaaS", "Hybrid model"],
      },
      {
        name: "companyStage",
        label: "Which stage best matches your company right now?",
        type: "single",
        autoAdvance: true,
        required: true,
        options: ["Early traction", "Growing team", "Scaling operations", "Mature and optimizing"],
      },
    ],
  },
  {
    id: "pain-area",
    title: "Find the real pressure point.",
    challenger:
      "Most leaders diagnose symptoms. High-performing operators isolate the constraint that creates downstream drag.",
    fields: [
      {
        name: "primaryPainArea",
        label: "Where is operational complexity hurting the most today?",
        type: "single",
        autoAdvance: true,
        required: true,
        options: ["Client delivery", "Sales to onboarding handoff", "Team coordination", "Reporting and visibility", "Billing and fulfillment"],
      },
    ],
  },
  {
    id: "bottleneck",
    title: "Name the expensive bottleneck.",
    challenger:
      "If everything is a priority, nothing changes. We focus on the one bottleneck that compounds cost every week.",
    fields: [
      {
        name: "highestCostBottleneck",
        label: "What is the highest-cost bottleneck you want fixed first?",
        type: "single",
        autoAdvance: true,
        required: true,
        options: [
          "Manual handoffs causing delays",
          "No clear ownership per workflow stage",
          "Fragmented tools and duplicate work",
          "Execution quality varies by person",
          "Leadership lacks real-time control",
        ],
      },
      {
        name: "highestCostBottleneckOther",
        label: "Anything to add about this bottleneck? (optional)",
        type: "text",
        required: false,
        placeholder: "One sentence is enough.",
      },
    ],
  },
  {
    id: "workflow-handling",
    title: "Reveal how work actually moves.",
    challenger:
      "Most operations look clear on paper but break in motion. This helps us map your true runtime.",
    fields: [
      {
        name: "workflowManagement",
        label: "How are you currently managing this workflow? (select all that apply)",
        type: "multi",
        required: true,
        options: ["Spreadsheets", "CRM", "Project management tool", "Slack and email", "Manual SOPs", "Custom internal tools"],
      },
    ],
  },
  {
    id: "breakdown",
    title: "What breaks on repeat",
    challenger: "Choose the pattern you see most weeks, not a one-off fire drill.",
    fields: [
      {
        name: "frequentBreakdown",
        label: "What breaks most often in your current process?",
        type: "single",
        autoAdvance: true,
        required: true,
        options: ["Missed deadlines", "Dropped handoffs", "Rework and quality drift", "Incomplete visibility", "Slow decision cycles"],
      },
      {
        name: "frequentBreakdownDetail",
        sectionTitle: "What it costs when it breaks again",
        challenger:
          "Be specific about the business hit: delayed revenue, rework, client trust, margin, or leadership time stuck in triage.",
        label: "What is the business consequence when this breaks?",
        type: "textarea",
        required: true,
        placeholder: "Example: we lose 2-3 days per month to rework, or deals stall until I personally unblock them.",
      },
    ],
  },
  {
    id: "urgency",
    title: "Urgency defines execution strategy.",
    challenger:
      "Strong operators do not wait for certainty. They quantify risk of inaction and act before the quarter compounds.",
    fields: [
      {
        name: "urgencyWindow",
        label: "What urgency window are you operating under?",
        type: "single",
        autoAdvance: true,
        required: true,
        options: ["Now (0-30 days)", "Near term (1-3 months)", "This quarter", "This year"],
      },
      {
        name: "quarterRisk",
        label: "What happens if this is not solved this quarter?",
        type: "single",
        autoAdvance: true,
        required: true,
        options: [
          "Revenue risk increases",
          "Delivery quality degrades",
          "Hiring pressure increases",
          "Leadership throughput slows",
          "Strategic initiatives stall",
        ],
      },
    ],
  },
  {
    id: "ownership",
    title: "Set the implementation depth.",
    challenger:
      "Advisory alone rarely changes outcomes. Ownership clarity is what turns strategy into deployed capability.",
    fields: [
      {
        name: "implementationOwnership",
        label: "How hands-on do you want to be during implementation?",
        type: "single",
        autoAdvance: true,
        required: true,
        options: [
          "Low involvement: I want StudioFlows to handle most of it",
          "Shared involvement: we collaborate with weekly checkpoints",
          "High involvement: I want a strategy/blueprint first, then decide next steps",
        ],
      },
    ],
  },
  {
    id: "budget-approval",
    title: "Align on decision reality.",
    challenger:
      "Great projects fail when budget and authority are misaligned. We surface that early so nobody wastes cycles.",
    fields: [
      {
        name: "budgetRange",
        label: "If this removed your main bottleneck in 60-90 days, which investment level is realistic for your team?",
        type: "single",
        autoAdvance: true,
        required: true,
        options: ["Under $8k", "$8k-$12k", "$12k-$18k", "$18k-$30k", "$30k+"],
      },
      {
        name: "approvalInvolvement",
        label: "How would this be approved?",
        type: "single",
        autoAdvance: true,
        required: true,
        options: [
          "Owner can approve immediately",
          "Owner + one stakeholder",
          "Needs team review this month",
          "Needs quarter planning cycle",
        ],
      },
    ],
  },
  {
    id: "contact",
    title: "Lock your strategy session.",
    challenger:
      "Last step. Serious operators finish this and secure implementation clarity before more operational drag accumulates.",
    fields: [
      { name: "fullName", label: "Full name", type: "text", required: true, placeholder: "Jane Smith" },
      { name: "workEmail", label: "Work email", type: "email", required: true, placeholder: "jane@company.com" },
      { name: "companyName", label: "Company name", type: "text", required: true, placeholder: "Company Inc." },
      { name: "companyWebsite", label: "Company website", type: "url", required: true, placeholder: "https://company.com" },
    ],
  },
];

const INITIAL_ANSWERS = {
  businessModel: "",
  companyStage: "",
  primaryPainArea: "",
  highestCostBottleneck: "",
  highestCostBottleneckOther: "",
  workflowManagement: [],
  frequentBreakdown: "",
  frequentBreakdownDetail: "",
  urgencyWindow: "",
  quarterRisk: "",
  implementationOwnership: "",
  budgetRange: "",
  approvalInvolvement: "",
  fullName: "",
  workEmail: "",
  companyName: "",
  companyWebsite: "",
};

const FAQ_ITEMS = [
  {
    question: "What is a custom ops hub solution?",
    answer:
      "A custom ops hub is the command layer for your operation: one system that connects work, ownership, and decision flow so execution stays controlled as you grow.",
  },
  {
    question: "Who is this for?",
    answer:
      "Founder-led SMB teams with repeatable delivery, rising complexity, and too much operational drag. If you need cleaner execution, this is for you.",
  },
  {
    question: "Who is this not for?",
    answer:
      "Teams looking for a quick automation patch, a single Zap, or broad advisory with no implementation ownership.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Most implementations are delivered in 2-4 weeks. Exact timing depends on scope, existing systems, and decision speed.",
  },
  {
    question: "What does investment usually look like?",
    answer:
      "Most qualified SMB engagements fall in the $12k-$30k range depending on scope, systems involved, and rollout depth.",
  },
  {
    question: "What happens after I submit?",
    answer:
      "If qualified, you move directly to booking. If timing is off, we still keep your details and can re-engage when the window is right.",
  },
];

const PERSONAL_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "msn.com",
  "aol.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "proton.me",
  "protonmail.com",
  "pm.me",
  "gmx.com",
  "yandex.com",
  "zoho.com",
]);

function isMissingValue(field, value) {
  if (!field.required) return false;
  if (field.type === "multi") return !Array.isArray(value) || value.length === 0;
  return typeof value !== "string" || value.trim().length === 0;
}

function isBusinessEmail(value) {
  if (!value || typeof value !== "string") return false;
  const normalized = value.trim().toLowerCase();
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!emailPattern.test(normalized)) return false;
  const emailParts = normalized.split("@");
  const domain = emailParts[1] || "";
  return !PERSONAL_EMAIL_DOMAINS.has(domain);
}

function getEmailDomain(value) {
  if (!value || typeof value !== "string") return "";
  const normalized = value.trim().toLowerCase();
  const emailParts = normalized.split("@");
  if (emailParts.length !== 2) return "";
  const rawDomain = emailParts[1] || "";
  const cleanedDomain = rawDomain.replace(/^www\./, "").replace(/\.+$/, "");
  const domainPattern = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/;
  if (!domainPattern.test(cleanedDomain)) {
    return "";
  }
  return cleanedDomain;
}

function getProgressMilestone(questionIndex, totalQuestions) {
  const completed = questionIndex + 1;
  const ratio = completed / totalQuestions;
  if (ratio < 0.34) return "Fast start. Build momentum.";
  if (ratio < 0.67) return "You are halfway. Keep going.";
  if (ratio < 1) return "Final stretch. Lock your call.";
  return "Ready for your booking step.";
}

function shouldAutoAdvanceQuestion(question) {
  return question.autoAdvance === true;
}

function evaluateQualification(answers) {
  let score = 0;
  const reasons = [];

  const urgencyScoreMap = {
    "Now (0-30 days)": 3,
    "Near term (1-3 months)": 2,
    "This quarter": 1,
    "This year": 0,
  };
  const budgetScoreMap = {
    "Under $8k": 0,
    "$8k-$12k": 1,
    "$12k-$18k": 3,
    "$18k-$30k": 3,
    "$30k+": 2,
  };
  const approvalScoreMap = {
    "Owner can approve immediately": 3,
    "Owner + one stakeholder": 2,
    "Needs team review this month": 1,
    "Needs quarter planning cycle": 0,
  };
  const involvementScoreMap = {
    "Low involvement: I want StudioFlows to handle most of it": 2,
    "Shared involvement: we collaborate with weekly checkpoints": 2,
    "High involvement: I want a strategy/blueprint first, then decide next steps": 1,
  };

  score += urgencyScoreMap[answers.urgencyWindow] || 0;
  score += budgetScoreMap[answers.budgetRange] || 0;
  score += approvalScoreMap[answers.approvalInvolvement] || 0;
  score += involvementScoreMap[answers.implementationOwnership] || 0;

  if (answers.quarterRisk === "Revenue risk increases" || answers.quarterRisk === "Delivery quality degrades") {
    score += 1;
  }

  if (answers.budgetRange === "Under $8k") {
    reasons.push("budget_below_smb_target");
  }
  if (answers.approvalInvolvement === "Needs quarter planning cycle") {
    reasons.push("slow_approval_cycle");
  }
  if (answers.urgencyWindow === "This year") {
    reasons.push("low_urgency_window");
  }

  const qualified = score >= 8;
  return { qualified, score, reasons };
}

export default function CustomOpsHubClient() {
  const QUIZ_QUESTIONS = useMemo(
    () =>
      QUIZ_SECTIONS.flatMap((section) =>
        section.fields.map((field) => ({
          ...field,
          questionId: `${section.id}-${field.name}`,
          sectionTitle: field.sectionTitle ?? section.title,
          sectionChallenger: field.challenger ?? section.challenger,
        }))
      ),
    []
  );

  const [answers, setAnswers] = useState(INITIAL_ANSWERS);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [stepError, setStepError] = useState("");
  const [submitState, setSubmitState] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadId, setLeadId] = useState(null);
  const [showBookingStep, setShowBookingStep] = useState(false);
  const [showDisqualifiedStep, setShowDisqualifiedStep] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [hasEditedCompanyWebsite, setHasEditedCompanyWebsite] = useState(false);
  const activeTextInputRef = useRef(null);

  const currentQuestion = QUIZ_QUESTIONS[questionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const requiredQuestionCount = QUIZ_QUESTIONS.filter((question) => question.required).length;
  const completedRequiredQuestions = QUIZ_QUESTIONS.filter(
    (question) => question.required && !isMissingValue(question, answers[question.name])
  ).length;
  const progressPercent = Math.round((completedRequiredQuestions / requiredQuestionCount) * 100);
  const progressMilestone = getProgressMilestone(questionIndex, totalQuestions);
  const currentQuestionAutoAdvances = shouldAutoAdvanceQuestion(currentQuestion);
  const currentQuestionValue = answers[currentQuestion.name];
  const currentQuestionNeedsInputBlock =
    !currentQuestionAutoAdvances && currentQuestion.required && isMissingValue(currentQuestion, currentQuestionValue);
  const currentQuestionHasInvalidBusinessEmail =
    currentQuestion.type === "email" &&
    typeof currentQuestionValue === "string" &&
    currentQuestionValue.trim().length > 0 &&
    !isBusinessEmail(currentQuestionValue);

  useEffect(() => {
    const workEmail = answers.workEmail;
    const companyWebsite = answers.companyWebsite;
    if (hasEditedCompanyWebsite || !workEmail || companyWebsite) {
      return;
    }

    if (!isBusinessEmail(workEmail)) {
      return;
    }

    const domain = getEmailDomain(workEmail);
    if (!domain) {
      return;
    }

    setAnswers((prev) => ({
      ...prev,
      companyWebsite: `https://${domain}`,
    }));
  }, [answers.workEmail, answers.companyWebsite, hasEditedCompanyWebsite]);

  const attachAndFocusTextInput = useCallback((node) => {
    activeTextInputRef.current = node;
    if (!node) {
      return;
    }

    const focusNode = () => {
      node.focus();
      const inputLength = node.value?.length || 0;
      if (typeof node.setSelectionRange === "function") {
        try {
          node.setSelectionRange(inputLength, inputLength);
        } catch {
          // Some input types (e.g. email) reject setSelectionRange.
        }
      }
    };

    window.requestAnimationFrame(focusNode);
    window.setTimeout(focusNode, 320);
  }, []);

  const qualificationSummary = useMemo(
    () => [
      `Business model: ${answers.businessModel || "Not provided"}`,
      `Primary pain: ${answers.primaryPainArea || "Not provided"}`,
      `Urgency: ${answers.urgencyWindow || "Not provided"}`,
      `Ownership expectation: ${answers.implementationOwnership || "Not provided"}`,
    ],
    [answers]
  );

  const disqualificationSummary = useMemo(
    () => [
      `Timeline: ${answers.urgencyWindow || "Not provided"}`,
      `Budget range: ${answers.budgetRange || "Not provided"}`,
      `Approval path: ${answers.approvalInvolvement || "Not provided"}`,
    ],
    [answers]
  );

  const updateSingleValue = (name, value) => {
    setStepError("");
    const nextAnswers = { ...answers, [name]: value };
    setAnswers(nextAnswers);

    if (currentQuestionAutoAdvances) {
      window.setTimeout(() => {
        if (questionIndex === totalQuestions - 1) {
          handleSubmitLead();
        } else {
          setQuestionIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
        }
      }, 220);
    }
  };

  const toggleMultiValue = (name, value) => {
    setStepError("");
    setAnswers((prev) => {
      const currentValues = prev[name] || [];
      const exists = currentValues.includes(value);
      return {
        ...prev,
        [name]: exists ? currentValues.filter((item) => item !== value) : [...currentValues, value],
      };
    });
  };

  const updateInputValue = (name, value) => {
    setStepError("");
    if (name === "companyWebsite") {
      setHasEditedCompanyWebsite(true);
    }
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const validateCurrentStep = () => {
    const value = answers[currentQuestion.name];
    if (isMissingValue(currentQuestion, value)) {
      return `${currentQuestion.label} is required.`;
    }
    if (currentQuestion.type === "email" && value && !isBusinessEmail(String(value))) {
      return "Please use your company email (personal domains like Gmail/Yahoo are not accepted).";
    }
    return "";
  };

  const handleNext = () => {
    const validationMessage = validateCurrentStep();
    if (validationMessage) {
      setStepError(validationMessage);
      return;
    }

    if (questionIndex === totalQuestions - 1) {
      handleSubmitLead();
      return;
    }

    setStepError("");
    setQuestionIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
  };

  const handleBack = () => {
    setStepError("");
    setQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleQuestionKeyDown = (event) => {
    if (event.key !== "Enter" || isSubmitting || currentQuestionAutoAdvances) {
      return;
    }

    if (event.shiftKey) {
      return;
    }

    event.preventDefault();
    handleNext();
  };

  const handleSubmitLead = async () => {
    setSubmitState("idle");
    setSubmitMessage("");

    if (!supabase) {
      setSubmitState("error");
      setSubmitMessage("Submission is unavailable because Supabase environment variables are missing.");
      return;
    }

    setIsSubmitting(true);
    const qualification = evaluateQualification(answers);

    const payload = {
      full_name: answers.fullName.trim(),
      work_email: answers.workEmail.trim().toLowerCase(),
      company_name: answers.companyName.trim(),
      company_website: answers.companyWebsite.trim() || null,
      business_model: answers.businessModel,
      company_stage: answers.companyStage,
      primary_pain_area: answers.primaryPainArea,
      highest_cost_bottleneck: answers.highestCostBottleneck,
      highest_cost_bottleneck_other: answers.highestCostBottleneckOther.trim() || null,
      workflow_management: answers.workflowManagement,
      frequent_breakdown: answers.frequentBreakdown,
      frequent_breakdown_detail: answers.frequentBreakdownDetail.trim(),
      urgency_window: answers.urgencyWindow,
      quarter_risk: answers.quarterRisk,
      implementation_ownership: answers.implementationOwnership,
      budget_range: answers.budgetRange,
      approval_involvement: answers.approvalInvolvement,
      status: qualification.qualified ? "qualified" : "disqualified",
      source_page: "services/custom-ops-hub",
      raw_answers: answers,
      metadata: {
        path: typeof window !== "undefined" ? window.location.pathname : "/services/custom-ops-hub",
        qualification_score: qualification.score,
        qualification_reasons: qualification.reasons,
        qualification_version: "v1",
      },
    };

    const { error } = await supabase.from("custom_ops_hub_leads").insert([payload]);
    setIsSubmitting(false);

    if (error) {
      setSubmitState("error");
      setSubmitMessage(error.message || "Unable to submit your qualification right now.");
      return;
    }

    setLeadId(null);
    setSubmitState("success");
    if (qualification.qualified) {
      setSubmitMessage("Qualification complete. Your booking step is ready.");
      setShowBookingStep(true);
      return;
    }

    setSubmitMessage("Thanks for sharing your details. We saved your request and will follow up with next steps.");
    setShowDisqualifiedStep(true);
  };

  const renderField = (field) => {
    const value = answers[field.name];

    if (field.type === "single") {
      return (
        <div className="mt-3 grid gap-2">
          {field.options.map((option) => {
            const isActive = value === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => updateSingleValue(field.name, option)}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                  isActive
                    ? "border-[#FACC15]/60 bg-[#FACC15]/15 text-[#FDE68A]"
                    : "border-white/10 bg-black/25 text-white/80 hover:border-white/30 hover:bg-white/[0.04]"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      );
    }

    if (field.type === "multi") {
      return (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {field.options.map((option) => {
            const selected = Array.isArray(value) && value.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggleMultiValue(field.name, option)}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                  selected
                    ? "border-[#FACC15]/60 bg-[#FACC15]/15 text-[#FDE68A]"
                    : "border-white/10 bg-black/25 text-white/80 hover:border-white/30 hover:bg-white/[0.04]"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      );
    }

    if (field.type === "textarea") {
      return (
        <textarea
          ref={attachAndFocusTextInput}
          value={value}
          onChange={(event) => updateInputValue(field.name, event.target.value)}
          rows={3}
          placeholder={field.placeholder}
          className="mt-3 w-full rounded-xl border border-white/12 bg-black/25 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#FACC15]/55"
        />
      );
    }

    return (
      <input
        ref={attachAndFocusTextInput}
        type={field.type === "email" || field.type === "url" ? field.type : "text"}
        autoComplete={
          field.name === "fullName"
            ? "name"
            : field.name === "workEmail"
              ? "email"
              : field.name === "companyName"
                ? "organization"
                : field.name === "companyWebsite"
                  ? "url"
                  : "off"
        }
        value={value}
        onChange={(event) => updateInputValue(field.name, event.target.value)}
        placeholder={field.placeholder}
        className="mt-3 w-full rounded-xl border border-white/12 bg-black/25 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#FACC15]/55"
      />
    );
  };

  if (showBookingStep) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-[#F7F7F7]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.08)_0.5px,transparent_0.5px),linear-gradient(90deg,rgba(255,255,255,0.08)_0.5px,transparent_0.5px)] [background-size:64px_64px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(99,102,241,0.2),transparent_28%),radial-gradient(circle_at_82%_0%,rgba(168,85,247,0.14),transparent_34%)]" />
        <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 py-8 sm:px-8 lg:px-10">
          <nav className="flex items-center justify-center py-4 sm:py-5">
            <img
              src="/StudioFlows logo white (1200 x 675 px).png"
              alt="StudioFlows"
              className="h-12 w-auto object-contain opacity-90 sm:h-14"
            />
          </nav>

          <section className="mt-8 rounded-[28px] border border-[#FACC15]/35 bg-black/25 p-7 sm:p-10">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#FACC15]">Qualification Complete</p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              You are pre-qualified.
              <br />
              <span className="text-white/65">Book your strategy call.</span>
            </h1>
            <p className="mt-5 max-w-[760px] text-sm leading-7 text-white/75">
              Your answers show a meaningful operational opportunity. This next step is where we challenge assumptions,
              align on execution priorities, and map implementation scope.
            </p>
            <div className="mt-8 grid gap-2 sm:grid-cols-2">
              {qualificationSummary.map((item) => (
                <div key={item} className="rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-white/80">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-[28px] border border-white/12 bg-white/[0.02] p-7 sm:p-10">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#FACC15]">Book Your Call</p>
            <p className="mt-3 text-sm leading-7 text-white/72">
              Pick your best time to meet. We will use your answers to focus the call on your most urgent operational
              constraints.
            </p>
            <div
              id="booking-module-slot"
              data-lead-id={leadId || ""}
              className="mt-6 rounded-2xl border border-dashed border-[#FACC15]/45 bg-black/30 p-8 text-center"
            >
              <p className="text-sm text-white/70">Your booking calendar will load here.</p>
              <p className="mt-2 text-xs text-white/45">If it does not load, we will follow up by email.</p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (showDisqualifiedStep) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-[#F7F7F7]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.08)_0.5px,transparent_0.5px),linear-gradient(90deg,rgba(255,255,255,0.08)_0.5px,transparent_0.5px)] [background-size:64px_64px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(99,102,241,0.2),transparent_28%),radial-gradient(circle_at_82%_0%,rgba(168,85,247,0.14),transparent_34%)]" />
        <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 py-8 sm:px-8 lg:px-10">
          <nav className="flex items-center justify-center py-4 sm:py-5">
            <img
              src="/StudioFlows logo white (1200 x 675 px).png"
              alt="StudioFlows"
              className="h-12 w-auto object-contain opacity-90 sm:h-14"
            />
          </nav>

          <section className="mt-8 rounded-[28px] border border-white/12 bg-black/25 p-7 sm:p-10">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#FACC15]">Thank You</p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              We received your request.
              <br />
              <span className="text-white/65">At this stage, it may not be the ideal fit for an immediate build.</span>
            </h1>
            <p className="mt-5 max-w-[760px] text-sm leading-7 text-white/75">
              We saved your details and will keep you in our priority update circuit as we open additional implementation
              windows.
            </p>
            <div className="mt-8 grid gap-2 sm:grid-cols-3">
              {disqualificationSummary.map((item) => (
                <div key={item} className="rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-white/80">
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-[#F7F7F7]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.08)_0.5px,transparent_0.5px),linear-gradient(90deg,rgba(255,255,255,0.08)_0.5px,transparent_0.5px)] [background-size:64px_64px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(99,102,241,0.2),transparent_28%),radial-gradient(circle_at_82%_0%,rgba(168,85,247,0.14),transparent_34%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 py-8 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-center py-4 sm:py-5">
          <img
            src="/StudioFlows logo white (1200 x 675 px).png"
            alt="StudioFlows"
            className="h-12 w-auto object-contain opacity-90 sm:h-14"
          />
        </nav>

        <section className="py-10 text-center sm:py-14">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#FACC15]">StudioFlows</p>
          <h1 className="mx-auto mt-6 max-w-[900px] text-balance text-[2.2rem] font-semibold leading-[0.96] tracking-[-0.03em] sm:text-[3rem] lg:text-[4.8rem]">
            OPS Drag Audit Qualifier
            <br />
            <span className="text-white/58">for teams ready to stop execution drag</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[780px] text-balance text-[1rem] leading-7 text-white/74 sm:text-[1.1rem]">
            Answer a few focused questions in about 90 seconds so we can understand your priorities, urgency, and fit
            for a custom StudioFlows build.
          </p>
        </section>

        <section className="rounded-[28px] border border-white/12 bg-white/[0.02] p-6 sm:p-8">
          <div className="sticky top-2 z-20 -mx-2 rounded-xl border border-white/10 bg-[#1F1F1F]/95 px-2 py-2 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#FACC15]">
                Question {questionIndex + 1} of {totalQuestions}
              </p>
              <p className="text-xs text-white/55">{progressMilestone}</p>
            </div>
            <div className="mt-3 h-2 w-full rounded-full bg-white/10">
              <div className="h-2 rounded-full bg-[#FACC15] transition-all duration-300" style={{ width: `${progressPercent}%` }} />
            </div>
            <p className="mt-2 text-xs text-white/45">{progressPercent}% complete</p>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentQuestion.questionId}
              initial={{ opacity: 0, x: 34 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -34 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mt-4 rounded-xl border border-white/10 bg-black/20 px-3 py-2.5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#FACC15]/90">{currentQuestion.sectionTitle}</p>
                <p className="mt-1 text-xs leading-5 text-white/65">{currentQuestion.sectionChallenger}</p>
              </div>

              <div className="mt-5 space-y-6">
                <div key={currentQuestion.name} onKeyDown={handleQuestionKeyDown}>
                  <p className="text-sm font-medium text-white">
                    {currentQuestion.label}
                    {currentQuestion.required ? " *" : ""}
                  </p>
                  {renderField(currentQuestion)}
                </div>
              </div>

              {stepError && (
                <div className="mt-5 rounded-lg border border-red-300/35 bg-red-300/10 px-3 py-2 text-sm text-red-200">
                  {stepError}
                </div>
              )}

              {submitState !== "idle" && (
                <div
                  className={`mt-5 rounded-lg border px-3 py-2 text-sm ${
                    submitState === "success"
                      ? "border-emerald-300/35 bg-emerald-300/10 text-emerald-200"
                      : "border-red-300/35 bg-red-300/10 text-red-200"
                  }`}
                >
                  {submitMessage}
                </div>
              )}

              {currentQuestionHasInvalidBusinessEmail && (
                <div className="mt-5 rounded-lg border border-red-300/35 bg-red-300/10 px-3 py-2 text-sm text-red-200">
                  Please use your company email (personal domains like Gmail/Yahoo are not accepted).
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
            <button
              type="button"
              onClick={handleBack}
              disabled={questionIndex === 0 || isSubmitting}
              className="rounded-xl border border-white/15 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white/72 transition hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-45"
            >
              Back
            </button>
            {!currentQuestionAutoAdvances && (
              <button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting || currentQuestionNeedsInputBlock || currentQuestionHasInvalidBusinessEmail}
                className="rounded-xl bg-[#FACC15] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-black transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {questionIndex === totalQuestions - 1 ? (isSubmitting ? "Submitting..." : "Qualify and Continue") : "Continue"}
              </button>
            )}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-3 sm:p-4">
          <p className="px-1 text-[10px] uppercase tracking-[0.22em] text-[#FACC15]">FAQ</p>
          <div className="mt-2 space-y-2">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={item.question} className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-3 py-1 text-left"
                  >
                    <p className="text-sm font-medium leading-6 text-white">{item.question}</p>
                    <span className="text-[11px] text-white/60">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && <p className="pb-1 text-xs leading-6 text-white/72">{item.answer}</p>}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
