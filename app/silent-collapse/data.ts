import { REC_FEATURES } from "@/lib/rec-case-study";

export type InterceptQuestion = {
  id: string;
  prompt: string;
  options: {
    label: string;
    score: number;
    confidence: "Low Confidence" | "Moderate Confidence" | "High Confidence";
    meter: number;
  }[];
};

export const INTERCEPT_QUESTIONS: InterceptQuestion[] = [
  {
    id: "signal-routing",
    prompt: "How often does escalation routing still end up with you?",
    options: [
      { label: "Rarely", score: 1, confidence: "Low Confidence", meter: 22 },
      { label: "Several times per week", score: 3, confidence: "Moderate Confidence", meter: 56 },
      { label: "Daily", score: 5, confidence: "High Confidence", meter: 88 },
    ],
  },
  {
    id: "handoff-integrity",
    prompt: "How often do handoffs break after sales closes?",
    options: [
      { label: "Almost never", score: 1, confidence: "Low Confidence", meter: 25 },
      { label: "Sometimes", score: 3, confidence: "Moderate Confidence", meter: 58 },
      { label: "Constantly", score: 5, confidence: "High Confidence", meter: 90 },
    ],
  },
  {
    id: "execution-velocity",
    prompt: "Do your tools move work, or just display activity?",
    options: [
      { label: "They reliably move work", score: 1, confidence: "Low Confidence", meter: 28 },
      { label: "Mixed result", score: 3, confidence: "Moderate Confidence", meter: 60 },
      { label: "Mostly activity theater", score: 5, confidence: "High Confidence", meter: 92 },
    ],
  },
  {
    id: "founder-load",
    prompt: "If you disappear for 72 hours, what happens first?",
    options: [
      { label: "Nothing critical", score: 1, confidence: "Low Confidence", meter: 24 },
      { label: "Priorities drift", score: 3, confidence: "Moderate Confidence", meter: 62 },
      { label: "Execution stalls", score: 5, confidence: "High Confidence", meter: 94 },
    ],
  },
  {
    id: "decision-latency",
    prompt: "How long does high-impact work wait for a decision?",
    options: [
      { label: "Same day", score: 1, confidence: "Low Confidence", meter: 30 },
      { label: "1-2 days", score: 3, confidence: "Moderate Confidence", meter: 66 },
      { label: "3+ days", score: 5, confidence: "High Confidence", meter: 96 },
    ],
  },
];

export const LIVE_SIGNALS = [
  "Everything still routes through me…",
  "Handoffs keep breaking after sales closes",
  "Tools show activity. Nothing actually moves.",
  "I’m still the bottleneck on every major decision",
];

export const OPERATING_LAYER_CARDS = [
  {
    title: "Control",
    before: "Ownership disappears when pressure spikes.",
    after: "Decision paths are explicit, owned, and enforced.",
  },
  {
    title: "Execution",
    before: "Work gets tracked but high-impact tasks sit in limbo.",
    after: "Qualified work routes forward with deterministic execution.",
  },
  {
    title: "Visibility",
    before: "You discover failure after deadlines slip.",
    after: "Live signal telemetry exposes risk while there is still time to act.",
  },
];

function formatRecTabLabel(label: string) {
  return label.replace(/\b\w+/g, (word) => word.charAt(0) + word.slice(1).toLowerCase());
}

export const REC_TABS = REC_FEATURES.map((feature) => ({
  id: feature.id,
  label: formatRecTabLabel(feature.label),
  image: feature.image,
  gallery: feature.gallery,
  before: feature.before,
  installed: feature.installed,
  outcomes: feature.outcomes,
}));

export const VESSA_FEATURES = [
  {
    title: "MosaIQ",
    body: "Ingests cross-tool signal and detects high-impact execution opportunities.",
  },
  {
    title: "WorkStream",
    body: "Routes approved work into live execution lanes with real-time context.",
  },
  {
    title: "Decide",
    body: "Delivers structured final outputs for operator approval, edit, or rejection.",
  },
];
