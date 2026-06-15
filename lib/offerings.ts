export type EngagementPathStatus = "live" | "waitlist" | "planned";

export type EngagementPath = {
  id: string;
  label: string;
  tagline: string;
  description: string;
  highlight?: string;
  url: string;
  status: EngagementPathStatus;
  indexable: boolean;
  cta: string;
};

export const SECTION_INTRO = {
  heading: "Pick your speed to revenue",
  subcopy:
    "Three ways to work with StudioFlows. Each path tells you what you gain, not what we install under the hood.",
};

export const ENGAGEMENT_PATHS: EngagementPath[] = [
  {
    id: "optimize",
    label: "Optimize",
    tagline: "Your stack. Smarter execution.",
    description:
      "Vessa is the autonomous AI COO for your Ops Hub — chat to move fast, Decide for high-impact checkpoints, and execution across ClickUp, Slack, email, and the tools you already run.",
    highlight: "Flagship: Vessa",
    url: "/vessa",
    status: "live",
    indexable: true,
    cta: "Start with Vessa",
  },
  {
    id: "accelerate",
    label: "Accelerate",
    tagline: "System-driven results.",
    description:
      "Accelerate operations with StudioFlows OS: pre-built vertical molds for service businesses. Subscribe and run a complete system shaped for how your team works.",
    url: "/platform",
    status: "waitlist",
    indexable: true,
    cta: "Join the waitlist",
  },
  {
    id: "custom_command",
    label: "Custom Command",
    tagline: "Tailored power.",
    description:
      "Command a bespoke operating layer built for your business, like the REC deployment, when you need maximum control and fit, not a template.",
    highlight: "Proof: REC",
    url: "/services/custom-ops-hub",
    status: "live",
    indexable: true,
    cta: "Start OPS Drag Audit",
  },
];

export const PLATFORM_URL = "/platform";

export function getEngagementPathStatusLabel(status: EngagementPathStatus): string {
  if (status === "live") return "Available now";
  if (status === "waitlist") return "Waitlist open";
  return "Coming soon";
}
